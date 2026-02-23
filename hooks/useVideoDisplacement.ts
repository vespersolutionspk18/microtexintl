"use client";

import { useEffect, useRef, useCallback } from "react";

const VERTEX_SHADER = `
attribute vec2 a_position;
attribute vec2 a_texCoord;
varying vec2 v_texCoord;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_texCoord = a_texCoord;
}
`;

const FRAGMENT_SHADER = `
precision mediump float;
uniform sampler2D u_texture;
uniform vec2 u_mouse;
uniform float u_radius;
uniform float u_strength;
uniform float u_active;
uniform float u_time;
varying vec2 v_texCoord;

void main() {
  vec2 uv = v_texCoord;
  float dist = distance(uv, u_mouse);
  float influence = smoothstep(u_radius, 0.0, dist) * u_active;

  if (influence > 0.001) {
    vec2 trailDirection = normalize(vec2(1.0, -1.0) + 0.3 * vec2(v_texCoord.y, v_texCoord.x));
    float positionAlongTrail = dot(uv, trailDirection);
    float wave = sin(positionAlongTrail * 15.0 - u_time * 3.0);
    vec2 flowOffset = trailDirection * wave * influence * u_strength * 2.0;
    float offset = influence * u_strength;
    vec2 redOffset = trailDirection * offset * 1.5 + flowOffset;
    vec2 blueOffset = -trailDirection * offset * 1.5 + flowOffset;
    float r = texture2D(u_texture, uv + redOffset).r;
    float g = texture2D(u_texture, uv + flowOffset).g;
    float b = texture2D(u_texture, uv + blueOffset).b;
    gl_FragColor = vec4(r, g, b, 1.0);
  } else {
    gl_FragColor = texture2D(u_texture, uv);
  }
}
`;

interface DisplacementOptions {
  radius?: number;
  strength?: number;
  smoothing?: number;
}

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function useVideoDisplacement(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  options: DisplacementOptions = {}
) {
  const { radius = 0.25, strength = 0.015, smoothing = 0.1 } = options;

  const stateRef = useRef({
    gl: null as WebGLRenderingContext | null,
    program: null as WebGLProgram | null,
    mouseX: 0.5,
    mouseY: 0.5,
    targetX: 0.5,
    targetY: 0.5,
    active: 0,
    targetActive: 0,
    lastTime: 0,
    rafId: null as number | null,
    running: false,
  });

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const state = stateRef.current;
    state.running = true;
    state.lastTime = performance.now();

    const initWebGL = () => {
      if (state.gl) return; // already initialized this mount
      const gl = canvas.getContext("webgl", { premultipliedAlpha: false });
      if (!gl) return;
      state.gl = gl;

      const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
      const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
      if (!vs || !fs) return;

      const program = gl.createProgram();
      if (!program) return;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
      gl.useProgram(program);
      state.program = program;

      const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
      const texCoords = new Float32Array([0, 1, 1, 1, 0, 0, 1, 0]);

      const posBuf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
      const posLoc = gl.getAttribLocation(program, "a_position");
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      const texBuf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, texBuf);
      gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
      const texLoc = gl.getAttribLocation(program, "a_texCoord");
      gl.enableVertexAttribArray(texLoc);
      gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, 0, 0);

      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      const w = video.videoWidth || video.clientWidth || 1920;
      const h = video.videoHeight || video.clientHeight || 1080;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);

      tick();
    };

    const tick = () => {
      if (!state.running) return;

      const gl = state.gl;
      const program = state.program;
      const vid = videoRef.current;
      if (!gl || !program || !vid) {
        state.rafId = requestAnimationFrame(tick);
        return;
      }

      const now = performance.now();
      const dt = (now - state.lastTime) / 16.6667;
      state.lastTime = now;

      const s = 1 - Math.pow(1 - smoothing, dt);
      state.mouseX += (state.targetX - state.mouseX) * s;
      state.mouseY += (state.targetY - state.mouseY) * s;
      state.active += (state.targetActive - state.active) * s;

      if (vid.readyState >= 2) {
        try {
          gl.texImage2D(
            gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, vid
          );
        } catch {
          // Video frame not ready
        }
      }

      gl.uniform2f(gl.getUniformLocation(program, "u_mouse"), state.mouseX, state.mouseY);
      gl.uniform1f(gl.getUniformLocation(program, "u_radius"), radius);
      gl.uniform1f(gl.getUniformLocation(program, "u_strength"), strength);
      gl.uniform1f(gl.getUniformLocation(program, "u_active"), state.active);
      gl.uniform1f(gl.getUniformLocation(program, "u_time"), now / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      state.rafId = requestAnimationFrame(tick);
    };

    video.addEventListener("loadedmetadata", initWebGL);
    if (video.readyState >= 1) {
      initWebGL();
    }

    return () => {
      state.running = false;
      if (state.rafId !== null) {
        cancelAnimationFrame(state.rafId);
        state.rafId = null;
      }
      video.removeEventListener("loadedmetadata", initWebGL);
      // Reset GL state so next mount can re-init
      state.gl = null;
      state.program = null;
    };
  }, [videoRef, canvasRef, radius, strength, smoothing]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    stateRef.current.targetX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    stateRef.current.targetY = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    stateRef.current.targetActive = 1;
  }, [canvasRef]);

  const handleMouseLeave = useCallback(() => {
    stateRef.current.targetActive = 0;
  }, []);

  return { handleMouseMove, handleMouseLeave };
}
