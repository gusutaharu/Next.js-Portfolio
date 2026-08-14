import { test, expect } from '@playwright/test';

test.describe('ヒーローセクション(E2Eテスト)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('ヒーローセクションが表示され、外部リンクが正しいこと', async ({
    page,
  }) => {
    const heroSection = page.locator('#hero-section');
    await expect(heroSection).toBeVisible();

    await expect(page.locator('h1')).toContainText("gusutaharu'sportfolio");

    const githubLink = heroSection.locator('a[aria-label="GitHub"]');
    await expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/gusutaharu',
    );
    await expect(githubLink).toHaveAttribute('target', '_blank');

    const qiitaLink = heroSection.locator('a[aria-label="Qiita"]');
    await expect(qiitaLink).toHaveAttribute(
      'href',
      'https://qiita.com/gusutaharu',
    );
    await expect(qiitaLink).toHaveAttribute('target', '_blank');
  });
});
