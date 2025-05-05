import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders My Todo App heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/iTask/i);
  expect(headingElement).toBeInTheDocument();
});
