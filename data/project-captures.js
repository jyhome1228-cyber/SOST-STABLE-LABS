(() => {
  'use strict';

  const captures = {
  "aesost-career-content-platform": {
    "base": "./assets/projects/aesost",
    "title": "AESOST Career Content Platform",
    "version": "202608060012",
    "desktopSections": [
      "section-01.jpg"
    ],
    "visual": "",
    "pageViews": [
      {
        "filename": "view-magazine.jpg",
        "label": "Magazine Archive"
      },
      {
        "filename": "view-article.jpg",
        "label": "Article Library"
      },
      {
        "filename": "view-column.jpg",
        "label": "Column Archive"
      },
      {
        "filename": "view-consulting.jpg",
        "label": "Career Consulting"
      }
    ],
    "mobileSections": [
      "mobile-section-01.jpg"
    ]
  },
  "tne-corporate-website": {
    "base": "./assets/projects/tne",
    "title": "TNE Corporate Website",
    "version": "202608060012",
    "desktopSections": [
      "section-01.jpg",
      "section-02.jpg",
      "section-03.jpg"
    ],
    "visual": "",
    "pageViews": [],
    "mobileSections": [
      "mobile-section-01.jpg",
      "mobile-section-02.jpg"
    ]
  },
  "thomastone-digital-healthcare-website": {
    "base": "./assets/projects/thomastone",
    "title": "THOMASTONE Digital Healthcare Website",
    "version": "202608060012",
    "desktopSections": [
      "section-01.jpg",
      "section-02.jpg",
      "section-03.jpg"
    ],
    "visual": "visual.jpg",
    "pageViews": [],
    "mobileSections": [
      "mobile-section-01.jpg"
    ]
  },
  "pentagon-law-office-corporate-center": {
    "base": "./assets/projects/pentagon",
    "title": "PENTAGON Law Office & Corporate Center",
    "version": "202608060012",
    "desktopSections": [
      "section-01.jpg"
    ],
    "visual": "",
    "pageViews": [],
    "mobileSections": [
      "mobile-section-01.jpg"
    ]
  }
};
  const projects = Array.isArray(window.SOST_PROJECTS) ? window.SOST_PROJECTS : [];

  projects.forEach((project) => {
    const capture = captures[project.id];
    if (!capture) return;

    const asset = (filename) => `${capture.base}/${filename}?v=${capture.version}`;
    const generatedGallery = [
      { image: asset('desktop-main.jpg'), label: 'Main Desktop View', layout: 'desktop' },
      ...(capture.pageViews || []).map((view) => ({
        image: asset(view.filename),
        label: view.label,
        layout: 'menu'
      })),
      ...capture.desktopSections.map((filename, index) => ({
        image: asset(filename),
        label: `Key Section ${String(index + 1).padStart(2, '0')}`,
        layout: 'section'
      })),
      ...(capture.visual ? [{ image: asset(capture.visual), label: 'Visual Detail', layout: 'visual' }] : []),
      { image: asset('mobile-main.jpg'), label: 'Mobile Main View', layout: 'mobile' },
      ...capture.mobileSections.map((filename, index) => ({
        image: asset(filename),
        label: `Mobile Section ${String(index + 1).padStart(2, '0')}`,
        layout: 'mobile'
      })),
      { image: asset('desktop-full.jpg'), label: 'Full Website Scroll', layout: 'scroll' }
    ];

    const originalGallery = Array.isArray(project.gallery)
      ? project.gallery.filter((item) => item?.image && !String(item.image).includes('/assets/projects/'))
      : [];

    project.thumbnail = asset('desktop-main.jpg');
    project.hero = asset('desktop-main.jpg');
    project.gallery = [...generatedGallery, ...originalGallery.map((item) => ({ ...item, layout: item.layout || 'editorial' }))];
    project.hasAutomatedCapture = true;
  });
})();
