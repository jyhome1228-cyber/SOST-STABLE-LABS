import { getApps, initializeApp } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js';

/**
 * Firebase 콘솔 > 프로젝트 설정 > 내 앱 > 웹 앱 SDK 설정값으로 교체하세요.
 * apiKey는 브라우저용 공개 식별값이며, 접근 권한은 Firestore Rules로 통제합니다.
 */
const firebaseConfig = {
  apiKey: 'REPLACE_WITH_FIREBASE_API_KEY',
  authDomain: 'REPLACE_WITH_PROJECT_ID.firebaseapp.com',
  projectId: 'REPLACE_WITH_PROJECT_ID',
  storageBucket: 'REPLACE_WITH_PROJECT_ID.firebasestorage.app',
  messagingSenderId: 'REPLACE_WITH_MESSAGING_SENDER_ID',
  appId: 'REPLACE_WITH_FIREBASE_APP_ID'
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
