import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Stripe from '.';
import { DrawContext } from '@/pages/_app';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {
      'payment-intent': 'pi_1J4JrjGswQjYFZwX0Z1Z1Z1Z',
    },
  }),
}));

describe('Stripe', () => {
  it('should render', () => {
    const queryClient = new QueryClient();
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={{ user: {} }}>
          <DrawContext.Provider
            value={{
              draw: { id: 1 },
              saving: {
                plan: { amount: 0, currency: 'USD' },
                target: { currency: 'GBP' },
              },
              setSaving: jest.fn(),
            }}
          >
            <Stripe />
          </DrawContext.Provider>
        </SessionProvider>
      </QueryClientProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
