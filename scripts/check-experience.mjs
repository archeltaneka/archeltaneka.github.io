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
  await page.getByRole('heading', { name: 'Experience', exact: true }).waitFor({ timeout: 3000 }).catch(async error => { console.log(errors, await page.locator('body').innerText()); throw error; });
  assert.equal(await page.locator('.experience-choice').count(), 5);
  for (const [school, photo] of [['Monash University', 'monash.webp'], ['University of Nottingham', 'nottingham.webp'], ['Bina Nusantara University', 'binus.webp']]) {
    await page.getByRole('button', { name: new RegExp(school) }).click();
    assert.ok((await page.locator('.memory-photo[data-visible="true"]').getAttribute('src')).endsWith(photo));
    assert.ok(await page.locator('.memory-photo[data-visible="true"]').evaluate(el => el.complete && el.naturalWidth > 0));
  }
  await page.getByRole('button', { name: /tiket.com Associate/ }).click();
  const tiket = page.getByRole('button', { name: /tiket.com Associate/ });
  const sayurbox = page.getByRole('button', { name: /Sayurbox Junior/ });
  await sayurbox.hover();
  assert.equal(await sayurbox.getAttribute('aria-pressed'), 'false');
  assert.equal(await page.locator('.experience-page').getAttribute('data-effective'), 'sayurbox');
  await page.getByRole('heading', { name: 'Experience', exact: true }).hover();
  assert.equal(await page.locator('.experience-page').getAttribute('data-effective'), 'tiket');
  await sayurbox.click();
  assert.equal(await sayurbox.getAttribute('aria-pressed'), 'true');
  await page.keyboard.press('ArrowUp');
  assert.equal(await tiket.getAttribute('aria-pressed'), 'false');
  await page.keyboard.press('Enter');
  assert.equal(await tiket.getAttribute('aria-pressed'), 'true');
  await page.getByRole('button', { name: 'Motion on' }).click();
  await page.waitForFunction(() => document.querySelector('.experience-page').dataset.paused === 'true');
  assert.equal(await page.locator('.experience-page').getAttribute('data-paused'), 'true');
  await sayurbox.click();
  assert.equal(await page.locator('.experience-role').evaluate(el => getComputedStyle(el).opacity), '1');
  await page.getByRole('button', { name: 'Motion off' }).click();
  await page.keyboard.press('Escape');
  await page.getByRole('navigation', { name: 'Main menu' }).waitFor();
  assert.equal(await page.locator('.page-load-dive').count(), 0);
  await page.goBack();
  await page.getByRole('heading', { name: 'Experience', exact: true }).waitFor();
  await tiket.click();
  await page.getByRole('heading', { name: 'Experience', exact: true }).click();
  await page.mouse.move(2, 2);
  await fs.mkdir('.impeccable/review/experience', { recursive: true });
  for (const [width, height] of [[1920,1080],[1440,900],[1280,720],[768,1024],[390,844],[844,390],[320,568]]) {
    await page.setViewportSize({ width, height });
    await page.mouse.move(2, 2);
    await page.waitForTimeout(800);
    assert.equal(await page.locator('.experience-page').evaluate(el => el.scrollLeft), 0, 'No internal horizontal scroll');
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `overflow ${width}`);
    await page.screenshot({ path: `.impeccable/review/experience/${width}.png`, fullPage: true });
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal(await page.locator('.experience-art').evaluate(el => getComputedStyle(el).animationName), 'none');
  await sayurbox.click();
  assert.equal(await sayurbox.getAttribute('aria-pressed'), 'true');
  assert.deepEqual(errors, []);
  const touch = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, reducedMotion: 'reduce' });
  await touch.goto(`${process.env.PORTFOLIO_URL || 'http://127.0.0.1:5173'}/#experience`);
  const touchSayurbox = touch.getByRole('button', { name: /Sayurbox Junior/ });
  await touchSayurbox.tap();
  assert.equal(await touchSayurbox.getAttribute('aria-pressed'), 'true');
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const school of ['Monash University', 'University of Nottingham', 'Bina Nusantara University']) {
    await page.getByRole('button', { name: new RegExp(school) }).click();
    await page.mouse.move(2, 2);
    await page.waitForTimeout(400);
    await page.screenshot({ path: `.impeccable/review/experience/${school.split(' ')[0]}.png`, fullPage: true });
  }
  console.log('Experience: preview, commit, keyboard, history, seven viewports and reduced motion passed.');
} finally { await browser.close(); }
