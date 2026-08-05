import { getApps, initializeApp } from 'https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js';

/**
 * SOST STABLE LABS Firebase web app configuration.
 * The web API key identifies the Firebase project; data access is controlled by Firebase Security Rules.
 */
const firebaseConfig = {
  apiKey: 'AIzaSyDCbqS-xr124BWXJVyWPN5vLOkodgdx4bM',
  authDomain: 'sostlabs-ed442.firebaseapp.com',
  projectId: 'sostlabs-ed442',
  storageBucket: 'sostlabs-ed442.firebasestorage.app',
  messagingSenderId: '1046296965511',
  appId: '1:1046296965511:web:d766eff0b2acf2a8412322'
};

const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'appId'];
export const firebaseReady = requiredKeys.every((key) => {
  const value = String(firebaseConfig[key] || '');
  return value && !value.includes('REPLACE_WITH');
});

let app = null;
let auth = null;
let db = null;

if (firebaseReady) {
  app = getApps()[0] || initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
}

export { app, auth, db };
