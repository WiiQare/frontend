import Done from '@/pages/saving/done';
import { render } from '@testing-library/react';
import { TransactionContext } from '@/components/organisms/Transaction';
import { SessionProvider } from 'next-auth/react';
import { DrawContext } from '@/pages/_app';
import { QueryClientProvider, QueryClient } from 'react-query';
import DashboardLayout from '../../../layouts/Dashboard';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Saving', () => {
  it('should render when redirect succeeds', () => {
    useRouter.mockReturnValueOnce({
      query: {
        redirect_status: 'succeeded',
      },
    });

    const queryClient = new QueryClient();
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <DrawContext.Provider value={{ draw: {}, setDraw: () => { } }}>
          <SessionProvider session={{ user: { data: { access_token: {} } } }}>
            <TransactionContext.Provider
              value={{ transaction: {}, setTransaction: () => { } }}
            >
              <Done />
            </TransactionContext.Provider>
          </SessionProvider>
        </DrawContext.Provider>
      </QueryClientProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render when redirect fails', () => {
    useRouter.mockReturnValueOnce({
      query: {
        redirect_status: 'failed',
      },
    });

    const queryClient = new QueryClient();
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <DrawContext.Provider value={{ draw: {}, setDraw: () => { } }}>
          <SessionProvider session={{ user: { data: { access_token: {} } } }}>
            <TransactionContext.Provider
              value={{ transaction: {}, setTransaction: () => { } }}
            >
              <Done />
            </TransactionContext.Provider>
          </SessionProvider>
        </DrawContext.Provider>
      </QueryClientProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should use DashboardLayout as layout', () => {
    expect(Done.getLayout(<div />)).toEqual(
      <DashboardLayout className="space-y-8">
        <div />
      </DashboardLayout>,
    );
  });
});
