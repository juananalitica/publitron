import { getToken } from '../utils/localStorage.js';

// Ajusta a tu FastAPI
const API_BASE_URL = 'http://localhost:8000';

async function request(path, { method='GET', body, headers } = {}) {
  const token = getToken();
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers || {})
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await res.json() : await res.text();
  if (!res.ok) {
    const message = isJson ? (data?.detail || data?.message) : data;
    throw new Error(message || `HTTP ${res.status}`);
  }
  return data;
}

export const api = {
  get: (p)    => request(p),
  post: (p,b) => request(p, { method:'POST', body:b }),
  put:  (p,b) => request(p, { method:'PUT',  body:b }),
  del:  (p)   => request(p, { method:'DELETE' })
};
