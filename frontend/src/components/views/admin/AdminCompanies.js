import {
    listCompanies,
    setCompanyStatus,
    getCompanyTokens,
    rotateCompanyToken,
    enableCompanyToken,
    disableCompanyToken
  } from '../../../api/adminService.js';
  
  export default async function AdminCompanies(container) {
    container.innerHTML = `
      <div class="card" style="max-width:1200px;margin:1rem auto;">
        <h2 style="margin:0 0 1rem 0;">Admin • Empresas vinculadas</h2>
  
        <div class="card" style="margin-bottom:1rem;">
          <form id="filters" class="form-row" style="grid-template-columns: 2fr 1fr auto; gap:.75rem;">
            <input class="input" type="search" name="search" placeholder="Buscar por nombre..." />
            <select class="input" name="status">
              <option value="">Todas</option>
              <option value="active">Activas</option>
              <option value="inactive">Inactivas</option>
            </select>
            <button class="btn" type="submit" style="max-width:140px;">Filtrar</button>
          </form>
          <p id="msg" style="color:#93c5fd; margin-top:.5rem;"></p>
        </div>
  
        <div class="card">
          <div style="overflow:auto;">
            <table style="width:100%; border-collapse:collapse;">
              <thead>
                <tr style="text-align:left;">
                  <th style="padding:.5rem; border-bottom:1px solid #374151;">Empresa</th>
                  <th style="padding:.5rem; border-bottom:1px solid #374151;">Estado</th>
                  <th style="padding:.5rem; border-bottom:1px solid #374151;">Últ. publicación</th>
                  <th style="padding:.5rem; border-bottom:1px solid #374151;">Token</th>
                  <th style="padding:.5rem; border-bottom:1px solid #374151; width:280px;">Acciones</th>
                </tr>
              </thead>
              <tbody id="rows"></tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  
    const rows    = container.querySelector('#rows');
    const filters = container.querySelector('#filters');
    const msg     = container.querySelector('#msg');
  
    let state = { search:'', status:'' };
  
    filters.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(filters);
      state.search = fd.get('search') || '';
      state.status = fd.get('status') || '';
      load();
    });
  
    async function load() {
      msg.textContent = 'Cargando…';
      try {
        const data = await listCompanies({ search: state.search, status: state.status });
        renderRows(Array.isArray(data) ? data : []);
        msg.textContent = '';
      } catch (err) {
        msg.style.color = '#fca5a5';
        msg.textContent = err.message || 'Error cargando empresas';
      }
    }
  
    function renderRows(items) {
      rows.innerHTML = items.map(toRow).join('');
      // bind actions
      rows.querySelectorAll('[data-toggle]').forEach(btn => {
        btn.addEventListener('click', async () => {
          const id = btn.getAttribute('data-toggle');
          const active = btn.getAttribute('data-active') !== 'true';
          await doToggleStatus(id, active);
        });
      });
      rows.querySelectorAll('[data-rotate]').forEach(btn => {
        btn.addEventListener('click', () => doRotate(btn.getAttribute('data-rotate')));
      });
      rows.querySelectorAll('[data-enable]').forEach(btn => {
        btn.addEventListener('click', () => doEnable(btn.getAttribute('data-enable')));
      });
      rows.querySelectorAll('[data-disable]').forEach(btn => {
        btn.addEventListener('click', () => doDisable(btn.getAttribute('data-disable')));
      });
      rows.querySelectorAll('[data-viewtokens]').forEach(btn => {
        btn.addEventListener('click', () => doViewTokens(btn.getAttribute('data-viewtokens')));
      });
    }
  
    function toRow(c) {
      const active = c.status === 'active' || c.active === true;
      const lp = c.last_published_at ? new Date(c.last_published_at) : null;
      const token = c.token || {};
      const tEnabled = !!token.enabled;
      const tExp = token.expires_at ? new Date(token.expires_at) : null;
  
      return `
        <tr>
          <td style="padding:.5rem; border-bottom:1px solid #1f2937;">${escape(c.name)}</td>
          <td style="padding:.5rem; border-bottom:1px solid #1f2937;">
            <span style="padding:.2rem .5rem;border-radius:6px;background:${active?'#064e3b':'#3f3f46'};">
              ${active ? 'Activa' : 'Inactiva'}
            </span>
          </td>
          <td style="padding:.5rem; border-bottom:1px solid #1f2937;">
            ${lp ? lp.toLocaleString('es-CO') : '—'}
          </td>
          <td style="padding:.5rem; border-bottom:1px solid #1f2937;">
            ${tEnabled ? 'Habilitado' : 'Deshabilitado'}
            ${tExp ? `· expira ${tExp.toLocaleDateString('es-CO')}` : ''}
          </td>
          <td style="padding:.5rem; border-bottom:1px solid #1f2937; display:flex; gap:.5rem; flex-wrap:wrap;">
            <button class="btn" data-toggle="${c.id}" data-active="${active}" style="max-width:160px;">
              ${active ? 'Desactivar empresa' : 'Activar empresa'}
            </button>
            <button class="btn" data-viewtokens="${c.id}" style="max-width:120px;">Ver token</button>
            <button class="btn" data-rotate="${c.id}" style="max-width:120px;">Rotar token</button>
            ${tEnabled
              ? `<button class="btn" data-disable="${c.id}" style="max-width:140px;border-color:#ef4444;">Deshabilitar token</button>`
              : `<button class="btn" data-enable="${c.id}"  style="max-width:140px;">Habilitar token</button>`
            }
          </td>
        </tr>
      `;
    }
  
    async function doToggleStatus(id, active) {
      msg.textContent = active ? 'Activando…' : 'Desactivando…';
      try {
        await setCompanyStatus(id, active);
        msg.style.color = '#86efac';
        msg.textContent = active ? 'Empresa activada' : 'Empresa desactivada';
        await load();
      } catch (err) {
        msg.style.color = '#fca5a5';
        msg.textContent = err.message || 'No se pudo actualizar el estado';
      }
    }
  
    async function doRotate(id) {
      if (!confirm('¿Rotar token? Se invalidará el anterior.')) return;
      msg.textContent = 'Rotando token…';
      try {
        await rotateCompanyToken(id);
        msg.style.color = '#86efac';
        msg.textContent = 'Token rotado';
        await load();
      } catch (err) {
        msg.style.color = '#fca5a5';
        msg.textContent = err.message || 'No se pudo rotar el token';
      }
    }
  
    async function doEnable(id) {
      msg.textContent = 'Habilitando token…';
      try {
        await enableCompanyToken(id);
        msg.style.color = '#86efac';
        msg.textContent = 'Token habilitado';
        await load();
      } catch (err) {
        msg.style.color = '#fca5a5';
        msg.textContent = err.message || 'No se pudo habilitar el token';
      }
    }
  
    async function doDisable(id) {
      msg.textContent = 'Deshabilitando token…';
      try {
        await disableCompanyToken(id);
        msg.style.color = '#86efac';
        msg.textContent = 'Token deshabilitado';
        await load();
      } catch (err) {
        msg.style.color = '#fca5a5';
        msg.textContent = err.message || 'No se pudo deshabilitar el token';
      }
    }
  
    async function doViewTokens(id) {
      msg.textContent = 'Consultando token…';
      try {
        const data = await getCompanyTokens(id);
        alert(formatTokens(data));
        msg.textContent = '';
      } catch (err) {
        msg.style.color = '#fca5a5';
        msg.textContent = err.message || 'No se pudo obtener el token';
      }
    }
  
    function formatTokens(t) {
      if (!t) return 'Sin información de token.';
      const parts = [];
      if (t.value) parts.push(`Token: ${t.value}`);
      if (t.enabled !== undefined) parts.push(`Habilitado: ${t.enabled ? 'sí' : 'no'}`);
      if (t.updated_at) parts.push(`Actualizado: ${new Date(t.updated_at).toLocaleString('es-CO')}`);
      if (t.expires_at) parts.push(`Expira: ${new Date(t.expires_at).toLocaleString('es-CO')}`);
      return parts.join('\n');
    }
  
    function escape(s){ return (s??'').toString().replace(/[&<>"']/g, m=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m])); }
  
    await load();
  }
  