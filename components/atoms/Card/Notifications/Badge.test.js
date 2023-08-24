import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Badge from './Badge';

describe('Badge', () => {
  it('should render the component', () => {
    const title = 'Title';
    render(<Badge title={title} avatar={'https://via.placeholder.com/150'} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('should render the children', () => {
    const time = 'Time';
    render(<Badge time={time} avatar={'https://via.placeholder.com/150'} />);
    expect(screen.getByText(time)).toBeInTheDocument();
  });
});
