'use client';

import { useState } from 'react';
import * as THREE from 'three';
import { calculateMeshStats, autoDetectSeams } from '@/app/lib/plush-tool/mesh-processing';

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

  const handleAutoDetect = () => {
    if (!geometry) return;

    const detectedSeams = autoDetectSeams(geometry, {
      angleThreshold: 25, // Detect edges with >25 degree angle
      maxSeams: 15,
      minSeams: 3
    });

    onSeamEdgesChange(detectedSeams);
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
          <div className="text-sm text-gray-300 space-y-2">
            <p><strong>How to mark seams:</strong></p>
            <ol className="list-decimal list-inside space-y-1 text-gray-400 ml-2">
              <li>Hover over the model - edges turn <span className="text-green-400 font-semibold">green</span></li>
              <li>Click a green edge to mark it as a seam</li>
              <li>Marked seams turn <span className="text-red-400 font-semibold">red</span></li>
              <li>Click a red edge again to unmark it</li>
            </ol>
          </div>

          <div className="bg-gray-700 rounded p-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Seams marked:</span>
              <span className="text-white font-mono text-lg">{seamEdges.size}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAutoDetect}
              disabled={!geometry}
              className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-800 disabled:text-gray-600 text-white font-semibold rounded-lg transition-colors"
            >
              🪄 Auto Detect
            </button>
            <button
              onClick={handleClearSeams}
              disabled={seamEdges.size === 0}
              className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600 text-white rounded-lg transition-colors"
            >
              Clear All
            </button>
          </div>
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
        <h3 className="text-sm font-semibold text-gray-400 mb-2">💡 Tips</h3>
        <ul className="text-xs text-gray-400 space-y-1">
          <li>• <span className="text-green-400">Green</span> = hovering</li>
          <li>• <span className="text-red-400">Red</span> = seam marked</li>
          <li>• Rotate the view to find edges easily</li>
          <li>• Mark edges to "cut" the shape flat</li>
        </ul>
      </div>
    </div>
  );
}
