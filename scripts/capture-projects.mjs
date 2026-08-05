import { chromium } from 'playwright';
import { access, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const projects = [
  {
    id: 'aesost-career-content-platform',
    slug: 'aesost',
    url: 'https://aesost.com/',
    title: 'AESOST Career Content Platform'
  },
  {
    id: 'tne-corporate-website',
    slug: 'tne',
    url: 'https://tneepc.com/',
    title: 'TNE Corporate Website'
  },
  {
    id: 'thomastone-digital-healthcare-website',
    slug: 'thomastone',
    url: 'https://www.thomastone.co.kr/',
    title: 'THOMASTONE Digital Healthcare Website'
  },
  {
    id: 'pentagon-law-office-corporate-center',
    slug: 'pentagon',
    url: 'https://www.ptglaw.co.kr/',
    title: 'PENTAGON Law Office & Corporate Center'
  }
];

const browser = await chromium.launch({ headless: true });
const completed = [];

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function prepareImwebPage(page, url) {
  await page.goto(url, {
    waitUntil: 'domcontentloaded',
    timeout: 120_000
  });

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
      #ch-plugin,
      [id*="channel" i],
      [class*="channel-talk" i],
      [class*="floating" i],
      [class*="quick-menu" i],
      [class*="quick_menu" i],
      [class*="kakao" i][class*="button" i],
      [class*="popup" i][style*="position: fixed"],
      [class*="modal" i][style*="position: fixed"] {
        display: none !important;
      }
    `
  });

  await page.evaluate(async () => {
    const step = 700;
    const delay = 140;
    let current = 0;
    const max = Math.min(document.documentElement.scrollHeight, 60_000);

    while (current < max) {
      window.scrollTo(0, current);
      await new Promise((resolve) => setTimeout(resolve, delay));
      current += step;
    }

    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 1200));
  });

  await page.waitForTimeout(1800);
}

async function captureDesktop(project, outputDirectory) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });

  try {
    await prepareImwebPage(page, project.url);

    await page.screenshot({
      path: path.join(outputDirectory, 'thumbnail.jpg'),
      type: 'jpeg',
      quality: 88,
      fullPage: false
    });

    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.screenshot({
      path: path.join(outputDirectory, 'desktop.jpg'),
      type: 'jpeg',
      quality: 86,
      fullPage: false
    });

    await page.screenshot({
      path: path.join(outputDirectory, 'desktop-full.jpg'),
      type: 'jpeg',
      quality: 76,
      fullPage: true
    });
  } finally {
    await page.close();
  }
}

async function captureMobile(project, outputDirectory) {
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true
  });

  try {
    await prepareImwebPage(page, project.url);

    await page.screenshot({
      path: path.join(outputDirectory, 'mobile.jpg'),
      type: 'jpeg',
      quality: 86,
      fullPage: false
    });
  } finally {
    await page.close();
  }
}

for (const project of projects) {
  const outputDirectory = path.resolve('assets', 'projects', project.slug);
  await mkdir(outputDirectory, { recursive: true });

  console.log(`Capturing ${project.title}: ${project.url}`);

  try {
    await captureDesktop(project, outputDirectory);
    await captureMobile(project, outputDirectory);

    const requiredFiles = ['thumbnail.jpg', 'desktop.jpg', 'desktop-full.jpg', 'mobile.jpg'];
    const ready = (await Promise.all(requiredFiles.map((name) => exists(path.join(outputDirectory, name))))).every(Boolean);

    if (ready) completed.push(project);
  } catch (error) {
    console.error(`Capture failed for ${project.title}`, error);
  }
}

await browser.close();

if (!completed.length) {
  throw new Error('No project screenshots were generated.');
}

const captureMap = Object.fromEntries(
  completed.map((project) => [
    project.id,
    {
      base: `./assets/projects/${project.slug}`,
      title: project.title
    }
  ])
);

const overrideScript = `(() => {
  'use strict';

  const captures = ${JSON.stringify(captureMap, null, 2)};
  const projects = Array.isArray(window.SOST_PROJECTS) ? window.SOST_PROJECTS : [];

  projects.forEach((project) => {
    const capture = captures[project.id];
    if (!capture) return;

    const generatedGallery = [
      { image: \`${'${capture.base}'}/desktop-full.jpg\`, label: 'Desktop Full Page Preview' },
      { image: \`${'${capture.base}'}/desktop.jpg\`, label: 'Desktop Main View' },
      { image: \`${'${capture.base}'}/mobile.jpg\`, label: 'Mobile Responsive View' }
    ];

    const originalGallery = Array.isArray(project.gallery)
      ? project.gallery.filter((item) => item?.image)
      : [];

    project.thumbnail = \`${'${capture.base}'}/thumbnail.jpg\`;
    project.hero = \`${'${capture.base}'}/desktop.jpg\`;
    project.gallery = [...generatedGallery, ...originalGallery];
  });
})();
`;

await writeFile(path.resolve('data', 'project-captures.js'), overrideScript, 'utf8');
console.log(`Generated captures for ${completed.length} projects.`);
