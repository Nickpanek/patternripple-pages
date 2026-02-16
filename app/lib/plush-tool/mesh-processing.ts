import * as THREE from 'three';

export interface MeshStats {
  vertices: number;
  faces: number;
  edges: number;
  isManifold: boolean;
  boundaryEdges: number;
}

export interface Edge {
  v1: number;
  v2: number;
  key: string;
  faces: number[];
}

/**
 * Generate a unique edge key from two vertex indices
 */
export function getEdgeKey(v1: number, v2: number): string {
  return v1 < v2 ? `${v1}-${v2}` : `${v2}-${v1}`;
}

/**
 * Build edge map from geometry
 */
export function buildEdgeMap(geometry: THREE.BufferGeometry): Map<string, Edge> {
  const edges = new Map<string, Edge>();
  const position = geometry.attributes.position;
  const index = geometry.index;

  if (!index) {
    console.error('Geometry must be indexed');
    return edges;
  }

  const indexArray = index.array;

  // Process each triangle
  for (let i = 0; i < indexArray.length; i += 3) {
    const faceIndex = Math.floor(i / 3);
    const v0 = indexArray[i];
    const v1 = indexArray[i + 1];
    const v2 = indexArray[i + 2];

    // Add three edges of the triangle
    const edgeKeys = [
      [v0, v1],
      [v1, v2],
      [v2, v0]
    ];

    edgeKeys.forEach(([va, vb]) => {
      const key = getEdgeKey(va, vb);
      if (!edges.has(key)) {
        edges.set(key, {
          v1: va,
          v2: vb,
          key,
          faces: []
        });
      }
      edges.get(key)!.faces.push(faceIndex);
    });
  }

  return edges;
}

/**
 * Calculate mesh statistics
 */
export function calculateMeshStats(geometry: THREE.BufferGeometry): MeshStats {
  const position = geometry.attributes.position;
  const index = geometry.index;

  if (!index) {
    return {
      vertices: 0,
      faces: 0,
      edges: 0,
      isManifold: false,
      boundaryEdges: 0
    };
  }

  const vertices = position.count;
  const faces = index.count / 3;
  const edges = buildEdgeMap(geometry);

  let boundaryEdges = 0;
  let isManifold = true;

  edges.forEach(edge => {
    if (edge.faces.length === 1) {
      boundaryEdges++;
    } else if (edge.faces.length > 2) {
      isManifold = false;
    }
  });

  return {
    vertices,
    faces,
    edges: edges.size,
    isManifold,
    boundaryEdges
  };
}

/**
 * Build face adjacency graph excluding seam edges
 */
export function buildFaceAdjacency(
  geometry: THREE.BufferGeometry,
  seamEdges: Set<string>
): Map<number, Set<number>> {
  const adjacency = new Map<number, Set<number>>();
  const edges = buildEdgeMap(geometry);

  edges.forEach(edge => {
    // Skip seam edges
    if (seamEdges.has(edge.key)) {
      return;
    }

    // Connect adjacent faces
    if (edge.faces.length === 2) {
      const [f1, f2] = edge.faces;

      if (!adjacency.has(f1)) {
        adjacency.set(f1, new Set());
      }
      if (!adjacency.has(f2)) {
        adjacency.set(f2, new Set());
      }

      adjacency.get(f1)!.add(f2);
      adjacency.get(f2)!.add(f1);
    }
  });

  return adjacency;
}

/**
 * Extract connected components (patches) from face adjacency
 */
export function extractPatches(
  geometry: THREE.BufferGeometry,
  seamEdges: Set<string>
): number[][] {
  const adjacency = buildFaceAdjacency(geometry, seamEdges);
  const visited = new Set<number>();
  const patches: number[][] = [];
  const index = geometry.index;

  if (!index) return patches;

  const totalFaces = index.count / 3;

  // BFS to find connected components
  for (let startFace = 0; startFace < totalFaces; startFace++) {
    if (visited.has(startFace)) continue;

    const patch: number[] = [];
    const queue = [startFace];
    visited.add(startFace);

    while (queue.length > 0) {
      const face = queue.shift()!;
      patch.push(face);

      const neighbors = adjacency.get(face) || new Set();
      neighbors.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }

    patches.push(patch);
  }

  return patches;
}

/**
 * Create a new geometry from a list of face indices
 */
export function extractPatchGeometry(
  geometry: THREE.BufferGeometry,
  faceIndices: number[]
): THREE.BufferGeometry {
  const position = geometry.attributes.position;
  const normal = geometry.attributes.normal;
  const index = geometry.index;

  if (!index) {
    throw new Error('Geometry must be indexed');
  }

  const indexArray = index.array;
  const positionArray = position.array as Float32Array;
  const normalArray = normal?.array as Float32Array;

  // Map old vertex indices to new ones
  const vertexMap = new Map<number, number>();
  const newPositions: number[] = [];
  const newNormals: number[] = [];
  const newIndices: number[] = [];

  let newVertexIndex = 0;

  faceIndices.forEach(faceIndex => {
    const i = faceIndex * 3;
    const v0 = indexArray[i];
    const v1 = indexArray[i + 1];
    const v2 = indexArray[i + 2];

    [v0, v1, v2].forEach(oldIndex => {
      if (!vertexMap.has(oldIndex)) {
        vertexMap.set(oldIndex, newVertexIndex);

        // Copy position
        newPositions.push(
          positionArray[oldIndex * 3],
          positionArray[oldIndex * 3 + 1],
          positionArray[oldIndex * 3 + 2]
        );

        // Copy normal if available
        if (normalArray) {
          newNormals.push(
            normalArray[oldIndex * 3],
            normalArray[oldIndex * 3 + 1],
            normalArray[oldIndex * 3 + 2]
          );
        }

        newVertexIndex++;
      }
    });

    // Add triangle indices
    newIndices.push(
      vertexMap.get(v0)!,
      vertexMap.get(v1)!,
      vertexMap.get(v2)!
    );
  });

  const patchGeometry = new THREE.BufferGeometry();
  patchGeometry.setAttribute('position', new THREE.Float32BufferAttribute(newPositions, 3));

  if (newNormals.length > 0) {
    patchGeometry.setAttribute('normal', new THREE.Float32BufferAttribute(newNormals, 3));
  }

  patchGeometry.setIndex(newIndices);

  return patchGeometry;
}
