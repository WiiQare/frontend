import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Progress from '.';

describe('Progress', () => {
  it('should render the component', () => {
    render(<Progress link={'/'} currency={'USD'} operations={[]} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  // it('should render the value', () => {
  //   const value = 50;
  //   render(
  //     <Progress value={value} link={'/'} currency={'USD'} operations={[]} />,
  //   );
  //   expect(screen.getByText(`${value}%`)).toBeInTheDocument();
  // });
});
