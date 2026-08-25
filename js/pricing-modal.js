(() => {
  'use strict';

  const plans = {
    start: {
      category: 'LANDING PAGE',
      name: 'START',
      price: '₩300,000~',
      summary: '하나의 목적에 집중하는 단일 랜딩페이지를 빠르고 명확하게 구축합니다.',
      fitTitle: '이런 프로젝트에 적합합니다',
      fit: '신규 서비스 소개, 제품 출시, 캠페인, 이벤트, 광고 유입용 페이지처럼 하나의 목적과 CTA가 분명한 프로젝트에 적합합니다.',
      items: ['원페이지 구성', 'PC / Mobile 반응형', '기본 인터랙션', 'CTA 및 문의 연결', '기본 SEO / Meta 설정', 'Firebase 문의 데이터 연결'],
      tech: 'HTML · JavaScript · Firebase',
      techCopy: '템플릿에 의존하지 않고 프로젝트 목적에 맞춰 직접 구축하며, 필요한 경우 문의 데이터는 Firebase로 연결합니다.',
      inquiry: './contact.html?plan=start'
    },
    standard: {
      category: 'CORPORATE WEBSITE',
      name: 'STANDARD',
      price: '₩500,000~',
      summary: '기업과 브랜드의 정보를 여러 페이지로 체계적으로 전달하는 기본 홈페이지입니다.',
      fitTitle: '이런 프로젝트에 적합합니다',
      fit: '회사 소개, 브랜드 소개, 서비스 안내, 포트폴리오처럼 여러 정보를 메뉴 구조로 나누어 보여줘야 하는 프로젝트에 적합합니다.',
      items: ['메인 + 서브페이지 구성', '사이트 구조 및 메뉴 설계', 'PC / Mobile 반응형', '문의폼 및 기본 인터랙션', 'SEO / Meta 기본 설정', '도메인 연결 지원'],
      tech: 'HTML · JavaScript · Firebase',
      techCopy: '브랜드와 사업 구조를 기준으로 정보 위계를 정리하고, 정적 페이지 중심으로 빠르고 안정적인 구조를 구축합니다.',
      inquiry: './contact.html?plan=standard'
    },
    manage: {
      category: 'WEBSITE + ADMIN',
      name: 'MANAGE',
      price: '₩1,000,000~',
      summary: '운영자가 콘텐츠와 문의 데이터를 직접 관리할 수 있는 관리자형 웹사이트입니다.',
      fitTitle: '이런 프로젝트에 적합합니다',
      fit: '게시물, 뉴스, 포트폴리오, 문의, 배너 등 운영 중 지속적으로 수정하거나 관리해야 하는 정보가 있는 프로젝트에 적합합니다.',
      items: ['STANDARD 기본 구성', '관리자 페이지', '게시물 등록 / 수정 / 삭제', '문의 데이터 관리', '콘텐츠 관리', '기본 운영 대시보드'],
      tech: 'HTML · JavaScript · Firebase',
      techCopy: 'Firebase 데이터베이스와 관리자 화면을 연결해 개발자에게 매번 요청하지 않아도 운영자가 직접 관리할 수 있도록 구축합니다.',
      inquiry: './contact.html?plan=manage'
    },
    connect: {
      category: 'LOGIN + DATABASE',
      name: 'CONNECT',
      price: '₩2,000,000~',
      summary: '로그인, 회원, 사용자별 데이터가 필요한 웹서비스 구축 범위입니다.',
      fitTitle: '이런 프로젝트에 적합합니다',
      fit: '회원가입, 로그인, 마이페이지, 사용자별 기록, 신청 이력처럼 사용자를 구분하고 데이터를 저장해야 하는 서비스에 적합합니다.',
      items: ['회원가입 / 로그인', 'Firebase Authentication', '사용자 데이터베이스', '사용자별 화면 및 기능', '기본 권한 관리', '관리자 데이터 조회'],
      tech: 'HTML · JavaScript · Firebase',
      techCopy: 'Firebase Authentication과 Database를 중심으로 사용자 계정과 데이터를 연결하고 필요한 권한 구조를 설계합니다.',
      inquiry: './contact.html?plan=connect'
    },
    custom: {
      category: 'BUSINESS SYSTEM',
      name: 'CUSTOM',
      price: 'PROJECT BASED',
      summary: '기업의 실제 업무 흐름에 맞춰 기능과 데이터 구조를 설계하는 맞춤 시스템입니다.',
      fitTitle: '이런 프로젝트에 적합합니다',
      fit: '엑셀, 메신저, 문서로 흩어진 업무를 하나의 시스템으로 연결하거나 기업 고유의 프로세스를 웹으로 구현해야 할 때 적합합니다.',
      items: ['CRM / 고객관리', '예약 / 접수 시스템', '주문 / 발주 관리', '전자결재 / 승인', '프로젝트 / 업무관리', '대시보드 / API 연동'],
      tech: '범위 확인 후 별도 설계',
      techCopy: '업무 방식과 사용자 권한, 데이터 구조를 먼저 확인한 뒤 필요한 기능 범위와 개발 방식을 정의하고 별도 견적을 제안합니다.',
      inquiry: './contact.html?plan=custom'
    },
    commerce: {
      category: 'ONLINE COMMERCE',
      name: 'COMMERCE',
      price: 'PROJECT BASED',
      summary: '안정적인 주문·결제·배송 운영을 위한 플랫폼 기반 쇼핑몰 구축입니다.',
      fitTitle: '이런 프로젝트에 적합합니다',
      fit: '실제 상품 판매, 회원 주문, 결제, 배송, 프로모션처럼 상거래 기능이 필요한 브랜드와 기업에 적합합니다.',
      items: ['Cafe24 / 아임웹 기반 구축', '상품 / 카테고리 구성', '주문 / 결제 설정', '배송 정책 설정', '회원 / 프로모션 기능', '플랫폼 범위 내 커스텀'],
      tech: 'Cafe24 · 아임웹',
      techCopy: '결제와 주문 운영의 안정성을 위해 검증된 커머스 플랫폼을 활용하고 브랜드에 필요한 디자인과 기능을 커스텀합니다.',
      inquiry: './contact.html?plan=commerce'
    }
  };

  const triggers = [...document.querySelectorAll('[data-plan-trigger]')];
  if (!triggers.length) return;

  const escapeHTML = (value = '') => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  const modal = document.createElement('div');
  modal.className = 'pricing-modal';
  modal.hidden = true;
  modal.innerHTML = `
    <button class="pricing-modal-backdrop" type="button" data-pricing-close aria-label="가격 상세 닫기"></button>
    <section class="pricing-modal-panel" role="dialog" aria-modal="true" aria-labelledby="pricing-modal-title" aria-describedby="pricing-modal-summary">
      <button class="pricing-modal-close" type="button" data-pricing-close aria-label="닫기">×</button>
      <div data-pricing-modal-content></div>
    </section>
  `;
  document.body.appendChild(modal);

  const panel = modal.querySelector('.pricing-modal-panel');
  const content = modal.querySelector('[data-pricing-modal-content]');
  const closeButtons = [...modal.querySelectorAll('[data-pricing-close]')];
  let lastFocus = null;
  let closeTimer = null;

  const renderPlan = (plan) => {
    const list = plan.items.map((item) => `<li>${escapeHTML(item)}</li>`).join('');
    content.innerHTML = `
      <div class="pricing-modal-head">
        <div>
          <p class="pricing-modal-category">${escapeHTML(plan.category)}</p>
          <h2 class="pricing-modal-name" id="pricing-modal-title">${escapeHTML(plan.name)}</h2>
          <p class="pricing-modal-price">${escapeHTML(plan.price)}</p>
          <p class="pricing-modal-summary" id="pricing-modal-summary">${escapeHTML(plan.summary)}</p>
        </div>
        <p class="pricing-modal-terms">VAT 별도<br>착수금 50% · 잔금 50%<br>도메인 및 외부 서비스 비용 별도</p>
      </div>
      <div class="pricing-modal-body">
        <section class="pricing-modal-section">
          <span class="pricing-modal-label">RECOMMENDED FOR</span>
          <h3>${escapeHTML(plan.fitTitle)}</h3>
          <p>${escapeHTML(plan.fit)}</p>
        </section>
        <section class="pricing-modal-section">
          <span class="pricing-modal-label">BUILD SCOPE</span>
          <h3>기본 구축 범위</h3>
          <ul class="pricing-modal-list">${list}</ul>
        </section>
        <section class="pricing-modal-section">
          <span class="pricing-modal-label">BUILD SYSTEM</span>
          <h3>${escapeHTML(plan.tech)}</h3>
          <p>${escapeHTML(plan.techCopy)}</p>
        </section>
        <section class="pricing-modal-section">
          <span class="pricing-modal-label">PROJECT TERMS</span>
          <h3>프로젝트 진행 기준</h3>
          <p>안내 금액은 기본 범위의 시작 비용이며 페이지 수, 디자인 난이도, 기능, 데이터 구조와 외부 서비스 연동 범위에 따라 최종 견적이 달라질 수 있습니다.</p>
        </section>
      </div>
      <div class="pricing-modal-footer">
        <p class="pricing-modal-note">플랜이 정확하지 않아도 괜찮습니다. 문의 내용을 확인한 뒤 필요한 범위와 우선순위를 다시 제안드립니다.</p>
        <a class="pricing-modal-inquiry" href="${escapeHTML(plan.inquiry)}">${escapeHTML(plan.name)} 플랜으로 문의하기 <span>↗</span></a>
      </div>
    `;
  };

  const openModal = (key, trigger) => {
    const plan = plans[key];
    if (!plan) return;
    if (closeTimer) {
      window.clearTimeout(closeTimer);
      closeTimer = null;
    }
    renderPlan(plan);
    lastFocus = trigger || document.activeElement;
    modal.hidden = false;
    document.body.classList.add('is-pricing-modal-open');
    panel.scrollTop = 0;
    window.requestAnimationFrame(() => {
      modal.classList.add('is-visible');
      modal.querySelector('.pricing-modal-close')?.focus({ preventScroll: true });
    });
  };

  const closeModal = () => {
    if (modal.hidden) return;
    modal.classList.remove('is-visible');
    document.body.classList.remove('is-pricing-modal-open');
    closeTimer = window.setTimeout(() => {
      modal.hidden = true;
      closeTimer = null;
      if (lastFocus instanceof HTMLElement) lastFocus.focus({ preventScroll: true });
    }, 200);
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => openModal(trigger.dataset.planTrigger, trigger));
  });

  closeButtons.forEach((button) => button.addEventListener('click', closeModal));

  document.addEventListener('keydown', (event) => {
    if (modal.hidden) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
      return;
    }

    if (event.key !== 'Tab') return;
    const focusable = [...modal.querySelectorAll('button:not([disabled]), a[href]')]
      .filter((element) => element.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
})();
