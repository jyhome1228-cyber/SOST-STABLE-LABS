(() => {
  'use strict';

  const params = new URLSearchParams(window.location.search);
  if (params.get('id') !== 'relim') return;

  const pages = [
    { no: '01', group: 'MAIN', title: '메인', url: 'https://re-lim.com/', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/4323966e9ff6f.png' },
    { no: '02', group: 'BRAND', title: '리림 소개', url: 'https://re-lim.com/about.html', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/20976643da71e.png' },
    { no: '03', group: 'SPACE', title: '공간 안내', url: 'https://re-lim.com/space.html', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/8a916d71e361d.png' },
    { no: '04', group: 'GUIDE', title: '이용 안내', url: 'https://re-lim.com/guide.html', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/9ba902e84dd05.png' },
    { no: '05', group: 'RESERVATION', title: '예약 안내', url: 'https://re-lim.com/reservation.html', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/56ea19101640e.png' },
    { no: '06', group: 'GALLERY', title: '갤러리', url: 'https://re-lim.com/gallery.html', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/db6fa429757c1.png' },
    { no: '07', group: 'SUPPORT', title: '자주 묻는 질문', url: 'https://re-lim.com/faq.html', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/8a66c418c1928.png' },
    { no: '08', group: 'COMMUNITY', title: '리뷰', url: 'https://re-lim.com/reviews.html', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/b2d2326b980b5.png' },
    { no: '09', group: 'CONTACT', title: '문의하기', url: 'https://re-lim.com/inquiry.html', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/ed9d27747fd5a.png' },
    { no: '10', group: 'LOCATION', title: '오시는 길', url: 'https://re-lim.com/location.html', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/2561a994ab8a2.png' }
  ];

  const esc = (value = '') => String(value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');

  const card = (page) => `
    <article class="tne-page-card">
      <div class="tne-screen" aria-label="RE:LIM ${esc(page.title)} 페이지 미리보기">
        <img src="${esc(page.image)}" alt="RE:LIM ${esc(page.title)} 페이지" loading="lazy" decoding="async" draggable="false" />
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
    if (!root || root.querySelector('.relim-archive')) return false;

    const credit = root.querySelector('.nw-project-credit');
    if (!credit) return false;

    const main = find('메인');
    const brandSpace = [find('리림 소개'), find('공간 안내')];
    const useReservation = [find('이용 안내'), find('예약 안내')];
    const experience = [find('갤러리'), find('자주 묻는 질문'), find('리뷰')];
    const contact = [find('문의하기'), find('오시는 길')];

    const section = document.createElement('section');
    section.className = 'relim-archive';
    section.innerHTML = `
      <div class="shell">
        <header class="tne-archive-head">
          <div class="nw-section-label"><span>08</span><p>FULL SITE BUILD</p></div>
          <div>
            <p class="eyebrow">RE:LIM WEBSITE ARCHIVE</p>
            <h2>공간 소개부터 예약과 후기까지,<br />방문 전 경험 전체를 하나의 사이트로 연결했습니다.</h2>
            <p>브랜드 소개와 공간 안내, 이용 및 예약 정보, 갤러리, FAQ, 리뷰, 문의와 오시는 길까지 실제 방문자가 필요한 정보를 흐름에 맞춰 구성했습니다. 화면 이미지는 포트폴리오 안에서만 확인하고, 실제 페이지 이동은 LIVE PAGE 링크로 분리했습니다.</p>
            <div class="tne-archive-stats"><span>10 PAGES</span><span>SPACE GUIDE</span><span>RESERVATION FLOW</span><span>COMMUNITY</span></div>
          </div>
        </header>

        <section class="tne-group">
          <div class="tne-group-head"><p>01 / MAIN EXPERIENCE</p><h3>리림의 첫 인상과 핵심 이용 정보를 한 화면에 정리</h3></div>
          <div class="tne-grid tne-grid--feature">${card(main)}</div>
        </section>

        <section class="tne-group">
          <div class="tne-group-head"><p>02 / BRAND & SPACE</p><h3>브랜드의 성격과 실제 공간을 이해하는 구조</h3></div>
          <div class="tne-grid">${brandSpace.map(card).join('')}</div>
        </section>

        <section class="tne-group">
          <div class="tne-group-head"><p>03 / GUIDE & RESERVATION</p><h3>이용 방법에서 예약 전 확인사항까지 자연스럽게 연결</h3></div>
          <div class="tne-grid">${useReservation.map(card).join('')}</div>
        </section>

        <section class="tne-group">
          <div class="tne-group-head"><p>04 / EXPERIENCE & COMMUNITY</p><h3>공간의 분위기와 실제 이용 경험을 콘텐츠로 확장</h3></div>
          <div class="tne-grid tne-grid--three">${experience.map(card).join('')}</div>
        </section>

        <section class="tne-group">
          <div class="tne-group-head"><p>05 / CONTACT & LOCATION</p><h3>문의와 방문까지 마지막 행동으로 이어지는 정보 구조</h3></div>
          <div class="tne-grid">${contact.map(card).join('')}</div>
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
