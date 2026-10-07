import { test, expect } from '@playwright/test';

/*
 * What:
 * Verify that an approved test user can submit valid credentials successfully
 *
 * Why:
 * Establishes the authenticated entry point for protected page testing
 * while keeping credentials outside the public test code
 */

test('user can log in with valid credentials', async ({ page }) => {
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;

    // Fail clearly when required test credentials are not configured
    if(!email || !password){
        throw new Error('Test login credentials are not configured');
    }

    await page.goto('/');

    await page
       .getByRole('banner')
       .getByRole('link', { name: 'Log in'})
       .click();

    // Read credentials from environment variables so secrets never live in the test
    await page.getByPlaceholder('Email address').fill(email);
    await page.locator('input[type="password"]').fill(password);

    await page.getByRole('button', {name: 'Log in'}).click();

    // Use the authenticated dashboard as the stable signal that login succeeded
    await expect(
        page.locator('[data-test="dashboard-title"]')
    ).toBeVisible();
})