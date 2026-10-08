import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const url = process.env.PORTFOLIO_URL || 'http://127.0.0.1:5173';
const output = process.env.NAV_CAPTURE_DIR || '/tmp/section-navigation-review';
try {
  await fs.mkdir(output, { recursive: true });
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const [width, height] of [[1440,900], [1024,768], [768,1024], [390,844], [320,568], [844,390]]) {
    await page.setViewportSize({ width, height });
    for (const route of ['about', 'experience', 'projects', 'skills']) {
      await page.goto(`${url}/#${route}`);
      await page.reload(); // Reset retained project details between viewport cases.
      await page.locator('[data-transitioning="false"]').waitFor();
      const main = page.locator(`[data-scene="${route}"] main`);
      await main.waitFor();
      await page.evaluate(() => document.fonts.ready);
      await main.locator('img').evaluateAll(images => Promise.all(images.map(image => image.decode().catch(() => {}))));
      const back = main.getByRole('button', { name: /^Main menu/ }).filter({ visible: true });
      assert.equal(await back.count(), 1, `${route}: one visible Main menu button`);
      const checkPosition = async () => {
        const box = await back.boundingBox();
        const inset = width < 900 ? 18 : width * .04;
        assert.ok(Math.abs(box.y - (width < 900 ? 16 : 22)) < 1, `${route} ${width}: common top inset, got ${box.y}`);
        assert.ok(Math.abs(width - box.x - box.width - inset) < 1, `${route} ${width}: common right inset`);
        assert.equal(box.width, 116, `${route}: consistent width`);
        assert.equal(box.height, 44, `${route}: consistent touch target`);
        await back.click({ trial: true }); // Wait for painting, then verify a real pointer can reach the button.
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route}: no overflow`);
      };
      await checkPosition();
      await page.mouse.move(0, 0);
      if ([1440,390,320].includes(width)) await page.screenshot({ path: `${output}/${route}-${width}.png`, fullPage: true });
      if (route === 'projects') {
        await main.locator('button.project-choice').first().click();
        await checkPosition();
      }
      await back.click();
      await page.locator('[data-scene-state="MAIN_MENU_IDLE"]').waitFor();
      assert.equal(await page.locator(`.menu-entry-${route} button`).evaluate(el => el === document.activeElement), true, `${route}: return focus`);
    }
  }
  assert.deepEqual(errors, []);
  console.log('Section navigation: four pages and project details align at six sizes; single button, click targets, return focus, and overflow passed.');
} finally { await browser.close(); }
