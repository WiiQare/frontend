import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import NoAction from './NoAction';

describe('NoAction button', () => {
  it('should render the component', () => {
    render(<NoAction />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render the text', () => {
    const text = 'Button';
    render(<NoAction text={text} />);
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
