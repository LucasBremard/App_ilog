import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import ThirdPage from '../components/ThirdPage';

test('renders ThirdPage component', () => {
  // Mock the handlePageChange function using Jest's mock function
  const handlePageChange = jest.fn();

  // Render the ThirdPage component with the mocked handlePageChange function
  render(<ThirdPage handlePageChange={handlePageChange} />);

  // Check if the title is rendered correctly
  expect(screen.getByRole('heading', { name: /Scoring grid/i })).toBeInTheDocument();

  // Check if the buttons are rendered
  expect(screen.getByRole('button', { name: 'Stock' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Subject' })).toBeInTheDocument();

  // Check if the table is rendered
  const table = screen.getByRole('table');
  expect(table).toBeInTheDocument();

  // Check if the rows and cells of the table are rendered correctly
  const tableRows = screen.getAllByRole('row');
  expect(tableRows.length).toBe(8); // Including the table header

  const tableCells = screen.getAllByRole('cell');
  expect(tableCells.length).toBe(21); // 3 columns * 7 rows

  // Simulate clicks on the buttons and check if the handlePageChange function is called correctly
  userEvent.click(screen.getByRole('button', { name: 'Stock' }));
  expect(handlePageChange).toHaveBeenCalledWith('first');

  userEvent.click(screen.getByRole('button', { name: 'Subject' }));
  expect(handlePageChange).toHaveBeenCalledWith('second');
});
