import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Header } from '../components/layouts/header';

describe('Header', () => {
  it('renders the correct logo text', () => {
    render(<Header />);
    const logo = screen.getByText(/portfolio/i);
    expect(logo).toBeInTheDocument();
  });
});
