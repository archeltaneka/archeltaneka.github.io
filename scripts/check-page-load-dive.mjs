import assert from 'node:assert/strict';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const url = process.env.PORTFOLIO_URL || 'http://127.0.0.1:5173';
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(url);
  assert.equal(await page.locator('.page-load-dive').count(), 1, 'Page entry overlay starts on initial load');
  assert.equal(await page.locator('.character-entrance').evaluate(el => getComputedStyle(el).animationPlayState), 'paused', 'Landing entrance waits for the water');
  await page.waitForFunction(() => document.querySelector('.landing')?.dataset.intro === 'landing', null, { polling: 20 });
  assert.equal(await page.locator('.page-load-dive').count(), 1, 'Landing starts while water is receding');
  assert.equal(await page.locator('.character-entrance').evaluate(el => getComputedStyle(el).animationPlayState), 'running');
  await page.waitForFunction(() => !document.querySelector('.page-load-dive'));
  for (const label of ['About', 'Experience', 'Projects', 'Skills']) {
    await page.getByRole('button', { name: label, exact: true }).click();
    assert.equal(await page.locator('.page-load-dive').count(), 0, 'Menu interaction never replays entry');
    if (label === 'Experience') {
      await page.locator('[data-scene-state="STATS_IDLE"]').waitFor();
      await page.getByRole('button', { name: 'Main menu', exact: true }).click();
      await page.locator('[data-scene-state="MAIN_MENU_IDLE"]').waitFor();
    }
  }
  await page.reload();
  assert.equal(await page.locator('.page-load-dive').count(), 1, 'Full refresh replays entry');
  await page.keyboard.press('Tab');
  assert.equal(await page.locator('.page-load-dive').count(), 0, 'Keyboard access clears decoration immediately');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  assert.equal(await page.locator('.page-load-dive').count(), 0, 'Reduced motion skips entry without a delay');
  assert.equal(await page.locator('.character-entrance').evaluate(el => getComputedStyle(el).animationName), 'none');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.reload();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForFunction(() => !document.querySelector('.page-load-dive'));
  assert.deepEqual(errors, []);
  console.log('PASS: entry, landing handoff, cleanup, navigation, reload, keyboard interruption, reduced motion and preference change');
} finally { await browser.close(); }
