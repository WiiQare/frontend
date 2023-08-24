import { render } from '@testing-library/react';
import Voucher from './Voucher';

describe('Voucher', () => {
  it('renders', () => {
    const { container } = render(<Voucher />);
    expect(container).toMatchSnapshot();
  });
});
