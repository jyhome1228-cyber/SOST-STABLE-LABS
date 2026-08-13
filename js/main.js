(() => {
  'use strict';
  try {
    const saved = localStorage.getItem('sost-theme');
    if (saved !== 'dark' && saved !== 'light') localStorage.setItem('sost-theme', 'light');
    document.documentElement.dataset.theme = saved === 'dark' ? 'dark' : 'light';
  } catch (error) {
    document.documentElement.dataset.theme = 'light';
  }

  const script = document.createElement('script');
  script.src = './js/main-core.js?v=20260814-1';
  script.async = false;
  document.head.appendChild(script);
})();
