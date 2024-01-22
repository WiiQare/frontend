import NewSaving from '@/pages/saving/new';
import { render } from '@testing-library/react';
import { TransactionContext } from '@/components/organisms/Transaction';
import { SessionProvider } from 'next-auth/react';
import { DrawContext } from '../../../pages/_app';
import { QueryClientProvider, QueryClient } from 'react-query';
import DashboardLayout from '../../../layouts/Dashboard';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    router: [],
  }),
}));

describe('Saving', () => {
  it('should render', () => {
    const queryClient = new QueryClient();
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <DrawContext.Provider value={{ draw: {}, setDraw: () => { } }}>
          <SessionProvider session={{ user: { data: { access_token: {} } } }}>
            <TransactionContext.Provider
              value={{ transaction: {}, setTransaction: () => { } }}
            >
              <NewSaving />
            </TransactionContext.Provider>
          </SessionProvider>
        </DrawContext.Provider>
      </QueryClientProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should use DashboardLayout as layout', () => {
    expect(NewSaving.getLayout(<div />)).toEqual(
      <DashboardLayout className="space-y-8">
        <div />
      </DashboardLayout>,
    );
  });
});
