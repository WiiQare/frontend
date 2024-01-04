
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Bottom from './Bottom';
import { DrawContext } from '../../../pages/_app';

jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/',
    push: jest.fn(),
  }),
}));

jest.mock('react-icons/lia', () => ({
  LiaHandHoldingUsdSolid: () => <div data-testid="mock-lia-heart" />,
  LiaHospital: () => <div data-testid="mock-lia-heart" />,
}));

describe('Bottom', () => {
  it('renders without crashing', () => {
    render(
      <DrawContext.Provider value={{ draw: false, setDraw: jest.fn() }}>
        <Bottom />
      </DrawContext.Provider>
    );
  });

});
