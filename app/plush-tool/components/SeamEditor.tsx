'use client';

import { useState } from 'react';
import * as THREE from 'three';
import { calculateMeshStats } from '@/app/lib/plush-tool/mesh-processing';

interface SeamEditorProps {
  geometry: THREE.BufferGeometry | null;
  seamEdges: Set<string>;
  onSeamEdgesChange: (seams: Set<string>) => void;
  onGeneratePatterns: () => void;
  isProcessing: boolean;
}

export default function SeamEditor({
  geometry,
  seamEdges,
  onSeamEdgesChange,
  onGeneratePatterns,
  isProcessing
}: SeamEditorProps) {
  const stats = geometry ? calculateMeshStats(geometry) : null;

  const handleClearSeams = () => {
    onSeamEdgesChange(new Set());
  };

  const handleEdgeClick = (edgeKey: string) => {
    const newSeams = new Set(seamEdges);

    if (newSeams.has(edgeKey)) {
      newSeams.delete(edgeKey);
    } else {
      newSeams.add(edgeKey);
    }

    onSeamEdgesChange(newSeams);
  };

  return (
    <div className="space-y-6">
      {/* Mesh Statistics */}
      {stats && (
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Mesh Info</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Vertices:</span>
              <span className="text-white font-mono">{stats.vertices.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Faces:</span>
              <span className="text-white font-mono">{stats.faces.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Edges:</span>
              <span className="text-white font-mono">{stats.edges.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Manifold:</span>
              <span className={stats.isManifold ? 'text-green-400' : 'text-red-400'}>
                {stats.isManifold ? 'Yes ✓' : 'No ✗'}
              </span>
            </div>
            {stats.boundaryEdges > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-400">Boundary Edges:</span>
                <span className="text-yellow-400 font-mono">{stats.boundaryEdges}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Seam Controls */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-3">Seam Editor</h3>

        <div className="space-y-3">
          <div className="text-sm text-gray-300">
            <p className="mb-2">Click edges on the 3D model to mark as seams (red).</p>
            <p className="text-gray-400">Seams define where the pattern will be cut.</p>
          </div>

          <div className="bg-gray-700 rounded p-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Seams marked:</span>
              <span className="text-white font-mono text-lg">{seamEdges.size}</span>
            </div>
          </div>

          <button
            onClick={handleClearSeams}
            disabled={seamEdges.size === 0}
            className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600 text-white rounded-lg transition-colors"
          >
            Clear All Seams
          </button>
        </div>
      </div>

      {/* Pattern Generation */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-3">Generate Patterns</h3>

        <div className="space-y-3">
          {seamEdges.size > 0 ? (
            <div className="text-sm text-gray-300">
              <p>Ready to generate patterns from marked seams.</p>
            </div>
          ) : (
            <div className="text-sm text-yellow-400">
              <p>Mark some seams first to generate patterns.</p>
            </div>
          )}

          <button
            onClick={onGeneratePatterns}
            disabled={seamEdges.size === 0 || isProcessing}
            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 text-white font-semibold rounded-lg transition-colors"
          >
            {isProcessing ? 'Processing...' : 'Generate Patterns'}
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-400 mb-2">Quick Guide</h3>
        <ol className="list-decimal list-inside text-xs text-gray-400 space-y-1">
          <li>Hover over edges to highlight them</li>
          <li>Click to toggle seam marking</li>
          <li>Red edges are marked as seams</li>
          <li>Click "Generate Patterns" when done</li>
        </ol>
      </div>
    </div>
  );
}
