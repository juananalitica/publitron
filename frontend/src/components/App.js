import { initRouter } from './router.js';
import Navbar, { bindNavbar } from './layout/Navbar.js';
import { getToken, getUser } from '../utils/localStorage.js';

export default function App(root) {
  root.innerHTML = `
    <div id="layout">
      <header id="nav"></header>
      <main id="view" class="container"></main>
    </div>
  `;
  const navEl  = document.getElementById('nav');
  const viewEl = document.getElementById('view');

  // Tema deshabilitado (archivo no existe aún)

  function refreshNav() {
    const token = !!getToken();
    const user = getUser();
    navEl.innerHTML = Navbar({ isAuth: token, user });
    bindNavbar(navEl);
  }
  refreshNav();

  initRouter({
    viewEl,
    onAuthChange: refreshNav
  });
}
