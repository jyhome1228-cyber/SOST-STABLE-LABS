(() => {
  'use strict';
  const project = (Array.isArray(window.SOST_PROJECTS) ? window.SOST_PROJECTS : [])
    .find((item) => item.id === 'jn-costech-cosmetic-oem-odm-website');
  if (!project) return;
  const base = './assets/projects/jncostech';
  const asset = (filename) => `${base}/${filename}?v=202608070333`;
  project.thumbnail = asset('desktop-main.jpg');
  project.hero = asset('desktop-main.jpg');
  project.gallery = [
    { image: asset('desktop-main.jpg'), label: 'Main B2B Website', layout: 'desktop' },
    { image: asset('section-core-business.jpg'), label: 'Core Business Areas', layout: 'section' },
    { image: asset('section-technology.jpg'), label: 'Technology Highlights', layout: 'section' },
    { image: asset('section-inquiry.jpg'), label: 'OEM / ODM Inquiry Flow', layout: 'section' },
    { image: asset('mobile-main.jpg'), label: 'Mobile Main View', layout: 'mobile' },
    { image: asset('mobile-technology.jpg'), label: 'Mobile Technology View', layout: 'mobile' },
    { image: asset('desktop-full.jpg'), label: 'Full Website Scroll', layout: 'scroll' }
  ];
  project.hasAutomatedCapture = true;
})();
