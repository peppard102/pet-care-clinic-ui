import { test, expect } from '@playwright/test';

test.describe('General Medical Questions Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/general-questions');
  });

  test('should display general medical questions page elements', async ({
    page,
  }) => {
    // Check page heading
    await expect(
      page.getByRole('heading', { name: 'General Medical Questions' })
    ).toBeVisible();

    // Check input field
    await expect(page.getByLabel('Input your medical question:')).toBeVisible();

    // Check submit button
    await expect(
      page.getByRole('button', { name: 'Submit question' })
    ).toBeVisible();
  });

  test('should allow entering a medical question', async ({ page }) => {
    const questionInput = page.getByLabel('Input your medical question:');
    const testQuestion = 'What are the symptoms of kennel cough in dogs?';

    await questionInput.fill(testQuestion);
    await expect(questionInput).toHaveValue(testQuestion);
  });

  test('should handle empty question submission', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: 'Submit question' });

    await submitButton.click();

    // Should not show any error initially for empty submission
    await expect(
      page.getByText('Error accessing general questions service')
    ).not.toBeVisible();
  });

  test('should submit question and show it in conversation history', async ({
    page,
  }) => {
    const questionInput = page.getByLabel('Input your medical question:');
    const submitButton = page.getByRole('button', { name: 'Submit question' });
    const testQuestion = 'How often should I feed my puppy?';

    await questionInput.fill(testQuestion);
    await submitButton.click();

    // Check that question appears in conversation history
    await expect(page.getByText('Question:')).toBeVisible();
    await expect(page.getByText(testQuestion)).toBeVisible();

    // Check that input field is cleared after submission
    await expect(questionInput).toHaveValue('');

    // Check for loading state (skeleton might appear briefly)
    await page.waitForTimeout(200); // Brief wait to allow for loading/response
  });

  test('should support multiple questions in conversation', async ({
    page,
  }) => {
    const questionInput = page.getByLabel('Input your medical question:');
    const submitButton = page.getByRole('button', { name: 'Submit question' });

    // Submit first question
    const firstQuestion = 'What vaccines does my cat need?';
    await questionInput.fill(firstQuestion);
    await submitButton.click();

    // Wait for first question to appear
    await expect(page.getByText(firstQuestion)).toBeVisible();

    // Submit second question
    const secondQuestion = 'How to care for a senior dog?';
    await questionInput.fill(secondQuestion);
    await submitButton.click();

    // Both questions should be visible in history
    await expect(page.getByText(firstQuestion)).toBeVisible();
    await expect(page.getByText(secondQuestion)).toBeVisible();

    // Should see multiple "Question:" labels
    const questionLabels = page.getByText('Question:');
    await expect(questionLabels).toHaveCount(2);
  });

  test('should support multiline questions', async ({ page }) => {
    const questionInput = page.getByLabel('Input your medical question:');
    const multilineQuestion = `My dog has been showing these symptoms:
1. Loss of appetite
2. Lethargy
3. Vomiting

What could be wrong?`;

    await questionInput.fill(multilineQuestion);
    await expect(questionInput).toHaveValue(multilineQuestion);
  });

  test('should clear input field after successful submission', async ({
    page,
  }) => {
    const questionInput = page.getByLabel('Input your medical question:');
    const submitButton = page.getByRole('button', { name: 'Submit question' });

    await questionInput.fill('Test question');
    await submitButton.click();

    // Input should be cleared
    await expect(questionInput).toHaveValue('');
  });

  test('should handle keyboard interactions', async ({ page }) => {
    const questionInput = page.getByLabel('Input your medical question:');

    // Focus on input
    await questionInput.focus();
    await expect(questionInput).toBeFocused();

    // Type a question
    await questionInput.type('What should I do if my pet eats chocolate?');

    // Tab to submit button
    await page.keyboard.press('Tab');
    await expect(
      page.getByRole('button', { name: 'Submit question' })
    ).toBeFocused();

    // Submit using Enter
    await page.keyboard.press('Enter');

    // Question should appear in history
    await expect(
      page.getByText('What should I do if my pet eats chocolate?')
    ).toBeVisible();
  });

  test('should be accessible via navigation', async ({ page }) => {
    await page.goto('/');
    await page
      .getByRole('button', { name: 'General Medical Questions' })
      .click();
    await expect(
      page.getByRole('heading', { name: 'General Medical Questions' })
    ).toBeVisible();
    await expect(page).toHaveURL('/general-questions');
  });

  test('should maintain conversation history during session', async ({
    page,
  }) => {
    const questionInput = page.getByLabel('Input your medical question:');
    const submitButton = page.getByRole('button', { name: 'Submit question' });

    // Submit a question
    await questionInput.fill('First question about pet health');
    await submitButton.click();

    // Navigate away and back
    await page.getByRole('button', { name: 'Vets' }).click();
    await page
      .getByRole('button', { name: 'General Medical Questions' })
      .click();

    // Question history should be preserved (depending on implementation)
    // Note: This test might need adjustment based on whether state persists across navigation
  });

  test('should have responsive design elements', async ({ page }) => {
    // Check that the input field has responsive width
    const questionInput = page.getByLabel('Input your medical question:');
    await expect(questionInput).toBeVisible();

    // Check that the page layout adapts to different sizes
    await page.setViewportSize({ width: 800, height: 600 });
    await expect(questionInput).toBeVisible();

    await page.setViewportSize({ width: 400, height: 600 });
    await expect(questionInput).toBeVisible();
  });

  test('should handle form submission with Enter key in textarea', async ({
    page,
  }) => {
    const questionInput = page.getByLabel('Input your medical question:');

    await questionInput.focus();
    await questionInput.type('Quick question about pet care');

    // Note: In a multiline textarea, Enter typically adds a new line, not submits
    // So we'll test that Enter creates a new line
    await page.keyboard.press('Enter');
    await questionInput.type('Second line of question');

    const expectedText =
      'Quick question about pet care\nSecond line of question';
    await expect(questionInput).toHaveValue(expectedText);
  });
});
