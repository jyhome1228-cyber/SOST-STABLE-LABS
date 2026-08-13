(() => {
  'use strict';
  if (document.querySelector('script[data-sost-theme-v2]')) return;

  try {
    const saved = localStorage.getItem('sost-theme');
    document.documentElement.dataset.theme = saved === 'dark' ? 'dark' : 'light';
  } catch {
    document.documentElement.dataset.theme = 'light';
  }

  const script = document.createElement('script');
  script.src = './js/theme-toggle-v2.js?v=20260814-3';
  script.defer = true;
  script.dataset.sostThemeV2 = '';
  document.head.appendChild(script);
})();
