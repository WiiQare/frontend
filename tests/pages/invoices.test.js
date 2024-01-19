import '@testing-library/jest-dom';
import Page from '@/pages/invoices';
import { render, screen } from '@testing-library/react';
import DashboardLayout from '../../layouts/Dashboard';

describe('invoices page', () => {
  it('should have Invoices', () => {
    render(<Page />);
    expect(screen.getByText('Invoices')).toBeInTheDocument();
  });

  it('should render the invoices page', () => {
    const { container } = render(<Page />);
    expect(container).toMatchSnapshot();
  });

  it('should have DashboardLayout', () => {
    expect(Page.getLayout(<div />)).toEqual(
      <DashboardLayout className="space-y-8">
        <div />
      </DashboardLayout>
    );
  });
});