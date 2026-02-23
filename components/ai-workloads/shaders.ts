export const powerlineVertexShader = `
  varying vec2 vUv;
  void main() {
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    vUv = uv;
  }
`;

export const powerlineFragmentShader = `
  precision highp float;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uDirection;
  uniform float uOpacity;
  uniform float uUvScale;
  uniform vec2 uUvOffset;
  uniform float uTransition;

  varying vec2 vUv;

  void main() {
    if(uDirection > 0.0 && vUv.y < 1.0 - uTransition) {
        discard;
    } else if(uDirection < 0.0 && vUv.y > uTransition) {
        discard;
    }

    gl_FragColor = vec4(mix(uColor1, uColor2, abs(sin((uUvOffset.y + vUv.y) * uUvScale + uTime * uSpeed * uDirection))), uOpacity);
  }
`;
