import { api } from './api.js';

const BASE = '/api/v1/calendar';

/**
 * Lista eventos en un rango [from, to] (YYYY-MM-DD)
 * Ejemplo de respuesta esperada (array):
 * [{ id, title, platform, start, end, notes }]
 */
export function listEvents({ from, to }) {
  const params = new URLSearchParams();
  if (from) params.set('from', from);
  if (to)   params.set('to', to);
  const qs = params.toString() ? `?${params}` : '';
  return api.get(`${BASE}${qs}`);
}

export function createEvent(data) {
  // data: { title, platform, start, end, notes? }
  return api.post(BASE, data);
}

export function updateEvent(id, data) {
  return api.put(`${BASE}/${id}`, data);
}

export function deleteEvent(id) {
  return api.del(`${BASE}/${id}`);
}
