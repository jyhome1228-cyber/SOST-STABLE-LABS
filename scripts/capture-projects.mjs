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
const captureVersion = new Date().toISOString().replace(/\D/g, '').slice(0, 12);

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function preparePage(page, url) {
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
      [data-aos],
      [class*="animate" i],
      [class*="reveal" i] {
        opacity: 1 !important;
        visibility: visible !important;
        transform: none !important;
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
    const step = 650;
    const delay = 120;
    let current = 0;
    let max = Math.min(document.documentElement.scrollHeight, 70_000);

    while (current < max) {
      window.scrollTo(0, current);
      await new Promise((resolve) => setTimeout(resolve, delay));
      current += step;
      max = Math.min(document.documentElement.scrollHeight, 70_000);
    }

    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 1100));
  });

  await page.waitForTimeout(1500);
}

function pickSpread(items, count) {
  if (items.length <= count) return items;
  if (count === 1) return [items[0]];

  const chosen = [];
  for (let index = 0; index < count; index += 1) {
    const position = Math.round((items.length - 1) * (index / (count - 1)));
    if (!chosen.includes(items[position])) chosen.push(items[position]);
  }
  return chosen;
}

async function markSectionCandidates(page, prefix, mobile = false) {
  return page.evaluate(({ prefix, mobile }) => {
    document.querySelectorAll('[data-sost-capture-id]').forEach((element) => {
      element.removeAttribute('data-sost-capture-id');
    });

    const selector = [
      'main > section',
      '#main > section',
      '.section_wrap',
      '.doz_section',
      '[data-type="section"]',
      'main section'
    ].join(',');

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const seen = new Set();
    const candidates = [];

    [...document.querySelectorAll(selector)].forEach((element) => {
      if (seen.has(element)) return;
      seen.add(element);

      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;
      const minimumWidth = viewportWidth * (mobile ? 0.78 : 0.68);
      const minimumHeight = mobile ? 220 : 280;
      const maximumHeight = mobile ? 1350 : 1550;

      if (
        style.display === 'none' ||
        style.visibility === 'hidden' ||
        Number(style.opacity) === 0 ||
        rect.width < minimumWidth ||
        rect.height < minimumHeight ||
        rect.height > maximumHeight ||
        absoluteTop < viewportHeight * 0.58 ||
        element.closest('header, footer, nav')
      ) return;

      candidates.push({
        element,
        top: absoluteTop,
        bottom: absoluteTop + rect.height,
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      });
    });

    candidates.sort((a, b) => a.top - b.top || b.width - a.width);

    const reduced = [];
    candidates.forEach((candidate) => {
      const overlaps = reduced.some((kept) => {
        const overlap = Math.max(0, Math.min(candidate.bottom, kept.bottom) - Math.max(candidate.top, kept.top));
        return overlap / Math.min(candidate.height, kept.height) > 0.72;
      });
      if (!overlaps) reduced.push(candidate);
    });

    return reduced.slice(0, 18).map((candidate, index) => {
      const id = `${prefix}-${index + 1}`;
      candidate.element.setAttribute('data-sost-capture-id', id);
      return {
        id,
        top: candidate.top,
        width: candidate.width,
        height: candidate.height
      };
    });
  }, { prefix, mobile });
}

async function captureSections(page, outputDirectory, options) {
  const {
    markerPrefix,
    filePrefix,
    maximum,
    mobile = false
  } = options;

  const candidates = await markSectionCandidates(page, markerPrefix, mobile);
  const selected = pickSpread(candidates, maximum);
  const files = [];

  for (let index = 0; index < selected.length; index += 1) {
    const candidate = selected[index];
    const filename = `${filePrefix}-${String(index + 1).padStart(2, '0')}.jpg`;
    const locator = page.locator(`[data-sost-capture-id="${candidate.id}"]`).first();

    try {
      await locator.scrollIntoViewIfNeeded();
      await page.waitForTimeout(350);
      await locator.screenshot({
        path: path.join(outputDirectory, filename),
        type: 'jpeg',
        quality: 88
      });
      files.push(filename);
    } catch (error) {
      console.warn(`Section capture skipped: ${candidate.id}`, error.message);
    }
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  return files;
}

async function captureVisualElement(page, outputDirectory) {
  const visual = await page.evaluate(() => {
    document.querySelectorAll('[data-sost-visual-id]').forEach((element) => {
      element.removeAttribute('data-sost-visual-id');
    });

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const candidates = [...document.querySelectorAll('main img, main video, main canvas, main svg')]
      .map((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        const top = rect.top + window.scrollY;
        const naturalWidth = element.naturalWidth || rect.width;
        const naturalHeight = element.naturalHeight || rect.height;
        const area = rect.width * rect.height;
        const score = area * (top > viewportHeight ? 1.15 : 0.75);

        return {
          element,
          top,
          width: rect.width,
          height: rect.height,
          naturalWidth,
          naturalHeight,
          score,
          visible: style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) !== 0
        };
      })
      .filter((item) => (
        item.visible &&
        item.top > viewportHeight * 0.65 &&
        item.width >= Math.min(480, viewportWidth * 0.42) &&
        item.height >= 220 &&
        item.height <= 1200 &&
        item.naturalWidth >= 600 &&
        item.naturalHeight >= 300
      ))
      .sort((a, b) => b.score - a.score);

    if (!candidates.length) return null;
    candidates[0].element.setAttribute('data-sost-visual-id', 'primary');
    return {
      width: Math.round(candidates[0].width),
      height: Math.round(candidates[0].height)
    };
  });

  if (!visual) return '';

  const locator = page.locator('[data-sost-visual-id="primary"]').first();
  try {
    await locator.scrollIntoViewIfNeeded();
    await page.waitForTimeout(350);
    await locator.screenshot({
      path: path.join(outputDirectory, 'visual.jpg'),
      type: 'jpeg',
      quality: 90
    });
    return 'visual.jpg';
  } catch (error) {
    console.warn('Visual element capture skipped:', error.message);
    return '';
  }
}

async function captureDesktop(project, outputDirectory) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });

  try {
    await preparePage(page, project.url);

    await page.screenshot({
      path: path.join(outputDirectory, 'desktop-main.jpg'),
      type: 'jpeg',
      quality: 90,
      fullPage: false
    });

    const sections = await captureSections(page, outputDirectory, {
      markerPrefix: 'desktop-section',
      filePrefix: 'section',
      maximum: 3
    });

    const visual = await captureVisualElement(page, outputDirectory);

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: path.join(outputDirectory, 'desktop-full.jpg'),
      type: 'jpeg',
      quality: 78,
      fullPage: true
    });

    return { sections, visual };
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
    await preparePage(page, project.url);

    await page.screenshot({
      path: path.join(outputDirectory, 'mobile-main.jpg'),
      type: 'jpeg',
      quality: 90,
      fullPage: false
    });

    const sections = await captureSections(page, outputDirectory, {
      markerPrefix: 'mobile-section',
      filePrefix: 'mobile-section',
      maximum: 2,
      mobile: true
    });

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: path.join(outputDirectory, 'mobile-full.jpg'),
      type: 'jpeg',
      quality: 78,
      fullPage: true
    });

    return { sections };
  } finally {
    await page.close();
  }
}

for (const project of projects) {
  const outputDirectory = path.resolve('assets', 'projects', project.slug);
  await mkdir(outputDirectory, { recursive: true });

  console.log(`Capturing ${project.title}: ${project.url}`);

  try {
    const desktop = await captureDesktop(project, outputDirectory);
    const mobile = await captureMobile(project, outputDirectory);

    const requiredFiles = ['desktop-main.jpg', 'desktop-full.jpg', 'mobile-main.jpg'];
    const ready = (await Promise.all(requiredFiles.map((name) => exists(path.join(outputDirectory, name))))).every(Boolean);

    if (ready) {
      completed.push({
        ...project,
        desktopSections: desktop.sections,
        visual: desktop.visual,
        mobileSections: mobile.sections
      });
    }
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
      title: project.title,
      version: captureVersion,
      desktopSections: project.desktopSections,
      visual: project.visual,
      mobileSections: project.mobileSections
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

    const asset = (filename) => \`${'${capture.base}'}/${'${filename}'}?v=${'${capture.version}'}\`;
    const generatedGallery = [
      { image: asset('desktop-main.jpg'), label: 'Main Desktop View', layout: 'desktop' },
      ...capture.desktopSections.map((filename, index) => ({
        image: asset(filename),
        label: \`Key Section ${'${String(index + 1).padStart(2, \'0\')}'}\`,
        layout: 'section'
      })),
      ...(capture.visual ? [{ image: asset(capture.visual), label: 'Visual Detail', layout: 'visual' }] : []),
      { image: asset('mobile-main.jpg'), label: 'Mobile Main View', layout: 'mobile' },
      ...capture.mobileSections.map((filename, index) => ({
        image: asset(filename),
        label: \`Mobile Section ${'${String(index + 1).padStart(2, \'0\')}'}\`,
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
`;

await writeFile(path.resolve('data', 'project-captures.js'), overrideScript, 'utf8');
console.log(`Generated structured captures for ${completed.length} projects.`);
