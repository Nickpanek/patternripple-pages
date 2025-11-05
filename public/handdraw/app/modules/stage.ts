import { state } from './state.js';
import { applyStrokeDashAnimation } from './svg-utils.js';
import { getActiveSegmentProgress } from './timeline.js';
import { updateHandPosition } from './hand.js';

export function initStage() {
  const stage = document.getElementById('stage') as SVGSVGElement;
  if (!stage) return;

  // Pan and zoom support can be added here
}

export function renderFrame(time: number) {
  const activeData = getActiveSegmentProgress(time);

  // Reset all paths
  state.svgPaths.forEach(pathData => {
    pathData.element.style.strokeDasharray = '';
    pathData.element.style.strokeDashoffset = '';
  });

  if (activeData) {
    const { segment, progress } = activeData;
    const pathData = state.svgPaths.find(p => p.id === segment.pathId);

    if (pathData) {
      applyStrokeDashAnimation(pathData.element, progress, pathData.totalLength);
      updateHandPosition(pathData, progress);
    }
  } else {
    // Clear hand if no active segment
    const handCanvas = document.getElementById('hand-canvas') as HTMLCanvasElement;
    if (handCanvas) {
      const ctx = handCanvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, handCanvas.width, handCanvas.height);
      }
    }
  }
}
