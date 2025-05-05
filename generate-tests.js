// generate-tests.js
const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');

// Load API key from environment variable
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const appCode = fs.readFileSync(path.join(__dirname, 'src', 'App.js'), 'utf-8');

async function generateTest() {
  const prompt = `You are a JavaScript testing expert. Generate a complete Jest + React Testing Library test file for the following React code:\n\n${appCode}`;

  const chat = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
  });

  const testCode = chat.choices[0].message.content;

  const testFilePath = path.join(__dirname, 'src', '__tests__', 'App.test.js');
  fs.writeFileSync(testFilePath, testCode);
  console.log("✅ Test generated at:", testFilePath);
}

generateTest().catch(console.error);
