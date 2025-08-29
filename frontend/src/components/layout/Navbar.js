import { clearAllData } from '../../utils/localStorage.js';

export default function Navbar({ isAuth, user }) {
  if (!isAuth) {
    return `
      <nav class="container" style="padding:1rem 0; display:flex; gap:1rem; align-items:center;">
        <strong>Publitron</strong>
        <a href="#/home">Home</a>
        <span style="flex:1"></span>
        <a class="btn" href="#/login" style="max-width:120px; text-decoration:none; display:inline-block; text-align:center;">Login</a>
      </nav>
    `;
  }

  const isAdmin = user && (user.role === 'admin' || user.is_admin === true);
  if (isAdmin) {
    return `
      <nav class="container" style="padding:1rem 0; display:flex; gap:1rem; align-items:center;">
        <strong>Publitron</strong>
        <a href="#/admin">Admin Dashboard</a>
        <a href="#/admin/companies">Companies</a>
        <span style="flex:1"></span>
        <span style="opacity:.8">${user?.name || user?.email || ''}</span>
        <button class="btn" id="logoutBtn" style="max-width:120px">Logout</button>
      </nav>
    `;
  }

  return `
    <nav class="container" style="padding:1rem 0; display:flex; gap:1rem; align-items:center;">
      <strong>Publitron</strong>
      <a href="#/dashboard">Dashboard</a>
      <a href="#/generator">Generator</a>
      <a href="#/products">Products</a>
      <a href="#/calendar">Calendar</a>
      <span style="flex:1"></span>
      <span style="opacity:.8">${user?.name || user?.email || ''}</span>
      <button class="btn" id="logoutBtn" style="max-width:120px">Logout</button>
    </nav>
  `;
}

export function bindNavbar(rootEl) {
  try {
    const btn = rootEl?.querySelector?.('#logoutBtn');
    if (btn) {
      btn.addEventListener('click', () => {
        // Limpiar todos los datos del localStorage
        clearAllData();
        
        // Redirigir al home y forzar recarga completa
        window.location.href = window.location.origin + window.location.pathname + '#/home';
        window.location.reload();
      });
    }
  } catch {}
}
