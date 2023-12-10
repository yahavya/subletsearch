import { config } from 'dotenv';
import fs from 'fs/promises';
import { OpenAI } from 'openai';
import puppeteer from 'puppeteer';

const filePath = '/Users/ron/new-sublet-search/dirot/backend/src/prompt.txt';

config();

async function start() {
  try {
    const promptText = await fs.readFile(filePath, 'utf-8');
    const list = await scraper();
    const newPrompt = promptText.replace('## ENTER DATA HERE ##', list.slice(0, 5));
    const result = await parser(newPrompt);
    return result;
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

async function scraper() {
  const list = [];
  try {
    const browser = await puppeteer.launch({
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: false,
      args: ['--incognito'],
    });

    const page = await browser.newPage();
    await page.goto('https://m.facebook.com/groups/327655587294381/');

    const postElements = await page.$$('#m_group_stories_container > section [class="_55wo _5rgr _5gh8 async_like"]');
    await page.waitForSelector('#m_group_stories_container > section [class="_55wo _5rgr _5gh8 async_like"]', { timeout: 3000 });

    for (const postElement of postElements) {
      const postText = await postElement.$eval('*', (el) => el.textContent);
      list.push(postText + 'END');
    }

    await browser.close();
  } catch (error) {
    console.error('An error occurred:', error);
  }
  return list;
}

const openai = new OpenAI({
  apiKey: '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' //process.env.OPENAI_API_KEY,
});

async function parser(prompt) {
  const completion = await openai.completions.create({
    model: 'gpt-3.5-turbo-instruct',
    prompt: prompt,
    max_tokens: 512,
    temperature: 0,
  });

  console.log(completion.choices[0].text);
  return completion;
}

const results = start();

export { results };
