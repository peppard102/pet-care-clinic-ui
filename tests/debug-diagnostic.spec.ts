import { test, expect } from '@playwright/test';

test.describe('Diagnostic Tests - Run These First', () => {
  test('should inspect what elements are actually present', async ({
    page,
  }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    console.log('=== DIAGNOSTIC INFORMATION ===');

    // Check page title
    const title = await page.title();
    console.log('Page title:', title);

    // Check all headings
    const headings = page.getByRole('heading');
    const headingCount = await headings.count();
    console.log(`Found ${headingCount} headings:`);
    for (let i = 0; i < headingCount; i++) {
      const text = await headings.nth(i).textContent();
      console.log(`  - Heading ${i + 1}: "${text}"`);
    }

    // Check all buttons
    const buttons = page.getByRole('button');
    const buttonCount = await buttons.count();
    console.log(`Found ${buttonCount} buttons:`);
    for (let i = 0; i < buttonCount; i++) {
      const text = await buttons.nth(i).textContent();
      const ariaLabel = await buttons.nth(i).getAttribute('aria-label');
      console.log(
        `  - Button ${i + 1}: "${text}" (aria-label: "${ariaLabel}")`
      );
    }

    // Check all text inputs
    const inputs = page.getByRole('textbox');
    const inputCount = await inputs.count();
    console.log(`Found ${inputCount} text inputs:`);
    for (let i = 0; i < inputCount; i++) {
      const placeholder = await inputs.nth(i).getAttribute('placeholder');
      const ariaLabel = await inputs.nth(i).getAttribute('aria-label');
      const id = await inputs.nth(i).getAttribute('id');
      console.log(
        `  - Input ${
          i + 1
        }: placeholder="${placeholder}", aria-label="${ariaLabel}", id="${id}"`
      );
    }

    // Check for labels
    const labels = page.locator('label');
    const labelCount = await labels.count();
    console.log(`Found ${labelCount} labels:`);
    for (let i = 0; i < labelCount; i++) {
      const text = await labels.nth(i).textContent();
      const forAttr = await labels.nth(i).getAttribute('for');
      console.log(`  - Label ${i + 1}: "${text}" (for="${forAttr}")`);
    }

    // Check current URL
    console.log('Current URL:', page.url());

    // This test always passes - it's just for inspection
    expect(true).toBe(true);
  });

  test('should check vets page elements', async ({ page }) => {
    await page.goto('/vets');
    await page.waitForLoadState('networkidle');

    console.log('=== VETS PAGE DIAGNOSTIC ===');

    // Wait a bit for data to load
    await page.waitForTimeout(2000);

    // Check if DataGrid exists
    const dataGrid = page.locator('.MuiDataGrid-root');
    const hasDataGrid = (await dataGrid.count()) > 0;
    console.log('Has DataGrid:', hasDataGrid);

    if (hasDataGrid) {
      // Check rows
      const rows = page.locator('.MuiDataGrid-row');
      const rowCount = await rows.count();
      console.log(`DataGrid rows: ${rowCount}`);

      // Check column headers
      const columnHeaders = page.getByRole('columnheader');
      const headerCount = await columnHeaders.count();
      console.log(`Column headers: ${headerCount}`);
      for (let i = 0; i < headerCount; i++) {
        const text = await columnHeaders.nth(i).textContent();
        console.log(`  - Header ${i + 1}: "${text}"`);
      }

      // Check for specific names
      const jonSnow = await page.getByText('Jon Snow').count();
      const cerseiLannister = await page.getByText('Cersei Lannister').count();
      console.log('Jon Snow found:', jonSnow > 0);
      console.log('Cersei Lannister found:', cerseiLannister > 0);
    }

    expect(true).toBe(true);
  });

  test('should check pets page elements', async ({ page }) => {
    await page.goto('/pets');
    await page.waitForLoadState('networkidle');

    console.log('=== PETS PAGE DIAGNOSTIC ===');

    // Check desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.waitForTimeout(1000);

    const dataGrid = page.locator('.MuiDataGrid-root');
    const hasDataGrid = (await dataGrid.count()) > 0;
    console.log('Desktop - Has DataGrid:', hasDataGrid);

    // Check mobile view
    await page.setViewportSize({ width: 400, height: 600 });
    await page.waitForTimeout(1000);

    const searchInput = page.getByLabel('Search Pets');
    const hasSearchInput = (await searchInput.count()) > 0;
    console.log('Mobile - Has Search Input:', hasSearchInput);

    if (!hasSearchInput) {
      // Try different selectors
      const inputByPlaceholder = page.getByPlaceholder('Search Pets');
      const hasInputByPlaceholder = (await inputByPlaceholder.count()) > 0;
      console.log('Mobile - Has input by placeholder:', hasInputByPlaceholder);

      const allInputs = page.getByRole('textbox');
      const inputCount = await allInputs.count();
      console.log(`Mobile - Total inputs found: ${inputCount}`);
    }

    expect(true).toBe(true);
  });
});
