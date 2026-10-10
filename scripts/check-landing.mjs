import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const baseURL = process.env.PORTFOLIO_URL || 'http://127.0.0.1:5173';
const capture = process.argv.includes('--capture');
const output = '.impeccable/review/landing';
await fs.mkdir(output, { recursive: true });
const errors = [], logs = [];
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => logs.push(message.text()));
  await page.goto(baseURL);
  await page.evaluate(() => document.fonts.ready);
  // Catches missing default selection and keyboard state/focus getting out of sync.
  const menu = page.getByRole('navigation', { name: 'Main menu' });
  assert.equal(await menu.count(), 1, 'Landing main menu exists');
  const about = menu.getByRole('button', { name: 'About', exact: true });
  assert.equal(await about.getAttribute('aria-current'), 'true');
  assert.equal((await page.locator('.landing-section-label').textContent()).trim(), '01 About');
  await about.focus();
  await page.keyboard.press('ArrowDown');
  assert.equal(await about.getAttribute('aria-current'), 'true', 'Arrow keys no longer change menu selection');
  assert.equal(await about.evaluate(el => el === document.activeElement), true, 'Arrow keys do not move menu focus');
  await page.keyboard.press('Tab');
  const experience = menu.getByRole('button', { name: 'Experience', exact: true });
  assert.equal(await experience.evaluate(el => el === document.activeElement), true, 'Native Tab access remains');
  assert.equal((await page.locator('.landing-section-label').textContent()).trim(), '02 Experience');
  await experience.click();
  await page.getByRole('heading', { name: 'Experience', exact: true }).waitFor();
  await page.getByRole('button', { name: /Main menu/ }).click();
  await menu.waitFor();
  await page.evaluate(() => document.activeElement.blur());
  await page.keyboard.press('Enter');
  assert.equal(await experience.evaluate(el => el === document.activeElement), false, 'Enter on the page does not focus or activate a menu item');
  await menu.getByRole('button', { name: 'Projects', exact: true }).hover();
  assert.equal(await menu.getByRole('button', { name: 'Projects', exact: true }).getAttribute('aria-current'), 'true');
  assert.equal((await page.locator('.landing-section-label').textContent()).trim(), '03 Projects');
  await menu.getByRole('button', { name: 'Skills', exact: true }).click();
  await page.locator('[data-scene-state="SKILLS_IDLE"]').waitFor();
  assert.equal(await page.locator('.skills-page').getAttribute('data-category'), 'programming');
  await page.locator('.skills-page').getByRole('button', { name: 'Main menu' }).click();
  await page.locator('[data-scene-state="MAIN_MENU_IDLE"]').waitFor();
  assert.equal(await page.locator('.landing > section').count(), 0, 'Landing does not contain destination sections');
  // Console output and static title remain; name/photo are retained in the unmounted AboutIdentity component.
  assert.ok(logs.some(text => text.includes('█▀▀█ █░█ █▀▀ █▀▀▄') && text.replace(/\s*color: #E6E6FA; font-weight: bold;$/, '').trim().split('\n').length === 4), 'Console contains only the three-row art and formatting marker');
  const title = 'Archel Taneka Sutanto';
  assert.equal(await page.title(), title);
  await page.evaluate(() => window.dispatchEvent(new Event('blur')));
  assert.equal(await page.title(), title);
  for (const hidden of [true, false]) {
    await page.evaluate(hidden => {
      Object.defineProperty(document, 'hidden', { configurable: true, value: hidden });
      document.dispatchEvent(new Event('visibilitychange'));
    }, hidden);
    assert.equal(await page.title(), title);
  }
  await page.evaluate(() => delete document.hidden);
  await page.evaluate(() => window.dispatchEvent(new Event('focus')));
  assert.equal(await page.title(), title);
  assert.equal(await page.locator('.landing-nameplate h1').textContent(), 'Archel Taneka Sutanto');
  assert.equal(await page.locator('.name-carousel').count(), 0);
  assert.equal(await page.locator('.name-reveal').count(), 0, 'Identity easter eggs are reserved for the future About section');
  // Other mounted routes also offer Resume; the landing keeps one menu action.
  assert.equal(await page.locator('.landing a[href$=".pdf"]').count(), 1, 'One clear landing resume action');
  assert.match(await menu.getByRole('link', { name: 'Resume', exact: true }).getAttribute('href'), /Resume.*pdf$/);
  const resume = await page.request.get(new URL('/assets/resume/Resume%20-%20Archel%20Sutanto.pdf', baseURL).href);
  assert.equal(resume.status(), 200);
  assert.match(resume.headers()['content-type'], /pdf/);
  assert.match(await page.getByRole('link', { name: 'Email', exact: true }).getAttribute('href'), /^mailto:/);
  assert.match(await page.getByRole('link', { name: 'GitHub', exact: true }).getAttribute('href'), /github.com\/archeltaneka/);
  assert.match(await page.getByRole('link', { name: 'LinkedIn', exact: true }).getAttribute('href'), /linkedin.com\/in\/archel/);
  await page.mouse.move(1400, 10);
  await page.reload();
  await page.evaluate(() => document.fonts.ready);
  await page.locator('.landing-character').evaluate(image => image.decode());
  for (const [width, height] of [[1440,900],[1536,864],[1280,720],[1024,768],[900,600],[768,1024],[600,800],[390,844],[375,667],[320,568],[844,390],[640,450]]) {
    await page.setViewportSize({ width, height });
    await page.evaluate(() => window.scrollTo(0, 0));
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `No horizontal overflow at ${width}x${height}`);
    const nameBox = await page.locator('.landing-nameplate').boundingBox();
    assert.ok(nameBox.x >= 0 && nameBox.x + nameBox.width <= width, `Nameplate fits at ${width}`);
    for (const label of ['About','Experience','Projects','Skills']) {
      const control = menu.getByRole('button', { name: label, exact: true });
      await control.focus();
      const box = await control.boundingBox();
      assert.ok(box.x >= 0 && box.x + box.width <= width + 1 && box.height >= 44, `Menu target fits at ${width}: ${label}`);
    }
    await about.focus();
    if (width === 1536) {
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      // The transparent footer previously intercepted clicks over Resume.
      const resumeLink = menu.getByRole('link', { name: 'Resume', exact: true });
      const labelBox = await resumeLink.locator('.menu-label').boundingBox();
      const point = { x: labelBox.x + labelBox.width / 2, y: labelBox.y + labelBox.height / 2 };
      await page.mouse.move(point.x, point.y);
      assert.ok(await page.evaluate(({ x, y }) => Boolean(document.elementFromPoint(x, y)?.closest('a[href$=".pdf"]')), point), 'Visible Resume label receives pointer input through the footer');
      const [resumeTab, resumeResponse] = await Promise.all([
        page.waitForEvent('popup'),
        page.context().waitForEvent('response', response => response.url().endsWith('.pdf')),
        page.mouse.click(point.x, point.y),
      ]);
      assert.equal(resumeResponse.status(), 200, 'Mouse click retrieves the resume');
      assert.match(resumeResponse.headers()['content-type'], /pdf/, 'Mouse click opens a PDF in the new tab');
      assert.match(decodeURIComponent(resumeResponse.url()), /Resume - Archel Sutanto\.pdf$/);
      await resumeTab.close();
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await about.focus();
    }
    await page.evaluate(() => document.activeElement.blur());
    assert.equal(await page.evaluate(() => document.getAnimations().filter(animation => animation.playState === 'running').length), 0, 'Reduced motion disables animation');
    if (capture && [1440,768,390,320,844].includes(width)) await page.screenshot({ path: `${output}/${width === 1440 ? 'desktop' : width === 390 ? 'mobile' : width}.png`, fullPage: true });
  }
  // Catches entrance choreography resetting an early user selection.
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.reload();
  await page.getByRole('button', { name: 'Projects', exact: true }).focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(1400);
  await page.locator('.project-compendium').waitFor({ state: 'visible' });
  await page.getByRole('button', { name: 'Main menu', exact: true }).click();
  await page.locator('[data-scene-state="MAIN_MENU_IDLE"]').waitFor();
  assert.equal(await menu.getByRole('button', { name: 'Projects', exact: true }).getAttribute('aria-current'), 'true');
  assert.equal(await about.locator('.menu-backing').evaluate(el => getComputedStyle(el).opacity), '0', 'Early selection removes the default backing');
  assert.ok(await page.evaluate(() => document.getAnimations().some(animation => animation.effect.getTiming().iterations === Infinity)), 'Idle motion runs with normal preferences');
  await page.getByRole('button', { name: 'Pause animation' }).click();
  assert.equal(await page.evaluate(() => document.getAnimations().filter(animation => animation.effect.getTiming().iterations === Infinity && animation.playState === 'running').length), 0, 'Pause stops continuous motion');
  await page.getByRole('button', { name: 'Resume animation' }).click();
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  assert.equal(await page.locator('.page-load-dive').count(), 0, 'Resuming idle motion does not replay the dive entrance');
  const contactSelection = await menu.locator('[aria-current="true"]').textContent();
  await page.getByRole('link', { name: 'Email', exact: true }).focus();
  await page.keyboard.press('ArrowDown');
  assert.equal(await menu.locator('[aria-current="true"]').textContent(), contactSelection, 'Arrow handling does not hijack contact links');
  const touchContext = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  const touch = await touchContext.newPage();
  await touch.goto(baseURL);
  await touch.getByRole('button', { name: 'Projects', exact: true }).tap();
  await touch.locator('.project-compendium').waitFor({ state: 'visible' });
  await touch.waitForFunction(() => location.hash === '#projects');
  await touch.getByRole('button', { name: 'Main menu', exact: true }).tap();
  await touch.locator('[data-scene-state="MAIN_MENU_IDLE"]').waitFor();
  await touchContext.close();
  assert.deepEqual(errors, []);
  console.log('PASS: menu, early input, contact/resume, console easter egg and static title, native keyboard access, reduced motion, 12 viewport sizes; no browser exceptions.');
} finally { await browser.close(); }
