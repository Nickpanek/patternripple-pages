/* app.js - deterministic orientation + watermark */
(() => {
  const cfg = window.PCL_CONFIG || {
    IS_PRO: false,
    FREE_MAX_PER_EXPORT: 5,
    FREE_BADGE_TEXT: 'PatternRipple Free',
    FREE_BADGE_OPACITY: 0.55,
    MAX_JPEG_QUALITY: 100
  };

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

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const quality01 = () => clamp((Number(el.inpQuality?.value) || 80) / 100, 0.1, 1);
  const longEdgePx = () => clamp(Number(el.inpLongEdge?.value) || 2500, 200, 12000);
  const uid = () => Math.random().toString(36).slice(2,10);
  const toast = (m,ms=1800)=>{ if(!el.toast) return; el.toast.textContent=m; el.toast.classList.remove('hidden'); setTimeout(()=>el.toast.classList.add('hidden'), ms); };
  const setStatus = (t)=>{ if(el.status) el.status.textContent=t; };

  // --- Read EXIF Orientation (JPEG only) ---
  async function getOrientation(file){
    try{
      const buf = await file.slice(0, 64*1024).arrayBuffer();
      const v = new DataView(buf);
      if (v.getUint16(0,false) !== 0xFFD8) return 1;
      let off = 2;
      while (off + 1 < v.byteLength){
        const marker = v.getUint16(off,false); off += 2;
        if (marker === 0xFFE1){
          const len = v.getUint16(off,false); off += 2;
          if (v.getUint32(off,false) !== 0x45786966) break; // "Exif"
          off += 6;
          const tiff = off;
          const little = v.getUint16(tiff,false) === 0x4949;
          const get16 = (o)=> v.getUint16(o, little);
          const get32 = (o)=> v.getUint32(o, little);
          const ifd0 = tiff + get32(tiff + 4);
          const n = get16(ifd0);
          for(let i=0;i<n;i++){
            const e = ifd0 + 2 + i*12;
            if (get16(e) === 0x0112) return get16(e+8) || 1;
          }
          break;
        } else {
          const len = v.getUint16(off,false); off += len;
        }
      }
    } catch {}
    return 1;
  }

  // --- Decode with oriented pixels if possible ---
  async function decodeWithAutoOrientation(file){
    if (typeof createImageBitmap === 'function') {
      try {
        // Request pixels already oriented per EXIF
        const bmp = await createImageBitmap(file, { imageOrientation: 'from-image' });
        return { bitmap: bmp, alreadyOriented: true };
      } catch {}
    }
    // Fallback to <img> (browsers differ: some apply EXIF visually, but canvas gets raw pixels)
    const url = URL.createObjectURL(file);
    const img = await new Promise((res, rej)=>{
      const im = new Image();
      im.onload=()=>res(im); im.onerror=rej; im.src=url;
    });
    URL.revokeObjectURL(url);
    return { bitmap: img, alreadyOriented: false };
  }

  // --- Draw with optional manual orientation ---
  function drawToCanvas(src, orientation, alreadyOriented, targetW, targetH){
    // If pixels came pre-oriented, no transform and use src.width/height directly
    let outW = targetW, outH = targetH;
    if (!alreadyOriented && [5,6,7,8].includes(orientation)){
      // canvas dims swap when rotating 90
      [outW, outH] = [targetH, targetW];
    }
    const canvas = document.createElement('canvas');
    canvas.width = outW; canvas.height = outH;
    const ctx = canvas.getContext('2d', { alpha: false });
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    if (!alreadyOriented) {
      switch (orientation) {
        case 2: ctx.transform(-1,0,0,1,outW,0); break;                 // flip X
        case 3: ctx.transform(-1,0,0,-1,outW,outH); break;             // 180
        case 4: ctx.transform(1,0,0,-1,0,outH); break;                 // flip Y
        case 5: ctx.transform(0,1,1,0,0,0); break;                     // 90 + flip X
        case 6: ctx.transform(0,1,-1,0,outW,0); break;                 // 90 CW
        case 7: ctx.transform(0,-1,-1,0,outW,outH); break;             // 90 + flip Y
        case 8: ctx.transform(0,-1,1,0,0,outH); break;                  // 90 CCW
        default: break;
      }
    }
    // Draw scaled
    ctx.drawImage(src, 0, 0, src.width || src.naturalWidth, src.height || src.naturalHeight, 0, 0, targetW, targetH);
    // Reset to identity for overlays
    ctx.setTransform(1,0,0,1,0,0);
    return { canvas, ctx };
  }

  async function processImage(file){
    const isJPEG = /^image\/jpe?g$/i.test(file.type);
    const orientation = isJPEG ? await getOrientation(file) : 1;
    const { bitmap, alreadyOriented } = await decodeWithAutoOrientation(file);

    // Source dims that match how we will draw
    let srcW = bitmap.width || bitmap.naturalWidth;
    let srcH = bitmap.height || bitmap.naturalHeight;

    // When pixels are not already oriented, swap intended target box for 90/270
    const rotate90 = !alreadyOriented && [5,6,7,8].includes(orientation);
    const orientedW = rotate90 ? srcH : srcW;
    const orientedH = rotate90 ? srcW : srcH;

    const targetLong = longEdgePx();
    const scale = Math.min(1, targetLong / Math.max(orientedW, orientedH));
    const tW = Math.round(orientedW * scale);
    const tH = Math.round(orientedH * scale);

    const { canvas, ctx } = drawToCanvas(bitmap, orientation, alreadyOriented, tW, tH);
    const cw = canvas.width, ch = canvas.height;

    // Watermark
    const wmText = String(el.wmText?.value || '').trim();
    if (wmText) {
      const o = clamp(Number(el.wmOpacity?.value) || 0.2, 0, 1);
      const pad = Math.round(Math.min(cw, ch) * 0.02);
      const fontSize = Math.round(Math.min(cw, ch) * 0.035);
      ctx.save();
      ctx.globalAlpha = o;
      ctx.font = `${fontSize}px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial`;
      ctx.fillStyle = '#000';
      ctx.textBaseline = 'bottom';
      ctx.lineWidth = Math.max(2, Math.round(fontSize * 0.08));
      ctx.strokeStyle = 'rgba(255,255,255,0.9)';
      const m = ctx.measureText(wmText);
      const x = cw - pad - m.width;
      const y = ch - pad;
      ctx.strokeText(wmText, x, y);
      ctx.fillText(wmText, x, y);
      ctx.restore();
    }

    // Free badge
    if (!cfg.IS_PRO && cfg.FREE_BADGE_TEXT){
      const o = clamp(Number(cfg.FREE_BADGE_OPACITY) || 0.55, 0, 1);
      const fontSize = Math.max(12, Math.round(Math.min(cw, ch) * 0.025));
      const pad = Math.round(fontSize * 0.4);
      const text = cfg.FREE_BADGE_TEXT;
      ctx.save();
      ctx.font = `bold ${fontSize}px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial`;
      const w = ctx.measureText(text).width + pad * 1.6;
      const h = Math.round(fontSize * 1.6);
      const x = cw - w - pad, y = pad;
      ctx.globalAlpha = o;
      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.fillRect(x, y, w, h);
      ctx.fillStyle = '#0f172a';
      ctx.textBaseline = 'top';
      ctx.fillText(text, x + pad * 0.8, y + Math.round((h - fontSize) * 0.5));
      ctx.restore();
    }

    const q = quality01();
    const blob = await new Promise((res,rej)=>canvas.toBlob(b=>b?res(b):rej(new Error('encode')), 'image/jpeg', q));
    return blob;
  }

  // ---- Queue UI / Export (unchanged) ----
  function renderQueue(){
    const wrap = el.queue; if(!wrap) return; wrap.innerHTML='';
    for(const item of state.items){
      const row = document.createElement('div');
      row.className='flex items-center gap-3 p-2 rounded border';
      const img = document.createElement('img');
      img.className='thumb'; img.loading='lazy'; img.alt=item.name;
      img.src = URL.createObjectURL(item.file); img.onload=()=>URL.revokeObjectURL(img.src);
      const meta = document.createElement('div');
      meta.className='text-sm';
      meta.innerHTML = `<div class="font-medium truncate max-w-[14rem]" title="${item.name}">${item.name}</div>
        <div class="text-slate-500">${Math.round(item.size/1024)} KB</div>`;
      const del = document.createElement('button');
      del.className='ml-auto px-2 py-1 text-xs rounded bg-slate-200 hover:bg-slate-300';
      del.textContent='Remove';
      del.addEventListener('click',()=>{ state.items = state.items.filter(x=>x.id!==item.id); renderQueue(); }, {passive:true});
      row.append(img, meta, del); wrap.appendChild(row);
    }
  }

  function addFiles(files){
    const list = Array.from(files).filter(f=>/^image\/(jpe?g|png)$/i.test(f.type));
    for(const f of list) state.items.push({ file:f, id:uid(), name:f.name, size:f.size });
    renderQueue();
    if (!list.length) toast('Only PNG and JPEG are supported');
  }

  async function exportZip(){
    if (state.busy) return;
    if (!state.items.length) { toast('Add images first'); return; }
    const maxCount = cfg.IS_PRO ? state.items.length : Math.min(cfg.FREE_MAX_PER_EXPORT, state.items.length);
    const items = state.items.slice(0, maxCount);

    state.busy = true; setStatus('Processing...');
    const zip = new JSZip(); let i=0;
    for (const it of items){
      try{
        const blob = await processImage(it.file);
        const base = it.name.replace(/\.[^.]+$/,'');
        zip.file(`${base}_compressed.jpg`, blob);
      } catch(e){ console.error(e); toast(`Failed: ${it.name}`); }
      finally { i++; }
    }
    setStatus('Zipping...');
    const zipBlob = await zip.generateAsync({ type:'blob', compression:'DEFLATE' });
    const a = document.createElement('a'); const url = URL.createObjectURL(zipBlob);
    a.href=url; a.download=`photos_${Date.now()}.zip`; document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
    state.busy = false; setStatus('Idle'); toast(`Exported ${items.length} file${items.length>1?'s':''}`);
  }

  el.fileInput?.addEventListener('change', e => { const files = /** @type {HTMLInputElement} */(e.target).files; if (files?.length) addFiles(files); });
  el.dropzone?.addEventListener('drop', (e)=>{ e.preventDefault(); const dt=e.dataTransfer; if (dt?.files?.length) addFiles(dt.files); }, {passive:false});
  el.btnClear?.addEventListener('click', ()=>{ state.items=[]; renderQueue(); setStatus('Idle'); }, {passive:true});
  el.btnExport?.addEventListener('click', ()=>{ exportZip(); }, {passive:true});

  if (el.fileInput && !el.fileInput.getAttribute('accept')) {
    el.fileInput.setAttribute('accept','image/jpeg,image/jpg,image/pjpeg,image/png');
  }
})();