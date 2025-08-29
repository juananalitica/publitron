export default async function AdminDashboard(container) {
  container.innerHTML = `
    <div class="card" style="max-width:1100px;margin:1rem auto;">
      <h2 style="margin:0 0 1rem 0;">Admin Dashboard</h2>
      <p>Panel administrativo. Usa el menú para navegar a Companies.</p>
      <div style="margin-top:1rem;">
        <a class="btn" href="#/admin/companies" style="max-width:200px; text-decoration:none; text-align:center;">Ir a Companies</a>
      </div>
    </div>
  `;
}





