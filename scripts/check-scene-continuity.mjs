import assert from 'node:assert/strict';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(process.env.PORTFOLIO_URL || 'http://127.0.0.1:5173');
  await page.locator('.landing[data-intro="complete"]').waitFor();
  await page.locator('.menu-entry-experience button').hover();
  await page.waitForTimeout(250);
  const result = await page.evaluate(async () => {
    const samples = [];
    const start = performance.now();
    document.querySelector('.menu-entry-experience button').click();
    await new Promise(resolve => {
      const frame = now => {
        const read = selector => {
          const el = document.querySelector(selector), style = getComputedStyle(el);
          return { opacity: +style.opacity, transform: style.transform, translate: style.translate, clip: style.clipPath };
        };
        samples.push({ ms: Math.round(now - start), phase: document.querySelector('.portfolio-scene').dataset.sceneState,
          incoming: read('[data-scene="experience"]'), art: read('.experience-art-entrance'), row: read('[data-record="tiket"]'),
          selected: read('.menu-entry-experience button'), blade: document.querySelector('.scene-blade--blue') ? read('.scene-blade--blue') : null });
        if (now - start < 1100) requestAnimationFrame(frame); else resolve();
      };
      requestAnimationFrame(frame);
    });
    return samples;
  });
  await page.locator('[data-scene-state="STATS_IDLE"]').waitFor();
  const reflections = await page.locator('.memory-photo').evaluateAll(images => images.map(image => ({ width: image.naturalWidth, height: image.naturalHeight })));
  assert.ok(reflections.every(image => image.width > 0 && image.height > 0 && Math.max(image.width, image.height) <= 960), 'Mirror reflections must use display-sized images, not multi-megapixel originals');
  // Selection feedback must be driven by one interpolated transform, not a
  // separate instantaneous CSS translate removed at the phase boundary.
  assert.ok(result.every(sample => sample.selected.translate === 'none' || sample.selected.translate === '0px'), 'Selection must not snap via an independent phase translate');
  await page.getByRole('button', { name: 'Main menu', exact: true }).click();
  await page.locator('[data-scene-state="MAIN_MENU_IDLE"]').waitFor();
  await page.getByRole('button', { name: 'Pause animation' }).click();
  await page.getByRole('button', { name: 'Experience', exact: true }).click();
  await page.locator('[data-scene-state="STATS_IDLE"]').waitFor();
  await page.waitForTimeout(200);
  const diagnostics = await page.locator('.experience-back').evaluate(el => {
    const ancestors = [];
    for (let node = el; node && node !== document.body; node = node.parentElement) ancestors.push({ cls: node.className, style: node.getAttribute('style'), transform: getComputedStyle(node).transform, rect: node.getBoundingClientRect().toJSON() });
    return ancestors;
  });
  assert.ok(diagnostics[0].rect.y >= 0, 'Paused reentry must not retain outgoing header transforms');
  console.log('Display-sized reflections and continuous selection feedback passed.');
} finally { await browser.close(); }
