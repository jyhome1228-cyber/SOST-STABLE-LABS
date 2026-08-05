(() => {
  'use strict';

  const body = document.body;
  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.global-nav');
  const currentPage = body.dataset.page;
  const yearTargets = document.querySelectorAll('[data-year]');
  const assetSprite = './assets/3d/sost-3d-assets.svg';
  const officialLogo = './assets/logo-sost-stable-labs.svg';
  const symbolAsset = './assets/sost-symbol.svg';
  const faviconAsset = './assets/sost-symbol.svg?v=20260805-4';

  const ensureStylesheet = (href) => {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  };

  ensureStylesheet('./css/visual-refresh.css');
  ensureStylesheet('./css/refinement-v2.css');

  document.querySelectorAll('link[rel~="icon"]').forEach((link) => link.remove());
  const favicon = document.createElement('link');
  favicon.rel = 'icon';
  favicon.type = 'image/svg+xml';
  favicon.href = faviconAsset;
  document.head.appendChild(favicon);

  document.querySelectorAll('a.brand, a.footer-brand').forEach((brandLink) => {
    const isFooter = brandLink.classList.contains('footer-brand');
    brandLink.innerHTML = `<img src="${officialLogo}" alt="SOST STABLE LABS" />`;
    brandLink.style.display = 'block';
    brandLink.style.width = isFooter ? '205px' : 'clamp(172px, 14vw, 194px)';
    brandLink.style.maxWidth = '100%';
    brandLink.style.height = 'auto';
    brandLink.style.fontSize = '0';
    brandLink.style.lineHeight = '0';

    const image = brandLink.querySelector('img');
    if (image) {
      image.style.display = 'block';
      image.style.width = '100%';
      image.style.height = 'auto';
    }
  });

  const createAssetSvg = (symbolId, label = '') => `
    <svg viewBox="0 0 128 128" role="img"${label ? ` aria-label="${label}"` : ' aria-hidden="true"'}>
      <use href="${assetSprite}#${symbolId}"></use>
    </svg>
  `;

  const insertCapabilitiesLink = (targetNav, isFooter = false) => {
    if (!targetNav || targetNav.querySelector('[data-nav="capabilities"], a[href="./capabilities.html"]')) return;

    const link = document.createElement('a');
    link.href = './capabilities.html';
    link.textContent = 'CAPABILITIES';
    if (!isFooter) link.dataset.nav = 'capabilities';

    const labsLink = targetNav.querySelector('a[href="./labs.html"]');
    if (labsLink) targetNav.insertBefore(link, labsLink);
    else targetNav.appendChild(link);
  };

  insertCapabilitiesLink(nav);
  document.querySelectorAll('.footer-nav').forEach((footerNav) => insertCapabilitiesLink(footerNav, true));

  const navLinks = nav ? [...nav.querySelectorAll('a')] : [];

  yearTargets.forEach((target) => {
    target.textContent = new Date().getFullYear();
  });

  if (currentPage && currentPage !== 'home') {
    const activeLink = document.querySelector(`[data-nav="${currentPage}"]`);
    if (activeLink) {
      activeLink.classList.add('is-active');
      activeLink.setAttribute('aria-current', 'page');
    }
  }

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 18);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const closeMenu = () => {
    if (!menuToggle || !nav) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', '메뉴 열기');
    nav.classList.remove('is-open');
    body.classList.remove('menu-open');
  };

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const willOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
      menuToggle.setAttribute('aria-expanded', String(willOpen));
      menuToggle.setAttribute('aria-label', willOpen ? '메뉴 닫기' : '메뉴 열기');
      nav.classList.toggle('is-open', willOpen);
      body.classList.toggle('menu-open', willOpen);
    });

    navLinks.forEach((link) => link.addEventListener('click', closeMenu));

    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  if (currentPage === 'about') {
    const partnershipSection = document.querySelector('.partnership-grid')?.closest('section');
    if (partnershipSection) partnershipSection.remove();
  }

  const homeSystemVisual = document.querySelector('.system-visual');
  if (currentPage === 'home' && homeSystemVisual) {
    homeSystemVisual.classList.add('system-visual-3d');
    homeSystemVisual.innerHTML = `
      <div class="sost-symbol-scene" aria-label="SOST 심볼 기반 시스템 그래픽">
        <span class="scene-orbit scene-orbit-a"></span>
        <span class="scene-orbit scene-orbit-b"></span>
        <span class="scene-particle p1"></span>
        <span class="scene-particle p2"></span>
        <span class="scene-particle p3"></span>
        <span class="scene-particle p4"></span>
        <div class="symbol-stack" aria-hidden="true">
          <img class="symbol-layer symbol-layer-back" src="${symbolAsset}" alt="" />
          <img class="symbol-layer symbol-layer-mid" src="${symbolAsset}" alt="" />
          <img class="symbol-layer symbol-layer-front" src="${symbolAsset}" alt="" />
        </div>
        <p class="scene-caption">STRUCTURE · SYSTEM · FLOW</p>
      </div>
    `;
  }

  if (currentPage === 'home') {
    const previewIcons = ['icon-web', 'icon-operation', 'icon-commerce'];
    const previewCards = [...document.querySelectorAll('.preview-card')];

    previewCards.forEach((card, index) => {
      const symbolId = previewIcons[index];
      if (!symbolId || card.querySelector('.preview-card-3d')) return;
      const visual = document.createElement('div');
      visual.className = 'preview-card-3d';
      visual.innerHTML = createAssetSvg(symbolId);
      card.classList.add('has-3d-asset');
      card.appendChild(visual);
    });

    const businessCard = previewCards[1];
    if (businessCard) {
      const label = businessCard.querySelector('.card-label');
      const title = businessCard.querySelector('h3');
      const description = businessCard.querySelector(':scope > p:last-of-type');
      if (label) label.textContent = 'BUSINESS OPERATIONS';
      if (title) title.textContent = '기업 운영·관리 시스템';
      if (description) description.textContent = 'CRM, HR, 주문·발주, 전자결재와 프로젝트 업무를 한곳에서 관리하는 시스템을 구축합니다.';
    }
  }

  if (currentPage === 'solutions') {
    const pageCount = document.querySelector('.page-title .eyebrow');
    const toolbarCount = document.querySelector('.offering-toolbar > span');
    if (pageCount) pageCount.textContent = 'SOLUTIONS / 12';
    if (toolbarCount) toolbarCount.textContent = '12 SOLUTIONS';

    const capabilityButton = [...document.querySelectorAll('a[href="./capabilities.html"]')]
      .find((link) => link.classList.contains('button'));
    if (capabilityButton) capabilityButton.textContent = '확인하기';

    const offeringGrid = document.querySelector('.offering-grid');
    if (offeringGrid && !offeringGrid.querySelector('[data-added-solution="hr"]')) {
      const newSolutions = [
        {
          key: 'hr',
          number: '10',
          category: 'HR',
          title: 'HR 인사관리 시스템 구축',
          subtitle: 'Human Resources Management System',
          description: '직원 정보, 조직, 근태, 휴가와 평가 기록을 한곳에서 관리할 수 있는 기업 맞춤형 HR 시스템을 구축합니다.',
          items: ['직원·조직 정보', '근태·휴가 신청', '직급·권한 관리', '평가·교육 기록', '계약·증명서 관리', '인사 현황 통계'],
          keywords: ['HR', '인사관리', '근태', '휴가', '조직관리']
        },
        {
          key: 'procurement',
          number: '11',
          category: 'PROCUREMENT',
          title: '주문·발주 관리 시스템 구축',
          subtitle: 'Order & Procurement Management',
          description: '견적과 주문 접수부터 거래처 발주, 납기와 정산 상태까지 이어지는 주문·발주 업무 체계를 구축합니다.',
          items: ['견적·주문 접수', '발주서 생성', '거래처·품목 관리', '납기 일정 관리', '진행 상태 추적', '매입·매출 정산'],
          keywords: ['주문관리', '발주관리', '거래처', '납기', '구매관리']
        },
        {
          key: 'approval',
          number: '12',
          category: 'APPROVAL',
          title: '전자결재·승인 시스템 구축',
          subtitle: 'Digital Approval Workflow',
          description: '기업 내부의 신청, 검토와 승인 과정을 정형화해 담당자와 결재 상태를 명확하게 관리하는 워크플로를 구축합니다.',
          items: ['결재 양식 관리', '단계별 승인', '권한·대결 설정', '첨부파일·의견', '상태 알림', '승인 이력·감사 기록'],
          keywords: ['전자결재', '승인', '문서관리', '워크플로', '권한관리']
        }
      ];

      newSolutions.forEach((solution, index) => {
        const article = document.createElement('article');
        article.className = 'offering-card reveal';
        article.dataset.addedSolution = solution.key;
        article.dataset.delay = String(index * 50);
        article.innerHTML = `
          <div class="offering-card-top"><span>${solution.number}</span><span>${solution.category}</span></div>
          <h2>${solution.title}</h2>
          <p class="offering-subtitle">${solution.subtitle}</p>
          <p class="offering-description">${solution.description}</p>
          <div class="offering-content"><h3>제공 내용</h3><ul>${solution.items.map((item) => `<li>${item}</li>`).join('')}</ul></div>
          <div class="offering-keywords"><h3>키워드</h3><div class="keyword-list">${solution.keywords.map((keyword) => `<span>${keyword}</span>`).join('')}</div></div>
        `;
        offeringGrid.appendChild(article);
      });
    }
  }

  const revealItems = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const delay = Number(entry.target.dataset.delay || 0);
          window.setTimeout(() => entry.target.classList.add('is-visible'), delay);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const offeringCards = [...document.querySelectorAll('.offering-card')];

  if (offeringCards.length) {
    ensureStylesheet('./css/offering-accordion.css');

    if (currentPage === 'solutions') {
      const solutionIcons = [
        'icon-web', 'icon-platform', 'icon-operation', 'icon-crm',
        'icon-booking', 'icon-admin', 'icon-commerce', 'icon-automation',
        'icon-maintenance', 'icon-crm', 'icon-commerce', 'icon-admin'
      ];

      offeringCards.forEach((card, index) => {
        const symbolId = solutionIcons[index];
        const cardTop = card.querySelector('.offering-card-top');
        if (!symbolId || !cardTop || card.querySelector('.solution-3d-asset')) return;

        const visual = document.createElement('div');
        visual.className = 'solution-3d-asset';
        visual.innerHTML = createAssetSvg(symbolId);
        card.classList.add('solution-has-asset');
        cardTop.insertAdjacentElement('afterend', visual);
      });
    }

    const closeOffering = (card) => {
      const details = card.querySelector('.offering-card-details');
      const toggleLabel = card.querySelector('.offering-card-toggle-label');
      if (!details) return;
      card.classList.remove('is-open');
      card.setAttribute('aria-expanded', 'false');
      details.style.maxHeight = '0px';
      if (toggleLabel) toggleLabel.textContent = '자세히 보기';
    };

    const openOffering = (card) => {
      const details = card.querySelector('.offering-card-details');
      const toggleLabel = card.querySelector('.offering-card-toggle-label');
      if (!details) return;
      offeringCards.forEach((item) => {
        if (item !== card) closeOffering(item);
      });
      card.classList.add('is-open');
      card.setAttribute('aria-expanded', 'true');
      details.style.maxHeight = `${details.scrollHeight}px`;
      if (toggleLabel) toggleLabel.textContent = '내용 접기';
    };

    const toggleOffering = (card) => {
      if (card.classList.contains('is-open')) closeOffering(card);
      else openOffering(card);
    };

    offeringCards.forEach((card, index) => {
      const title = card.querySelector(':scope > h2');
      const description = card.querySelector(':scope > .offering-description');
      const content = card.querySelector(':scope > .offering-content');
      const keywords = card.querySelector(':scope > .offering-keywords');
      if (!title || !description || !content || !keywords) return;

      const detailId = `offering-detail-${currentPage || 'page'}-${index + 1}`;
      const titleId = `offering-title-${currentPage || 'page'}-${index + 1}`;
      title.id = titleId;

      const details = document.createElement('div');
      details.className = 'offering-card-details';
      details.id = detailId;
      details.setAttribute('role', 'region');
      details.setAttribute('aria-labelledby', titleId);

      const detailsInner = document.createElement('div');
      detailsInner.className = 'offering-card-details-inner';
      detailsInner.append(description, content, keywords);
      details.appendChild(detailsInner);

      const toggle = document.createElement('div');
      toggle.className = 'offering-card-toggle';
      toggle.setAttribute('aria-hidden', 'true');
      toggle.innerHTML = `
        <span class="offering-card-toggle-label">자세히 보기</span>
        <span class="offering-card-toggle-icon"></span>
      `;

      card.append(details, toggle);
      card.classList.add('is-interactive');
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-expanded', 'false');
      card.setAttribute('aria-controls', detailId);

      card.addEventListener('click', () => toggleOffering(card));
      card.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        toggleOffering(card);
      });
    });

    window.addEventListener('resize', () => {
      const openCard = document.querySelector('.offering-card.is-open');
      const openDetails = openCard?.querySelector('.offering-card-details');
      if (openDetails) openDetails.style.maxHeight = `${openDetails.scrollHeight}px`;
    });
  }

  const projectButtons = document.querySelectorAll('[data-filter]');
  const projectEntries = document.querySelectorAll('[data-category]');
  projectButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.filter;
      projectButtons.forEach((item) => item.classList.toggle('is-active', item === button));
      projectEntries.forEach((entry) => {
        entry.classList.toggle('is-hidden', category !== 'all' && entry.dataset.category !== category);
      });
    });
  });

  const articleButtons = document.querySelectorAll('[data-article-filter]');
  const articleEntries = document.querySelectorAll('[data-article-category]');
  articleButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.articleFilter;
      articleButtons.forEach((item) => item.classList.toggle('is-active', item === button));
      articleEntries.forEach((entry) => {
        entry.classList.toggle('is-hidden', category !== 'all' && entry.dataset.articleCategory !== category);
      });
    });
  });

  const contactForm = document.querySelector('[data-contact-form]');
  const formMessage = document.querySelector('[data-form-message]');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        if (formMessage) formMessage.textContent = '필수 항목을 확인해주세요.';
        return;
      }
      if (formMessage) formMessage.textContent = '문의 폼 화면 구성이 완료되었습니다. 다음 단계에서 Firebase 또는 이메일 전송 기능을 연결합니다.';
    });
  }
})();