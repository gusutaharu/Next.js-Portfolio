import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Hero } from '@/components/sections/hero/hero';

describe('Hero Section', () => {
  it('タイトルとサブタイトルが正しく表示されること', () => {
    render(<Hero />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/gusutaharu['’]s\s*portfolio/i);

    const subText = screen.getByText('今、選ばれるものをつくる。');
    expect(subText).toBeInTheDocument();
  });

  it('外部リンクを持つアイコンが正しく表示されること', () => {
    render(<Hero />);

    const githubLink = screen.getByRole('link', { name: 'GitHub' });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/gusutaharu');
    expect(githubLink).toHaveAttribute('target', '_blank');

    const qiitaLink = screen.getByRole('link', { name: 'Qiita' });
    expect(qiitaLink).toHaveAttribute('href', 'https://qiita.com/gusutaharu');
    expect(qiitaLink).toHaveAttribute('target', '_blank');
  });
});
