import { test, expect } from '@playwright/test';

test.describe('Header', () => {
  test('ナビゲーションとメニュー開閉・遷移が正しく動作すること', async ({
    page,
    isMobile,
  }) => {
    await page.goto('/');

    if (isMobile) {
      const button = page.getByRole('button', { name: 'Toggle navigation' });
      const mobileNav = page.getByRole('navigation', {
        name: 'Mobile navigation',
      });

      await expect(button).toBeVisible();
      await expect(mobileNav).toBeHidden();

      await button.click();
      await expect(mobileNav).toBeVisible();

      await mobileNav.getByRole('link', { name: 'Skills' }).click();
      await expect(page).toHaveURL(/#skills-section$/);
    } else {
      await expect(
        page.getByRole('navigation', { name: 'Desktop navigation' }),
      ).toBeVisible();
      await expect(
        page.getByRole('button', { name: 'Toggle navigation' }),
      ).toBeHidden();
    }
  });
});
