(() => {
  'use strict';

  const root = document.documentElement;
  root.classList.remove('sost-page-ready');

  try {
    const saved = localStorage.getItem('sost-theme');
    if (saved !== 'dark' && saved !== 'light') localStorage.setItem('sost-theme', 'light');
    root.dataset.theme = saved === 'dark' ? 'dark' : 'light';
  } catch (error) {
    root.dataset.theme = 'light';
  }

  const applyFavicon = () => {
    document.querySelectorAll('link[rel~="icon"]').forEach((link) => link.remove());

    const ico = document.createElement('link');
    ico.rel = 'icon';
    ico.type = 'image/x-icon';
    ico.href = '/favicon.ico?v=20260814-1';
    document.head.appendChild(ico);

    const svg = document.createElement('link');
    svg.rel = 'icon';
    svg.type = 'image/svg+xml';
    svg.href = '/assets/favicon-circle.svg?v=20260814-1';
    document.head.appendChild(svg);
  };

  const loadStyle = (href, matcher) => new Promise((resolve) => {
    const existing = document.querySelector(`link[href*="${matcher}"]`);
    if (existing) {
      resolve();
      return;
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.addEventListener('load', resolve, { once: true });
    link.addEventListener('error', resolve, { once: true });
    document.head.appendChild(link);
  });

  const loadScript = (src, marker) => new Promise((resolve) => {
    const existing = marker ? document.querySelector(`script[data-loader="${marker}"]`) : null;
    if (existing) {
      if (existing.dataset.loaded === 'true') resolve();
      else existing.addEventListener('load', resolve, { once: true });
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    if (marker) {
      script.dataset.loader = marker;
      script.addEventListener('load', () => { script.dataset.loaded = 'true'; }, { once: true });
    }
    script.addEventListener('load', resolve, { once: true });
    script.addEventListener('error', resolve, { once: true });
    document.head.appendChild(script);
  });

  const reveal = () => {
    const show = () => window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      root.classList.add('sost-page-ready');
    }));

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => window.setTimeout(show, 70), { once: true });
    } else {
      window.setTimeout(show, 70);
    }
  };

  applyFavicon();
  import('./traffic-tracker.js?v=20260816-1').catch(() => {});

  (async () => {
    await loadStyle('./css/project-unify.css?v=20260814-1', 'project-unify.css');
    await loadStyle('./css/blue-contrast-fix.css?v=20260817-1', 'blue-contrast-fix.css');
    await loadStyle('./css/knowledge-nav.css?v=20260817-1', 'knowledge-nav.css');
    await loadScript('./js/main-core.js?v=20260814-2', 'main-core');
    await loadScript('./js/knowledge-nav.js?v=20260817-1', 'knowledge-nav');
    if (document.body?.dataset.page === 'home') {
      await loadScript('./js/home-cta-enhance.js?v=20260817-3', 'home-cta-refresh');
    }
    await loadScript('./js/site-finalize.js?v=20260814-2', 'site-finalize');
    reveal();
  })();

  /* Fail-safe: never leave the page hidden if an enhancement request stalls. */
  window.setTimeout(() => root.classList.add('sost-page-ready'), 900);
})();
