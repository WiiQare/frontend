import Page from '@/pages/hospitals';
import { render } from '@testing-library/react';
import { DrawContext } from '@/pages/_app';
import { SessionProvider } from 'next-auth/react';
require('jest-fetch-mock').enableMocks();
import DashboardLayout from '../../../layouts/Dashboard';

fetch.mockResponse('[]');

describe('Hospitals', () => {
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

  it('should use DashboardLayout as layout', () => {
    expect(Page.getLayout(<div />)).toEqual(
      <DashboardLayout className="space-y-8">
        <div />
      </DashboardLayout>,
    );
  });
});
