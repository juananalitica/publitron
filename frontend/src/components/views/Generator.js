import { generateContent /*, generateText, generateImage */ } from '../../api/generatorService.js';
import { copyToClipboard, downloadFromUrl } from '../../utils/helpers.js';

export default async function Generator(container) {
  container.innerHTML = `
    <div class="card" style="max-width:980px;margin:1rem auto;">
      <h2 style="margin:0 0 1rem 0;">Generator</h2>
      <form id="genForm" class="form-row" style="grid-template-columns:1fr 1fr; gap:1rem;">
        <input class="input" name="product" placeholder="Producto/servicio" required />
        <select class="input" name="platform" required>
          <option value="instagram">Instagram</option>
          <option value="facebook">Facebook</option>
          <option value="tiktok">TikTok</option>
          <option value="x">X (Twitter)</option>
        </select>
        <select class="input" name="tone" required>
          <option value="amigable">Amigable</option>
          <option value="profesional">Profesional</option>
          <option value="informal">Informal</option>
          <option value="urgente">Urgente</option>
        </select>
        <select class="input" name="style" required>
          <option value="minimalista">Minimalista</option>
          <option value="elegante">Elegante</option>
          <option value="colorido">Colorido</option>
          <option value="tecnologico">Tecnológico</option>
        </select>
        <textarea class="input" name="prompt" rows="4" placeholder="Contexto adicional (ej. campaña, público, hashtags)"></textarea>

        <div style="grid-column:1 / -1; display:flex; gap:.75rem;">
          <button id="btnGenerate" class="btn" type="submit" style="max-width:160px">Generar</button>
          <span id="msg" style="align-self:center; color:#93c5fd;"></span>
        </div>
      </form>

      <div id="result" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-top:1rem;">
        <div class="card">
          <h3 style="margin-top:0;">Texto</h3>
          <pre id="genText" style="white-space:pre-wrap; font-family:inherit;"></pre>
          <div style="display:flex; gap:.5rem;">
            <button id="copyText" class="btn" type="button" style="max-width:160px">Copiar texto</button>
          </div>
        </div>
        <div class="card" style="text-align:center;">
          <h3 style="margin-top:0;">Imagen</h3>
          <img id="genImage" alt="" style="max-width:100%; border-radius:8px; display:none;" />
          <div style="display:flex; gap:.5rem; justify-content:center; margin-top:.5rem;">
            <button id="downloadImg" class="btn" type="button" style="max-width:180px; display:none;">Descargar imagen</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const form = container.querySelector('#genForm');
  const msg  = container.querySelector('#msg');
  const textEl = container.querySelector('#genText');
  const imgEl  = container.querySelector('#genImage');
  const btnCopy= container.querySelector('#copyText');
  const btnDown= container.querySelector('#downloadImg');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.style.color = '#93c5fd';
    msg.textContent = 'Generando…';
    textEl.textContent = '';
    imgEl.style.display = 'none';
    btnDown.style.display = 'none';

    const fd = new FormData(form);
    const payload = {
      product: fd.get('product'),
      platform: fd.get('platform'),
      tone: fd.get('tone'),
      style: fd.get('style'),
      prompt: fd.get('prompt') || ''
    };

    try {
      const res = await generateContent(payload);
      // Esperado: { text?: string, image_url?: string, prompt?: string }
      if (res?.text) textEl.textContent = res.text;
      if (res?.image_url) {
        imgEl.src = res.image_url;
        imgEl.alt = payload.product || 'Generated image';
        imgEl.style.display = 'inline-block';
        btnDown.style.display = 'inline-block';
        btnDown.onclick = () => downloadFromUrl(res.image_url, `publitron_${Date.now()}.png`);
      }
      msg.style.color = '#86efac';
      msg.textContent = 'Listo';
    } catch (err) {
      msg.style.color = '#fca5a5';
      msg.textContent = err.message || 'Error generando contenido';
    }
  });

  btnCopy.addEventListener('click', () => {
    const text = textEl.textContent?.trim();
    if (!text) return;
    copyToClipboard(text);
    msg.style.color = '#86efac';
    msg.textContent = 'Texto copiado';
    setTimeout(() => (msg.textContent = ''), 1200);
  });

  // Si quieres dividir en dos pasos (texto y luego imagen):
  // 1) const t = await generateText(payload);
  // 2) const i = await generateImage({ ...payload, prompt: t.prompt || payload.prompt });
}
