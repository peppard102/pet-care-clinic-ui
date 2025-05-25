import { test, expect } from '@playwright/test';

test.describe('Pets Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pets');
  });

  test('should display pets page elements on desktop', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });

    // Check page heading
    await expect(page.getByRole('heading', { name: 'Pets' })).toBeVisible();

    // Check Add New Pet button
    await expect(
      page.getByRole('button', { name: 'Add New Pet' })
    ).toBeVisible();

    // Check that the data grid is present
    await expect(page.locator('.MuiDataGrid-root')).toBeVisible();
  });

  test('should display pets table with correct columns', async ({ page }) => {
    // Set desktop viewport to ensure table view
    await page.setViewportSize({ width: 1200, height: 800 });

    // Check column headers
    await expect(page.getByRole('columnheader', { name: 'ID' })).toBeVisible();
    await expect(
      page.getByRole('columnheader', { name: 'First name' })
    ).toBeVisible();
    await expect(
      page.getByRole('columnheader', { name: 'Last name' })
    ).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Age' })).toBeVisible();
    await expect(
      page.getByRole('columnheader', { name: 'Full name' })
    ).toBeVisible();
    await expect(
      page.getByRole('columnheader', { name: 'Address' })
    ).toBeVisible();
  });

  test('should display pet data in the table', async ({ page }) => {
    // Set desktop viewport to ensure table view
    await page.setViewportSize({ width: 1200, height: 800 });

    // Wait for data to load
    await page.waitForSelector('.MuiDataGrid-row');

    // Check that we have pet data (based on your screenshot showing 5 pets)
    const rows = page.locator('.MuiDataGrid-row');
    await expect(rows).toHaveCount(5);

    // Check for specific pet names from your screenshot
    await expect(page.getByText('Sophie Snow')).toBeVisible();
    await expect(page.getByText('Chanel Lannister')).toBeVisible();
    await expect(page.getByText('Nico Lannister')).toBeVisible();
    await expect(page.getByText('Tilly Stark')).toBeVisible();
    await expect(page.getByText('Cricket Targaryen')).toBeVisible();
  });

  test('should display correct pet addresses', async ({ page }) => {
    // Set desktop viewport to ensure table view
    await page.setViewportSize({ width: 1200, height: 800 });

    // Wait for data to load
    await page.waitForSelector('.MuiDataGrid-row');

    // Check for specific addresses from your screenshot
    await expect(
      page.getByText('123 Pine Lane, Frostville, WI 54321')
    ).toBeVisible();
    await expect(
      page.getByText('456 Golden Road, Westport, CA 90210')
    ).toBeVisible();
    await expect(
      page.getByText('789 Winter Avenue, Northfield, MN 55057')
    ).toBeVisible();
    await expect(
      page.getByText('321 Dragon Street, Firestone, NV 89123')
    ).toBeVisible();
  });

  test('should display correct pet ages', async ({ page }) => {
    // Set desktop viewport to ensure table view
    await page.setViewportSize({ width: 1200, height: 800 });

    // Wait for data to load
    await page.waitForSelector('.MuiDataGrid-row');

    // Check specific age values from your screenshot
    await expect(page.getByText('15')).toBeVisible(); // Sophie Snow
    await expect(page.getByText('6')).toBeVisible(); // Chanel Lannister and Tilly Stark
    await expect(page.getByText('3')).toBeVisible(); // Nico Lannister
    await expect(page.getByText('9')).toBeVisible(); // Cricket Targaryen
  });

  test('should have working checkboxes for row selection', async ({ page }) => {
    // Set desktop viewport to ensure table view
    await page.setViewportSize({ width: 1200, height: 800 });

    // Wait for data to load
    await page.waitForSelector('.MuiDataGrid-row');

    // Check that checkboxes are present
    const checkboxes = page.locator('.MuiDataGrid-checkboxInput');
    await expect(checkboxes.first()).toBeVisible();

    // Click on a checkbox to select a row
    await checkboxes.first().click();

    // Verify checkbox is checked
    await expect(checkboxes.first()).toBeChecked();
  });

  test('should have pagination controls', async ({ page }) => {
    // Set desktop viewport to ensure table view
    await page.setViewportSize({ width: 1200, height: 800 });

    // Wait for data to load
    await page.waitForSelector('.MuiDataGrid-row');

    // Check pagination info (should show "1–5 of 9" based on your screenshot)
    await expect(page.getByText('1–5 of 9')).toBeVisible();

    // Check for pagination navigation buttons
    await expect(
      page.locator('[aria-label="Go to previous page"]')
    ).toBeVisible();
    await expect(page.locator('[aria-label="Go to next page"]')).toBeVisible();
  });

  test('should support sorting on columns', async ({ page }) => {
    // Set desktop viewport to ensure table view
    await page.setViewportSize({ width: 1200, height: 800 });

    // Wait for data to load
    await page.waitForSelector('.MuiDataGrid-row');

    // Click on a sortable column header (e.g., First name)
    await page.getByRole('columnheader', { name: 'First name' }).click();

    // Verify that sort indicator appears
    await expect(page.locator('.MuiDataGrid-sortIcon')).toBeVisible();
  });

  test('should open Add Pet modal when Add New Pet button is clicked', async ({
    page,
  }) => {
    // Set desktop viewport to ensure table view
    await page.setViewportSize({ width: 1200, height: 800 });

    const addPetButton = page.getByRole('button', { name: 'Add New Pet' });

    await addPetButton.click();

    // Check that modal opens (assuming AddPet modal exists)
    await expect(page.getByRole('dialog')).toBeVisible();
  });

  test('should display search interface on mobile/tablet', async ({ page }) => {
    // Set mobile viewport to trigger search interface
    await page.setViewportSize({ width: 400, height: 600 });

    // Check page heading
    await expect(page.getByRole('heading', { name: 'Pets' })).toBeVisible();

    // Should show search interface instead of table
    await expect(
      page.getByRole('button', { name: 'Add New Pet' })
    ).toBeVisible();

    // Should have search/autocomplete field
    await expect(page.getByLabelText('Search Pets')).toBeVisible();
  });

  test('should allow searching pets on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 400, height: 600 });

    const searchInput = page.getByLabelText('Search Pets');

    // Type in search field
    await searchInput.click();
    await searchInput.type('Sophie');

    // Should show autocomplete options
    await expect(page.getByText('Sophie Snow')).toBeVisible();

    // Select an option
    await page.getByText('Sophie Snow').click();

    // Should display pet details card
    await expect(page.getByText('Name:')).toBeVisible();
    await expect(page.getByText('Age:')).toBeVisible();
    await expect(page.getByText('Address:')).toBeVisible();
  });

  test('should have editable cells in the data grid on desktop', async ({
    page,
  }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });

    // Wait for data to load
    await page.waitForSelector('.MuiDataGrid-row');

    // Double-click on an editable cell (First name, Last name, or Age)
    const firstNameCell = page
      .locator('.MuiDataGrid-cell[data-field="firstName"]')
      .first();
    await firstNameCell.dblclick();

    // Check that edit mode is activated (input field appears)
    await expect(
      page.locator('.MuiDataGrid-cell--editing input')
    ).toBeVisible();
  });

  test('should be accessible via navigation', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Pets' }).click();
    await expect(page.getByRole('heading', { name: 'Pets' })).toBeVisible();
    await expect(page).toHaveURL('/pets');
  });

  test('should handle keyboard navigation in data grid', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });

    // Wait for data to load
    await page.waitForSelector('.MuiDataGrid-row');

    // Click on first cell to focus the grid
    const firstCell = page.locator('.MuiDataGrid-cell').first();
    await firstCell.click();

    // Use arrow keys to navigate
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowDown');

    // Verify navigation works (cell focus should change)
    await expect(page.locator('.MuiDataGrid-cell--focused')).toBeVisible();
  });

  test('should support selecting all rows with header checkbox', async ({
    page,
  }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });

    // Wait for data to load
    await page.waitForSelector('.MuiDataGrid-row');

    // Click the header checkbox to select all
    const headerCheckbox = page.locator(
      '.MuiDataGrid-columnHeaderCheckbox .MuiCheckbox-root input'
    );
    await headerCheckbox.click();

    // Verify all row checkboxes are selected
    const rowCheckboxes = page.locator(
      '.MuiDataGrid-row .MuiCheckbox-root input'
    );
    const count = await rowCheckboxes.count();

    for (let i = 0; i < count; i++) {
      await expect(rowCheckboxes.nth(i)).toBeChecked();
    }
  });

  test('should show proper responsive behavior', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator('.MuiDataGrid-root')).toBeVisible();

    // Test tablet view
    await page.setViewportSize({ width: 768, height: 600 });
    // Should still show table or switch to search based on breakpoint

    // Test mobile view
    await page.setViewportSize({ width: 400, height: 600 });
    await expect(page.getByLabelText('Search Pets')).toBeVisible();
  });

  test('should clear search selection on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 400, height: 600 });

    const searchInput = page.getByLabelText('Search Pets');

    // Select a pet
    await searchInput.click();
    await searchInput.type('Sophie');
    await page.getByText('Sophie Snow').click();

    // Verify selection is shown
    await expect(page.getByText('Sophie Snow')).toBeVisible();

    // Clear selection by clicking search and selecting different option
    await searchInput.click();
    await searchInput.clear();
    await searchInput.type('Chanel');
    await page.getByText('Chanel Lannister').click();

    // Should show new selection
    await expect(page.getByText('Chanel Lannister')).toBeVisible();
  });

  test('should have proper accessibility in both views', async ({ page }) => {
    // Test desktop accessibility
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.waitForSelector('.MuiDataGrid-row');

    // Check that the grid has proper ARIA labels
    await expect(page.locator('.MuiDataGrid-root')).toHaveAttribute(
      'role',
      'grid'
    );

    // Test mobile accessibility
    await page.setViewportSize({ width: 400, height: 600 });

    // Check search input accessibility
    const searchInput = page.getByLabelText('Search Pets');
    await expect(searchInput).toBeVisible();
    await searchInput.focus();
    await expect(searchInput).toBeFocused();
  });
});
