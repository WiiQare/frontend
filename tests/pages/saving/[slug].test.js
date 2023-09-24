import SavingSlug from '@/pages/saving/[slug]';
import { render } from '@testing-library/react';
import { TransactionContext } from '@/components/organisms/Transaction';
import { SessionProvider } from 'next-auth/react';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {
      'payment-intent': 'pi_1J4JrjGswQjYFZwX0Z1Z1Z1Z',
      'slug': 'test-slug',
    },
  }),
}));

describe('Saving', () => {
  it('should render', () => {
    const { container } = render(
      <SessionProvider session={{ user: { data: { access_token: {} } } }}>
        <TransactionContext.Provider
          value={{ transaction: {}, setTransaction: () => { } }}
        >
          <SavingSlug />
        </TransactionContext.Provider>
      </SessionProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
