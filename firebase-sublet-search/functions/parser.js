// ###### PARSER ######

const dotenv = require('dotenv');
const OpenAI = require('openai')
dotenv.config();

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

module.exports = parser;