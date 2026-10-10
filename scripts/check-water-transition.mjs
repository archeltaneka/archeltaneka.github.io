import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const url = process.env.PORTFOLIO_URL || 'http://127.0.0.1:5173';
const output = '/tmp/water-transition-review';
try {
  await fs.mkdir(output, { recursive: true });
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(url);
  await page.locator('.landing[data-intro="complete"]').waitFor();
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const signatures = new Map();
  for (const [width, height] of [[1440,900], [390,844]]) {
    await page.setViewportSize({ width, height });
    for (const route of ['about','experience','projects','skills']) {
      for (const direction of ['forward','back']) {
        const destination = direction === 'forward' ? route : 'home';
        const trigger = direction === 'forward' ? `.menu-entry-${route} button` : `[data-scene="${route}"] .section-back`;
        await page.locator(trigger).click();
        await page.waitForFunction(() => document.getAnimations().some(a => a.id === 'scene-water-reveal'));
        const signature = await page.evaluate(() => {
          const animations = document.getAnimations().filter(a => a.id.startsWith('scene-navigation'));
          const reveal = document.getAnimations().find(a => a.id === 'scene-water-reveal');
          for (const a of [...animations, reveal]) { a.pause(); a.currentTime = 180; }
          return { frames: reveal.effect.getKeyframes().map(k => k.clipPath), duration: reveal.effect.getTiming().duration, target: reveal.effect.target.dataset.scene };
        });
        const wave = await page.evaluate(() => {
          const lead = document.getAnimations().find(a => a.id === 'scene-navigation-water-lead');
          const reveal = document.getAnimations().find(a => a.id === 'scene-water-reveal');
          return lead ? { frames: lead.effect.getKeyframes().map(k => k.clipPath), duration: lead.effect.getTiming().duration, revealDelay: reveal.effect.getTiming().delay } : null;
        });
        assert.equal(Boolean(wave), direction === 'forward', 'Only forward navigation has two staggered ripple fronts');
        if (wave) {
          assert.ok(wave.revealDelay >= wave.duration, 'Second ripple waits for the first ripple to finish');
          assert.ok(wave.frames.every(frame => frame.startsWith('path(')), 'Leading water uses curved ripple geometry');
          assert.equal(wave.duration, 280);
        }
        assert.equal(signature.duration + (wave?.revealDelay || 0), direction === 'forward' ? 560 : 420, 'Chained forward duration; unchanged return duration');
        assert.ok(signature.frames.every(frame => frame.startsWith('path(')), 'Page is revealed through curved water openings');
        assert.equal(signature.target, direction === 'forward' ? destination : route, 'Forward reveals incoming section; return contracts outgoing section');
        const radii = signature.frames.map(frame => Number(frame.match(/ a ([\d.e+-]+)/)[1]));
        assert.ok(direction === 'forward' ? radii.at(-1) > radii[0] : radii.at(-1) < radii[0], `${direction} ripple has the requested direction`);
        delete signature.target;
        const key = `${width}-${direction}`;
        if (signatures.has(key)) assert.deepEqual(signature, signatures.get(key), 'Every section uses identical geometry and timing within each direction');
        else signatures.set(key, signature);
        assert.equal(await page.locator('.portfolio-route:not([hidden])').count(), 2);
        const incoming = page.locator(`[data-scene="${destination}"]`);
        assert.equal(await incoming.evaluate(el => getComputedStyle(el).opacity), '1', 'Incoming page stays opaque inside the ripple');
        if (direction === 'back') {
          assert.equal(await incoming.evaluate(el => getComputedStyle(el).clipPath), 'none', 'Main menu is visible beneath the shrinking section');
          const outgoing = page.locator(`[data-scene="${route}"]`);
          assert.ok(Number(await outgoing.evaluate(el => getComputedStyle(el).zIndex)) > Number(await incoming.evaluate(el => getComputedStyle(el).zIndex)), 'Shrinking section stays above the menu');
        }
        if (route === 'projects') {
          for (const time of direction === 'forward' ? [140,280,420,540] : [80,180,300]) {
            await page.evaluate(time => document.getAnimations().filter(a => a.id === 'scene-water-reveal' || a.id.startsWith('scene-navigation')).forEach(a => { a.currentTime = time; }), time);
            await page.screenshot({ path: `${output}/${width}-${direction}-${time}.png` });
          }
        }
        await page.evaluate(() => document.getAnimations().filter(a => a.id === 'scene-water-reveal' || a.id.startsWith('scene-navigation')).forEach(a => a.finish()));
        await page.locator('.portfolio-scene[data-transitioning="false"]').waitFor();
        assert.equal(await page.evaluate(() => location.hash), `#${destination}`);
        assert.equal(await incoming.evaluate(el => el.style.clipPath), '', 'Temporary mask is removed');
        assert.equal(await incoming.evaluate(el => getComputedStyle(el).clipPath), 'none', 'Settled page is fully visible');
        assert.equal(await page.locator('.scene-blade').count(), 0);
        assert.equal(await page.locator('.scene-water-lead').count(), 0, 'Temporary leading ripple is removed');
        assert.equal(await page.locator('.portfolio-route:not([hidden])').count(), 1);
      }
    }
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.locator('.menu-entry-projects button').click();
  await page.locator('[data-scene-state="PROJECTS_IDLE"]').waitFor();
  assert.equal(await page.evaluate(() => document.getAnimations().filter(a => a.id === 'scene-water-reveal').length), 0);
  await page.getByRole('button', { name: 'Main menu', exact: true }).click();
  await page.locator('[data-scene-state="MAIN_MENU_IDLE"]').waitFor();
  assert.equal(await page.evaluate(() => document.getAnimations().filter(a => a.id === 'scene-water-reveal').length), 0, 'Reduced-motion return skips the ripple');
  assert.deepEqual(errors, []);
  console.log('Water navigation: all four sections, both directions, desktop/mobile, expanding forward/contracting return masks, shared timing, opaque reveal, cleanup and reduced motion passed.');
} finally { await browser.close(); }
