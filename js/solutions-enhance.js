(() => {
  'use strict';

  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = './css/solutions-enhance.css?v=20260805-1';
  document.head.appendChild(stylesheet);

  const solutionTypeByTitle = {
    '기업 홈페이지 구축': '기업 홈페이지',
    '웹서비스·플랫폼 구축': '웹서비스·플랫폼',
    '기업 관리시스템 구축': '기업 관리시스템',
    'CRM 고객관리 시스템 구축': 'CRM 고객관리',
    '예약·접수 시스템 구축': '예약·접수 시스템',
    '관리자 페이지·대시보드 구축': '관리자·대시보드',
    '카페24 쇼핑몰 구축': '카페24 쇼핑몰',
    '시스템 연동·업무 자동화': '시스템 연동·업무 자동화',
    '사이트 이전·유지관리': '사이트 이전·개선',
    'HR 인사관리 시스템 구축': 'HR 인사관리',
    '주문·발주 관리 시스템 구축': '주문·발주 관리',
    '전자결재·승인 시스템 구축': '전자결재·승인'
  };

  const inquiryHref = (type) => `./contact.html?type=${encodeURIComponent(type)}#project-type`;

  document.querySelectorAll('.offering-card').forEach((card) => {
    const title = card.querySelector(':scope > h2')?.textContent.trim();
    const type = solutionTypeByTitle[title] || '필요 범위 상담';
    const toggle = card.querySelector(':scope > .offering-card-toggle');

    if (!toggle || card.querySelector('.solution-card-actions')) return;

    const actions = document.createElement('div');
    actions.className = 'solution-card-actions';

    const inquiry = document.createElement('a');
    inquiry.className = 'solution-quick-inquiry';
    inquiry.href = inquiryHref(type);
    inquiry.textContent = '문의하기 ↗';
    inquiry.setAttribute('aria-label', `${title} 문의하기`);

    inquiry.addEventListener('click', (event) => event.stopPropagation());
    inquiry.addEventListener('keydown', (event) => event.stopPropagation());

    toggle.replaceWith(actions);
    actions.append(toggle, inquiry);
  });

  const helpButton = document.querySelector('.offering-help a.button');
  if (helpButton) {
    helpButton.href = inquiryHref('필요 범위 상담');
  }

  const banner = document.querySelector('.contact-banner');
  if (banner) {
    banner.classList.add('solution-cta-banner');
    banner.innerHTML = `
      <div class="solution-cta-visual" aria-hidden="true">
        <span class="solution-cta-grid"></span>
        <span class="solution-cta-orbit solution-cta-orbit-a"></span>
        <span class="solution-cta-orbit solution-cta-orbit-b"></span>
        <span class="solution-cta-line solution-cta-line-a"></span>
        <span class="solution-cta-line solution-cta-line-b"></span>
        <img class="solution-cta-symbol" src="./assets/sost-symbol.svg" alt="" />
        <span class="solution-cta-code">STRUCTURE · SYSTEM · FLOW</span>
      </div>
      <div class="shell solution-cta-inner">
        <div class="solution-cta-copy reveal is-visible">
          <p class="eyebrow">START A PROJECT</p>
          <h2>기업에 필요한 구조부터 함께 정리합니다.</h2>
          <p>필요한 기능이 아직 명확하지 않아도 괜찮습니다. 현재 운영 방식과 해결하고 싶은 문제를 기준으로 적합한 웹사이트와 시스템 범위를 제안합니다.</p>
        </div>
        <a class="solution-cta-button" href="${inquiryHref('필요 범위 상담')}">프로젝트 문의하기 <span>↗</span></a>
      </div>
    `;
  }
})();
