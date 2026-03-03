/**
 * Capture targeted screenshots of key "wow" features for the video.
 * Each role gets 3-4 screenshots that showcase its most impressive capabilities.
 *
 * Maker (4 screenshots):
 *   1. Welcome — 4-phase journey map
 *   2. Dashboard — health score + stat cards + nudges
 *   3. Skills — radar chart view
 *   4. Lemi companion open
 *
 * Lead (3 screenshots):
 *   1. Team Dashboard — team cards with health circles
 *   2. 1:1 Prep — auto-generated talking points
 *   3. Alert Center — severity-based alerts
 *
 * Strategy (3 screenshots):
 *   1. Overview — 6 KPI cards
 *   2. Skill Gap Map — role × category heatmap
 *   3. Attrition Risk — 2D quadrant matrix
 */

import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const APP = 'http://localhost:3001';
const OUT = './public/screens';

mkdirSync(OUT, { recursive: true });

async function run() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  await page.goto(APP);
  await page.waitForTimeout(2000);

  // Skip video if shown
  try {
    const skip = page.locator('text=Skip Video');
    if (await skip.isVisible({ timeout: 2000 })) {
      await skip.click();
      await page.waitForTimeout(500);
    }
  } catch {}

  // Wait for landing page
  await page.waitForTimeout(1000);

  // ═══════════════════════ MAKER SCREENS ═══════════════════════
  console.log('📸 Capturing Maker screens...');

  // Enter as Maker
  const makerCard = page.locator('text=New Employee').first();
  await makerCard.click();
  await page.waitForTimeout(1500);

  // 1. Welcome screen (should show journey map)
  await page.screenshot({ path: `${OUT}/maker-welcome.png`, type: 'png' });
  console.log('  ✅ maker-welcome.png');

  // 2. Navigate to Dashboard
  const dashLink = page.locator('text=Dashboard').first();
  await dashLink.click();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}/maker-dashboard.png`, type: 'png' });
  console.log('  ✅ maker-dashboard.png');

  // 3. Navigate to Skills
  const skillsLink = page.locator('text=My Skills').first();
  await skillsLink.click();
  await page.waitForTimeout(1500);
  // Try to switch to radar view if button exists
  try {
    const radarBtn = page.locator('text=Radar').first();
    if (await radarBtn.isVisible({ timeout: 1000 })) {
      await radarBtn.click();
      await page.waitForTimeout(800);
    }
  } catch {}
  await page.screenshot({ path: `${OUT}/maker-skills.png`, type: 'png' });
  console.log('  ✅ maker-skills.png');

  // 4. Open Lemi companion
  try {
    // Look for the Lemi/companion button (usually bottom-right or in nav)
    const lemiBtn = page.locator('[aria-label*="ompanion"], [aria-label*="Lemi"], text=Lemi').first();
    if (await lemiBtn.isVisible({ timeout: 1000 })) {
      await lemiBtn.click();
      await page.waitForTimeout(1000);
    } else {
      // Try the chat icon button
      const chatBtn = page.locator('text=Ask Lemi').first();
      if (await chatBtn.isVisible({ timeout: 1000 })) {
        await chatBtn.click();
        await page.waitForTimeout(1000);
      }
    }
  } catch {}
  await page.screenshot({ path: `${OUT}/maker-lemi.png`, type: 'png' });
  console.log('  ✅ maker-lemi.png');

  // Close companion if open
  try {
    const closeBtn = page.locator('[aria-label*="close"], [aria-label*="Close"]').first();
    if (await closeBtn.isVisible({ timeout: 500 })) await closeBtn.click();
  } catch {}

  // ═══════════════════════ LEAD SCREENS ═══════════════════════
  console.log('📸 Capturing Lead screens...');

  // Switch to Lead role via role tabs
  const leadTab = page.locator('text=Lead').last();
  await leadTab.click();
  await page.waitForTimeout(1500);

  // Navigate past onboarding setup if it shows
  try {
    const skipSetup = page.locator('text=Skip Setup, text=Go to Dashboard, text=Team Dashboard').first();
    if (await skipSetup.isVisible({ timeout: 1000 })) {
      await skipSetup.click();
      await page.waitForTimeout(1000);
    }
  } catch {}

  // 1. Team Dashboard
  const teamLink = page.locator('text=Team Dashboard').first();
  try { await teamLink.click(); await page.waitForTimeout(1500); } catch {}
  await page.screenshot({ path: `${OUT}/lead-team.png`, type: 'png' });
  console.log('  ✅ lead-team.png');

  // 2. 1:1 Prep
  const oneOnOneLink = page.locator('text=1:1 Prep').first();
  try { await oneOnOneLink.click(); await page.waitForTimeout(1500); } catch {
    // Try alternate
    const alt = page.locator('text=1:1 Meeting').first();
    try { await alt.click(); await page.waitForTimeout(1500); } catch {}
  }
  await page.screenshot({ path: `${OUT}/lead-1on1.png`, type: 'png' });
  console.log('  ✅ lead-1on1.png');

  // 3. Alert Center
  const alertLink = page.locator('text=Alert Center').first();
  try { await alertLink.click(); await page.waitForTimeout(1500); } catch {}
  await page.screenshot({ path: `${OUT}/lead-alerts.png`, type: 'png' });
  console.log('  ✅ lead-alerts.png');

  // ═══════════════════════ STRATEGY SCREENS ═══════════════════════
  console.log('📸 Capturing Strategy screens...');

  // Switch to Strategy role
  const stratTab = page.locator('text=Strategy').last();
  await stratTab.click();
  await page.waitForTimeout(1500);

  // Navigate past welcome if it shows
  try {
    const goOverview = page.locator('text=Go to Dashboard, text=Overview, text=Explore Dashboard').first();
    if (await goOverview.isVisible({ timeout: 1000 })) {
      await goOverview.click();
      await page.waitForTimeout(1000);
    }
  } catch {}

  // 1. Overview
  const overviewLink = page.locator('text=Overview').first();
  try { await overviewLink.click(); await page.waitForTimeout(1500); } catch {}
  await page.screenshot({ path: `${OUT}/strategy-overview.png`, type: 'png' });
  console.log('  ✅ strategy-overview.png');

  // 2. Skill Gap Map
  const skillGapLink = page.locator('text=Skill Gap').first();
  try { await skillGapLink.click(); await page.waitForTimeout(1500); } catch {}
  await page.screenshot({ path: `${OUT}/strategy-skillgap.png`, type: 'png' });
  console.log('  ✅ strategy-skillgap.png');

  // 3. Attrition Risk
  const attritionLink = page.locator('text=Attrition').first();
  try { await attritionLink.click(); await page.waitForTimeout(1500); } catch {}
  await page.screenshot({ path: `${OUT}/strategy-attrition.png`, type: 'png' });
  console.log('  ✅ strategy-attrition.png');

  await browser.close();
  console.log('\n🎬 All screenshots captured!');
}

run().catch(e => { console.error(e); process.exit(1); });
