import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

test('prevents empty task submissions', () => {
  render(<App />);
  
  const inputField = screen.getByPlaceholderText('Add a new task');
  const addButton = screen.getByText('Add');
  
  fireEvent.change(inputField, { target: { value: '' } });
  fireEvent.click(addButton);
  
  const taskElements = screen.queryAllByText('');
  expect(taskElements.length).toBe(0);
});
