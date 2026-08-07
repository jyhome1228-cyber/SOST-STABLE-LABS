(() => {
  'use strict';

  const loadStyle = (href, id) => {
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  };

  const loadScript = (src, id) => new Promise((resolve, reject) => {
    const existing = document.getElementById(id);
    if (existing) {
      if (existing.dataset.loaded === 'true') resolve();
      else existing.addEventListener('load', resolve, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = id;
    script.src = src;
    script.async = false;
    script.addEventListener('load', () => {
      script.dataset.loaded = 'true';
      resolve();
    }, { once: true });
    script.addEventListener('error', reject, { once: true });
    document.head.appendChild(script);
  });

  /* =========================================================
     GLOBAL CTA
  ========================================================= */
  const banner = document.querySelector('.contact-banner');

  if (banner && !banner.classList.contains('global-system-cta')) {
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
  }

  /* =========================================================
     HOME LABS — 6 CHAPTER BUSINESS NEED SERIES
  ========================================================= */
  const labsSection = [...document.querySelectorAll('.section-block')]
    .find((section) => section.querySelector('.eyebrow')?.textContent.trim() === 'LABS & INSIGHTS');

  if (labsSection) {
    loadStyle('./css/home-labs-series.css?v=20260807-1', 'home-labs-series-css');
    loadScript('./js/home-labs-series.js?v=20260807-1', 'home-labs-series-js')
      .catch((error) => console.error('Home LABS series failed to load.', error));
  }

  /* =========================================================
     HOME SELECTED PROJECTS — DATA DRIVEN 3-COLUMN SLIDER
  ========================================================= */
  const selectedSection = [...document.querySelectorAll('.section-block')]
    .find((section) => section.querySelector('.eyebrow')?.textContent.trim() === 'SELECTED PROJECTS');

  if (!selectedSection) return;

  selectedSection.classList.add('home-projects-section');
  selectedSection.innerHTML = `
    <div class="shell">
      <div class="section-heading home-projects-heading">
        <div>
          <p class="eyebrow">SELECTED PROJECTS</p>
          <h2>구축 과정과 결과를 기록합니다.</h2>
        </div>
        <div class="home-projects-actions">
          <a class="inline-link" href="./projects.html">프로젝트 전체 보기 <span>↗</span></a>
          <div class="home-projects-nav" aria-label="대표 프로젝트 이동">
            <button type="button" data-home-project-prev aria-label="이전 프로젝트">←</button>
            <button type="button" data-home-project-next aria-label="다음 프로젝트">→</button>
          </div>
        </div>
      </div>

      <div class="home-projects-viewport" data-home-project-viewport aria-label="대표 프로젝트 슬라이더">
        <div class="home-projects-track" data-home-project-track></div>
      </div>

      <div class="home-projects-status" aria-hidden="true">
        <p data-home-project-status>01–03 / 00</p>
        <div class="home-projects-progress"><i data-home-project-progress></i></div>
      </div>
    </div>
  `;

  loadStyle('./css/home-project-slider.css?v=20260807-2', 'home-project-slider-css');

  const projectScripts = [
    ['./data/featured-projects.js?v=20260807-1', 'home-project-data-featured'],
    ['./data/project-ptglaw.js?v=20260807-2', 'home-project-data-pentagon'],
    ['./data/project-haveaseat.js?v=20260806-1', 'home-project-data-haveaseat'],
    ['./data/project-relim.js?v=20260807-4', 'home-project-data-relim'],
    ['./data/project-jncostech.js?v=20260807-1', 'home-project-data-jncostech'],
    ['./data/project-captures.js?v=20260806-5', 'home-project-captures-main'],
    ['./data/project-haveaseat-captures.js?v=20260806-1', 'home-project-captures-haveaseat'],
    ['./data/project-relim-captures.js?v=20260807-1', 'home-project-captures-relim'],
    ['./data/project-pentagon-fallback.js?v=20260807-1', 'home-project-captures-pentagon'],
    ['./data/project-jncostech-captures.js?v=20260807-1', 'home-project-captures-jncostech']
  ];

  (async () => {
    try {
      for (const [src, id] of projectScripts) {
        await loadScript(src, id);
      }
      await loadScript('./js/home-project-slider.js?v=20260807-2', 'home-project-slider-js');
    } catch (error) {
      console.error('Home project slider failed to load.', error);
    }
  })();
})();
