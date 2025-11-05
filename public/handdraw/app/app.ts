import { initStage, renderFrame } from './modules/stage.js';
import { initTimeline, addSegment, playTimeline, stopTimeline } from './modules/timeline.js';
import { loadSVG } from './modules/svg-utils.js';
import { loadAudio, renderWaveform } from './modules/audio.js';
import { updateHandPosition } from './modules/hand.js';
import { state } from './modules/state.js';

declare global {
  interface Window {
    __TAURI__: any;
  }
}

const { invoke } = window.__TAURI__;

document.addEventListener('DOMContentLoaded', () => {
  initStage();
  initTimeline();

  document.getElementById('btn-add-svg')?.addEventListener('click', async () => {
    try {
      const selected = await invoke('select_svg_file');
      if (selected) {
        await loadSVG(selected as string);
        updateAssetsList();
      }
    } catch (err) {
      console.error('Failed to load SVG:', err);
    }
  });

  document.getElementById('btn-add-audio')?.addEventListener('click', async () => {
    try {
      const selected = await invoke('select_audio_file');
      if (selected) {
        await loadAudio(selected as string);
        renderWaveform();
        updateAssetsList();
      }
    } catch (err) {
      console.error('Failed to load audio:', err);
    }
  });

  document.getElementById('btn-play')?.addEventListener('click', () => {
    playTimeline();
  });

  document.getElementById('btn-stop')?.addEventListener('click', () => {
    stopTimeline();
  });

  document.getElementById('btn-add-segment')?.addEventListener('click', () => {
    const pathId = state.svgPaths.length > 0 ? state.svgPaths[0].id : 'demo-path';
    addSegment({
      id: `seg-${Date.now()}`,
      pathId,
      startTime: 0,
      duration: 3,
      easing: 'linear'
    });
  });

  document.getElementById('btn-export-mp4')?.addEventListener('click', async () => {
    try {
      await invoke('export_video', { format: 'mp4', width: 1920, height: 1080, fps: 30 });
      alert('Export started. Check project folder.');
    } catch (err) {
      console.error('Export failed:', err);
    }
  });

  document.getElementById('btn-export-webm')?.addEventListener('click', async () => {
    try {
      await invoke('export_video', { format: 'webm', width: 1920, height: 1080, fps: 30 });
      alert('Export started. Check project folder.');
    } catch (err) {
      console.error('Export failed:', err);
    }
  });

  document.getElementById('btn-zoom-in')?.addEventListener('click', () => {
    state.zoom = Math.min(state.zoom * 1.2, 5);
    renderFrame(state.currentTime);
  });

  document.getElementById('btn-zoom-out')?.addEventListener('click', () => {
    state.zoom = Math.max(state.zoom / 1.2, 0.1);
    renderFrame(state.currentTime);
  });

  document.getElementById('btn-zoom-reset')?.addEventListener('click', () => {
    state.zoom = 1;
    renderFrame(state.currentTime);
  });

  // Initial render with demo path
  if (document.getElementById('demo-path')) {
    loadSVG('demo');
  }
  renderFrame(0);
});

function updateAssetsList() {
  const list = document.getElementById('assets-list');
  if (!list) return;

  let html = '<ul>';
  state.svgPaths.forEach(p => {
    html += `<li>Path: ${p.id}</li>`;
  });
  if (state.audioBuffer) {
    html += `<li>Audio: ${state.audioBuffer.duration.toFixed(2)}s</li>`;
  }
  html += '</ul>';
  list.innerHTML = html;
}
