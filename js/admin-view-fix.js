import { firebaseReady, auth } from './firebase-config.js?v=20260805-3';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js';

const ADMIN_EMAIL = 'planus253@naver.com';
const login = document.querySelector('[data-admin-login]');
const dashboard = document.querySelector('[data-admin-dashboard]');

function applyAdminView(user) {
  const allowed = user?.email?.toLowerCase() === ADMIN_EMAIL;

  if (login) {
    login.hidden = Boolean(allowed);
    login.style.display = allowed ? 'none' : 'grid';
  }

  if (dashboard) {
    dashboard.hidden = !allowed;
    dashboard.style.display = allowed ? 'block' : 'none';
  }
}

if (firebaseReady && auth) {
  onAuthStateChanged(auth, applyAdminView);
} else {
  applyAdminView(null);
}
