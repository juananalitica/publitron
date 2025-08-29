import { api } from './api.js';

// Intenta primero el endpoint esperado por el front. Si falla, prueba una ruta alternativa
export async function generateContent(payload) {
  try {
    const res = await api.post('/api/v1/generator', payload);
    return normalizeGeneratorResponse(res);
  } catch (e1) {
    try {
      const res2 = await api.post('/generate-content', payload);
      return normalizeGeneratorResponse(res2);
    } catch (e2) {
      // Re-lanza el último error con mensaje claro
      throw e2;
    }
  }
}

function normalizeGeneratorResponse(res) {
  // Soporta varias formas: {text, image_url} o {text, image} (base64 o url)
  const out = { text: '', image_url: '' };
  if (typeof res === 'string') {
    out.text = res;
    return out;
  }
  if (res?.text) out.text = res.text;
  const img = res?.image_url || res?.image;
  if (img) {
    // Si parece base64 sin prefijo, añade data URL
    const looksBase64 = typeof img === 'string' && !/^https?:\/\//.test(img) && !img.startsWith('data:');
    out.image_url = looksBase64 ? `data:image/png;base64,${img}` : img;
  }
  return out;
}
