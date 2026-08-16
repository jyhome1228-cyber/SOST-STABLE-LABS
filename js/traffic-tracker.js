import { firebaseReady, db } from './firebase-config.js?v=20260816-1';
import {
  doc,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc
} from 'https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js';

const VISITOR_ID_KEY = 'sost-visitor-id-v1';
const VISITOR_REGISTERED_KEY = 'sost-visitor-registered-v1';
const SEOUL_TIME_ZONE = 'Asia/Seoul';

function safeStorageGet(key) {
  try { return localStorage.getItem(key); } catch (_) { return null; }
}

function safeStorageSet(key, value) {
  try { localStorage.setItem(key, value); } catch (_) {}
}

function makeVisitorId() {
  if (crypto?.randomUUID) return crypto.randomUUID();
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return [...bytes].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

function getVisitorId() {
  let visitorId = safeStorageGet(VISITOR_ID_KEY);
  if (!visitorId || visitorId.length > 80) {
    visitorId = makeVisitorId();
    safeStorageSet(VISITOR_ID_KEY, visitorId);
    safeStorageSet(VISITOR_REGISTERED_KEY, '0');
  }
  return visitorId;
}

function seoulDateKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: SEOUL_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function currentPath() {
  const path = location.pathname || '/';
  return path.slice(0, 300);
}

async function recordVisitor(visitorId, dateKey, path) {
  const visitorRef = doc(db, 'traffic_visitors', visitorId);
  const known = safeStorageGet(VISITOR_REGISTERED_KEY) === '1';

  if (known) {
    try {
      await updateDoc(visitorRef, {
        lastSeenAt: serverTimestamp(),
        lastVisitDate: dateKey,
        lastPath: path,
        pageViews: increment(1)
      });
      return;
    } catch (error) {
      if (error?.code !== 'not-found' && error?.code !== 'permission-denied') throw error;
      safeStorageSet(VISITOR_REGISTERED_KEY, '0');
    }
  }

  try {
    await setDoc(visitorRef, {
      visitorId,
      firstSeenAt: serverTimestamp(),
      lastSeenAt: serverTimestamp(),
      firstPath: path,
      lastPath: path,
      lastVisitDate: dateKey,
      pageViews: 1
    });
    safeStorageSet(VISITOR_REGISTERED_KEY, '1');
  } catch (error) {
    if (error?.code !== 'permission-denied' && error?.code !== 'already-exists') throw error;
    await updateDoc(visitorRef, {
      lastSeenAt: serverTimestamp(),
      lastVisitDate: dateKey,
      lastPath: path,
      pageViews: increment(1)
    });
    safeStorageSet(VISITOR_REGISTERED_KEY, '1');
  }
}

async function recordDailyView(dateKey) {
  const dailyRef = doc(db, 'traffic_daily', dateKey);

  try {
    await updateDoc(dailyRef, {
      views: increment(1),
      updatedAt: serverTimestamp()
    });
    return;
  } catch (error) {
    if (error?.code !== 'not-found' && error?.code !== 'permission-denied') throw error;
  }

  try {
    await setDoc(dailyRef, {
      date: dateKey,
      views: 1,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    if (error?.code !== 'permission-denied' && error?.code !== 'already-exists') throw error;
    await updateDoc(dailyRef, {
      views: increment(1),
      updatedAt: serverTimestamp()
    });
  }
}

async function recordTraffic() {
  if (!firebaseReady || !db) return;
  if (location.pathname === '/admin' || location.pathname.startsWith('/admin/')) return;
  if (navigator.webdriver) return;

  const visitorId = getVisitorId();
  const dateKey = seoulDateKey();
  const path = currentPath();

  await Promise.allSettled([
    recordVisitor(visitorId, dateKey, path),
    recordDailyView(dateKey)
  ]);
}

recordTraffic().catch(() => {});
