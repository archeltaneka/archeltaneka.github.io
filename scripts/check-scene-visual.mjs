import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const output = '.impeccable/review/scene-motion';
await fs.mkdir(output, { recursive: true });
const url = process.env.PORTFOLIO_URL || 'http://127.0.0.1:5173';
try {
  for (const [width, height] of (process.env.MOTION_SKIP_CAPTURE ? [] : [[1440, 900], [390, 844]])) {
    const context = await browser.newContext({ viewport: { width, height }, hasTouch: width < 900, recordVideo: { dir: output, size: { width, height } } });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(url);
    await page.locator('.landing[data-intro="complete"]').waitFor();
    await page.screenshot({ path: `${output}/${width}-main.png` });
    await page.getByRole('button', { name: 'Experience', exact: true }).click();
    await page.locator('[data-scene-state="STATS_IDLE"]').waitFor();
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.screenshot({ path: `${output}/${width}-stats.png`, fullPage: true });
    await page.locator('[data-record="monash"] button').click();
    await page.locator('[data-scene-state="STATS_IDLE"]').waitFor();
    await page.waitForTimeout(200);
    await page.screenshot({ path: `${output}/${width}-reflection.png`, fullPage: true });
    await page.getByRole('button', { name: 'Main menu', exact: true }).click({ timeout: 5000 }).catch(async error => { console.log('Reentry diagnostics', width, await page.locator('.experience-back').evaluate(el => { const nodes = []; for (let node = el; node && node !== document.body; node = node.parentElement) nodes.push({ cls: node.className, style: node.getAttribute('style'), transform: getComputedStyle(node).transform, rect: node.getBoundingClientRect().toJSON() }); return nodes; })); throw error; });
    await page.locator('[data-scene-state="MAIN_MENU_IDLE"]').waitFor();
    await page.waitForTimeout(200);
    // The user's own pause control must take the short, still-visible navigation path.
    await page.getByRole('button', { name: 'Pause animation' }).click();
    await page.getByRole('button', { name: 'Experience', exact: true }).click();
    await page.locator('[data-scene-state="STATS_IDLE"]').waitFor();
    assert.equal(await page.locator('[data-scene="experience"]').evaluate(el => getComputedStyle(el).clipPath), 'none');
    await page.getByRole('button', { name: 'Main menu', exact: true }).click({ timeout: 5000 }).catch(async error => { console.log('Reentry diagnostics', width, await page.locator('.experience-back').evaluate(el => { const nodes = []; for (let node = el; node && node !== document.body; node = node.parentElement) nodes.push({ cls: node.className, style: node.getAttribute('style'), transform: getComputedStyle(node).transform, rect: node.getBoundingClientRect().toJSON() }); return nodes; })); throw error; });
    await page.waitForTimeout(150);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.locator('[data-scene-state="MAIN_MENU_IDLE"]').waitFor();
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.getByRole('button', { name: 'Resume animation' }).click();
    await page.getByRole('button', { name: 'Experience', exact: true }).click();
    await page.waitForTimeout(100);
    await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, value: true }); document.dispatchEvent(new Event('visibilitychange')); });
    await page.locator('[data-scene-state="STATS_IDLE"]').waitFor();
    await page.evaluate(() => { delete document.hidden; document.dispatchEvent(new Event('visibilitychange')); });
    assert.equal(await page.locator('.scene-crossing').count(), 0);
    assert.deepEqual(errors, []);
    const video = page.video();
    await context.close();
    await video.saveAs(`${output}/${width}-choreography.webm`);
  }
  // The name/photo eggs are deliberately retained in the existing About component.
  const eggs = await browser.newPage({ reducedMotion: 'reduce' });
  await eggs.goto(url);
  await eggs.evaluate(async () => {
    const { default: React } = await import('/node_modules/.vite/deps/react.js');
    const { default: ReactDOM } = await import('/node_modules/.vite/deps/react-dom_client.js');
    const { default: AboutIdentity } = await import('/src/components/landing/AboutIdentity.jsx');
    const host = document.createElement('div'); host.id = 'egg-harness'; document.body.append(host);
    ReactDOM.createRoot(host).render(React.createElement(AboutIdentity));
  });
  const name = eggs.locator('#egg-harness .name-reveal');
  await name.hover();
  await eggs.waitForFunction(() => getComputedStyle(document.querySelector('#egg-harness .chinese-name')).opacity === '1');
  for (const [keys, file] of [['australia','profile-au.webp'], ['london','profile-uk.webp'], ['reset','profile.webp']]) {
    await eggs.keyboard.type(keys);
    assert.ok((await eggs.locator('#egg-harness .identity-photo').getAttribute('src')).endsWith(file));
  }
  console.log('Desktop/mobile recordings, paused navigation, preference interruption, hidden-tab completion and retained name/photo easter eggs passed.');
} finally { await browser.close(); }
