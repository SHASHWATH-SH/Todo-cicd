import fs from 'fs';
import axios from 'axios';
import path from 'path';

// Ensure src directory exists
const testDir = './src';
if (!fs.existsSync(testDir)) {
  fs.mkdirSync(testDir);
}

// Construct the prompt
const prompt = `
Write a basic Jest test file for a React component named App.
Assume the App component renders a heading with the text "My Todo App".
Write the test in a file called App.test.js using @testing-library/react.
`;

// Send request to OpenAI API
const apiKey = process.env.OPENAI_API_KEY;
const endpoint = 'https://api.openai.com/v1/chat/completions';

try {
  const response = await axios.post(
    endpoint,
    {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.5,
      max_tokens: 300,
    },
    {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const testCode = response.data.choices[0].message.content;

  // Write the test file
  fs.writeFileSync(path.join(testDir, 'App.test.js'), testCode);
  console.log('✅ Test file generated successfully!');

} catch (error) {
  console.error('❌ Error generating test:', error.message);
  process.exit(1);
}
