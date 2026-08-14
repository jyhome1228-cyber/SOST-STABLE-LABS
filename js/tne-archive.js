(() => {
  'use strict';

  const params = new URLSearchParams(window.location.search);
  if (params.get('id') !== 'tne-epc') return;

  const pages = [
    { no: '01', group: 'MAIN', title: '메인', url: 'https://tneepc.com/', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/3fb05d7acdde9.png' },
    { no: '02', group: 'COMPANY', title: '회사소개', url: 'https://tneepc.com/11', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/78c4dcffe6a34.png' },
    { no: '03', group: 'COMPANY', title: '조직구성', url: 'https://tneepc.com/20', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/ace28fc60a3d7.png' },
    { no: '04', group: 'COMPANY', title: '수상·인증', url: 'https://tneepc.com/21', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/0a9f57d641c3a.png' },
    { no: '05', group: 'COMPANY', title: '주요연혁', url: 'https://tneepc.com/19', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/c36c4b71c063a.png' },
    { no: '06', group: 'COMPANY', title: '협약체결', url: 'https://tneepc.com/17', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/bbff6a0213c64.png' },
    { no: '07', group: 'COMPANY', title: '파트너사', url: 'https://tneepc.com/22', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/9a813cfeac345.png' },
    { no: '08', group: 'BUSINESS', title: '사업과정', url: 'https://tneepc.com/18', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/f60c50cc56a70.png' },
    { no: '09', group: 'PERFORMANCE', title: '운영실적', url: 'https://tneepc.com/25', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/63f60be342bc3.png' },
    { no: '10', group: 'PERFORMANCE', title: '전국현황', url: 'https://tneepc.com/24', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/c088094896609.png' },
    { no: '11', group: 'CONTACT', title: '회사위치', url: 'https://tneepc.com/contact', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/c6def72f6a202.png' }
  ];

  const esc = (value = '') => String(value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');

  const card = (page) => `
    <article class="tne-page-card">
      <a class="tne-screen" href="${esc(page.image)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(page.title)} 전체 페이지 캡처 보기">
        <img src="${esc(page.image)}" alt="TNE ${esc(page.title)} 페이지" loading="lazy" decoding="async" />
      </a>
      <div class="tne-page-meta">
        <div>
          <small>${esc(page.group)} · ${esc(page.no)}</small>
          <h4>${esc(page.title)}</h4>
        </div>
        <div class="tne-page-actions">
          <a href="${esc(page.image)}" target="_blank" rel="noopener noreferrer">FULL CAPTURE ↗</a>
          <a href="${esc(page.url)}" target="_blank" rel="noopener noreferrer">LIVE PAGE ↗</a>
        </div>
      </div>
    </article>`;

  const find = (title) => pages.find((page) => page.title === title);

  const render = () => {
    const root = document.querySelector('#project-detail .nw-project-case');
    if (!root || root.querySelector('.tne-archive')) return false;

    const credit = root.querySelector('.nw-project-credit');
    if (!credit) return false;

    const main = find('메인');
    const company = [find('회사소개'), find('조직구성')];
    const corporate = [find('수상·인증'), find('주요연혁'), find('협약체결'), find('파트너사')];
    const business = [find('사업과정'), find('운영실적'), find('전국현황')];
    const contact = find('회사위치');

    const section = document.createElement('section');
    section.className = 'tne-archive';
    section.innerHTML = `
      <div class="shell">
        <header class="tne-archive-head">
          <div class="nw-section-label"><span>08</span><p>FULL SITE BUILD</p></div>
          <div>
            <p class="eyebrow">TNE WEBSITE ARCHIVE</p>
            <h2>한 개의 화면이 아니라,<br />기업 사이트 전체 구조를 구축했습니다.</h2>
            <p>회사 소개부터 조직, 연혁, 인증, 협약과 파트너 정보, 사업과정, 운영실적과 전국 현황까지 실제 기업 운영에 필요한 정보를 하나의 웹 구조로 정리했습니다. 각 화면은 라이브 페이지와 전체 캡처를 함께 확인할 수 있습니다.</p>
            <div class="tne-archive-stats"><span>11 PAGES</span><span>COMPANY ARCHIVE</span><span>BUSINESS DATA</span><span>RESPONSIVE WEB</span></div>
          </div>
        </header>

        <section class="tne-group">
          <div class="tne-group-head"><p>01 / MAIN EXPERIENCE</p><h3>기업의 첫 인상을 만드는 메인 화면</h3></div>
          <div class="tne-grid tne-grid--feature">${card(main)}</div>
        </section>

        <section class="tne-group">
          <div class="tne-group-head"><p>02 / COMPANY STRUCTURE</p><h3>회사와 조직 정보를 명확하게 전달하는 구조</h3></div>
          <div class="tne-grid">${company.map(card).join('')}</div>
        </section>

        <section class="tne-group">
          <div class="tne-group-head"><p>03 / CORPORATE ARCHIVE</p><h3>연혁·인증·협약·파트너 정보를 하나의 기업 아카이브로</h3></div>
          <div class="tne-grid">${corporate.map(card).join('')}</div>
        </section>

        <section class="tne-group">
          <div class="tne-group-head"><p>04 / BUSINESS & PERFORMANCE</p><h3>사업 과정과 실제 운영 데이터를 시각적으로 정리했습니다.</h3></div>
          <div class="tne-grid tne-grid--three">${business.map(card).join('')}</div>
        </section>

        <section class="tne-group">
          <div class="tne-group-head"><p>05 / CONTACT</p><h3>기업 정보의 마지막 접점까지 일관된 경험으로 연결</h3></div>
          <div class="tne-grid tne-grid--feature">${card(contact)}</div>
        </section>

        <div class="tne-page-index">
          <div class="tne-page-index-head"><h3>Full Page Archive</h3><span>11 LIVE PAGES / FULL CAPTURES</span></div>
          <div class="tne-page-list">
            ${pages.map((page) => `
              <div class="tne-page-row">
                <span>${esc(page.no)}</span><strong>${esc(page.title)}</strong><code>${esc(page.url.replace('https://', ''))}</code>
                <a href="${esc(page.url)}" target="_blank" rel="noopener noreferrer">VIEW ↗</a>
              </div>`).join('')}
          </div>
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
