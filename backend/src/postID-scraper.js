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
    
    let count = 0;
    for (const postElement of postElements){ // IMPORTANT NOTE: Error handling isn't done well here, so must check to see if there are other errors manually (we catch element not found error and skip element)  
        const ImageUrlList = []

      try {
          const postText = await postElement.$eval('*', (el) => el.textContent);
          // need to understand if we should add support for elements with "_5rgt _5nk5 _5wnf _5msi" div
          const postUrl = await postElement.$eval('div._5rgt._5nk5._5msi > a', (el) => el.href)
          const imageUrl = await postElement.$eval('div._5sgk._403j > img, div._50xr._403j > img', (img) => img.src) //currently we're getting one image from each listing and not all images from each listing
          const questionMarkIndex = postUrl.indexOf('?')
          const shortenedUrl = postUrl.substring(0, questionMarkIndex);
          const MobileToWebUrl = shortenedUrl.replace('https://m.facebook.com/', 'https://www.facebook.com/')
          ImageUrlList.push(imageUrl)

          list.push({
            text: postText,
            url: MobileToWebUrl,
            images: ImageUrlList
          });
      }
      catch (error){
        count+=1
      }
    } 
    console.log("errors in total of " + count + " posts")
    console.log(list)
    console.log(list.length)

    await browser.close();
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

const test = await scraper();
console.log(test)


    /* const postData = await page.evaluate(() => {
        const postPods = Array.from(document.querySelectorAll('#m_group_stories_container > section [class="_55wo _5rgr _5gh8 async_like"]'))
        const data = postPods.map((post) => ({
          text: post.querySelector('[class="_5rgt _5nk5 _5wnf _5msi"]').innerText}))
    }) */
      
    /*const postHandles = await page.$$("#m_group_stories_container" )

    for (const postHandle of postHandles){
    const postText = await page.evaluate(el => el.querySelector("span #u_0_2r_Qx").innerText, postHandle)
    console.log(postText)

    const postUrl = await page.evaluate(el => el.querySelector("#u_0_l_Hn > div > div._5rgt._5nk5._5wnf._5msi > a"))

    } */
    
    /*const postElements = await page.$$('#m_group_stories_container > section [class="story_body_container"] > section [class="_5rgt _5nk5 _5wnf _5msi"]');
    await page.waitForSelector('#m_group_stories_container > section [class="_55wo _5rgr _5gh8 async_like"]', { timeout: 3000 });

    const list = []
    for (const postElement of postElements) {
      const postText = await postElement.$eval('span', (el) => el.textContent);
      list.push(postText);
    }
      console.log(list)
    */
 