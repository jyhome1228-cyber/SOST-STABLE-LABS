(() => {
  'use strict';

  const STORAGE_KEY = 'sost-theme';
  const root = document.documentElement;
  const body = document.body;
  const header = document.querySelector('[data-header]');
  const headerInner = header?.querySelector('.header-inner');
  const headerAction = header?.querySelector('.header-action');
  const brandLogo = './assets/logo-sost-labs.svg?v=20260813-4';

  const ensureBrandStyles = () => {
    if (document.querySelector('link[href*="brand-refresh.css"]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './css/brand-refresh.css?v=20260813-5';
    document.head.appendChild(link);
  };

  ensureBrandStyles();

  const sunIcon = `
    <svg class="theme-icon-sun" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3.5"></circle>
      <path d="M12 2.8v2.1M12 19.1v2.1M2.8 12h2.1M19.1 12h2.1M5.5 5.5 7 7M17 17l1.5 1.5M18.5 5.5 17 7M7 17l-1.5 1.5"></path>
    </svg>`;
  const moonIcon = `
    <svg class="theme-icon-moon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19.4 15.2A7.7 7.7 0 0 1 8.8 4.6 8.1 8.1 0 1 0 19.4 15.2Z"></path>
    </svg>`;

  const replacements = [
    ['SOST STABLE LABS', 'SOST LABS'],
    ['SOST STABLE', 'SOST'],
    ['Stable Systems for Better Business.', 'Systems for Better Business.'],
    ['STABILIZE', 'OPERATE'],
    ['하나의 안정적인 디지털 환경', '하나의 효율적인 디지털 환경'],
    ['기업이 안정적으로 작동', '기업이 체계적으로 작동'],
    ['안정적으로 작동하도록 개발합니다.', '실제 환경에서 작동하도록 개발합니다.'],
    ['현재의 운영을 더 안정적인 시스템으로.', '현재의 운영을 더 효율적인 시스템으로.'],
    ['테스트, 문서화, 유지보수와 기능 개선으로 시스템을 안정화합니다.', '테스트, 문서화, 유지보수와 기능 개선으로 운영 품질을 지속적으로 높입니다.']
  ];

  const replaceBrandCopy = (value = '') => {
    let next = String(value);
    replacements.forEach(([from, to]) => {
      next = next.split(from).join(to);
    });
    return next;
  };

  const normalizeAttributes = () => {
    document.querySelectorAll('[aria-label], [title], [alt]').forEach((element) => {
      ['aria-label', 'title', 'alt'].forEach((attribute) => {
        if (!element.hasAttribute(attribute)) return;
        const current = element.getAttribute(attribute) || '';
        const next = replaceBrandCopy(current);
        if (next !== current) element.setAttribute(attribute, next);
      });
    });

    document.querySelectorAll('meta[content]').forEach((meta) => {
      const current = meta.getAttribute('content') || '';
      const next = replaceBrandCopy(current);
      if (next !== current) meta.setAttribute('content', next);
    });

    document.querySelectorAll('script[type="application/ld+json"]').forEach((script) => {
      const current = script.textContent || '';
      const next = replaceBrandCopy(current);
      if (next !== current) script.textContent = next;
    });

    const currentTitle = document.title;
    const nextTitle = replaceBrandCopy(currentTitle);
    if (nextTitle !== currentTitle) document.title = nextTitle;
  };

  const normalizeText = () => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const current = node.nodeValue || '';
      const next = replaceBrandCopy(current);
      if (next !== current) node.nodeValue = next;
    });
  };

  const applyBrandLogo = () => {
    document.querySelectorAll('a.brand, a.footer-brand').forEach((brandLink) => {
      let image = brandLink.querySelector('img');
      if (!image) {
        brandLink.innerHTML = '<img alt="SOSTLABS." />';
        image = brandLink.querySelector('img');
      }
      if (!image) return;
      image.src = brandLogo;
      image.alt = 'SOSTLABS.';
      brandLink.setAttribute('aria-label', 'SOSTLABS. 홈');
    });
  };

  const normalizeBrand = () => {
    normalizeText();
    normalizeAttributes();
    applyBrandLogo();
  };

  normalizeBrand();

  let normalizeFrame = 0;
  const observer = new MutationObserver(() => {
    if (normalizeFrame) return;
    normalizeFrame = window.requestAnimationFrame(() => {
      normalizeFrame = 0;
      normalizeBrand();
    });
  });
  observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true });

  const readTheme = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === 'light' ? 'light' : 'dark';
    } catch (error) {
      return root.dataset.theme === 'light' ? 'light' : 'dark';
    }
  };

  const updateMetaThemeColor = (theme) => {
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    meta.content = theme === 'light' ? '#ffffff' : '#08090b';
  };

  const applyTheme = (theme, persist = false) => {
    const next = theme === 'light' ? 'light' : 'dark';
    root.dataset.theme = next;
    root.style.colorScheme = next;
    updateMetaThemeColor(next);

    const toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) {
      const nextLabel = next === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환';
      toggle.setAttribute('aria-label', nextLabel);
      toggle.setAttribute('title', nextLabel);
      toggle.setAttribute('aria-pressed', String(next === 'light'));
    }

    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (error) {
        // Storage can be unavailable in privacy modes; the active page still updates.
      }
    }
  };

  if (headerInner && !document.querySelector('[data-theme-toggle]')) {
    const tools = document.createElement('div');
    tools.className = 'header-tools';

    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.type = 'button';
    toggle.dataset.themeToggle = '';
    toggle.innerHTML = `${sunIcon}${moonIcon}`;

    if (headerAction) {
      headerAction.insertAdjacentElement('beforebegin', tools);
      tools.append(toggle, headerAction);
    } else {
      headerInner.appendChild(tools);
      tools.appendChild(toggle);
    }

    toggle.addEventListener('click', () => {
      const current = root.dataset.theme === 'light' ? 'light' : 'dark';
      applyTheme(current === 'light' ? 'dark' : 'light', true);
    });
  }

  applyTheme(readTheme());

  const escapeHTML = (value = '') => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

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

    const selected = projects.slice(0, 4);
    grid.classList.add('home-real-project-grid');
    grid.innerHTML = selected.map((project, index) => `
      <a class="home-real-project reveal is-visible" data-delay="${index * 60}" href="./project-detail.html?id=${encodeURIComponent(project.id)}" aria-label="${escapeHTML(project.title)} 프로젝트 상세 보기" style="--thumb-position:${escapeHTML(project.thumbPosition || '50% 12%')}">
        <div class="project-art">
          <img src="${escapeHTML(project.thumbnail || '')}" alt="${escapeHTML(project.title)} 프로젝트 썸네일" loading="lazy" decoding="async" />
          <span class="project-arrow">↗</span>
        </div>
        <div class="project-meta">
          <div>
            <p>${escapeHTML(project.categoryLabel || 'DEVELOP')} · ${escapeHTML(project.year || '')}</p>
            <h3>${escapeHTML(project.title)}</h3>
          </div>
          <span>${escapeHTML(displayHost(project))}</span>
        </div>
      </a>`).join('');

    const section = grid.closest('.section-block');
    const eyebrow = section?.querySelector('.section-heading .eyebrow');
    const heading = section?.querySelector('.section-heading h2');
    if (eyebrow) eyebrow.textContent = 'SELECTED DEVELOP WORK';
    if (heading) heading.textContent = '실제로 구축한 프로젝트를 확인하세요.';
    normalizeBrand();
  };

  const loadHomePortfolio = () => {
    if (body.dataset.page !== 'home') return;
    if (Array.isArray(window.SOST_PROJECTS) && window.SOST_PROJECTS.length) {
      renderHomePortfolio();
      return;
    }

    const existing = document.querySelector('script[data-home-project-data]');
    if (existing) return;

    const script = document.createElement('script');
    script.src = './data/featured-projects.js?v=20260813-4';
    script.dataset.homeProjectData = '';
    script.onload = renderHomePortfolio;
    document.body.appendChild(script);
  };

  loadHomePortfolio();
})();
