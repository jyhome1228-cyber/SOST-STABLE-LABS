(() => {
  'use strict';

  const PROJECT_ID = 'relim-outdoor-space-brand-website';
  const project = (Array.isArray(window.SOST_PROJECTS) ? window.SOST_PROJECTS : [])
    .find((item) => item.id === PROJECT_ID);

  if (!project || !project.livePreviewUrl) return;

  const escapeHTML = (value = '') => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  const host = (url) => {
    try {
      return new URL(url).hostname.replace(/^www\./, '');
    } catch {
      return 're-lim.com';
    }
  };

  const browserFrame = (url, extraClass = '') => `
    <div class="relim-live-browser ${extraClass}">
      <div class="relim-live-browser-bar" aria-hidden="true">
        <i></i><i></i><i></i><span>${escapeHTML(host(url))}</span>
      </div>
      <div class="relim-live-viewport">
        <iframe
          src="${escapeHTML(url)}"
          title="RE:LIM website live preview"
          loading="lazy"
          tabindex="-1"
          aria-hidden="true"
        ></iframe>
      </div>
    </div>
  `;

  const applyArchivePreview = () => {
    const grid = document.querySelector('#project-grid');
    if (!grid) return;

    const link = [...grid.querySelectorAll('.portfolio-card > a')]
      .find((item) => item.getAttribute('href')?.includes(`id=${PROJECT_ID}`));

    if (!link) return;
    const visual = link.querySelector('.portfolio-card-visual');
    if (!visual || visual.dataset.relimLiveApplied === 'true') return;

    visual.dataset.relimLiveApplied = 'true';
    visual.innerHTML = `
      ${browserFrame(project.livePreviewUrl, 'relim-live-archive')}
      <span class="portfolio-card-arrow">↗</span>
    `;
  };

  const applyDetailPreview = () => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('id') !== PROJECT_ID) return;

    const detailRoot = document.querySelector('#project-detail');
    if (!detailRoot) return;

    const hero = detailRoot.querySelector('.project-hero-visual');
    if (hero && hero.dataset.relimLiveApplied !== 'true') {
      hero.dataset.relimLiveApplied = 'true';
      hero.classList.add('relim-live-hero');
      hero.innerHTML = `
        <iframe
          src="${escapeHTML(project.livePreviewUrl)}"
          title="RE:LIM main website live preview"
          loading="eager"
          tabindex="-1"
          aria-hidden="true"
        ></iframe>
      `;
    }

    const gallery = detailRoot.querySelector('.project-gallery-grid');
    if (!gallery || gallery.dataset.relimLiveApplied === 'true') return;

    const pages = Array.isArray(project.livePages) ? project.livePages : [];
    const desktopViews = pages.map((page, index) => `
      <figure class="project-gallery-item relim-live-menu">
        ${browserFrame(page.url, 'relim-live-gallery-frame')}
        <figcaption><span>${String(index + 1).padStart(2, '0')}</span>${escapeHTML(page.label)}</figcaption>
      </figure>
    `).join('');

    const mobileIndex = pages.length + 1;
    const mobileView = `
      <figure class="project-gallery-item relim-live-mobile">
        <div class="relim-live-phone">
          <div class="relim-live-phone-viewport">
            <iframe
              src="${escapeHTML(project.livePreviewUrl)}"
              title="RE:LIM mobile website live preview"
              loading="lazy"
              tabindex="-1"
              aria-hidden="true"
            ></iframe>
          </div>
        </div>
        <figcaption><span>${String(mobileIndex).padStart(2, '0')}</span>Mobile Responsive View</figcaption>
      </figure>
    `;

    gallery.dataset.relimLiveApplied = 'true';
    gallery.innerHTML = desktopViews + mobileView;
  };

  const apply = () => {
    applyArchivePreview();
    applyDetailPreview();
  };

  apply();
  requestAnimationFrame(apply);
  window.setTimeout(apply, 250);
  window.setTimeout(apply, 800);

  const grid = document.querySelector('#project-grid');
  if (grid) {
    new MutationObserver(applyArchivePreview).observe(grid, { childList: true, subtree: true });
  }
})();
