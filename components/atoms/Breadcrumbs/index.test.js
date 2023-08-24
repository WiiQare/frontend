import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Breadcrumb from '.';

describe('Breadcrumb', () => {
  it('should render the component', () => {
    render(<Breadcrumb items={[]} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('should render the items', () => {
    const items = [
      { item: 'Home', link: '/' },
      { item: 'About', link: '/about' },
    ];
    render(<Breadcrumb items={items} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });
});
