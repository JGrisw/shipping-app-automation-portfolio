import { test as setup, expect } from '@playwright/test';

/*
 * What:
 * authenticate once and save the browser state for protected page tests
 *
 * Why:
 * Reusing authenticated state avoids repeating the login UI flow in every
 * test while keeping the authentication process explicit and maintainable
 */

// Keep authenticated browser state in the ignored Playwright auth directory
const authFile = 'playwright/.auth/user.json';

setup('authenticate test user', async ({ page }) => {
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;

    // Fail clearly when local credentials are unavailable
    if (!email || !password){
        throw new Error('Test login credentials are not configured');
    }

    // Navigate directly because public landing page navigation is tested separately
    await page.goto('/login');

    await page.getByPlaceholder('Email Address').fill(email);
    await page.locator('input[type="password"]').fill(password);
    await page.getByRole('button', { name: 'Log in' }).click();

    // Confirm authentication succeeded before saving browser state
    await expect(
        page.locator('[data-test="dashboard-title"]')
    ).toBeVisible();

    // Save cookies and local storage so later tests can start already authenticated
    await page.context().storageState({ path: authFile });
});