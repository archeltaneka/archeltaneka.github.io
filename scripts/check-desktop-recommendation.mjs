import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const url = process.env.PORTFOLIO_URL || 'http://127.0.0.1:5173';
const output = '/tmp/desktop-recommendation-review';
const selector = '.desktop-recommendation';
const idle = page => page.locator('.portfolio-scene[data-transitioning="false"]').waitFor();
try {
  await fs.mkdir(output, { recursive: true });
  for (const [width, height] of [[320,568],[375,667],[390,844],[430,932],[768,1024],[844,390],[932,430],[1440,900]]) {
    const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' });
    await page.goto(url);
    await page.locator('#home[data-intro="complete"]').waitFor();
    if (width === 1440) {
      assert.equal(await page.locator(selector).count(), 0, 'Desktop has no notice');
    } else {
      await page.locator(selector).waitFor();
      await page.evaluate(() => document.fonts.ready);
      const notice = await page.locator(selector).boundingBox();
      const footer = await page.locator('.landing-footer').boundingBox();
      assert.ok(notice.y >= footer.y + footer.height, 'Notice clears all footer controls');
      assert.ok(notice.x >= 0 && notice.x + notice.width <= width, 'Notice fits viewport');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'No overflow');
      const dismiss = page.getByRole('button', { name: 'Dismiss desktop recommendation' });
      const box = await dismiss.boundingBox();
      assert.ok(box.width >= 44 && box.height >= 44, 'Accessible touch target');
      await page.screenshot({ path: `${output}/${width}x${height}.png`, fullPage: true });
      await dismiss.click();
      assert.equal(await page.locator(selector).count(), 0);
      assert.equal(await page.locator('#landing-contact a').first().evaluate(button => document.activeElement === button), true, 'Dismissal restores keyboard focus');
      await page.reload();
      await page.locator('#home[data-intro="complete"]').waitFor();
      assert.equal(await page.locator(selector).count(), 0, 'Dismissal survives reload');
    }
    await page.close();
  }
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  // Observe every mutation from the first frame, including normal entrance completion.
  await page.addInitScript(() => {
    window.earlyRecommendation = false;
    new MutationObserver(() => {
      if (document.querySelector('.desktop-recommendation') &&
        (document.querySelector('.page-load-dive') || document.querySelector('#home')?.dataset.intro !== 'complete')) window.earlyRecommendation = true;
    }).observe(document, { childList: true, subtree: true, attributes: true });
  });
  await page.goto(url);
  await page.locator(selector).waitFor();
  assert.equal(await page.evaluate(() => window.earlyRecommendation), false, 'Never shown during entrance');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.locator(selector).waitFor({ state: 'detached' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator(selector).waitFor();
  // Enlarged copy remains in flow, with no overlap or clipping.
  await page.addStyleTag({ content: '.desktop-recommendation p { font-size: 26px; } .desktop-recommendation h2 { font-size: 44px; }' });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Enlarged text fits');
  await page.screenshot({ path: `${output}/enlarged-text.png`, fullPage: true });
  await page.locator('.menu-entry-about button').click();
  await idle(page);
  await page.locator('.about-page .section-back').click();
  await idle(page);
  assert.equal(await page.locator(selector).count(), 0, 'Returning home never replays notice');
  await page.close();
  const blocked = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  await blocked.addInitScript(() => Object.defineProperty(window, 'sessionStorage', { get() { throw new DOMException('Blocked', 'SecurityError'); } }));
  await blocked.goto(url);
  await blocked.getByRole('button', { name: 'Dismiss desktop recommendation' }).click();
  assert.equal(await blocked.locator(selector).count(), 0, 'Storage failure does not break dismissal');
  console.log('PASS: eight viewport sizes, entrance timing, session dismissal, route return, reduced motion, unavailable storage');
} finally {
  await browser.close();
}
