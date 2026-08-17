(() => {
  'use strict';

  const params = new URLSearchParams(window.location.search);
  if (params.get('id') !== 'pentagon-law-office-corporate-center') return;

  const pages = [
    { no: '01', section: 'INTRO', group: 'INTRO', title: '메인', url: 'https://www.ptglaw.co.kr/', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/b97224d5e769a.png' },
    { no: '02', section: 'INTRO', group: 'INTRO', title: '펜타곤 소개 · 인삿말', url: 'https://www.ptglaw.co.kr/105', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/fbe0c325466d5.png' },
    { no: '03', section: 'INTRO', group: 'INTRO', title: '펜타곤 소개 · 펜타곤 소식', url: 'https://www.ptglaw.co.kr/70', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/e070b3bc892d6.png' },
    { no: '04', section: 'INTRO', group: 'INTRO', title: '펜타곤 소개 · 오시는 길', url: 'https://www.ptglaw.co.kr/79', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/8c4d7fba3113c.png' },

    { no: '05', section: 'PRACTICE', group: 'PRACTICE', title: '업무분야', url: 'https://www.ptglaw.co.kr/107', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/5c9d59d7686c0.png' },
    { no: '06', section: 'PRACTICE', group: 'PRACTICE', title: '업무분야 · 법률', url: 'https://www.ptglaw.co.kr/55', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/e07ef7c2a6558.png' },
    { no: '07', section: 'PRACTICE', group: 'PRACTICE', title: '업무분야 · 세무', url: 'https://www.ptglaw.co.kr/56', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/312bffbc1dfbb.png' },
    { no: '08', section: 'PRACTICE', group: 'PRACTICE', title: '업무분야 · IP', url: 'https://www.ptglaw.co.kr/57', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/3d39444cd0c19.png' },
    { no: '09', section: 'PRACTICE', group: 'PRACTICE', title: '업무분야 · 추심', url: 'https://www.ptglaw.co.kr/113', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/cdb910803b27f.png' },
    { no: '10', section: 'PRACTICE', group: 'PRACTICE', title: '업무분야 · 등기', url: 'https://www.ptglaw.co.kr/112', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/65c9a5df399dc.png' },

    { no: '11', section: 'PROFESSIONAL', group: 'PROFESSIONAL', title: '구성원 소개', url: 'https://www.ptglaw.co.kr/98', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/0e280d510e0ba.png' },
    { no: '12', section: 'PROFESSIONAL', group: 'PROFESSIONAL', title: '채용현 대표변호사', url: 'https://www.ptglaw.co.kr/72', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/949e892cae27c.png' },
    { no: '13', section: 'PROFESSIONAL', group: 'PROFESSIONAL', title: '강건 파트너변호사', url: 'https://www.ptglaw.co.kr/73', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/63456995af5c0.png' },
    { no: '14', section: 'PROFESSIONAL', group: 'PROFESSIONAL', title: '전승환 파트너변호사', url: 'https://www.ptglaw.co.kr/150', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/15702b44ce63c.png' },
    { no: '15', section: 'PROFESSIONAL', group: 'PROFESSIONAL', title: '김지수 세무사', url: 'https://www.ptglaw.co.kr/74', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/154725f3d226a.png' },

    { no: '16', section: 'SERVICE', group: 'CASE · SERVICE', title: '업무사례', url: 'https://www.ptglaw.co.kr/60', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/65324d69f0634.png' },
    { no: '17', section: 'SERVICE', group: 'CASE · SERVICE', title: '상속 원스탑 서비스', url: 'https://www.ptglaw.co.kr/149', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/49b89de391bd5.png' },
    { no: '18', section: 'SERVICE', group: 'CASE · SERVICE', title: '법인설립지원센터', url: 'https://www.ptglaw.co.kr/center', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/2bd3af4ce27b9.png' },
    { no: '19', section: 'SERVICE', group: 'CASE · SERVICE', title: '문의하기', url: 'https://www.ptglaw.co.kr/contact', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/9711d15e5aa63.png' }
  ];

  const groups = [
    { key: 'INTRO', no: '01', label: 'INTRODUCTION', title: '브랜드와 조직을 이해하는 기본 소개 화면' },
    { key: 'PRACTICE', no: '02', label: 'PRACTICE AREAS', title: '법률·세무·IP·추심·등기를 분야별로 구체화한 전문영역' },
    { key: 'PROFESSIONAL', no: '03', label: 'PROFESSIONALS', title: '구성원과 개별 전문가의 전문성을 연결하는 프로필 구조' },
    { key: 'SERVICE', no: '04', label: 'CASE · SERVICE · CONTACT', title: '업무사례와 특화 서비스에서 실제 문의까지 이어지는 전환 흐름' }
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
        <div class="tne-page-actions"><a href="${esc(page.url)}" target="_blank" rel="noopener noreferrer">LIVE PAGE ↗</a></div>
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
          <div class="nw-section-label"><span>09</span><p>FULL SITE ARCHIVE</p></div>
          <div>
            <p class="eyebrow">PTG LAW WEBSITE SYSTEM</p>
            <h2>전문영역과 전문가, 업무사례와 문의까지<br />19개 주요 화면을 전체 아카이브로 구성했습니다.</h2>
            <p>사용자가 제공한 실제 PTG LAW 사이트 화면을 기준으로 소개, 업무분야, 구성원, 업무사례·특화서비스·문의 흐름을 모두 반영했습니다. 각 화면은 실제 페이지로 바로 이동할 수 있습니다.</p>
            <div class="tne-archive-stats"><span>19 VIEWS</span><span>IMWEB + CODE</span><span>PROFESSIONALS</span><span>INQUIRY UX</span></div>
          </div>
        </header>

        ${groups.map((group) => {
          const items = pages.filter((page) => page.section === group.key);
          return `
            <section class="tne-group">
              <div class="tne-group-head"><p>${esc(group.no)} / ${esc(group.label)}</p><h3>${esc(group.title)}</h3></div>
              <div class="tne-grid">${items.map(card).join('')}</div>
            </section>`;
        }).join('')}

        <div class="tne-page-index">
          <div class="tne-page-index-head"><h3>Full Page Archive</h3><span>${pages.length} VIEWS · LIVE LINKS</span></div>
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
