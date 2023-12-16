import dotenv from 'dotenv';
import puppeteer from 'puppeteer';
dotenv.config()
const list = []
const url_list = []

/* different postUrl class names: 
          _5rgt _5nk5 _5wnf _5msi
          _5rgt _5nk5 _5msi
  
*/
async function scraper() {
  try {
    const browser = await puppeteer.launch({
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: false,
      args: ['--incognito'],
    });

    const page = await browser.newPage();
    await page.goto('https://m.facebook.com/groups/327655587294381/');

    const postElements = await page.$$('#m_group_stories_container > section [class="_55wo _5rgr _5gh8 async_like"]');
    await page.waitForSelector('#m_group_stories_container > section [class="_55wo _5rgr _5gh8 async_like"]', { timeout: 5000 });
    const imageElements = await page.$$('#m_group_stories_container > section [class="_5rgu _7dc9 _27x0"]')
    
    // image types: _50xr _403j AND ._5sgk.403j
    let count = 0;
    for (const postElement of postElements){ // IMPORTANT NOTE: Error handling isn't done well here, so must check to see if there are other errors manually (we catch element not found error and skip element)
          const postText = await postElement.$eval('*', (el) => el.textContent);
          const currentImageList = []
          const ImageUrlList = []
          
          try {
          const postUrl = await postElement.$eval('div._5rgt._5nk5._5msi > a', (el) => el.href)
          const questionMarkIndex = postUrl.indexOf('?')
          const shortenedUrl = postUrl.substring(0, questionMarkIndex);
          const MobileToWebUrl = shortenedUrl.replace('https://m.facebook.com/', 'https://www.facebook.com/')

          //for (const ... ) {} // fill this in
          const imageUrl = await postElement.$eval('div._5sgk._403j > img, div._50xr._403j > img', (img) => img.src) //currently we're getting one image from each listing and not all images from each listing

          ImageUrlList.push(imageUrl)
          list.push({
            text: postText,
            url: MobileToWebUrl,
            images: ImageUrlList
    })
} catch (error) {
    count +=1
}
    }
    console.log("errors in total of " + count + " posts")
    
    await browser.close();

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

scraper();
 