import Saving from '@/pages/saving';
import { render } from '@testing-library/react';
import { TransactionContext } from '@/components/organisms/Transaction';
import { SessionProvider } from 'next-auth/react';

describe('Saving', () => {
  it('should render', () => {
    const { container } = render(
      <SessionProvider session={{ user: { data: { access_token: {} } } }}>
        <TransactionContext.Provider
          value={{ transaction: {}, setTransaction: () => {} }}
        >
          <Saving />
        </TransactionContext.Provider>
      </SessionProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
