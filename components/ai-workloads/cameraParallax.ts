/**
 * Exact port of Zd camera parallax controller from source.
 * Provides mouse-driven + ambient drift camera parallax.
 */
import type { Camera, Quaternion } from "three";
import { Vector3, Quaternion as ThreeQuaternion } from "three";

interface ParallaxOptions {
  enabled?: boolean;
  posIntensity?: number;
  rotIntensity?: number;
  smoothing?: number;
}

export function createCameraParallax(
  camera: Camera,
  options: ParallaxOptions = {}
) {
  const {
    enabled: initialEnabled = true,
    posIntensity: initPos = 0.5,
    rotIntensity: initRot = 0.02,
    smoothing = 0.1,
  } = options;

  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let isEnabled = initialEnabled;
  const pos = { value: initPos, target: initPos };
  const rot = { value: initRot, target: initRot };
  let time = 0;

  const drift = {
    x: 0, y: 0, z: 0,
    targetX: 0, targetY: 0, targetZ: 0,
  };

  const offset = new Vector3();
  const temp = new Vector3();
  const quat = new ThreeQuaternion();
  const right = new Vector3();
  const up = new Vector3();

  // Exact from source: multi-frequency sine for ambient drift
  const noise = (t: number, seed: number) => {
    const w = Math.sin(t * 0.7 + seed) * 0.5;
    const s = Math.sin(t * 1.3 + seed * 2.1) * 0.3;
    const p = Math.sin(t * 2.1 + seed * 0.7) * 0.15;
    const u = Math.sin(t * 0.3 + seed * 1.5) * 0.05;
    return w + s + p + u;
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isEnabled) return;
    mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  window.addEventListener("mousemove", onMouseMove);

  return {
    update: () => {
      if (!isEnabled) return;

      time += 0.016;

      // Smooth mouse tracking
      mouse.x += (mouse.targetX - mouse.x) * smoothing;
      mouse.y += (mouse.targetY - mouse.y) * smoothing;

      // Smooth intensity changes
      pos.value += (pos.target - pos.value) * smoothing;
      rot.value += (rot.target - rot.value) * smoothing;

      // Ambient drift (posIntensity-based)
      if (pos.value > 0) {
        drift.targetX = noise(time, 0) * pos.value;
        drift.targetY = noise(time, 100) * pos.value;
        drift.targetZ = noise(time, 200) * pos.value * 0.3;
        drift.x += (drift.targetX - drift.x) * smoothing;
        drift.y += (drift.targetY - drift.y) * smoothing;
        drift.z += (drift.targetZ - drift.z) * smoothing;
      }
    },

    getPositionOffset: () => {
      offset.set(0, 0, 0);
      if (!isEnabled) return offset;

      const camQuat = (camera as unknown as { quaternion: Quaternion }).quaternion;

      right.set(1, 0, 0).applyQuaternion(camQuat).normalize();
      up.set(0, 1, 0).applyQuaternion(camQuat).normalize();

      // Mouse-based rotation offset
      if (rot.value > 0) {
        temp.copy(right).multiplyScalar(mouse.x * rot.value);
        offset.add(temp);
        temp.copy(up).multiplyScalar(mouse.y * rot.value);
        offset.add(temp);
      }

      // Ambient drift offset
      if (pos.value > 0) {
        temp.set(drift.x, drift.y, drift.z);
        temp.applyQuaternion(camQuat);
        offset.add(temp);
      }

      return offset;
    },

    dispose: () => {
      window.removeEventListener("mousemove", onMouseMove);
    },

    setEnabled: (v: boolean) => {
      isEnabled = v;
      if (!v) {
        mouse.x = 0; mouse.y = 0;
        mouse.targetX = 0; mouse.targetY = 0;
        drift.x = 0; drift.y = 0; drift.z = 0;
        drift.targetX = 0; drift.targetY = 0; drift.targetZ = 0;
      }
    },

    setIntensity: (v: number) => { pos.target = v; },
    setRotationIntensity: (v: number) => { rot.target = v; },
  };
}
