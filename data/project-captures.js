(() => {
  'use strict';

  const captures = {
  "aesost-career-content-platform": {
    "base": "./assets/projects/aesost",
    "title": "AESOST Career Content Platform"
  },
  "tne-corporate-website": {
    "base": "./assets/projects/tne",
    "title": "TNE Corporate Website"
  },
  "thomastone-digital-healthcare-website": {
    "base": "./assets/projects/thomastone",
    "title": "THOMASTONE Digital Healthcare Website"
  },
  "pentagon-law-office-corporate-center": {
    "base": "./assets/projects/pentagon",
    "title": "PENTAGON Law Office & Corporate Center"
  }
};
  const projects = Array.isArray(window.SOST_PROJECTS) ? window.SOST_PROJECTS : [];

  projects.forEach((project) => {
    const capture = captures[project.id];
    if (!capture) return;

    const generatedGallery = [
      { image: `${capture.base}/desktop-full.jpg`, label: 'Desktop Full Page Preview' },
      { image: `${capture.base}/desktop.jpg`, label: 'Desktop Main View' },
      { image: `${capture.base}/mobile.jpg`, label: 'Mobile Responsive View' }
    ];

    const originalGallery = Array.isArray(project.gallery)
      ? project.gallery.filter((item) => item?.image)
      : [];

    project.thumbnail = `${capture.base}/thumbnail.jpg`;
    project.hero = `${capture.base}/desktop.jpg`;
    project.gallery = [...generatedGallery, ...originalGallery];
  });
})();
