'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { PatternPiece } from '@/app/lib/plush-tool/pattern-export';

interface PatternViewerProps {
  patterns: PatternPiece[];
  distortionMetrics?: Array<{ maxStretch: number; avgStretch: number }>;
}

export default function PatternViewer({ patterns, distortionMetrics }: PatternViewerProps) {
  if (patterns.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 text-center text-gray-400">
        <div className="text-4xl mb-3">✂️</div>
        <p>No patterns generated yet</p>
        <p className="text-sm mt-2">Mark seams and generate patterns to see them here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-2">
          Pattern Pieces ({patterns.length})
        </h3>
        <p className="text-sm text-gray-400">
          2D flattened patterns ready for export
        </p>
      </div>

      {/* Pattern pieces */}
      {patterns.map((pattern, index) => (
        <PatternPieceCard
          key={index}
          pattern={pattern}
          index={index}
          metrics={distortionMetrics?.[index]}
        />
      ))}
    </div>
  );
}

function PatternPieceCard({
  pattern,
  index,
  metrics
}: {
  pattern: PatternPiece;
  index: number;
  metrics?: { maxStretch: number; avgStretch: number };
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || pattern.uvCoordinates.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#1f2937'; // gray-800
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Find bounds
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;

    pattern.uvCoordinates.forEach((uv) => {
      minX = Math.min(minX, uv.x);
      minY = Math.min(minY, uv.y);
      maxX = Math.max(maxX, uv.x);
      maxY = Math.max(maxY, uv.y);
    });

    const width = maxX - minX;
    const height = maxY - minY;
    const padding = 20;
    const scale = Math.min(
      (canvas.width - padding * 2) / width,
      (canvas.height - padding * 2) / height
    );

    // Helper to transform UV to canvas coords
    const toCanvas = (uv: THREE.Vector2) => ({
      x: (uv.x - minX) * scale + padding,
      y: canvas.height - ((uv.y - minY) * scale + padding)
    });

    // Draw triangles
    ctx.fillStyle = '#4b5563'; // gray-600
    ctx.strokeStyle = '#6b7280'; // gray-500
    ctx.lineWidth = 1;

    for (let i = 0; i < pattern.indices.length; i += 3) {
      const i0 = pattern.indices[i];
      const i1 = pattern.indices[i + 1];
      const i2 = pattern.indices[i + 2];

      const p0 = toCanvas(pattern.uvCoordinates[i0]);
      const p1 = toCanvas(pattern.uvCoordinates[i1]);
      const p2 = toCanvas(pattern.uvCoordinates[i2]);

      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // Draw boundary
    const uniqueEdges = new Set<string>();
    const edgeCounts = new Map<string, number>();

    for (let i = 0; i < pattern.indices.length; i += 3) {
      const i0 = pattern.indices[i];
      const i1 = pattern.indices[i + 1];
      const i2 = pattern.indices[i + 2];

      const edges = [
        [i0, i1],
        [i1, i2],
        [i2, i0]
      ];

      edges.forEach(([a, b]) => {
        const key = a < b ? `${a}-${b}` : `${b}-${a}`;
        edgeCounts.set(key, (edgeCounts.get(key) || 0) + 1);
      });
    }

    ctx.strokeStyle = '#ef4444'; // red-500
    ctx.lineWidth = 2;

    edgeCounts.forEach((count, key) => {
      if (count === 1) {
        const [a, b] = key.split('-').map(Number);
        const p0 = toCanvas(pattern.uvCoordinates[a]);
        const p1 = toCanvas(pattern.uvCoordinates[b]);

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
      }
    });
  }, [pattern]);

  const getStretchColor = (stretch: number) => {
    if (stretch < 1.1) return 'text-green-400';
    if (stretch < 1.2) return 'text-yellow-400';
    if (stretch < 1.5) return 'text-orange-400';
    return 'text-red-400';
  };

  const getStretchLabel = (stretch: number) => {
    if (stretch < 1.1) return 'Low';
    if (stretch < 1.2) return 'Medium';
    if (stretch < 1.5) return 'High';
    return 'Very High';
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-white font-semibold">Piece {index + 1}</h4>
        <span className="text-xs text-gray-400">
          {pattern.vertices.length} vertices
        </span>
      </div>

      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="w-full rounded border border-gray-700"
      />

      {metrics && (
        <div className="mt-3 space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-400">Max Stretch:</span>
            <span className={getStretchColor(metrics.maxStretch)}>
              {metrics.maxStretch.toFixed(2)}x ({getStretchLabel(metrics.maxStretch)})
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Avg Stretch:</span>
            <span className={getStretchColor(metrics.avgStretch)}>
              {metrics.avgStretch.toFixed(2)}x
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
