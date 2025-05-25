import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate between all pages using the navigation bar', async ({
    page,
  }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check initial page (Symptom Checker)
    await expect(
      page.getByRole('heading', { name: 'Symptom Checker' })
    ).toBeVisible();

    // Navigate to General Medical Questions
    await page
      .getByRole('button', { name: 'General Medical Questions' })
      .click();
    await page.waitForLoadState('networkidle');
    await expect(
      page.getByRole('heading', { name: 'General Medical Questions' })
    ).toBeVisible();
    await expect(page).toHaveURL('/general-questions');

    // Navigate to Vets
    await page.getByRole('button', { name: 'Vets' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { name: 'Vets' })).toBeVisible();
    await expect(page).toHaveURL('/vets');

    // Navigate to Pets
    await page.getByRole('button', { name: 'Pets' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { name: 'Pets' })).toBeVisible();
    await expect(page).toHaveURL('/pets');

    // Navigate to Symptom Checker
    await page.getByRole('button', { name: 'Symptom Checker' }).click();
    await page.waitForLoadState('networkidle');
    await expect(
      page.getByRole('heading', { name: 'Symptom Checker' })
    ).toBeVisible();
    await expect(page).toHaveURL('/symptom-checker');

    // Navigate home using the home icon
    await page.getByRole('button', { name: 'homepage' }).click();
    await page.waitForLoadState('networkidle');
    await expect(
      page.getByRole('heading', { name: 'Symptom Checker' })
    ).toBeVisible();
    await expect(page).toHaveURL('/');
  });

  test('should have correct page titles', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle(/Pet Care Clinic/);

    await page.goto('/general-questions');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle(/Pet Care Clinic/);

    await page.goto('/vets');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle(/Pet Care Clinic/);

    await page.goto('/pets');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle(/Pet Care Clinic/);
  });

  test('should have navigation bar visible on all pages', async ({ page }) => {
    const pages = ['/', '/general-questions', '/vets', '/pets'];

    for (const pagePath of pages) {
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');
      await expect(
        page.getByRole('button', { name: 'homepage' })
      ).toBeVisible();
      await expect(
        page.getByRole('button', { name: 'Symptom Checker' })
      ).toBeVisible();
      await expect(
        page.getByRole('button', { name: 'General Medical Questions' })
      ).toBeVisible();
      await expect(page.getByRole('button', { name: 'Vets' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Pets' })).toBeVisible();
    }
  });
});
