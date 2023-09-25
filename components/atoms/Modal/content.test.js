import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import ContentModal from './content';
import { SessionProvider } from 'next-auth/react';
import { Dialog, Transition } from '@headlessui/react';
import { QueryClientProvider, QueryClient } from 'react-query';

describe('ContentModal', () => {
  let component;
  beforeEach(() => {
    const queryClient = new QueryClient();
    const res = render(
      <QueryClientProvider client={queryClient}>
        <SessionProvider
          session={{
            user: { name: 'John Doe', data: { access_token: 'at123' } },
          }}
        >
          <Transition appear show={true}>
            <Dialog onClose={() => {}}>
              <ContentModal title={'TestTitle'} tabs />
            </Dialog>
          </Transition>
        </SessionProvider>
      </QueryClientProvider>,
    );
    component = res.container;

    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  test('should render ContentModal component', () => {
    expect(component).toMatchSnapshot();
  });

  test('should render ContentModal component with title', () => {
    const title = screen.queryByText('TestTitle');

    expect(title).toBeInTheDocument();
  });

  test('should render email tab', async () => {
    const emailLabel = await screen.findAllByText("Adresse e-mail d'un ami");
    expect(emailLabel).toHaveLength(2);
  });

  test('should render phone tab', async () => {
    fireEvent.click(screen.getByText('Phone'));
    const phoneLabel = await screen.findAllByText(
      "Numéro de téléphone d'un ami",
    );
    expect(phoneLabel).toHaveLength(2);
  });

  test('should submit form with email', async () => {
    fireEvent.click(screen.getByText('Envoyer'));
  });

  test('should submit form with phone', async () => {
    fireEvent.click(screen.getByText('Phone'));
    fireEvent.click(screen.getByText('Envoyer'));
  });

  test('should add friend', async () => {
    fireEvent.click(screen.getByText('+ Ajouter un ami'));
  });
});
