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
    const svg = document.createElement('link');
    svg.rel = 'icon';
    svg.type = 'image/svg+xml';
    svg.href = '/assets/favicon-circle.svg?v=20260818-1';
    document.head.appendChild(svg);
  };

  const syncBrandLogo = () => {
    const dark = root.dataset.theme === 'dark';
    const src = dark
      ? './assets/logo-sost-labs-dark.svg?v=20260818-1'
      : './assets/logo-sost-labs.svg?v=20260818-1';

    document.querySelectorAll('a.brand img, a.footer-brand img').forEach((image) => {
      if (image.getAttribute('src') !== src) image.setAttribute('src', src);
      image.alt = 'sost labs.';
    });
  };

  const loadStyle = (href, matcher) => new Promise((resolve) => {
    const existing = document.querySelector(`link[href*="${matcher}"]`);
    if (existing) { resolve(); return; }
    const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = href;
    link.addEventListener('load', resolve, { once: true }); link.addEventListener('error', resolve, { once: true }); document.head.appendChild(link);
  });

  const loadScript = (src, marker) => new Promise((resolve) => {
    const existing = marker ? document.querySelector(`script[data-loader="${marker}"]`) : null;
    if (existing) {
      if (existing.dataset.loaded === 'true') resolve();
      else existing.addEventListener('load', resolve, { once: true });
      return;
    }
    const script = document.createElement('script'); script.src = src; script.async = false;
    if (marker) { script.dataset.loader = marker; script.addEventListener('load', () => { script.dataset.loaded = 'true'; }, { once: true }); }
    script.addEventListener('load', resolve, { once: true }); script.addEventListener('error', resolve, { once: true }); document.head.appendChild(script);
  });

  const reveal = () => {
    const show = () => window.requestAnimationFrame(() => window.requestAnimationFrame(() => root.classList.add('sost-page-ready')));
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => window.setTimeout(show, 70), { once: true });
    else window.setTimeout(show, 70);
  };

  applyFavicon();
  import('./traffic-tracker.js?v=20260816-1').catch(() => {});

  const themeObserver = new MutationObserver(() => syncBrandLogo());
  themeObserver.observe(root, { attributes: true, attributeFilter: ['data-theme'] });

  (async () => {
    await loadStyle('./css/project-unify.css?v=20260814-1', 'project-unify.css');
    await loadStyle('./css/blue-contrast-fix.css?v=20260817-1', 'blue-contrast-fix.css');
    await loadStyle('./css/knowledge-nav.css?v=20260817-2', 'knowledge-nav.css');
    await loadStyle('./css/sost-design-system.css?v=20260817-1', 'sost-design-system.css');
    await loadScript('./js/main-core.js?v=20260814-2', 'main-core');
    syncBrandLogo();
    await loadScript('./js/knowledge-nav.js?v=20260817-1', 'knowledge-nav');
    if (document.body?.dataset.page === 'home') {
      await loadScript('./js/home-cta-enhance.js?v=20260817-5', 'home-cta-refresh-v5');
    }
    await loadScript('./js/site-finalize.js?v=20260814-2', 'site-finalize');
    await loadStyle('./css/site-hierarchy-20260827.css?v=20260827-1', 'site-hierarchy-20260827.css');
    syncBrandLogo();
    reveal();
  })();

  window.setTimeout(() => {
    syncBrandLogo();
    root.classList.add('sost-page-ready');
  }, 900);
})();