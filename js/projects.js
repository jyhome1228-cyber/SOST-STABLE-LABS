(() => {
  'use strict';

  const projects = Array.isArray(window.SOST_PROJECTS) ? window.SOST_PROJECTS : [];
  const grid = document.querySelector('#project-grid');
  const empty = document.querySelector('#project-empty');
  const count = document.querySelector('[data-project-count]');
  const filters = document.querySelectorAll('[data-project-filter]');

  if (!grid) return;

  const escapeHTML = (value = '') => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  const createVisual = (project) => {
    if (project.thumbnail) {
      return `<img src="${escapeHTML(project.thumbnail)}" alt="${escapeHTML(project.title)} 대표 이미지" loading="lazy" />`;
    }

    return `
      <div class="project-placeholder accent-${escapeHTML(project.accent || 'blue')}" aria-label="${escapeHTML(project.title)} 이미지 영역">
        <span>PROJECT IMAGE</span>
        <strong>${escapeHTML(project.visualLabel || project.title)}</strong>
        <small>THUMBNAIL PLACEHOLDER</small>
      </div>
    `;
  };

  const createCard = (project, index) => {
    const tags = (project.services || []).slice(0, 3)
      .map((service) => `<span>${escapeHTML(service)}</span>`)
      .join('');

    return `
      <article class="portfolio-card" data-category="${escapeHTML(project.category)}" style="--card-order:${index}">
        <a href="./project-detail.html?id=${encodeURIComponent(project.id)}" aria-label="${escapeHTML(project.title)} 프로젝트 자세히 보기">
          <div class="portfolio-card-visual">
            ${createVisual(project)}
            <span class="portfolio-card-arrow">↗</span>
          </div>
          <div class="portfolio-card-meta">
            <p>${escapeHTML(project.categoryLabel)} · ${escapeHTML(project.year)}</p>
            <span>${escapeHTML(project.client)}</span>
          </div>
          <h2>${escapeHTML(project.title)}</h2>
          <p class="portfolio-card-description">${escapeHTML(project.excerpt)}</p>
          <div class="portfolio-card-tags">${tags}</div>
        </a>
      </article>
    `;
  };

  const render = (category = 'all') => {
    const filtered = category === 'all'
      ? projects
      : projects.filter((project) => project.category === category);

    grid.innerHTML = filtered.map(createCard).join('');
    empty.hidden = filtered.length > 0;

    if (count) count.textContent = String(projects.length).padStart(2, '0');
  };

  filters.forEach((button) => {
    button.addEventListener('click', () => {
      filters.forEach((item) => item.classList.remove('is-active'));
      button.classList.add('is-active');
      render(button.dataset.projectFilter || 'all');
    });
  });

  render();
})();
