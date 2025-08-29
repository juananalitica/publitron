// Funcionalidad específica para la vista Home
export function initHomeFunctionality() {
  // Año dinámico en el footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Menú móvil
  const menuBtn = document.getElementById('menuBtn');
  const menu = document.getElementById('mobileMenu');
  
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = !menu.classList.contains('hidden');
      menu.classList.toggle('hidden');
      menuBtn.setAttribute('aria-expanded', String(!isOpen));
    });
    
    // Cerrar menú al hacer clic en enlaces
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => menu.classList.add('hidden'));
    });
  }

  // Toggle precios mensual/anual
  const prices = [...document.querySelectorAll('.price')];
  const periods = [...document.querySelectorAll('.period')];
  const btnMonthly = document.getElementById('btnMonthly');
  const btnYearly = document.getElementById('btnYearly');

  function formatCOP(value) {
    return value.toLocaleString('es-CO', { 
      style: 'currency', 
      currency: 'COP', 
      maximumFractionDigits: 0 
    });
  }

  function setPlan(mode) {
    prices.forEach(el => {
      const val = Number(el.dataset[mode]);
      el.textContent = formatCOP(val);
    });
    
    periods.forEach(p => {
      p.textContent = mode === 'monthly' ? '/mes' : '/año';
    });
    
    // Estilos botones
    if (mode === 'monthly') {
      btnMonthly.classList.add('bg-brand-600', 'text-white');
      btnYearly.classList.remove('bg-brand-600', 'text-white');
      btnYearly.classList.add('text-slate-700');
    } else {
      btnYearly.classList.add('bg-brand-600', 'text-white');
      btnMonthly.classList.remove('bg-brand-600', 'text-white');
      btnMonthly.classList.add('text-slate-700');
    }
  }

  if (btnMonthly && btnYearly) {
    btnMonthly.addEventListener('click', () => setPlan('monthly'));
    btnYearly.addEventListener('click', () => setPlan('yearly'));
    setPlan('monthly'); // default
  }

  // Botón ir arriba
  const toTop = document.getElementById('toTop');
  if (toTop) {
    const onScroll = () => {
      if (window.scrollY > 600) {
        toTop.classList.remove('hidden');
      } else {
        toTop.classList.add('hidden');
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Mejora accesibilidad: cerrar menú con Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu) {
      menu.classList.add('hidden');
    }
  });

  // Smooth scroll para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
