import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '@/components/layouts/header';

jest.mock('../constants/navigations', () => ({
  NAV_ITEMS: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
}));

describe('Header', () => {
  it('ボタンのクリックに応じてモバイルメニューがDOMに注入・削除されること', async () => {
    const user = userEvent.setup();
    render(<Header />);

    expect(
      screen.queryByRole('navigation', { name: 'Mobile navigation' }),
    ).not.toBeInTheDocument();

    const button = screen.getByRole('button', { name: 'Toggle navigation' });

    await user.click(button);

    expect(
      screen.getByRole('navigation', { name: 'Mobile navigation' }),
    ).toBeInTheDocument();

    await user.click(button);

    // メニューが消える際のアニメーションの完了を待つためwaitForElementToBeRemovedでラップ
    await waitForElementToBeRemoved(() =>
      screen.queryByRole('navigation', { name: 'Mobile navigation' }),
    );
  });
});
