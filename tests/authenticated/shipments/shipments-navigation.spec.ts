import { test, expect } from '@playwright/test';

/**
 * What:
 * Verify an authenticated user can navigate to the Shipments page through the app UI
 *
 * Why:
 * Confirms the protected Shipments navigation path works independently of direct route
 * access and table behavior
 */

test('authenticated user can navigate to shipments', async ({ page }) => {
    await page.goto('/app');

    // Expand the Orders so the Shipments submenu becomes visible
    await page.getByText('Orders', { exact: true }).click();

    // Use the rendered Shipments link to exercise real sidebar navigation
    await page.locator('a[href="/app/orders/shipments"]').click();

    // Confirm the Shipments page rendered after navigating through the UI
    await expect(
        page.getByRole('main').getByText('Shipments', { exact: true })
    ).toBeVisible();
})