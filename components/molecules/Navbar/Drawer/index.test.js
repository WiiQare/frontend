import { render } from '@testing-library/react';
import Drawer from '.';
import { ChatContext } from '.';
import { DrawContext } from '../../../../pages/_app';

describe('Drawer', () => {
  it('should render the component', () => {
    const { container } = render(
      <ChatContext.Provider
        value={{ personalChat: { state: false, id: null } }}
      >
        <DrawContext.Provider value={{ draw: false, setDraw: jest.fn() }}>
          <Drawer />
        </DrawContext.Provider>
      </ChatContext.Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
