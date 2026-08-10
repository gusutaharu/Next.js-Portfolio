import { test, expect } from '@playwright/test';

test.describe('コンタクトセクション（E2Eテスト）', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Contactセクションが正常に表示されること', async ({ page }) => {
    await page.fill('input[name="name"]', '山田太郎');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill(
      'textarea[name="content"]',
      'テストのお問い合わせ内容です。',
    );

    await page.waitForSelector('input[name="cf-turnstile-response"][value]', {
      state: 'attached',
      timeout: 10000,
    });
    const button = page.getByRole('button', { name: '送信ボタン' });
    await button.click();
    await expect(page.getByText('送信完了しました！')).toBeVisible();
  });
});
