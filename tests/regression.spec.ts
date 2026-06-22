import { test, expect } from '@playwright/test';

test.describe('PowerLvlCalc Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
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

  test('E2E tests for Bench Press with BVA analysis for Male', async ({ page }) => {
    const benchBorders = [
      { weight: '30', reps: '30', userWeight: '80', expectedRatio: '0.75', expectedMedal: 'Beginner'},
      { weight: '50', reps: '30', userWeight: '80', expectedRatio: '1.25', expectedMedal: 'Bronze'},
      { weight: '60', reps: '30', userWeight: '80', expectedRatio: '1.50', expectedMedal: 'Silver'},
      { weight: '80', reps: '30', userWeight: '80', expectedRatio: '2.00', expectedMedal: 'Gold'}
    ];

    for (const border of benchBorders) {
      await page.getByLabel('Exercise Type').selectOption('bench');
      await page.getByLabel('Gender').selectOption('male');
      await page.getByRole('spinbutton', { name: 'Weight', exact: true }).fill(border.weight);
      await page.getByRole('spinbutton', { name: 'Reps' }).fill(border.reps);
      await page.getByRole('spinbutton', { name: "User's Weight" }).fill(border.userWeight);

      await page.getByRole('button', { name: 'Check!' }).click();

    // Validate result
      const resultLocator = page.locator('.calculationResult');
      await expect(resultLocator).toContainText(`${border.expectedRatio}`);
      await expect(resultLocator).toContainText(border.expectedMedal, {ignoreCase:true});
    }

  });

});
