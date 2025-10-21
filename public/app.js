/* app.js - Photo Compressions Lab - Free (PNG upload enabled, JPEG export only) */

(() => {
  const cfg = window.PCL_CONFIG || {
    IS_PRO: false,
    FREE_MAX_PER_EXPORT: 5,
    FREE_BADGE_TEXT: 'PatternRipple Free',
    FREE_BADGE_OPACITY: 0.55,
    MAX_JPEG_QUALITY: 100
  };

  // ----- DOM -----
  const el = {
    fileInput: document.getElementById('fileInput'),
    dropzone: document.getElementById('dropzone'),
    queue: document.getElementById('queue'),
    btnClear: document.getElementById('btnClear'),
    btnExport: document.getElementById('btnExport'),
    status: document.getElementById('status'),
    toast: document.getElementById('toast'),
    inpLongEdge: document.getElementById('inpLongEdge'),
    inpQuality: document.getElementById('inpQuality'),
    chkStrip: document.getElementById('chkStrip'),
    wmText: document.getElementById('wmText'),
    wmOpacity: document.getElementById('wmOpacity'),
  };

  const state = { items: [], busy: false };

  // ----- Utils -----
  const uid = () => Math.random().toString(36).slice(2, 10);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const quality01 = () => clamp((Number(el.inpQuality?.value) || 80) / 100, 0, 1);
  const longEdgePx = () => clamp(Number(el.inpLongEdge?.value) || 2500, 200, 12000);

  function toast(msg, ms = 2200) {
    if (!el.toast) return;
    el.toast.textContent = msg;
    el.toast.classList.remove('hidden');
    setTimeout(() => el.toast.classList.add('hidden'), ms);
  }
  function setStatus(txt) { if (el.status) el.status.textContent = txt; }
  function setProgress(pct) {
    if (typeof window.__pclSetProgress === 'function') window.__pclSetProgress(pct);
  }

  // ----- Minimal EXIF orientation reader (tag 0x0112) for JPEG only -----
  async function readOrientation(file) {
    try {
      const buf = await file.slice(0, 128 * 1024).arrayBuffer();
      const v = new DataView(buf);
      if (v.getUint16(0) !== 0xFFD8) return 1; // not JPEG
      let off = 2;
      while (off + 3 < v.byteLength) {
        const marker = v.getUint16(off); off += 2;
        if (marker === 0xFFE1) {
          const len = v.getUint16(off); off += 2;
          if (v.getUint32(off) !== 0x45786966) break; // "Exif"
          off += 6;
          const tiff = off;
          const little = v.getUint16(tiff) === 0x4949;
          const get16 = (o) => little ? v.getUint16(o, true) : v.getUint16(o, false);
          const get32 = (o) => little ? v.getUint32(o, true) : v.getUint32(o, false);
          const ifd0 = tiff + get32(tiff + 4);
          const n = get16(ifd0);
          for (let i = 0; i < n; i++) {
            const e = ifd0 + 2 + i * 12;
            const tag = get16(e);
            if (tag === 0x0112) return get16(e + 8) || 1;
          }
          break;
        } else {
          const len = v.getUint16(off); off += len;
        }
      }
    } catch {}
    return 1;
  }

  function applyOrientation(ctx, canvas, orientation, w, h) {
    switch (orientation) {
      case 2: ctx.translate(w, 0); ctx.scale(-1, 1); break;
      case 3: ctx.translate(w, h); ctx.rotate(Math.PI); break;
      case 4: ctx.translate(0, h); ctx.scale(1, -1); break;
      case 5: canvas.width = h; canvas.height = w; ctx.rotate(0.5 * Math.PI); ctx.scale(1, -1); ctx.translate(0, -h); return;
      case 6: canvas.width = h; canvas.height = w; ctx.rotate(0.5 * Math.PI); ctx.translate(0, -h); return;
      case 7: canvas.width = h; canvas.height = w; ctx.rotate(0.5 * Math.PI); ctx.translate(w, -h); ctx.scale(-1, 1); return;
      case 8: canvas.width = h; canvas.height = w; ctx.rotate(-0.5 * Math.PI); ctx.translate(-w, 0); return;
      default: break;
    }
  }

  // ----- Pipeline -----
  async function processImage(file) {
    const orientation = await readOrientation(file); // will be 1 for PNG

    // decode
    const bitmap = await createImageBitmap(file).catch(async () => {
      const url = URL.createObjectURL(file);
      const img = await new Promise((res, rej) => {
        const im = new Image();
        im.onload = () => res(im);
        im.onerror = rej;
        im.src = url;
      });
      URL.revokeObjectURL(url);
      return img;
    });

    const srcW = bitmap.width, srcH = bitmap.height;
    const targetLong = longEdgePx();
    const long = Math.max(srcW, srcH);
    const scale = long > targetLong ? targetLong / long : 1;
    const outW0 = Math.round(srcW * scale);
    const outH0 = Math.round(srcH * scale);

    const canvas = document.createElement('canvas');
    canvas.width = outW0; canvas.height = outH0;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) throw new Error('Canvas unsupported');

    applyOrientation(ctx, canvas, orientation, outW0, outH0);

    if (orientation >= 5 && orientation <= 8) {
      ctx.drawImage(bitmap, 0, 0, canvas.height, canvas.width);
    } else {
      ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    }

    // user watermark
    const wmText = String(el.wmText?.value || '').trim();
    if (wmText) {
      const o = clamp(Number(el.wmOpacity?.value) || 0.2, 0, 1);
      ctx.globalAlpha = o;
      const pad = Math.round(Math.min(canvas.width, canvas.height) * 0.02);
      const fontSize = Math.round(Math.min(canvas.width, canvas.height) * 0.035);
      ctx.font = `${fontSize}px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial`;
      ctx.fillStyle = '#000000';
      ctx.textBaseline = 'bottom';
      ctx.lineWidth = Math.max(2, Math.round(fontSize * 0.08));
      ctx.strokeStyle = 'rgba(255,255,255,0.9)';
      const m = ctx.measureText(wmText);
      const x = canvas.width - pad - m.width;
      const y = canvas.height - pad;
      ctx.strokeText(wmText, x, y);
      ctx.fillText(wmText, x, y);
      ctx.globalAlpha = 1;
    }

    // free badge
    if (!cfg.IS_PRO && cfg.FREE_BADGE_TEXT) {
      const o = clamp(Number(cfg.FREE_BADGE_OPACITY) || 0.55, 0, 1);
      ctx.globalAlpha = o;
      const fontSize = Math.max(12, Math.round(Math.min(canvas.width, canvas.height) * 0.025));
      ctx.font = `bold ${fontSize}px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial`;
      ctx.textBaseline = 'top';
      const pad = Math.round(fontSize * 0.4);
      const text = cfg.FREE_BADGE_TEXT;
      const w = ctx.measureText(text).width + pad * 1.6;
      const h = Math.round(fontSize * 1.6);
      const x = canvas.width - w - pad;
      const y = pad;
      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.fillRect(x, y, w, h);
      ctx.fillStyle = '#0f172a';
      ctx.fillText(text, x + pad * 0.8, y + Math.round((h - fontSize) * 0.5));
      ctx.globalAlpha = 1;
    }

    // encode jpeg only (re-encode strips metadata)
    const q = quality01();
    const blob = await new Promise((res, rej) =>
      canvas.toBlob((b) => b ? res(b) : rej(new Error('Encoding failed')), 'image/jpeg', q)
    );

    return blob;
  }

  // ----- Queue UI -----
  function renderQueue() {
    const wrap = el.queue;
    if (!wrap) return;
    wrap.innerHTML = '';
    for (const item of state.items) {
      const card = document.createElement('div');
      card.className = 'flex items-center gap-3 p-2 rounded border';
      const img = document.createElement('img');
      img.className = 'thumb';
      img.loading = 'lazy';
      img.alt = item.name;
      img.src = URL.createObjectURL(item.file);
      img.onload = () => URL.revokeObjectURL(img.src);

      const meta = document.createElement('div');
      meta.className = 'text-sm';
      meta.innerHTML = `<div class="font-medium truncate max-w-[14rem]" title="${item.name}">${item.name}</div>
        <div class="text-slate-500">${Math.round(item.size / 1024)} KB</div>`;

      const del = document.createElement('button');
      del.className = 'ml-auto px-2 py-1 text-xs rounded bg-slate-200 hover:bg-slate-300';
      del.textContent = 'Remove';
      del.addEventListener('click', () => {
        state.items = state.items.filter(x => x.id !== item.id);
        renderQueue();
      }, { passive: true });

      card.append(img, meta, del);
      wrap.appendChild(card);
    }
  }

  // accept JPEG and PNG for upload, export remains JPEG only
  function addFiles(files) {
    const list = Array.from(files).filter(f => /^image\/(jpe?g|png)$/i.test(f.type));
    for (const f of list) state.items.push({ file: f, id: uid(), name: f.name, size: f.size });
    renderQueue();
    if (list.length) {
      const jpegCount = list.filter(f => /^image\/jpe?g$/i.test(f.type)).length;
      const pngCount = list.filter(f => /^image\/png$/i.test(f.type)).length;
      toast(`Added ${list.length} image${list.length > 1 ? 's' : ''} (${jpegCount} JPG, ${pngCount} PNG)`);
    } else {
      toast('Only PNG and JPEG are supported');
    }
  }

  // ----- Export -----
  async function exportZip() {
    if (state.busy) return;
    if (!state.items.length) { toast('Add images first'); return; }

    const maxCount = cfg.IS_PRO ? state.items.length : Math.min(cfg.FREE_MAX_PER_EXPORT, state.items.length);
    const items = state.items.slice(0, maxCount);

    state.busy = true;
    setStatus('Processing...');
    setProgress(0);

    const zip = new JSZip();
    let done = 0;

    for (const item of items) {
      try {
        const blob = await processImage(item.file);
        const base = item.name.replace(/\.[^.]+$/i, '');
        const outName = `${base}_compressed.jpg`;
        zip.file(outName, blob);
      } catch (e) {
        console.error(e);
        toast(`Failed: ${item.name}`);
      } finally {
        done++;
        setProgress(Math.round((done / items.length) * 100));
      }
    }

    setStatus('Zipping...');
    const zipBlob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });

    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `photos_${Date.now()}.zip`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    setStatus('Idle');
    setProgress(0);
    state.busy = false;
    toast(`Exported ${items.length} file${items.length > 1 ? 's' : ''}`);
  }

  // ----- Events -----
  el.fileInput?.addEventListener('change', (e) => {
    const files = /** @type {HTMLInputElement} */(e.target).files;
    if (files && files.length) addFiles(files);
  });

  el.dropzone?.addEventListener('drop', (e) => {
    e.preventDefault();
    const dt = e.dataTransfer;
    if (dt?.files?.length) addFiles(dt.files);
  }, { passive: false });

  el.btnClear?.addEventListener('click', () => {
    state.items = [];
    renderQueue();
    setProgress(0);
    setStatus('Idle');
  }, { passive: true });

  el.btnExport?.addEventListener('click', () => { exportZip(); }, { passive: true });

  // Improve accept attribute if HTML missed it
  if (el.fileInput && !el.fileInput.getAttribute('accept')) {
    el.fileInput.setAttribute('accept', 'image/jpeg,image/jpg,image/pjpeg,image/png');
  }
})();