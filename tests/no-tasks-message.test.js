import { render, screen } from '@testing-library/react';
import App from '../App';

test('displays message when no tasks are available', () => {
  render(<App />);
  
  const messageElement = screen.getByText(/no tasks to display/i);
  expect(messageElement).toBeInTheDocument();
});
