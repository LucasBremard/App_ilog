import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import ThirdPage from './ThirdPage';

test('renders ThirdPage component', () => {
  const handlePageChange = jest.fn();
  render(<ThirdPage handlePageChange={handlePageChange} />);

  // Vérifie si le titre est rendu correctement
  expect(screen.getByRole('heading', { name: /Scoring grid/i })).toBeInTheDocument();

  // Vérifie si les boutons sont rendus
  expect(screen.getByRole('button', { name: 'Stock' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Subject' })).toBeInTheDocument();

  // Vérifie si le tableau est rendu
  const table = screen.getByRole('table');
  expect(table).toBeInTheDocument();

  // Vérifie si les lignes et les cellules du tableau sont rendues correctement
  const tableRows = screen.getAllByRole('row');
  expect(tableRows.length).toBe(8); // Y compris l'en-tête du tableau

  const tableCells = screen.getAllByRole('cell');
  expect(tableCells.length).toBe(21); // 3 colonnes * 7 lignes

  // Simule les clics sur les boutons et vérifie si la fonction handlePageChange est appelée correctement
  userEvent.click(screen.getByRole('button', { name: 'Stock' }));
  expect(handlePageChange).toHaveBeenCalledWith('first');

  userEvent.click(screen.getByRole('button', { name: 'Subject' }));
  expect(handlePageChange).toHaveBeenCalledWith('second');
});
