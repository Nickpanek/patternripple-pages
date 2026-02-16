'use client';

import { useState } from 'react';
import * as THREE from 'three';
import MeshUploader from './components/MeshUploader';
import MeshViewer from './components/MeshViewer';
import SeamEditor from './components/SeamEditor';
import PatternViewer from './components/PatternViewer';
import ExportPanel from './components/ExportPanel';
import { extractPatches, extractPatchGeometry } from '@/app/lib/plush-tool/mesh-processing';
import { computeUVParameterization } from '@/app/lib/plush-tool/parameterization';
import { calculateDistortion } from '@/app/lib/plush-tool/distortion';
import { PatternPiece } from '@/app/lib/plush-tool/pattern-export';

export default function PlushToolPage() {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const [filename, setFilename] = useState<string>('');
  const [seamEdges, setSeamEdges] = useState<Set<string>>(new Set());
  const [hoveredEdge, setHoveredEdge] = useState<string | null>(null);
  const [patterns, setPatterns] = useState<PatternPiece[]>([]);
  const [patchGeometries, setPatchGeometries] = useState<THREE.BufferGeometry[]>([]);
  const [distortionMetrics, setDistortionMetrics] = useState<
    Array<{ maxStretch: number; avgStretch: number }>
  >([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMeshLoaded = (geo: THREE.BufferGeometry, name: string) => {
    setGeometry(geo);
    setFilename(name);
    setSeamEdges(new Set());
    setPatterns([]);
    setPatchGeometries([]);
    setDistortionMetrics([]);
  };

  const handleEdgeClick = (edgeKey: string) => {
    const newSeams = new Set(seamEdges);
    if (newSeams.has(edgeKey)) {
      newSeams.delete(edgeKey);
    } else {
      newSeams.add(edgeKey);
    }
    setSeamEdges(newSeams);
  };

  const handleGeneratePatterns = async () => {
    if (!geometry) return;

    setIsProcessing(true);

    // Use setTimeout to allow UI to update
    setTimeout(async () => {
      try {
        // Extract patches based on seam edges
        const patches = extractPatches(geometry, seamEdges);
        console.log(`Found ${patches.length} patches`);

        const newPatterns: PatternPiece[] = [];
        const newGeometries: THREE.BufferGeometry[] = [];
        const newMetrics: Array<{ maxStretch: number; avgStretch: number }> = [];

        for (let i = 0; i < patches.length; i++) {
          const patch = patches[i];

          // Extract patch geometry
          const patchGeo = extractPatchGeometry(geometry, patch);
          newGeometries.push(patchGeo);

          // Compute UV parameterization
          const uvResult = computeUVParameterization(patchGeo);

          if (uvResult.success && uvResult.uvCoordinates.length > 0) {
            // Calculate distortion
            const distortion = calculateDistortion(patchGeo, uvResult.uvCoordinates);
            newMetrics.push({
              maxStretch: distortion.maxStretch,
              avgStretch: distortion.avgStretch
            });

            // Create pattern piece
            const index = patchGeo.index;
            const indices = index ? Array.from(index.array) : [];

            const vertices: THREE.Vector2[] = [];
            const position = patchGeo.attributes.position;
            for (let j = 0; j < position.count; j++) {
              vertices.push(new THREE.Vector2(position.getX(j), position.getY(j)));
            }

            newPatterns.push({
              name: `Piece ${i + 1}`,
              vertices,
              indices,
              uvCoordinates: uvResult.uvCoordinates
            });
          } else {
            console.error(`Failed to parameterize patch ${i}:`, uvResult.error);
          }
        }

        setPatterns(newPatterns);
        setPatchGeometries(newGeometries);
        setDistortionMetrics(newMetrics);
      } catch (error) {
        console.error('Error generating patterns:', error);
        alert('Failed to generate patterns. See console for details.');
      } finally {
        setIsProcessing(false);
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-screen-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Plush Pattern Generator</h1>
              <p className="text-sm text-gray-400 mt-1">
                Convert 3D meshes into sewable plush patterns
              </p>
            </div>
            <a
              href="/"
              className="text-gray-400 hover:text-gray-300 text-sm"
            >
              ← Back to PatternRipple
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-screen-2xl mx-auto px-6 py-6">
        {!geometry ? (
          /* Upload State */
          <div className="max-w-2xl mx-auto">
            <MeshUploader onMeshLoaded={handleMeshLoaded} />
          </div>
        ) : (
          /* Working State */
          <div className="grid grid-cols-12 gap-6">
            {/* Left Sidebar - Controls */}
            <div className="col-span-3 space-y-6">
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-2">Loaded File:</div>
                <div className="text-white font-mono text-xs break-all">{filename}</div>
                <button
                  onClick={() => setGeometry(null)}
                  className="mt-3 w-full px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition-colors"
                >
                  Load Different File
                </button>
              </div>

              <SeamEditor
                geometry={geometry}
                seamEdges={seamEdges}
                onSeamEdgesChange={setSeamEdges}
                onGeneratePatterns={handleGeneratePatterns}
                isProcessing={isProcessing}
              />
            </div>

            {/* Center - 3D Viewer */}
            <div className="col-span-6">
              <div className="h-[800px]">
                <MeshViewer
                  geometry={geometry}
                  seamEdges={seamEdges}
                  hoveredEdge={hoveredEdge}
                  onEdgeClick={handleEdgeClick}
                  onEdgeHover={setHoveredEdge}
                />
              </div>
            </div>

            {/* Right Sidebar - Patterns & Export */}
            <div className="col-span-3 space-y-6">
              <PatternViewer patterns={patterns} distortionMetrics={distortionMetrics} />

              <ExportPanel
                patterns={patterns}
                geometries={patchGeometries}
                filename={filename}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 mt-12">
        <div className="max-w-screen-2xl mx-auto px-6 py-6 text-center text-sm text-gray-400">
          <p>All processing happens in your browser. Your files never leave your device.</p>
          <p className="mt-2">
            Made with ❤️ by{' '}
            <a href="/" className="text-blue-400 hover:text-blue-300">
              PatternRipple
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
