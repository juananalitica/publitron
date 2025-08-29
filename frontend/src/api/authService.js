import { api } from './api.js';

// ---------------------------------------------------------------------------
// MODO DEMO – USUARIOS QUEMADOS PARA PROBAR RUTAS (BORRAR CUANDO HAYA BACKEND)
// Estas cuentas permiten probar el flujo sin backend:
//  - Admin:   email: admin@demo.com   password: admin123
//  - Cliente: email: user@demo.com    password: user123
// IMPORTANTE: Eliminar este bloque cuando el backend real esté disponible.
// ---------------------------------------------------------------------------
const DEMO_USERS = {
  'admin@demo.com': {
    password: 'admin123',
    user: { id: 1, name: 'Administrador Demo', email: 'admin@demo.com', role: 'admin', is_admin: true }
  },
  'user@demo.com': {
    password: 'user123',
    user: { id: 2, name: 'Cliente Demo', email: 'user@demo.com', role: 'user', is_admin: false }
  }
};

export function login(credentials) {
  // { email, password }
  const { email, password } = credentials || {};

  // DEMO: si coincide con usuarios de prueba, devolver respuesta simulada
  if (email && DEMO_USERS[email] && DEMO_USERS[email].password === password) {
    return Promise.resolve({
      access_token: 'demo-token-' + (DEMO_USERS[email].user.is_admin ? 'admin' : 'user'),
      user: DEMO_USERS[email].user
    });
  }

  // Producción: usar backend real
  return api.post('/auth/login', credentials);
}

export function register(payload) {
  // { name, email, password, companyCountry? }
  return api.post('/auth/register', payload);
}
