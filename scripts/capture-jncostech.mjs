import { chromium } from 'playwright';
import { access, mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const project = {
  id: 'jn-costech-cosmetic-oem-odm-website',
  slug: 'jncostech',
  url: 'https://jncostech.com/'
};

const outputDirectory = path.resolve('assets', 'projects', project.slug);
const version = new Date().toISOString().replace(/\D/g, '').slice(0, 12);
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };
const DPR = 2;

async function exists(filePath) {
  try { await access(filePath); return true; } catch { return false; }
}

async function newPage(browser, mobile = false, highRes = true) {
  return browser.newPage({
    viewport: mobile ? MOBILE : DESKTOP,
    deviceScaleFactor: highRes ? DPR : 1,
    isMobile: mobile,
    hasTouch: mobile,
    userAgent: mobile
      ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1'
      : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36',
    locale: 'en-US',
    extraHTTPHeaders: { 'Accept-Language': 'en-US,en;q=0.9' }
  });
}

async function prepare(page) {
  const response = await page.goto(project.url, { waitUntil: 'domcontentloaded', timeout: 120000 });
  if (response && response.status() >= 400) throw new Error(`JN COS TECH returned HTTP ${response.status()}`);
  await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
  await page.evaluate(async () => { if (document.fonts?.ready) await document.fonts.ready; }).catch(() => {});
  await page.keyboard.press('Escape').catch(() => {});
  await page.addStyleTag({ content: `
    html { scroll-behavior: auto !important; }
    *,*::before,*::after { animation-duration:0s!important; animation-delay:0s!important; transition:none!important; caret-color:transparent!important; }
    [data-aos],[class*="animate" i],[class*="reveal" i] { opacity:1!important; visibility:visible!important; transform:none!important; }
    #ch-plugin,[class*="floating" i],[class*="popup" i][style*="fixed"],[class*="modal" i][style*="fixed"] { display:none!important; }
  `});
  await page.evaluate(async () => {
    let y = 0;
    while (y < Math.min(document.documentElement.scrollHeight, 50000)) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 100));
      y += 650;
    }
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 1000));
  });
  await page.waitForTimeout(1200);
}

async function captureNamedSection(page, text, filename) {
  const heading = page.getByText(text, { exact: false }).first();
  try {
    await heading.waitFor({ state: 'visible', timeout: 6000 });
    const section = heading.locator('xpath=ancestor-or-self::section[1]');
    if (await section.count()) {
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(450);
      await section.screenshot({ path: path.join(outputDirectory, filename), type: 'jpeg', quality: 95, animations: 'disabled' });
      return true;
    }
  } catch {}
  return false;
}

async function captureFallbackViewport(page, fraction, filename) {
  const metrics = await page.evaluate(() => ({ h: document.documentElement.scrollHeight, vh: innerHeight }));
  const top = Math.max(0, Math.round((metrics.h - metrics.vh) * fraction));
  await page.evaluate((y) => window.scrollTo(0, y), top);
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outputDirectory, filename), type: 'jpeg', quality: 94, fullPage: false, animations: 'disabled' });
}

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({ headless: true });
const capturedSections = [];
try {
  const desktop = await newPage(browser, false, true);
  try {
    await prepare(desktop);
    await desktop.screenshot({ path: path.join(outputDirectory, 'desktop-main.jpg'), type: 'jpeg', quality: 95, fullPage: false, animations: 'disabled' });

    const targets = [
      ['Core Business Areas', 'section-core-business.jpg', 0.28],
      ['Technology Highlights', 'section-technology.jpg', 0.56],
      ['Ready to Build Your Brand with Us?', 'section-inquiry.jpg', 0.82]
    ];

    for (const [label, filename, fallback] of targets) {
      const ok = await captureNamedSection(desktop, label, filename);
      if (!ok) await captureFallbackViewport(desktop, fallback, filename);
      capturedSections.push({ filename, label });
    }
  } finally { await desktop.close(); }

  const full = await newPage(browser, false, false);
  try {
    await prepare(full);
    await full.screenshot({ path: path.join(outputDirectory, 'desktop-full.jpg'), type: 'jpeg', quality: 84, fullPage: true, animations: 'disabled' });
  } finally { await full.close(); }

  const mobile = await newPage(browser, true, true);
  try {
    await prepare(mobile);
    await mobile.screenshot({ path: path.join(outputDirectory, 'mobile-main.jpg'), type: 'jpeg', quality: 95, fullPage: false, animations: 'disabled' });
    const techOk = await captureNamedSection(mobile, 'Technology Highlights', 'mobile-technology.jpg');
    if (!techOk) await captureFallbackViewport(mobile, 0.58, 'mobile-technology.jpg');
  } finally { await mobile.close(); }

  const mobileFull = await newPage(browser, true, false);
  try {
    await prepare(mobileFull);
    await mobileFull.screenshot({ path: path.join(outputDirectory, 'mobile-full.jpg'), type: 'jpeg', quality: 84, fullPage: true, animations: 'disabled' });
  } finally { await mobileFull.close(); }
} finally {
  await browser.close();
}

const required = ['desktop-main.jpg', 'desktop-full.jpg', 'mobile-main.jpg', 'mobile-full.jpg'];
const ready = (await Promise.all(required.map((name) => exists(path.join(outputDirectory, name))))).every(Boolean);
if (!ready) throw new Error('Required JN COS TECH captures were not generated.');

const overrideScript = `(() => {
  'use strict';
  const project = (Array.isArray(window.SOST_PROJECTS) ? window.SOST_PROJECTS : [])
    .find((item) => item.id === '${project.id}');
  if (!project) return;
  const base = './assets/projects/${project.slug}';
  const asset = (filename) => \`${'${base}'}/${'${filename}'}?v=${version}\`;
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
})();\n`;

await writeFile(path.resolve('data', 'project-jncostech-captures.js'), overrideScript, 'utf8');
console.log('Generated JN COS TECH high-resolution portfolio captures.');