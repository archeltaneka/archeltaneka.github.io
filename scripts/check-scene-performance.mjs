const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(process.env.PORTFOLIO_URL || 'http://127.0.0.1:5173');
  await page.locator('.landing[data-intro="complete"]').waitFor();
  for (const mode of ['idle', 'forward', 'stats', 'back', 'forward']) {
    console.log(mode, await page.evaluate(async mode => {
      const frames = [], tasks = [];
      const observer = new PerformanceObserver(list => tasks.push(...list.getEntries().map(entry => ({ start: entry.startTime, duration: entry.duration }))));
      observer.observe({ type: 'longtask' });
      return new Promise(resolve => {
        requestAnimationFrame(start => {
          let last = start;
          if (mode === 'forward') document.querySelector('.menu-entry-experience button').click();
          if (mode === 'back') document.querySelector('.experience-back').click();
          const frame = now => {
            frames.push(now - last); last = now;
            if (now - start < 1200) requestAnimationFrame(frame);
            else {
              observer.disconnect(); frames.sort((a,b) => a-b);
              resolve({ frames: frames.length, median: frames[Math.floor(frames.length * .5)], p95: frames[Math.floor(frames.length * .95)], longTasks: tasks.map(task => Math.round(task.duration)) });
            }
          };
          requestAnimationFrame(frame);
        });
      });
    }, mode));
    await page.waitForTimeout(300);
  }
} finally { await browser.close(); }
