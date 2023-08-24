import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Bottom from './Bottom';

describe('Bottom', () => {
  it('should render the component', () => {
    render(<Bottom />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('My Wallet')).toBeInTheDocument();
    expect(screen.getByText('Invoices')).toBeInTheDocument();
    expect(screen.getByText('Transactions')).toBeInTheDocument();
  });
});
