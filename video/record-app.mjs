import { chromium } from 'playwright';
import { existsSync, mkdirSync } from 'fs';

const BASE = 'http://127.0.0.1:3001';
const OUT = './public/screens';
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function recordMaker(browser) {
  console.log('🎬 Recording Maker View...');
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: { dir: '/tmp/pw-videos', size: { width: 1440, height: 900 } }
  });
  const page = await ctx.newPage();
  await page.goto(BASE);
  await page.evaluate(() => {
    localStorage.setItem('amj-video-seen', '1');
    localStorage.setItem('amj-splash-seen', '1');
  });
  await page.reload();
  await page.waitForTimeout(1500);

  // Click Maker View
  await page.click('text=Enter Maker View');
  await page.waitForTimeout(2000);

  // Slowly browse sidebar items
  await page.click('text=Day 1 Tasks');
  await page.waitForTimeout(2500);

  await page.click('text=Dashboard');
  await page.waitForTimeout(2500);

  // Scroll main content
  await page.evaluate(() => {
    const main = document.getElementById('main-content');
    if (main) main.scrollTo({ top: 400, behavior: 'smooth' });
  });
  await page.waitForTimeout(2000);

  await page.click('text=My Skills');
  await page.waitForTimeout(2500);

  await page.click('text=Contributions');
  await page.waitForTimeout(2500);

  // Scroll
  await page.evaluate(() => {
    const main = document.getElementById('main-content');
    if (main) main.scrollTo({ top: 300, behavior: 'smooth' });
  });
  await page.waitForTimeout(1500);

  await page.click('text=AI Log');
  await page.waitForTimeout(2000);

  const video = page.video();
  await ctx.close();
  const path = await video.path();
  const { copyFileSync } = await import('fs');
  copyFileSync(path, `${OUT}/maker-recording.webm`);
  console.log('✓ maker-recording.webm');
}

async function recordLead(browser) {
  console.log('🎬 Recording Lead View...');
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: { dir: '/tmp/pw-videos', size: { width: 1440, height: 900 } }
  });
  const page = await ctx.newPage();
  await page.goto(BASE);
  await page.evaluate(() => {
    localStorage.setItem('amj-video-seen', '1');
    localStorage.setItem('amj-splash-seen', '1');
  });
  await page.reload();
  await page.waitForTimeout(1500);

  // Click Manager View
  await page.click('text=Enter Manager View');
  await page.waitForTimeout(2500);

  // Browse Lead sidebar
  await page.click('text=Team Dashboard');
  await page.waitForTimeout(2500);

  await page.click('text=Employee Progress');
  await page.waitForTimeout(2500);

  // Scroll
  await page.evaluate(() => {
    const main = document.getElementById('main-content');
    if (main) main.scrollTo({ top: 300, behavior: 'smooth' });
  });
  await page.waitForTimeout(2000);

  await page.click('text=Team Pulse');
  await page.waitForTimeout(2500);

  // Try 1:1 Prep
  const links = await page.$$('a, button, [role="button"]');
  for (const l of links) {
    const txt = await l.textContent().catch(() => '');
    if (txt.includes('1:1 Prep') || txt.includes('1:1')) {
      await l.click();
      break;
    }
  }
  await page.waitForTimeout(2500);

  const video = page.video();
  await ctx.close();
  const path = await video.path();
  const { copyFileSync } = await import('fs');
  copyFileSync(path, `${OUT}/lead-recording.webm`);
  console.log('✓ lead-recording.webm');
}

async function recordStrategy(browser) {
  console.log('🎬 Recording Strategy View...');
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: { dir: '/tmp/pw-videos', size: { width: 1440, height: 900 } }
  });
  const page = await ctx.newPage();
  await page.goto(BASE);
  await page.evaluate(() => {
    localStorage.setItem('amj-video-seen', '1');
    localStorage.setItem('amj-splash-seen', '1');
  });
  await page.reload();
  await page.waitForTimeout(1500);

  // Click Strategy View
  await page.click('text=Enter Strategy View');
  await page.waitForTimeout(2500);

  // Browse Strategy sidebar
  const sideItems = ['Program Overview', 'Cohort Analytics', 'Skill Intelligence', 'Content Performance', 'Attrition Signals'];
  for (const item of sideItems) {
    try {
      await page.click(`text=${item}`, { timeout: 2000 });
      await page.waitForTimeout(2500);

      // Scroll content
      await page.evaluate(() => {
        const main = document.getElementById('main-content');
        if (main) main.scrollTo({ top: 250, behavior: 'smooth' });
      });
      await page.waitForTimeout(1500);
    } catch(e) {
      // skip if not found
    }
  }

  const video = page.video();
  await ctx.close();
  const path = await video.path();
  const { copyFileSync } = await import('fs');
  copyFileSync(path, `${OUT}/strategy-recording.webm`);
  console.log('✓ strategy-recording.webm');
}

async function main() {
  const browser = await chromium.launch({ headless: true });

  await recordMaker(browser);
  await recordLead(browser);
  await recordStrategy(browser);

  await browser.close();
  console.log('\n✅ All recordings saved to', OUT);
}

main().catch(e => { console.error(e); process.exit(1); });
