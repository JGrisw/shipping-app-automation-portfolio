import { test, expect } from '@playwright/test';

/*
 * What:
 * verify that tests using saved authentication state can open the dashboard
 *
 * Why:
 * confirms that protected page tests can start authenticated without repeating
 * the login UI flow in every test
 */

test('authenticated user can access the dashboard', async ({ page }) => {
    await page.goto('/app');

    //saved storage state should allow direct access to the authenticated UI
    await expect(
        page.locator('[data-test="dashboard-title"]')
    ).toBeVisible();
});