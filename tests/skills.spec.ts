// e2e/skills.spec.ts
import { test, expect } from '@playwright/test';

// GitHub APIのモック用モックデータ
const mockGitHubResponse = {
  data: {
    viewer: {
      repositories: {
        nodes: [
          {
            name: 'repo-1',
            languages: {
              edges: [
                { size: 600, node: { name: 'TypeScript' } },
                { size: 400, node: { name: 'JavaScript' } },
              ],
            },
          },
        ],
      },
    },
  },
};

test.describe('Skills Section E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('https://api.github.com/graphql', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockGitHubResponse),
      });
    });

    await page.goto('http://localhost:3000/');
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
