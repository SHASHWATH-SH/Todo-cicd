import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

test('task count updates correctly', () => {
  render(<App />);
  
  const inputField = screen.getByPlaceholderText('Add a new task');
  const addButton = screen.getByText('Add');
  
  fireEvent.change(inputField, { target: { value: 'First Task' } });
  fireEvent.click(addButton);
  
  fireEvent.change(inputField, { target: { value: 'Second Task' } });
  fireEvent.click(addButton);
  
  const taskCount = screen.getByText(/Tasks Left: 2/i);
  expect(taskCount).toBeInTheDocument();
  
  const deleteButton = screen.getByText('Delete');
  fireEvent.click(deleteButton);
  
  const updatedTaskCount = screen.getByText(/Tasks Left: 1/i);
  expect(updatedTaskCount).toBeInTheDocument();
});
