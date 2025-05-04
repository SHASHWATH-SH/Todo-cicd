// generate-tests.js
const fs = require('fs');
const axios = require('axios');

const openaiApiKey = process.env.OPENAI_API_KEY;

const prompt = `
Write unit tests in JavaScript using Jest for the following code.
Code:
${fs.readFileSync('./src/App.js', 'utf-8')}
`;

async function generateTests() {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are an expert JavaScript developer.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.2
      },
      {
        headers: {
          Authorization: `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const generatedTest = response.data.choices[0].message.content;

    fs.writeFileSync('./src/App.test.js', generatedTest);
    console.log('✅ Test case generated successfully!');
  } catch (error) {
    console.error('❌ Error generating test:', error.response?.data || error.message);
  }
}

generateTests();
