const puppeteer = require('puppeteer');

(async () => {
  try {
    // launch a headless browser

    const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--incognito'] });
    const page = await browser.newPage();

    // navigate to the Facebook page
    
    await page.goto('https://m.facebook.com/groups/327655587294381/');

    // get the list of posts
    const postElements = await page.$$('#m_group_stories_container > section [class="_55wo _5rgr _5gh8 async_like"]');

    // wait for the posts to load

    await page.waitForSelector('#m_group_stories_container > section [class="_55wo _5rgr _5gh8 async_like"]', {timeout: 3_000});
    
    // create a list to store the post texts

    const list = [];

    for (const postElement of postElements) {
        const postText = await postElement.$eval('*', (el) => el.textContent);
        // console.log('Post Text:', postText);
        list.push(postText);
        }

        console.log(list);
        console.log(list.length);

    // close the browser
    await browser.close();

  } catch (error) {
    console.error('An error occurred:', error);
  }
})();

