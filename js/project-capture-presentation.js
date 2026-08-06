(() => {
  'use strict';

  const projects = Array.isArray(window.SOST_PROJECTS) ? window.SOST_PROJECTS : [];

  projects.forEach((project) => {
    if (!project.hasAutomatedCapture || !project.thumbnail) return;

    const thumbnail = String(project.thumbnail);
    const separatorIndex = thumbnail.indexOf('?');
    const query = separatorIndex >= 0 ? thumbnail.slice(separatorIndex) : '';
    const cleanThumbnail = separatorIndex >= 0 ? thumbnail.slice(0, separatorIndex) : thumbnail;
    const base = cleanThumbnail.replace(/\/desktop-main\.jpg$/, '');
    const gallery = Array.isArray(project.gallery) ? project.gallery : [];

    const generated = gallery.filter((item) => item?.layout !== 'editorial');
    const editorial = gallery.filter((item) => item?.layout === 'editorial').slice(0, 1);
    const hasMobileFull = generated.some((item) => item?.layout === 'mobile-scroll');

    if (!hasMobileFull) {
      const desktopScrollIndex = generated.findIndex((item) => item?.layout === 'scroll');
      const mobileFull = {
        image: `${base}/mobile-full.jpg${query}`,
        label: 'Full Mobile Scroll',
        layout: 'mobile-scroll'
      };

      if (desktopScrollIndex >= 0) generated.splice(desktopScrollIndex, 0, mobileFull);
      else generated.push(mobileFull);
    }

    project.gallery = [...generated, ...editorial];
  });

  const style = document.createElement('style');
  style.id = 'project-capture-presentation-style';
  style.textContent = `
    .project-detail .project-gallery-item.layout-mobile-scroll {
      grid-column: span 4;
      width: 100%;
      max-width: 410px;
      justify-self: center;
    }

    .project-detail .layout-mobile-scroll .project-gallery-visual {
      position: relative;
      max-height: 720px;
      overflow-x: hidden !important;
      overflow-y: auto !important;
      padding: 10px;
      border: 1px solid rgba(255,255,255,.16) !important;
      border-radius: 32px;
      background: #111318 !important;
      box-shadow: 0 28px 80px rgba(0,0,0,.3);
      scrollbar-color: rgba(170,183,250,.55) rgba(255,255,255,.04);
      scrollbar-width: thin;
    }

    .project-detail .layout-mobile-scroll .project-gallery-visual::before {
      position: absolute;
      z-index: 2;
      top: 5px;
      left: 50%;
      width: 72px;
      height: 16px;
      border-radius: 0 0 10px 10px;
      background: #111318;
      content: '';
      transform: translateX(-50%);
    }

    .project-detail .layout-mobile-scroll .project-gallery-visual > img {
      display: block;
      width: 100% !important;
      height: auto !important;
      border-radius: 23px;
      object-fit: contain !important;
      object-position: top center !important;
      background: #fff;
    }

    .project-detail .layout-mobile-scroll figcaption::after {
      content: 'MOBILE SCROLL';
      color: rgba(170,183,250,.7);
      font-size: 10px;
      letter-spacing: .08em;
    }

    @media (max-width: 1100px) {
      .project-detail .project-gallery-item.layout-mobile-scroll {
        grid-column: span 6;
      }
    }

    @media (max-width: 760px) {
      .project-detail .project-gallery-item.layout-mobile-scroll {
        grid-column: 1 !important;
        width: min(100%, 360px);
      }

      .project-detail .layout-mobile-scroll .project-gallery-visual {
        max-height: 620px;
      }
    }
  `;
  document.head.appendChild(style);
})();
