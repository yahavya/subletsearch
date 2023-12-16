import dotenv from 'dotenv';
import fs from 'fs/promises';
import { OpenAI } from 'openai';
import puppeteer from 'puppeteer';
dotenv.config()

const filePath = '/Users/ron/new-sublet-search/dirot/backend/src/prompt.txt';

export default async function getNewListings() {
  try {
    const promptText = await fs.readFile(filePath, 'utf-8');
    const list = await scraper();
    const newPrompt = promptText.replace('## ENTER DATA HERE ##', list.slice(0, 5));
    const result = await parser(newPrompt);
    console.log(result);
    return result;
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
// ###### SCRAPER ######
async function scraper() {
  const list = [];
  try {
    const browser = await puppeteer.launch({
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: false,
      args: ['--incognito'],
    });

    const page = await browser.newPage();
    await page.goto('https://m.facebook.com/groups/447412252098033/');

    const postElements = await page.$$('#m_group_stories_container > section [class="_55wo _5rgr _5gh8 async_like"]');
    await page.waitForSelector('#m_group_stories_container > section [class="_55wo _5rgr _5gh8 async_like"]', { timeout: 3000 });
    
    let count = 0;
    for (const postElement of postElements) {
      const postText = await postElement.$eval('*', (el) => el.textContent);
      const ImageUrlList = []
      try {
          const postUrl = await postElement.$eval('div._5rgt._5nk5._5msi > a', (el) => el.href)
          const questionMarkIndex = postUrl.indexOf('?')
          const shortenedUrl = postUrl.substring(0, questionMarkIndex);
          const MobileToWebUrl = shortenedUrl.replace('https://m.facebook.com/', 'https://www.facebook.com/')
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
  return list;
}
// ###### TEST FUNCTION ######
async function test() {
    try {
        const list = await scraper();
        console.log(list)
        console.log(list.length)
    } catch (error) {
        console.error('An error occurred:', error);
    }
  }

getNewListings();

// ###### PARSER ######
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
async function parser(prompt) {
  
  const completion = await openai.completions.create({
    model: 'gpt-3.5-turbo-instruct',
    prompt: prompt,
    max_tokens: 512,
    temperature: 0,
  });

  //console.log(completion.choices[0].text);
  return completion.choices[0].text;
}
