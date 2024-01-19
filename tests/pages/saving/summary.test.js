import SavingSummary from '@/pages/saving/summary';
import { render } from '@testing-library/react';
import { TransactionContext } from '@/components/organisms/Transaction';
import { SessionProvider } from 'next-auth/react';
import { DrawContext } from '../../../pages/_app';
import { QueryClientProvider, QueryClient } from 'react-query';
import DashboardLayout from '../../../layouts/Dashboard';

require('jest-fetch-mock').enableMocks();

fetch.mockResponse('[]');

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {
      'payment-intent': 'pi_1J4JrjGswQjYFZwX0Z1Z1Z1Z',
    },
  }),
}));

describe('Saving Summary', () => {
  it('should render', () => {
    const queryClient = new QueryClient();
    const { container } = render(
      <DrawContext.Provider
        value={{
          draw: {},
          setDraw: () => { },
          saving: { plan: { currency: 'GBP' }, target: { currency: 'USD' } },
        }}
      >
        <SessionProvider session={{ user: { data: { access_token: {} } } }}>
          <TransactionContext.Provider
            value={{ transaction: {}, setTransaction: () => { } }}
          >
            <QueryClientProvider client={queryClient}>
              <SavingSummary />
            </QueryClientProvider>
          </TransactionContext.Provider>
        </SessionProvider>
      </DrawContext.Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should use DashboardLayout as layout', () => {
    expect(SavingSummary.getLayout(<div />)).toEqual(
      <DashboardLayout className="space-y-8">
        <div />
      </DashboardLayout>,
    );
  });
});
