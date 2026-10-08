import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const url = process.env.PORTFOLIO_URL || 'http://127.0.0.1:5173';
const output = process.env.ABOUT_CAPTURE_DIR || '/tmp/about-review';
const errors = [], logs = [];
page.on('pageerror', error => errors.push(error.message));
page.on('console', message => logs.push(message.text()));
const idle = state => page.locator(`[data-scene-state="${state}"]`).waitFor();
try {
  await fs.mkdir(output, { recursive: true });
  await page.goto(`${url}/#about`);
  await idle('ABOUT_IDLE');
  await page.evaluate(() => document.fonts.ready);
  const main = page.locator('#about');
  assert.equal(await main.locator('h1').getAttribute('aria-label'), 'Archel Taneka Sutanto');
  assert.equal(await page.locator('.page-load-dive').count(), 0);
  assert.equal(await main.locator('.profile-principle').count(), 3);
  assert.equal(await main.locator('.profile-target-roles li').count(), 4);
  assert.equal(await main.locator('#profile-arc-heading').textContent(), 'Target roles');
  assert.equal(await main.locator('.profile-achievement').count(), 3);
  for (const item of await main.locator('.profile-achievement').all()) {
    assert.equal(await item.locator('dd').first().isVisible(), true);
    assert.equal(await item.locator('dd').count(), 1);
    assert.equal(await item.locator('.profile-achievement-result strong').isVisible(), true);
  }
  assert.equal(await main.locator('.profile-achievement summary').count(), 0);
  assert.equal(await main.locator('.profile-statement').evaluate(el => el.scrollHeight > el.clientHeight), false);
  await main.locator('img').evaluate(img => img.decode());
  for (const [width, height] of [[1920,1080],[1440,900],[1280,800],[1024,768],[768,1024],[390,844],[320,568],[844,390]]) {
    await page.setViewportSize({ width, height });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `${output}/about-${width}.png`, fullPage: true });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `No overflow at ${width}`);
    const boxes = {};
    for (const name of ['identity','statement','principles','arc','controls']) boxes[name] = await main.locator(`.profile-${name}`).boundingBox();
    const overlap = (a,b) => a.x < b.x+b.width && a.x+a.width > b.x && a.y < b.y+b.height && a.y+a.height > b.y;
    for (const [a,b] of [['statement','principles'],['statement','arc'],['arc','controls'],['identity','statement'],['identity','principles']]) assert.ok(!overlap(boxes[a],boxes[b]), `${a}/${b} clearance at ${width}`);
    if (width >= 900) for (const [name,box] of Object.entries(boxes)) assert.ok(box.y+box.height <= height+1, `${name} viewport fit at ${width}`);
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  const name = main.locator('.profile-name');
  await name.hover({ position: { x: 120, y: 100 } });
  assert.ok((await main.locator('.profile-chinese').evaluate(el => getComputedStyle(el).clipPath)).startsWith('circle(100px'));
  assert.ok((await main.locator('.profile-english').evaluate(el => getComputedStyle(el).maskImage)).includes('radial-gradient'));
  await name.focus(); await page.keyboard.press('Enter');
  assert.equal(await name.getAttribute('aria-pressed'), 'true');
  assert.equal(await main.locator('.profile-english').evaluate(el => getComputedStyle(el).opacity), '0');
  assert.equal(await main.locator('.profile-chinese .profile-name-line').count(), 3);
  await page.screenshot({ path: `${output}/name-revealed.png` });
  await page.keyboard.press('Enter');
  for (const [command,file] of [['australia','profile-au.webp'],['uk','profile-uk.webp'],['london','profile-uk.webp'],['reset','profile.webp']]) {
    await page.keyboard.type(command);
    assert.ok((await main.locator('img').getAttribute('src')).endsWith(file));
  }
  assert.ok(logs.some(log => log.includes('not a typical HR')));
  const title = await page.title();
  await page.evaluate(() => window.dispatchEvent(new Event('blur')));
  assert.equal(await page.title(), 'Still reviewing data science candidates?');
  await page.evaluate(() => window.dispatchEvent(new Event('focus')));
  assert.equal(await page.title(), title);
  await page.keyboard.press('Escape'); await idle('MAIN_MENU_IDLE');
  assert.equal(await page.locator('#about').count(), 0, 'About unmounts');
  assert.equal(await page.locator('.menu-entry-about button').evaluate(el => el === document.activeElement), true);
  await page.getByRole('button', { name: 'About', exact: true }).click();
  await page.waitForFunction(() => document.getAnimations().some(a => a.id === 'scene-water-reveal'));
  for (const time of [80,180,280,380]) {
    await page.evaluate(time => document.getAnimations().filter(a => a.id === 'scene-water-reveal' || a.id.startsWith('scene-navigation')).forEach(a => { a.pause(); a.currentTime=time; }),time);
    await page.screenshot({path:`${output}/entry-${time}.png`});
  }
  await page.evaluate(() => document.getAnimations().filter(a => a.id === 'scene-water-reveal' || a.id.startsWith('scene-navigation')).forEach(a => a.play()));
  await idle('ABOUT_IDLE');
  assert.equal(await page.locator('.page-load-dive').count(),0,'Dive never replays');
  assert.equal(await main.locator('h1').evaluate(el => el === document.activeElement),true);
  await main.getByRole('button', { name: 'Pause animation' }).click();
  assert.equal(await main.getAttribute('data-motion'),'paused');
  await main.locator('.profile-back').click(); await idle('MAIN_MENU_IDLE');
  await page.goBack(); await idle('ABOUT_IDLE');
  assert.equal(await main.getAttribute('data-motion'),'paused','About pause survives revisits');
  await page.goForward(); await idle('MAIN_MENU_IDLE');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.getByRole('button', { name: 'About', exact: true }).click(); await idle('ABOUT_IDLE');
  assert.equal(await main.locator('.profile-fragment').evaluate(el => getComputedStyle(el).animationName),'none');
  assert.equal(await main.locator('.profile-motion').isVisible(),false);
  await page.screenshot({path:`${output}/reduced.png`});
  await main.locator('.profile-back').click(); await idle('MAIN_MENU_IDLE');
  for (const [label, route, state] of [['Experience','experience','STATS_IDLE'],['Projects','projects','PROJECTS_IDLE'],['Skills','skills','SKILLS_IDLE']]) {
    await page.getByRole('button',{name:label,exact:true}).click(); await idle(state);
    await page.locator(`[data-scene="${route}"]`).getByRole('button',{name:'Main menu',exact:true}).click();
    await idle('MAIN_MENU_IDLE');
  }
  const touch=await browser.newPage({viewport:{width:390,height:844},hasTouch:true,isMobile:true,reducedMotion:'reduce'});
  await touch.goto(`${url}/#about`);
  await touch.locator('.profile-name').tap();
  assert.equal(await touch.locator('.profile-name').getAttribute('aria-pressed'),'true');
  await touch.locator('.profile-back').tap();
  await touch.locator('[data-scene-state="MAIN_MENU_IDLE"]').waitFor();
  await touch.close();
  assert.deepEqual(errors,[]);
  console.log('About passed: 8 viewports, navigation/history/focus, all four easter eggs, touch, pause, reduced motion; captures:',output);
} finally { await browser.close(); }
