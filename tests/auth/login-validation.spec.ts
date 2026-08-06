import { test, expect } from '@playwright/test';

/*
 * What:
 * Verify that submitting an empty login form displays required-field errors.
 *
 * Why:
 * client-side validation should prevent incomplete login attempts and give
 * the user clear feedback about what must be corrected
 */

test('empty login form shows required field errors', async ({ page }) =>{
    await page.goto('/');

    await page
        .getByRole('banner')
        .getByRole('link', { name: 'Log in'})
        .click();

    //submit without enterin an email address or password
    await page.getByRole('button', { name: 'Log in'}).click();

    // Confirm both required fields provide clear validation feedback
    await expect(page.getByText('Email is required', { exact: true })).toBeVisible();

    await expect(page.getByText('Password is required', { exact: true })).toBeVisible();
});