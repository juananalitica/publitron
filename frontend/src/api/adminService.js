import { api } from './api.js';

const BASE = '/api/v1/admin';

export function listCompanies({ search = '', status = '' } = {}) {
  const p = new URLSearchParams();
  if (search) p.set('search', search);
  if (status) p.set('status', status); // 'active' | 'inactive' | ''
  const qs = p.toString() ? `?${p}` : '';
  return api.get(`${BASE}/companies${qs}`);
}

export function setCompanyStatus(id, active) {
  return api.put
    ? api.put(`${BASE}/companies/${id}/status`, { active }) // si tu wrapper tiene PUT
    : api.post(`${BASE}/companies/${id}/status`, { active }); // fallback
}

export function getCompanyTokens(id) {
  return api.get(`${BASE}/companies/${id}/tokens`);
}

export function rotateCompanyToken(id) {
  return api.post(`${BASE}/companies/${id}/tokens/rotate`, {});
}

export function enableCompanyToken(id) {
  return api.post(`${BASE}/companies/${id}/tokens/enable`, {});
}

export function disableCompanyToken(id) {
  return api.post(`${BASE}/companies/${id}/tokens/disable`, {});
}
