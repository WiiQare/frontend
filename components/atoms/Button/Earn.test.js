import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Earn from './Earn';

describe('Earn button', () => {
  let component;
  beforeEach(() => {
    const res = render(
      <Earn modal={{ title: 'Title' }}>
        <div>Content</div>
      </Earn>,
    );
    component = res.container;
  });
  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });

  it('should render the text', () => {
    expect(screen.getByText('Gagnez 5$')).toBeInTheDocument();
  });
});
