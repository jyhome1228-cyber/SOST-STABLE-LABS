window.SOST_PROJECTS = Array.isArray(window.SOST_PROJECTS) ? window.SOST_PROJECTS : [];

window.SOST_PROJECTS.push({
  id: 'relim-outdoor-space-brand-website',
  title: 'RE:LIM Space Brand Website',
  client: 'RE:LIM',
  year: '2026',
  category: 'web',
  categoryLabel: 'SPACE BRAND WEBSITE',
  url: 'https://re-lim.com/',
  livePreviewUrl: 'https://re-lim.com/',
  livePages: [
    { label: 'Main Website', url: 'https://re-lim.com/' },
    { label: 'Brand Story', url: 'https://re-lim.com/about.html' },
    { label: 'Space Guide', url: 'https://re-lim.com/space.html' },
    { label: 'Use Guide', url: 'https://re-lim.com/guide.html' },
    { label: 'Reservation Guide', url: 'https://re-lim.com/reservation.html' },
    { label: 'FAQ', url: 'https://re-lim.com/faq.html' }
  ],
  visualLabel: 'RE:LIM WEB UI',
  excerpt: '공간 브랜드 웹사이트와 함께 인스타 DM 반복 문의를 수집·분류해 FAQ와 키워드 답변 체계로 전환하고, 예약 유형별 문의 동선을 정리한 운영형 웹 프로젝트입니다.',
  services: ['Brand Website Planning', 'Inquiry Data Architecture', 'Reservation UX', 'Responsive Front-end'],
  technologies: ['HTML5', 'CSS3', 'JavaScript', 'GitHub Pages', 'Responsive Web'],
  accent: 'green',
  thumbnail: '',
  hero: '',
  overview: '리림은 수영장과 수로, 개별 쉘터, 바비큐 공간과 카페를 운영하는 프라이빗 아웃도어 공간 브랜드입니다. 공간을 소개하는 웹사이트 구축과 동시에 실제 인스타그램 DM에서 반복되는 예약·요금·숙박·준비물·취소 문의를 수집해 질문군으로 정리하고, 웹 FAQ와 키워드 답변 구조로 재설계했습니다. 보여주는 사이트를 넘어 고객 문의와 예약 운영을 줄여주는 디지털 운영 도구로 확장한 프로젝트입니다.',
  challenge: '운영시간, 요금, 인원 기준, 준비물, 숙박 옵션, 외부 음식과 취소 규정처럼 방문 전 확인해야 하는 정보가 많아 동일한 질문이 인스타그램 DM으로 반복 유입되고 있었습니다. 공간의 분위기를 전달하는 것뿐 아니라 반복 문의를 줄이고, 고객이 자신의 상황에 맞는 답을 스스로 빠르게 찾도록 운영 정보 자체를 구조화할 필요가 있었습니다.',
  approach: '실제 DM 문의를 질문 유형별로 수집·분류하고 예약, 요금, 타임, 숙박, 준비물, 외부 음식, 취소 등 핵심 키워드를 정의했습니다. 이를 FAQ·이용안내 콘텐츠와 연결하고, 일반 오전·오후 예약은 캠핏으로, 별도 확인이 필요한 숙박·당일·대관 문의는 운영 채널로 분기해 웹과 DM이 같은 기준으로 답변하도록 설계했습니다.',
  system: [
    '인스타그램 DM 반복 문의 수집·분류와 Q&A 데이터화',
    '예약·요금·타임·숙박·준비물·취소 키워드 답변 구조',
    '웹 FAQ와 운영 답변을 연결한 일관된 문의 기준',
    '오전·오후 일반 예약과 별도 문의 예약 동선 분리',
    '요금·인원·준비사항·취소 규정 운영 정보 구조화',
    'PC·태블릿·모바일 반응형 공간 브랜드 웹 구조'
  ],
  results: [
    '반복되던 인스타 DM 문의를 검색 가능한 운영 Q&A 자산으로 전환했습니다.',
    '고객과 운영자가 같은 키워드와 답변 기준을 사용하도록 문의 응대 체계를 정리했습니다.',
    '일반 예약과 별도 상담이 필요한 문의를 분리해 예약 과정의 혼선을 줄였습니다.',
    '브랜드 소개, 이용 안내, 예약과 FAQ가 하나의 운영 흐름으로 연결되도록 구축했습니다.'
  ],
  scope: ['Brand Content Structure', 'Inquiry Data Architecture', 'Keyword Q&A System', 'Responsive UX/UI', 'Reservation Flow', 'Front-end Development'],
  credits: [
    { label: 'Planning · UX · Development', value: 'SOST STABLE LABS' },
    { label: 'Client', value: 'RE:LIM' }
  ],
  gallery: []
});

(() => {
  const cssId = 'relim-live-preview-css';
  if (!document.getElementById(cssId)) {
    const link = document.createElement('link');
    link.id = cssId;
    link.rel = 'stylesheet';
    link.href = './css/relim-live-preview.css?v=20260807-1';
    document.head.appendChild(link);
  }

  const scriptId = 'relim-live-preview-js';
  if (!document.getElementById(scriptId)) {
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = './js/relim-live-preview.js?v=20260807-1';
    script.defer = true;
    document.head.appendChild(script);
  }
})();
