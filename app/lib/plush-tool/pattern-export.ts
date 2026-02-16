import * as THREE from 'three';
import JSZip from 'jszip';

const SEAM_ALLOWANCE_MM = 6;
const MM_TO_PX = 3.7795275591; // 96 DPI

export interface PatternPiece {
  name: string;
  vertices: THREE.Vector2[];
  indices: number[];
  uvCoordinates: THREE.Vector2[];
}

/**
 * Offset a polygon outward by a given distance
 */
function offsetPolygon(points: THREE.Vector2[], offset: number): THREE.Vector2[] {
  const n = points.length;
  const offsetPoints: THREE.Vector2[] = [];

  for (let i = 0; i < n; i++) {
    const prev = points[(i - 1 + n) % n];
    const curr = points[i];
    const next = points[(i + 1) % n];

    // Edge vectors
    const edge1 = new THREE.Vector2().subVectors(curr, prev).normalize();
    const edge2 = new THREE.Vector2().subVectors(next, curr).normalize();

    // Perpendicular vectors (pointing outward)
    const perp1 = new THREE.Vector2(-edge1.y, edge1.x);
    const perp2 = new THREE.Vector2(-edge2.y, edge2.x);

    // Average perpendicular
    const avgPerp = new THREE.Vector2().addVectors(perp1, perp2).normalize();

    // Offset point
    const offsetPoint = new THREE.Vector2().addVectors(
      curr,
      avgPerp.multiplyScalar(offset)
    );

    offsetPoints.push(offsetPoint);
  }

  return offsetPoints;
}

/**
 * Extract boundary polygon from UV coordinates
 */
function extractBoundaryPolygon(
  geometry: THREE.BufferGeometry,
  uvCoordinates: THREE.Vector2[]
): THREE.Vector2[] {
  const index = geometry.index;
  if (!index) return [];

  // Find boundary edges
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
      if (!edgeCounts.has(key)) {
        edgeCounts.set(key, [va, vb]);
      } else {
        edgeCounts.delete(key);
      }
    });
  }

  if (edgeCounts.size === 0) return [];

  // Build boundary edge adjacency
  const boundaryAdj = new Map<number, number[]>();
  edgeCounts.forEach(([va, vb]) => {
    if (!boundaryAdj.has(va)) boundaryAdj.set(va, []);
    if (!boundaryAdj.has(vb)) boundaryAdj.set(vb, []);
    boundaryAdj.get(va)!.push(vb);
    boundaryAdj.get(vb)!.push(va);
  });

  // Walk boundary loop
  const loop: number[] = [];
  const start = boundaryAdj.keys().next().value;
  if (start === undefined) return [];
  let current: number = start;
  let prev = -1;

  do {
    loop.push(current);
    const neighbors = boundaryAdj.get(current) || [];
    const next = neighbors.find(n => n !== prev);
    if (next === undefined) break;
    prev = current;
    current = next;
  } while (current !== start && loop.length < boundaryAdj.size * 2);

  // Convert to UV coordinates
  return loop.map(i => uvCoordinates[i].clone());
}

/**
 * Generate SVG for a pattern piece
 */
export function generatePatternSVG(
  piece: PatternPiece,
  geometry: THREE.BufferGeometry,
  pieceIndex: number
): string {
  const boundary = extractBoundaryPolygon(geometry, piece.uvCoordinates);

  if (boundary.length < 3) {
    return '';
  }

  // Scale from normalized [0,1] to a reasonable size (e.g., 200mm = 200px at 1:1 scale)
  const scale = 200;

  // Calculate bounds
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;

  boundary.forEach(p => {
    minX = Math.min(minX, p.x);
    minY = Math.min(minY, p.y);
    maxX = Math.max(maxX, p.x);
    maxY = Math.max(maxY, p.y);
  });

  const width = (maxX - minX) * scale;
  const height = (maxY - minY) * scale;
  const padding = SEAM_ALLOWANCE_MM * MM_TO_PX + 20;

  // Offset for seam allowance
  const offsetBoundary = offsetPolygon(boundary, SEAM_ALLOWANCE_MM / scale);

  // Generate SVG path for cutting line (with seam allowance)
  const cuttingPath = offsetBoundary
    .map((p, i) => {
      const x = (p.x - minX) * scale + padding;
      const y = (p.y - minY) * scale + padding;
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ') + ' Z';

  // Generate SVG path for sewing line (original boundary)
  const sewingPath = boundary
    .map((p, i) => {
      const x = (p.x - minX) * scale + padding;
      const y = (p.y - minY) * scale + padding;
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ') + ' Z';

  // Grain line (vertical arrow in the center)
  const centerX = width / 2 + padding;
  const centerY = height / 2 + padding;
  const grainLineLength = Math.min(width, height) * 0.4;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
     width="${(width + padding * 2).toFixed(2)}"
     height="${(height + padding * 2).toFixed(2)}"
     viewBox="0 0 ${(width + padding * 2).toFixed(2)} ${(height + padding * 2).toFixed(2)}">

  <!-- Cutting line (with seam allowance) -->
  <path d="${cuttingPath}"
        fill="none"
        stroke="black"
        stroke-width="2"/>

  <!-- Sewing line -->
  <path d="${sewingPath}"
        fill="none"
        stroke="gray"
        stroke-width="1"
        stroke-dasharray="5,5"/>

  <!-- Grain line -->
  <line x1="${centerX}"
        y1="${centerY - grainLineLength / 2}"
        x2="${centerX}"
        y2="${centerY + grainLineLength / 2}"
        stroke="black"
        stroke-width="1.5"/>

  <!-- Grain line arrows -->
  <path d="M ${centerX} ${centerY - grainLineLength / 2}
           l -5 10
           m 5 -10
           l 5 10"
        fill="none"
        stroke="black"
        stroke-width="1.5"/>

  <path d="M ${centerX} ${centerY + grainLineLength / 2}
           l -5 -10
           m 5 10
           l 5 -10"
        fill="none"
        stroke="black"
        stroke-width="1.5"/>

  <!-- Piece label -->
  <text x="${padding}"
        y="${padding - 5}"
        font-family="Arial, sans-serif"
        font-size="14"
        fill="black">
    Piece ${pieceIndex + 1}
  </text>

  <!-- Seam allowance note -->
  <text x="${padding}"
        y="${height + padding * 1.5}"
        font-family="Arial, sans-serif"
        font-size="12"
        fill="gray">
    Seam allowance: ${SEAM_ALLOWANCE_MM}mm
  </text>
</svg>`;

  return svg;
}

/**
 * Export all pattern pieces as a ZIP file
 */
export async function exportPatternsAsZip(
  pieces: PatternPiece[],
  geometries: THREE.BufferGeometry[]
): Promise<Blob> {
  const zip = new JSZip();

  pieces.forEach((piece, index) => {
    const svg = generatePatternSVG(piece, geometries[index], index);
    if (svg) {
      zip.file(`pattern_piece_${index + 1}.svg`, svg);
    }
  });

  // Add a README
  const readme = `Plush Pattern Export
Generated by PatternRipple Plush Tool

This archive contains ${pieces.length} pattern piece(s).

Instructions:
1. Print each SVG at 100% scale (no scaling)
2. Cut along the solid black line (includes ${SEAM_ALLOWANCE_MM}mm seam allowance)
3. Sew along the dashed gray line
4. The arrow indicates the grain line direction

Notes:
- All seam allowances are ${SEAM_ALLOWANCE_MM}mm
- Grain line should run parallel to the fabric grain
`;

  zip.file('README.txt', readme);

  return await zip.generateAsync({ type: 'blob' });
}
