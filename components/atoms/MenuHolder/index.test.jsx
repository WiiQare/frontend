import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MenuHolder from '.';

const mockChangeLanguage = jest.fn();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { changeLanguage: mockChangeLanguage },
  }),
}));

describe('MenuHolder', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should have the provided href', () => {
    const label = 'Mock label';
    const href = '/mock-href';
    render(<MenuHolder href={href} label={label} />);
    expect(screen.getAllByRole('link')[0]).toHaveAttribute('href', href);
    expect(screen.getAllByRole('link')[1]).toHaveAttribute('href', href);
  });

  it('should have the provided label', () => {
    const label = 'Mock label';
    render(<MenuHolder href={'/'} label={label} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('should change the language to "fr" when the "Français" button is clicked', () => {
    render(<MenuHolder href={'/'} label={'Mock label'} />);
    screen.getByText('Français').click();
    expect(mockChangeLanguage).toHaveBeenCalledTimes(1);
    expect(mockChangeLanguage).toHaveBeenCalledWith('fr');
  });

  it('should change the language to "en" when the "Anglais" button is clicked', () => {
    render(<MenuHolder href={'/'} label={'Mock label'} />);
    screen.getByText('Anglais').click();
    expect(mockChangeLanguage).toHaveBeenCalledTimes(1);
    expect(mockChangeLanguage).toHaveBeenCalledWith('en');
  });
});
