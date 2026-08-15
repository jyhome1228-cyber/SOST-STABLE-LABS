(() => {
  'use strict';

  const params = new URLSearchParams(window.location.search);
  if (params.get('id') !== 'pentagon-law-office-corporate-center') return;

  const version = '20260815-2';
  const base = './assets/projects/pentagon';

  /*
    PTG LAW archive rule
    - Only show views that were visually confirmed from the user's supplied screens.
    - Do not surface automated captures from guessed / nested routes.
    - Inquiry Assistant remains documented in the system case above, but is not shown
      as a screenshot until an approved capture is supplied.
  */
  const pages = [
    {
      no: '01',
      group: 'MAIN',
      title: 'Main Experience',
      url: 'https://www.ptglaw.co.kr/',
      image: `${base}/desktop-main.jpg?v=${version}`
    },
    {
      no: '02',
      group: 'PROFESSIONAL',
      title: '구성원 소개',
      url: 'https://www.ptglaw.co.kr/42',
      image: `${base}/view-member.jpg?v=${version}`
    },
    {
      no: '03',
      group: 'CASE',
      title: '업무사례',
      url: 'https://www.ptglaw.co.kr/38',
      image: `${base}/view-cases.jpg?v=${version}`
    }
  ];

  const esc = (value = '') => String(value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;').replace(/'/g, '&#039;');

  const card = (page) => `
    <article class="tne-page-card">
      <div class="tne-screen" aria-label="PTG LAW ${esc(page.title)} 페이지 미리보기">
        <img src="${esc(page.image)}" alt="PTG LAW ${esc(page.title)} 화면" loading="lazy" decoding="async" draggable="false" />
      </div>
      <div class="tne-page-meta">
        <div>
          <small>${esc(page.group)} · ${esc(page.no)}</small>
          <h4>${esc(page.title)}</h4>
        </div>
        <div class="tne-page-actions">
          <a href="${esc(page.url)}" target="_blank" rel="noopener noreferrer">LIVE PAGE ↗</a>
        </div>
      </div>
    </article>`;

  const archiveCard = (page) => `
    <article class="tne-page-row">
      <div class="tne-page-row-top"><span>${esc(page.no)}</span><small>${esc(page.group)}</small></div>
      <strong>${esc(page.title)}</strong>
      <code>${esc(page.url.replace('https://', ''))}</code>
      <a href="${esc(page.url)}" target="_blank" rel="noopener noreferrer">LIVE PAGE ↗</a>
    </article>`;

  const render = () => {
    const root = document.querySelector('#project-detail .nw-project-case');
    if (!root || root.querySelector('.ptg-archive')) return false;

    const credit = root.querySelector('.nw-project-credit');
    if (!credit) return false;

    const section = document.createElement('section');
    section.className = 'tne-archive ptg-archive';
    section.innerHTML = `
      <div class="shell">
        <header class="tne-archive-head">
          <div class="nw-section-label"><span>09</span><p>SELECTED SITE VIEWS</p></div>
          <div>
            <p class="eyebrow">PTG LAW WEBSITE SYSTEM</p>
            <h2>전문가와 업무사례가 상담으로 이어지는<br />핵심 화면만 선별했습니다.</h2>
            <p>이미지 아카이브는 확인된 PTG LAW 본사이트 화면만 사용합니다. 구성원과 업무사례를 연결하는 구조, 문의 어시스턴트와 상담 흐름은 상단의 SYSTEM CASE에서 기능과 데이터 플로우 중심으로 설명하고, 확인되지 않은 하위 페이지 캡처는 노출하지 않습니다.</p>
            <div class="tne-archive-stats"><span>IMWEB + CODE</span><span>PROFESSIONALS</span><span>CASE ARCHIVE</span><span>INQUIRY UX</span></div>
          </div>
        </header>

        <section class="tne-group">
          <div class="tne-group-head"><p>01 / MAIN EXPERIENCE</p><h3>펜타곤의 통합 전문성을 전달하는 메인 경험</h3></div>
          <div class="tne-grid tne-grid--feature">${card(pages[0])}</div>
        </section>

        <section class="tne-group">
          <div class="tne-group-head"><p>02 / PROFESSIONAL & CASE</p><h3>헤더 메뉴의 구성원 소개와 업무사례를 중심으로 전문성을 증명</h3></div>
          <div class="tne-grid">${card(pages[1])}${card(pages[2])}</div>
        </section>

        <div class="tne-page-index">
          <div class="tne-page-index-head"><h3>Selected Page Archive</h3><span>3 APPROVED VIEWS · LIVE LINKS</span></div>
          <div class="tne-page-list">${pages.map(archiveCard).join('')}</div>
        </div>
      </div>`;

    credit.before(section);
    return true;
  };

  if (render()) return;
  const observer = new MutationObserver(() => {
    if (render()) observer.disconnect();
  });
  observer.observe(document.querySelector('#project-detail') || document.body, { childList: true, subtree: true });
  window.setTimeout(() => observer.disconnect(), 12000);
})();
