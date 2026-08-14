(() => {
  'use strict';

  const params = new URLSearchParams(window.location.search);
  if (params.get('id') !== 'the-petrichor') return;

  const pages = [
    { no: '01', group: 'MAIN', title: '메인', url: 'https://thepetrichor.co.kr/', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/09d332796ff79.png' },
    { no: '02', group: 'BRAND', title: 'About', url: 'https://thepetrichor.co.kr/about', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/0321b29b1a69d.png' },
    { no: '03', group: 'PRODUCT', title: 'Product', url: 'https://thepetrichor.co.kr/product', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/86d0e2ecc05a1.png' },
    { no: '04', group: 'EVENT', title: 'Event', url: 'https://thepetrichor.co.kr/event', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/5326872a4fbad.png' },
    { no: '05', group: 'REVIEW', title: 'Review', url: 'https://thepetrichor.co.kr/review', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/0e6f789171850.png' },
    { no: '06', group: 'JOURNAL', title: 'Journal', url: 'https://thepetrichor.co.kr/journal', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/7d99fa48c3a64.png' },
    { no: '07', group: 'BRAND BOOK', title: 'Brand book', url: 'https://thepetrichor.co.kr/brandbook', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/b335325d6eeab.png' },
    { no: '08', group: 'CONTACT', title: 'Contact us', url: 'https://thepetrichor.co.kr/contact', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/17c28f9bc4423.png' },
    { no: '09', group: 'MEMBERSHIP', title: 'Membership', url: 'https://thepetrichor.co.kr/membership', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/e49297cd748cb.png' },
    { no: '10', group: 'LOGIN', title: '로그인', url: 'https://thepetrichor.co.kr/login', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/eedfb90bbec54.png' }
  ];

  const esc = (value = '') => String(value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');

  const card = (page) => `
    <article class="tne-page-card">
      <div class="tne-screen" aria-label="The Petrichor ${esc(page.title)} 페이지 미리보기">
        <img src="${esc(page.image)}" alt="The Petrichor ${esc(page.title)} 페이지" loading="lazy" decoding="async" draggable="false" />
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
    if (!root || root.querySelector('.petrichor-archive')) return false;

    const credit = root.querySelector('.nw-project-credit');
    if (!credit) return false;

    const main = find('메인');
    const brandProduct = [find('About'), find('Product')];
    const content = [find('Event'), find('Review'), find('Journal')];
    const brandAsset = [find('Brand book')];
    const memberContact = [find('Contact us'), find('Membership'), find('로그인')];

    const section = document.createElement('section');
    section.className = 'petrichor-archive';
    section.innerHTML = `
      <div class="shell">
        <header class="tne-archive-head">
          <div class="nw-section-label"><span>08</span><p>FULL SITE BUILD</p></div>
          <div>
            <p class="eyebrow">THE PETRICHOR WEBSITE ARCHIVE</p>
            <h2>브랜드 이야기와 상품, 콘텐츠, 멤버십을<br />하나의 브랜드 경험으로 연결했습니다.</h2>
            <p>About과 Product를 중심으로 Event, Review, Journal, Brand book까지 브랜드 콘텐츠를 확장하고, Contact, Membership, Login까지 실제 운영과 회원 경험으로 이어지는 10개 페이지 구조를 구축했습니다. 화면 이미지는 포트폴리오 안에서만 확인하며, 실제 페이지 이동은 LIVE PAGE 링크로만 분리했습니다.</p>
            <div class="tne-archive-stats"><span>10 PAGES</span><span>BRAND STORY</span><span>COMMERCE</span><span>MEMBERSHIP</span></div>
          </div>
        </header>

        <section class="tne-group">
          <div class="tne-group-head"><p>01 / MAIN EXPERIENCE</p><h3>브랜드와 제품의 첫 인상을 한 화면에 집중</h3></div>
          <div class="tne-grid tne-grid--feature">${card(main)}</div>
        </section>

        <section class="tne-group">
          <div class="tne-group-head"><p>02 / BRAND & PRODUCT</p><h3>브랜드 스토리에서 상품 경험으로 자연스럽게 연결</h3></div>
          <div class="tne-grid">${brandProduct.map(card).join('')}</div>
        </section>

        <section class="tne-group">
          <div class="tne-group-head"><p>03 / CAMPAIGN & CONTENT</p><h3>이벤트·리뷰·저널을 지속 가능한 브랜드 콘텐츠로 구성</h3></div>
          <div class="tne-grid tne-grid--three">${content.map(card).join('')}</div>
        </section>

        <section class="tne-group">
          <div class="tne-group-head"><p>04 / BRAND ASSET</p><h3>브랜드의 언어와 이미지를 Brand book으로 정리</h3></div>
          <div class="tne-grid tne-grid--feature">${brandAsset.map(card).join('')}</div>
        </section>

        <section class="tne-group">
          <div class="tne-group-head"><p>05 / CONTACT & MEMBERSHIP</p><h3>문의에서 회원가입과 로그인까지 관계를 이어가는 구조</h3></div>
          <div class="tne-grid tne-grid--three">${memberContact.map(card).join('')}</div>
        </section>

        <div class="tne-page-index">
          <div class="tne-page-index-head"><h3>Full Page Archive</h3><span>10 LIVE PAGES</span></div>
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
