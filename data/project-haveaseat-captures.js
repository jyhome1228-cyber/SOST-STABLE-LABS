(() => {
  'use strict';
  const project = (Array.isArray(window.SOST_PROJECTS) ? window.SOST_PROJECTS : [])
    .find((item) => item.id === 'have-a-seat-furniture-brand-commerce');
  if (!project) return;

  const base = './assets/projects/haveaseat';
  const asset = (filename) => `${base}/${filename}?v=202608060419`;
  const pageViews = [
  {
    "filename": "view-portfolio.jpg",
    "label": "Space Portfolio"
  },
  {
    "filename": "view-products.jpg",
    "label": "Product Collection"
  },
  {
    "filename": "view-table.jpg",
    "label": "Table Category"
  },
  {
    "filename": "view-about.jpg",
    "label": "Brand Story"
  }
];

  project.thumbnail = asset('desktop-main.jpg');
  project.hero = asset('desktop-main.jpg');
  project.gallery = [
    { image: asset('desktop-main.jpg'), label: 'Main Brand Commerce', layout: 'desktop' },
    ...pageViews.map((view) => ({ image: asset(view.filename), label: view.label, layout: 'menu' })),
    { image: asset('section-01.jpg'), label: 'Featured Furniture & Portfolio', layout: 'section' },
    { image: asset('section-02.jpg'), label: 'Product, Review & Service Flow', layout: 'section' },
    { image: asset('mobile-main.jpg'), label: 'Mobile Main View', layout: 'mobile' },
    { image: asset('mobile-section-01.jpg'), label: 'Mobile Commerce Flow', layout: 'mobile' },
    { image: asset('desktop-full.jpg'), label: 'Full Website Scroll', layout: 'scroll' }
  ];
  project.hasAutomatedCapture = true;
})();
