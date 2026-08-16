import { firebaseReady, auth, db } from './firebase-config.js?v=20260816-1';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js';
import {
  Timestamp,
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  orderBy,
  query,
  where
} from 'https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js';

const ADMIN_EMAIL = 'planus253@naver.com';
const SEOUL_TIME_ZONE = 'Asia/Seoul';
const numberFormat = new Intl.NumberFormat('ko-KR');

const todayEl = document.querySelector('[data-traffic-today]');
const weekEl = document.querySelector('[data-traffic-week]');
const totalEl = document.querySelector('[data-traffic-total]');
const viewsEl = document.querySelector('[data-traffic-views]');
const chartEl = document.querySelector('[data-traffic-chart]');
const summaryEl = document.querySelector('[data-traffic-summary]');
const statusEl = document.querySelector('[data-traffic-status]');
const refreshButton = document.querySelector('[data-traffic-refresh]');

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

function addDays(dateKey, amount) {
  const date = new Date(`${dateKey}T12:00:00+09:00`);
  date.setUTCDate(date.getUTCDate() + amount);
  return seoulDateKey(date);
}

function startOfSeoulDate(dateKey) {
  return new Date(`${dateKey}T00:00:00+09:00`);
}

function compactDate(dateKey) {
  const [, month, day] = dateKey.split('-');
  return `${Number(month)}/${Number(day)}`;
}

function setMetric(element, value) {
  if (element) element.textContent = numberFormat.format(value || 0);
}

function setStatus(text, state = '') {
  if (!statusEl) return;
  statusEl.textContent = text;
  statusEl.dataset.state = state;
}

function resetMetrics() {
  [todayEl, weekEl, totalEl, viewsEl].forEach((element) => {
    if (element) element.textContent = '—';
  });
  if (summaryEl) summaryEl.textContent = '방문 데이터를 불러오는 중입니다.';
  if (chartEl) chartEl.innerHTML = '<p class="traffic-empty">방문 데이터를 불러오는 중입니다.</p>';
}

function renderChart(rows) {
  if (!chartEl) return;
  const maxViews = Math.max(1, ...rows.map((row) => row.views));

  chartEl.innerHTML = rows.map((row) => {
    const height = row.views === 0 ? 2 : Math.max(8, Math.round((row.views / maxViews) * 100));
    return `
      <div class="traffic-bar-item" title="${row.date} · ${numberFormat.format(row.views)} 페이지뷰">
        <span class="traffic-bar-value">${row.views ? numberFormat.format(row.views) : ''}</span>
        <div class="traffic-bar-track"><i style="height:${height}%"></i></div>
        <span class="traffic-bar-label">${compactDate(row.date)}</span>
      </div>
    `;
  }).join('');
}

async function loadTrafficAnalytics() {
  if (!firebaseReady || !db) return;
  const user = auth?.currentUser;
  if (user?.email?.toLowerCase() !== ADMIN_EMAIL) return;

  refreshButton && (refreshButton.disabled = true);
  setStatus('Firebase 통계 불러오는 중');

  try {
    const todayKey = seoulDateKey();
    const weekStartKey = addDays(todayKey, -6);
    const chartStartKey = addDays(todayKey, -13);

    const todayStart = Timestamp.fromDate(startOfSeoulDate(todayKey));
    const weekStart = Timestamp.fromDate(startOfSeoulDate(weekStartKey));

    const visitors = collection(db, 'traffic_visitors');
    const daily = collection(db, 'traffic_daily');

    const [todayCount, weekCount, totalCount, todayViewDoc, chartSnapshot] = await Promise.all([
      getCountFromServer(query(visitors, where('lastSeenAt', '>=', todayStart))),
      getCountFromServer(query(visitors, where('lastSeenAt', '>=', weekStart))),
      getCountFromServer(visitors),
      getDoc(doc(db, 'traffic_daily', todayKey)),
      getDocs(query(daily, where('date', '>=', chartStartKey), orderBy('date', 'asc')))
    ]);

    const todayVisitors = todayCount.data().count;
    const weekVisitors = weekCount.data().count;
    const totalVisitors = totalCount.data().count;
    const todayViews = todayViewDoc.exists() ? Number(todayViewDoc.data().views || 0) : 0;

    setMetric(todayEl, todayVisitors);
    setMetric(weekEl, weekVisitors);
    setMetric(totalEl, totalVisitors);
    setMetric(viewsEl, todayViews);

    const viewMap = new Map(chartSnapshot.docs.map((snapshot) => [snapshot.id, Number(snapshot.data().views || 0)]));
    const rows = Array.from({ length: 14 }, (_, index) => {
      const date = addDays(chartStartKey, index);
      return { date, views: viewMap.get(date) || 0 };
    });
    renderChart(rows);

    const fourteenDayViews = rows.reduce((sum, row) => sum + row.views, 0);
    if (summaryEl) {
      summaryEl.textContent = `최근 14일 페이지뷰 ${numberFormat.format(fourteenDayViews)}회 · 브라우저 기준 익명 방문자 집계`;
    }
    setStatus('Firebase 연결됨', 'success');
  } catch (error) {
    console.error('Traffic analytics load failed:', error);
    resetMetrics();
    if (summaryEl) {
      summaryEl.textContent = error?.code === 'permission-denied'
        ? '방문 통계용 Firestore 규칙을 게시하면 이 영역에 통계가 표시됩니다.'
        : '방문 통계를 불러오지 못했습니다.';
    }
    setStatus(error?.code === 'permission-denied' ? 'Firestore 규칙 확인 필요' : '통계 연결 오류', 'error');
  } finally {
    refreshButton && (refreshButton.disabled = false);
  }
}

refreshButton?.addEventListener('click', loadTrafficAnalytics);

if (firebaseReady && auth && db) {
  onAuthStateChanged(auth, (user) => {
    if (user?.email?.toLowerCase() === ADMIN_EMAIL) {
      loadTrafficAnalytics();
    } else {
      resetMetrics();
      setStatus('관리자 로그인 후 표시');
    }
  });
} else {
  resetMetrics();
  setStatus('Firebase 연결값 확인 필요', 'error');
}
