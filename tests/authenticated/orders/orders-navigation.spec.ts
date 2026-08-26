import { test, expect } from '@playwright/test';

/*
 * What:
 * Explore navigation from the authenticated app to the orders page
 *
 * Why:
 * This establistes the first protected workflow before we begin
 * asserting order data or table behavior
 */

test('authenticated user can navigate to orders', async ({ page }) => {
    await page.goto('/app');

    // Expand orders so the orders page submenu becomes visible
    await page.getByText('Orders', { exact: true }).click();

    // Navigate through the now visible orders link
    await page.locator('a[href="/app/orders"]').click();

    // Confirm the expected orders page rendered
    await expect(
        page.getByText('Order Summary', { exact: true })
    ).toBeVisible();
})

