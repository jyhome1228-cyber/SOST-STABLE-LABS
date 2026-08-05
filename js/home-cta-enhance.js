(() => {
  'use strict';

  const banner = document.querySelector('.contact-banner');
  if (!banner || banner.classList.contains('global-system-cta')) return;

  const originalEyebrow = banner.querySelector('.eyebrow')?.textContent.trim() || 'START A PROJECT';
  const originalTitle = banner.querySelector('h2')?.textContent.trim() || '기업에 필요한 구조부터 함께 정리합니다.';
  const originalLink = banner.querySelector('a');
  const href = originalLink?.getAttribute('href') || './contact.html';
  const label = originalLink?.textContent.trim() || '프로젝트 문의하기';

  banner.classList.add('global-system-cta');
  banner.innerHTML = `
    <div class="global-cta-visual" aria-hidden="true">
      <span class="global-cta-grid"></span>
      <span class="global-cta-orbit global-cta-orbit-a"></span>
      <span class="global-cta-orbit global-cta-orbit-b"></span>
      <span class="global-cta-line global-cta-line-a"></span>
      <span class="global-cta-line global-cta-line-b"></span>
      <img class="global-cta-symbol" src="./assets/sost-symbol.svg" alt="" />
      <span class="global-cta-code">STRUCTURE · SYSTEM · FLOW</span>
    </div>
    <div class="shell global-cta-inner">
      <div class="global-cta-copy">
        <p class="eyebrow">${originalEyebrow}</p>
        <h2>${originalTitle}</h2>
        <p>현재 운영 방식과 해결하고 싶은 문제를 기준으로, 필요한 웹사이트와 시스템의 범위를 함께 정리합니다.</p>
      </div>
      <a class="global-cta-button" href="${href}">${label} <span>↗</span></a>
    </div>
  `;
})();
