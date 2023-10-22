import { render } from '@testing-library/react';
import ItemBottom from './ItemBottom';
import { DrawContext } from '@/pages/_app';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SlHome } from 'react-icons/sl';


jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {
      'payment-intent': 'pi_1J4JrjGswQjYFZwX0Z1Z1Z1Z',
    },
  }),
}));

describe('ItemBottom', () => {
  it('should render the component', () => {
    const { container } = render(
      <SessionProvider session={{ user: { data: { userId: 'testUser123' } } }}>
        <DrawContext.Provider value={{ draw: false, setDraw: jest.fn() }}>
          <QueryClientProvider client={new QueryClient()}>
            <ItemBottom
              title='Accueil'
              icon={({ size, className }) => (
                <SlHome size={size} className={className} />
              )}
              link='/'
            />
          </QueryClientProvider>
        </DrawContext.Provider>
      </SessionProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
