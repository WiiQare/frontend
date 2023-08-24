import SavingSummary from '@/pages/saving/summary';
import { render } from '@testing-library/react';
import { TransactionContext } from '@/components/organisms/Transaction';
import { SessionProvider } from 'next-auth/react';
import { DrawContext } from '../../../pages/_app';
require('jest-fetch-mock').enableMocks();

fetch.mockResponse('[]');

describe('Saving Summary', () => {
  it('should render', () => {
    const { container } = render(
      <DrawContext.Provider
        value={{ draw: {}, setDraw: () => {}, saving: { plan: {} } }}
      >
        <SessionProvider session={{ user: { data: { access_token: {} } } }}>
          <TransactionContext.Provider
            value={{ transaction: {}, setTransaction: () => {} }}
          >
            <SavingSummary />
          </TransactionContext.Provider>
        </SessionProvider>
      </DrawContext.Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
