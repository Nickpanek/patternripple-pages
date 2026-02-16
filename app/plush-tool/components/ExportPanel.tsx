'use client';

import { useState } from 'react';
import * as THREE from 'three';
import { PatternPiece, exportPatternsAsZip } from '@/app/lib/plush-tool/pattern-export';

interface ExportPanelProps {
  patterns: PatternPiece[];
  geometries: THREE.BufferGeometry[];
  filename: string;
}

export default function ExportPanel({ patterns, geometries, filename }: ExportPanelProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (patterns.length === 0) return;

    setIsExporting(true);

    try {
      const zipBlob = await exportPatternsAsZip(patterns, geometries);

      // Download the ZIP file
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename.replace(/\.[^/.]+$/, '')}_patterns.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export patterns');
    } finally {
      setIsExporting(false);
    }
  };

  if (patterns.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-white mb-3">Export Patterns</h3>

      <div className="space-y-4">
        <div className="bg-gray-700 rounded p-3 text-sm">
          <div className="flex justify-between mb-2">
            <span className="text-gray-300">Pattern pieces:</span>
            <span className="text-white font-mono">{patterns.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Format:</span>
            <span className="text-white">SVG (ZIP)</span>
          </div>
        </div>

        <div className="text-xs text-gray-400 space-y-1">
          <p>• Each piece exported as separate SVG</p>
          <p>• 6mm seam allowance included</p>
          <p>• Grain line arrows added</p>
          <p>• README with instructions</p>
        </div>

        <button
          onClick={handleExport}
          disabled={isExporting}
          className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
        >
          {isExporting ? 'Exporting...' : 'Download Patterns (ZIP)'}
        </button>

        <div className="bg-blue-900/30 border border-blue-700 rounded p-3 text-xs text-blue-200">
          <p className="font-semibold mb-1">Printing Instructions:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Print each SVG at 100% scale</li>
            <li>Cut along solid black line</li>
            <li>Sew along dashed gray line</li>
            <li>Align grain line with fabric grain</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
