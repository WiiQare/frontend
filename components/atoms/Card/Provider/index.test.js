import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import CardProvider from '.';

describe('CardProvider', () => {
  test('should render CardProvider component', () => {
    const { component } = render(<CardProvider packages={[]} />);
    expect(component).toMatchSnapshot();
  });
});
