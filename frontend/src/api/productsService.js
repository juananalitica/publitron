import { api } from './api.js';

const BASE = '/api/v1/products';

export function listProducts({ search = '', category = '' } = {}) {
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (category) params.set('category', category);
  const qs = params.toString() ? `?${params}` : '';
  return api.get(`${BASE}${qs}`);
}

export function createProduct(data) {
  // data: { name, price, category, image_url? }
  return api.post(BASE, data);
}

// Si tu backend usa multipart para subir archivos, cambia a FormData (ver comentario en la vista).
export function updateProduct(id, data) {
  return api.put(`${BASE}/${id}`, data);
}

export function deleteProduct(id) {
  return api.del(`${BASE}/${id}`);
}
