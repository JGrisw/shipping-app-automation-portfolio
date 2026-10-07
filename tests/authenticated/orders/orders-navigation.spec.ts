import { test, expect } from '@playwright/test';

/*
 * What:
 * Verify an authenticated user can navigate to the Orders page through the app UI
 *
 * Why:
 * confirms the protected Order navigation path works independently of
 * direct route access and table behavior
 */

test('authenticated user can navigate to orders', async ({ page }) => {
    await page.goto('/app');

    // Expand the Order menu so its submenu link become available
    await page.getByText('Orders', { exact: true }).click();

    // Use the rendered Orders link to exercise real sidebar navigation
    await page.locator('a[href="/app/orders"]').click();

    // Confirm the Orders page rendered after navigating through the UI
    await expect(
        page.locator('[data-test="orders-title"]')
    ).toBeVisible();
});