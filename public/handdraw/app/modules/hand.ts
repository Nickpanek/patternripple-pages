import { state, SVGPathData } from './state.js';
import { getPointAtLength, getTangentAtLength } from './svg-utils.js';

const handImages: { [key: string]: HTMLImageElement } = {};

export function loadHandImages() {
  ['left', 'right'].forEach(type => {
    const img = new Image();
    img.src = `assets/hands/hand-${type}.png`;
    handImages[type] = img;
  });
}

loadHandImages();

export function updateHandPosition(pathData: SVGPathData, progress: number) {
  const canvas = document.getElementById('hand-canvas') as HTMLCanvasElement;
  if (!canvas) return;

  const stage = document.getElementById('stage') as SVGSVGElement;
  if (!stage) return;

  canvas.width = stage.clientWidth;
  canvas.height = stage.clientHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const length = progress * pathData.totalLength;
  const point = getPointAtLength(pathData.element, length);
  const angle = getTangentAtLength(pathData.element, length);

  const handImg = handImages[state.handType];
  if (!handImg || !handImg.complete) return;

  ctx.save();

  // Map SVG coordinates to canvas
  const bbox = stage.getBoundingClientRect();
  const viewBox = stage.viewBox.baseVal;
  const scaleX = bbox.width / viewBox.width;
  const scaleY = bbox.height / viewBox.height;

  const x = point.x * scaleX + state.handOffsetX;
  const y = point.y * scaleY + state.handOffsetY;

  ctx.translate(x, y);
  ctx.rotate(angle);

  const handSize = 60;
  ctx.drawImage(handImg, -handSize / 2, -handSize / 2, handSize, handSize);

  ctx.restore();
}
