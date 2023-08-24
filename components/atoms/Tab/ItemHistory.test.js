import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ItemHistory from './ItemHistory';
import { QueryClientProvider, QueryClient } from 'react-query';

jest.useFakeTimers().setSystemTime(new Date('2021-02-03'));

describe('ItemHistory', () => {
  let component;
  beforeEach(() => {
    const client = new QueryClient();
    const res = render(
      <QueryClientProvider client={client}>
        <ItemHistory
          patient={{ firstName: 'John' }}
          createdAt={new Date('2023-02-03').toLocaleString('fr', {
            timeZone: 'Europe/Paris',
          })}
          senderCurrency="USD"
          voucher={{ id: 1, amount: 100, currency: 'USD' }}
          currency={'USD'}
          sender={{ firstName: 'John' }}
        />
      </QueryClientProvider>,
    );
    component = res.container;
  });

  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });
});
