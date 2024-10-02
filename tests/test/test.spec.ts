import { test, expect } from '@playwright/test';

test('test title correct', async ({ page }) => {
  await page.goto("/");
  expect(await page.title()).toBe('Hexo');
});