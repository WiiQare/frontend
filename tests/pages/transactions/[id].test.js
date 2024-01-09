import Page from '@/pages/transactions/[id]';
import DashboardLayout from '../../../layouts/Dashboard';


describe('Transactions id page', () => {
  it.todo('should render the page');

  it('should have DashboardLayout', () => {
    expect(Page.getLayout(<div />)).toEqual(
      <DashboardLayout className="space-y-8">
        <div />
      </DashboardLayout>
    );
  });
});
