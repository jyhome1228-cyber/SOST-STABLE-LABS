(() => {
  'use strict';

  const projects = Array.isArray(window.SOST_PROJECTS) ? window.SOST_PROJECTS : [];
  const root = document.querySelector('#project-detail');
  if (!root) return;

  const escapeHTML = (value = '') => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  const params = new URLSearchParams(window.location.search);
  const projectId = params.get('id');
  const projectIndex = projects.findIndex((item) => item.id === projectId);
  const project = projects[projectIndex];

  if (!project) {
    root.innerHTML = `
      <section class="project-not-found">
        <div class="shell">
          <p class="eyebrow">PROJECT NOT FOUND</p>
          <h1>프로젝트 정보를 찾을 수 없습니다.</h1>
          <a class="button button-point" href="./projects.html">프로젝트 목록으로</a>
        </div>
      </section>
    `;
    return;
  }

  document.title = `${project.title} — SOST STABLE LABS`;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.setAttribute('content', project.excerpt);

  const createPlaceholder = (label, accent = 'blue', compact = false) => `
    <div class="detail-placeholder accent-${escapeHTML(accent)} ${compact ? 'is-compact' : ''}" aria-label="${escapeHTML(label)} 이미지 영역">
      <span>PROJECT IMAGE</span>
      <strong>${escapeHTML(label)}</strong>
      <small>${compact ? 'CONTENT IMAGE PLACEHOLDER' : 'HERO IMAGE PLACEHOLDER'}</small>
    </div>
  `;

  const createImage = (src, alt, fallbackLabel, accent, compact = false) => {
    if (!src) return createPlaceholder(fallbackLabel, accent, compact);
    return `<img src="${escapeHTML(src)}" alt="${escapeHTML(alt)}" loading="${compact ? 'lazy' : 'eager'}" />`;
  };

  const list = (items = []) => items.map((item) => `<li>${escapeHTML(item)}</li>`).join('');
  const tags = (items = []) => items.map((item) => `<span>${escapeHTML(item)}</span>`).join('');
  const credits = (items = []) => items.map((item) => `
    <div><dt>${escapeHTML(item.label)}</dt><dd>${escapeHTML(item.value)}</dd></div>
  `).join('');

  const gallery = (project.gallery || []).map((item, index) => `
    <figure class="project-gallery-item ${index === 0 ? 'is-wide' : ''}">
      <div class="project-gallery-visual">
        ${createImage(item.image, `${project.title} ${item.label}`, item.label, project.accent, true)}
      </div>
      <figcaption><span>${String(index + 1).padStart(2, '0')}</span>${escapeHTML(item.label)}</figcaption>
    </figure>
  `).join('');

  const nextProject = projects[(projectIndex + 1) % projects.length];

  root.innerHTML = `
    <section class="project-detail-hero">
      <div class="shell project-detail-head">
        <div class="project-detail-title">
          <p class="eyebrow">${escapeHTML(project.categoryLabel)} · ${escapeHTML(project.year)}</p>
          <h1>${escapeHTML(project.title)}</h1>
          <p>${escapeHTML(project.excerpt)}</p>
        </div>
        <dl class="project-summary-list">
          <div><dt>CLIENT</dt><dd>${escapeHTML(project.client)}</dd></div>
          <div><dt>YEAR</dt><dd>${escapeHTML(project.year)}</dd></div>
          <div><dt>CATEGORY</dt><dd>${escapeHTML(project.categoryLabel)}</dd></div>
          <div><dt>SERVICES</dt><dd>${(project.services || []).map(escapeHTML).join('<br />')}</dd></div>
        </dl>
      </div>
      <div class="shell project-hero-visual accent-${escapeHTML(project.accent || 'blue')}">
        ${createImage(project.hero || project.thumbnail, `${project.title} 대표 화면`, project.visualLabel || project.title, project.accent)}
      </div>
    </section>

    <section class="case-section case-overview-section">
      <div class="shell case-two-column">
        <div class="case-label"><span>01</span><p>OVERVIEW</p></div>
        <div class="case-copy-large"><p>${escapeHTML(project.overview)}</p></div>
      </div>
    </section>

    <section class="case-section case-section-muted case-challenge-section">
      <div class="shell case-content-grid">
        <article>
          <div class="case-label"><span>02</span><p>CHALLENGE</p></div>
          <h2>해결해야 했던 문제</h2>
          <p>${escapeHTML(project.challenge)}</p>
        </article>
        <article>
          <div class="case-label"><span>03</span><p>APPROACH</p></div>
          <h2>구축 접근 방식</h2>
          <p>${escapeHTML(project.approach)}</p>
        </article>
      </div>
    </section>

    <section class="case-section case-system-section">
      <div class="shell">
        <div class="case-section-heading">
          <div class="case-label"><span>04</span><p>SYSTEM</p></div>
          <h2>프로젝트를 구성한 핵심 기능</h2>
        </div>
        <div class="system-feature-grid">
          ${(project.system || []).map((item, index) => `
            <article><span>${String(index + 1).padStart(2, '0')}</span><h3>${escapeHTML(item)}</h3></article>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="project-gallery-section">
      <div class="shell">
        <div class="case-section-heading">
          <div class="case-label"><span>05</span><p>PROJECT VIEW</p></div>
          <h2>프로젝트 이미지 적용 영역</h2>
        </div>
        <div class="project-gallery-grid">${gallery}</div>
      </div>
    </section>

    <section class="case-section case-section-muted case-result-section">
      <div class="shell result-layout">
        <div>
          <div class="case-label"><span>06</span><p>RESULT</p></div>
          <h2>프로젝트를 통해 정리한 결과</h2>
          <ul class="result-list">${list(project.results)}</ul>
        </div>
        <aside class="project-information">
          <div><h3>PROJECT SCOPE</h3><div class="detail-tags">${tags(project.scope)}</div></div>
          <div><h3>TECHNOLOGY</h3><div class="detail-tags">${tags(project.technologies)}</div></div>
          <div><h3>CREDITS</h3><dl>${credits(project.credits)}</dl></div>
        </aside>
      </div>
    </section>

    <nav class="next-project" aria-label="다음 프로젝트">
      <div class="shell next-project-inner">
        <div><p>NEXT PROJECT</p><h2>${escapeHTML(nextProject.title)}</h2></div>
        <a href="./project-detail.html?id=${encodeURIComponent(nextProject.id)}" aria-label="다음 프로젝트 ${escapeHTML(nextProject.title)} 보기">↗</a>
      </div>
    </nav>
  `;
})();
