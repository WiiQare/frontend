import '@testing-library/jest-dom';
import Saving from '.';
import { fireEvent, render, screen } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import { DrawContext } from '../../../../pages/_app';
import { QueryClientProvider, QueryClient } from 'react-query';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {
      'payment-intent': 'pi_1J4JrjGswQjYFZwX0Z1Z1Z1Z',
    },
  }),
}));

describe('Saving', () => {
  let container;

  beforeEach(() => {
    const queryClient = new QueryClient();
    const res = render(
      <SessionProvider session={{ user: { name: 'John Doe' } }}>
        <DrawContext.Provider
          value={{
            draw: { id: 1 },
            setSaving: jest.fn(),
          }}
        >
          <QueryClientProvider client={queryClient}>
            <Saving title="TestTitle" img="/images/test.png" />
          </QueryClientProvider>
        </DrawContext.Provider>
      </SessionProvider>,
    );

    container = res.container;

    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });
  test('should render Saving component', () => {
    expect(container).toMatchSnapshot();
  });

  test('should open the model on clicking the title button', async () => {
    const button = screen.getByText('TestTitle');

    fireEvent.click(button);

    const imgs = await screen.findAllByAltText('Image Description');

    expect(imgs).toHaveLength(2);
  });

  test('should close the model on pressing esc', async () => {
    const button = screen.getByText('TestTitle');

    fireEvent.click(button);

    fireEvent.keyDown(button, { key: 'Escape', code: 'Escape' });

    const imgs = screen.queryAllByAltText('Image Description');

    expect(imgs).toHaveLength(0);
  });

  test('should submit the form on clicking the Calculate button', async () => {
    const button = screen.getByText('TestTitle');

    fireEvent.click(button);

    fireEvent.click(screen.getByText('CDF'));

    fireEvent.change(screen.getByLabelText('Votre objectif (Pour 12 mois)'), {
      target: { value: '100' },
    });

    const calculateButton = await screen.findByText('Calculer');

    fireEvent.click(calculateButton);

    const a = await screen.findAllByText('Choisir un plan');

    expect(a).toHaveLength(2);
  });

  test('should return null on submit the form with non-numeric amount', async () => {
    const button = screen.getByText('TestTitle');

    fireEvent.click(button);

    fireEvent.click(screen.getByText('CDF'));

    fireEvent.change(screen.getByLabelText('Votre objectif (Pour 12 mois)'), {
      target: { value: 'fsdf' },
    });

    const calculateButton = await screen.findByText('Calculer');

    fireEvent.click(calculateButton);
  });
});
