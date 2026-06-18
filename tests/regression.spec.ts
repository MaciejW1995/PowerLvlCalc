import { test, expect } from '@playwright/test';

test('loading domain - checking for correct UI elements', async ({ page }) => {
    // Actions:
    await page.goto('https://maciejw1995.github.io/PowerLvlCalc/');
    // Assertions
    await expect(page.getByRole('heading', { name: 'PowerLvl9000' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Measure your strength!' })).toBeVisible();
    await expect(page.getByText('Exercise Type')).toBeVisible();
    await expect(page.locator('#exerciseType')).toBeVisible();
    await expect(page.getByText('Gender')).toBeVisible();
    await expect(page.locator('#gender')).toBeVisible();
    await expect(page.getByText('Weight')).toBeVisible();
    await expect(page.locator('#weight')).toBeVisible();
    await expect(page.getByText('Reps')).toBeVisible();
    await expect(page.locator('#reps')).toBeVisible();
    await expect(page.getByText('User\'s Weight')).toBeVisible();
    await expect(page.locator('#userWeight')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Check!' })).toBeVisible();
});