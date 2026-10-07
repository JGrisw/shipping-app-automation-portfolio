import { test, expect } from '@playwright/test';

/*
 * What:
 * Verify that submitting an empty login form displays required-field errors.
 *
 * Why:
 * Confirms required-field validation prevents incomplete login attempts and
 * gives the user clear feedback about what must be corrected
 */

test('empty login form shows required field errors', async ({ page }) =>{
    await page.goto('/');

    // Reach the login form through the public entry point before testing validation
    await page
        .getByRole('banner')
        .getByRole('link', { name: 'Log in'})
        .click();

    // Submit the form empty to exercise both required field validations at once
    await page.getByRole('button', { name: 'Log in'}).click();

    // Confirm both required fields provide clear validation feedback
    await expect(page.getByText('Email is required', { exact: true })).toBeVisible();

    await expect(page.getByText('Password is required', { exact: true })).toBeVisible();
});