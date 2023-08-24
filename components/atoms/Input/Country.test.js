import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import Country from './Country';
import { CountryContext } from '../Stepper/Forms/identity2';

describe('Country', () => {
  let component, setCountry, setCountryLabel;
  beforeEach(() => {
    setCountry = jest.fn();
    setCountryLabel = jest.fn();

    const res = render(
      <CountryContext.Provider
        value={{ country: 'Indonesia', setCountry, setCountryLabel }}
      >
        <Country />
      </CountryContext.Provider>,
    );
    component = res.container;
  });

  test('should render Country component', () => {
    expect(component).toMatchSnapshot();
  });

  test('should show the prompt to choose country', () => {
    const label = screen.getByLabelText('Choisissez le pays');
    expect(label).toBeInTheDocument();
  });
});
