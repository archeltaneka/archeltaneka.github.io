import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const url = process.env.PORTFOLIO_URL || 'http://127.0.0.1:5173';
const output = process.env.SKILLS_CAPTURE_DIR || '/tmp/skills-review';
const errors = [];
page.on('pageerror', error => errors.push(error.message));
try {
  await fs.mkdir(output, { recursive: true });
  await page.goto(`${url}/#skills`);
  const main = page.locator('.skills-page');
  await main.waitFor();
  assert.equal(await main.getAttribute('data-category'), 'programming');
  assert.equal(await page.locator('.page-load-dive').count(), 0);
  const rows = main.locator('.skills-category');
  assert.equal(await rows.count(), 6);
  assert.equal(await main.locator('.skills-tool').count(), 3);
  await rows.nth(1).hover();
  assert.equal(await main.getAttribute('data-category'), 'machine-learning');
  assert.equal(await rows.nth(1).getAttribute('aria-pressed'), 'true');
  await main.locator('h1').hover();
  assert.equal(await main.getAttribute('data-category'), 'machine-learning', 'Leaving hover retains selected category');
  await rows.nth(2).click();
  await main.locator('h1').hover();
  assert.equal(await main.getAttribute('data-category'), 'ai-llm');
  await rows.nth(2).focus();
  await page.keyboard.press('ArrowDown');
  assert.equal(await main.getAttribute('data-category'), 'data');
  assert.equal(await rows.nth(3).evaluate(el => el === document.activeElement), true);
  for (const [width, height] of [[1920,1080],[1440,900],[1280,800],[768,1024],[390,844],[320,568],[844,390]]) {
    await page.setViewportSize({ width, height });
    for (let index = 0; index < 6; index++) {
      await rows.nth(index).click();
      await page.mouse.move(width - 1, 1);
      await page.waitForTimeout(380);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `No overflow ${width}, category ${index}`);
      const bounds = await main.locator('.skills-tools').boundingBox();
      const guide = await main.locator('.skills-guide').boundingBox();
      assert.ok(bounds.y + bounds.height <= guide.y + 1, `Tools clear guide ${width}, category ${index}`);
      assert.ok(await main.locator('.skills-tool dd').evaluateAll(nodes => nodes.every(el => el.scrollWidth <= el.clientWidth)), `Tool names fit ${width}, category ${index}`);
    }
    await rows.first().click();
    await page.mouse.move(width - 1, 1);
    await page.waitForTimeout(380);
    await page.screenshot({ path: `${output}/skills-${width}.png`, fullPage: true });
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await main.locator('h1').focus();
  await page.keyboard.press('Escape');
  await page.locator('[data-scene-state="MAIN_MENU_IDLE"]').waitFor();
  assert.equal(await page.locator('.menu-entry-skills button').evaluate(el => el === document.activeElement), true);
  assert.equal(await page.locator('.skills-page').count(), 0, 'Inactive Skills unmounts');
  await page.getByRole('button', { name: 'Skills', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('.skills-white-field')?.getAnimations().length > 0);
  for (const time of [140, 320, 460, 650]) {
    await page.evaluate(time => {
      for (const track of document.getAnimations().filter(track => track.constructor.name === 'Animation')) {
        track.pause(); track.currentTime = time;
      }
    }, time);
    await page.screenshot({ path: `${output}/entrance-${time}.png` });
  }
  await page.evaluate(() => document.getAnimations().filter(track => track.constructor.name === 'Animation').forEach(track => track.play()));
  await page.locator('[data-scene-state="SKILLS_IDLE"]').waitFor();
  assert.equal(await main.locator('.skills-tool').first().evaluate(el => el.getAnimations().length), 0, 'Tool entrance does not replay after route settles');
  assert.equal(await main.getAttribute('data-category'), 'programming');
  assert.equal(await page.locator('.page-load-dive').count(), 0, 'No dive replay');
  await page.goBack();
  await page.locator('[data-scene-state="MAIN_MENU_IDLE"]').waitFor();
  await page.goForward();
  await page.locator('[data-scene-state="SKILLS_IDLE"]').waitFor();
  await rows.nth(2).focus();
  await page.keyboard.press('ArrowDown');
  assert.equal(await main.getAttribute('data-category'), 'data', 'Arrows follow focused category');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await rows.nth(5).click();
  assert.equal(await main.locator('.skills-tool').first().evaluate(el => getComputedStyle(el).animationName), 'none');
  await main.getByRole('button', { name: 'Main menu' }).click();
  await page.locator('[data-scene-state="MAIN_MENU_IDLE"]').waitFor();
  await page.getByRole('button', { name: 'Skills', exact: true }).click();
  await page.locator('[data-scene-state="SKILLS_IDLE"]').waitFor();
  await page.screenshot({ path: `${output}/skills-reduced.png` });
  const touch = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  await touch.goto(`${url}/#skills`);
  await touch.locator('.skills-category').nth(4).tap();
  assert.equal(await touch.locator('.skills-page').getAttribute('data-category'), 'visualization');
  await touch.close();
  assert.deepEqual(errors, []);
  console.log('Skills: 7 viewports × 6 categories; hover selection, keyboard, touch, history, return focus, reduced motion and no dive replay passed.');
} finally { await browser.close(); }
