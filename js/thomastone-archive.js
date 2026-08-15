(() => {
  'use strict';

  const params = new URLSearchParams(window.location.search);
  if (params.get('id') !== 'thomastone') return;

  const pages = [
    { no: '01', group: 'MAIN', title: '메인 페이지', url: 'https://thomastone.co.kr/', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/149e984fc458e.png' },
    { no: '02', group: 'ABOUT', title: 'About', url: 'https://thomastone.co.kr/20', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/3992d88a505dd.png' },
    { no: '03', group: 'SERVICE', title: 'Service', url: 'https://thomastone.co.kr/Products', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/9b6d483a99452.png' },
    { no: '04', group: 'TECHNOLOGY', title: 'Technology', url: 'https://thomastone.co.kr/27', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/522f3fdc98d80.png' },
    { no: '05', group: 'NEWS', title: 'News', url: 'https://thomastone.co.kr/22', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/917c74662560d.png' },
    { no: '06', group: 'CONTACT', title: 'Contact us', url: 'https://thomastone.co.kr/Contactus', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/a6905637bb081.png' }
  ];

  const esc = (value = '') => String(value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;').replace(/'/g, '&#039;');

  const card = (page) => `
    <article class="tne-page-card">
      <div class="tne-screen" aria-label="THOMASTONE ${esc(page.title)} 페이지 미리보기">
        <img src="${esc(page.image)}" alt="THOMASTONE ${esc(page.title)} 페이지" loading="lazy" decoding="async" draggable="false" />
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

  const find = (title) => pages.find((page) => page.title === title);

  const render = () => {
    const root = document.querySelector('#project-detail .nw-project-case');
    if (!root || root.querySelector('.thomastone-archive')) return false;

    const credit = root.querySelector('.nw-project-credit');
    if (!credit) return false;

    const hero = root.querySelector('.nw-project-hero-media img');
    if (hero) {
      hero.src = pages[0].image;
      hero.alt = 'THOMASTONE main page';
    }

    const main = find('메인 페이지');
    const companyService = [find('About'), find('Service')];
    const techNews = [find('Technology'), find('News')];
    const contact = find('Contact us');

    const section = document.createElement('section');
    section.className = 'thomastone-archive';
    section.innerHTML = `
      <div class="shell">
        <header class="tne-archive-head">
          <div class="nw-section-label"><span>08</span><p>FULL SITE BUILD</p></div>
          <div>
            <p class="eyebrow">THOMASTONE WEBSITE ARCHIVE</p>
            <h2>기업 소개부터 기술과 뉴스까지,<br />헬스케어 기업의 신뢰 구조를 하나의 웹사이트로 연결했습니다.</h2>
            <p>About, Service, Technology, News, Contact까지 기업이 전달해야 할 핵심 정보를 목적별로 정리했습니다. 특히 기술 중심의 기업 특성을 고려해 서비스와 기술 정보를 명확히 분리하고, 뉴스 업데이트를 통해 기업의 활동과 신뢰도를 지속적으로 축적할 수 있는 운영형 구조로 구성했습니다.</p>
            <div class="tne-archive-stats"><span>6 PAGES</span><span>CORPORATE WEBSITE</span><span>HEALTHCARE</span><span>DYNAMIC NEWS</span></div>
          </div>
        </header>

        <section class="tne-group">
          <div class="tne-group-head"><p>01 / MAIN EXPERIENCE</p><h3>기업의 기술력과 방향성을 가장 먼저 전달하는 메인 화면</h3></div>
          <div class="tne-grid tne-grid--feature">${card(main)}</div>
        </section>

        <section class="tne-group">
          <div class="tne-group-head"><p>02 / COMPANY & SERVICE</p><h3>기업 소개와 제공 서비스를 명확한 정보 위계로 정리</h3></div>
          <div class="tne-grid">${companyService.map(card).join('')}</div>
        </section>

        <section class="tne-group">
          <div class="tne-group-head"><p>03 / TECHNOLOGY & NEWS</p><h3>핵심 기술과 최신 기업 활동을 지속적으로 전달하는 구조</h3></div>
          <div class="tne-grid">${techNews.map(card).join('')}</div>
        </section>

        <section class="tne-group">
          <div class="tne-group-head"><p>04 / CONTACT</p><h3>기업 정보 탐색에서 실제 문의까지 자연스럽게 연결</h3></div>
          <div class="tne-grid tne-grid--feature">${card(contact)}</div>
        </section>

        <div class="tne-page-index">
          <div class="tne-page-index-head"><h3>Full Page Archive</h3><span>6 LIVE PAGES</span></div>
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
  window.setTimeout(() => observer.disconnect(), 10000);
})();
