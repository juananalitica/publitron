import { register } from '../../api/authService.js';

export default async function Register(container, { navigateTo }) {
  container.innerHTML = `
    <div class="card" style="max-width:520px;margin:5rem auto;">
      <h2 style="margin:0 0 1rem 0;">Create account</h2>
      <form id="regForm" class="form-row">
        <input class="input" type="text" name="name" placeholder="Company name" required />
        <input class="input" type="email" name="email" placeholder="Email" required />
        <input class="input" type="password" name="password" placeholder="Password" required />
        <input class="input" type="text" name="companyCountry" placeholder="Country (optional)" />
        <button class="btn" type="submit">Register</button>
      </form>
      <p style="margin-top:1rem;">Have an account? <a href="#/login">Sign in</a></p>
      <p id="msg" style="color:#fca5a5;"></p>
    </div>
  `;

  const form = container.querySelector('#regForm');
  const msg  = container.querySelector('#msg');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.textContent = '';
    const fd = new FormData(form);
    const payload = {
      name: fd.get('name'),
      email: fd.get('email'),
      password: fd.get('password'),
      companyCountry: fd.get('companyCountry') || undefined
    };
    try {
      await register(payload);
      msg.style.color = '#86efac';
      msg.textContent = 'Account created. You can sign in now.';
      setTimeout(() => navigateTo('/login'), 600);
    } catch (err) {
      msg.textContent = err.message || 'Registration failed';
    }
  });
}
