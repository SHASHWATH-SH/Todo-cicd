import axios from 'axios'; // Use import instead of require
import fs from 'fs';

// Your OpenAI API key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Function to fetch API data with retry logic
async function fetchWithRetry(url, options, retries = 3, delay = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      // Attempt the API call
      const response = await axios.post(url, options);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 429 && i < retries - 1) {
        // If rate-limited, retry after delay
        console.log(`⚠️ Rate limit hit. Retrying in ${delay}ms...`);
        await new Promise(res => setTimeout(res, delay));
      } else {
        // For any other error, throw it
        throw error;
      }
    }
  }
}

// Path to your App.js
const filePath = './src/App.js';

// Read the contents of App.js
const appFile = fs.readFileSync(filePath, 'utf-8');

// OpenAI API URL
const url = 'https://api.openai.com/v1/completions';

// OpenAI request body to generate tests
const options = {
  model: 'text-davinci-003', // Choose your model
  prompt: `
    Given the following JavaScript code for a React component, generate a Jest test case to test its functionality:

    ${appFile}
  `,
  max_tokens: 500,
  temperature: 0.7,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
  stop: ["\n"]
};

// Make the request with retry logic
fetchWithRetry(url, options)
  .then(data => {
    // Extract the generated test code from the API response
    const testCode = data.choices[0].text.trim();

    // Path to save the generated test file
    const testFilePath = './src/App.test.js';

    // Write the test code to the file
    fs.writeFileSync(testFilePath, testCode, 'utf-8');
    console.log('✔️ Jest test case generated and saved as App.test.js');
  })
  .catch(error => {
    console.error('❌ Error generating test:', error);
  });
