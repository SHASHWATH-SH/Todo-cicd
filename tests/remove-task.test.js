import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

test('removes a task', () => {
  render(<App />);
  
  const inputField = screen.getByPlaceholderText('Add a new task');
  const addButton = screen.getByText('Add');
  fireEvent.change(inputField, { target: { value: 'Task to remove' } });
  fireEvent.click(addButton);

  const deleteButton = screen.getByText('Delete');
  fireEvent.click(deleteButton);
  
  const taskElement = screen.queryByText('Task to remove');
  expect(taskElement).not.toBeInTheDocument();
});
