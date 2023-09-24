import { render } from '@testing-library/react';
import Drawer from './Drawer';
import { DrawContext } from '@/pages/_app';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';

describe('Drawer', () => {
    it('should render the component', () => {
        const queryClient = new QueryClient();
        const { container } = render(
            <SessionProvider session={{ user: { data: { userId: "testUser123" } } }}>
                <DrawContext.Provider value={{ draw: false, setDraw: jest.fn() }}>
                    <QueryClientProvider client={new QueryClient()}>
                        <Drawer />
                    </QueryClientProvider>
                </DrawContext.Provider>
            </SessionProvider>
        );
        expect(container).toMatchSnapshot();
    });
});
