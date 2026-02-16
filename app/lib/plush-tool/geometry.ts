import * as THREE from 'three';

/**
 * Calculate the area of a triangle in 3D space
 */
export function triangleArea3D(
  v0: THREE.Vector3,
  v1: THREE.Vector3,
  v2: THREE.Vector3
): number {
  const edge1 = new THREE.Vector3().subVectors(v1, v0);
  const edge2 = new THREE.Vector3().subVectors(v2, v0);
  const cross = new THREE.Vector3().crossVectors(edge1, edge2);
  return cross.length() * 0.5;
}

/**
 * Calculate the area of a triangle in 2D space
 */
export function triangleArea2D(
  v0: THREE.Vector2,
  v1: THREE.Vector2,
  v2: THREE.Vector2
): number {
  return Math.abs(
    (v1.x - v0.x) * (v2.y - v0.y) - (v2.x - v0.x) * (v1.y - v0.y)
  ) * 0.5;
}

/**
 * Calculate L-infinity stretch for a triangle
 * Returns max(σ1/σ2) where σ1, σ2 are singular values of the Jacobian
 */
export function calculateStretch(
  v0_3d: THREE.Vector3,
  v1_3d: THREE.Vector3,
  v2_3d: THREE.Vector3,
  v0_2d: THREE.Vector2,
  v1_2d: THREE.Vector2,
  v2_2d: THREE.Vector2
): number {
  // 3D edge vectors
  const e1_3d = new THREE.Vector3().subVectors(v1_3d, v0_3d);
  const e2_3d = new THREE.Vector3().subVectors(v2_3d, v0_3d);

  // 2D edge vectors
  const e1_2d = new THREE.Vector2().subVectors(v1_2d, v0_2d);
  const e2_2d = new THREE.Vector2().subVectors(v2_2d, v0_2d);

  // 3D area
  const area3d = triangleArea3D(v0_3d, v1_3d, v2_3d);

  // 2D area
  const area2d = triangleArea2D(v0_2d, v1_2d, v2_2d);

  if (area2d < 1e-10 || area3d < 1e-10) {
    return Infinity;
  }

  // Simple stretch approximation: ratio of areas
  // More accurate would compute Jacobian singular values
  const areaRatio = Math.sqrt(area3d / area2d);

  // Also consider edge length distortion
  const edgeStretch1 = e1_3d.length() / Math.max(e1_2d.length(), 1e-10);
  const edgeStretch2 = e2_3d.length() / Math.max(e2_2d.length(), 1e-10);

  return Math.max(edgeStretch1, edgeStretch2, areaRatio);
}

/**
 * Get color for distortion visualization
 */
export function getDistortionColor(stretch: number): THREE.Color {
  if (stretch < 1.1) {
    // Green: low distortion
    return new THREE.Color(0x00ff00);
  } else if (stretch < 1.2) {
    // Yellow: medium distortion
    const t = (stretch - 1.1) / 0.1;
    return new THREE.Color().lerpColors(
      new THREE.Color(0x00ff00),
      new THREE.Color(0xffff00),
      t
    );
  } else if (stretch < 1.5) {
    // Orange to red: high distortion
    const t = (stretch - 1.2) / 0.3;
    return new THREE.Color().lerpColors(
      new THREE.Color(0xffff00),
      new THREE.Color(0xff0000),
      t
    );
  } else {
    // Dark red: very high distortion
    return new THREE.Color(0x880000);
  }
}

/**
 * Calculate centroid of a set of points
 */
export function calculateCentroid(points: THREE.Vector3[]): THREE.Vector3 {
  const centroid = new THREE.Vector3();
  points.forEach(p => centroid.add(p));
  centroid.divideScalar(points.length);
  return centroid;
}

/**
 * Find boundary vertices of a geometry patch
 */
export function findBoundaryVertices(geometry: THREE.BufferGeometry): Set<number> {
  const boundary = new Set<number>();
  const index = geometry.index;

  if (!index) return boundary;

  // Count edge occurrences
  const edgeCounts = new Map<string, number>();
  const indexArray = index.array;

  for (let i = 0; i < indexArray.length; i += 3) {
    const v0 = indexArray[i];
    const v1 = indexArray[i + 1];
    const v2 = indexArray[i + 2];

    const edges = [
      [v0, v1],
      [v1, v2],
      [v2, v0]
    ];

    edges.forEach(([va, vb]) => {
      const key = va < vb ? `${va}-${vb}` : `${vb}-${va}`;
      edgeCounts.set(key, (edgeCounts.get(key) || 0) + 1);
    });
  }

  // Boundary edges have count === 1
  edgeCounts.forEach((count, key) => {
    if (count === 1) {
      const [v1, v2] = key.split('-').map(Number);
      boundary.add(v1);
      boundary.add(v2);
    }
  });

  return boundary;
}

/**
 * Get ordered boundary loop vertices
 */
export function getBoundaryLoop(geometry: THREE.BufferGeometry): number[] {
  const index = geometry.index;
  if (!index) return [];

  // Build edge map for boundary edges
  const boundaryEdges = new Map<number, number[]>();
  const edgeCounts = new Map<string, [number, number]>();
  const indexArray = index.array;

  for (let i = 0; i < indexArray.length; i += 3) {
    const v0 = indexArray[i];
    const v1 = indexArray[i + 1];
    const v2 = indexArray[i + 2];

    const edges: [number, number][] = [
      [v0, v1],
      [v1, v2],
      [v2, v0]
    ];

    edges.forEach(([va, vb]) => {
      const key = va < vb ? `${va}-${vb}` : `${vb}-${va}`;
      edgeCounts.set(key, [va, vb]);
    });
  }

  // Count edge occurrences to find boundary
  const edgeCountMap = new Map<string, number>();
  for (let i = 0; i < indexArray.length; i += 3) {
    const v0 = indexArray[i];
    const v1 = indexArray[i + 1];
    const v2 = indexArray[i + 2];

    const edges: [number, number][] = [
      [v0, v1],
      [v1, v2],
      [v2, v0]
    ];

    edges.forEach(([va, vb]) => {
      const key = va < vb ? `${va}-${vb}` : `${vb}-${va}`;
      edgeCountMap.set(key, (edgeCountMap.get(key) || 0) + 1);
    });
  }

  // Find boundary edges (count === 1) and build adjacency
  edgeCountMap.forEach((count, key) => {
    if (count === 1) {
      const [va, vb] = edgeCounts.get(key)!;
      if (!boundaryEdges.has(va)) boundaryEdges.set(va, []);
      if (!boundaryEdges.has(vb)) boundaryEdges.set(vb, []);
      boundaryEdges.get(va)!.push(vb);
      boundaryEdges.get(vb)!.push(va);
    }
  });

  if (boundaryEdges.size === 0) return [];

  // Walk the boundary loop
  const loop: number[] = [];
  const start = boundaryEdges.keys().next().value;
  if (start === undefined) return [];
  let current: number = start;
  let prev = -1;

  do {
    loop.push(current);
    const neighbors = boundaryEdges.get(current) || [];
    const next = neighbors.find(n => n !== prev);
    if (next === undefined) break;
    prev = current;
    current = next;
  } while (current !== start && loop.length < boundaryEdges.size * 2);

  return loop;
}
