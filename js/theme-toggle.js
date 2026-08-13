(() => {
  'use strict';
  if (document.querySelector('script[data-sost-theme-v2]')) return;
  const script = document.createElement('script');
  script.src = './js/theme-toggle-v2.js?v=20260814-2';
  script.defer = true;
  script.dataset.sostThemeV2 = '';
  document.head.appendChild(script);
})();
