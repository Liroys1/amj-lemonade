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

  // 4. Navigate to Dashboard first (has "Ask Lemi" quick action), then open Lemi
  await dashLink.click();
  await page.waitForTimeout(1000);
  // Click the floating Lemi button (bottom-right pink circle)
  try {
    const lemiBtn = page.locator('[aria-label="Open AI Assistant Lemi"]');
    await lemiBtn.click({ timeout: 3000 });
    await page.waitForTimeout(1500);
  } catch (e) {
    console.log('  ⚠️ Could not click Lemi button:', e.message);
  }
  await page.screenshot({ path: `${OUT}/maker-lemi.png`, type: 'png' });
  console.log('  ✅ maker-lemi.png');

  // Close companion
  try {
    const closeComp = page.locator('text=✕').first();
    if (await closeComp.isVisible({ timeout: 500 })) await closeComp.click();
  } catch {}

  // ═══════════════════════ LEAD SCREENS ═══════════════════════
  console.log('📸 Capturing Lead screens...');

  // Reload and enter as Lead from landing page (avoids overlay issues)
  await page.goto(APP);
  await page.waitForTimeout(2000);
  // Skip video if shown
  try {
    const skipV2 = page.locator('text=Skip Video');
    if (await skipV2.isVisible({ timeout: 2000 })) { await skipV2.click(); await page.waitForTimeout(500); }
  } catch {}
  await page.waitForTimeout(1000);
  const leadCard = page.locator('text=Team Lead').first();
  await leadCard.click();
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

  // Reload and enter as Strategy from landing page
  await page.goto(APP);
  await page.waitForTimeout(2000);
  try {
    const skipV3 = page.locator('text=Skip Video');
    if (await skipV3.isVisible({ timeout: 2000 })) { await skipV3.click(); await page.waitForTimeout(500); }
  } catch {}
  await page.waitForTimeout(1000);
  const stratCard = page.locator('text=L&D Strategy').first();
  await stratCard.click();
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
