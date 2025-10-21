/* app.js - Orientation and watermark test with EXIF orientation detection */

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
    el.toast.style.visibility = 'visible';
    setTimeout(() => {
      if (el.toast) el.toast.style.visibility = 'hidden';
    }, ms);
  }
  function setStatus(txt) { if (el.status) el.status.textContent = txt; }
  function setProgress(pct) { /* stub progress */ }

  // ----- EXIF orientation reader -----
  async function getOrientation(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const view = new DataView(e.target.result);
        if (view.getUint16(0, false) !== 0xFFD8) {
          return resolve(1); // not a JPEG
        }
        let offset = 2;
        const length = view.byteLength;
        while (offset < length) {
          const marker = view.getUint16(offset, false);
          offset += 2;
          if (marker === 0xFFE1) {
            const app1Length = view.getUint16(offset, false);
            offset += 2;
            if (view.getUint32(offset, false) !== 0x45786966) break; // not "Exif"
            offset += 6; // skip "Exif\0\0"
            const little = view.getUint16(offset, false) === 0x4949;
            offset += view.getUint32(offset + 4, little);
            const tags = view.getUint16(offset, little);
            offset += 2;
            for (let i = 0; i < tags; i++) {
              const entryOffset = offset + i * 12;
              const tag = view.getUint16(entryOffset, little);
              if (tag === 0x0112) {
                const orientation = view.getUint16(entryOffset + 8, little);
                return resolve(orientation);
              }
            }
            break;
          } else if ((marker & 0xff00) !== 0xff00) {
            break;
          } else {
            offset += view.getUint16(offset, false);
          }
        }
        return resolve(1);
      };
      reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
    });
  }

  // ----- Decode via browser (honours EXIF when simply displayed) -----
  function loadImage(file) {
    return new Promise((res, rej) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => { URL.revokeObjectURL(url); res(img); };
      img.onerror = (e) => { URL.revokeObjectURL(url); rej(e); };
      img.src = url;
    });
  }

  // ----- Pipeline -----
  async function processImage(file) {
    const orientation = await getOrientation(file);
    const img = await loadImage(file);

    const srcW = img.naturalWidth || img.width;
    const srcH = img.naturalHeight || img.height;

    // Determine oriented width/height
    let oW = srcW;
    let oH = srcH;
    if ([5, 6, 7, 8].includes(orientation)) {
      oW = srcH;
      oH = srcW;
    }

    // Scaling based on oriented dimensions
    const targetLong = longEdgePx();
    const long = Math.max(oW, oH);
    const scale = long > targetLong ? targetLong / long : 1;
    const destW = Math.round(oW * scale);
    const destH = Math.round(oH * scale);

    const canvas = document.createElement('canvas');
    canvas.width = destW;
    canvas.height = destH;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) throw new Error('Canvas unsupported');

    // Orientation transform mapping
    switch (orientation) {
      case 2: ctx.transform(-1, 0, 0, 1, destW, 0); break;             // horizontal flip
      case 3: ctx.transform(-1, 0, 0, -1, destW, destH); break;         // 180° rotate
      case 4: ctx.transform(1, 0, 0, -1, 0, destH); break;              // vertical flip
      case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;                   // vertical flip + 90° rotate
      case 6: ctx.transform(0, 1, -1, 0, destW, 0); break;              // 90° rotate
      case 7: ctx.transform(0, -1, -1, 0, destW, destH); break;         // horizontal flip + 90° rotate
      case 8: ctx.transform(0, -1, 1, 0, 0, destH); break;              // 90° rotate other way
      default: break;                                                   // orientation 1: no transform
    }

    // Draw original image into oriented/scaled canvas
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, srcW, srcH, 0, 0, destW, destH);

    // Overlays (watermark and badge)
    const cw = destW;
    const ch = destH;

    const wmTextVal = String(el.wmText?.value || '').trim();
    if (wmTextVal) {
      const o = clamp(Number(el.wmOpacity?.value) || 0.2, 0, 1);
      const pad = Math.round(Math.min(cw, ch) * 0.02);
      const fontSize = Math.round(Math.min(cw, ch) * 0.035);
      ctx.save();
      ctx.globalAlpha = o;
      ctx.font = `${fontSize}px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial`;
      ctx.fillStyle = '#000000';
      ctx.textBaseline = 'bottom';
      ctx.lineWidth = Math.max(2, Math.round(fontSize * 0.08));
      ctx.strokeStyle = 'rgba(255,255,255,0.9)';
      const m = ctx.measureText(wmTextVal);
      const x = cw - pad - m.width;
      const y = ch - pad;
      ctx.strokeText(wmTextVal, x, y);
      ctx.fillText(wmTextVal, x, y);
      ctx.restore();
    }

    if (!cfg.IS_PRO && cfg.FREE_BADGE_TEXT) {
      const o = clamp(Number(cfg.FREE_BADGE_OPACITY) || 0.55, 0, 1);
      const fontSize = Math.max(12, Math.round(Math.min(cw, ch) * 0.025));
      const pad = Math.round(fontSize * 0.4);
      const text = cfg.FREE_BADGE_TEXT;
      ctx.save();
      ctx.font = `bold ${fontSize}px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial`;
      const w = ctx.measureText(text).width + pad * 1.6;
      const h = Math.round(fontSize * 1.6);
      const x = cw - w - pad;
      const y = pad;
      ctx.globalAlpha = o;
      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.fillRect(x, y, w, h);
      ctx.fillStyle = '#0f172a';
      ctx.textBaseline = 'top';
      ctx.fillText(text, x + pad * 0.8, y + Math.round((h - fontSize) * 0.5));
      ctx.restore();
    }

    const q = quality01();
    const blob = await new Promise((res, rej) =>
      canvas.toBlob((b) => b ? res(b) : rej(new Error('Encoding failed')), 'image/jpeg', q)
    );

    return blob;
  }

  // The rest of the code (renderQueue, addFiles, exportZip and event handlers) remains unchanged
  // …
})();