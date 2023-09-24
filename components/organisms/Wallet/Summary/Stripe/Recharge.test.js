import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Recharge from './Recharge';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {
      'payment-intent': 'pi_1J4JrjGswQjYFZwX0Z1Z1Z1Z',
    },
  }),
}));

describe('Recharge', () => {
  it('renders a recharge button', () => {
    const queryClient = new QueryClient();
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <SessionProvider
          session={{
            user: { name: 'John Doe', data: { access_token: 'at123' } },
          }}
        >
          <Recharge />
        </SessionProvider>
      </QueryClientProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
