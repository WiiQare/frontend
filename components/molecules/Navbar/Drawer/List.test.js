import { render } from '@testing-library/react';
import List from './List';
import { ChatContext } from '.';
import { DrawContext } from '../../../../pages/_app';

describe('List', () => {
  it('should render the component', () => {
    const { container } = render(
      <ChatContext.Provider
        value={{ personalChat: { state: false, id: null } }}
      >
        <DrawContext.Provider value={{ draw: false, setDraw: jest.fn() }}>
          <List />
        </DrawContext.Provider>
      </ChatContext.Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
