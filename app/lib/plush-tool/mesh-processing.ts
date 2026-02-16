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

/**
 * Calculate face normal
 */
function getFaceNormal(geometry: THREE.BufferGeometry, faceIndex: number): THREE.Vector3 {
  const position = geometry.attributes.position;
  const index = geometry.index;

  if (!index) return new THREE.Vector3();

  const i = faceIndex * 3;
  const v0 = index.array[i];
  const v1 = index.array[i + 1];
  const v2 = index.array[i + 2];

  const p0 = new THREE.Vector3(
    position.getX(v0),
    position.getY(v0),
    position.getZ(v0)
  );
  const p1 = new THREE.Vector3(
    position.getX(v1),
    position.getY(v1),
    position.getZ(v1)
  );
  const p2 = new THREE.Vector3(
    position.getX(v2),
    position.getY(v2),
    position.getZ(v2)
  );

  const v01 = new THREE.Vector3().subVectors(p1, p0);
  const v02 = new THREE.Vector3().subVectors(p2, p0);

  return new THREE.Vector3().crossVectors(v01, v02).normalize();
}

/**
 * Automatically detect good seam candidates based on edge sharpness
 */
export function autoDetectSeams(
  geometry: THREE.BufferGeometry,
  options: {
    angleThreshold?: number; // In degrees, default 30
    maxSeams?: number; // Maximum number of seams to suggest
    minSeams?: number; // Minimum number of seams to suggest
  } = {}
): Set<string> {
  const {
    angleThreshold = 30,
    maxSeams = 20,
    minSeams = 3
  } = options;

  const edges = buildEdgeMap(geometry);
  const seamCandidates: Array<{ key: string; score: number }> = [];

  // Calculate dihedral angle for each edge
  edges.forEach(edge => {
    // Skip boundary edges (they only have one face)
    if (edge.faces.length !== 2) {
      return;
    }

    const [f1, f2] = edge.faces;
    const n1 = getFaceNormal(geometry, f1);
    const n2 = getFaceNormal(geometry, f2);

    // Calculate angle between normals
    const dot = n1.dot(n2);
    const angle = Math.acos(Math.max(-1, Math.min(1, dot))) * (180 / Math.PI);

    // Higher score for sharper angles
    if (angle > angleThreshold) {
      seamCandidates.push({
        key: edge.key,
        score: angle
      });
    }
  });

  // Sort by score (sharpest angles first)
  seamCandidates.sort((a, b) => b.score - a.score);

  // Select top candidates
  const numSeams = Math.min(
    Math.max(seamCandidates.length, minSeams),
    maxSeams
  );

  const selectedSeams = new Set<string>();
  for (let i = 0; i < Math.min(numSeams, seamCandidates.length); i++) {
    selectedSeams.add(seamCandidates[i].key);
  }

  return selectedSeams;
}
