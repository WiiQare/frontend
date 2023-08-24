import Page from '@/pages/profile';
import { render } from '@testing-library/react';
import { DrawContext } from '@/pages/_app';
import { SessionProvider } from 'next-auth/react';
require('jest-fetch-mock').enableMocks();

fetch.mockResponse('[]');

describe('Profile', () => {
  it('should render the page', () => {
    const { container } = render(
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
      </SessionProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
