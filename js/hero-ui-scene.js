(() => {
  'use strict';

  if (document.body?.dataset.page !== 'home') return;

  if (!document.querySelector('link[href*="hero-ui-scene.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './css/hero-ui-scene.css?v=20260814-1';
    document.head.appendChild(link);
  }

  const mount = () => {
    const heroInner = document.querySelector('.home-hero-inner');
    if (!heroInner) return;

    heroInner.querySelector('.hero-system-stage')?.remove();
    heroInner.querySelector('.hero-curve-stage')?.remove();
    heroInner.querySelector('.hero-ui-scene')?.remove();

    const scene = document.createElement('div');
    scene.className = 'hero-ui-scene';
    scene.setAttribute('aria-hidden', 'true');
    scene.innerHTML = `
      <span class="hero-ui-block block-a"></span>
      <span class="hero-ui-block block-b"></span>
      <span class="hero-ui-block block-c"></span>

      <div class="hero-ui-browser">
        <div class="hero-ui-browserbar">
          <i></i><i></i><i></i><strong>SOST / DIGITAL SYSTEM</strong>
        </div>
        <div class="hero-ui-shell">
          <aside class="hero-ui-sidebar">
            <span class="side-logo"></span>
            <span class="is-active"></span><span></span><span></span><span></span><span></span>
          </aside>
          <div class="hero-ui-workspace">
            <div class="hero-ui-top">
              <div class="hero-ui-heading"><b></b><span></span></div>
              <span class="hero-ui-action"></span>
            </div>
            <div class="hero-ui-grid">
              <div class="hero-ui-card card-tall">
                <span class="ui-card-kicker"></span><span class="ui-card-title"></span><span class="ui-card-line"></span>
                <div class="hero-ui-chart"></div>
              </div>
              <div class="hero-ui-card">
                <span class="ui-card-kicker"></span><span class="ui-card-title"></span><span class="ui-card-line"></span>
                <div class="hero-ui-metric"></div>
              </div>
              <div class="hero-ui-card">
                <span class="ui-card-kicker"></span><span class="ui-card-title"></span><span class="ui-card-line"></span>
                <span class="ui-card-line"></span><span class="ui-card-line"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="hero-ui-float float-brand"><b>BRAND</b><span></span></div>
      <div class="hero-ui-float float-data"><b>DATA / OPS</b><span></span></div>
      <div class="hero-ui-float float-web"><b>WEB SYSTEM</b><span></span></div>
    `;
    heroInner.appendChild(scene);
  };

  mount();
})();
