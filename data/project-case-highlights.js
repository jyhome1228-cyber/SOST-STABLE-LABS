(() => {
  'use strict';

  const projects = Array.isArray(window.SOST_PROJECTS) ? window.SOST_PROJECTS : [];
  const highlights = {
    'aesost-career-content-platform': {
      summary: '콘텐츠 서비스에서 회원 기반 성장 플랫폼으로 확장할 수 있도록 탐색·저장·작성·상담 흐름을 하나의 시스템으로 연결했습니다.',
      items: [
        {
          label: 'CONTENT SYSTEM',
          title: '콘텐츠 분류·검색 구조 통합',
          description: '매거진, 아티클, 칼럼, 해외 콘텐츠를 공통 메타데이터와 검색·필터 규칙으로 정리해 콘텐츠가 늘어나도 동일한 탐색 구조를 유지하도록 설계했습니다.',
          outcome: '탐색 기준 통일'
        },
        {
          label: 'MEMBERSHIP',
          title: 'Firebase 회원·권한 시스템',
          description: '이메일·Google 로그인, 회원 프로필, 저장 데이터와 접근 권한을 Firebase Authentication과 Firestore로 연결해 개인화 기능의 기반을 구축했습니다.',
          outcome: '회원 데이터 기반 확보'
        },
        {
          label: 'CAREER FLOW',
          title: '저장 → 기록 → 상담 사용자 여정',
          description: '레퍼런스 저장에서 자신의 관점 기록, 칼럼 작성, 커리어 컨설팅 신청까지 서비스 참여가 단계적으로 깊어지는 사용자 흐름을 만들었습니다.',
          outcome: '콘텐츠 소비를 활동으로 전환'
        }
      ]
    },
    'tne-corporate-website': {
      summary: '많은 기업 정보를 단순히 나열하지 않고 기술력과 시공 경험, 신뢰 자료가 영업 설득 구조로 작동하도록 기업 사이트를 재정리했습니다.',
      items: [
        {
          label: 'TRUST STRUCTURE',
          title: '기술력·인증·실적 정보 위계',
          description: '연혁, 인증, 파트너, 사업 프로세스를 방문자가 짧은 시간 안에 기업 역량을 판단할 수 있는 순서로 재구성했습니다.',
          outcome: '신뢰 정보 접근성 강화'
        },
        {
          label: 'PROJECT ARCHIVE',
          title: '시공사례·운영실적 아카이브',
          description: '전국 시공 사례와 운영 실적을 지속적으로 추가할 수 있는 공통 카드와 상세 콘텐츠 구조로 정리했습니다.',
          outcome: '실적 콘텐츠 확장 가능'
        },
        {
          label: 'IMWEB OPS',
          title: '운영 가능한 아임웹 구조',
          description: '아임웹 관리 환경은 유지하면서 반응형 레이아웃과 콘텐츠 등록 규칙을 통일해 내부 운영자가 직접 실적을 갱신할 수 있게 했습니다.',
          outcome: '유지관리 효율 개선'
        }
      ]
    },
    'thomastone-digital-healthcare-website': {
      summary: 'AI 구강관리 기술을 일반 사용자와 기관·파트너가 함께 이해할 수 있도록 기술 설명, 서비스, 연구 성과와 신뢰 근거를 하나의 기업 메시지로 통합했습니다.',
      items: [
        {
          label: 'SERVICE STORY',
          title: '기술·서비스·제품 구조화',
          description: 'AI 모니터링, 제품, 교육·평가 시스템처럼 다른 성격의 사업을 사용 목적과 고객 관점에서 이해할 수 있는 서비스 구조로 정리했습니다.',
          outcome: '복잡한 기술의 이해도 향상'
        },
        {
          label: 'TRUST EVIDENCE',
          title: '연구·수상·협력 신뢰 콘텐츠',
          description: '기업부설연구소, 수상·인증, 대학·병원 협력과 언론보도를 독립된 신뢰 근거로 묶어 기술 기업의 전문성을 빠르게 전달하도록 구성했습니다.',
          outcome: 'B2B 신뢰 근거 강화'
        },
        {
          label: 'GLOBAL UX',
          title: '한국어·영문 동일 정보 체계',
          description: '국문과 영문 페이지에서 같은 정보 위계와 반응형 레이아웃이 유지되도록 다국어 구조와 콘텐츠 운영 기준을 정리했습니다.',
          outcome: '글로벌 커뮤니케이션 기반'
        }
      ]
    },
    'pentagon-law-office-corporate-center': {
      summary: '복잡한 법률 서비스를 읽는 홈페이지가 아니라, 사용자가 자신의 상황을 정리하고 적합한 상담으로 이동하는 법률 문의 인터페이스로 설계했습니다.',
      items: [
        {
          label: 'INQUIRY ASSISTANT',
          title: '상세 문의 어시스턴트',
          description: '상담 전에 필요한 상황과 문의 내용을 단계적으로 정리할 수 있도록 상세 문의 흐름을 구성해, 단순 연락처 문의보다 구체적인 상담 정보를 확보하도록 설계했습니다.',
          outcome: '상담 전 정보 품질 향상'
        },
        {
          label: 'ONE-STOP GUIDE',
          title: '복잡한 법률 절차를 원스탑 구조로',
          description: '법인설립과 상속 등 단계가 많은 업무를 준비사항·절차·지원 범위로 분해하고, 사용자가 현재 필요한 서비스를 빠르게 찾도록 서비스별 집중 페이지를 구성했습니다.',
          outcome: '서비스 이해도 개선'
        },
        {
          label: 'CONSULTATION UX',
          title: '정보 탐색에서 상담까지 전환 설계',
          description: '전문 분야 설명, 절차 안내, 반복 CTA와 모바일 문의 동선을 연결해 필요한 정보를 읽은 직후 자연스럽게 상담으로 이동하도록 설계했습니다.',
          outcome: '문의 전환 동선 단축'
        }
      ]
    },
    'have-a-seat-furniture-brand-commerce': {
      summary: '브랜드 무드, 공간 포트폴리오와 실제 상품 구매가 분리되지 않도록 카페24 커머스를 브랜드 경험 중심으로 재구성했습니다.',
      items: [
        {
          label: 'BRAND COMMERCE',
          title: '브랜드 콘텐츠와 구매 경험 통합',
          description: '메인에서 공간 사례와 제품을 함께 보여주고 포트폴리오에서 실제 상품 카테고리로 자연스럽게 이어지는 브랜드 커머스 흐름을 만들었습니다.',
          outcome: '브랜드와 판매 경험 연결'
        },
        {
          label: 'PRODUCT UX',
          title: '상품·카테고리 탐색 규칙 통일',
          description: '테이블 등 다수 제품군의 목록 카드, 필터, 상세 정보와 모바일 레이아웃을 공통 규칙으로 정리해 상품 탐색의 일관성을 높였습니다.',
          outcome: '상품 탐색 속도 개선'
        },
        {
          label: 'CAFE24 OPS',
          title: '기존 카페24 운영 기능 유지',
          description: '상품·주문·게시판 관리 기능은 유지하면서 사용자 화면만 브랜드 톤에 맞게 재설계해 운영 부담을 늘리지 않고 사이트 완성도를 높였습니다.',
          outcome: '운영 방식 유지 + UX 개선'
        }
      ]
    },
    'relim-outdoor-space-brand-website': {
      summary: '공간을 예쁘게 보여주는 사이트를 넘어, 반복 문의를 데이터로 정리하고 예약 전 고객의 궁금증을 웹과 DM에서 함께 해결하는 운영 시스템을 구축했습니다.',
      items: [
        {
          label: 'DM INTELLIGENCE',
          title: '인스타 DM 문의 수집 → Q&A 데이터화',
          description: '실제 인스타그램 DM에서 반복되는 예약, 요금, 숙박, 준비물, 외부 음식, 취소 규정 등의 질문을 수집·분류해 웹 FAQ와 운영 답변 데이터로 재구성했습니다.',
          outcome: '반복 문의를 운영 자산으로 전환'
        },
        {
          label: 'KEYWORD RESPONSE',
          title: '키워드 기반 빠른 답변 구조',
          description: '예약·요금·타임·아쿠아슈즈·숙박·취소 등 핵심 질문군을 키워드 단위로 정리해 고객 문의에 일관된 답변을 제공할 수 있는 Q&A 솔루션을 설계했습니다.',
          outcome: '응답 속도와 일관성 향상'
        },
        {
          label: 'RESERVATION ROUTING',
          title: '예약 유형별 문의 동선 분리',
          description: '오전·오후 일반 예약은 캠핏으로, 숙박·당일·대관 등 별도 확인이 필요한 문의는 운영 채널로 분기해 사용자가 자신의 상황에 맞는 예약 경로를 바로 선택하도록 구성했습니다.',
          outcome: '예약 문의 혼선 감소'
        }
      ]
    }
  };

  projects.forEach((project) => {
    const data = highlights[project.id];
    if (!data) return;
    project.caseSummary = data.summary;
    project.caseHighlights = data.items;
  });
})();
