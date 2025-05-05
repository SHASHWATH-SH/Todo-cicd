import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders My Todo App heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Add a Todo/i);
  expect(headingElement).toBeInTheDocument();
});
