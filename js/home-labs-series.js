(() => {
  'use strict';

  const section = [...document.querySelectorAll('.section-block')]
    .find((item) => item.querySelector('.eyebrow')?.textContent.trim() === 'LABS & INSIGHTS');

  if (!section) return;

  const studies = [
    {
      no: '01',
      label: 'SYSTEM / PROCESS',
      title: '개발보다 먼저 정리해야 하는 것은 기능이 아니라 운영 방식입니다.',
      description: '누가 어떤 정보를 입력하고 다음 사람이 무엇을 확인하는지부터 정리해야 실제 업무와 시스템이 어긋나지 않습니다.',
      meta: '8 MIN READ',
      anchor: 'study-01'
    },
    {
      no: '02',
      label: 'WEB / STRATEGY',
      title: '홈페이지 리뉴얼에서 디자인보다 먼저 정리할 것',
      description: '메뉴와 스타일을 정하기 전에 회사가 무엇을 설명해야 하고 사용자가 어디까지 이해해야 하는지부터 확인합니다.',
      meta: '6 MIN READ',
      anchor: 'study-02'
    },
    {
      no: '03',
      label: 'CRM / DATA',
      title: 'CRM을 만들기 전에 고객 데이터를 어떻게 나눌까',
      description: '문의, 상담, 견적, 계약과 재접촉을 실제 영업 흐름에 맞는 상태값으로 나누는 기준을 기록합니다.',
      meta: '7 MIN READ',
      anchor: 'study-03'
    }
  ];

  const categories = ['WEB', 'SYSTEM', 'COMMERCE', 'DESIGN', 'PROCESS', 'AI'];

  section.classList.add('home-labs-series');
  section.innerHTML = `
    <div class="shell">
      <div class="home-labs-series-head">
        <div>
          <p class="eyebrow">STUDY · NOTES / RESEARCH / FIELDWORK</p>
          <h2>만들면서 확인한 기준과<br />판단을 기록합니다.</h2>
        </div>
        <div>
          <p>완성된 결과만 보여주기보다 웹사이트와 시스템을 왜 그렇게 설계했는지, 무엇을 먼저 확인했는지 실무 과정 중심으로 정리합니다.</p>
          <a class="inline-link" href="./study.html">STUDY 전체 보기 <span>↗</span></a>
        </div>
      </div>

      <div class="home-labs-cards">
        ${studies.map((study) => `
          <a class="home-labs-card" href="./study.html#${study.anchor}">
            <div class="home-labs-card-top">
              <span>${study.no}</span>
              <small>${study.label}</small>
            </div>
            <h3>${study.title}</h3>
            <p>${study.description}</p>
            <div class="home-labs-signal">
              <span>${study.meta}</span>
              <strong>↗</strong>
            </div>
          </a>
        `).join('')}
      </div>

      <nav class="home-labs-rail" aria-label="STUDY 주제">
        ${categories.map((title, index) => `
          <a href="./study.html">
            <span>${String(index + 1).padStart(2, '0')}</span>
            <strong>${title}</strong>
          </a>
        `).join('')}
      </nav>
    </div>
  `;
})();
