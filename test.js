const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: 'tmp/example.png'}); // if there's already an image saved, what happens?

  console.log("saved screenshot");
  await browser.close();
})();

// add in an else here - if something goes wrong, exit.
