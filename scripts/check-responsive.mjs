import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const url = process.env.PORTFOLIO_URL || 'http://127.0.0.1:5173';
const output = process.env.RESPONSIVE_CAPTURE_DIR || '/tmp/responsive-final';
const sizes = process.env.RESPONSIVE_VIEWPORTS ? JSON.parse(process.env.RESPONSIVE_VIEWPORTS) : process.env.DESKTOP_ONLY ? [[1280,800],[1440,900],[1920,1080]] : [[320,568],[360,800],[375,667],[390,844],[430,932],[768,1024],[820,1180],[1280,800],[1440,900],[1920,1080],[844,390],[932,430]];
const errors = [], results = [];
const idle = page => page.locator('.portfolio-scene[data-transitioning="false"]').waitFor();
const fit = async (page, label) => {
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${label}: horizontal overflow`);
};
const ready = async page => {
  await page.evaluate(() => document.fonts.ready);
  await page.locator('.portfolio-route:not([hidden]) img').evaluateAll(images => Promise.all(images.map(img => img.decode().catch(() => {}))));
  await page.mouse.move(0, 0);
};
try {
  await fs.mkdir(output, { recursive: true });
  for (const [width, height] of sizes) {
    const compact = width < 900 || (width <= 1023 && height <= 500);
    const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce', hasTouch: compact });
    page.on('pageerror', error => errors.push(error.message));
    const failed = [], requests = [];
    page.on('response', response => { if (response.status() >= 400) failed.push(`${response.status()} ${response.url()}`); });
    page.on('request', request => requests.push(request.url()));
    for (const route of ['home','about','experience','projects','skills']) {
      await page.goto(`${url}/?check=${width}-${route}#${route}`);
      await idle(page); await ready(page);
      await fit(page, `${route} ${width}x${height}`);
      await page.screenshot({ path: `${output}/${route}-${width}x${height}.png`, fullPage: true });
      const main = page.locator('.portfolio-route:not([hidden]) main');
      if (route === 'home') {
        if (compact) {
          assert.equal(await main.locator('.mobile-identity').isVisible(), true);
          assert.equal(await main.locator('.menu-control:visible').count(), 6);
          assert.equal(await main.locator('.landing-character').count(), 0);
        }
        assert.ok(await main.locator('.menu-entry-resume a').getAttribute('href'));
      }
      if (route === 'skills' && !process.env.DESKTOP_ONLY) {
        for (const button of await main.locator('.skills-category').all()) {
          if (compact) await button.tap(); else await button.click();
          assert.equal(await button.getAttribute('aria-pressed'), 'true');
          const panel = main.locator('.skills-tools'), guide = main.locator('.skills-guide');
          const a = await panel.boundingBox(), b = await guide.boundingBox();
          assert.ok(a.y + a.height <= b.y + 1, `Skills tools overlap guide: ${width}`);
          assert.ok(await main.locator('.skills-tool dd').evaluateAll(nodes => nodes.every(el => el.scrollWidth <= el.clientWidth + 1)), `Skill name clips: ${width}`);
        }
      }
      if (route === 'experience' && !process.env.DESKTOP_ONLY) {
        for (const button of await main.locator('.experience-choice').all()) {
          if (compact) await button.tap(); else await button.click();
          assert.equal(await button.getAttribute('aria-expanded'), 'true');
          assert.equal(await main.locator('.experience-details').count(), 1);
          await fit(page, `Experience selected ${width}`);
        }
      }
      if (route === 'projects') {
        await main.locator('button.project-choice:not([hidden])').first().click();
        await ready(page);
        await page.screenshot({ path: `${output}/details-${width}x${height}.png`, fullPage: true });
        if (!process.env.DESKTOP_ONLY) {
          for (let index = 0; index < 7; index++) {
            await ready(page); await fit(page, `Project ${index} ${width}`);
            assert.ok(await main.locator('.project-actions a').count(), 'Project has direct actions');
            if (compact) {
              const art = main.locator('.project-persona img');
              assert.ok(await art.first().evaluate(img => img.currentSrc.endsWith('-compact.webp')), 'Compact artwork source');
              const a = await main.locator('.project-art-anchor').boundingBox(), b = await main.locator('.project-detail-content').boundingBox();
              assert.ok(a.y + a.height <= b.y + 1, 'Artwork does not overlap details');
            }
            await main.getByRole('button', { name: 'Next project', exact: true }).click();
          }
          await main.getByRole('button', { name: 'Project list', exact: true }).click();
          assert.equal(await main.getAttribute('data-view'), 'select');
        }
      }
      if (route !== 'home' && !process.env.DESKTOP_ONLY) {
        const back = main.locator('.section-back');
        await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
        if (compact) {
          const box = await back.boundingBox();
          assert.ok(box.y >= 0 && box.y + box.height <= height, `${route}: persistent Home control`);
          assert.ok(box.width >= 44 && box.height >= 44, 'Home touch target');
        }
        await back.click(); await idle(page);
        assert.equal(await page.locator('#home').isVisible(), true);
        assert.equal(await page.locator(`.menu-entry-${route} .menu-control`).evaluate(el => el === document.activeElement), true, 'Return focus');
        await page.goBack(); await idle(page);
        assert.equal(await page.locator(`[data-scene="${route}"]`).isVisible(), true, 'Browser Back');
        await page.goForward(); await idle(page);
        assert.equal(await page.locator('#home').isVisible(), true, 'Browser Forward');
      }
    }
    if (compact) assert.ok(!requests.some(src => /archel-main|archel_illustration_skill|archel-stats|mirror-glass|experience\/reflections/.test(src)), 'Desktop-only illustrations not downloaded');
    assert.deepEqual(failed, [], `Failed HTTP responses at ${width}`);
    results.push({ width, height, sections: 5, passed: true });
    await page.close();
  }
  if (!process.env.DESKTOP_ONLY) {
    for (const viewport of [{width:390,height:844},{width:844,height:390}]) {
      const page = await browser.newPage({ viewport, hasTouch: true });
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(url);
      await page.locator('.page-load-dive').waitFor({state:'detached',timeout:2500});
      await page.getByRole('button',{name:'About',exact:true}).tap(); await idle(page);
      await page.locator('#about .section-back').tap(); await idle(page);
      assert.equal(await page.locator('.page-load-dive').count(),0,'Dive does not replay');
      await page.getByRole('button',{name:'Skills',exact:true}).tap(); await idle(page);
      await page.emulateMedia({reducedMotion:'reduce'});
      assert.equal(await page.locator('.skills-tool').first().evaluate(el=>getComputedStyle(el).animationName),'none');
      await page.close();
    }
  }
  assert.deepEqual(errors, []);
  await fs.writeFile(`${output}/results.json`,JSON.stringify({results,errors},null,2));
  console.log(`Responsive checks passed: ${sizes.length} viewports, five sections and project details; ${process.env.DESKTOP_ONLY ? 'desktop captures' : 'touch, categories, projects, history, scrolling, reduced motion, dive, assets and console'}.`);
} finally { await browser.close(); }
