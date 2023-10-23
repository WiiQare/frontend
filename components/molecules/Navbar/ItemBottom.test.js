import "@testing-library/jest-dom";
import { render, screen } from '@testing-library/react';
import ItemBottom from './ItemBottom';
import { DrawContext } from '@/pages/_app';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SlHome } from 'react-icons/sl';
import NextRouter from 'next/router'


describe('ItemBottom', () => {
  let container;
  let routerSpy;
  const pushMock = jest.fn();
  const setDrawMock = jest.fn();

  beforeEach(() => {

    routerSpy = jest.spyOn(NextRouter, 'useRouter').mockReturnValue({
      push: pushMock,
    });

    const res = render(
      <SessionProvider session={{ user: { data: { userId: 'testUser123' } } }}>
        <DrawContext.Provider value={{ draw: false, setDraw: setDrawMock }}>
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

    container = res.container;
  });

  it('should render the component', () => {
    expect(container).toMatchSnapshot();
  });

  it('should navigate to the link', () => {


    const h6 = screen.getByText('Accueil');

    expect(h6).toBeInTheDocument();
    h6.click();

    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith('/');

    expect(setDrawMock).toHaveBeenCalledTimes(1);
    expect(setDrawMock).toHaveBeenCalledWith(false);
  });


});
