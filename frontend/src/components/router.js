import Login      from './views/Login.js';
import Register   from './views/Register.js';
import Dashboard  from './views/Dashboard.js';
import Generator  from './views/Generator.js';
import Products   from './views/Products.js';
import Calendar   from './views/Calendar.js';
import Home       from './views/Home.js';
import AdminDashboard from './views/admin/AdminDashboard.js';
import AdminCompanies from './views/admin/AdminCompanies.js';

import { getToken, getUser } from '../utils/localStorage.js';

const routes = {
  '/':           { component: Home,       isPrivate: false },
  '/home':       { component: Home,       isPrivate: false },
  '/login':      { component: Login,      isPrivate: false },
  '/register':   { component: Register,   isPrivate: false },
  '/dashboard':  { component: Dashboard,  isPrivate: true  },
  '/generator':  { component: Generator,  isPrivate: true  },
  '/products':   { component: Products,   isPrivate: true  },
  '/calendar':   { component: Calendar,   isPrivate: true  },
  '/admin':      { component: AdminDashboard, isPrivate: true, role: 'admin' },
  '/admin/companies': { component: AdminCompanies, isPrivate: true, role: 'admin' },
};

function parseHash() {
  const hash = window.location.hash || '#/home';
  const path = hash.replace('#', '');
  return routes[path] ? path : '/login';
}

export function navigateTo(path) { window.location.hash = path; }

export function initRouter({ viewEl, onAuthChange }) {
  async function render() {
    const path = parseHash();
    const def = routes[path];
    const { component, isPrivate, role } = def;

    const token = getToken();
    const user  = getUser();
    if (isPrivate && !token) {
      navigateTo('/login');
      return;
    }
    if (isPrivate && role === 'admin') {
      if (!user || (user.role !== 'admin' && user.is_admin !== true)) {
        navigateTo('/dashboard');
        return;
      }
    }

    // Si es admin, no debe navegar por rutas de cliente: redirigir al dashboard admin
    const clientPaths = ['/dashboard','/generator','/products','/calendar'];
    const isAdminUser = user && (user.role === 'admin' || user.is_admin === true);
    if (isAdminUser && clientPaths.includes(path)) {
      navigateTo('/admin');
      return;
    }

    viewEl.innerHTML = '';
    await component(viewEl, { navigateTo, onAuthChange });
  }

  window.addEventListener('hashchange', render);
  window.addEventListener('load', render);
  render();
}
