// generate-tests.cjs

const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src', 'App.jsx');
const testPath = path.join(__dirname, 'src', '__tests__', 'App.test.js');

// Ensure __tests__ directory exists
fs.mkdirSync(path.dirname(testPath), { recursive: true });

// Check if App.jsx exists
if (!fs.existsSync(appPath)) {
  console.error('❌ App.jsx not found.');
  process.exit(1);
}

// Generate a basic test case
const testContent = `
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders the Todo App header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Add a todo/i);
  expect(headerElement).toBeInTheDocument();
});
`;

// Write the test file
fs.writeFileSync(testPath, testContent);
console.log('✅ App.test.js generated successfully!');
