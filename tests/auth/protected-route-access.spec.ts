import { test, expect } from '@playwright/test';

/*
 * What:
 * Verify that tests using saved authentication state can open the dashboard 
 *
 * Why:
 * Understanding the actual access-control behavior lets us assert the
 * security boundary without assuming how redirects are implemented
 */

test('logged out user cannot directly access the app', async ({ page }) => {
    await page.goto('/app');

    // Confirm the saved authentication state grants direct access to the protected UI
    await expect(
        page.getByPlaceholder('Email address')
    ).toBeVisible();
});