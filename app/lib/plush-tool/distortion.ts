import * as THREE from 'three';
import { calculateStretch, getDistortionColor } from './geometry';

export interface DistortionResult {
  maxStretch: number;
  avgStretch: number;
  colors: THREE.Color[];
}

/**
 * Calculate distortion metrics for a geometry with UV coordinates
 */
export function calculateDistortion(
  geometry: THREE.BufferGeometry,
  uvCoordinates: THREE.Vector2[]
): DistortionResult {
  const position = geometry.attributes.position;
  const index = geometry.index;

  if (!index) {
    return {
      maxStretch: 0,
      avgStretch: 0,
      colors: []
    };
  }

  const indexArray = index.array;
  const faceCount = indexArray.length / 3;
  const stretches: number[] = [];
  const colors: THREE.Color[] = [];

  for (let i = 0; i < faceCount; i++) {
    const i0 = indexArray[i * 3];
    const i1 = indexArray[i * 3 + 1];
    const i2 = indexArray[i * 3 + 2];

    // 3D vertices
    const v0_3d = new THREE.Vector3(
      position.getX(i0),
      position.getY(i0),
      position.getZ(i0)
    );
    const v1_3d = new THREE.Vector3(
      position.getX(i1),
      position.getY(i1),
      position.getZ(i1)
    );
    const v2_3d = new THREE.Vector3(
      position.getX(i2),
      position.getY(i2),
      position.getZ(i2)
    );

    // 2D UV coordinates
    const v0_2d = uvCoordinates[i0];
    const v1_2d = uvCoordinates[i1];
    const v2_2d = uvCoordinates[i2];

    // Calculate stretch
    const stretch = calculateStretch(v0_3d, v1_3d, v2_3d, v0_2d, v1_2d, v2_2d);

    stretches.push(stretch);

    // Get color for this face (3 vertices)
    const color = getDistortionColor(stretch);
    colors.push(color, color, color);
  }

  const maxStretch = Math.max(...stretches.filter(s => s !== Infinity));
  const validStretches = stretches.filter(s => s !== Infinity);
  const avgStretch = validStretches.length > 0
    ? validStretches.reduce((a, b) => a + b, 0) / validStretches.length
    : 0;

  return {
    maxStretch,
    avgStretch,
    colors
  };
}

/**
 * Add color attribute to geometry for distortion visualization
 */
export function addDistortionColors(
  geometry: THREE.BufferGeometry,
  colors: THREE.Color[]
): void {
  const colorArray = new Float32Array(colors.length * 3);

  colors.forEach((color, i) => {
    colorArray[i * 3] = color.r;
    colorArray[i * 3 + 1] = color.g;
    colorArray[i * 3 + 2] = color.b;
  });

  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colorArray, 3));
}
