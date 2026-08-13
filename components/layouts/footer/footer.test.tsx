import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from './footer';
import { NAV_ITEMS } from '@/constants/navigations';

describe('Footer Component', () => {
  it('フッターが正しく表示され、各リンクが適切な属性を持っていること', () => {
    render(<Footer />);

    const footerLogo = screen.getByRole('link', { name: 'gusutaharu' });
    expect(footerLogo).toBeInTheDocument();
    expect(footerLogo).toHaveAttribute('href', '#hero-section');

    const githubLink = screen.getByRole('link', { name: 'GitHub' });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/gusutaharu');
    expect(githubLink).toHaveAttribute('target', '_blank');

    const qiitaLink = screen.getByRole('link', { name: 'Qiita' });
    expect(qiitaLink).toHaveAttribute('href', 'https://qiita.com/gusutaharu');
    expect(qiitaLink).toHaveAttribute('target', '_blank');

    const nav = screen.getByRole('navigation', { name: 'Footer navigation' });
    expect(nav).toBeInTheDocument();

    NAV_ITEMS.forEach((item) => {
      const navLink = screen.getByRole('link', { name: item.name });
      expect(navLink).toBeInTheDocument();
      expect(navLink).toHaveAttribute('href', item.href);
    });

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`© ${currentYear}`)),
    ).toBeInTheDocument();
  });
});
