import { render, screen } from '@testing-library/react';
import App from '../App'; // Adjust path if needed

test('renders welcome message', () => {
  render(<App />);
  const headerElement = screen.getByText(/Add an event/i);  // Adjust the text to match an element in your App
  expect(headerElement).toBeInTheDocument();
});
