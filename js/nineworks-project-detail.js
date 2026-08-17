(() => {
  'use strict';

  const root = document.querySelector('#project-detail');
  if (!root) return;

  const projects = Array.isArray(window.SOST_PROJECTS) ? window.SOST_PROJECTS : [];
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get('id') || '';
  const projectIndex = projects.findIndex((item) => item.id === projectId);
  const projectMeta = projects[projectIndex];

  const workFiles = {
    recelleclore: 'recelleclore.js',
    thomastone: 'thomastone.js',
    kekomi: 'kekomi.js',
    aesost: 'aesost.js',
    relim: 'relim.js',
    'tne-epc': 'tne-epc.js',
    terracle: './data/project-terracle.js?v=20260817-1',
    'the-petrichor': './data/project-the-petrichor.js?v=20260815-1',
    'taepyeong-paper': './data/project-taepyeong-paper.js?v=20260817-1',
    'pentagon-law-office-corporate-center': './data/project-ptg-law-detail.js?v=20260817-1',
    fineb: 'fineb.js'
  };

  const localWorkIds = new Set(['terracle', 'the-petrichor', 'taepyeong-paper', 'pentagon-law-office-corporate-center']);

  const esc = (value = '') => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#039;');

  const notFound = () => {
    root.innerHTML = `
      <section class="nw-project-missing">
        <div class="shell">
          <p class="eyebrow">PROJECT NOT FOUND</p>
          <h1>프로젝트 정보를 찾을 수 없습니다.</h1>
          <a class="button button-point" href="./projects.html">프로젝트 목록으로</a>
        </div>
      </section>`;
  };

  if (!projectMeta || !workFiles[projectId]) {
    notFound();
    return;
  }

  const renderList = (items, renderer, className) => {
    if (!Array.isArray(items) || !items.length) return '';
    return `<div class="${className}">${items.map(renderer).join('')}</div>`;
  };

  const renderWork = () => {
    const work = window.NW_WORK;
    if (!work || work.id !== projectId) {
      root.innerHTML = `
        <section class="nw-project-missing">
          <div class="shell">
            <p class="eyebrow">PROJECT DATA ERROR</p>
            <h1>${esc(projectMeta.title)}</h1>
            <p>상세 데이터를 불러오지 못했습니다.</p>
            <div class="nw-missing-actions">
              <a class="button button-point" href="${esc(projectMeta.url)}" target="_blank" rel="noopener noreferrer">라이브 사이트 보기 ↗</a>
              <a class="button button-ghost" href="./projects.html">프로젝트 목록</a>
            </div>
          </div>
        </section>`;
      return;
    }

    document.title = `${work.title} — SOST LABS`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = work.summary || work.lead || work.subtitle || projectMeta.excerpt;

    const facts = [
      ['CLIENT', work.client],
      ['YEAR', work.year],
      ['CATEGORY', work.category],
      ['SCOPE', work.scope],
      ['ROLE', work.role]
    ].filter(([, value]) => value);

    const dev = work.develop || {};
    const sections = Array.isArray(work.sections) ? work.sections : [];
    const liveUrl = work.liveUrl || projectMeta.url || '';

    const stats = renderList(dev.stats, (item, index) => `
      <article class="nw-stat-card">
        <div class="nw-card-index"><span>${String(index + 1).padStart(2, '0')}</span><small>${esc(item.label)}</small></div>
        <strong>${esc(item.value)}</strong>
        ${item.copy ? `<p>${esc(item.copy)}</p>` : ''}
      </article>`, 'nw-stat-grid');

    const planning = renderList(dev.planning, (item) => `
      <article class="nw-detail-card">
        <span>${esc(item.no)}</span>
        <h4>${esc(item.title)}</h4>
        <p>${esc(item.copy)}</p>
      </article>`, 'nw-detail-grid nw-detail-grid--three');

    const architecture = renderList(dev.architecture, (item) => `
      <article class="nw-flow-card">
        <small>${esc(item.no)}</small>
        <h4>${esc(item.title)}</h4>
        <p>${esc(item.copy)}</p>
      </article>`, 'nw-flow-grid');

    const stack = renderList(dev.stack, (item) => `
      <article class="nw-stack-card">
        <small>${esc(item.no)}</small>
        <h4>${esc(item.title)}</h4>
        <p>${esc(item.copy)}</p>
      </article>`, 'nw-detail-grid nw-detail-grid--three nw-stack-grid');

    const sitemap = renderList(dev.sitemap, (group) => `
      <article class="nw-sitemap-card">
        <span>${esc(group.no)}</span>
        <h4>${esc(group.title)}</h4>
        <ul>${(group.items || []).map((item) => `<li>${esc(item)}</li>`).join('')}</ul>
      </article>`, 'nw-sitemap-grid');

    const dataFlow = renderList(dev.dataFlow, (item, index) => `
      <article class="nw-data-step">
        <span>${esc(item.no || String(index + 1).padStart(2, '0'))}</span>
        <h4>${esc(item.title)}</h4>
        <p>${esc(item.copy)}</p>
      </article>`, 'nw-data-flow');

    const codeMap = renderList(dev.codeMap, (item) => `
      <article class="nw-code-card">
        <div class="nw-code-head"><span>${esc(item.label)}</span><small>${esc(item.file || '')}</small></div>
        ${item.code ? `<code>${esc(item.code)}</code>` : ''}
        ${item.copy ? `<p>${esc(item.copy)}</p>` : ''}
      </article>`, 'nw-code-grid');

    const deployment = renderList(dev.deployment, (item) => `
      <div class="nw-deploy-row"><span>${esc(item.label)}</span><strong>${esc(item.value)}</strong></div>`, 'nw-deployment');

    const systemBlocks = [
      ['01', 'PLANNING LAYER', '기획을 화면보다 먼저 설계했습니다.', dev.planningCopy, planning],
      ['02', 'SYSTEM ARCHITECTURE', '서비스 구조를 하나의 흐름으로 연결했습니다.', dev.architectureCopy, architecture],
      ['03', 'DEVELOPMENT STACK', '구축에 사용한 기술과 역할입니다.', dev.stackCopy, stack],
      ['04', 'INFORMATION ARCHITECTURE', '정보와 기능을 목적별로 정리했습니다.', dev.sitemapCopy, sitemap],
      ['05', 'DATA FLOW', '사용자의 행동이 실제 운영 흐름으로 이어집니다.', dev.dataFlowCopy, dataFlow],
      ['06', 'CODE STRUCTURE', '핵심 기능을 역할별 구조로 정리했습니다.', dev.codeMapCopy, codeMap],
      ['07', 'DEPLOYMENT & OPERATION', '배포 이후 운영까지 고려했습니다.', dev.deploymentCopy, deployment]
    ].filter(([, , , , content]) => content);

    const systemHTML = (stats || systemBlocks.length) ? `
      <section class="nw-system-section">
        <div class="shell">
          <header class="nw-system-intro">
            <div class="nw-section-label"><span>02</span><p>SYSTEM CASE</p></div>
            <div>
              <p class="nw-build-version">${esc(dev.version || `${work.title} / BUILD ${work.year || ''}`)}</p>
              <h2>${esc(dev.title || 'From planning to a working digital system.')}</h2>
            </div>
          </header>
          ${stats}
          <div class="nw-system-blocks">
            ${systemBlocks.map(([no, label, title, copy, content]) => `
              <section class="nw-system-block">
                <header class="nw-block-heading">
                  <p><span>${esc(no)}</span>${esc(label)}</p>
                  <h3>${esc(title)}</h3>
                  ${copy ? `<div>${esc(copy)}</div>` : ''}
                </header>
                ${content}
              </section>`).join('')}
          </div>
        </div>
      </section>` : '';

    const editorialHTML = sections.map((section, index) => {
      const paragraphs = (section.paragraphs || []).filter(Boolean)
        .map((text) => `<p>${esc(text)}</p>`).join('');
      const images = (section.images || []).filter(Boolean)
        .map((src, imageIndex) => `
          <figure class="nw-editorial-image">
            <img src="${esc(src)}" alt="${esc(work.title)} ${esc(section.label || '')} ${imageIndex + 1}" loading="lazy" decoding="async" />
          </figure>`).join('');
      return `
        <section class="nw-editorial-section">
          <div class="shell nw-editorial-grid">
            <div class="nw-section-label"><span>${String(index + 3).padStart(2, '0')}</span><p>${esc(section.label || 'PROJECT DETAIL')}</p></div>
            <div class="nw-editorial-content">
              <h2>${esc(section.title || section.label || '')}</h2>
              ${paragraphs ? `<div class="nw-editorial-copy">${paragraphs}</div>` : ''}
              ${images ? `<div class="nw-editorial-images">${images}</div>` : ''}
            </div>
          </div>
        </section>`;
    }).join('');

    root.innerHTML = `
      <article class="nw-project-case">
        <section class="nw-project-hero">
          <div class="shell nw-project-hero-grid">
            <div class="nw-project-title">
              <p class="eyebrow">DEVELOP CASE · ${esc(work.year || projectMeta.year)}</p>
              <h1>${esc(work.title)}</h1>
              <p class="nw-project-subtitle">${esc(work.subtitle || projectMeta.excerpt)}</p>
              ${work.lead ? `<p class="nw-project-lead">${esc(work.lead)}</p>` : ''}
              ${liveUrl ? `<a class="nw-live-link" href="${esc(liveUrl)}" target="_blank" rel="noopener noreferrer"><span>VIEW LIVE SITE</span><strong>↗</strong></a>` : ''}
            </div>
            <dl class="nw-project-facts">
              ${facts.map(([label, value]) => `<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`).join('')}
            </dl>
          </div>
          ${work.thumbnail ? `<div class="shell nw-project-hero-media"><img src="${esc(work.thumbnail)}" alt="${esc(work.title)} main visual" decoding="async" /></div>` : ''}
        </section>

        <section class="nw-overview-section">
          <div class="shell nw-overview-grid">
            <div class="nw-section-label"><span>01</span><p>PROJECT OVERVIEW</p></div>
            <div class="nw-overview-copy">
              ${work.summary ? `<p>${esc(work.summary)}</p>` : ''}
            </div>
          </div>
        </section>

        ${systemHTML}
        ${editorialHTML}

        <section class="nw-project-credit">
          <div class="shell nw-credit-grid">
            <div>
              <p class="eyebrow">PROJECT INFORMATION</p>
              <h2>${esc(work.title)}</h2>
            </div>
            <dl>${facts.map(([label, value]) => `<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`).join('')}</dl>
          </div>
        </section>
      </article>`;

    window.NW_WORK = null;
  };

  const script = document.createElement('script');
  script.src = localWorkIds.has(projectId)
    ? workFiles[projectId]
    : `https://9works.kr/assets/js/works/${encodeURIComponent(workFiles[projectId])}?v=20260813-1`;
  script.async = true;
  script.onload = renderWork;
  script.onerror = () => {
    root.innerHTML = `
      <section class="nw-project-missing">
        <div class="shell">
          <p class="eyebrow">PROJECT DATA ERROR</p>
          <h1>${esc(projectMeta.title)}</h1>
          <p>원본 상세 데이터를 불러오지 못했습니다. 라이브 사이트 또는 프로젝트 목록을 이용해주세요.</p>
          <div class="nw-missing-actions">
            <a class="button button-point" href="${esc(projectMeta.url)}" target="_blank" rel="noopener noreferrer">라이브 사이트 보기 ↗</a>
            <a class="button button-ghost" href="./projects.html">프로젝트 목록</a>
          </div>
        </div>
      </section>`;
  };
  document.head.appendChild(script);
})();
