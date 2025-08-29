// Entry point – mounts App into #app
import App from './components/App.js';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('app');
  App(root);
});
