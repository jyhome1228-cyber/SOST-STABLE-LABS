import { firebaseReady, db } from './firebase-config.js';
import {
  addDoc,
  collection,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js';

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
    setMessage('Firebase 연결 설정이 아직 완료되지 않았습니다. 관리자에게 문의해주세요.', 'error');
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
    await addDoc(collection(db, 'inquiries'), payload);
    form.reset();
    setMessage('문의가 정상적으로 접수되었습니다. 영업일 기준 1–2일 내 확인 후 연락드리겠습니다.', 'success');
  } catch (error) {
    console.error('Inquiry submit failed:', error);
    setMessage('문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.', 'error');
  } finally {
    setLoading(false);
  }
});
