(() => {
  'use strict';

  const project = (Array.isArray(window.SOST_PROJECTS) ? window.SOST_PROJECTS : [])
    .find((item) => item.id === 'jn-costech-cosmetic-oem-odm-website');

  if (!project) return;

  project.caseSummary = '전문적인 화장품 제조 기술을 단순 나열하지 않고, 글로벌 바이어가 기술 차별점과 제조 범위를 이해한 뒤 OEM·ODM 상담으로 이동하는 B2B 전환 구조로 설계했습니다.';
  project.caseHighlights = [
    {
      label: 'TECH STORY',
      title: '복잡한 제조 기술을 구매 언어로 구조화',
      description: '펩타이드, 세라마이드, 하이드로겔, 캡슐화, 리포좀·니오좀과 에멀전 기술을 기술명 중심이 아니라 피부 효능·제품 개발 가능성과 연결해 이해할 수 있도록 정보 체계를 정리했습니다.',
      outcome: '기술 이해도와 설득력 향상'
    },
    {
      label: 'OEM / ODM FLOW',
      title: '제조 역량 탐색 → 상담 전환 동선',
      description: 'Core Business Areas와 Technology Highlights를 탐색한 뒤 OEM·ODM Inquiry와 Partnership CTA로 자연스럽게 이어지도록 주요 구간의 전환 동선을 설계했습니다.',
      outcome: 'B2B 문의 진입점 명확화'
    },
    {
      label: 'GLOBAL B2B',
      title: '글로벌 바이어를 위한 제조사 신뢰 구조',
      description: 'K-뷰티 포뮬레이션 전문성, 기능성 원료 기술과 확장 가능한 제조 시스템을 하나의 기업 메시지로 통합해 해외 브랜드 파트너가 협업 가능성을 빠르게 판단하도록 구성했습니다.',
      outcome: '글로벌 파트너십 커뮤니케이션 강화'
    }
  ];
})();