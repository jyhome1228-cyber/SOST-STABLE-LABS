(() => {
  'use strict';
  if (document.querySelector('script[data-sost-theme-v2]')) return;

  const loadHeroScene = () => {
    if (document.querySelector('script[data-sost-hero-ui]')) return;
    const hero = document.createElement('script');
    hero.src = './js/hero-ui-scene.js?v=20260814-1';
    hero.async = false;
    hero.dataset.sostHeroUi = '';
    document.head.appendChild(hero);
  };

  const script = document.createElement('script');
  script.src = './js/theme-toggle-v2.js?v=20260814-3';
  script.async = false;
  script.dataset.sostThemeV2 = '';
  script.onload = loadHeroScene;
  document.head.appendChild(script);
})();
