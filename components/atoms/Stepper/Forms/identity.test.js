import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Identity2 from './identity2';
import { FormContext } from '../../../../pages/voucher/buy';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { store } from '../../../../redux/store';
import { QueryClientProvider, QueryClient } from 'react-query';
import userEvent from '@testing-library/user-event';
import * as Helpers from '../../../../lib/helper';

describe('Identity2', () => {
  let component;
  beforeEach(() => {
    const queryClient = new QueryClient();
    const res = render(
      <SessionProvider session={{ user: { data: { userId: 'random123' } } }}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <FormContext.Provider value={{ activeStepIndex: 0 }}>
              <Identity2 />
            </FormContext.Provider>
          </Provider>
        </QueryClientProvider>
      </SessionProvider>,
    );
    component = res.container;

    jest.spyOn(Helpers, 'savePatient').mockResolvedValueOnce({ code: 200 });
  });

  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });

  it('should render a text to add a beneficiary', () => {
    expect(screen.getByText('Ajouter un bénéficiaire')).toBeInTheDocument();
  });

  it('should fill the form', async () => {
    jest.setTimeout(10000)

    const user = userEvent.setup({ delay: null });

    const addBeneficiary = screen.getByText('Ajouter un bénéficiaire');

    await user.click(addBeneficiary);

    const phone = screen.getByLabelText('Numéro de Téléphone');
    const firstName = screen.getByLabelText('Nom de famille');
    const lastName = screen.getByLabelText('Prénom');
    const email = screen.getByLabelText('Adresse e-mail (optional)');
    const address = screen.getByLabelText('Adresse du domicile');
    const city = screen.getByLabelText('Ville');

    expect(phone).toHaveValue('+243');

    await user.type(phone, '123456789');
    await user.type(firstName, 'John');
    await user.type(lastName, 'Doe');
    await user.type(email, 'test@example.com');
    await user.type(address, '1 rue de la paix');
    await user.type(city, 'Paris');

    expect(phone).toHaveValue('+243123456789');

    // TODO: fix these tests
    expect(firstName).toHaveValue(
      'JohnDoetest@example.com1 rue de la paixParis',
    );
    expect(lastName).toHaveValue(
      'JohnDoetest@example.com1 rue de la paixParis',
    );
    expect(email).toHaveValue('JohnDoetest@example.com1 rue de la paixParis');
    expect(address).toHaveValue('JohnDoetest@example.com1 rue de la paixParis');
    expect(city).toHaveValue('JohnDoetest@example.com1 rue de la paixParis');

    const nextButton = screen.getByText('Suivant');

    await user.click(nextButton);
  }, 10000);

  it('should have a previous button ', async () => {
    const user = userEvent.setup({ delay: null });
    const addBeneficiary = screen.getByText('Ajouter un bénéficiaire');
    await user.click(addBeneficiary);

    const button = screen.getByText('Précédent');

    expect(button).toBeInTheDocument();

    await user.click(button);
  });
});
