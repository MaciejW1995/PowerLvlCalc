import { test, expect } from '@playwright/test';

test.describe('PowerLvlCalc Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://maciejw1995.github.io/PowerLvlCalc/');
  });

  test('loading domain - checking for correct UI elements', async ({ page }) => {
    // Verify headings
    await expect(page.getByRole('heading', { name: 'PowerLvl9000' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Measure your strength!' })).toBeVisible();

    // Check form fields and labels
    const formFields = [
      { label: 'Exercise Type', id: '#exerciseType' },
      { label: 'Gender', id: '#gender' },
      { label: 'Weight', id: '#weight' },
      { label: 'Reps', id: '#reps' },
      { label: "User's Weight", id: '#userWeight' },
    ];

    for (const field of formFields) {
      await expect(page.getByText(field.label, {exact: true})).toBeVisible();
      await expect(page.locator(field.id)).toBeVisible();
    }

    await expect(page.getByRole('button', { name: 'Check!' })).toBeVisible();
  });

  test('E2E test for squat female bronze medal', async ({ page }) => {
    // Input values
    await page.getByLabel('Exercise Type').selectOption('squat');
    await page.getByLabel('Gender').selectOption('female');
    await page.getByRole('spinbutton', { name: 'Weight', exact: true }).fill('61');
    await page.getByRole('spinbutton', { name: 'Reps' }).fill('8');
    await page.getByRole('spinbutton', { name: "User's Weight" }).fill('60');

    await page.getByRole('button', { name: 'Check!' }).click();

    // Validate result
    const expectedMessage = /Max: 77\.27kg\. Ratio: 1\.29\. You're at an intermediate level.*bronze medal\./;
    await expect(page.locator('.calculationResult')).toHaveText(expectedMessage);
  });
});