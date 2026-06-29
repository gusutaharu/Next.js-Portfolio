import { test, expect } from '@playwright/test';

test('should navigate to the about page', async ({ page }) => {
  // インデックスページから開始（baseURLはplaywright.config.tsのwebServerを通じて設定されています）
  await page.goto('http://localhost:3000/');
  await expect(page.locator('a[href="/"]')).toContainText('Portfolio');
});
