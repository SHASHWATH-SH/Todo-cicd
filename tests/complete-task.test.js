import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

test('marks a task as completed', () => {
  render(<App />);
  
  const inputField = screen.getByPlaceholderText('Add a new task');
  const addButton = screen.getByText('Add');
  fireEvent.change(inputField, { target: { value: 'Complete Task' } });
  fireEvent.click(addButton);

  const taskElement = screen.getByText('Complete Task');
  fireEvent.click(taskElement);
  
  expect(taskElement).toHaveClass('completed');
});
