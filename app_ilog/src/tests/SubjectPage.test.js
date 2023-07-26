import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import SubjectPage from '../components/SubjectPage';

describe('SubjectPage', () => {
  it('renders page content correctly', () => {
    render(<SubjectPage />);

    // Verify that the page title is displayed correctly
    const pageTitle = screen.getByText('Exam subject');
    expect(pageTitle).toBeInTheDocument();

    // Verify that there is a button to navigate to the first page
    const goToFirstPageButton = screen.getByText('Stock');
    expect(goToFirstPageButton).toBeInTheDocument();

    // Verify that there is specific page content
    const expectedText = /Il n’y a pas de projet cadrant/;
    const pageContent = screen.queryByText((content, element) => {
      return element.tagName.toLowerCase() === 'p' && content.match(expectedText);
    });
    expect(pageContent).toBeInTheDocument();

  });
});
