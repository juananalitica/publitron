import { login } from '../../api/authService.js';
import { setToken, setUser } from '../../utils/localStorage.js';

export default async function Login(container, { navigateTo, onAuthChange }) {
  container.innerHTML = `
    <div class="card" style="max-width:420px;margin:5rem auto;">
      <h2 style="margin:0 0 1rem 0;">Sign in</h2>
      <form id="loginForm" class="form-row">
        <input class="input" type="email" name="email" placeholder="Email" required />
        <input class="input" type="password" name="password" placeholder="Password" required />
        <button class="btn" type="submit">Login</button>
      </form>
      <p style="margin-top:1rem;">No account? <a href="#/register">Create one</a></p>
      <p id="msg" style="color:#fca5a5;"></p>
    </div>
  `;

  const form = container.querySelector('#loginForm');
  const msg  = container.querySelector('#msg');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.textContent = '';
    const fd = new FormData(form);
    const payload = { email: fd.get('email'), password: fd.get('password') };

    try {
      const res = await login(payload);
      // Acepta varios nombres de campo por compatibilidad:
      const token = res.access_token || res.token || res.accessToken;
      if (!token) throw new Error('No llegó access_token en la respuesta');
      setToken(token);
      if (res.user || res.profile) setUser(res.user || res.profile);

      onAuthChange?.();
      // Redirección según rol
      const user = res.user || res.profile || null;
      const isAdmin = user && (user.role === 'admin' || user.is_admin === true);
      navigateTo(isAdmin ? '/admin' : '/dashboard');
    } catch (err) {
      msg.textContent = err.message || 'Login failed';
    }
  });
}
