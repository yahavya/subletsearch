const puppeteer = require('puppeteer');
const parser = require('./parser.js');
const fs = require('fs/promises');
const filePath = "/Users/ron/new-sublet-search/dirot/firebase-sublet-search/functions/prompt.txt";


async function scraper(facebookPage) {
  const list = [];
  try {
    const browser = await puppeteer.launch({
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: false,
      args: ['--incognito'],
    });

    const page = await browser.newPage();
    await page.goto(facebookPage);

    const postElements = await page.$$('#m_group_stories_container > section [class="_55wo _5rgr _5gh8 async_like"]');
    await page.waitForSelector('#m_group_stories_container > section [class="_55wo _5rgr _5gh8 async_like"]', { timeout: 3000 });
    
    let count = 0;
    for (const postElement of postElements) {
      const postText = await postElement.$eval('*', (el) => el.textContent);
      const ImageUrlList = []
      
     try {
          const postUrl = await postElement.$eval('div._5rgt._5nk5._5msi > a', (el) => el.href)
          const promptText = await fs.readFile(filePath, 'utf-8');
          const questionMarkIndex = postUrl.indexOf('?')
          const shortenedUrl = postUrl.substring(0, questionMarkIndex);
          const MobileToWebUrl = shortenedUrl.replace('https://m.facebook.com/', 'https://www.facebook.com/')
          console.log("current post: " + MobileToWebUrl)
          const imageUrl = await postElement.$eval('div._5sgk._403j > img, div._50xr._403j > img', (img) => img.src) //currently we're getting one image from each listing and not all images from each listing
          //MobileToWebUrl = MobileToWebUrl.substring(0, MobileToWebUrl.length-1)
          // console.log(MobileToWebUrl)
          const prompt = promptText.replace('## ENTER DATA HERE ##', postText);
          if (!promptText.includes('מחפש') && !promptText.includes('מחפשת')) {
            let listingTextData = await parser(prompt)
            console.log("this is what was returned from chatgpt: " + listingTextData)
            listingTextData = await JSON.parse(listingTextData)
            //console.log("THIS IS LISTING startdate: " + listingTextData.startDate)
            //console.log(listingTextData)
            
            ImageUrlList.push(imageUrl)

            list.push({
              startDate: listingTextData.startDate,
              endDate: listingTextData.endDate,
              roomCount: listingTextData.roomCount,
              area: listingTextData.area,
              price: listingTextData.price,
              floorNumber: listingTextData.floorNumber,
              street: listingTextData.street,
              neighborhood: listingTextData.neighborhood,
              fullText: postText,
              url: MobileToWebUrl,
              images: ImageUrlList
      })
 } } catch (error) {
  console.log(error)
  count +=1
  } 
}
  console.log("errors in total of " + count + " posts")
  await browser.close();

  } catch (error) {
    console.error('An error occurred:', error);
  }
  return list;
}

module.exports = scraper;