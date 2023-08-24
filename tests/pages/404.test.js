import '@testing-library/jest-dom';
import Page from '@/pages/404';
import { render, screen } from '@testing-library/react';

describe('404 page', () => {
  it('should render the page', () => {
    render(<Page />);
    expect(screen.getByText('You seem to be lost!')).toBeInTheDocument();
  });
});
