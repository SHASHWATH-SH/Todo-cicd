import { render, screen } from '@testing-library/react';
import Navbar from '../components/Navbar';

test('renders the navbar title', () => {
  render(<Navbar />);
  const heading = screen.getByText(/iTask/i);
  expect(heading).toBeInTheDocument();
});
