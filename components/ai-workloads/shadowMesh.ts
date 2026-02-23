/**
 * Exact port of Gi ShadowMesh class from source.
 * Projects mesh geometry onto a ground plane as a flat shadow.
 */
import {
  Mesh,
  MeshBasicMaterial,
  Plane,
  Vector4,
  Matrix4,
  EqualStencilFunc,
  IncrementStencilOp,
} from "three";
import type { BufferGeometry, Material } from "three";

const shadowMatrix = new Matrix4();

export class ShadowMesh extends Mesh {
  isShadowMesh = true;
  meshMatrix: Matrix4;

  constructor(sourceMesh: Mesh) {
    const material = new MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      stencilWrite: true,
      stencilFunc: EqualStencilFunc,
      stencilRef: 0,
      stencilZPass: IncrementStencilOp,
    });
    super(sourceMesh.geometry as BufferGeometry, material as Material);
    this.meshMatrix = sourceMesh.matrixWorld;
    this.frustumCulled = false;
    this.matrixAutoUpdate = false;
  }

  // Exact from source: planar shadow projection matrix
  update(plane: Plane, light: Vector4) {
    const dot =
      plane.normal.x * light.x +
      plane.normal.y * light.y +
      plane.normal.z * light.z +
      -plane.constant * light.w;

    const e = shadowMatrix.elements;

    e[0] = dot - light.x * plane.normal.x;
    e[4] = -light.x * plane.normal.y;
    e[8] = -light.x * plane.normal.z;
    e[12] = -light.x * -plane.constant;

    e[1] = -light.y * plane.normal.x;
    e[5] = dot - light.y * plane.normal.y;
    e[9] = -light.y * plane.normal.z;
    e[13] = -light.y * -plane.constant;

    e[2] = -light.z * plane.normal.x;
    e[6] = -light.z * plane.normal.y;
    e[10] = dot - light.z * plane.normal.z;
    e[14] = -light.z * -plane.constant;

    e[3] = -light.w * plane.normal.x;
    e[7] = -light.w * plane.normal.y;
    e[11] = -light.w * plane.normal.z;
    e[15] = dot - light.w * -plane.constant;

    this.matrix.multiplyMatrices(shadowMatrix, this.meshMatrix);
  }
}
