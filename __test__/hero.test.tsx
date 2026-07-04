import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Hero } from '@/components/sections/hero';

describe('Hero Section', () => {
  it('タイトルとサブタイトルが正しく表示されること', () => {
    render(<Hero />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent("gusutaharu'sportfolio");

    const subText = screen.getByText('今、選ばれるものをつくる。');
    expect(subText).toBeInTheDocument();
  });

  it('アイコンを表示するコンテナが存在すること', () => {
    const { container } = render(<Hero />);
    const linksContainer = container.querySelector('.hero-links');
    expect(linksContainer).toBeInTheDocument();
  });
});
