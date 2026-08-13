(() => {
  'use strict';
  try {
    const saved = localStorage.getItem('sost-theme');
    if (saved !== 'dark' && saved !== 'light') localStorage.setItem('sost-theme', 'light');
    document.documentElement.dataset.theme = saved === 'dark' ? 'dark' : 'light';
  } catch (error) {
    document.documentElement.dataset.theme = 'light';
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
