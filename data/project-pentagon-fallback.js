(() => {
  'use strict';

  const project = (Array.isArray(window.SOST_PROJECTS) ? window.SOST_PROJECTS : [])
    .find((item) => item.id === 'pentagon-law-office-corporate-center');

  if (!project) return;

  const images = [
    'https://cdn.imweb.me/upload/S2023030963558ef55ba8e/29f71c1f7f0b6.png',
    'https://cdn.imweb.me/upload/S2023030963558ef55ba8e/405cd96d778ac.png',
    'https://cdn.imweb.me/upload/S2023030963558ef55ba8e/bc80985d2cbb8.png',
    'https://cdn.imweb.me/upload/S2023030963558ef55ba8e/b36aaedb6df1e.png'
  ];

  project.thumbnail = images[0];
  project.hero = images[1];
  project.gallery = [
    { image: images[0], label: 'Law Office Main Experience', layout: 'editorial' },
    { image: images[1], label: 'Corporate Establishment Center', layout: 'editorial' },
    { image: images[2], label: 'Legal Service Information Structure', layout: 'editorial' },
    { image: images[3], label: 'Consultation & Responsive Interface', layout: 'editorial' }
  ];
  project.hasAutomatedCapture = false;
})();
