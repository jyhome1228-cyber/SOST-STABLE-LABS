(() => {
  'use strict';
  try {
    const saved = localStorage.getItem('sost-theme');
    if (saved !== 'dark' && saved !== 'light') localStorage.setItem('sost-theme', 'light');
    document.documentElement.dataset.theme = saved === 'dark' ? 'dark' : 'light';
  } catch (error) {
    document.documentElement.dataset.theme = 'light';
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

  applyFavicon();

  if (!document.querySelector('link[href*="project-unify.css"]')) {
    const projectStyle = document.createElement('link');
    projectStyle.rel = 'stylesheet';
    projectStyle.href = './css/project-unify.css?v=20260814-1';
    document.head.appendChild(projectStyle);
  }

  const core = document.createElement('script');
  core.src = './js/main-core.js?v=20260814-1';
  core.async = false;
  document.head.appendChild(core);

  const finalize = document.createElement('script');
  finalize.src = './js/site-finalize.js?v=20260814-1';
  finalize.async = false;
  document.head.appendChild(finalize);
})();
