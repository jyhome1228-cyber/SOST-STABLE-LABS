(() => {
  'use strict';
  if (document.body?.dataset.page === 'admin') return;

  const loadStyle = () => {
    if (document.querySelector('link[href*="site-finalize.css"]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './css/site-finalize.css?v=20260814-1';
    document.head.appendChild(link);
  };

  const make = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
  };

  const ensureCTA = () => {
    const footer = document.querySelector('.site-footer');
    if (!footer) return;

    let banner = document.querySelector('.contact-banner');
    if (!banner) banner = make('section', 'contact-banner');

    if (!banner.querySelector('.global-cta-diagram')) {
      banner.className = 'contact-banner global-system-cta';
      banner.replaceChildren();

      const inner = make('div', 'shell global-cta-inner');
      const copy = make('div', 'global-cta-copy');
      copy.append(
        make('p', 'eyebrow', 'START A PROJECT'),
        make('h2', '', '현재의 운영을 더 효율적인 시스템으로.'),
        make('p', '', '현재 운영 방식과 해결하고 싶은 문제를 기준으로, 필요한 웹사이트와 시스템의 범위를 함께 정리합니다.')
      );
      const button = make('a', 'global-cta-button', '프로젝트 문의하기 ↗');
      button.href = './contact.html';
      copy.appendChild(button);

      const diagram = make('div', 'global-cta-diagram');
      ['WEB','DATA','OPS','BRAND'].forEach((name, i) => {
        diagram.appendChild(make('span', `cta-system-node node-${['web','data','ops','brand'][i]}`, name));
      });
      diagram.appendChild(make('span', 'cta-system-panel'));
      ['a','b','c','d'].forEach((name) => diagram.appendChild(make('span', `cta-system-line line-${name}`)));
      ['a','b'].forEach((name) => diagram.appendChild(make('span', `cta-system-dot dot-${name}`)));

      inner.append(copy, diagram);
      banner.appendChild(inner);
    }

    if (footer.previousElementSibling !== banner) footer.before(banner);
  };

  const arrangeHome = () => {
    if (document.body?.dataset.page !== 'home') return;
    const about = document.querySelector('.home-intro');
    const projects = document.querySelector('.home-projects-section') || [...document.querySelectorAll('main > section')].find((s) => /SELECTED (PROJECTS|DEVELOP WORK)/.test(s.querySelector('.eyebrow')?.textContent || ''));
    const solutions = [...document.querySelectorAll('main > section')].find((s) => s.querySelector('.preview-grid.three-column'));
    if (projects) projects.classList.add('home-projects-section');
    if (about && projects && about.nextElementSibling !== projects) about.after(projects);
    if (projects && solutions && projects.nextElementSibling !== solutions) projects.after(solutions);
  };

  const run = () => { loadStyle(); arrangeHome(); ensureCTA(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once: true });
  else run();
  setTimeout(run, 300);
  setTimeout(run, 1200);
})();
