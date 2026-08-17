(() => {
  'use strict';

  const params = new URLSearchParams(window.location.search);
  if (params.get('id') !== 'terracle') return;

  const version = '20260817-1';

  const pages = [
    { no: '01', group: 'MAIN', title: 'Main', url: 'https://kr.terracle.im/?redirect=no', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/39da9ba2da90c.png' },
    { no: '02', group: 'COMPANY', title: 'About Us', url: 'https://kr.terracle.im/aboutus', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/067c426a04189.png' },
    { no: '03', group: 'TECHNOLOGY', title: 'Technology', url: 'https://kr.terracle.im/technology', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/4bb8ea7023e5f.png' },
    { no: '04', group: 'PRODUCT', title: 'Product Information', url: 'https://kr.terracle.im/RecycledMonomer', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/7b58e00a8f68b.png' },
    { no: '05', group: 'PRODUCT', title: 'BlackTiO₂', url: 'https://kr.terracle.im/BlackTiO', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/c855c90ba6e10.png' },
    { no: '06', group: 'SERVICE', title: 'Service', url: 'https://kr.terracle.im/service', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/1ba5729ad987a.png' },
    { no: '07', group: 'CONTENT', title: 'News', url: 'https://kr.terracle.im/news', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/a4680478bd0c1.png' },
    { no: '08', group: 'CONTACT', title: 'Contact us', url: 'https://kr.terracle.im/contactus', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/d7128af497361.png' },
    { no: '09', group: 'CAREER', title: 'Recruit', url: 'https://kr.terracle.im/recruit', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/aa089317dac06.png' },
    { no: '10', group: 'MEETING', title: 'Online Meeting', url: 'https://kr.terracle.im/OnlineMeeting', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/c967fa087a15d.png' }
  ];

  const esc = (value = '') => String(value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;').replace(/'/g, '&#039;');

  const card = (page) => `
    <article class="tne-page-card">
      <div class="tne-screen" aria-label="TERRACLE ${esc(page.title)} 페이지 미리보기">
        <img src="${esc(page.image)}?v=${version}" alt="TERRACLE ${esc(page.title)} 화면" loading="lazy" decoding="async" draggable="false" />
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
      <code>${esc(page.url.replace(/^https?:\/\//, ''))}</code>
      <a href="${esc(page.url)}" target="_blank" rel="noopener noreferrer">LIVE PAGE ↗</a>
    </article>`;

  const render = () => {
    const root = document.querySelector('#project-detail .nw-project-case');
    if (!root || root.querySelector('.terracle-archive')) return false;

    const credit = root.querySelector('.nw-project-credit');
    if (!credit) return false;

    const section = document.createElement('section');
    section.className = 'tne-archive terracle-archive';
    section.innerHTML = `
      <div class="shell">
        <header class="tne-archive-head">
          <div class="nw-section-label"><span>09</span><p>SELECTED SITE VIEWS</p></div>
          <div>
            <p class="eyebrow">TERRACLE WEBSITE SYSTEM</p>
            <h2>기업의 기술과 제품을 이해하고<br />비즈니스 접점까지 이어지는 전체 화면입니다.</h2>
            <p>메인과 기업 소개를 시작으로 Technology, Product, Service, News, Recruit, Contact와 Online Meeting까지 실제 사이트의 주요 화면을 한 번에 확인할 수 있도록 정리했습니다.</p>
            <div class="tne-archive-stats"><span>IMWEB + CODE</span><span>TECHNOLOGY</span><span>PRODUCT</span><span>10 SITE VIEWS</span></div>
          </div>
        </header>

        <section class="tne-group">
          <div class="tne-group-head"><p>01 / MAIN EXPERIENCE</p><h3>기술 기업의 방향과 인상을 전달하는 메인 화면</h3></div>
          <div class="tne-grid tne-grid--feature">${card(pages[0])}</div>
        </section>

        <section class="tne-group">
          <div class="tne-group-head"><p>02 / COMPANY & TECHNOLOGY</p><h3>회사와 핵심 기술을 순서대로 이해하는 구조</h3></div>
          <div class="tne-grid">${card(pages[1])}${card(pages[2])}</div>
        </section>

        <section class="tne-group">
          <div class="tne-group-head"><p>03 / PRODUCT & SERVICE</p><h3>기술의 결과를 제품과 서비스 정보로 연결</h3></div>
          <div class="tne-grid">${card(pages[3])}${card(pages[4])}${card(pages[5])}</div>
        </section>

        <section class="tne-group">
          <div class="tne-group-head"><p>04 / CONTENT & CONTACT</p><h3>기업 소식, 채용, 문의와 미팅까지 실제 접점으로 확장</h3></div>
          <div class="tne-grid">${card(pages[6])}${card(pages[7])}${card(pages[8])}${card(pages[9])}</div>
        </section>

        <div class="tne-page-index">
          <div class="tne-page-index-head"><h3>Terracle Page Archive</h3><span>10 APPROVED VIEWS · LIVE LINKS</span></div>
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
