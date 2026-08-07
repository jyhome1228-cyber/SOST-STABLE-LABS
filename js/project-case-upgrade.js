(() => {
  'use strict';

  document.getElementById('project-case-upgrade-style')?.remove();
  const style = document.createElement('style');
  style.id = 'project-case-upgrade-style';
  style.textContent = `
    /* Overall readability */
    .project-detail .project-detail-title > h1 + p {
      max-width: 830px !important;
      font-size: 18px !important;
      line-height: 1.85 !important;
    }

    .project-detail .project-summary-list dd {
      font-size: 14px !important;
      line-height: 1.7 !important;
    }

    .project-detail .case-copy-large p {
      max-width: 980px !important;
      font-size: clamp(24px, 1.9vw, 31px) !important;
      line-height: 1.64 !important;
    }

    .project-detail .case-content-grid article > p {
      max-width: 650px !important;
      font-size: 17px !important;
      line-height: 1.9 !important;
    }

    .project-detail .case-content-grid h2 {
      font-size: clamp(24px, 2vw, 30px) !important;
    }

    .project-detail .case-section-heading h2,
    .project-detail .result-layout h2 {
      font-size: clamp(28px, 2.35vw, 36px) !important;
      line-height: 1.34 !important;
    }

    .project-detail .result-list li {
      padding: 20px 0 !important;
      font-size: 17px !important;
      line-height: 1.75 !important;
    }

    .project-detail .project-information dd,
    .project-detail .project-information dt {
      font-size: 14px !important;
      line-height: 1.7 !important;
    }

    .project-detail .detail-tags span {
      padding: 9px 12px !important;
      font-size: 12px !important;
    }

    body[data-page='projects'] .portfolio-card-description {
      font-size: 16px !important;
      line-height: 1.78 !important;
    }

    /* What we built infographic */
    .project-detail .case-build-section {
      position: relative;
      overflow: hidden;
      background:
        radial-gradient(circle at 84% 10%, rgba(170,183,250,.08), transparent 34%),
        #08090b;
    }

    .project-detail .case-build-heading > div:last-child > p {
      max-width: 850px;
      margin-top: 20px;
      color: var(--text-soft);
      font-size: 18px;
      line-height: 1.8;
    }

    .project-detail .case-build-flow {
      position: relative;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 18px;
      margin-top: 58px;
    }

    .project-detail .case-build-card {
      position: relative;
      min-height: 390px;
      padding: 30px;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 4px;
      background: rgba(255,255,255,.018);
    }

    .project-detail .case-build-card::before {
      position: absolute;
      top: 0;
      right: 0;
      width: 110px;
      height: 110px;
      border-bottom: 1px solid rgba(170,183,250,.13);
      border-left: 1px solid rgba(170,183,250,.13);
      border-radius: 0 0 0 100%;
      content: '';
    }

    .project-detail .case-build-card:not(:last-child)::after {
      position: absolute;
      z-index: 4;
      top: 50%;
      right: -28px;
      display: grid;
      width: 38px;
      height: 38px;
      place-items: center;
      border: 1px solid rgba(170,183,250,.35);
      border-radius: 50%;
      background: #08090b;
      color: var(--point);
      font-size: 15px;
      content: '→';
      transform: translateY(-50%);
    }

    .project-detail .case-build-card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      color: var(--point);
    }

    .project-detail .case-build-card-top span {
      font-size: 12px;
      letter-spacing: .08em;
    }

    .project-detail .case-build-card-top p {
      color: rgba(255,255,255,.48);
      font-size: 11px;
      font-weight: 650;
      letter-spacing: .11em;
    }

    .project-detail .case-build-card h3 {
      max-width: 95%;
      margin-top: 68px;
      font-size: clamp(23px, 1.85vw, 29px);
      font-weight: 560;
      line-height: 1.35;
      letter-spacing: -.035em;
    }

    .project-detail .case-build-description {
      margin-top: 22px;
      color: var(--text-soft);
      font-size: 16.5px;
      line-height: 1.82;
    }

    .project-detail .case-build-outcome {
      position: absolute;
      right: 30px;
      bottom: 30px;
      left: 30px;
      padding-top: 19px;
      border-top: 1px solid rgba(255,255,255,.1);
    }

    .project-detail .case-build-outcome small {
      display: block;
      margin-bottom: 8px;
      color: rgba(255,255,255,.36);
      font-size: 9px;
      letter-spacing: .13em;
    }

    .project-detail .case-build-outcome strong {
      color: var(--point);
      font-size: 14px;
      font-weight: 560;
    }

    /* Function infographic cards */
    .project-detail .system-feature-grid article {
      position: relative;
      min-height: 230px !important;
      overflow: hidden;
      padding: 28px 30px 30px !important;
      background: rgba(255,255,255,.008);
    }

    .project-detail .system-feature-grid article > span {
      position: relative;
      z-index: 2;
      font-size: 11px !important;
      letter-spacing: .08em;
    }

    .project-detail .system-feature-mark {
      position: absolute;
      right: 20px;
      bottom: -18px;
      color: rgba(170,183,250,.055);
      font-size: 112px;
      font-weight: 650;
      line-height: 1;
      letter-spacing: -.08em;
    }

    .project-detail .system-feature-grid h3 {
      position: relative;
      z-index: 2;
      max-width: 82% !important;
      margin-top: 78px !important;
      font-size: 18px !important;
      font-weight: 540 !important;
      line-height: 1.55 !important;
    }

    /* Hero live link */
    .project-detail .project-live-link {
      display: inline-flex !important;
      min-height: 52px;
      align-items: center;
      justify-content: center;
      margin-top: 32px !important;
      padding: 0 22px;
      border: 1px solid rgba(170,183,250,.38);
      border-radius: 2px;
      color: #e7eaff !important;
      font-size: 14px !important;
      font-weight: 600;
      letter-spacing: -.01em;
      transition: background .25s ease, border-color .25s ease, transform .25s ease;
    }

    .project-detail .project-live-link:hover {
      transform: translateY(-2px);
      border-color: rgba(170,183,250,.7);
      background: rgba(170,183,250,.08);
    }

    /* Large live-site CTA */
    .project-site-cta-section {
      border-top: 1px solid rgba(255,255,255,.1);
      background: var(--point);
      color: #08090b;
    }

    .project-site-cta {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(280px, .7fr);
      gap: 70px;
      align-items: end;
      padding-top: 76px;
      padding-bottom: 76px;
    }

    .project-site-cta .eyebrow {
      color: rgba(8,9,11,.52);
    }

    .project-site-cta h2 {
      margin-top: 18px;
      font-size: clamp(34px, 3.5vw, 54px);
      font-weight: 590;
      line-height: 1.2;
      letter-spacing: -.05em;
    }

    .project-site-cta > div > span {
      display: block;
      margin-top: 20px;
      color: rgba(8,9,11,.48);
      font-size: 13px;
      letter-spacing: .04em;
    }

    .project-site-cta > a {
      display: flex;
      min-height: 92px;
      align-items: center;
      justify-content: space-between;
      gap: 30px;
      padding: 0 30px;
      border: 1px solid #08090b;
      background: #08090b;
      color: #fff;
      transition: transform .28s ease, box-shadow .28s ease;
    }

    .project-site-cta > a:hover {
      transform: translateY(-4px);
      box-shadow: 0 18px 40px rgba(8,9,11,.18);
    }

    .project-site-cta > a span {
      font-size: 17px;
      font-weight: 620;
    }

    .project-site-cta > a strong {
      font-size: 30px;
      font-weight: 400;
    }

    @media (max-width: 1100px) {
      .project-detail .case-build-flow {
        grid-template-columns: 1fr;
      }

      .project-detail .case-build-card {
        min-height: 330px;
      }

      .project-detail .case-build-card:not(:last-child)::after {
        top: auto;
        right: 50%;
        bottom: -29px;
        content: '↓';
        transform: translateX(50%);
      }

      .project-site-cta {
        grid-template-columns: 1fr;
        gap: 42px;
      }
    }

    @media (max-width: 760px) {
      .project-detail .project-detail-title > h1 + p {
        font-size: 16px !important;
      }

      .project-detail .case-copy-large p {
        font-size: 22px !important;
      }

      .project-detail .case-content-grid article > p,
      .project-detail .case-build-heading > div:last-child > p {
        font-size: 16px !important;
      }

      .project-detail .case-build-flow {
        margin-top: 38px;
      }

      .project-detail .case-build-card {
        min-height: 360px;
        padding: 24px;
      }

      .project-detail .case-build-card h3 {
        margin-top: 54px;
        font-size: 24px;
      }

      .project-detail .case-build-description {
        font-size: 15.5px;
      }

      .project-detail .case-build-outcome {
        right: 24px;
        bottom: 24px;
        left: 24px;
      }

      .project-detail .system-feature-grid h3 {
        font-size: 17px !important;
      }

      .project-site-cta {
        padding-top: 60px;
        padding-bottom: 60px;
      }

      .project-site-cta h2 {
        font-size: 34px;
      }

      .project-site-cta > a {
        min-height: 78px;
        padding: 0 22px;
      }
    }
  `;

  document.head.appendChild(style);
})();
