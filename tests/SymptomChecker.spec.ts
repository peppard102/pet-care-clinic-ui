import { test, expect } from '@playwright/test';

test.describe('Symptom Checker Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Has title', async ({ page }) => {
    // Validate page title
    await expect(page).toHaveTitle(/Pet Care Clinic/);
  });

  test('Has heading', async ({ page }) => {
    // Validate heading visibility
    await expect(
      page.getByRole('heading', { name: 'Symptom Checker' })
    ).toBeVisible();
  });

  test('should allow entering and submitting symptoms', async ({ page }) => {
    const symptomsInput = page.getByLabel("Input the pet's symptoms:");
    const submitButton = page.getByRole('button', { name: 'Get action plan' });
    const testSymptoms = 'The dog is limping';

    await symptomsInput.fill(testSymptoms);
    await expect(symptomsInput).toHaveValue(testSymptoms);

    await submitButton.click();

    await page.locator('p').first().waitFor({ state: 'visible' });
  });

  test('should support multiline input', async ({ page }) => {
    const symptomsInput = page.getByLabel("Input the pet's symptoms:");
    const multilineSymptoms = `Symptom 1: Loss of appetite
      Symptom 2: Lethargy
      Symptom 3: Excessive thirst`;

    await symptomsInput.fill(multilineSymptoms);
    await expect(symptomsInput).toHaveValue(multilineSymptoms);
  });

  test('should be accessible via keyboard navigation', async ({ page }) => {
    // Tab to the input field
    await page.keyboard.press('Tab');
    await expect(page.getByLabel("Input the pet's symptoms:")).toBeFocused();

    // Tab to the button
    await page.keyboard.press('Tab');
    await expect(
      page.getByRole('button', { name: 'Get action plan' })
    ).toBeFocused();
  });
});
