const puppeteer = require('puppeteer');

(async () => {
  try {
    // Launch a headless browser
    const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: false, args: ['--incognito'] });
    const page = await browser.newPage();

    // Navigate to the Facebook page
    await page.goto('https://m.facebook.com/groups/327655587294381/');

    const postTextSelector = 'div._5rgt._5nk5._5wnf._5msi p' // get the posts texts, probably not the best way to do this

    const postText = await page.$eval(postTextSelector, (element) => element.innerText);
    
    console.log('Post Text:', postText)

    await page.waitForTimeout(2000) // depre

    // Close the browser
    await browser.close();

  } catch (error) {
    console.error('An error occurred:', error);
  }
})();

