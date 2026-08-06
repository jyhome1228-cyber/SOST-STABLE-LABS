import { chromium } from 'playwright';
import { access, mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const project = {
  id: 'relim-outdoor-space-brand-website',
  slug: 'relim',
  url: 'https://re-lim.com/',
  title: 'RE:LIM Outdoor Space Brand Website',
  pageViews: [
    { key: 'about', url: 'https://re-lim.com/about.html', label: 'Brand Story' },
    { key: 'space', url: 'https://re-lim.com/space.html', label: 'Space Guide' },
    { key: 'guide', url: 'https://re-lim.com/guide.html', label: 'Use Guide' },
    { key: 'reservation', url: 'https://re-lim.com/reservation.html', label: 'Reservation Guide' },
    { key: 'faq', url: 'https://re-lim.com/faq.html', label: 'FAQ' }
  ]
};

const HIGH_RES_SCALE = 2;
const DESKTOP_VIEWPORT = { width: 1440, height: 900 };
const MOBILE_VIEWPORT = { width: 390, height: 844 };
const version = new Date().toISOString().replace(/\D/g, '').slice(0, 12);
const outputDirectory = path.resolve('assets', 'projects', project.slug);

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function preparePage(page, url) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120_000 });
  await page.waitForLoadState('networkidle', { timeout: 20_000 }).catch(() => {});
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  }).catch(() => {});
  await page.keyboard.press('Escape').catch(() => {});

  await page.addStyleTag({
    content: `
      html { scroll-behavior: auto !important; }
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition: none !important;
        caret-color: transparent !important;
      }
      [data-aos], [class*="animate" i], [class*="reveal" i] {
        opacity: 1 !important;
        visibility: visible !important;
        transform: none !important;
      }
      #ch-plugin,
      [id*="channel" i],
      [class*="floating" i],
      [class*="quick-menu" i],
      [class*="popup" i][style*="position: fixed"],
      [class*="modal" i][style*="position: fixed"] {
        display: none !important;
      }
    `
  });

  await page.evaluate(async () => {
    const step = 650;
    let current = 0;
    let maximum = Math.min(document.documentElement.scrollHeight, 70_000);
    while (current < maximum) {
      window.scrollTo(0, current);
      await new Promise((resolve) => setTimeout(resolve, 110));
      current += step;
      maximum = Math.min(document.documentElement.scrollHeight, 70_000);
    }
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 1200));
  });

  await page.waitForTimeout(1200);
}

async function captureViewport(page, filename, quality = 95) {
  await page.screenshot({
    path: path.join(outputDirectory, filename),
    type: 'jpeg',
    quality,
    fullPage: false,
    animations: 'disabled'
  });
}

async function captureDesktop(browser) {
  const page = await browser.newPage({ viewport: DESKTOP_VIEWPORT, deviceScaleFactor: HIGH_RES_SCALE });
  try {
    await preparePage(page, project.url);
    await captureViewport(page, 'desktop-main.jpg');

    const metrics = await page.evaluate(() => ({
      height: document.documentElement.scrollHeight,
      viewport: window.innerHeight
    }));
    const maxScroll = Math.max(0, metrics.height - metrics.viewport);

    for (const [index, fraction] of [0.34, 0.68].entries()) {
      await page.evaluate((top) => window.scrollTo(0, top), Math.round(maxScroll * fraction));
      await page.waitForTimeout(600);
      await captureViewport(page, `section-${String(index + 1).padStart(2, '0')}.jpg`, 94);
    }
  } finally {
    await page.close();
  }
}

async function captureDesktopFull(browser) {
  const page = await browser.newPage({ viewport: DESKTOP_VIEWPORT, deviceScaleFactor: 1 });
  try {
    await preparePage(page, project.url);
    await page.screenshot({
      path: path.join(outputDirectory, 'desktop-full.jpg'),
      type: 'jpeg',
      quality: 84,
      fullPage: true,
      animations: 'disabled'
    });
  } finally {
    await page.close();
  }
}

async function capturePageViews(browser) {
  const views = [];
  for (const view of project.pageViews) {
    const page = await browser.newPage({ viewport: DESKTOP_VIEWPORT, deviceScaleFactor: HIGH_RES_SCALE });
    const filename = `view-${view.key}.jpg`;
    try {
      await preparePage(page, view.url);
      await captureViewport(page, filename);
      views.push({ filename, label: view.label });
    } catch (error) {
      console.warn(`Page view skipped: ${view.url}`, error.message);
    } finally {
      await page.close();
    }
  }
  return views;
}

async function captureMobile(browser) {
  const page = await browser.newPage({
    viewport: MOBILE_VIEWPORT,
    deviceScaleFactor: HIGH_RES_SCALE,
    isMobile: true,
    hasTouch: true
  });
  try {
    await preparePage(page, project.url);
    await captureViewport(page, 'mobile-main.jpg');

    const metrics = await page.evaluate(() => ({
      height: document.documentElement.scrollHeight,
      viewport: window.innerHeight
    }));
    const maxScroll = Math.max(0, metrics.height - metrics.viewport);
    await page.evaluate((top) => window.scrollTo(0, top), Math.round(maxScroll * 0.58));
    await page.waitForTimeout(600);
    await captureViewport(page, 'mobile-section-01.jpg', 94);
  } finally {
    await page.close();
  }
}

async function captureMobileFull(browser) {
  const page = await browser.newPage({
    viewport: MOBILE_VIEWPORT,
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true
  });
  try {
    await preparePage(page, project.url);
    await page.screenshot({
      path: path.join(outputDirectory, 'mobile-full.jpg'),
      type: 'jpeg',
      quality: 84,
      fullPage: true,
      animations: 'disabled'
    });
  } finally {
    await page.close();
  }
}

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({ headless: true });
let pageViews = [];
try {
  await captureDesktop(browser);
  await captureDesktopFull(browser);
  pageViews = await capturePageViews(browser);
  await captureMobile(browser);
  await captureMobileFull(browser);
} finally {
  await browser.close();
}

const required = ['desktop-main.jpg', 'desktop-full.jpg', 'mobile-main.jpg', 'mobile-full.jpg'];
const ready = (await Promise.all(required.map((name) => exists(path.join(outputDirectory, name))))).every(Boolean);
if (!ready) throw new Error('Required RE:LIM captures were not generated.');

const overrideScript = `(() => {
  'use strict';
  const project = (Array.isArray(window.SOST_PROJECTS) ? window.SOST_PROJECTS : [])
    .find((item) => item.id === '${project.id}');
  if (!project) return;

  const base = './assets/projects/${project.slug}';
  const asset = (filename) => \`${'${base}'}/${'${filename}'}?v=${version}\`;
  const pageViews = ${JSON.stringify(pageViews, null, 2)};

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
`;

await writeFile(path.resolve('data', 'project-relim-captures.js'), overrideScript, 'utf8');
console.log('Generated RE:LIM high-resolution portfolio captures.');
