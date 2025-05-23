import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Validate page title
  await expect(page).toHaveTitle(/Pet Care Clinic/);
});

test('get started link', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Validate heading visibility
  await expect(
    page.getByRole('heading', { name: 'Symptom Checker' })
  ).toBeVisible();
});
