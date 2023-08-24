import NewSaving from '@/pages/saving/new';
import { render } from '@testing-library/react';
import { TransactionContext } from '@/components/organisms/Transaction';
import { SessionProvider } from 'next-auth/react';
import { DrawContext } from '../../../pages/_app';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    router: [],
  }),
}));

describe('Saving', () => {
  it('should render', () => {
    const { container } = render(
      <DrawContext.Provider value={{ draw: {}, setDraw: () => {} }}>
        <SessionProvider session={{ user: { data: { access_token: {} } } }}>
          <TransactionContext.Provider
            value={{ transaction: {}, setTransaction: () => {} }}
          >
            <NewSaving />
          </TransactionContext.Provider>
        </SessionProvider>
      </DrawContext.Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
