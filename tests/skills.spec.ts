import { test, expect } from '@playwright/test';

test.describe('スキルセクション（E2Eテスト）', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/?t=' + Date.now());
  });

  test('モックデータに基づいてGitHubデータが表示されること', async ({
    page,
  }) => {
    const skillsSection = page.locator('#skills-section');
    await expect(skillsSection).toBeVisible();

    await expect(skillsSection.locator('.section-title')).toHaveText('Skills');

    const tsChart = page.locator('.chart-item', { hasText: 'TypeScript' });
    const jsChart = page.locator('.chart-item', { hasText: 'JavaScript' });

    await expect(tsChart).toBeVisible();
    await expect(jsChart).toBeVisible();

    await tsChart.locator('.skill-counter').scrollIntoViewIfNeeded();

    await expect(tsChart.locator('.skill-counter')).toHaveText('60%', {
      timeout: 5000,
    });
    await expect(jsChart.locator('.skill-counter')).toHaveText('40%', {
      timeout: 5000,
    });
  });

  test('技術スタック（SKILL_STACK）と保有資格（QUALIFICATIONS）が正しくリスト表示されていること', async ({
    page,
  }) => {
    const skillList = page.locator('.skills-list');
    await expect(
      skillList.locator('.skill-item', { hasText: 'Next.js' }),
    ).toBeVisible();
    await expect(
      skillList.locator('.skill-item', { hasText: 'TypeScript' }),
    ).toBeVisible();
    await expect(
      skillList.locator('.skill-item', { hasText: 'playwright' }),
    ).toBeVisible();

    const qualificationsList = page.locator('.qualifications-list');
    const firstQualification = qualificationsList
      .locator('.qualification-item')
      .first();
    await expect(firstQualification.locator('p')).toHaveText('基本情報技術者');
    await expect(firstQualification.locator('span')).toHaveText('2024.01');
  });

  test('スクロール時にGSAPによる背景変更（white-overlayの不透明度）がトリガーされること', async ({
    page,
  }) => {
    const overlay = page.locator('.white-overlay');

    await expect(overlay).toHaveCSS('opacity', '0');

    const skillsSection = page.locator('#skills-section');
    await skillsSection.scrollIntoViewIfNeeded();

    await expect(overlay).toHaveCSS('opacity', '1', { timeout: 5000 });
  });
});
