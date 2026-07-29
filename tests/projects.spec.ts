import { test, expect } from '@playwright/test';

test.describe('プロジェクトセクション（E2Eテスト）', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Projects セクションとプロジェクト要素が正常に表示されること', async ({
    page,
  }) => {
    const projectsSection = page.locator('#projects-section');
    await expect(projectsSection).toBeVisible();

    const firstProject = projectsSection.locator('.project-item').first();
    await expect(firstProject).toBeVisible();

    const videoImage = firstProject.locator('.project-video');
    await expect(videoImage).toBeVisible();
  });

  test('スクロール時に GSAP (ScrollTrigger) が動作しても画面がクラッシュしないこと', async ({
    page,
  }) => {
    const projectsSection = page.locator('#projects-section');

    await projectsSection.scrollIntoViewIfNeeded();

    await page.evaluate(() => window.scrollBy(0, 600));
    await expect(projectsSection).toBeVisible();
  });
});
