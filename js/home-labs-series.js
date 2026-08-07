(() => {
  'use strict';

  const section = [...document.querySelectorAll('.section-block')]
    .find((item) => item.querySelector('.eyebrow')?.textContent.trim() === 'LABS & INSIGHTS');

  if (!section) return;

  const chapters = [
    {
      no: '01',
      label: 'WEBSITE',
      title: '회사에 홈페이지가 필요한 진짜 이유',
      description: '검색과 신뢰 형성, 서비스 이해, 실적 확인과 문의까지. 홈페이지를 24시간 작동하는 첫 번째 영업 구조로 만드는 방법을 정리합니다.',
      signal: '소개자료를 매번 직접 전달한다면',
      anchor: 'chapter-01'
    },
    {
      no: '02',
      label: 'CRM',
      title: '문의가 늘어나는데 매출로 연결되지 않는 이유',
      description: '전화·메일·카카오톡·SNS에 흩어진 문의를 상담, 견적, 계약과 후속관리까지 하나의 고객 흐름으로 연결하는 기준을 설명합니다.',
      signal: '견적 후 고객을 자주 놓친다면',
      anchor: 'chapter-02'
    },
    {
      no: '03',
      label: 'OPERATIONS',
      title: '엑셀과 카카오톡으로 업무를 관리하는 회사의 한계',
      description: '프로젝트, 일정, 담당자, 요청사항과 파일을 한곳에서 관리해 “이거 어디까지 됐지?”라는 확인 업무를 줄이는 구조를 다룹니다.',
      signal: '진행상황을 매번 물어봐야 한다면',
      anchor: 'chapter-03'
    }
  ];

  const rail = [
    ['01', '기업 홈페이지'],
    ['02', 'CRM 고객관리'],
    ['03', '업무 관리시스템'],
    ['04', '문의·업무 자동화'],
    ['05', '사내 운영시스템'],
    ['06', '통합 시스템 설계']
  ];

  section.classList.add('home-labs-series');
  section.innerHTML = `
    <div class="shell">
      <div class="home-labs-series-head">
        <div>
          <p class="eyebrow">LABS · BUSINESS SYSTEM 01–06</p>
          <h2>회사가 성장할수록 필요한<br />디지털 구조를 정리합니다.</h2>
        </div>
        <div>
          <p>기능부터 고르기보다 지금 반복되는 문제를 먼저 보면 어떤 시스템이 필요한지 더 명확해집니다. 홈페이지부터 CRM, 업무관리와 자동화까지 6개의 단계로 정리했습니다.</p>
          <a class="inline-link" href="./labs.html">6개 챕터 전체 보기 <span>↗</span></a>
        </div>
      </div>

      <div class="home-labs-cards">
        ${chapters.map((chapter) => `
          <a class="home-labs-card" href="./labs.html#${chapter.anchor}">
            <div class="home-labs-card-top">
              <span>${chapter.no}</span>
              <small>${chapter.label}</small>
            </div>
            <h3>${chapter.title}</h3>
            <p>${chapter.description}</p>
            <div class="home-labs-signal">
              <span>${chapter.signal}</span>
              <strong>↗</strong>
            </div>
          </a>
        `).join('')}
      </div>

      <nav class="home-labs-rail" aria-label="LABS 6개 챕터">
        ${rail.map(([no, title], index) => `
          <a href="./labs.html#chapter-${String(index + 1).padStart(2, '0')}">
            <span>${no}</span>
            <strong>${title}</strong>
          </a>
        `).join('')}
      </nav>
    </div>
  `;
})();
