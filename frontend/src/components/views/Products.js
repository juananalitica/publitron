import { listProducts, createProduct, updateProduct, deleteProduct } from '../../api/productsService.js';

export default async function Products(container) {
  container.innerHTML = `
    <div class="card" style="margin:1rem auto; max-width:1100px;">
      <h2 style="margin:0 0 1rem 0;">Products</h2>

      <div class="card" style="margin-bottom:1rem;">
        <form id="filters" class="form-row" style="grid-template-columns: 2fr 1fr auto; gap:.75rem;">
          <input class="input" type="search" name="search" placeholder="Buscar por nombre..." />
          <input class="input" type="text" name="category" placeholder="Filtrar por categoría..." />
          <button class="btn" type="submit" style="max-width:140px;">Filtrar</button>
        </form>
      </div>

      <div class="card" style="margin-bottom:1rem;">
        <form id="upsertForm" class="form-row" style="grid-template-columns: 2fr 1fr 1fr 2fr auto; gap:.75rem;">
          <input class="input" name="name" placeholder="Nombre" required />
          <input class="input" name="price" type="number" step="0.01" placeholder="Precio" required />
          <input class="input" name="category" placeholder="Categoría" />
          <input class="input" name="image_url" placeholder="URL de imagen (opcional)" />
          <button class="btn" type="submit" id="submitBtn">Crear</button>
          <input type="hidden" name="id" />
        </form>
        <small style="opacity:.7; display:block; margin-top:.5rem;">
          Tip: si tu backend usa <em>multipart/form-data</em> para subir archivos,
          reemplaza el campo <code>image_url</code> por <code>&lt;input type="file" name="image"&gt;</code>
          y en el submit usa <code>FormData</code> (ver comentario en código).
        </small>
        <p id="msg" style="color:#93c5fd; margin-top:.5rem;"></p>
      </div>

      <div class="card">
        <div style="overflow:auto;">
          <table style="width:100%; border-collapse:collapse;">
            <thead>
              <tr style="text-align:left;">
                <th style="padding:.5rem; border-bottom:1px solid #374151;">Imagen</th>
                <th style="padding:.5rem; border-bottom:1px solid #374151;">Nombre</th>
                <th style="padding:.5rem; border-bottom:1px solid #374151;">Precio</th>
                <th style="padding:.5rem; border-bottom:1px solid #374151;">Categoría</th>
                <th style="padding:.5rem; border-bottom:1px solid #374151; width:160px;">Acciones</th>
              </tr>
            </thead>
            <tbody id="rows"></tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  const rows = container.querySelector('#rows');
  const filters = container.querySelector('#filters');
  const upsertForm = container.querySelector('#upsertForm');
  const msg = container.querySelector('#msg');
  const submitBtn = container.querySelector('#submitBtn');

  let state = { search:'', category:'', editingId:null };

  async function load() {
    msg.textContent = 'Cargando...';
    try {
      const data = await listProducts({ search: state.search, category: state.category });
      renderRows(data || []);
      msg.textContent = '';
    } catch (err) {
      msg.style.color = '#fca5a5';
      msg.textContent = err.message || 'Error cargando productos';
    }
  }

  function renderRows(items) {
    rows.innerHTML = items.map(p => `
      <tr>
        <td style="padding:.5rem; border-bottom:1px solid #1f2937;">
          ${p.image_url ? `<img src="${p.image_url}" alt="${p.name}" style="height:48px;border-radius:6px;" />` : '-'}
        </td>
        <td style="padding:.5rem; border-bottom:1px solid #1f2937;">${p.name ?? ''}</td>
        <td style="padding:.5rem; border-bottom:1px solid #1f2937;">${formatPrice(p.price)}</td>
        <td style="padding:.5rem; border-bottom:1px solid #1f2937;">${p.category ?? ''}</td>
        <td style="padding:.5rem; border-bottom:1px solid #1f2937; display:flex; gap:.5rem;">
          <button class="btn" data-edit="${p.id}" style="max-width:72px;">Editar</button>
          <button class="btn" data-del="${p.id}"  style="max-width:80px; border-color:#ef4444;">Eliminar</button>
        </td>
      </tr>
    `).join('');

    // bind actions
    rows.querySelectorAll('[data-edit]').forEach(btn => {
      btn.addEventListener('click', () => startEdit(btn.getAttribute('data-edit'), items));
    });
    rows.querySelectorAll('[data-del]').forEach(btn => {
      btn.addEventListener('click', () => handleDelete(btn.getAttribute('data-del')));
    });
  }

  function startEdit(id, items) {
    const p = items.find(x => String(x.id) === String(id));
    if (!p) return;
    upsertForm.name.value = p.name || '';
    upsertForm.price.value = p.price ?? '';
    upsertForm.category.value = p.category || '';
    upsertForm.image_url.value = p.image_url || '';
    upsertForm.id.value = p.id;
    state.editingId = p.id;
    submitBtn.textContent = 'Guardar';
    msg.textContent = 'Editando…';
    msg.style.color = '#93c5fd';
  }

  async function handleDelete(id) {
    if (!confirm('¿Eliminar este producto?')) return;
    msg.textContent = 'Eliminando…';
    try {
      await deleteProduct(id);
      msg.style.color = '#86efac';
      msg.textContent = 'Producto eliminado';
      await load();
    } catch (err) {
      msg.style.color = '#fca5a5';
      msg.textContent = err.message || 'Error eliminando producto';
    }
  }

  filters.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(filters);
    state.search = fd.get('search') || '';
    state.category = fd.get('category') || '';
    load();
  });

  upsertForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.textContent = '';
    const fd = new FormData(upsertForm);
    const id = fd.get('id');

    // Caso JSON simple (como en generator):
    const payload = {
      name: fd.get('name'),
      price: parseFloat(fd.get('price') || '0') || 0,
      category: fd.get('category') || '',
      image_url: fd.get('image_url') || ''
    };

    /* Si tu backend requiere multipart para imagen:
    const formData = new FormData();
    formData.append('name', fd.get('name'));
    formData.append('price', fd.get('price'));
    formData.append('category', fd.get('category'));
    if (upsertForm.image?.files[0]) {
      formData.append('image', upsertForm.image.files[0]);
    }
    // y en el service: usar fetch sin 'Content-Type' manual para dejar que el navegador ponga el boundary
    */

    try {
      if (id) {
        await updateProduct(id, payload /* o formData */);
        msg.style.color = '#86efac';
        msg.textContent = 'Producto actualizado';
      } else {
        await createProduct(payload /* o formData */);
        msg.style.color = '#86efac';
        msg.textContent = 'Producto creado';
      }
      // reset UI
      upsertForm.reset();
      upsertForm.id.value = '';
      state.editingId = null;
      submitBtn.textContent = 'Crear';
      await load();
    } catch (err) {
      msg.style.color = '#fca5a5';
      msg.textContent = err.message || 'Error guardando producto';
    }
  });

  function formatPrice(v) {
    const n = Number(v);
    if (Number.isNaN(n)) return v ?? '';
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);
  }

  // initial load
  await load();
}
