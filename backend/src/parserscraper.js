const { config } = require('dotenv')
const fs = require('fs')
const { OpenAI } = require('openai')
const puppeteer = require('puppeteer');
const filePath = '/Users/ron/dirot-repo/dirot/src/prompt.txt';
const promptText = fs.readFileSync(filePath, 'utf-8');

config();

async function scraper(){
    list = []
  try {
    // Launch a headless browser
    const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: false, args: ['--incognito'] });
    const page = await browser.newPage();

    // Navigate to the Facebook page 
    await page.goto('https://m.facebook.com/groups/327655587294381/');

    // const postTextSelector = 'div._5rgt._5nk5._5wnf._5msi p' // get the posts texts, probably not the best way to do this
    const postElements = await page.$$('#m_group_stories_container > section [class="_55wo _5rgr _5gh8 async_like"]');
    
    // wait for the posts to load
    await page.waitForSelector('#m_group_stories_container > section [class="_55wo _5rgr _5gh8 async_like"]', { timeout: 3000 });

    for (const postElement of postElements) {
            const postText = await postElement.$eval('*', (el) => el.textContent);
            list.push(postText + "END")
    }
    // Close the browser
    await browser.close();

  } catch (error) {
    console.error('An error occurred:', error);
  }
  return list
};

const openai = new OpenAI({
     apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

async function start() {
    try {
        const list = await scraper();
        let new_prompt = promptText.replace("## ENTER DATA HERE ##", list.slice(0,5))
        //console.log(list)
        let result =  await parser(new_prompt)
        return result;

    } catch (error) {
        console.error('An error occurred:', error);
    }
};

async function parser(prompt) {
  const completion = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: prompt,
    max_tokens: 512,
    temperature: 0,
  });

  console.log(completion.choices[0].text);  
  return completion;

}

let results = start();

// current issue is that properties endpoint is empty

module.exports = {   
  results
};


