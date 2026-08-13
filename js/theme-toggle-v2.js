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
  ensureStylesheet('./css/home-reference-v2.css?v=20260814-3', 'home-reference-v2.css');

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
      const current = node.nodeValue || '';
      const next = replaceBrandCopy(current);
      if (next !== current) node.nodeValue = next;
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
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === 'dark' ? 'dark' : 'light';
    } catch {
      return root.dataset.theme === 'dark' ? 'dark' : 'light';
    }
  };

  const applyTheme = (theme, persist = false) => {
    const next = theme === 'dark' ? 'dark' : 'light';
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
    if (!heroInner || heroInner.querySelector('.hero-system-stage')) return;
    heroInner.querySelector('.hero-curve-stage')?.remove();

    const stage = document.createElement('div');
    stage.className = 'hero-system-stage';
    stage.setAttribute('aria-hidden', 'true');
    stage.innerHTML = `
      <svg viewBox="0 0 780 610" focusable="false">
        <defs>
          <linearGradient id="systemBlue" x1="100" y1="80" x2="680" y2="520" gradientUnits="userSpaceOnUse">
            <stop stop-color="#a7b7ff"/><stop offset=".48" stop-color="#7e8fea"/><stop offset="1" stop-color="#6172d7"/>
          </linearGradient>
          <linearGradient id="panelBlue" x1="300" y1="180" x2="520" y2="400" gradientUnits="userSpaceOnUse">
            <stop stop-color="#a7b7ff" stop-opacity=".2"/><stop offset="1" stop-color="#697adc" stop-opacity=".05"/>
          </linearGradient>
          <filter id="systemGlow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="22"/></filter>
        </defs>

        <g class="system-grid">
          <path d="M90 100H690M90 180H690M90 260H690M90 340H690M90 420H690M90 500H690"/>
          <path d="M130 65V535M230 65V535M330 65V535M430 65V535M530 65V535M630 65V535"/>
        </g>

        <ellipse class="system-glow" cx="405" cy="303" rx="215" ry="190" fill="#8191e7" filter="url(#systemGlow)"/>

        <g class="system-routes">
          <path class="route route-blue" d="M220 151H280C306 151 326 171 326 197V218"/>
          <path class="route route-grey" d="M560 151H515C489 151 468 171 468 197V218"/>
          <path class="route route-grey" d="M220 455H280C306 455 326 435 326 409V388"/>
          <path class="route route-blue" d="M560 455H515C489 455 468 435 468 409V388"/>
          <path class="route route-core" d="M395 218V173M395 388V435"/>
        </g>

        <g class="system-module module-web">
          <rect x="92" y="104" width="146" height="94" rx="25"/>
          <circle cx="121" cy="131" r="5"/><rect class="module-line" x="139" y="126" width="67" height="10" rx="5"/>
          <rect class="module-line soft" x="121" y="153" width="88" height="8" rx="4"/>
          <text x="121" y="181">WEB</text>
        </g>
        <g class="system-module module-brand">
          <rect x="542" y="104" width="146" height="94" rx="25"/>
          <circle cx="571" cy="131" r="5"/><rect class="module-line" x="589" y="126" width="67" height="10" rx="5"/>
          <rect class="module-line soft" x="571" y="153" width="88" height="8" rx="4"/>
          <text x="571" y="181">BRAND</text>
        </g>
        <g class="system-module module-data">
          <rect x="92" y="408" width="146" height="94" rx="25"/>
          <circle cx="121" cy="435" r="5"/><rect class="module-line" x="139" y="430" width="67" height="10" rx="5"/>
          <rect class="module-line soft" x="121" y="457" width="88" height="8" rx="4"/>
          <text x="121" y="485">DATA</text>
        </g>
        <g class="system-module module-ops">
          <rect x="542" y="408" width="146" height="94" rx="25"/>
          <circle cx="571" cy="435" r="5"/><rect class="module-line" x="589" y="430" width="67" height="10" rx="5"/>
          <rect class="module-line soft" x="571" y="457" width="88" height="8" rx="4"/>
          <text x="571" y="485">OPS</text>
        </g>

        <g class="system-core">
          <rect class="core-shell" x="278" y="212" width="234" height="182" rx="38" fill="url(#panelBlue)"/>
          <rect class="core-top" x="306" y="240" width="178" height="36" rx="14"/>
          <circle cx="329" cy="258" r="6"/><rect class="core-title" x="347" y="253" width="96" height="10" rx="5"/>
          <rect class="core-cell" x="306" y="296" width="79" height="70" rx="18"/>
          <rect class="core-cell" x="397" y="296" width="87" height="70" rx="18"/>
          <path class="core-mini" d="M326 339L341 321L354 332L368 312"/>
          <circle class="core-node" cx="422" cy="322" r="7"/><circle class="core-node soft" cx="448" cy="340" r="7"/><circle class="core-node" cx="458" cy="316" r="5"/>
          <text class="core-label" x="395" y="423" text-anchor="middle">SYSTEM ARCHITECTURE</text>
        </g>

        <g class="flow-points">
          <circle class="flow-dot dot-1" cx="265" cy="151" r="6"/>
          <circle class="flow-dot dot-2" cx="515" cy="455" r="6"/>
          <circle class="flow-dot dot-3" cx="395" cy="184" r="5"/>
        </g>
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
