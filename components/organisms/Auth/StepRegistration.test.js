import React from 'react';
import { render } from '@testing-library/react';
import StepRegistration from './StepRegistration';
import { FormContextRegister } from './RegisterForm';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import { QueryClientProvider, QueryClient } from 'react-query';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    router: [],
  }),
}));

describe('StepRegistration', () => {
  it('should render email if activeStep=0', () => {
    const queryClient = new QueryClient();
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <FormContextRegister.Provider
            value={{
              activeStep: 0,
              setActiveStep: jest.fn(),
              handleComplete: jest.fn(),
              formData: {},
              setFormData: jest.fn(),
            }}
          >
            <StepRegistration />
          </FormContextRegister.Provider>
        </Provider>
      </QueryClientProvider>,
    );
    expect(container).toMatchSnapshot('email');
  });

  it('should render otp if activeStep=1', () => {
    const queryClient = new QueryClient();
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <FormContextRegister.Provider
            value={{
              activeStep: 1,
              setActiveStep: jest.fn(),
              handleComplete: jest.fn(),
              formData: {},
              setFormData: jest.fn(),
            }}
          >
            <StepRegistration />
          </FormContextRegister.Provider>
        </Provider>
      </QueryClientProvider>,
    );
    expect(container).toMatchSnapshot('otp');
  });

  it('should render information if activeStep=2', () => {
    const queryClient = new QueryClient();
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <FormContextRegister.Provider
            value={{
              activeStep: 2,
              setActiveStep: jest.fn(),
              handleComplete: jest.fn(),
              formData: {},
              setFormData: jest.fn(),
            }}
          >
            <StepRegistration />
          </FormContextRegister.Provider>
        </Provider>
      </QueryClientProvider>,
    );
    expect(container).toMatchSnapshot('information');
  });
});
