import { state, SVGPathData } from './state.js';

export async function loadSVG(filePath: string) {
  if (filePath === 'demo') {
    const demoPath = document.getElementById('demo-path') as SVGPathElement;
    if (demoPath) {
      const totalLength = demoPath.getTotalLength();
      state.svgPaths.push({
        id: 'demo-path',
        element: demoPath,
        totalLength
      });
    }
    return;
  }

  try {
    const svgContent = await window.__TAURI__.invoke('read_file', { path: filePath });
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
    const paths = svgDoc.querySelectorAll('path');

    const stage = document.getElementById('stage') as SVGSVGElement;
    paths.forEach((path, idx) => {
      const imported = document.importNode(path, true) as SVGPathElement;
      imported.id = imported.id || `path-${Date.now()}-${idx}`;
      imported.setAttribute('stroke', '#ffffff');
      imported.setAttribute('stroke-width', '4');
      imported.setAttribute('fill', 'none');
      stage.appendChild(imported);

      const totalLength = imported.getTotalLength();
      state.svgPaths.push({
        id: imported.id,
        element: imported,
        totalLength
      });
    });
  } catch (err) {
    console.error('Failed to load SVG:', err);
  }
}

export function getPointAtLength(pathElement: SVGPathElement, length: number): DOMPoint {
  return pathElement.getPointAtLength(length);
}

export function getTangentAtLength(pathElement: SVGPathElement, length: number): number {
  const delta = 1;
  const p1 = pathElement.getPointAtLength(Math.max(0, length - delta));
  const p2 = pathElement.getPointAtLength(length + delta);
  return Math.atan2(p2.y - p1.y, p2.x - p1.x);
}

export function applyStrokeDashAnimation(
  pathElement: SVGPathElement,
  progress: number,
  totalLength: number
) {
  const currentLength = progress * totalLength;
  pathElement.style.strokeDasharray = `${currentLength} ${totalLength}`;
  pathElement.style.strokeDashoffset = '0';
}
