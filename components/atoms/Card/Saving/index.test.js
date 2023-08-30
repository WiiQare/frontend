import '@testing-library/jest-dom';
import Saving from '.';
import { render } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import { DrawContext } from '../../../../pages/_app';
import { QueryClientProvider, QueryClient } from 'react-query';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {
      'payment-intent': 'pi_1J4JrjGswQjYFZwX0Z1Z1Z1Z',
    },
  }),
}));

describe('Saving', () => {
  const queryClient = new QueryClient();
  test('should render Saving component', () => {
    const { container } = render(
      <SessionProvider session={{ user: { name: 'John Doe' } }}>
        <DrawContext.Provider
          value={{
            draw: { id: 1 },
            setSaving: jest.fn(),
          }}
        >
          <QueryClientProvider client={queryClient}>
            <Saving />
          </QueryClientProvider>
        </DrawContext.Provider>
      </SessionProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
