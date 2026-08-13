(() => {
  'use strict';

  const STORAGE_KEY = 'sost-theme';
  const root = document.documentElement;
  const header = document.querySelector('[data-header]');
  const headerInner = header?.querySelector('.header-inner');
  const headerAction = header?.querySelector('.header-action');

  const sunIcon = `
    <svg class="theme-icon-sun" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3.5"></circle>
      <path d="M12 2.8v2.1M12 19.1v2.1M2.8 12h2.1M19.1 12h2.1M5.5 5.5 7 7M17 17l1.5 1.5M18.5 5.5 17 7M7 17l-1.5 1.5"></path>
    </svg>`;
  const moonIcon = `
    <svg class="theme-icon-moon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19.4 15.2A7.7 7.7 0 0 1 8.8 4.6 8.1 8.1 0 1 0 19.4 15.2Z"></path>
    </svg>`;

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
})();
