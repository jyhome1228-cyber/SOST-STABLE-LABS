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
  excerpt: '프라이빗 아웃도어 공간의 브랜드 소개, 공간 안내, 이용 규정과 예약 흐름을 하나의 반응형 웹사이트로 정리한 프로젝트입니다.',
  services: ['Brand Website Planning', 'Information Architecture', 'Reservation UX', 'Responsive Front-end'],
  technologies: ['HTML5', 'CSS3', 'JavaScript', 'GitHub Pages', 'Responsive Web'],
  accent: 'green',
  thumbnail: '',
  hero: '',
  overview: '리림은 수영장과 수로, 개별 쉘터, 바비큐 공간과 카페를 운영하는 프라이빗 아웃도어 공간 브랜드입니다. 공간의 분위기를 소개하는 감성 영역과 실제 이용에 필요한 운영 정보, 예약 안내와 위치 정보를 하나의 사용자 흐름으로 연결하는 웹사이트를 구축했습니다.',
  challenge: '공간의 분위기를 충분히 전달하면서도 운영시간, 요금, 인원 기준, 준비물, 숙박 옵션과 예약 방식처럼 방문 전 확인해야 하는 정보가 많았습니다. 감성적인 공간 소개와 실제 예약 결정에 필요한 정보를 분리하지 않고 모바일에서도 빠르게 확인할 수 있는 구조가 필요했습니다.',
  approach: '메인에서 브랜드 인상과 오전·오후 이용 방식을 먼저 보여주고, 브랜드 소개, 공간 안내, 이용 안내, 예약 안내, 위치와 FAQ로 이어지는 탐색 구조를 구성했습니다. 포트폴리오에서는 공간 사진 자체가 아니라 각 페이지의 실제 UI와 예약 동선이 보이도록 라이브 웹 미리보기와 UI 캡처 중심으로 보여줍니다.',
  system: [
    '브랜드 소개와 공간 안내 정보 구조',
    '수영장·수로·개별 쉘터 공간 정보 구성',
    '오전·오후 타임별 운영 정보와 요금 안내',
    '캠핏 예약과 별도 문의 동선 분리',
    'FAQ·오시는 길·준비사항 통합 안내',
    'PC·태블릿·모바일 반응형 웹 구조'
  ],
  results: [
    '공간의 브랜드 인상과 실제 예약 정보를 하나의 웹 경험으로 연결했습니다.',
    '방문 전 필요한 운영 조건과 준비사항을 목적에 따라 빠르게 찾도록 정리했습니다.',
    '공간 안내와 예약 정보의 정보 위계를 명확하게 정리했습니다.',
    '모바일에서도 예약과 이용 정보를 빠르게 찾을 수 있도록 반응형으로 구현했습니다.'
  ],
  scope: ['Brand Content Structure', 'Information Architecture', 'Responsive UX/UI', 'Front-end Development', 'Reservation Flow', 'Content Management'],
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
