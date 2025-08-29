// Auth (token + user)
const TOKEN_KEY = 'publitron_token';
const USER_KEY  = 'publitron_user';

export function setToken(token) { localStorage.setItem(TOKEN_KEY, token); }
export function getToken()      { return localStorage.getItem(TOKEN_KEY); }
export function clearToken()    { localStorage.removeItem(TOKEN_KEY); }

export function setUser(user)   { localStorage.setItem(USER_KEY, JSON.stringify(user)); }
export function getUser() {
  try { return JSON.parse(localStorage.getItem(USER_KEY) || 'null'); }
  catch { return null; }
}
export function clearUser()     { localStorage.removeItem(USER_KEY); }

// Función para limpiar todos los datos al hacer logout
export function clearAllData() {
  clearToken();
  clearUser();
  clearCompany();
  setOnboardingDone(false);
}

// Company / onboarding flags (lo que mostraste)
const COMPANY_KEY = 'publitron_company';
const ONB_KEY     = 'publitron_onboarding_done';

export function setCompany(data) {
  localStorage.setItem(COMPANY_KEY, JSON.stringify(data));
}
export function getCompany() {
  try { return JSON.parse(localStorage.getItem(COMPANY_KEY) || 'null'); }
  catch { return null; }
}
export function clearCompany() {
  localStorage.removeItem(COMPANY_KEY);
}
export function setOnboardingDone(v = true) {
  if (v) localStorage.setItem(ONB_KEY, '1'); else localStorage.removeItem(ONB_KEY);
}
export function isOnboardingDone() {
  return localStorage.getItem(ONB_KEY) === '1';
}
