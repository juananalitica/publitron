import { listEvents, createEvent, updateEvent, deleteEvent } from '../../api/calendarService.js';

export default async function Calendar(container) {
  container.innerHTML = `
    <div class="card" style="max-width:1200px;margin:1rem auto;">
      <h2 style="margin:0 0 1rem 0;">Calendar</h2>

      <div class="card" style="display:flex;align-items:center;gap:.5rem;justify-content:space-between;">
        <div style="display:flex;gap:.5rem;align-items:center;">
          <button class="btn" id="prevWeek" style="max-width:42px;">←</button>
          <button class="btn" id="todayBtn" style="max-width:110px;">Hoy</button>
          <button class="btn" id="nextWeek" style="max-width:42px;">→</button>
        </div>
        <strong id="rangeLabel"></strong>
        <form id="quickForm" style="display:flex;gap:.5rem;align-items:center;">
          <input class="input" type="date" id="jumpDate" />
          <button class="btn" type="submit" style="max-width:110px;">Ir</button>
        </form>
      </div>

      <div class="card" style="margin-top:1rem;">
        <form id="upsertForm" class="form-row" style="grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap:.75rem;">
          <input class="input" name="title" placeholder="Título (ej. Publicación IG producto X)" required />
          <select class="input" name="platform" required>
            <option value="instagram">Instagram</option>
            <option value="facebook">Facebook</option>
            <option value="tiktok">TikTok</option>
            <option value="x">X (Twitter)</option>
            <option value="linkedin">LinkedIn</option>
          </select>
          <input class="input" type="datetime-local" name="start" required />
          <input class="input" type="datetime-local" name="end" required />
          <button class="btn" type="submit" id="submitBtn">Crear</button>
          <textarea class="input" name="notes" rows="2" placeholder="Notas (opcional)" style="grid-column:1/-1;"></textarea>
          <input type="hidden" name="id" />
        </form>
        <p id="msg" style="color:#93c5fd; margin-top:.5rem;"></p>
      </div>

      <div class="card" style="margin-top:1rem;">
        <div style="display:grid; grid-template-columns: repeat(7, 1fr); gap:.75rem;" id="weekGrid"></div>
      </div>
    </div>
  `;

  // --- State ---
  const weekGrid   = container.querySelector('#weekGrid');
  const prevWeek   = container.querySelector('#prevWeek');
  const nextWeek   = container.querySelector('#nextWeek');
  const todayBtn   = container.querySelector('#todayBtn');
  const rangeLabel = container.querySelector('#rangeLabel');
  const jumpForm   = container.querySelector('#quickForm');
  const jumpDateEl = container.querySelector('#jumpDate');
  const upsertForm = container.querySelector('#upsertForm');
  const submitBtn  = container.querySelector('#submitBtn');
  const msg        = container.querySelector('#msg');

  // helper: dates
  function toDateOnly(d){ return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
  function startOfWeek(d){
    const date = toDateOnly(d);
    const day = (date.getDay() + 6) % 7; // lunes=0
    date.setDate(date.getDate() - day);
    return date;
  }
  function addDays(d, n){ const x=new Date(d); x.setDate(x.getDate()+n); return x; }
  function fmtDate(d){ return d.toISOString().slice(0,10); }
  function fmtDateTimeLocal(d){
    const pad = (v)=>String(v).padStart(2,'0');
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
  function humanRange(a,b){
    const opts = { day:'2-digit', month:'short' };
    const la = a.toLocaleDateString('es-CO', opts);
    const lb = b.toLocaleDateString('es-CO', opts);
    return `${la} - ${lb}`;
  }
  function sameDay(a,b){ return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate(); }

  let today = new Date();
  let weekStart = startOfWeek(today); // lunes
  let weekEnd   = addDays(weekStart, 6);

  // --- Data load ---
  async function load() {
    msg.textContent = 'Cargando…';
    try {
      const events = await listEvents({ from: fmtDate(weekStart), to: fmtDate(weekEnd) });
      renderWeek(events || []);
      msg.textContent = '';
    } catch (err) {
      msg.style.color = '#fca5a5';
      msg.textContent = err.message || 'Error cargando eventos';
    }
  }

  function renderWeek(items) {
    rangeLabel.textContent = humanRange(weekStart, weekEnd);
    weekGrid.innerHTML = '';
    // Construye 7 columnas (Lun..Dom)
    for (let i=0; i<7; i++){
      const day = addDays(weekStart, i);
      const dayItems = items.filter(ev => sameDay(new Date(ev.start), day))
                            .sort((a,b) => new Date(a.start) - new Date(b.start));
      const col = document.createElement('div');
      col.className = 'card';
      col.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.5rem;">
          <strong>${day.toLocaleDateString('es-CO', { weekday:'short', day:'2-digit' })}</strong>
        </div>
        <div style="display:grid; gap:.5rem;" data-day="${fmtDate(day)}">
          ${dayItems.map(ev => renderEvent(ev)).join('')}
        </div>
      `;
      weekGrid.appendChild(col);
      // bind actions del día
      col.querySelectorAll('[data-edit]').forEach(btn => {
        btn.addEventListener('click', () => startEdit(items.find(x => String(x.id)===String(btn.dataset.edit))));
      });
      col.querySelectorAll('[data-del]').forEach(btn => {
        btn.addEventListener('click', () => handleDelete(btn.dataset.del));
      });
    }
  }

  function renderEvent(ev){
    const st = new Date(ev.start);
    const en = new Date(ev.end);
    const hhmm = (d)=>d.toLocaleTimeString('es-CO',{hour:'2-digit',minute:'2-digit',hour12:false});
    return `
      <div class="card" style="background:#0b1220">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:.5rem;">
          <div>
            <div><strong>${ev.title ?? ''}</strong></div>
            <div style="opacity:.8">${hhmm(st)}–${hhmm(en)} • ${ev.platform ?? '-'}</div>
            ${ev.notes ? `<div style="opacity:.8">${ev.notes}</div>` : ''}
          </div>
          <div style="display:flex;gap:.25rem;">
            <button class="btn" data-edit="${ev.id}" style="max-width:72px;">Editar</button>
            <button class="btn" data-del="${ev.id}" style="max-width:90px;border-color:#ef4444;">Eliminar</button>
          </div>
        </div>
      </div>
    `;
  }

  function resetForm(){
    upsertForm.reset();
    upsertForm.id.value = '';
    submitBtn.textContent = 'Crear';
    msg.textContent = '';
    msg.style.color = '#93c5fd';
  }

  function startEdit(ev){
    if (!ev) return;
    upsertForm.title.value    = ev.title || '';
    upsertForm.platform.value = ev.platform || 'instagram';
    upsertForm.start.value    = fmtDateTimeLocal(new Date(ev.start));
    upsertForm.end.value      = fmtDateTimeLocal(new Date(ev.end));
    upsertForm.notes.value    = ev.notes || '';
    upsertForm.id.value       = ev.id;
    submitBtn.textContent     = 'Guardar';
    msg.textContent           = 'Editando…';
  }

  async function handleDelete(id){
    if (!confirm('¿Eliminar este evento?')) return;
    msg.textContent = 'Eliminando…';
    try {
      await deleteEvent(id);
      msg.style.color = '#86efac';
      msg.textContent = 'Evento eliminado';
      await load();
    } catch (err) {
      msg.style.color = '#fca5a5';
      msg.textContent = err.message || 'Error eliminando evento';
    }
  }

  // Handlers navegación
  prevWeek.addEventListener('click', async () => { weekStart = addDays(weekStart, -7); weekEnd = addDays(weekEnd, -7); await load(); });
  nextWeek.addEventListener('click', async () => { weekStart = addDays(weekStart, 7);  weekEnd = addDays(weekEnd, 7);  await load(); });
  todayBtn.addEventListener('click', async () => { today=new Date(); weekStart = startOfWeek(today); weekEnd = addDays(weekStart,6); await load(); });

  // Saltar a fecha
  jumpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const raw = jumpDateEl.value;
    if (!raw) return;
    const d = new Date(raw);
    weekStart = startOfWeek(d);
    weekEnd   = addDays(weekStart, 6);
    await load();
  });

  // Crear / actualizar
  upsertForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(upsertForm);
    const id = fd.get('id');
    const payload = {
      title:    fd.get('title'),
      platform: fd.get('platform'),
      start:    new Date(fd.get('start')).toISOString(),
      end:      new Date(fd.get('end')).toISOString(),
      notes:    fd.get('notes') || ''
    };

    if (new Date(payload.end) <= new Date(payload.start)) {
      msg.style.color = '#fca5a5';
      msg.textContent = 'La hora de fin debe ser mayor que la de inicio.';
      return;
    }

    msg.textContent = id ? 'Guardando…' : 'Creando…';
    try {
      if (id) await updateEvent(id, payload);
      else    await createEvent(payload);

      msg.style.color = '#86efac';
      msg.textContent = id ? 'Evento actualizado' : 'Evento creado';
      resetForm();
      await load();
    } catch (err) {
      msg.style.color = '#fca5a5';
      msg.textContent = err.message || 'Error guardando evento';
    }
  });

  // inicial
  await load();
}
