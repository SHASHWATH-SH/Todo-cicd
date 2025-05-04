// ai_test_suggester.js
const fs = require('fs');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function suggestTests() {
  const componentPath = './src/App.js'; // adjust path if needed
  const componentCode = fs.readFileSync(componentPath, 'utf-8');

  const prompt = `
Given the following React component, suggest 2–3 test cases using Jest and React Testing Library. 
Only provide the test code (no explanation).

React component:
${componentCode}
`;

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
  });

  const suggestions = response.data.choices[0].message.content;
  fs.writeFileSync("ai-test-suggestions.md", suggestions);
  console.log("AI test suggestions written to ai-test-suggestions.md");
}

suggestTests();
