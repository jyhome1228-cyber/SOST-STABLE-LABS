(() => {
  'use strict';

  const currentPage = document.body?.dataset.page || '';
  const navs = document.querySelectorAll('.global-nav, .footer-nav');

  navs.forEach((nav) => {
    let guide = nav.querySelector('a[href="./labs.html"], [data-nav="labs"], [data-nav="guide"]');
    if (!guide) {
      guide = document.createElement('a');
      const contact = nav.querySelector('a[href="./contact.html"]');
      if (contact) nav.insertBefore(guide, contact);
      else nav.appendChild(guide);
    }

    guide.href = './labs.html';
    guide.textContent = 'GUIDE';
    if (nav.classList.contains('global-nav')) guide.dataset.nav = 'guide';
    else guide.removeAttribute('data-nav');

    let study = nav.querySelector('a[href="./study.html"], [data-nav="study"]');
    if (!study) {
      study = document.createElement('a');
      study.href = './study.html';
      study.textContent = 'STUDY';
      if (nav.classList.contains('global-nav')) study.dataset.nav = 'study';
      guide.after(study);
    } else {
      study.href = './study.html';
      study.textContent = 'STUDY';
      if (nav.classList.contains('global-nav')) study.dataset.nav = 'study';
    }
  });

  document.querySelectorAll('.global-nav a').forEach((link) => {
    link.classList.remove('is-active');
    link.removeAttribute('aria-current');
  });

  const activeKey = currentPage === 'labs' ? 'guide' : currentPage;
  const active = document.querySelector(`.global-nav [data-nav="${activeKey}"]`);
  if (active) {
    active.classList.add('is-active');
    active.setAttribute('aria-current', 'page');
  }

  if (currentPage === 'labs') {
    const heroEyebrow = document.querySelector('.labs-series-hero .eyebrow');
    if (heroEyebrow) heroEyebrow.textContent = 'SYSTEM GUIDE · 01–06';
  }
})();
