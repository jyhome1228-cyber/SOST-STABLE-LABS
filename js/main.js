(() => {
  'use strict';

  const body = document.body;
  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.global-nav');
  const navLinks = nav ? [...nav.querySelectorAll('a')] : [];
  const currentPage = body.dataset.page;
  const yearTarget = document.querySelector('[data-year]');

  if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear();
  }

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
