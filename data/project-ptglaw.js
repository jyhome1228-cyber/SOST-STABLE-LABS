(() => {
  'use strict';

  window.SOST_PROJECTS = Array.isArray(window.SOST_PROJECTS) ? window.SOST_PROJECTS : [];

  const id = 'pentagon-law-office-corporate-center';
  if (window.SOST_PROJECTS.some((project) => project?.id === id)) return;

  window.SOST_PROJECTS.push({
    id,
    title: 'PTG LAW',
    client: 'PTG LAW / 펜타곤 법률세무회계',
    year: '2026',
    category: 'web',
    categoryLabel: 'LEGAL · CONSULTING',
    url: 'https://www.ptglaw.co.kr/',
    displayDomain: 'ptglaw.co.kr',
    thumbPosition: '50% 8%',
    visualLabel: 'PTG LAW',
    excerpt: 'Legal · Tax Website, Professional Profiles, Case Linking & Inquiry Assistant',
    services: ['Imweb', 'Custom Code', 'Inquiry UX'],
    technologies: ['Imweb', 'HTML/CSS/JavaScript', 'Dynamic Content'],
    accent: 'blue',
    thumbnail: './assets/projects/pentagon/desktop-main.jpg'
  });
})();
