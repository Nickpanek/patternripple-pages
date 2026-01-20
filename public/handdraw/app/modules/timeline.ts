import { state, TimelineSegment } from './state.js';
import { renderFrame } from './stage.js';

let animationFrameId: number | null = null;
let startTime: number = 0;

export function initTimeline() {
  const timeline = document.getElementById('timeline');
  if (!timeline) return;

  // Setup timeline interaction
  timeline.addEventListener('click', (e) => {
    const rect = timeline.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const time = (x / rect.width) * 10; // 10 second timeline
    state.currentTime = time;
    renderFrame(time);
  });
}

export function addSegment(segment: TimelineSegment) {
  state.segments.push(segment);
  renderSegments();
}

function renderSegments() {
  const timeline = document.getElementById('timeline');
  if (!timeline) return;

  const existingSegments = timeline.querySelectorAll('.segment');
  existingSegments.forEach(s => s.remove());

  state.segments.forEach(seg => {
    const div = document.createElement('div');
    div.className = 'segment';
    div.id = seg.id;
    div.textContent = seg.pathId;

    const left = (seg.startTime / 10) * 100; // 10 sec timeline
    const width = (seg.duration / 10) * 100;

    div.style.left = `${left}%`;
    div.style.width = `${width}%`;

    timeline.appendChild(div);
  });
}

export function playTimeline() {
  if (state.isPlaying) return;

  state.isPlaying = true;
  startTime = performance.now() - state.currentTime * 1000;

  function animate(now: number) {
    if (!state.isPlaying) return;

    const elapsed = (now - startTime) / 1000;
    state.currentTime = elapsed;

    if (elapsed > 10) {
      stopTimeline();
      return;
    }

    renderFrame(elapsed);
    animationFrameId = requestAnimationFrame(animate);
  }

  animationFrameId = requestAnimationFrame(animate);

  // Play audio if available
  if (state.audioBuffer && state.audioContext) {
    const source = state.audioContext.createBufferSource();
    source.buffer = state.audioBuffer;
    source.connect(state.audioContext.destination);
    source.start(0, state.currentTime);
  }
}

export function stopTimeline() {
  state.isPlaying = false;
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  if (state.audioContext) {
    state.audioContext.close();
    state.audioContext = new AudioContext();
  }
}

function easeValue(t: number, easing: string): number {
  switch (easing) {
    case 'ease-in': return t * t;
    case 'ease-out': return t * (2 - t);
    case 'ease-in-out': return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    default: return t; // linear
  }
}

export function getActiveSegmentProgress(time: number): { segment: TimelineSegment; progress: number } | null {
  for (const seg of state.segments) {
    if (time >= seg.startTime && time <= seg.startTime + seg.duration) {
      const localTime = time - seg.startTime;
      const rawProgress = localTime / seg.duration;
      const progress = easeValue(rawProgress, seg.easing);
      return { segment: seg, progress };
    }
  }
  return null;
}
