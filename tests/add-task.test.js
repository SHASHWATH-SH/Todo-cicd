import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

test('adds a new task', () => {
  render(<App />);
  
  const inputField = screen.getByPlaceholderText('Add a new task');
  const addButton = screen.getByText('Add');
  
  fireEvent.change(inputField, { target: { value: 'New Task' } });
  fireEvent.click(addButton);
  
  const taskElement = screen.getByText('New Task');
  expect(taskElement).toBeInTheDocument();
});
