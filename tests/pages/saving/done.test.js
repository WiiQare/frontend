import Done from '@/pages/saving/done';
import { render } from '@testing-library/react';
import { TransactionContext } from '@/components/organisms/Transaction';
import { SessionProvider } from 'next-auth/react';
import { DrawContext } from '@/pages/_app';
import { QueryClientProvider, QueryClient } from 'react-query';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {
      redirect_status: 'succeeded',
    },
  }),
}));

describe('Saving', () => {
  it('should render', () => {
    const queryClient = new QueryClient();
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <DrawContext.Provider value={{ draw: {}, setDraw: () => {} }}>
          <SessionProvider session={{ user: { data: { access_token: {} } } }}>
            <TransactionContext.Provider
              value={{ transaction: {}, setTransaction: () => {} }}
            >
              <Done />
            </TransactionContext.Provider>
          </SessionProvider>
        </DrawContext.Provider>
      </QueryClientProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
