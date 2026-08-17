(() => {
  'use strict';

  const params = new URLSearchParams(window.location.search);
  if (params.get('id') !== 'taepyeong-paper') return;

  const pages = [
    { no: '01', section: 'COMPANY', group: 'COMPANY', title: '개요', url: 'http://tp1977.com/company/', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/e2bdad6d55a98.png' },
    { no: '02', section: 'COMPANY', group: 'COMPANY', title: 'CEO 인사말', url: 'http://tp1977.com/company/ceo/', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/92e3b6be907c4.png' },
    { no: '03', section: 'COMPANY', group: 'COMPANY', title: '태평제지 스토리', url: 'http://tp1977.com/company/story/', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/d9a50258b5fbf.png' },
    { no: '04', section: 'COMPANY', group: 'COMPANY', title: '브랜드 소개', url: 'http://tp1977.com/company/brand/', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/349d93a3a29f4.png' },
    { no: '05', section: 'COMPANY', group: 'COMPANY', title: '비전 및 핵심 가치', url: 'http://tp1977.com/company/vision/', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/623bd685432e7.png' },

    { no: '06', section: 'BUSINESS', group: 'BUSINESS', title: '운영현황', url: 'http://tp1977.com/business/', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/0e7bf203b4297.png' },
    { no: '07', section: 'BUSINESS', group: 'BUSINESS', title: '고객', url: 'http://tp1977.com/business/customer/', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/bc64c88205034.png' },
    { no: '08', section: 'BUSINESS', group: 'BUSINESS', title: '마케팅', url: 'http://tp1977.com/business/marketing/', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/853146f148f96.png' },
    { no: '09', section: 'BUSINESS', group: 'BUSINESS', title: '생산', url: 'http://tp1977.com/business/production/', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/158df25cfda1a.png' },
    { no: '10', section: 'BUSINESS', group: 'BUSINESS', title: '물류', url: 'http://tp1977.com/business/logistics/', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/6060a6502217d.png' },
    { no: '11', section: 'BUSINESS', group: 'BUSINESS', title: '품질', url: 'http://tp1977.com/business/quality/', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/8c2433f2a0001.png' },

    { no: '12', section: 'PRODUCT', group: 'PRODUCT', title: '제품소개', url: 'http://tp1977.com/product/', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/a644b20579e5a.png' },
    { no: '13', section: 'PRODUCT', group: 'PRODUCT', title: '두루마리 화장지', url: 'http://tp1977.com/product/roll/', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/23842bd79e793.png' },
    { no: '14', section: 'PRODUCT', group: 'PRODUCT', title: '점보롤 화장지', url: 'http://tp1977.com/product/jumbo-roll/', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/44bfbfa392dee.png' },
    { no: '15', section: 'PRODUCT', group: 'PRODUCT', title: '핸드타월', url: 'http://tp1977.com/product/hand-towel/', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/55d020b963ed3.png' },
    { no: '16', section: 'PRODUCT', group: 'PRODUCT', title: '키친타월', url: 'http://tp1977.com/product/kitchen-towel/', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/b21c45220dcc1.png' },
    { no: '17', section: 'PRODUCT', group: 'PRODUCT', title: '미용티슈', url: 'http://tp1977.com/product/facial-tissue/', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/3b3e0309b6a51.png' },
    { no: '18', section: 'PRODUCT', group: 'PRODUCT', title: '물티슈 · 디스펜서', url: 'http://tp1977.com/product/etc/', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/a138208af8ada.png' },

    { no: '19', section: 'CONNECT', group: 'CONNECT', title: '채용', url: 'http://tp1977.com/recruit/', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/77252e46bae77.png' },
    { no: '20', section: 'CONNECT', group: 'CONNECT', title: '고객만족', url: 'http://tp1977.com/contact/', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/f67717e949688.png' },
    { no: '21', section: 'CONNECT', group: 'CONNECT', title: '문의 · 제휴', url: 'http://tp1977.com/inquiry/', image: 'https://cdn.imweb.me/upload/S202410251a294b3f442b0/629d10e50e93e.png' }
  ];

  const groups = [
    { key: 'COMPANY', no: '01', label: 'COMPANY', title: '기업의 역사와 브랜드 방향을 정리한 회사소개' },
    { key: 'BUSINESS', no: '02', label: 'BUSINESS OPERATIONS', title: '고객부터 품질까지 실제 운영 역량을 보여주는 구조' },
    { key: 'PRODUCT', no: '03', label: 'PRODUCT ARCHIVE', title: '제품군을 목적별로 탐색할 수 있는 카테고리 아카이브' },
    { key: 'CONNECT', no: '04', label: 'RECRUIT · CS · INQUIRY', title: '채용과 고객만족, 문의·제휴까지 이어지는 접점' }
  ];

  const esc = (value = '') => String(value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;').replace(/'/g, '&#039;');

  const card = (page) => `
    <article class="tne-page-card">
      <div class="tne-screen" aria-label="태평제지 ${esc(page.title)} 페이지 미리보기">
        <img src="${esc(page.image)}" alt="태평제지 ${esc(page.title)} 화면" loading="lazy" decoding="async" draggable="false" />
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
      <code>${esc(page.url.replace('http://', '').replace('https://', ''))}</code>
      <a href="${esc(page.url)}" target="_blank" rel="noopener noreferrer">LIVE PAGE ↗</a>
    </article>`;

  const render = () => {
    const root = document.querySelector('#project-detail .nw-project-case');
    if (!root || root.querySelector('.taepyeong-archive')) return false;

    const credit = root.querySelector('.nw-project-credit');
    if (!credit) return false;

    const section = document.createElement('section');
    section.className = 'tne-archive taepyeong-archive';
    section.innerHTML = `
      <div class="shell">
        <header class="tne-archive-head">
          <div class="nw-section-label"><span>09</span><p>FULL SITE ARCHIVE</p></div>
          <div>
            <p class="eyebrow">TAEPYEONG PAPER WEBSITE</p>
            <h2>회사소개부터 제품과 문의까지<br />21개 주요 화면을 하나의 사이트 시스템으로 정리했습니다.</h2>
            <p>태평제지 기업 사이트의 실제 운영 화면을 회사소개, 운영현황, 제품소개, 채용·고객·문의 구조로 묶어 프로젝트 아카이브로 구성했습니다.</p>
            <div class="tne-archive-stats"><span>21 VIEWS</span><span>IMWEB + CODE</span><span>RESPONSIVE UI</span><span>CONTENT SYSTEM</span></div>
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
