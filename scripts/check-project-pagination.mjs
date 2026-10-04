import assert from 'node:assert/strict';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const url = process.env.PORTFOLIO_URL || 'http://127.0.0.1:5173';
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  // Exercise future additions through the real component without editing user data.
  await page.route('**/src/data/portfolio.js*', async route => {
    const response = await route.fetch();
    await route.fulfill({ response, body: `${await response.text()}
      projectData.push(...Array.from({ length: 24 }, (_, index) => ({
        ...projectData[0], id: 'future-' + index,
        name: 'Future project ' + index + ' with a longer descriptive title'
      })));
    ` });
  });
  for (const [width, height] of [[1440,900], [1280,720], [768,1024], [390,844], [320,568], [844,390], [640,360]]) {
    await page.setViewportSize({ width, height });
    await page.goto(`${url}/#projects`);
    await page.evaluate(() => document.fonts.ready);
    const main = page.locator('.project-compendium');
    const visible = main.locator('button.project-choice:visible');
    const selected = main.locator('button.project-choice[aria-pressed="true"]');
    await page.waitForFunction(() => document.querySelector('.project-list-pages span')?.textContent.endsWith('/ 31'));
    const assertFits = async () => {
      assert.ok(await page.evaluate(() => document.documentElement.scrollHeight <= innerHeight && document.documentElement.scrollWidth <= innerWidth), `Viewport fits ${width}x${height}`);
      assert.ok(await visible.evaluateAll(rows => rows.every(row => {
        const box = row.getBoundingClientRect();
        const footer = document.querySelector('.project-list-footer').getBoundingClientRect();
        return box.top >= 0 && box.bottom <= footer.top && box.height >= 44;
      })), `Rows remain readable and clear of controls ${width}x${height}`);
      assert.ok(await main.locator('.project-open').evaluate(el => el.getBoundingClientRect().bottom <= innerHeight), 'Details action is onscreen');
    };
    await assertFits();
    const names = new Set();
    let firstName;
    do {
      const current = await visible.first().innerText();
      if (firstName === undefined) firstName = current;
      else if (current === firstName) break;
      for (const name of await visible.locator('.project-choice-name').allTextContents()) names.add(name);
      await assertFits();
      await main.getByRole('button', { name: 'Next project page', exact: true }).click();
    } while (names.size <= 31);
    assert.equal(names.size, 31, 'Pagination exposes every current and future project');
    // Arrow navigation must reveal the next page before moving focus to its row.
    await visible.last().focus();
    await visible.last().click();
    await page.keyboard.press('ArrowDown');
    assert.ok(await selected.isVisible());
    assert.ok(await selected.evaluate(el => el === document.activeElement));
    const chosen = await selected.locator('.project-choice-name').innerText();
    await page.keyboard.press('Enter');
    assert.equal(await main.locator('.project-detail-name').innerText(), chosen);
    await main.getByRole('button', { name: 'Project list', exact: true }).click();
    await page.waitForFunction(() => document.activeElement?.classList.contains('project-choice'));
    assert.ok(await selected.isVisible());
    await assertFits();
    // Resizing preserves the selected project and keeps it on the visible page.
    await page.setViewportSize({ width: 320, height: 568 });
    await page.waitForTimeout(100);
    assert.equal(await selected.locator('.project-choice-name').innerText(), chosen);
    assert.ok(await selected.isVisible());
  }
  assert.deepEqual(errors, []);
  console.log('PASS: 31 projects, seven viewport sizes, complete pagination, keyboard page crossing, details return and resize preservation.');
} finally { await browser.close(); }
