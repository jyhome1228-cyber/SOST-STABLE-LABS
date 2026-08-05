import { firebaseReady, db } from './firebase-config.js?v=20260805-2';
import {
  addDoc,
  collection,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js';

const form = document.querySelector('[data-inquiry-form]');
const message = document.querySelector('[data-inquiry-message]');
const submitButton = form?.querySelector('button[type="submit"]');

function setMessage(text, state = '') {
  if (!message) return;
  message.textContent = text;
  message.dataset.state = state;
}

function setLoading(loading) {
  if (!submitButton) return;
  if (!submitButton.dataset.label) submitButton.dataset.label = submitButton.textContent.trim();
  submitButton.disabled = loading;
  submitButton.textContent = loading ? '접수 중입니다' : submitButton.dataset.label;
}

function clean(value, maxLength = 5000) {
  return String(value || '').trim().slice(0, maxLength);
}

function submitErrorMessage(error) {
  const messages = {
    'permission-denied': '문의 저장 권한을 확인할 수 없습니다. Firestore 규칙을 확인해주세요.',
    'unavailable': '일시적으로 서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.',
    'resource-exhausted': '요청이 많아 접수하지 못했습니다. 잠시 후 다시 시도해주세요.'
  };
  return messages[error.code] || '문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
}

form?.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    setMessage('필수 항목과 개인정보 수집 동의를 확인해주세요.', 'error');
    return;
  }

  const data = new FormData(form);
  if (clean(data.get('fax'), 100)) return;

  if (!firebaseReady || !db) {
    setMessage('문의 시스템 연결을 확인하고 있습니다. 잠시 후 다시 시도해주세요.', 'error');
    return;
  }

  const payload = {
    company: clean(data.get('company'), 120),
    name: clean(data.get('name'), 80),
    email: clean(data.get('email'), 160),
    phone: clean(data.get('phone'), 60),
    projectType: clean(data.get('type'), 100),
    schedule: clean(data.get('schedule'), 120),
    budget: clean(data.get('budget'), 100),
    website: clean(data.get('website'), 300),
    message: clean(data.get('message'), 5000),
    privacyAgreed: data.get('privacy') === 'on',
    status: 'new',
    adminMemo: '',
    source: location.href,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  setLoading(true);
  setMessage('문의 내용을 안전하게 저장하고 있습니다.', 'loading');

  try {
    const document = await addDoc(collection(db, 'inquiries'), payload);
    const receipt = document.id.slice(-8).toUpperCase();
    form.reset();
    setMessage(`문의가 정상적으로 접수되었습니다. 접수번호 ${receipt} · 영업일 기준 1–2일 내 확인 후 연락드리겠습니다.`, 'success');
  } catch (error) {
    console.error('Inquiry submit failed:', error);
    setMessage(submitErrorMessage(error), 'error');
  } finally {
    setLoading(false);
  }
});
