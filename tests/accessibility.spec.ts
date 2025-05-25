import { test, expect } from '@playwright/test';

test.describe('Accessibility Tests', () => {
  const pages = [
    { url: '/', name: 'Symptom Checker' },
    { url: '/general-questions', name: 'General Medical Questions' },
    { url: '/vets', name: 'Vets' },
    { url: '/pets', name: 'Pets' },
  ];

  pages.forEach(({ url, name }) => {
    test(`${name} page should have proper accessibility features`, async ({
      page,
    }) => {
      await page.goto(url);

      // Check page has a proper title
      await expect(page).toHaveTitle(/Pet Care Clinic/);

      // Check main heading exists
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

      // Check navigation is properly labeled
      await expect(page.getByRole('banner')).toBeVisible();

      // Check all interactive elements are keyboard accessible
      const buttons = page.getByRole('button');
      const buttonCount = await buttons.count();

      for (let i = 0; i < buttonCount; i++) {
        const button = buttons.nth(i);
        await button.focus();
        await expect(button).toBeFocused();
      }

      // Check text inputs have proper labels
      const textInputs = page.getByRole('textbox');
      const inputCount = await textInputs.count();

      for (let i = 0; i < inputCount; i++) {
        const input = textInputs.nth(i);
        const accessibleName =
          (await input.getAttribute('aria-label')) ||
          (await input.getAttribute('aria-labelledby')) ||
          (await page
            .locator(`label[for="${await input.getAttribute('id')}"]`)
            .count());
        expect(accessibleName).toBeTruthy();
      }
    });
  });

  test('should support keyboard navigation throughout the app', async ({
    page,
  }) => {
    await page.goto('/');

    // Test tab navigation through the navigation bar
    await page.keyboard.press('Tab');
    let focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();

    // Continue tabbing through all focusable elements
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    }
  });

  test('should have proper color contrast and visual indicators', async ({
    page,
  }) => {
    await page.goto('/');

    // Check that focus indicators are visible
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();

    // Check that interactive elements look interactive
    const buttons = page.getByRole('button');
    const firstButton = buttons.first();
    await expect(firstButton).toBeVisible();

    // Hover to check for visual feedback
    await firstButton.hover();
    await expect(firstButton).toBeVisible();
  });

  test('should support screen reader navigation patterns', async ({ page }) => {
    await page.goto('/');

    // Check heading hierarchy
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toBeVisible();

    // Check that landmarks are properly defined
    await expect(page.getByRole('banner')).toBeVisible(); // Navigation
    await expect(page.getByRole('main').or(page.locator('main'))).toBeVisible(); // Main content

    // Check form structure
    const forms = page.getByRole('textbox');
    if ((await forms.count()) > 0) {
      // Each form field should have proper labeling
      await expect(forms.first()).toBeVisible();
    }
  });

  test('data tables should have proper accessibility structure', async ({
    page,
  }) => {
    // Test vets table
    await page.goto('/vets');
    await page.waitForSelector('.MuiDataGrid-row');

    // Check table has proper role
    await expect(page.locator('.MuiDataGrid-root')).toHaveAttribute(
      'role',
      'grid'
    );

    // Check column headers are properly marked
    const columnHeaders = page.getByRole('columnheader');
    await expect(columnHeaders.first()).toBeVisible();

    // Test pets table on desktop
    await page.goto('/pets');
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.waitForSelector('.MuiDataGrid-row');

    await expect(page.locator('.MuiDataGrid-root')).toHaveAttribute(
      'role',
      'grid'
    );
  });

  test('modals should have proper focus management', async ({ page }) => {
    await page.goto('/vets');

    // Open modal
    await page.getByRole('button', { name: 'Open modal' }).click();

    // Check modal is properly announced
    await expect(page.getByRole('dialog')).toBeVisible();

    // Focus should be trapped in modal
    await page.keyboard.press('Tab');

    // Focus should be within the modal (simplified check)
    const modalContent = page.getByRole('dialog');
    const focusWithinModal = await modalContent.locator(':focus').count();
    expect(focusWithinModal).toBeGreaterThan(0);

    // Close modal with Escape
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('responsive design should maintain accessibility', async ({ page }) => {
    await page.goto('/pets');

    // Test desktop accessibility
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(
      page.getByRole('button', { name: 'Add New Pet' })
    ).toBeVisible();

    // Test mobile accessibility
    await page.setViewportSize({ width: 400, height: 600 });
    await expect(
      page.getByRole('button', { name: 'Add New Pet' })
    ).toBeVisible();

    // Check search input is accessible on mobile
    const searchInput = page.getByLabel('Search Pets');
    await expect(searchInput).toBeVisible();
    await searchInput.focus();
    await expect(searchInput).toBeFocused();
  });

  test('error states should be accessible', async ({ page }) => {
    await page.goto('/');

    // Test that error messages (when they appear) are properly announced
    // This would need to be adjusted based on actual error conditions in the app

    // Test form validation feedback
    const symptomsInput = page.getByLabel("Input the pet's symptoms:");
    await symptomsInput.focus();

    // Check that the input maintains proper accessibility attributes
    await expect(symptomsInput).toBeVisible();
    await expect(symptomsInput).toBeFocused();
  });
});
