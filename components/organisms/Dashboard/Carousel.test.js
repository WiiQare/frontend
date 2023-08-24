import React from 'react';
import { render } from '@testing-library/react';
import Carouset from './Carousel';
import { QueryClientProvider, QueryClient } from 'react-query';

describe('Carousel', () => {
  it('renders', () => {
    const { container } = render(<Carouset />);
    expect(container).toMatchSnapshot();
  });
});
