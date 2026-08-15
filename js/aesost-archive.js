(() => {
  'use strict';

  const params = new URLSearchParams(window.location.search);
  if (params.get('id') !== 'aesost') return;

  const pages = [
    { no: '01', group: 'MAIN', title: '메인', url: 'https://aesost.com/index.html', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/99f1d91766496.png' },
    { no: '02', group: 'MAGAZINE', title: '매거진', url: 'https://aesost.com/magazine.html', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/d9369ad0e101b.png' },
    { no: '03', group: 'ARTICLE', title: '아티클', url: 'https://aesost.com/article.html', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/174873802e0ea.png' },
    { no: '04', group: 'COLUMN', title: '칼럼', url: 'https://aesost.com/column.html', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/0deeeb96734fc.png' },
    { no: '05', group: 'OVERSEAS', title: '해외 매거진', url: 'https://aesost.com/overseas-magazine.html', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/5277679826e9f.png' },
    { no: '06', group: 'REFERENCE', title: '해외 레퍼런스', url: 'https://aesost.com/reference.html', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/7cd92627167ec.png' },
    { no: '07', group: 'CONSULTING', title: '커리어 컨설팅', url: 'https://aesost.com/expert-feedback.html', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/98b59677cf0ff.png' },
    { no: '08', group: 'NEWS', title: '뉴스', url: 'https://aesost.com/news.html', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/49ecb1fe8482e.png' }
  ];

  const esc = (value = '') => String(value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;').replace(/'/g, '&#039;');

  const card = (page) => `
    <article class="tne-page-card">
      <div class="tne-screen" aria-label="AESOST ${esc(page.title)} 페이지 미리보기">
        <img src="${esc(page.image)}" alt="AESOST ${esc(page.title)} 페이지" loading="lazy" decoding="async" draggable="false" />
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
    if (!root || root.querySelector('.aesost-archive')) return false;

    const credit = root.querySelector('.nw-project-credit');
    if (!credit) return false;

    const main = find('메인');
    const publishing = [find('매거진'), find('아티클'), find('칼럼')];
    const globalContent = [find('해외 매거진'), find('해외 레퍼런스')];
    const connect = [find('커리어 컨설팅'), find('뉴스')];

    const section = document.createElement('section');
    section.className = 'aesost-archive';
    section.innerHTML = `
      <div class="shell">
        <header class="tne-archive-head">
          <div class="nw-section-label"><span>08</span><p>FULL SITE BUILD</p></div>
          <div>
            <p class="eyebrow">AESOST PLATFORM ARCHIVE</p>
            <h2>매거진과 아티클에서 커리어 컨설팅까지,<br />콘텐츠가 관계로 이어지는 플랫폼을 구축했습니다.</h2>
            <p>매거진, 아티클, 칼럼을 중심으로 전문 콘텐츠를 축적하고 해외 매거진과 레퍼런스로 탐색 범위를 확장했습니다. 이후 커리어 컨설팅과 뉴스까지 연결해 읽고 끝나는 콘텐츠 사이트가 아니라 정보 탐색에서 전문 피드백으로 이어지는 구조를 구성했습니다.</p>
            <div class="tne-archive-stats"><span>8 PAGES</span><span>CONTENT PLATFORM</span><span>GLOBAL REFERENCE</span><span>CAREER CONSULTING</span></div>
          </div>
        </header>

        <section class="tne-group">
          <div class="tne-group-head"><p>01 / MAIN EXPERIENCE</p><h3>콘텐츠와 서비스의 전체 구조를 보여주는 메인 경험</h3></div>
          <div class="tne-grid tne-grid--feature">${card(main)}</div>
        </section>

        <section class="tne-group">
          <div class="tne-group-head"><p>02 / CONTENT PUBLISHING</p><h3>매거진·아티클·칼럼을 목적별 콘텐츠 아카이브로 분리</h3></div>
          <div class="tne-grid tne-grid--three">${publishing.map(card).join('')}</div>
        </section>

        <section class="tne-group">
          <div class="tne-group-head"><p>03 / GLOBAL CONTENT</p><h3>해외 콘텐츠와 레퍼런스를 별도 탐색 경험으로 확장</h3></div>
          <div class="tne-grid">${globalContent.map(card).join('')}</div>
        </section>

        <section class="tne-group">
          <div class="tne-group-head"><p>04 / CONSULTING & NEWS</p><h3>정보 탐색 이후 전문가 피드백과 최신 소식으로 연결</h3></div>
          <div class="tne-grid">${connect.map(card).join('')}</div>
        </section>

        <div class="tne-page-index">
          <div class="tne-page-index-head"><h3>Full Page Archive</h3><span>8 LIVE PAGES</span></div>
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
