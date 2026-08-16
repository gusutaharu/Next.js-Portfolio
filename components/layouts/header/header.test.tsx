import {
  render,
  screen,
  within,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '@/components/layouts/header/header';
import { NAV_ITEMS } from '@/constants/navigations';

describe('Header', () => {
  it('ヘッダーが正しく表示され、各リンクが適切な属性を持っていること', () => {
    render(<Header />);

    const headerLogo = screen.getByRole('link', { name: 'Portfolio' });
    expect(headerLogo).toBeInTheDocument();
    expect(headerLogo).toHaveAttribute('href', '/');

    const desktopNav = screen.getByRole('navigation', {
      name: 'Desktop navigation',
    });
    expect(desktopNav).toBeInTheDocument();

    NAV_ITEMS.forEach((item) => {
      const navLink = within(desktopNav).getByRole('link', { name: item.name });
      expect(navLink).toBeInTheDocument();
      expect(navLink).toHaveAttribute('href', item.href);
    });
  });

  it('ボタンのクリックに応じてモバイルメニューが開閉すること', async () => {
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

    await waitForElementToBeRemoved(() =>
      screen.queryByRole('navigation', { name: 'Mobile navigation' }),
    );
  });

  it('モバイルメニュー内のリンクをクリックしたとき、メニューが閉じること', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const button = screen.getByRole('button', { name: 'Toggle navigation' });
    await user.click(button);

    const mobileNav = screen.getByRole('navigation', {
      name: 'Mobile navigation',
    });
    const firstLink = within(mobileNav).getByRole('link', {
      name: NAV_ITEMS[0].name,
    });

    await user.click(firstLink);

    await waitForElementToBeRemoved(() =>
      screen.queryByRole('navigation', { name: 'Mobile navigation' }),
    );
  });
});
