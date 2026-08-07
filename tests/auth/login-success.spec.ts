import { test, expect } from '@playwright/test';

/*
 * What:
 * verify that an approved test user can submit valid credentials successfully
 *
 * Why:
 * establishes the authenticated entry point for future protected page tests
 * while keeping credentials outside the public test code
 */

test('user can log in with valid credentials', async ({ page }) => {
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;

    // fail clearly if the local test environment is not configured
    if(!email || !password){
        throw new Error('Test login credentials are not configured');
    }

    await page.goto('/');

    await page
       .getByRole('banner')
       .getByRole('link', { name: 'Log in'})
       .click();

    await page.getByPlaceholder('Email address').fill(email);
    await page.locator('input[type="password"]').fill(password);

    await page.getByRole('button', {name: 'Log in'}).click();

    //confirm successful authentication reached the dashboard
    await expect(
        page.locator('[data-test="dashboard-title"]')
    ).toBeVisible();
})