import assert from 'node:assert/strict';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const url = process.env.PORTFOLIO_URL || 'http://127.0.0.1:5173';
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  // Observe mounting even on fast machines, before application code runs.
  await page.addInitScript(() => {
    window.introMounts = 0;
    new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(node => {
      if (node.nodeType === 1 && (node.matches?.('.page-load-dive') || node.querySelector?.('.page-load-dive'))) window.introMounts++;
    }))).observe(document, { subtree: true, childList: true });
  });
  await page.goto(`${url}/#projects`);
  await page.waitForTimeout(1500);
  assert.equal(await page.evaluate(() => window.introMounts), 1, 'Fresh document loads include the intro, including deep links');
  await page.goto(url);
  assert.equal(await page.locator('.character-entrance').evaluate(el => getComputedStyle(el).animationPlayState), 'paused', 'Landing waits for water');
  await page.waitForFunction(() => document.querySelector('.landing')?.dataset.intro === 'landing');
  assert.equal(await page.locator('.page-load-dive').count(), 1, 'Landing starts during liquid reveal');
  assert.equal(await page.locator('.character-entrance').evaluate(el => getComputedStyle(el).animationPlayState), 'running');
  await page.waitForTimeout(800);
  assert.equal(await page.evaluate(() => window.introMounts), 1);
  assert.equal(await page.locator('.page-load-dive').count(), 0, 'Overlay unmounts');
  for (const name of ['About', 'Experience', 'Projects', 'Skills']) {
    await page.locator(`.menu-entry-${name.toLowerCase()} button`).click();
    await page.locator('.portfolio-scene[data-transitioning="false"]').waitFor();
    await page.getByRole('button', { name: 'Main menu', exact: true }).click();
    await page.locator('.portfolio-scene[data-transitioning="false"]').waitFor();
    assert.equal(await page.evaluate(() => window.introMounts), 1, `${name} navigation does not replay intro`);
  }
  await page.reload();
  await page.waitForTimeout(1500);
  assert.equal(await page.evaluate(() => window.introMounts), 1, 'Full reload replays');
  await page.reload();
  await page.keyboard.press('Tab');
  assert.equal(await page.locator('.page-load-dive').count(), 0, 'Keyboard input cancels immediately');
  await page.reload();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForFunction(() => !document.querySelector('.page-load-dive'));
  await page.reload();
  assert.equal(await page.locator('.page-load-dive').count(), 0);
  assert.equal(await page.locator('.landing').getAttribute('data-intro'), 'complete');
  assert.equal(await page.locator('.character-entrance').evaluate(el => getComputedStyle(el).animationName), 'none');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.evaluate(() => window.dispatchEvent(new Event('portfolio:replay-intro')));
  await page.locator('.page-load-dive').waitFor();
  await page.waitForFunction(() => !document.querySelector('.page-load-dive'));
  assert.deepEqual(errors, []);
  console.log('PASS: fresh load, deep link, reload, all four client navigation round trips, cleanup, reduced motion, no browser errors.');
} finally { await browser.close(); }
