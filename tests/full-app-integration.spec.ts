import { test, expect } from '@playwright/test';

test.describe('Full Application Integration Tests', () => {
  test('should complete a full user journey across all pages', async ({
    page,
  }) => {
    // Start at home page (Symptom Checker)
    await page.goto('/');

    // 1. Use Symptom Checker
    await expect(
      page.getByRole('heading', { name: 'Symptom Checker' })
    ).toBeVisible();
    const symptomsInput = page.getByLabel("Input the pet's symptoms:");
    await symptomsInput.fill('My dog has been limping and refusing to eat');
    await page.getByRole('button', { name: 'Get action plan' }).click();

    // Wait a moment for any processing
    await page.waitForTimeout(500);

    // 2. Navigate to General Medical Questions
    await page
      .getByRole('button', { name: 'General Medical Questions' })
      .click();
    await expect(
      page.getByRole('heading', { name: 'General Medical Questions' })
    ).toBeVisible();

    // Ask a question
    const questionInput = page.getByLabel('Input your medical question:');
    await questionInput.fill('What should I do if my cat is vomiting?');
    await page.getByRole('button', { name: 'Submit question' }).click();

    // Verify question appears in history
    await expect(page.getByText('Question:')).toBeVisible();
    await expect(
      page.getByText('What should I do if my cat is vomiting?')
    ).toBeVisible();

    // 3. Navigate to Vets page
    await page.getByRole('button', { name: 'Vets' }).click();
    await expect(page.getByRole('heading', { name: 'Vets' })).toBeVisible();

    // Interact with vets table
    await page.waitForSelector('.MuiDataGrid-row');
    await expect(page.getByText('Jon Snow')).toBeVisible();

    // Open and close the modal
    await page.getByRole('button', { name: 'Open modal' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible();

    // 4. Navigate to Pets page
    await page.getByRole('button', { name: 'Pets' }).click();
    await expect(page.getByRole('heading', { name: 'Pets' })).toBeVisible();

    // Test responsive behavior - desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator('.MuiDataGrid-root')).toBeVisible();
    await expect(page.getByText('Sophie Snow')).toBeVisible();

    // Test mobile view
    await page.setViewportSize({ width: 400, height: 600 });
    await expect(page.getByLabelText('Search Pets')).toBeVisible();

    // Use pet search
    const searchInput = page.getByLabelText('Search Pets');
    await searchInput.click();
    await searchInput.type('Sophie');
    await page.getByText('Sophie Snow').click();
    await expect(page.getByText('Name:')).toBeVisible();

    // 5. Return to home using home icon
    await page.getByRole('button', { name: 'homepage' }).click();
    await expect(
      page.getByRole('heading', { name: 'Symptom Checker' })
    ).toBeVisible();
    await expect(page).toHaveURL('/');
  });

  test('should handle cross-page navigation with browser back/forward', async ({
    page,
  }) => {
    await page.goto('/');

    // Navigate through pages
    await page
      .getByRole('button', { name: 'General Medical Questions' })
      .click();
    await expect(page).toHaveURL('/general-questions');

    await page.getByRole('button', { name: 'Vets' }).click();
    await expect(page).toHaveURL('/vets');

    await page.getByRole('button', { name: 'Pets' }).click();
    await expect(page).toHaveURL('/pets');

    // Use browser back button
    await page.goBack();
    await expect(page).toHaveURL('/vets');
    await expect(page.getByRole('heading', { name: 'Vets' })).toBeVisible();

    await page.goBack();
    await expect(page).toHaveURL('/general-questions');
    await expect(
      page.getByRole('heading', { name: 'General Medical Questions' })
    ).toBeVisible();

    // Use browser forward button
    await page.goForward();
    await expect(page).toHaveURL('/vets');
    await expect(page.getByRole('heading', { name: 'Vets' })).toBeVisible();
  });

  test('should maintain consistent UI elements across all pages', async ({
    page,
  }) => {
    const pages = [
      { url: '/', title: 'Symptom Checker' },
      { url: '/general-questions', title: 'General Medical Questions' },
      { url: '/vets', title: 'Vets' },
      { url: '/pets', title: 'Pets' },
    ];

    for (const pageDef of pages) {
      await page.goto(pageDef.url);

      // Check page title and heading
      await expect(page).toHaveTitle(/Pet Care Clinic/);
      await expect(
        page.getByRole('heading', { name: pageDef.title })
      ).toBeVisible();

      // Check navigation bar is present
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

      // Check page container structure
      await expect(
        page
          .locator('main')
          .or(page.locator('[role="main"]'))
          .or(page.locator('.MuiContainer-root'))
      ).toBeVisible();
    }
  });

  test('should handle multiple form submissions correctly', async ({
    page,
  }) => {
    // Test multiple symptom submissions
    await page.goto('/');

    const symptomsInput = page.getByLabel("Input the pet's symptoms:");
    const submitButton = page.getByRole('button', { name: 'Get action plan' });

    // First submission
    await symptomsInput.fill('Symptom set 1');
    await submitButton.click();
    await page.waitForTimeout(200);

    // Second submission
    await symptomsInput.fill('Symptom set 2');
    await submitButton.click();
    await page.waitForTimeout(200);

    // Navigate to General Questions and test multiple questions
    await page
      .getByRole('button', { name: 'General Medical Questions' })
      .click();

    const questionInput = page.getByLabel('Input your medical question:');
    const questionSubmit = page.getByRole('button', {
      name: 'Submit question',
    });

    // First question
    await questionInput.fill('First medical question');
    await questionSubmit.click();
    await expect(page.getByText('First medical question')).toBeVisible();

    // Second question
    await questionInput.fill('Second medical question');
    await questionSubmit.click();
    await expect(page.getByText('Second medical question')).toBeVisible();

    // Both questions should be visible
    await expect(page.getByText('First medical question')).toBeVisible();
    await expect(page.getByText('Second medical question')).toBeVisible();
  });

  test('should handle responsive layout changes consistently', async ({
    page,
  }) => {
    const pages = ['/', '/general-questions', '/vets', '/pets'];

    for (const pagePath of pages) {
      await page.goto(pagePath);

      // Test desktop layout
      await page.setViewportSize({ width: 1200, height: 800 });
      await expect(page.getByRole('banner')).toBeVisible(); // Navigation bar

      // Test tablet layout
      await page.setViewportSize({ width: 768, height: 600 });
      await expect(page.getByRole('banner')).toBeVisible();

      // Test mobile layout
      await page.setViewportSize({ width: 400, height: 600 });
      await expect(page.getByRole('banner')).toBeVisible();

      // Navigation should always be accessible
      await expect(
        page.getByRole('button', { name: 'homepage' })
      ).toBeVisible();
    }
  });

  test('should handle error states gracefully', async ({ page }) => {
    // Test error handling on Symptom Checker
    await page.goto('/');

    // Test with empty submission (should not error)
    await page.getByRole('button', { name: 'Get action plan' }).click();
    await page.waitForTimeout(200);
    // Should not show error for empty submission

    // Test General Questions with empty submission
    await page.goto('/general-questions');
    await page.getByRole('button', { name: 'Submit question' }).click();
    await page.waitForTimeout(200);
    // Should handle gracefully

    // Navigation should still work after any errors
    await page.getByRole('button', { name: 'Vets' }).click();
    await expect(page.getByRole('heading', { name: 'Vets' })).toBeVisible();
  });

  test('should support keyboard navigation across entire app', async ({
    page,
  }) => {
    await page.goto('/');

    // Test keyboard navigation on home page
    await page.keyboard.press('Tab'); // Should focus first focusable element
    await page.keyboard.press('Tab'); // Navigate to next element

    // Test navigation between pages using keyboard
    await page
      .getByRole('button', { name: 'General Medical Questions' })
      .focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL('/general-questions');

    // Test form navigation with keyboard
    await page.keyboard.press('Tab'); // Should eventually focus on input
    await page.keyboard.press('Tab'); // Should focus on button

    // Continue navigation testing
    await page.getByRole('button', { name: 'Vets' }).focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL('/vets');
  });

  test('should load all pages without JavaScript errors', async ({ page }) => {
    // Listen for console errors
    const errors: string[] = [];
    page.on('pageerror', (error) => {
      errors.push(error.message);
    });

    const pages = ['/', '/general-questions', '/vets', '/pets'];

    for (const pagePath of pages) {
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');

      // Basic interaction to ensure page is working
      await page.getByRole('banner').isVisible(); // Navigation bar
      await page.waitForTimeout(500); // Allow time for any async operations
    }

    // Check that no critical JavaScript errors occurred
    const criticalErrors = errors.filter(
      (error) =>
        !error.includes('ResizeObserver') && // Common non-critical error
        !error.includes('Non-Error promise rejection')
    );

    expect(criticalErrors).toHaveLength(0);
  });

  test('should handle direct URL access to all routes', async ({ page }) => {
    const routes = [
      { path: '/', heading: 'Symptom Checker' },
      { path: '/symptom-checker', heading: 'Symptom Checker' },
      { path: '/general-questions', heading: 'General Medical Questions' },
      { path: '/vets', heading: 'Vets' },
      { path: '/pets', heading: 'Pets' },
    ];

    for (const route of routes) {
      await page.goto(route.path);
      await expect(
        page.getByRole('heading', { name: route.heading })
      ).toBeVisible();
      await expect(page).toHaveURL(route.path);

      // Verify navigation is working from direct access
      await expect(
        page.getByRole('button', { name: 'homepage' })
      ).toBeVisible();
    }
  });
});
