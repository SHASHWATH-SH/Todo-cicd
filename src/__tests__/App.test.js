import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome message', () => {
  render(<App />);
  const headerElement = screen.getByText(/Welcome to the Todo App/i);
  expect(headerElement).toBeInTheDocument();
});
