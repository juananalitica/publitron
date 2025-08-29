// /views/Home.js
export default async function Home(container) {
  // 0) Fuente + Favicon (idempotentes)
  if (!document.querySelector('#pt-fonts')) {
    const link = document.createElement('link');
    link.id = 'pt-fonts';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?display=swap&family=Noto+Sans:wght@400;600;700;900&family=Plus+Jakarta+Sans:wght@400;600;700;800';
    document.head.appendChild(link);
  }
  if (!document.querySelector('link[rel="icon"]')) {
    const ico = document.createElement('link');
    ico.rel = 'icon';
    ico.type = 'image/png';
    ico.href = 'img/logo_png.png';
    document.head.appendChild(ico);
  }

  // 1) CSS propio (scoped)
  if (!document.querySelector('#home-styles')) {
    const link = document.createElement('link');
    link.id = 'home-styles';
    link.rel = 'stylesheet';
    link.href = './styles/home/home.css';
    document.head.appendChild(link);
  }

  // 2) Tailwind config + CDN (solo si no existe)
  if (!document.querySelector('#tw-config')) {
    const cfg = document.createElement('script');
    cfg.id = 'tw-config';
    cfg.textContent = `
      tailwind = { config: {
        theme: {
          extend: {
            fontFamily: {
              sans: ["Plus Jakarta Sans","Noto Sans","system-ui","ui-sans-serif","Segoe UI","Roboto","Helvetica","Arial","Apple Color Emoji","Segoe UI Emoji"]
            },
            colors: {
              brand: {50:'#eef7ff',100:'#d8ebff',200:'#b9dcff',300:'#8ec7ff',400:'#57a9fb',500:'#1980e6',600:'#0f69c7',700:'#0b56a1',800:'#0a497f',900:'#0b3e6a'}
            }
          }
        }
      }};`;
    document.head.appendChild(cfg);
  }
  if (!document.querySelector('#tw-cdn')) {
    const tw = document.createElement('script');
    tw.id = 'tw-cdn';
    tw.src = 'https://cdn.tailwindcss.com?plugins=forms,container-queries';
    tw.defer = true;
    document.head.appendChild(tw);
  }

  // 3) HEAD metas básicos (idempotentes, opcional)
  if (!document.querySelector('meta[name="theme-color"]')) {
    const m = document.createElement('meta');
    m.name = 'theme-color';
    m.content = '#0b66c3';
    document.head.appendChild(m);
  }
  if (!document.querySelector('meta[name="description"]')) {
    const m = document.createElement('meta');
    m.name = 'description';
    m.content = 'PubliTron: automatiza publicaciones, programa contenidos y centraliza tus redes sociales con una experiencia moderna y eficiente.';
    document.head.appendChild(m);
  }

  // 4) HTML principal (landing)
  container.innerHTML = `
<header class="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
  <nav class="mx-auto max-w-7xl px-4 py-3" aria-label="Principal">
    <div class="flex items-center justify-center">
      <!-- Solo los ítems de navegación -->
      <ul class="flex gap-6 text-sm font-semibold text-slate-700">
        <li><a href="#about" class="hover:text-brand-600 js-nav-sec">Acerca de</a></li>
        <li><a href="#benefits" class="hover:text-brand-600 js-nav-sec">Beneficios</a></li>
        <li><a href="#how" class="hover:text-brand-600 js-nav-sec">Cómo funciona</a></li>
        <li><a href="#plans" class="hover:text-brand-600 js-nav-sec">Planes</a></li>
        <li><a href="#faq" class="hover:text-brand-600 js-nav-sec">FAQ</a></li>
        <li><a href="#contact" class="hover:text-brand-600 js-nav-sec">Contacto</a></li>
      </ul>
    </div>
  </nav>
</header>


    <!-- Sticky CTA (mobile) -->
    <div class="fixed inset-x-0 bottom-3 z-40 mx-auto w-[92%] md:hidden">
      <a href="#plans" class="block rounded-full bg-brand-600 px-5 py-3 text-center text-sm font-bold text-white shadow-xl shadow-brand-600/20 hover:bg-brand-700 js-nav-sec">Empieza gratis</a>
    </div>

    <!-- Hero -->
    <section id="home" class="relative overflow-hidden">
      <div class="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-brand-200/60 blur-3xl"></div>
      <div class="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
        <div class="flex flex-col items-start gap-6 animate-fade">
          <span class="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-[12px] font-semibold text-brand-700 ring-1 ring-brand-100">Automatización inteligente para redes</span>
          <h1 class="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">Automatiza tus publicaciones y haz que tu marca no se detenga</h1>
          <p class="text-base leading-relaxed text-slate-600 md:text-lg">Programa, publica y analiza desde un solo lugar. Ahorra tiempo, mejora la consistencia y escala tu presencia en Facebook e Instagram.</p>
          <div class="flex flex-col gap-3 sm:flex-row">
            <a href="#plans" class="inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-brand-700 js-nav-sec">Ver planes</a>
            <a href="#how" class="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-bold text-brand-700 ring-1 ring-brand-200 hover:bg-brand-50 js-nav-sec">Cómo funciona</a>
          </div>
          <div class="flex items-center gap-4 text-xs text-slate-500">
            <div class="flex items-center gap-1">
              <svg class="h-4 w-4 text-brand-600" viewBox="0 0 24 24" fill="currentColor"><path d="M9 12.75 11.25 15 15 9.75l1.5 1.5L11.25 18 7.5 14.25l1.5-1.5Z"/></svg>
              <span>Sin tarjeta</span>
            </div>
            <div class="flex items-center gap-1">
              <svg class="h-4 w-4 text-brand-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.25A9.75 9.75 0 1 0 21.75 12 9.761 9.761 0 0 0 12 2.25Zm-.75 5.25h1.5v5.25H18v1.5h-6.75Z"/></svg>
              <span>Configura en 60 segundos</span>
            </div>
          </div>
        </div>
        <div class="relative animate-pop">
          <div class="pointer-events-none absolute -right-10 -top-10 -z-10 h-72 w-72 rounded-full bg-brand-200 blur-3xl opacity-30"></div>
          <img src="/img/logo_png.png" loading="lazy" alt="Vista de PubliTron en escritorio" class="mx-auto w-full max-w-md rounded-xl ring-1 ring-slate-200" />
        </div>
      </div>
    </section>

    <!-- Acerca de -->
    <section id="about" class="bg-[#fcfcf8]">
      <div class="mx-auto max-w-7xl px-4 py-14">
        <div class="grid gap-8 md:grid-cols-2">
          <div class="rounded-2xl bg-brand-600 p-8 text-center text-white md:p-10">
            <h2 class="text-2xl font-extrabold tracking-tight md:text-3xl">Acerca de nosotros</h2>
            <p class="mt-4 text-base leading-relaxed">En PubliTron simplificamos la gestión de redes para empresas y creadores. Una plataforma intuitiva que automatiza publicación, análisis e interacción, para que te concentres en crear contenido impactante.</p>
          </div>
          <div class="rounded-2xl border border-slate-200 p-8 text-center md:p-10">
            <img src="img/meta_logo.png" loading="lazy" alt="Programa de Partners Meta" class="mx-auto mb-4 h-16 w-auto" />
            <p class="text-slate-700">Integramos Facebook e Instagram de forma nativa para programar y publicar con estándares de calidad y seguridad. Operación confiable, resultados profesionales.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Beneficios -->
    <section id="benefits" class="relative">
      <div class="mx-auto max-w-7xl px-4 py-14">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">Beneficios que aceleran tu estrategia</h2>
          <p class="mt-3 text-slate-600">Centraliza tus redes y gana tiempo sin perder calidad.</p>
        </div>
        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          ${[
            ['Eficiencia','Reduce trabajo manual y mantén comunicación constante.','<path d="M12 2.25a.75.75 0 0 1 .75.75v8.19l4.22 2.44a.75.75 0 1 1-.75 1.3l-4.5-2.6a.75.75 0 0 1-.37-.65V3a.75.75 0 0 1 .75-.75Z"/><path d="M12 1.5C6.201 1.5 1.5 6.201 1.5 12S6.201 22.5 12 22.5 22.5 17.799 22.5 12 17.799 1.5 12 1.5Zm0 1.5a9 9 0 1 1 0 18 9 9 0 0 1 0-18Z"/>'],
            ['Consistencia','Publicaciones planificadas que sostienen tu presencia.','<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>'],
            ['Productividad','Más tiempo para crear, menos para operar.','<path d="M11.25 3a.75.75 0 0 1 .75-.75h5.25A2.25 2.25 0 0 1 19.5 4.5v5.25a.75.75 0 0 1-1.5 0V4.5a.75.75 0 0 0-.75-.75H12a.75.75 0 0 1-.75-.75Z"/><path d="M4.5 7.5A3 3 0 0 1 7.5 4.5h1.125a.75.75 0 0 1 0 1.5H7.5A1.5 1.5 0 0 0 6 7.5v9A1.5 1.5 0 0 0 7.5 18h9a1.5 1.5 0 0 0 1.5-1.5v-1.125a.75.75 0 0 1 1.5 0V16.5A3 3 0 0 1 16.5 19.5h-9A3 3 0 0 1 4.5 16.5v-9Z"/>'],
            ['Escalabilidad','Múltiples cuentas y proyectos sin fricción.','<path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Zm7-5a5 5 0 0 1 4.546 2.914L8 8.5 3.454 5.914A5 5 0 0 1 8 3Z"/>'],
            ['Control total','Calendario visual y estrategia ordenada.','<path d="M3.75 5.25A2.25 2.25 0 0 1 6 3h12a2.25 2.25 0 0 1 2.25 2.25V18A3.75 3.75 0 0 1 16.5 21.75h-9A3.75 3.75 0 0 1 3.75 18V5.25Zm1.5 0V12h13.5V5.25A.75.75 0 0 0 18 4.5H6a.75.75 0 0 0-.75.75Z"/>'],
            ['Impulso competitivo','Automatización como ventaja real.','<path d="M11.25 6.75a.75.75 0 0 1 1.5 0v6a.75.75 0 0 1-1.5 0v-6Z"/><path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Z"/>'],
          ].map(([title,desc,svg]) => `
            <div class="rounded-2xl border border-slate-200 p-6">
              <div class="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">${svg}</svg>
              </div>
              <h3 class="font-bold">${title}</h3>
              <p class="mt-2 text-sm text-slate-600">${desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Cómo funciona -->
    <section id="how" class="bg-white">
      <div class="mx-auto max-w-7xl px-4 py-14">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">Cómo funciona</h2>
          <p class="mt-3 text-slate-600">Conecta tus cuentas, arrastra tus productos, publica y mide.</p>
        </div>
        <ol class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          ${['Conecta redes','Crea y programa','Publica automático','Mide y mejora'].map((t,i)=>`
            <li class="rounded-2xl border border-slate-200 p-6">
              <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white text-sm font-bold">${i+1}</span>
              <h3 class="mt-4 font-bold">${t}</h3>
              <p class="mt-1 text-sm text-slate-600">${[
                'Autorizas Facebook/Instagram de forma segura.',
                'Genera 3 ideas por producto y agenda en el calendario.',
                'PubliTron ejecuta las publicaciones por ti.',
                'KPIs claros para repetir lo que funciona.'
              ][i]}</p>
            </li>
          `).join('')}
        </ol>
      </div>
    </section>

    <!-- Planes -->
    <section id="plans" class="bg-white">
      <div class="mx-auto max-w-7xl px-4 py-14">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">Elige el plan adecuado para ti</h2>
          <p class="mt-3 text-slate-600">Planes simples, enfoque en resultados.</p>
          <div class="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1 text-sm font-semibold">
            <button id="btnMonthly" class="rounded-full px-3 py-1.5 bg-brand-600 text-white">Mensual</button>
            <button id="btnYearly" class="rounded-full px-3 py-1.5 text-slate-700">Anual <span class="ml-1 rounded bg-brand-50 px-1 text-[10px] font-bold text-brand-700 ring-1 ring-brand-100">-15%</span></button>
          </div>
        </div>

        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div class="flex flex-col rounded-2xl border border-slate-200 p-6">
            <h3 class="text-base font-bold">Básico</h3>
            <p class="mt-1 flex items-end gap-1">
              <span class="text-4xl font-black text-slate-900 price" data-monthly="40000" data-yearly="408000">$40.000</span>
              <span class="text-sm font-semibold text-slate-500 period">/mes</span>
            </p>
            <ul class="mt-4 flex flex-col gap-2 text-sm text-slate-700">
              <li class="flex items-center gap-2"><span class="text-brand-600">✓</span>Funciones principales</li>
              <li class="flex items-center gap-2"><span class="text-brand-600">✓</span>10 créditos</li>
              <li class="flex items-center gap-2"><span class="text-brand-600">✓</span>Asistencia básica</li>
            </ul>
            <a href="#contact" class="mt-6 inline-flex items-center justify-center rounded-full bg-brand-600 px-4 py-2 text-sm font-bold text-white hover:bg-brand-700 js-nav-sec">Elegir Básico</a>
          </div>

          <div class="relative flex flex-col rounded-2xl border border-brand-200 bg-brand-50 p-6 ring-1 ring-brand-100">
            <span class="absolute -top-3 right-4 rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">Recomendado</span>
            <h3 class="text-base font-bold">Pro</h3>
            <p class="mt-1 flex items-end gap-1">
              <span class="text-4xl font-black text-slate-900 price" data-monthly="80000" data-yearly="816000">$80.000</span>
              <span class="text-sm font-semibold text-slate-500 period">/mes</span>
            </p>
            <ul class="mt-4 flex flex-col gap-2 text-sm text-slate-700">
              <li class="flex items-center gap-2"><span class="text-brand-700">✓</span>Todas las funciones</li>
              <li class="flex items-center gap-2"><span class="text-brand-700">✓</span>50 créditos</li>
              <li class="flex items-center gap-2"><span class="text-brand-700">✓</span>Asistencia prioritaria</li>
              <li class="flex items-center gap-2"><span class="text-brand-700">✓</span>Herramientas de colaboración</li>
            </ul>
            <a href="#contact" class="mt-6 inline-flex items-center justify-center rounded-full bg-brand-600 px-4 py-2 text-sm font-bold text-white hover:bg-brand-700 js-nav-sec">Elegir Pro</a>
          </div>

          <div class="flex flex-col rounded-2xl border border-slate-200 p-6">
            <h3 class="text-base font-bold">Premium</h3>
            <p class="mt-1 flex items-end gap-1">
              <span class="text-4xl font-black text-slate-900 price" data-monthly="120000" data-yearly="1224000">$120.000</span>
              <span class="text-sm font-semibold text-slate-500 period">/mes</span>
            </p>
            <ul class="mt-4 flex flex-col gap-2 text-sm text-slate-700">
              <li class="flex items-center gap-2"><span class="text-brand-600">✓</span>Acceso ilimitado</li>
              <li class="flex items-center gap-2"><span class="text-brand-600">✓</span>Almacenamiento ilimitado</li>
              <li class="flex items-center gap-2"><span class="text-brand-600">✓</span>Asistencia 24/7</li>
              <li class="flex items-center gap-2"><span class="text-brand-600">✓</span>Análisis avanzados</li>
              <li class="flex items-center gap-2"><span class="text-brand-600">✓</span>Gestor de cuentas dedicado</li>
            </ul>
            <a href="#contact" class="mt-6 inline-flex items-center justify-center rounded-full bg-brand-600 px-4 py-2 text-sm font-bold text-white hover:bg-brand-700 js-nav-sec">Elegir Premium</a>
          </div>
        </div>

        <p class="mt-4 text-center text-xs text-slate-500">* Precios en COP. El plan anual aplica 15% de descuento sobre 12 meses.</p>
      </div>
    </section>

    <!-- FAQ -->
    <section id="faq" class="bg-[#fcfcf8]">
      <div class="mx-auto max-w-7xl px-4 py-14">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">Preguntas frecuentes</h2>
          <p class="mt-3 text-slate-600">Todo lo que necesitas para empezar con confianza.</p>
        </div>
        <div class="mx-auto mt-8 max-w-3xl space-y-3">
          <details class="rounded-xl border border-slate-200 bg-white p-4">
            <summary class="cursor-pointer list-none font-semibold text-slate-900">¿Necesito tarjeta para la prueba?</summary>
            <p class="mt-2 text-sm text-slate-600">No. Puedes crear tu cuenta, conectar redes y programar tus primeros posts sin tarjeta.</p>
          </details>
          <details class="rounded-xl border border-slate-200 bg-white p-4">
            <summary class="cursor-pointer list-none font-semibold text-slate-900">¿Cómo se conectan Facebook e Instagram?</summary>
            <p class="mt-2 text-sm text-slate-600">Usamos el flujo oficial de Meta (OAuth). No almacenamos tu contraseña; solo los permisos estrictamente necesarios.</p>
          </details>
          <details class="rounded-xl border border-slate-200 bg-white p-4">
            <summary class="cursor-pointer list-none font-semibold text-slate-900">¿Puedo trabajar con varios clientes?</summary>
            <p class="mt-2 text-sm text-slate-600">Sí. Crea espacios separados por marca, gestiona calendarios y colaboradores por proyecto.</p>
          </details>
        </div>
      </div>
    </section>

    <!-- Contacto -->
    <section id="contact" class="bg-white">
      <div class="mx-auto max-w-7xl px-4 py-14">
        <div class="grid items-start gap-10 md:grid-cols-2">
          <div>
            <h2 class="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">Contáctanos</h2>
            <p class="mt-3 text-slate-600">Estamos listos para ayudarte a llevar tu estrategia al siguiente nivel. Déjanos tus datos y te contactamos.</p>
            <form class="mt-6 space-y-4" action="https://formspree.io/f/your-id" method="POST">
              <label class="block">
                <span class="mb-1 block text-sm font-semibold text-slate-700">Tu nombre</span>
                <input required type="text" name="name" class="block w-full rounded-xl border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-brand-300 focus:ring-brand-300" placeholder="Nombre y apellido" />
              </label>
              <label class="block">
                <span class="mb-1 block text-sm font-semibold text-slate-700">Correo electrónico</span>
                <input required type="email" name="email" class="block w-full rounded-xl border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-brand-300 focus:ring-brand-300" placeholder="tu@correo.com" />
              </label>
              <label class="block">
                <span class="mb-1 block text-sm font-semibold text-slate-700">Mensaje</span>
                <textarea required name="message" rows="4" class="block w-full rounded-xl border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-brand-300 focus:ring-brand-300" placeholder="Cuéntanos qué necesitas"></textarea>
              </label>
              <button type="submit" class="inline-flex w-full items-center justify-center rounded-full bg-brand-600 px-5 py-3 text-sm font-bold text-white hover:bg-brand-700">Enviar</button>
              <p class="sr-only" aria-live="polite" id="formStatus"></p>
            </form>
          </div>
          <div class="rounded-2xl border border-slate-200 bg-white p-8">
            <img src="img/logo_png.png" alt="Logo PubliTron" class="h-10 w-auto" />
            <p class="mt-4 text-slate-700">Simplifica la gestión de redes sociales con una plataforma moderna diseñada para resultados medibles.</p>
            <div class="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div class="rounded-xl border border-slate-200 p-4">
                <p class="font-semibold text-slate-900">Soporte</p>
                <p class="text-slate-600">Lun–Vie / 8:00–18:00</p>
              </div>
              <div class="rounded-xl border border-slate-200 p-4">
                <p class="font-semibold text-slate-900">Email</p>
                <a href="mailto:hola@publitron.app" class="text-brand-700 hover:underline">hola@publitron.app</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-slate-100 bg-white">
      <div class="mx-auto max-w-7xl px-4 py-8">
        <div class="flex flex-col items-center justify-between gap-4 text-sm text-slate-600 md:flex-row">
          <p>© <span id="year"></span> PubliTron. Todos los derechos reservados.</p>
          <ul class="flex items-center gap-5">
            <li><a href="#home" class="hover:text-brand-600 js-nav-sec">Inicio</a></li>
            <li><a href="#about" class="hover:text-brand-600 js-nav-sec">Acerca de</a></li>
            <li><a href="#plans" class="hover:text-brand-600 js-nav-sec">Planes</a></li>
            <li><a href="#contact" class="hover:text-brand-600 js-nav-sec">Contacto</a></li>
          </ul>
        </div>
      </div>
    </footer>

    <!-- Scroll to top -->
    <button id="toTop" class="fixed bottom-20 right-4 hidden rounded-full border border-slate-200 bg-white p-3 shadow-md hover:bg-slate-50" aria-label="Ir arriba">
      <svg class="h-5 w-5 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>
    </button>
  </section>
  `;

  // 5) JS de la vista (después de pintar)

  // Año dinámico
  const yearEl = container.querySelector('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menú móvil
  const menuBtn = container.querySelector('#menuBtn');
  const mobileMenu = container.querySelector('#mobileMenu');
  menuBtn?.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    menuBtn.setAttribute('aria-expanded', String(!isOpen));
  });

  // Navegación a secciones SIN romper el router (evita hashchange global)
  container.querySelectorAll('.js-nav-sec').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href') || '';
      if (href.startsWith('#') && !href.startsWith('#/')) {
        e.preventDefault();
        const id = href.slice(1);
        const sec = container.querySelector(`[id="${id}"]`);
        sec?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        mobileMenu?.classList.add('hidden');
      }
    });
  });

  // Toggle precios
  const fmtCOP = v => Number(v).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
  const prices = [...container.querySelectorAll('.price')];
  const periods = [...container.querySelectorAll('.period')];
  const btnMonthly = container.querySelector('#btnMonthly');
  const btnYearly  = container.querySelector('#btnYearly');
  function setPlan(mode) {
    prices.forEach(el => el.textContent = fmtCOP(el.dataset[mode]));
    periods.forEach(p => p.textContent = mode === 'monthly' ? '/mes' : '/año');
    // estilos botones
    if (mode === 'monthly') {
      btnMonthly?.classList.add('bg-brand-600','text-white');
      btnYearly?.classList.remove('bg-brand-600','text-white');
      btnYearly?.classList.add('text-slate-700');
    } else {
      btnYearly?.classList.add('bg-brand-600','text-white');
      btnMonthly?.classList.remove('bg-brand-600','text-white');
      btnMonthly?.classList.add('text-slate-700');
    }
  }
  btnMonthly?.addEventListener('click', () => setPlan('monthly'));
  btnYearly?.addEventListener('click', () => setPlan('yearly'));
  setPlan('monthly');

  // Botón ir arriba
  const toTop = container.querySelector('#toTop');
  const onScroll = () => (window.scrollY > 600) ? toTop.classList.remove('hidden') : toTop.classList.add('hidden');
  window.addEventListener('scroll', onScroll, { passive: true });
  toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Accesibilidad: cerrar menú con Esc
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') mobileMenu?.classList.add('hidden'); }, { once:false });

  // JSON-LD (SEO) (idempotente por id)
  if (!document.querySelector('#pt-jsonld')) {
    const ld = document.createElement('script');
    ld.id = 'pt-jsonld';
    ld.type = 'application/ld+json';
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "PubliTron",
      "applicationCategory": "MarketingApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "AggregateOffer",
        "lowPrice": "40000",
        "highPrice": "120000",
        "priceCurrency": "COP"
      }
    });
    document.body.appendChild(ld);
  }
}
