import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import StockManager from './StockManager';

const { getByLabelText, getByTestId, queryByText } = render(<StockManager />);

test('adds stock item', () => {

  // Remplir les champs
  fireEvent.change(getByLabelText('Name:'), { target: { value: 'Item 1' } });
  fireEvent.change(getByLabelText('Description:'), { target: { value: 'Description 1' } });
  fireEvent.change(getByLabelText('Quantity:'), { target: { value: '10' } });

  // Cliquer sur le bouton d'ajout
  fireEvent.click(getByTestId('add-button'));

  // Vérifier que l'article a été ajouté à la liste de stocks
  const stockList = getByTestId('stock-list');
  const stockItem = queryByText((content, element) => {
    const hasText = node => node.textContent === 'Item 1' || node.textContent === 'Description 1' || node.textContent === 'Quantity: 10';
    const nodeHasText = hasText(element);
    const childrenDontHaveText = Array.from(element.children).every(child => !hasText(child));
    return nodeHasText && childrenDontHaveText;
  });
  expect(stockItem).toBeVisible();

  // Vérifier que les champs sont réinitialisés après l'ajout
  expect(getByLabelText('Name:')).toHaveValue('');
  expect(getByLabelText('Description:')).toHaveValue('');
  expect(getByLabelText('Quantity:')).toHaveDisplayValue('0');

  // Vérifie que le bouton Delete supprime l'article de la liste de stocks
  const deleteButton = screen.getByText('Delete');
  fireEvent.click(deleteButton);
  expect(queryByText(/Item 1 - Description 1 - Quantity: 10/i)).toBeNull();
});

test('displays error message when fields are not filled or quantity is 0', () => {
  const { getByTestId, queryByText } = render(<StockManager />);

  // Cliquer sur le bouton d'ajout sans remplir les champs
  fireEvent.click(getByTestId('add-button'));

  // Vérifier que le message d'erreur est affiché
  const errorMessage = queryByText((content, element) => {
    return content === 'Please fill in all fields and ensure quantity is greater than 0.';
  });

  expect(errorMessage).toBeInTheDocument();
});

test('renders contact form inputs', () => {
  const { getByLabelText } = render(<StockManager />);

  const lastNameInput = getByLabelText('Last name:');
  const firstNameInput = getByLabelText('First name:');
  const emailInput = getByLabelText('Mail:');
  const messageTextarea = getByLabelText('Message:');

  expect(lastNameInput).toBeInTheDocument();
  expect(firstNameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(messageTextarea).toBeInTheDocument();
});

test('does not display error messages when required fields are filled', () => {
  const { queryByText, getByLabelText, getByRole } = render(<StockManager />);

  const lastNameInput = getByLabelText('Last name:');
  const firstNameInput = getByLabelText('First name:');
  const emailInput = getByLabelText('Mail:');
  const messageTextarea = getByLabelText('Message:');
  const sendButton = getByRole('button', { name: 'Send message' });

  fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
  fireEvent.change(firstNameInput, { target: { value: 'John' } });
  fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
  fireEvent.change(messageTextarea, { target: { value: 'Hello, this is a message.' } });
  fireEvent.click(sendButton);

  const lastNameError = queryByText('Please enter your name.');
  const firstNameError = queryByText('Please enter your first name.');
  const emailError = queryByText('Please enter your email address.');
  const messageError = queryByText('Please enter a message.');

  expect(lastNameError).toBeNull();
  expect(firstNameError).toBeNull();
  expect(emailError).toBeNull();
  expect(messageError).toBeNull();
  expect(lastNameInput).not.toHaveClass('error');
  expect(firstNameInput).not.toHaveClass('error');
  expect(emailInput).not.toHaveClass('error');
  expect(messageTextarea).not.toHaveClass('error');
});

test('displays success message after sending a message', () => {
  const { getByLabelText, getByRole, getByText } = render(<StockManager />);

  const lastNameInput = getByLabelText('Last name:');
  const firstNameInput = getByLabelText('First name:');
  const emailInput = getByLabelText('Mail:');
  const messageTextarea = getByLabelText('Message:');
  const sendButton = getByRole('button', { name: 'Send message' });

  fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
  fireEvent.change(firstNameInput, { target: { value: 'John' } });
  fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
  fireEvent.change(messageTextarea, { target: { value: 'Hello, this is a message.' } });
  fireEvent.click(sendButton);

  const successMessage = getByText('Message sent successfully!');

  expect(successMessage).toBeInTheDocument();
});
