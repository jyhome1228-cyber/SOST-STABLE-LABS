(() => {
  'use strict';

  const section = [...document.querySelectorAll('.section-block')]
    .find((item) => item.querySelector('.eyebrow')?.textContent.trim() === 'LABS & INSIGHTS');

  if (!section) return;

  const studies = [
    {
      no: '01',
      label: 'SEO / WEB',
      title: '검색 노출은 디자인 이후가 아니라 사이트 구조에서 시작됩니다.',
      description: '검색 의도, 페이지 역할, 메타 정보와 콘텐츠를 처음부터 함께 설계해야 하는 이유를 정리합니다.',
      meta: '8 MIN READ',
      href: './study-seo.html'
    },
    {
      no: '02',
      label: 'CDN / WEB INFRA',
      title: '이미지 URL을 HTML에 넣으면 실제로 무엇이 일어날까?',
      description: '이미지 저장소와 CDN, 외부 URL 호출, 저장 용량과 트래픽의 차이를 실무 기준으로 설명합니다.',
      meta: '7 MIN READ',
      href: './study-cdn-images.html'
    },
    {
      no: '03',
      label: 'CRM / DATA',
      title: 'CRM을 만들기 전에 고객 데이터를 어떻게 나눌까',
      description: '문의, 상담, 견적, 계약과 재접촉을 실제 영업 흐름에 맞는 상태값으로 나누는 기준을 기록합니다.',
      meta: '7 MIN READ',
      href: './study.html'
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
          <a class="home-labs-card" href="${study.href}">
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
