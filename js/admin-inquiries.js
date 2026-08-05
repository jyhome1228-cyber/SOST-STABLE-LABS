import { firebaseReady, auth, db } from './firebase-config.js?v=20260805-2';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js';
import {
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc
} from 'https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js';

const ADMIN_EMAIL = 'planus253@naver.com';
const loginSection = document.querySelector('[data-admin-login]');
const dashboard = document.querySelector('[data-admin-dashboard]');
const loginForm = document.querySelector('[data-admin-login-form]');
const loginMessage = document.querySelector('[data-admin-login-message]');
const account = document.querySelector('[data-admin-account]');
const listRoot = document.querySelector('[data-inquiry-list]');
const detailRoot = document.querySelector('[data-inquiry-detail]');
const searchInput = document.querySelector('[data-inquiry-search]');
const filterButtons = [...document.querySelectorAll('[data-status-filter]')];

let inquiries = [];
let selectedId = null;
let activeStatus = 'all';
let unsubscribe = null;

const statusLabels = {
  new: '신규',
  reviewing: '검토 중',
  replied: '회신 완료',
  closed: '종료'
};

function escapeHTML(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function setLoginMessage(text, state = '') {
  if (!loginMessage) return;
  loginMessage.textContent = text;
  loginMessage.dataset.state = state;
}

function toDate(value) {
  if (!value) return null;
  if (typeof value.toDate === 'function') return value.toDate();
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatDate(value) {
  const date = toDate(value);
  if (!date) return '방금 전';
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit'
  }).format(date);
}

function updateStats() {
  const counts = inquiries.reduce((result, item) => {
    result.total += 1;
    result[item.status || 'new'] = (result[item.status || 'new'] || 0) + 1;
    return result;
  }, { total: 0, new: 0, reviewing: 0, replied: 0, closed: 0 });

  document.querySelector('[data-stat-total]').textContent = counts.total;
  document.querySelector('[data-stat-new]').textContent = counts.new;
  document.querySelector('[data-stat-reviewing]').textContent = counts.reviewing;
  document.querySelector('[data-stat-replied]').textContent = counts.replied;
}

function filteredInquiries() {
  const keyword = String(searchInput?.value || '').trim().toLowerCase();
  return inquiries.filter((item) => {
    const statusMatches = activeStatus === 'all' || (item.status || 'new') === activeStatus;
    const haystack = [item.company, item.name, item.email, item.phone, item.projectType, item.message]
      .join(' ').toLowerCase();
    return statusMatches && (!keyword || haystack.includes(keyword));
  });
}

function renderList() {
  const items = filteredInquiries();
  if (!items.length) {
    listRoot.innerHTML = '<p class="admin-empty">조건에 맞는 문의가 없습니다.</p>';
    return;
  }

  listRoot.innerHTML = items.map((item) => `
    <button class="admin-list-item ${item.id === selectedId ? 'is-active' : ''}" type="button" data-inquiry-id="${item.id}">
      <div class="admin-list-item-top">
        <span class="admin-status status-${escapeHTML(item.status || 'new')}">${statusLabels[item.status || 'new']}</span>
        <time>${escapeHTML(formatDate(item.createdAt))}</time>
      </div>
      <strong>${escapeHTML(item.company || '회사명 미입력')}</strong>
      <p>${escapeHTML(item.projectType || '프로젝트 유형 미입력')}</p>
      <span>${escapeHTML(item.name || '')} · ${escapeHTML(item.email || '')}</span>
    </button>
  `).join('');

  listRoot.querySelectorAll('[data-inquiry-id]').forEach((button) => {
    button.addEventListener('click', () => {
      selectedId = button.dataset.inquiryId;
      renderList();
      renderDetail();
    });
  });
}

function detailRow(label, value, options = {}) {
  if (!value) return '';
  const safeValue = escapeHTML(value);
  const content = options.link
    ? `<a href="${escapeHTML(options.link)}" ${options.external ? 'target="_blank" rel="noopener noreferrer"' : ''}>${safeValue}</a>`
    : `<p>${safeValue}</p>`;
  return `<div class="admin-detail-row"><span>${label}</span>${content}</div>`;
}

function renderDetail() {
  const item = inquiries.find((entry) => entry.id === selectedId);
  if (!item) {
    detailRoot.innerHTML = '<div class="admin-detail-empty"><span>INQUIRY DETAIL</span><p>왼쪽 목록에서 문의를 선택해주세요.</p></div>';
    return;
  }

  const mailSubject = encodeURIComponent(`[SOST 프로젝트 문의] ${item.company || item.name || ''}`);
  detailRoot.innerHTML = `
    <div class="admin-detail-head">
      <div><span>PROJECT INQUIRY</span><h2>${escapeHTML(item.company || '회사명 미입력')}</h2><p>${escapeHTML(formatDate(item.createdAt))}</p></div>
      <a class="admin-reply" href="mailto:${escapeHTML(item.email || '')}?subject=${mailSubject}">이메일 회신 ↗</a>
    </div>
    <div class="admin-detail-grid">
      ${detailRow('담당자', item.name)}
      ${detailRow('이메일', item.email, { link: `mailto:${item.email || ''}` })}
      ${detailRow('연락처', item.phone, { link: `tel:${String(item.phone || '').replace(/[^0-9+]/g, '')}` })}
      ${detailRow('프로젝트 유형', item.projectType)}
      ${detailRow('예상 일정', item.schedule)}
      ${detailRow('예상 예산', item.budget)}
      ${detailRow('현재 사이트', item.website, { link: item.website, external: true })}
    </div>
    <div class="admin-detail-message"><span>문의 내용</span><p>${escapeHTML(item.message || '').replace(/\n/g, '<br />')}</p></div>
    <div class="admin-manage-grid">
      <label><span>처리 상태</span><select data-detail-status>
        ${Object.entries(statusLabels).map(([value, label]) => `<option value="${value}" ${value === (item.status || 'new') ? 'selected' : ''}>${label}</option>`).join('')}
      </select></label>
      <label class="admin-memo"><span>관리자 메모</span><textarea rows="6" data-detail-memo placeholder="통화 내용, 견적 전달 여부, 후속 일정 등을 기록하세요.">${escapeHTML(item.adminMemo || '')}</textarea></label>
    </div>
    <div class="admin-detail-bottom"><p data-detail-message></p><button type="button" data-detail-save>변경사항 저장</button></div>
  `;

  detailRoot.querySelector('[data-detail-save]').addEventListener('click', async () => {
    const button = detailRoot.querySelector('[data-detail-save]');
    const feedback = detailRoot.querySelector('[data-detail-message]');
    const status = detailRoot.querySelector('[data-detail-status]').value;
    const memo = detailRoot.querySelector('[data-detail-memo]').value.trim().slice(0, 5000);
    button.disabled = true;
    button.textContent = '저장 중';
    feedback.textContent = '';
    try {
      await updateDoc(doc(db, 'inquiries', item.id), {
        status,
        adminMemo: memo,
        updatedAt: serverTimestamp()
      });
      feedback.textContent = '저장되었습니다.';
    } catch (error) {
      console.error(error);
      feedback.textContent = '저장하지 못했습니다. 권한과 Firebase 설정을 확인해주세요.';
    } finally {
      button.disabled = false;
      button.textContent = '변경사항 저장';
    }
  });
}

function subscribeInquiries() {
  unsubscribe?.();
  unsubscribe = onSnapshot(collection(db, 'inquiries'), (snapshot) => {
    inquiries = snapshot.docs.map((document) => ({ id: document.id, ...document.data() }))
      .sort((a, b) => (toDate(b.createdAt)?.getTime() || 0) - (toDate(a.createdAt)?.getTime() || 0));
    updateStats();
    renderList();
    renderDetail();
  }, (error) => {
    console.error(error);
    listRoot.innerHTML = '<p class="admin-empty">문의 데이터를 불러오지 못했습니다. Firestore Rules와 프로젝트 설정을 확인해주세요.</p>';
  });
}

loginForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!firebaseReady || !auth) {
    setLoginMessage('Firebase 웹 앱 설정값을 먼저 입력해주세요.', 'error');
    return;
  }

  const data = new FormData(loginForm);
  const email = String(data.get('email') || '').trim().toLowerCase();
  const password = String(data.get('password') || '');
  const button = loginForm.querySelector('button[type="submit"]');
  button.disabled = true;
  button.textContent = '로그인 중';
  setLoginMessage('관리자 계정을 확인하고 있습니다.');

  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    if (credential.user.email?.toLowerCase() !== ADMIN_EMAIL) {
      await signOut(auth);
      throw new Error('허용되지 않은 관리자 계정입니다.');
    }
  } catch (error) {
    console.error(error);
    setLoginMessage(error.message === '허용되지 않은 관리자 계정입니다.' ? error.message : '이메일 또는 비밀번호를 확인해주세요.', 'error');
  } finally {
    button.disabled = false;
    button.textContent = '관리자 로그인';
  }
});

document.querySelector('[data-admin-logout]')?.addEventListener('click', () => signOut(auth));
searchInput?.addEventListener('input', renderList);
filterButtons.forEach((button) => button.addEventListener('click', () => {
  activeStatus = button.dataset.statusFilter;
  filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
  renderList();
}));

if (!firebaseReady || !auth || !db) {
  setLoginMessage('Firebase 연결 전입니다. js/firebase-config.js에 웹 앱 설정값을 입력해주세요.', 'error');
} else {
  onAuthStateChanged(auth, async (user) => {
    const allowed = user?.email?.toLowerCase() === ADMIN_EMAIL;
    if (user && !allowed) {
      await signOut(auth);
      return;
    }

    loginSection.hidden = Boolean(allowed);
    dashboard.hidden = !allowed;
    if (allowed) {
      account.textContent = user.email;
      setLoginMessage('');
      subscribeInquiries();
    } else {
      unsubscribe?.();
      inquiries = [];
      selectedId = null;
    }
  });
}
