import { test, expect } from '@playwright/test';

test.describe('Header (E2Eテスト)', () => {
  test.describe('PC（デスクトップ）環境', () => {
    test('PCサイズではデスクトップナビゲーションが表示され、ハンバーガーボタンは隠れていること', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.goto('http://localhost:3000/');
      await expect(
        page.getByRole('navigation', { name: 'Desktop navigation' }),
      ).toBeVisible();
      await expect(
        page.getByRole('button', { name: 'Toggle navigation' }),
      ).toBeHidden();
    });
  });

  test.describe('スマホ（モバイル）環境', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto('http://localhost:3000/');
    });
    test('初期状態でボタンが表示され、モバイルメニューは隠れていること', async ({
      page,
    }) => {
      await expect(
        page.getByRole('button', { name: 'Toggle navigation' }),
      ).toBeVisible();
      await expect(
        page.getByRole('navigation', { name: 'Mobile navigation' }),
      ).toBeHidden();
    });

    test('ボタンのクリックでモバイルメニューが視覚的に開閉すること', async ({
      page,
    }) => {
      const button = page.getByRole('button', { name: 'Toggle navigation' });
      const mobileNav = page.getByRole('navigation', {
        name: 'Mobile navigation',
      });
      await button.click();
      await expect(mobileNav).toBeVisible();
      await button.click();
      await expect(mobileNav).toBeHidden();
    });

    test('メニュー内のリンクをクリックしたとき、実際にページ遷移が機能すること', async ({
      page,
    }) => {
      await page.getByRole('button', { name: 'Toggle navigation' }).click();
      const SkillsLink = page
        .getByRole('navigation', { name: 'Mobile navigation' })
        .getByRole('link', { name: 'Skills' });
      await SkillsLink.click();
      await expect(page).toHaveURL(/#skills-section$/);
    });
  });
});
