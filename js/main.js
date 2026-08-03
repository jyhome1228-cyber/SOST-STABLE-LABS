(() => {
  'use strict';

  const body = document.body;
  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.global-nav');
  const currentPage = body.dataset.page;
  const yearTargets = document.querySelectorAll('[data-year]');

  const insertCapabilitiesLink = (targetNav, isFooter = false) => {
    if (!targetNav || targetNav.querySelector('[data-nav="capabilities"], a[href="./capabilities.html"]')) return;

    const link = document.createElement('a');
    link.href = './capabilities.html';
    link.textContent = 'CAPABILITIES';
    if (!isFooter) link.dataset.nav = 'capabilities';

    const labsLink = targetNav.querySelector('a[href="./labs.html"]');
    if (labsLink) {
      targetNav.insertBefore(link, labsLink);
    } else {
      targetNav.appendChild(link);
    }
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
    const accordionStyles = document.createElement('link');
    accordionStyles.rel = 'stylesheet';
    accordionStyles.href = './css/offering-accordion.css';
    document.head.appendChild(accordionStyles);

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
      const isOpen = card.classList.contains('is-open');
      if (isOpen) {
        closeOffering(card);
      } else {
        openOffering(card);
      }
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
        const shouldShow = category === 'all' || entry.dataset.category === category;
        entry.classList.toggle('is-hidden', !shouldShow);
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
        const shouldShow = category === 'all' || entry.dataset.articleCategory === category;
        entry.classList.toggle('is-hidden', !shouldShow);
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

      if (formMessage) {
        formMessage.textContent = '문의 폼 화면 구성이 완료되었습니다. 다음 단계에서 Firebase 또는 이메일 전송 기능을 연결합니다.';
      }
    });
  }
})();
