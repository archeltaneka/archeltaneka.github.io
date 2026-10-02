import assert from 'node:assert/strict';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ args: ['--no-sandbox'] });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
  await page.addInitScript(() => {
    window.menuPhases = [];
    new MutationObserver(() => {
      const phase = document.querySelector('.landing')?.dataset.menuPhase;
      if (phase && window.menuPhases.at(-1) !== phase) window.menuPhases.push(phase);
    }).observe(document, { subtree: true, childList: true, attributes: true, attributeFilter: ['data-menu-phase'] });
  });
  await page.goto(process.env.PORTFOLIO_URL || 'http://127.0.0.1:5173');
  await page.waitForFunction(() => document.querySelector('.landing')?.dataset.intro === 'landing', null, { polling: 20 });
  const arrivals = await page.evaluate(() => document.getAnimations().filter(a => ['character-dive', 'menu-dive', 'identity-dive'].includes(a.animationName)).map(a => a.effect.getComputedTiming().endTime));
  assert.ok(arrivals.length >= 6, 'Character, card and menu tracks exist during the reveal');
  await page.waitForFunction(() => !document.querySelector('.page-load-dive'));
  assert.deepEqual(await page.evaluate(() => window.menuPhases), ['entry', 'settled', 'idle'], 'Lifecycle moves forward exactly once');
  const unfinished = await page.evaluate(() => document.getAnimations().filter(a => a.effect.getTiming().iterations !== Infinity && a.playState === 'running').map(a => ({ name: a.animationName || a.transitionProperty, time: a.currentTime, end: a.effect.getComputedTiming().endTime })));
  assert.deepEqual(unfinished, [], 'All arrivals finish before idle starts');
  assert.ok(arrivals.every(t => t <= 580), 'Landing settles within the final 580ms of the shared entrance');
  assert.ok(await page.locator('.landing .water-bubble').count() <= 12, 'Idle particle field stays sparse');
  const float = await page.locator('.landing-character').evaluate(el => {
    const a = el.getAnimations()[0]; a.pause();
    a.currentTime = a.effect.getTiming().duration / 4;
    return new DOMMatrix(getComputedStyle(el).transform).m42;
  });
  assert.ok(Math.abs(float) >= 8 && Math.abs(float) <= 14, `Character buoyancy is visible but stays within its overscan, got ${float}px`);
  await page.getByRole('button', { name: 'Projects', exact: true }).hover();
  assert.equal(await page.locator('.page-load-dive').count(), 0);
  await page.getByRole('button', { name: 'Pause animation' }).click();
  await page.waitForFunction(() => document.getAnimations().every(a => a.playState !== 'running'), null, { polling: 20, timeout: 2000 });
  await page.getByRole('button', { name: 'Resume animation' }).click();
  assert.equal(await page.locator('.page-load-dive').count(), 0);
  await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, value: true }); document.dispatchEvent(new Event('visibilitychange')); });
  assert.equal(await page.locator('.landing').getAttribute('data-motion'), 'paused', 'Hidden document suspends ambient work');
  await page.evaluate(() => { delete document.hidden; document.dispatchEvent(new Event('visibilitychange')); });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForFunction(() => document.getAnimations().every(a => a.playState !== 'running'), null, { polling: 20, timeout: 2000 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  assert.equal(await page.locator('.character-entrance').evaluate(el => getComputedStyle(el).animationName), 'none', 'Enabling motion later starts only idle, never entrance');
  console.log('PASS: fast arrival durations, sparse bubbles, bounded character buoyancy, no hover replay, pause/resume and reduced motion');
} finally { await browser.close(); }
