(() => {
  'use strict';

  const body = document.body;
  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.global-nav');
  const navLinks = nav ? nav.querySelectorAll('a') : [];
  const yearTarget = document.querySelector('[data-year]');

  if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear();
  }

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 24);
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
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? '메뉴 열기' : '메뉴 닫기');
      nav.classList.toggle('is-open', !isOpen);
      body.classList.toggle('menu-open', !isOpen);
    });

    navLinks.forEach((link) => link.addEventListener('click', closeMenu));

    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach((element) => {
    const delay = element.dataset.delay;
    if (delay) element.style.setProperty('--delay', `${delay}ms`);
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  }

  const canvas = document.querySelector('#system-canvas');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!canvas || reducedMotion) return;

  const context = canvas.getContext('2d');
  if (!context) return;

  let width = 0;
  let height = 0;
  let ratio = 1;
  let frame = 0;
  let animationId = null;
  const pointer = { x: -1000, y: -1000, active: false };
  const nodes = [];

  const NODE_COUNT_DESKTOP = 38;
  const NODE_COUNT_MOBILE = 18;
  const MAX_DISTANCE = 150;

  const random = (min, max) => Math.random() * (max - min) + min;

  const createNodes = () => {
    nodes.length = 0;
    const count = width < 768 ? NODE_COUNT_MOBILE : NODE_COUNT_DESKTOP;

    for (let index = 0; index < count; index += 1) {
      nodes.push({
        x: random(0, width),
        y: random(0, height),
        vx: random(-0.16, 0.16),
        vy: random(-0.16, 0.16),
        radius: random(0.7, 1.7)
      });
    }
  };

  const resizeCanvas = () => {
    const bounds = canvas.getBoundingClientRect();
    ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, bounds.width);
    height = Math.max(1, bounds.height);
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    createNodes();
  };

  const distance = (a, b) => {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const draw = () => {
    context.clearRect(0, 0, width, height);

    nodes.forEach((node) => {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < -20) node.x = width + 20;
      if (node.x > width + 20) node.x = -20;
      if (node.y < -20) node.y = height + 20;
      if (node.y > height + 20) node.y = -20;

      if (pointer.active) {
        const pointerDistance = distance(node, pointer);
        if (pointerDistance < 180 && pointerDistance > 1) {
          const force = (180 - pointerDistance) / 180;
          node.x += ((node.x - pointer.x) / pointerDistance) * force * 0.45;
          node.y += ((node.y - pointer.y) / pointerDistance) * force * 0.45;
        }
      }
    });

    for (let first = 0; first < nodes.length; first += 1) {
      for (let second = first + 1; second < nodes.length; second += 1) {
        const nodeDistance = distance(nodes[first], nodes[second]);
        if (nodeDistance > MAX_DISTANCE) continue;

        const opacity = (1 - nodeDistance / MAX_DISTANCE) * 0.22;
        context.beginPath();
        context.moveTo(nodes[first].x, nodes[first].y);
        context.lineTo(nodes[second].x, nodes[second].y);
        context.strokeStyle = `rgba(167, 183, 255, ${opacity})`;
        context.lineWidth = 0.65;
        context.stroke();
      }
    }

    nodes.forEach((node) => {
      context.beginPath();
      context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      context.fillStyle = 'rgba(198, 207, 255, 0.58)';
      context.fill();
    });

    frame += 1;
    animationId = window.requestAnimationFrame(draw);
  };

  const updatePointer = (event) => {
    const bounds = canvas.getBoundingClientRect();
    pointer.x = event.clientX - bounds.left;
    pointer.y = event.clientY - bounds.top;
    pointer.active = true;
  };

  const deactivatePointer = () => {
    pointer.active = false;
  };

  const start = () => {
    if (animationId) return;
    animationId = window.requestAnimationFrame(draw);
  };

  const stop = () => {
    if (!animationId) return;
    window.cancelAnimationFrame(animationId);
    animationId = null;
  };

  resizeCanvas();
  start();

  window.addEventListener('resize', resizeCanvas);
  canvas.addEventListener('pointermove', updatePointer);
  canvas.addEventListener('pointerleave', deactivatePointer);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });
})();
