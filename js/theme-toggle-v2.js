(() => {
  'use strict';

  const root = document.documentElement;
  const body = document.body;
  const header = document.querySelector('[data-header]');
  const headerInner = header?.querySelector('.header-inner');
  const headerAction = header?.querySelector('.header-action');
  const STORAGE_KEY = 'sost-theme';
  const brandLogo = './assets/logo-sost-labs.svg?v=20260813-4';

  const ensureStylesheet = (href, matcher) => {
    if (document.querySelector(`link[href*="${matcher}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  };

  ensureStylesheet('./css/brand-refresh.css?v=20260813-5', 'brand-refresh.css');
  ensureStylesheet('./css/home-reference-v2.css?v=20260814-2', 'home-reference-v2.css');

  const replacements = [
    ['SOST STABLE LABS', 'SOST LABS'],
    ['SOST STABLE', 'SOST'],
    ['Stable Systems for Better Business.', 'Systems for Better Business.'],
    ['STABILIZE', 'OPERATE'],
    ['하나의 안정적인 디지털 환경', '하나의 효율적인 디지털 환경'],
    ['기업이 안정적으로 작동', '기업이 체계적으로 작동'],
    ['안정적으로 작동하도록 개발합니다.', '실제 환경에서 작동하도록 개발합니다.'],
    ['현재의 운영을 더 안정적인 시스템으로.', '현재의 운영을 더 효율적인 시스템으로.']
  ];

  const replaceBrandCopy = (value = '') => {
    let next = String(value);
    replacements.forEach(([from, to]) => { next = next.split(from).join(to); });
    return next;
  };

  const normalizeBrand = () => {
    document.querySelectorAll('a.brand, a.footer-brand').forEach((brandLink) => {
      let image = brandLink.querySelector('img');
      if (!image) {
        brandLink.innerHTML = '<img alt="SOSTLABS." />';
        image = brandLink.querySelector('img');
      }
      if (image) {
        image.src = brandLogo;
        image.alt = 'SOSTLABS.';
      }
      brandLink.setAttribute('aria-label', 'SOSTLABS. 홈');
    });

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const next = replaceBrandCopy(node.nodeValue || '');
      if (next !== node.nodeValue) node.nodeValue = next;
    });

    document.querySelectorAll('[aria-label], [title], [alt], meta[content]').forEach((element) => {
      ['aria-label', 'title', 'alt', 'content'].forEach((attribute) => {
        if (!element.hasAttribute(attribute)) return;
        const current = element.getAttribute(attribute) || '';
        const next = replaceBrandCopy(current);
        if (next !== current) element.setAttribute(attribute, next);
      });
    });

    document.title = replaceBrandCopy(document.title);
  };

  normalizeBrand();

  let frame = 0;
  const observer = new MutationObserver(() => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      normalizeBrand();
    });
  });
  observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true });

  const sunIcon = '<svg class="theme-icon-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.5"></circle><path d="M12 2.8v2.1M12 19.1v2.1M2.8 12h2.1M19.1 12h2.1M5.5 5.5 7 7M17 17l1.5 1.5M18.5 5.5 17 7M7 17l-1.5 1.5"></path></svg>';
  const moonIcon = '<svg class="theme-icon-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.4 15.2A7.7 7.7 0 0 1 8.8 4.6 8.1 8.1 0 1 0 19.4 15.2Z"></path></svg>';

  const readTheme = () => {
    try { return localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark'; }
    catch { return root.dataset.theme === 'light' ? 'light' : 'dark'; }
  };

  const applyTheme = (theme, persist = false) => {
    const next = theme === 'light' ? 'light' : 'dark';
    root.dataset.theme = next;
    root.style.colorScheme = next;

    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    meta.content = next === 'light' ? '#f8f8f9' : '#08090b';

    const toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) {
      const label = next === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환';
      toggle.setAttribute('aria-label', label);
      toggle.setAttribute('title', label);
      toggle.setAttribute('aria-pressed', String(next === 'light'));
    }

    if (persist) {
      try { localStorage.setItem(STORAGE_KEY, next); } catch {}
    }
  };

  if (headerInner && !document.querySelector('[data-theme-toggle]')) {
    const tools = document.createElement('div');
    tools.className = 'header-tools';
    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.type = 'button';
    toggle.dataset.themeToggle = '';
    toggle.innerHTML = sunIcon + moonIcon;

    if (headerAction) {
      headerAction.insertAdjacentElement('beforebegin', tools);
      tools.append(toggle, headerAction);
    } else {
      headerInner.appendChild(tools);
      tools.appendChild(toggle);
    }

    toggle.addEventListener('click', () => {
      applyTheme(root.dataset.theme === 'light' ? 'dark' : 'light', true);
    });
  }

  applyTheme(readTheme());

  const arrangeHome = () => {
    if (body.dataset.page !== 'home') return;
    const projectSection = document.querySelector('.project-preview-grid')?.closest('.section-block');
    const aboutSection = document.querySelector('.home-intro');
    if (projectSection && aboutSection) {
      projectSection.classList.add('home-projects-first');
      aboutSection.after(projectSection);
    }
  };

  const createHeroGraphic = () => {
    if (body.dataset.page !== 'home') return;
    const heroInner = document.querySelector('.home-hero-inner');
    if (!heroInner || heroInner.querySelector('.hero-curve-stage')) return;

    const stage = document.createElement('div');
    stage.className = 'hero-curve-stage';
    stage.setAttribute('aria-hidden', 'true');
    stage.innerHTML = `
      <svg viewBox="0 0 760 620" focusable="false">
        <defs>
          <linearGradient id="sostCurveBlue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#a7b7ff"/><stop offset=".5" stop-color="#7f91ee"/><stop offset="1" stop-color="#6474d7"/>
          </linearGradient>
          <linearGradient id="sostCurveBlueSoft" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stop-color="#8191e7" stop-opacity=".42"/><stop offset="1" stop-color="#a7b7ff" stop-opacity=".92"/>
          </linearGradient>
          <filter id="sostGlow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="18"/></filter>
        </defs>
        <ellipse class="curve-glow" cx="426" cy="314" rx="215" ry="195" fill="#8191e7" filter="url(#sostGlow)"/>
        <g class="curve-layer curve-layer-a"><path class="curve-main" d="M42 502 C70 300 169 126 344 70 C525 12 691 102 674 246 C657 394 501 445 363 386 C259 341 176 373 141 461 C110 540 177 592 310 572 C436 553 518 491 427 430 C334 368 292 278 320 207 C349 132 447 117 528 156"/></g>
        <g class="curve-layer curve-layer-b"><path class="curve-grey" d="M-18 165 C135 50 329 42 474 132 C612 218 651 361 583 472 C515 581 354 619 204 556 C96 511 22 425 9 321"/></g>
        <g class="curve-layer curve-layer-c"><path class="curve-blue-soft" d="M167 626 C154 508 216 407 327 366 C438 325 567 355 653 438 C707 490 744 548 773 615"/></g>
        <g class="curve-layer curve-layer-d"><path class="curve-grey-thin" d="M506 -24 C590 78 614 188 571 287 C537 365 467 412 382 420 C279 430 194 386 159 312"/></g>
        <circle class="curve-dot dot-a" cx="646" cy="140" r="5"/><circle class="curve-dot dot-b" cx="184" cy="448" r="4"/>
      </svg>`;
    heroInner.appendChild(stage);
  };

  arrangeHome();
  createHeroGraphic();

  const escapeHTML = (value = '') => String(value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');

  const displayHost = (project) => {
    if (project.displayDomain) return project.displayDomain;
    try { return new URL(project.url).hostname.replace(/^www\./, ''); }
    catch { return ''; }
  };

  const renderHomePortfolio = () => {
    if (body.dataset.page !== 'home') return;
    const grid = document.querySelector('.project-preview-grid');
    const projects = Array.isArray(window.SOST_PROJECTS) ? window.SOST_PROJECTS : [];
    if (!grid || !projects.length) return;

    grid.classList.add('home-real-project-grid');
    grid.innerHTML = projects.slice(0, 4).map((project, index) => `
      <a class="home-real-project reveal is-visible" data-delay="${index * 60}" href="./projects.html" aria-label="포트폴리오 페이지 보기" style="--thumb-position:${escapeHTML(project.thumbPosition || '50% 12%')}">
        <div class="project-art"><img src="${escapeHTML(project.thumbnail || '')}" alt="${escapeHTML(project.title)} 프로젝트 썸네일" loading="lazy" decoding="async"/><span class="project-arrow">↗</span></div>
        <div class="project-meta"><div><p>${escapeHTML(project.categoryLabel || 'DEVELOP')} · ${escapeHTML(project.year || '')}</p><h3>${escapeHTML(project.title)}</h3></div><span>${escapeHTML(displayHost(project))}</span></div>
      </a>`).join('');

    const section = grid.closest('.section-block');
    const eyebrow = section?.querySelector('.section-heading .eyebrow');
    const heading = section?.querySelector('.section-heading h2');
    if (eyebrow) eyebrow.textContent = 'SELECTED DEVELOP WORK';
    if (heading) heading.textContent = '실제로 구축한 프로젝트를 확인하세요.';
    normalizeBrand();
  };

  if (body.dataset.page === 'home') {
    if (Array.isArray(window.SOST_PROJECTS) && window.SOST_PROJECTS.length) {
      renderHomePortfolio();
    } else if (!document.querySelector('script[data-home-project-data]')) {
      const script = document.createElement('script');
      script.src = './data/featured-projects.js?v=20260813-4';
      script.dataset.homeProjectData = '';
      script.onload = renderHomePortfolio;
      document.body.appendChild(script);
    }
  }
})();
