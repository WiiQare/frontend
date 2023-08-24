import Page from '@/pages/voucher/pass/[pass]';
import { render } from '@testing-library/react';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {
      'payment-intent': 'pi_1J4JrjGswQjYFZwX0Z1Z1Z1Z',
    },
  }),
}));

describe('Pass', () => {
  it('should render the page', () => {
    const { container } = render(<Page />);
    expect(container).toMatchSnapshot();
  });
});
