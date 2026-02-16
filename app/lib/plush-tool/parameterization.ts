import * as THREE from 'three';
import { getBoundaryLoop } from './geometry';

export interface UVResult {
  uvCoordinates: THREE.Vector2[];
  success: boolean;
  error?: string;
}

/**
 * Map boundary vertices to a circle in 2D
 */
function mapBoundaryToCircle(
  geometry: THREE.BufferGeometry,
  boundaryLoop: number[]
): Map<number, THREE.Vector2> {
  const uvMap = new Map<number, THREE.Vector2>();
  const n = boundaryLoop.length;

  boundaryLoop.forEach((vertexIndex, i) => {
    const angle = (i / n) * Math.PI * 2;
    const x = Math.cos(angle);
    const y = Math.sin(angle);
    uvMap.set(vertexIndex, new THREE.Vector2(x, y));
  });

  return uvMap;
}

/**
 * Simple harmonic mapping using Gauss-Seidel iteration
 */
function harmonicMapping(
  geometry: THREE.BufferGeometry,
  boundaryUVs: Map<number, THREE.Vector2>,
  maxIterations = 100
): Map<number, THREE.Vector2> {
  const position = geometry.attributes.position;
  const index = geometry.index;

  if (!index) {
    throw new Error('Geometry must be indexed');
  }

  const indexArray = index.array;
  const vertexCount = position.count;

  // Build vertex-to-vertex adjacency (one-ring)
  const adjacency = new Map<number, Set<number>>();

  for (let i = 0; i < indexArray.length; i += 3) {
    const v0 = indexArray[i];
    const v1 = indexArray[i + 1];
    const v2 = indexArray[i + 2];

    [
      [v0, v1],
      [v0, v2],
      [v1, v0],
      [v1, v2],
      [v2, v0],
      [v2, v1]
    ].forEach(([from, to]) => {
      if (!adjacency.has(from)) {
        adjacency.set(from, new Set());
      }
      adjacency.get(from)!.add(to);
    });
  }

  // Initialize UV coordinates
  const uvs = new Map<number, THREE.Vector2>();

  for (let i = 0; i < vertexCount; i++) {
    if (boundaryUVs.has(i)) {
      uvs.set(i, boundaryUVs.get(i)!.clone());
    } else {
      uvs.set(i, new THREE.Vector2(0, 0));
    }
  }

  // Gauss-Seidel iteration
  for (let iter = 0; iter < maxIterations; iter++) {
    let maxChange = 0;

    for (let i = 0; i < vertexCount; i++) {
      // Skip boundary vertices
      if (boundaryUVs.has(i)) continue;

      const neighbors = adjacency.get(i);
      if (!neighbors || neighbors.size === 0) continue;

      // Average of neighbor UVs
      const newUV = new THREE.Vector2();
      neighbors.forEach(neighborIndex => {
        const neighborUV = uvs.get(neighborIndex);
        if (neighborUV) {
          newUV.add(neighborUV);
        }
      });
      newUV.divideScalar(neighbors.size);

      const oldUV = uvs.get(i)!;
      const change = newUV.distanceTo(oldUV);
      maxChange = Math.max(maxChange, change);

      uvs.set(i, newUV);
    }

    // Check convergence
    if (maxChange < 1e-6) {
      console.log(`Harmonic mapping converged in ${iter} iterations`);
      break;
    }
  }

  return uvs;
}

/**
 * Normalize UV coordinates to fit in [0, 1] range
 */
function normalizeUVs(uvMap: Map<number, THREE.Vector2>): void {
  let minX = Infinity,
    minY = Infinity;
  let maxX = -Infinity,
    maxY = -Infinity;

  uvMap.forEach(uv => {
    minX = Math.min(minX, uv.x);
    minY = Math.min(minY, uv.y);
    maxX = Math.max(maxX, uv.x);
    maxY = Math.max(maxY, uv.y);
  });

  const width = maxX - minX;
  const height = maxY - minY;
  const scale = Math.max(width, height);

  if (scale < 1e-10) return;

  uvMap.forEach(uv => {
    uv.x = (uv.x - minX) / scale;
    uv.y = (uv.y - minY) / scale;
  });
}

/**
 * Compute UV parameterization for a patch using harmonic mapping
 */
export function computeUVParameterization(
  geometry: THREE.BufferGeometry
): UVResult {
  try {
    // Find boundary loop
    const boundaryLoop = getBoundaryLoop(geometry);

    if (boundaryLoop.length < 3) {
      return {
        uvCoordinates: [],
        success: false,
        error: 'No valid boundary loop found'
      };
    }

    // Map boundary to circle
    const boundaryUVs = mapBoundaryToCircle(geometry, boundaryLoop);

    // Compute interior UVs using harmonic mapping
    const uvMap = harmonicMapping(geometry, boundaryUVs);

    // Normalize to [0, 1] range
    normalizeUVs(uvMap);

    // Convert to array
    const position = geometry.attributes.position;
    const uvCoordinates: THREE.Vector2[] = [];

    for (let i = 0; i < position.count; i++) {
      const uv = uvMap.get(i) || new THREE.Vector2(0, 0);
      uvCoordinates.push(uv);
    }

    return {
      uvCoordinates,
      success: true
    };
  } catch (error) {
    return {
      uvCoordinates: [],
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Add UV coordinates to geometry
 */
export function addUVsToGeometry(
  geometry: THREE.BufferGeometry,
  uvCoordinates: THREE.Vector2[]
): void {
  const uvArray = new Float32Array(uvCoordinates.length * 2);

  uvCoordinates.forEach((uv, i) => {
    uvArray[i * 2] = uv.x;
    uvArray[i * 2 + 1] = uv.y;
  });

  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvArray, 2));
}
