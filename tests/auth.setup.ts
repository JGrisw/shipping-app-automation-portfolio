import { test as setup, expect } from '@playwright/test';

/*
 * What:
 * authenticate once and save the browser state for protected-page tests
 *
 * Why:
 * reusing authenticated state avoids repeating the login UI flow in every
 * test while keeping the authentication process explicit and maintainable
 */

const authFile = 'playwright/.auth/user.json';

setup('authenticate test user', async ({ page }) => {
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;

    // fail clearly when local credentials are unavailable
    if (!email || !password){
        throw new Error('Test login credentials are not configured');
    }

    //setup can navigate directly: landing page navigation is tested separately
    await page.goto('/login');

    await page.getByPlaceholder('Email Address').fill(email);
    await page.locator('input[type="password"]').fill(password);
    await page.getByRole('button', { name: 'Log in' }).click();

    // wait for a confirmed authenticated state before saving it
    await expect(
        page.locator('[data-test="dashboard-title"]')
    ).toBeVisible();

    // save cookies/local storage so later tests can start already logged in
    await page.context().storageState({ path: authFile });
});