import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('adds a new todo item', () => {
  render(<App />);
  
  // Find input field and button
  const input = screen.getByPlaceholderText(/add a new todo/i);
  const addButton = screen.getByText(/add/i);

  // Simulate typing a new task
  fireEvent.change(input, { target: { value: 'Learn Docker' } });

  // Simulate clicking Add button
  fireEvent.click(addButton);

  // Check if new todo appears in the list
  const newTodo = screen.getByText(/learn docker/i);
  expect(newTodo).toBeInTheDocument();
});
