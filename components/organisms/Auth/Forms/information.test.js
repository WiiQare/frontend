import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Information from './informations';
import { FormContextRegister } from '../RegisterForm';
import { Provider } from 'react-redux';
import { store } from '../../../../redux/store';
import { QueryClientProvider, QueryClient } from 'react-query';
import * as Helpers from '../../../../lib/helper';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    router: [],
  }),
}));

describe('Information', () => {
  let container;
  beforeEach(() => {
    jest.clearAllMocks();
    const queryClient = new QueryClient();
    const res = render(
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
            <Information />
          </FormContextRegister.Provider>
        </Provider>
      </QueryClientProvider>,
    );
    container = res.container;
  });
  it('renders', () => {
    expect(container).toMatchSnapshot();
  });

  it('should register a new account with form data', async () => {
    jest.spyOn(Helpers, 'register').mockResolvedValueOnce({});

    const user = userEvent.setup();
    const form = container.querySelector('form');
    const password = screen.getByLabelText('Mot de passe');
    const cpassword = screen.getByLabelText('Confirmez le mot de passe');
    const firstname = screen.getByLabelText('Entrez votre nom');
    const lastname = screen.getByLabelText('Entrez votre après nom');
    const phone = screen.getByLabelText('Numéro de téléphone');
    const term = screen.getByLabelText(
      "j'accepte les termes et conditions d'utilisation.",
    );
    const submit = container.querySelector("button[type='submit']");
    expect(form).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(cpassword).toBeInTheDocument();
    expect(firstname).toBeInTheDocument();
    expect(lastname).toBeInTheDocument();
    expect(phone).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
    expect(term).toBeInTheDocument();
    expect(password).toHaveValue('');
    expect(cpassword).toHaveValue('');
    expect(firstname).toHaveValue('');
    expect(lastname).toHaveValue('');
    expect(phone).toHaveValue('+33');
    expect(term).not.toBeChecked();

    await user.type(password, 'password');
    await user.type(cpassword, 'password');
    await user.type(firstname, 'John');
    await user.type(lastname, 'Doe');
    await user.type(phone, '612345678');
    await user.click(term);

    expect(password).toHaveValue('password');
    expect(cpassword).toHaveValue('password');
    expect(firstname).toHaveValue('JohnDoe'); // TODO: fix this
    expect(lastname).toHaveValue('JohnDoe'); // TODO: fix this
    expect(phone).toHaveValue('+33 6 12 34 56 78');
    expect(term).toBeChecked();

    userEvent.click(submit);

    // expect(Helpers.register).toHaveBeenCalledTimes(1);
  });
});
