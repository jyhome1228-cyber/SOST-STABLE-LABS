(() => {
  'use strict';

  const viewport = document.querySelector('[data-home-project-viewport]');
  const track = document.querySelector('[data-home-project-track]');
  const prevButton = document.querySelector('[data-home-project-prev]');
  const nextButton = document.querySelector('[data-home-project-next]');
  const status = document.querySelector('[data-home-project-status]');
  const progress = document.querySelector('[data-home-project-progress]');

  if (!viewport || !track) return;

  const projects = (Array.isArray(window.SOST_PROJECTS) ? window.SOST_PROJECTS : [])
    .filter((project) => project && project.id && project.thumbnail);

  const escapeHTML = (value = '') => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  const host = (url = '') => {
    try {
      return new URL(url).hostname.replace(/^www\./, '');
    } catch {
      return 'project preview';
    }
  };

  const card = (project) => {
    const tags = (project.services || []).slice(0, 3)
      .map((item) => `<span>${escapeHTML(item)}</span>`)
      .join('');

    return `
      <article class="home-project-card">
        <a href="./project-detail.html?id=${encodeURIComponent(project.id)}" aria-label="${escapeHTML(project.title)} 프로젝트 상세 보기">
          <div class="home-project-browser">
            <div class="home-project-browser-bar" aria-hidden="true">
              <i></i><i></i><i></i><span>${escapeHTML(host(project.url))}</span>
            </div>
            <div class="home-project-image">
              <img src="${escapeHTML(project.thumbnail)}" alt="${escapeHTML(project.title)} 사이트 화면" loading="lazy" decoding="async" />
            </div>
          </div>
          <div class="home-project-card-copy">
            <div class="home-project-card-meta">
              <p>${escapeHTML(project.categoryLabel)} · ${escapeHTML(project.year)}</p>
              <span>${escapeHTML(project.client)}</span>
            </div>
            <h3>${escapeHTML(project.title)}</h3>
            <p class="home-project-card-description">${escapeHTML(project.excerpt)}</p>
            <div class="home-project-card-tags">${tags}</div>
          </div>
        </a>
      </article>
    `;
  };

  track.innerHTML = projects.map(card).join('');

  if (!projects.length) {
    viewport.hidden = true;
    if (prevButton) prevButton.hidden = true;
    if (nextButton) nextButton.hidden = true;
    if (status) status.textContent = '00 / 00';
    return;
  }

  const cards = [...track.querySelectorAll('.home-project-card')];

  const visibleCount = () => {
    if (window.matchMedia('(max-width: 760px)').matches) return 1;
    if (window.matchMedia('(max-width: 1100px)').matches) return 2;
    return 3;
  };

  const cardStep = () => {
    const first = cards[0];
    if (!first) return viewport.clientWidth;
    const trackStyle = getComputedStyle(track);
    const gap = parseFloat(trackStyle.columnGap || trackStyle.gap || '0') || 0;
    return first.getBoundingClientRect().width + gap;
  };

  const currentIndex = () => {
    const step = cardStep();
    return step ? Math.round(viewport.scrollLeft / step) : 0;
  };

  const updateUI = () => {
    const index = Math.max(0, Math.min(currentIndex(), Math.max(0, projects.length - 1)));
    const visible = visibleCount();
    const lastVisible = Math.min(projects.length, index + visible);
    const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth - 2);

    if (prevButton) prevButton.disabled = viewport.scrollLeft <= 2;
    if (nextButton) nextButton.disabled = viewport.scrollLeft >= maxScroll;
    if (status) {
      const start = String(index + 1).padStart(2, '0');
      const end = String(lastVisible).padStart(2, '0');
      const total = String(projects.length).padStart(2, '0');
      status.textContent = `${start}–${end} / ${total}`;
    }

    if (progress) {
      const ratio = maxScroll <= 0 ? 1 : Math.min(1, viewport.scrollLeft / maxScroll);
      const thumbRatio = Math.min(1, visible / projects.length);
      const width = thumbRatio * 100;
      const travel = Math.max(0, 100 - width);
      progress.style.width = `${width}%`;
      progress.style.transform = `translateX(${travel * ratio}%)`;
    }
  };

  const move = (direction) => {
    viewport.scrollBy({ left: cardStep() * direction, behavior: 'smooth' });
  };

  prevButton?.addEventListener('click', () => move(-1));
  nextButton?.addEventListener('click', () => move(1));
  viewport.addEventListener('scroll', updateUI, { passive: true });
  window.addEventListener('resize', updateUI);

  let dragging = false;
  let startX = 0;
  let startScroll = 0;
  let moved = false;

  viewport.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    dragging = true;
    moved = false;
    startX = event.clientX;
    startScroll = viewport.scrollLeft;
    viewport.classList.add('is-dragging');
    viewport.setPointerCapture?.(event.pointerId);
  });

  viewport.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    const delta = event.clientX - startX;
    if (Math.abs(delta) > 5) moved = true;
    viewport.scrollLeft = startScroll - delta;
  });

  const stopDrag = (event) => {
    if (!dragging) return;
    dragging = false;
    viewport.classList.remove('is-dragging');
    viewport.releasePointerCapture?.(event.pointerId);
    const step = cardStep();
    const target = Math.round(viewport.scrollLeft / step) * step;
    viewport.scrollTo({ left: target, behavior: 'smooth' });
  };

  viewport.addEventListener('pointerup', stopDrag);
  viewport.addEventListener('pointercancel', stopDrag);

  viewport.addEventListener('click', (event) => {
    if (!moved) return;
    event.preventDefault();
    event.stopPropagation();
    moved = false;
  }, true);

  updateUI();
})();
