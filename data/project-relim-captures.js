(() => {
  'use strict';
  const project = (Array.isArray(window.SOST_PROJECTS) ? window.SOST_PROJECTS : [])
    .find((item) => item.id === 'relim-outdoor-space-brand-website');
  if (!project) return;

  const base = './assets/projects/relim';
  const asset = (filename) => `${base}/${filename}?v=202608062231`;
  const pageViews = [
  {
    "filename": "view-about.jpg",
    "label": "Brand Story"
  },
  {
    "filename": "view-space.jpg",
    "label": "Space Guide"
  },
  {
    "filename": "view-guide.jpg",
    "label": "Use Guide"
  },
  {
    "filename": "view-reservation.jpg",
    "label": "Reservation Guide"
  },
  {
    "filename": "view-faq.jpg",
    "label": "FAQ"
  }
];

  project.thumbnail = asset('desktop-main.jpg');
  project.hero = asset('desktop-main.jpg');
  project.gallery = [
    { image: asset('desktop-main.jpg'), label: 'Main Brand Experience', layout: 'desktop' },
    ...pageViews.map((view) => ({ image: asset(view.filename), label: view.label, layout: 'menu' })),
    { image: asset('section-01.jpg'), label: 'Space & Reservation Experience', layout: 'section' },
    { image: asset('section-02.jpg'), label: 'Brand Content & Visit Flow', layout: 'section' },
    { image: asset('mobile-main.jpg'), label: 'Mobile Main View', layout: 'mobile' },
    { image: asset('mobile-section-01.jpg'), label: 'Mobile Reservation Flow', layout: 'mobile' },
    { image: asset('desktop-full.jpg'), label: 'Full Website Scroll', layout: 'scroll' }
  ];
  project.hasAutomatedCapture = true;
})();
