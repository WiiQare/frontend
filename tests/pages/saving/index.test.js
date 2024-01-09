import Saving from '@/pages/saving';
import { render } from '@testing-library/react';
import { TransactionContext } from '@/components/organisms/Transaction';
import { SessionProvider } from 'next-auth/react';
import DashboardLayout from '../../../layouts/Dashboard';

describe('Saving', () => {
  it('should render', () => {
    const { container } = render(
      <SessionProvider session={{ user: { data: { access_token: {} } } }}>
        <TransactionContext.Provider
          value={{ transaction: {}, setTransaction: () => { } }}
        >
          <Saving />
        </TransactionContext.Provider>
      </SessionProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should use DashboardLayout as layout', () => {
    expect(Saving.getLayout(<div />)).toEqual(
      <DashboardLayout className="space-y-8">
        <div />
      </DashboardLayout>,
    );
  });
});
