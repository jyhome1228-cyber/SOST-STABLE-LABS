(() => {
  'use strict';

  const currentPage = document.body?.dataset.page || '';
  const navs = document.querySelectorAll('.global-nav, .footer-nav');

  navs.forEach((nav) => {
    nav.querySelectorAll('a[href="./labs.html"], a[href="./study.html"], [data-nav="labs"], [data-nav="guide"], [data-nav="study"]')
      .forEach((link) => link.remove());

    let pricing = nav.querySelector('a[href="./pricing.html"], [data-nav="pricing"]');
    if (!pricing) {
      pricing = document.createElement('a');
      const contact = nav.querySelector('a[href="./contact.html"]');
      if (contact) nav.insertBefore(pricing, contact);
      else nav.appendChild(pricing);
    }

    pricing.href = './pricing.html';
    pricing.textContent = 'PRICING';
    if (nav.classList.contains('global-nav')) pricing.dataset.nav = 'pricing';
    else pricing.removeAttribute('data-nav');
  });

  document.querySelectorAll('.global-nav a').forEach((link) => {
    link.classList.remove('is-active');
    link.removeAttribute('aria-current');
  });

  const active = document.querySelector(`.global-nav [data-nav="${currentPage}"]`);
  if (active) {
    active.classList.add('is-active');
    active.setAttribute('aria-current', 'page');
  }
})();
