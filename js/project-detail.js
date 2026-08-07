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
    return `<img src="${escapeHTML(src)}" alt="${escapeHTML(alt)}" loading="${compact ? 'lazy' : 'eager'}" decoding="async" />`;
  };

  const normalizeLayout = (item, index) => {
    const allowed = new Set([
      'desktop', 'menu', 'section', 'visual', 'mobile',
      'mobile-scroll', 'scroll', 'editorial'
    ]);
    if (allowed.has(item.layout)) return item.layout;
    if (/mobile/i.test(item.label || '')) return 'mobile';
    if (index === 0) return 'desktop';
    return 'editorial';
  };

  const list = (items = []) => items.map((item) => `<li>${escapeHTML(item)}</li>`).join('');
  const tags = (items = []) => items.map((item) => `<span>${escapeHTML(item)}</span>`).join('');
  const credits = (items = []) => items.map((item) => `
    <div><dt>${escapeHTML(item.label)}</dt><dd>${escapeHTML(item.value)}</dd></div>
  `).join('');

  const highlights = (project.caseHighlights || []).map((item, index) => `
    <article class="case-build-card">
      <div class="case-build-card-top">
        <span>${String(index + 1).padStart(2, '0')}</span>
        <p>${escapeHTML(item.label)}</p>
      </div>
      <h3>${escapeHTML(item.title)}</h3>
      <p class="case-build-description">${escapeHTML(item.description)}</p>
      <div class="case-build-outcome">
        <small>OPERATION EFFECT</small>
        <strong>${escapeHTML(item.outcome)}</strong>
      </div>
    </article>
  `).join('');

  const gallery = (project.gallery || []).map((item, index) => {
    const layout = normalizeLayout(item, index);
    const wideClass = ['desktop', 'section', 'scroll'].includes(layout) ? ' is-wide' : '';
    return `
      <figure class="project-gallery-item layout-${escapeHTML(layout)}${wideClass}" data-layout="${escapeHTML(layout)}">
        <div class="project-gallery-visual">
          ${createImage(item.image, `${project.title} ${item.label}`, item.label, project.accent, true)}
        </div>
        <figcaption><span>${String(index + 1).padStart(2, '0')}</span>${escapeHTML(item.label)}</figcaption>
      </figure>
    `;
  }).join('');

  const siteHost = (() => {
    try { return new URL(project.url).hostname.replace(/^www\./, ''); }
    catch { return 'PROJECT WEBSITE'; }
  })();

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

    <section class="case-section case-build-section">
      <div class="shell">
        <div class="case-section-heading case-build-heading">
          <div class="case-label"><span>04</span><p>WHAT WE BUILT</p></div>
          <div>
            <h2>화면보다 먼저, 실제 운영에 필요한 구조를 만들었습니다.</h2>
            <p>${escapeHTML(project.caseSummary || '프로젝트의 핵심 구현 내용과 운영 효과를 정리했습니다.')}</p>
          </div>
        </div>
        <div class="case-build-flow">${highlights}</div>
      </div>
    </section>

    <section class="case-section case-system-section case-section-muted">
      <div class="shell">
        <div class="case-section-heading">
          <div class="case-label"><span>05</span><p>FUNCTIONS</p></div>
          <h2>프로젝트에 실제로 구현한 핵심 기능</h2>
        </div>
        <div class="system-feature-grid">
          ${(project.system || []).map((item, index) => `
            <article>
              <span>${String(index + 1).padStart(2, '0')}</span>
              <div class="system-feature-mark" aria-hidden="true">${String(index + 1).padStart(2, '0')}</div>
              <h3>${escapeHTML(item)}</h3>
            </article>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="project-gallery-section">
      <div class="shell">
        <div class="case-section-heading">
          <div class="case-label"><span>06</span><p>PROJECT VIEW</p></div>
          <h2>실제 화면 구성과 반응형 경험</h2>
        </div>
        <div class="project-gallery-grid">${gallery}</div>
      </div>
    </section>

    <section class="case-section case-section-muted case-result-section">
      <div class="shell result-layout">
        <div>
          <div class="case-label"><span>07</span><p>RESULT</p></div>
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

    ${project.url ? `
      <section class="project-site-cta-section">
        <div class="shell project-site-cta">
          <div>
            <p class="eyebrow">VIEW LIVE PROJECT</p>
            <h2>실제 제작 사이트에서<br />완성된 경험을 확인하세요.</h2>
            <span>${escapeHTML(siteHost)}</span>
          </div>
          <a href="${escapeHTML(project.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHTML(project.title)} 제작 사이트 새창으로 확인하기">
            <span>제작 사이트 확인하기</span><strong>↗</strong>
          </a>
        </div>
      </section>
    ` : ''}

    <nav class="next-project" aria-label="다음 프로젝트">
      <div class="shell next-project-inner">
        <div><p>NEXT PROJECT</p><h2>${escapeHTML(nextProject.title)}</h2></div>
        <a href="./project-detail.html?id=${encodeURIComponent(nextProject.id)}" aria-label="다음 프로젝트 ${escapeHTML(nextProject.title)} 보기">↗</a>
      </div>
    </nav>
  `;
})();
