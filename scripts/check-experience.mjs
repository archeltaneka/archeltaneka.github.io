import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
try {
  await page.goto(process.env.PORTFOLIO_URL || 'http://127.0.0.1:5173');
  await page.locator('.landing[data-intro="complete"]').waitFor();
  await page.getByRole('button', { name: 'Experience', exact: true }).click();
  await page.getByRole('heading', { name: 'Experience', exact: true, level: 1 }).waitFor({ timeout: 3000 }).catch(async error => { console.log(errors, await page.locator('body').innerText()); throw error; });
  const waterStyles = root => ['.landing-environment', '.environment-light', '.water-rays', '.water-surface', '.water-bubble'].map(selector => {
    const style = getComputedStyle(root.querySelector(selector));
    return { background: style.backgroundImage, animation: style.animationName, duration: style.animationDuration };
  });
  assert.deepEqual(await page.locator('.experience-page').evaluate(waterStyles), await page.locator('.landing').evaluate(waterStyles), 'Experience reuses Landing water colors and idle animation');
  assert.equal(await page.locator('.experience-page .water-bubble').count(), 10);
  assert.deepEqual(await page.locator('.experience-art').evaluate(el => [getComputedStyle(el).animationName, getComputedStyle(el).animationDuration]), ['stats-drift', '7.8s'], 'Stats has its own restrained asymmetric idle');
  assert.equal(await page.locator('.experience-choice').count(), 5);
  assert.equal(await page.locator('.experience-details').count(), 0, 'Details wait for a click');
  await page.locator('.experience-character').evaluate(image => image.decode());
  for (const [school, photo] of [['Monash University', 'monash.webp'], ['University of Nottingham', 'nottingham.webp'], ['Bina Nusantara University', 'binus.webp']]) {
    await page.getByRole('button', { name: new RegExp(school) }).click();
    assert.ok((await page.locator('.memory-photo[data-visible="true"]').getAttribute('src')).endsWith(photo));
    assert.ok(await page.locator('.memory-photo[data-visible="true"]').evaluate(el => el.complete && el.naturalWidth > 0));
  }
  await page.getByRole('button', { name: /tiket.com Associate/ }).click();
  const tiket = page.getByRole('button', { name: /tiket.com Associate/ });
  const sayurbox = page.getByRole('button', { name: /Sayurbox Junior/ });
  await sayurbox.hover();
  assert.equal(await sayurbox.getAttribute('aria-expanded'), 'false');
  assert.equal(await page.locator('.experience-page').getAttribute('data-effective'), 'tiket', 'Hover must not select an experience');
  await page.getByRole('heading', { name: 'Experience', exact: true, level: 1 }).hover();
  assert.equal(await page.locator('.experience-page').getAttribute('data-effective'), 'tiket');
  await sayurbox.click();
  assert.equal(await sayurbox.getAttribute('aria-expanded'), 'true');
  assert.equal(await sayurbox.evaluate(el => el.nextElementSibling?.className), 'experience-details', 'Details immediately follow their selected row');
  assert.equal(await page.locator('.experience-choice-stat--achievement').count(), 5);
  assert.equal(await page.locator('.experience-choice-stat--years').count(), 5);
  assert.equal(await page.locator('.experience-details').getAttribute('id'), await sayurbox.getAttribute('aria-controls'));
  await page.waitForFunction(() => getComputedStyle(document.querySelector('.experience-choice[data-active="true"]'), '::before').backgroundColor === 'rgb(255, 255, 255)');
  await page.keyboard.press('ArrowUp');
  assert.equal(await sayurbox.getAttribute('aria-expanded'), 'true');
  await tiket.focus();
  assert.equal(await sayurbox.getAttribute('aria-expanded'), 'true', 'Focus must not select');
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.experience-page').count(), 1, 'Escape must not navigate');
  await sayurbox.click();
  assert.equal(await page.locator('.experience-details').count(), 0, 'Click again collapses');
  await page.getByRole('button', { name: 'Motion on' }).click();
  await page.waitForFunction(() => document.querySelector('.experience-page').dataset.paused === 'true');
  assert.equal(await page.locator('.experience-page').getAttribute('data-paused'), 'true');
  assert.equal(await page.locator('.experience-page').evaluate(el => el.getAnimations({ subtree: true }).filter(a => a.playState === 'running' && a.effect.getTiming().iterations === Infinity).length), 0, 'Pause stops every ambient layer');
  await sayurbox.click();
  assert.equal(await page.locator('.experience-role').evaluate(el => getComputedStyle(el).opacity), '1');
  await page.getByRole('button', { name: 'Motion off' }).click();
  await page.getByRole('button', { name: 'Main menu', exact: true }).click();
  await page.locator('[data-scene-state="MAIN_MENU_IDLE"]').waitFor();
  assert.equal(await page.locator('.page-load-dive').count(), 0);
  await page.goBack();
  await page.locator('[data-scene-state="STATS_IDLE"]').waitFor();
  await page.getByRole('heading', { name: 'Experience', exact: true, level: 1 }).waitFor();
  await tiket.click();
  await page.getByRole('heading', { name: 'Experience', exact: true, level: 1 }).click();
  await page.mouse.move(2, 2);
  await fs.mkdir('.impeccable/review/experience', { recursive: true });
  for (const [width, height] of [[1920,1080],[1440,900],[1280,720],[768,1024],[390,844],[844,390],[320,568]]) {
    await page.setViewportSize({ width, height });
    await page.mouse.move(2, 2);
    await page.waitForTimeout(800);
    assert.equal(await page.locator('.experience-page').evaluate(el => el.scrollLeft), 0, 'No internal horizontal scroll');
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `overflow ${width}`);
    assert.ok(await page.locator('.experience-choice').evaluateAll(rows => rows.every(row => {
      const strip = row.getBoundingClientRect();
      const bar = row.querySelector('.experience-choice-stat--years i').getBoundingClientRect();
      return bar.right <= strip.x + strip.width * .95 && bar.left >= strip.left;
    })), `Year bars stay inside the diagonal strip at ${width}`);
    const art = await page.locator('.experience-character').boundingBox();
    const stage = await page.locator('.experience-page').boundingBox();
    assert.ok(art.y + art.height <= stage.y + stage.height + 5, `Illustration stays within the page vertically at ${width}`);
    if (width > 900) {
      assert.ok(art.x + art.width <= width, 'Desktop artwork stays within the right edge');
      assert.ok(Math.abs(art.width - Math.min(width * .675, (height - 160) * 2.25)) < 4, 'Artwork enlarged by 1.5x');
      assert.ok(art.y >= 0 && art.y + art.height <= height, 'Complete illustration fits in the viewport');
      assert.ok(await page.evaluate(() => document.documentElement.scrollHeight <= innerHeight), 'Desktop page does not scroll');
    }
    await page.screenshot({ path: `.impeccable/review/experience/${width}.png`, fullPage: true });
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal(await page.locator('.experience-art').evaluate(el => getComputedStyle(el).animationName), 'none');
  await sayurbox.click();
  assert.equal(await sayurbox.getAttribute('aria-expanded'), 'true');
  assert.deepEqual(errors, []);
  const touch = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, reducedMotion: 'reduce' });
  await touch.goto(`${process.env.PORTFOLIO_URL || 'http://127.0.0.1:5173'}/#experience`);
  const touchSayurbox = touch.getByRole('button', { name: /Sayurbox Junior/ });
  await touchSayurbox.tap();
  assert.equal(await touchSayurbox.getAttribute('aria-expanded'), 'true');
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const school of ['Monash University', 'University of Nottingham', 'Bina Nusantara University']) {
    await page.getByRole('button', { name: new RegExp(school) }).click();
    await page.mouse.move(2, 2);
    await page.waitForTimeout(400);
    await page.screenshot({ path: `.impeccable/review/experience/${school.split(' ')[0]}.png`, fullPage: true });
  }
  console.log('Experience: click disclosure, hover/focus preserves disclosure and native keyboard navigation, history, seven viewports and reduced motion passed.');
} finally { await browser.close(); }
