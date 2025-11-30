import { state } from './state.js';

export async function loadAudio(filePath: string) {
  try {
    const audioData = await window.__TAURI__.invoke('read_audio_file', { path: filePath });
    const arrayBuffer = base64ToArrayBuffer(audioData);

    if (!state.audioContext) {
      state.audioContext = new AudioContext();
    }

    state.audioBuffer = await state.audioContext.decodeAudioData(arrayBuffer);
  } catch (err) {
    console.error('Failed to load audio:', err);
  }
}

export function renderWaveform() {
  const waveformDiv = document.getElementById('waveform');
  if (!waveformDiv || !state.audioBuffer) return;

  const canvas = document.createElement('canvas');
  canvas.width = waveformDiv.clientWidth;
  canvas.height = waveformDiv.clientHeight;
  canvas.style.width = '100%';
  canvas.style.height = '100%';

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const data = state.audioBuffer.getChannelData(0);
  const step = Math.ceil(data.length / canvas.width);
  const amp = canvas.height / 2;

  ctx.fillStyle = '#252526';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#0e639c';
  ctx.lineWidth = 1;
  ctx.beginPath();

  for (let i = 0; i < canvas.width; i++) {
    let min = 1.0;
    let max = -1.0;
    for (let j = 0; j < step; j++) {
      const datum = data[i * step + j];
      if (datum < min) min = datum;
      if (datum > max) max = datum;
    }
    ctx.moveTo(i, (1 + min) * amp);
    ctx.lineTo(i, (1 + max) * amp);
  }

  ctx.stroke();

  waveformDiv.innerHTML = '';
  waveformDiv.appendChild(canvas);
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}
