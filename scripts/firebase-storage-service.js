(function(){
  const MAX_BYTES = 850 * 1024;

  function configReady(){
    const cfg = window.POLUX_FIREBASE_CONFIG || {};
    return !!(cfg.apiKey && cfg.authDomain && cfg.projectId && cfg.appId);
  }

  function readFileAsDataUrl(file){
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function loadImage(src){
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  function dataUrlBytes(value){
    return Math.ceil(String(value || '').length * 0.75);
  }

  async function compressImageToDataUrl(file, kind){
    if(!file || !String(file.type || '').startsWith('image/')) return null;
    const source = await readFileAsDataUrl(file);
    const img = await loadImage(source);
    const maxW = kind === 'cover' ? 1400 : 520;
    const maxH = kind === 'cover' ? 520 : 520;
    let scale = Math.min(1, maxW / img.width, maxH / img.height);
    let width = Math.max(1, Math.round(img.width * scale));
    let height = Math.max(1, Math.round(img.height * scale));
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', {alpha:false});
    let quality = kind === 'cover' ? 0.78 : 0.82;
    let out = '';
    for(let attempt = 0; attempt < 9; attempt++){
      canvas.width = width;
      canvas.height = height;
      ctx.fillStyle = '#06130a';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      out = canvas.toDataURL('image/jpeg', quality);
      if(dataUrlBytes(out) <= MAX_BYTES) return out;
      quality -= 0.08;
      if(quality < 0.45){
        quality = 0.72;
        width = Math.max(220, Math.round(width * 0.82));
        height = Math.max(120, Math.round(height * 0.82));
      }
    }
    if(dataUrlBytes(out) > MAX_BYTES){
      throw new Error('image-too-large');
    }
    return out;
  }

  async function uploadUserImage(uid, kind, file){
    // Free mode: no Firebase Storage / Blaze plan required.
    // The image is compressed in the browser and stored as a data URL in the user Firestore profile.
    // External links still work through the existing "From URL" button.
    if(!uid || !file) return null;
    return await compressImageToDataUrl(file, kind);
  }

  window.PoluxStorageService = {
    configReady,
    getStorage: () => null,
    uploadUserImage,
    freeMode: true,
    maxBytes: MAX_BYTES
  };
})();
