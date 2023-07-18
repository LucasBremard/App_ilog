import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import SubjectPage from './SubjectPage';

describe('SubjectPage', () => {
  it('renders page content correctly', () => {
    render(<SubjectPage />);

    // Vérifie que le titre de la page est affiché correctement
    const pageTitle = screen.getByText('Exam subject');
    expect(pageTitle).toBeInTheDocument();

    // Vérifie qu'il y a un bouton pour aller à la première page
    const goToFirstPageButton = screen.getByText('Stock');
    expect(goToFirstPageButton).toBeInTheDocument();

    // Vérifie qu'il y a du contenu texte spécifique à la page
    const expectedText = /Il n’y a pas de projet cadrant/;
    const pageContent = screen.queryByText((content, element) => {
      return element.tagName.toLowerCase() === 'p' && content.match(expectedText);
    });
    expect(pageContent).toBeInTheDocument();

    });
  });
