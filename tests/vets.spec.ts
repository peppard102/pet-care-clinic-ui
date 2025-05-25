import { test, expect } from '@playwright/test';

test.describe('Vets Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/vets');
  });

  test('should display vets page elements', async ({ page }) => {
    // Check page heading
    await expect(page.getByRole('heading', { name: 'Vets' })).toBeVisible();

    // Check that the data grid is present
    await expect(page.locator('.MuiDataGrid-root')).toBeVisible();

    // Check Open Modal button
    await expect(
      page.getByRole('button', { name: 'Open modal' })
    ).toBeVisible();
  });

  test('should display vets table with correct columns', async ({ page }) => {
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
  });

  test('should display vet data in the table', async ({ page }) => {
    // Wait for data to load
    await page.waitForSelector('.MuiDataGrid-row');

    // Check that we have vet data (based on your screenshot showing 5 vets)
    const rows = page.locator('.MuiDataGrid-row');
    await expect(rows).toHaveCount(5);

    // Check for specific vet names from your screenshot
    await expect(page.getByText('Jon Snow')).toBeVisible();
    await expect(page.getByText('Cersei Lannister')).toBeVisible();
    await expect(page.getByText('Jaime Lannister')).toBeVisible();
    await expect(page.getByText('Arya Stark')).toBeVisible();
    await expect(page.getByText('Daenerys Targaryen')).toBeVisible();
  });

  test('should have working checkboxes for row selection', async ({ page }) => {
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

  test('should support sorting on columns', async ({ page }) => {
    // Wait for data to load
    await page.waitForSelector('.MuiDataGrid-row');

    // Click on a sortable column header (e.g., First name)
    await page.getByRole('columnheader', { name: 'First name' }).click();

    // Verify that sort indicator appears
    await expect(page.locator('.MuiDataGrid-sortIcon')).toBeVisible();
  });

  test('should have pagination controls', async ({ page }) => {
    // Wait for data to load
    await page.waitForSelector('.MuiDataGrid-row');

    // Check pagination info (should show "1–5 of 5" based on your screenshot)
    await expect(page.getByText('1–5 of 5')).toBeVisible();

    // Check for pagination navigation buttons
    await expect(
      page.locator('[aria-label="Go to previous page"]')
    ).toBeVisible();
    await expect(page.locator('[aria-label="Go to next page"]')).toBeVisible();
  });

  test('should open modal when Open Modal button is clicked', async ({
    page,
  }) => {
    const openModalButton = page.getByRole('button', { name: 'Open modal' });

    await openModalButton.click();

    // Check that modal opens
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('Text in a modal')).toBeVisible();
    await expect(
      page.getByText(
        'Duis mollis, est non commodo luctus, nisi erat porttitor ligula.'
      )
    ).toBeVisible();
  });

  test('should close modal when clicking outside or escape key', async ({
    page,
  }) => {
    const openModalButton = page.getByRole('button', { name: 'Open modal' });

    // Open modal
    await openModalButton.click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Close modal by pressing Escape
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible();

    // Open modal again
    await openModalButton.click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Close modal by clicking outside (backdrop)
    await page.locator('.MuiBackdrop-root').click({ position: { x: 0, y: 0 } });
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('should have editable cells in the data grid', async ({ page }) => {
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
    await page.getByRole('button', { name: 'Vets' }).click();
    await expect(page.getByRole('heading', { name: 'Vets' })).toBeVisible();
    await expect(page).toHaveURL('/vets');
  });

  test('should handle keyboard navigation in data grid', async ({ page }) => {
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

  test('should display correct age values', async ({ page }) => {
    // Wait for data to load
    await page.waitForSelector('.MuiDataGrid-row');

    // Check specific age values from your screenshot
    await expect(page.getByText('35')).toBeVisible(); // Jon Snow
    await expect(page.getByText('42')).toBeVisible(); // Cersei Lannister
    await expect(page.getByText('45')).toBeVisible(); // Jaime Lannister
    await expect(page.getByText('16')).toBeVisible(); // Arya Stark
    await expect(page.getByText('150')).toBeVisible(); // Daenerys Targaryen
  });

  test('should have proper table accessibility', async ({ page }) => {
    // Wait for data to load
    await page.waitForSelector('.MuiDataGrid-row');

    // Check that the grid has proper ARIA labels
    await expect(page.locator('.MuiDataGrid-root')).toHaveAttribute(
      'role',
      'grid'
    );

    // Check that column headers have proper roles
    const columnHeaders = page.locator('.MuiDataGrid-columnHeader');
    await expect(columnHeaders.first()).toHaveAttribute('role', 'columnheader');
  });

  test('should handle responsive design', async ({ page }) => {
    // Test on different viewport sizes
    await page.setViewportSize({ width: 800, height: 600 });
    await expect(page.getByRole('heading', { name: 'Vets' })).toBeVisible();
    await expect(page.locator('.MuiDataGrid-root')).toBeVisible();

    await page.setViewportSize({ width: 400, height: 600 });
    await expect(page.getByRole('heading', { name: 'Vets' })).toBeVisible();
  });
});
