import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const output = path.resolve('assets/projects/pentagon');
await mkdir(output, { recursive: true });

const views = [
  { key: 'desktop-main', url: 'https://www.ptglaw.co.kr/' },
  { key: 'view-about', url: 'https://www.ptglaw.co.kr/About' },
  { key: 'view-inquire', url: 'https://www.ptglaw.co.kr/Inquire' },
  { key: 'view-cases', url: 'https://www.ptglaw.co.kr/38' },
  { key: 'view-member', url: 'https://www.ptglaw.co.kr/42' },
  { key: 'view-partner', url: 'https://www.ptglaw.co.kr/73' },
  { key: 'view-center', url: 'https://www.ptglaw.co.kr/center' }
];

const browser = await chromium.launch({ headless: true });

async function prepare(page, url) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
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
      [class*="popup" i][style*="position: fixed"],
      [class*="modal" i][style*="position: fixed"] {
        display: none !important;
      }
    `
  });
  await page.evaluate(async () => {
    const max = Math.min(document.documentElement.scrollHeight, 24000);
    for (let y = 0; y < max; y += 700) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 70));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1000);
}

for (const view of views) {
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1.25 });
  try {
    await prepare(page, view.url);
    await page.screenshot({
      path: path.join(output, `${view.key}.jpg`),
      type: 'jpeg',
      quality: 91,
      fullPage: false,
      animations: 'disabled'
    });
    console.log(`Captured ${view.key}: ${view.url}`);
  } finally {
    await page.close();
  }
}

await browser.close();
