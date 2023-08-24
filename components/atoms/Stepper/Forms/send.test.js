import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Send from './send';
import { FormContext } from '../../../../pages/voucher/buy';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { store } from '../../../../redux/store';
import { QueryClientProvider, QueryClient } from 'react-query';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {
      'payment-intent': 'pi_1J4JrjGswQjYFZwX0Z1Z1Z1Z',
    },
  }),
}));

describe('Send', () => {
  let component;
  beforeEach(() => {
    console.log = jest.fn();
    const queryClient = new QueryClient();
    const res = render(
      <SessionProvider session={{ user: { data: { userId: 'random123' } } }}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <FormContext.Provider value={{ activeStepIndex: 0 }}>
              <Send />
            </FormContext.Provider>
          </Provider>
        </QueryClientProvider>
      </SessionProvider>,
    );
    component = res.container;
  });

  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });
});
