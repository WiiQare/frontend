import Page from '@/pages/forgot/password';
import { render } from '@testing-library/react';
import { DrawContext } from '@/pages/_app';
import { SessionProvider } from 'next-auth/react';
import { QueryClientProvider, QueryClient } from 'react-query';
require('jest-fetch-mock').enableMocks();

fetch.mockResponse('[]');

describe('Forgot Password', () => {
  it('should render the page', () => {
    const queryClient = new QueryClient();
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={{ user: { data: { userId: 'random123' } } }}>
          <DrawContext.Provider
            value={{
              draw: false,
              setDraw: jest.fn(),
              hideSide: false,
              setHideSide: jest.fn(),
            }}
          >
            <Page />
          </DrawContext.Provider>
        </SessionProvider>
      </QueryClientProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
