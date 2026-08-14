(() => {
  'use strict';

  const params = new URLSearchParams(window.location.search);
  if (params.get('id') !== 'pentagon-law-office-corporate-center') return;

  const version = '20260815-1';
  const base = './assets/projects/pentagon';
  const pages = [
    { no: '01', group: 'MAIN', title: 'Main Experience', url: 'https://www.ptglaw.co.kr/', image: `${base}/desktop-main.jpg?v=${version}` },
    { no: '02', group: 'ABOUT', title: 'Integrated Expertise', url: 'https://www.ptglaw.co.kr/About', image: `${base}/view-about.jpg?v=${version}` },
    { no: '03', group: 'CONSULT', title: 'Consultation & Inquiry', url: 'https://www.ptglaw.co.kr/Inquire', image: `${base}/view-inquire.jpg?v=${version}` },
    { no: '04', group: 'CASE', title: 'Practice Case Archive', url: 'https://www.ptglaw.co.kr/38', image: `${base}/view-cases.jpg?v=${version}` },
    { no: '05', group: 'PROFESSIONAL', title: 'Representative Professional', url: 'https://www.ptglaw.co.kr/42', image: `${base}/view-member.jpg?v=${version}` },
    { no: '06', group: 'PROFESSIONAL', title: 'Partner Professional', url: 'https://www.ptglaw.co.kr/73', image: `${base}/view-partner.jpg?v=${version}` },
    { no: '07', group: 'CENTER', title: 'Corporate Establishment Center', url: 'https://www.ptglaw.co.kr/center', image: `${base}/view-center.jpg?v=${version}` }
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
          <div class="nw-section-label"><span>09</span><p>FULL SITE BUILD</p></div>
          <div>
            <p class="eyebrow">PTG LAW WEBSITE SYSTEM</p>
            <h2>전문가와 업무사례, 상담 경험을<br />하나의 구조로 연결했습니다.</h2>
            <p>다섯 핵심 전문영역을 중심으로 구성원 프로필과 관련 업무분야, 실제 업무사례를 같은 탐색 구조로 연결했습니다. 문의 단계에서는 고객이 자신의 상황을 정리할 수 있는 상담 어시스턴트 흐름을 더해, 정보 확인에서 담당 전문가 상담까지 자연스럽게 이어지도록 구성했습니다.</p>
            <div class="tne-archive-stats"><span>IMWEB + CODE</span><span>PROFESSIONALS</span><span>CASE ARCHIVE</span><span>INQUIRY ASSISTANT</span></div>
          </div>
        </header>

        <section class="tne-group">
          <div class="tne-group-head"><p>01 / MAIN EXPERIENCE</p><h3>다섯 전문영역을 하나의 컨설팅 플랫폼으로 전달</h3></div>
          <div class="tne-grid tne-grid--feature">${card(pages[0])}</div>
        </section>

        <section class="tne-group">
          <div class="tne-group-head"><p>02 / BRAND & EXPERTISE</p><h3>법률·세무·IP·등기·추심의 전문성을 통합된 브랜드 구조로 정리</h3></div>
          <div class="tne-grid">${card(pages[1])}${card(pages[6])}</div>
        </section>

        <section class="tne-group">
          <div class="tne-group-head"><p>03 / PROFESSIONAL ↔ CASE</p><h3>구성원의 관련 업무분야와 실제 업무사례를 같은 탐색 체계로 연결</h3></div>
          <div class="tne-grid tne-grid--three">${card(pages[4])}${card(pages[5])}${card(pages[3])}</div>
        </section>

        <section class="tne-group">
          <div class="tne-group-head"><p>04 / CONSULTATION UX</p><h3>문의 내용을 정리하고 담당 전문가 상담으로 이어지는 전환 구조</h3></div>
          <div class="tne-grid tne-grid--feature">${card(pages[2])}</div>
        </section>

        <div class="tne-page-index">
          <div class="tne-page-index-head"><h3>Experience Archive</h3><span>7 KEY VIEWS · LIVE LINKS</span></div>
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
