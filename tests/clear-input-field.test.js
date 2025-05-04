import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

test('input field clears after adding task', () => {
  render(<App />);
  
  const inputField = screen.getByPlaceholderText('Add a new task');
  const addButton = screen.getByText('Add');
  
  fireEvent.change(inputField, { target: { value: 'Task to Add' } });
  fireEvent.click(addButton);
  
  expect(inputField.value).toBe('');
});
