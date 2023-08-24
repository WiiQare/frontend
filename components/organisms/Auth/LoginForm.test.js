import React from 'react';
import { render } from '@testing-library/react';
import LoginForm from './LoginForm';
import { QueryClientProvider, QueryClient } from 'react-query';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    router: [],
  }),
}));

describe('LoginForm', () => {
  it('renders', () => {
    const { container } = render(
      <QueryClientProvider client={new QueryClient()}>
        <LoginForm />
      </QueryClientProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
