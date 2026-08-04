(() => {
  'use strict';

  document.getElementById('project-detail-force-style')?.remove();

  const style = document.createElement('style');
  style.id = 'project-detail-force-style';
  style.textContent = `
    body[data-page='projects'] .project-detail .shell {
      width: min(calc(100% - 96px), 1440px) !important;
      max-width: none !important;
      margin-inline: auto !important;
      padding-inline: 0 !important;
    }

    .project-detail .project-detail-hero {
      padding: calc(var(--header-height) + 64px) 0 84px !important;
    }

    .project-detail .project-detail-head {
      grid-template-columns: minmax(0, 1fr) 290px !important;
      gap: clamp(44px, 5vw, 72px) !important;
      align-items: end !important;
    }

    .project-detail .project-detail-title .eyebrow {
      margin: 0 0 24px !important;
      font-size: 11px !important;
      line-height: 1.45 !important;
      letter-spacing: .11em !important;
    }

    .project-detail .project-detail-title h1 {
      max-width: 900px !important;
      margin: 0 !important;
      font-size: clamp(36px, 3.35vw, 52px) !important;
      font-weight: 470 !important;
      line-height: 1.14 !important;
      letter-spacing: -.045em !important;
    }

    .project-detail .project-detail-title > h1 + p {
      max-width: 780px !important;
      margin: 30px 0 0 !important;
      color: var(--text-soft) !important;
      font-size: 16px !important;
      font-weight: 400 !important;
      line-height: 1.85 !important;
      letter-spacing: -.01em !important;
    }

    .project-detail .project-live-link {
      display: inline-flex !important;
      margin-top: 32px !important;
      font-size: 13px !important;
      line-height: 1.4 !important;
    }

    .project-detail .project-summary-list > div {
      grid-template-columns: 82px 1fr !important;
      padding: 13px 0 !important;
    }

    .project-detail .project-summary-list dt {
      font-size: 10px !important;
    }

    .project-detail .project-summary-list dd {
      font-size: 13px !important;
      line-height: 1.65 !important;
    }

    .project-detail .project-hero-visual {
      margin-top: 52px !important;
    }

    .project-detail .case-section,
    .project-detail .project-gallery-section {
      padding: 88px 0 !important;
    }

    .project-detail .case-two-column,
    .project-detail .case-section-heading {
      grid-template-columns: 150px minmax(0, 1fr) !important;
      gap: clamp(40px, 5vw, 68px) !important;
    }

    .project-detail .case-label {
      padding-top: 3px !important;
      gap: 12px !important;
      font-size: 10.5px !important;
      line-height: 1.4 !important;
      letter-spacing: .1em !important;
    }

    .project-detail .case-copy-large p {
      max-width: 850px !important;
      margin: 0 !important;
      font-size: clamp(19px, 1.45vw, 26px) !important;
      font-weight: 410 !important;
      line-height: 1.72 !important;
      letter-spacing: -.024em !important;
    }

    .project-detail .case-content-grid {
      border-top: 1px solid var(--line) !important;
      border-bottom: 1px solid var(--line) !important;
      background: transparent !important;
    }

    .project-detail .case-content-grid article {
      min-height: 300px !important;
      padding: 46px 50px 50px 0 !important;
      background: transparent !important;
    }

    .project-detail .case-content-grid article + article {
      padding-right: 0 !important;
      padding-left: 50px !important;
      border-left: 1px solid var(--line) !important;
    }

    .project-detail .case-content-grid h2 {
      margin: 48px 0 0 !important;
      font-size: clamp(22px, 1.85vw, 28px) !important;
      font-weight: 510 !important;
      line-height: 1.35 !important;
      letter-spacing: -.032em !important;
    }

    .project-detail .case-content-grid article > p {
      max-width: 600px !important;
      margin: 22px 0 0 !important;
      font-size: 15px !important;
      line-height: 1.9 !important;
      letter-spacing: -.005em !important;
    }

    .project-detail .case-section-heading {
      margin-bottom: 42px !important;
      align-items: start !important;
    }

    .project-detail .case-section-heading h2,
    .project-detail .result-layout h2 {
      margin: 0 !important;
      font-size: clamp(24px, 2.05vw, 32px) !important;
      font-weight: 500 !important;
      line-height: 1.38 !important;
      letter-spacing: -.035em !important;
    }

    .project-detail .system-feature-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    }

    .project-detail .system-feature-grid article {
      min-height: 170px !important;
      padding: 24px 26px 26px !important;
    }

    .project-detail .system-feature-grid span {
      font-size: 10.5px !important;
    }

    .project-detail .system-feature-grid h3 {
      max-width: 94% !important;
      margin: 52px 0 0 !important;
      font-size: 15.5px !important;
      font-weight: 510 !important;
      line-height: 1.58 !important;
      letter-spacing: -.018em !important;
    }

    .project-detail .project-gallery-grid {
      gap: 48px 20px !important;
    }

    .project-detail .project-gallery-item figcaption {
      margin-top: 13px !important;
      font-size: 11px !important;
    }

    .project-detail .detail-placeholder strong,
    .project-detail .project-hero-visual .detail-placeholder strong {
      font-size: clamp(16px, 1.25vw, 20px) !important;
      line-height: 1.45 !important;
    }

    .project-detail .result-layout {
      grid-template-columns: minmax(0, 1fr) 370px !important;
      gap: clamp(52px, 7vw, 96px) !important;
    }

    .project-detail .result-list {
      margin-top: 34px !important;
    }

    .project-detail .result-list li {
      padding: 16px 0 !important;
      font-size: 15px !important;
      line-height: 1.75 !important;
    }

    .project-detail .project-information {
      padding: 30px !important;
    }

    .project-detail .project-information h3 {
      font-size: 11px !important;
    }

    .project-detail .next-project h2 {
      font-size: clamp(24px, 2vw, 32px) !important;
      line-height: 1.35 !important;
    }

    @media (max-width: 1100px) {
      body[data-page='projects'] .project-detail .shell {
        width: min(calc(100% - 48px), 1440px) !important;
      }

      .project-detail .project-detail-head {
        grid-template-columns: 1fr !important;
      }

      .project-detail .project-summary-list {
        max-width: 560px !important;
        margin-top: 18px !important;
      }

      .project-detail .case-two-column,
      .project-detail .case-section-heading {
        grid-template-columns: 130px minmax(0, 1fr) !important;
        gap: 38px !important;
      }

      .project-detail .system-feature-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      }

      .project-detail .result-layout {
        grid-template-columns: 1fr !important;
      }
    }

    @media (max-width: 760px) {
      body[data-page='projects'] .project-detail .shell {
        width: calc(100% - 32px) !important;
      }

      .project-detail .project-detail-hero {
        padding: calc(var(--header-height) + 42px) 0 68px !important;
      }

      .project-detail .project-detail-title .eyebrow {
        margin-bottom: 18px !important;
      }

      .project-detail .project-detail-title h1 {
        font-size: clamp(30px, 9vw, 38px) !important;
        line-height: 1.18 !important;
      }

      .project-detail .project-detail-title > h1 + p {
        margin-top: 22px !important;
        font-size: 15px !important;
        line-height: 1.8 !important;
      }

      .project-detail .project-live-link {
        margin-top: 26px !important;
      }

      .project-detail .case-section,
      .project-detail .project-gallery-section {
        padding: 68px 0 !important;
      }

      .project-detail .case-two-column,
      .project-detail .case-section-heading {
        grid-template-columns: 1fr !important;
        gap: 22px !important;
      }

      .project-detail .case-copy-large p {
        max-width: 100% !important;
        font-size: clamp(18px, 5.7vw, 22px) !important;
        line-height: 1.7 !important;
      }

      .project-detail .case-content-grid,
      .project-detail .system-feature-grid,
      .project-detail .project-gallery-grid {
        grid-template-columns: 1fr !important;
      }

      .project-detail .case-content-grid article,
      .project-detail .case-content-grid article + article {
        min-height: 0 !important;
        padding: 38px 0 42px !important;
        border-left: 0 !important;
        border-bottom: 1px solid var(--line) !important;
      }

      .project-detail .case-content-grid h2 {
        margin-top: 34px !important;
        font-size: 23px !important;
      }

      .project-detail .case-section-heading h2,
      .project-detail .result-layout h2 {
        font-size: 24px !important;
      }

      .project-detail .system-feature-grid article {
        min-height: 150px !important;
      }

      .project-detail .system-feature-grid h3 {
        margin-top: 44px !important;
        font-size: 15px !important;
      }

      .project-detail .project-information {
        padding: 24px 20px !important;
      }
    }
  `;

  document.head.appendChild(style);
})();
