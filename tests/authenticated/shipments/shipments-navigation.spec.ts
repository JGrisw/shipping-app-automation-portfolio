import { test, expect } from '@playwright/test';

/**
 * What:
 * explore navigation from the authenticated app to the shipments page
 *
 * Why:
 * this establishes the first protected workflow before we begin
 * asserting shipment data or table behavior
 */

test('authenticated user can navigate to shipments', async ({ page }) => {
    await page.goto('/app');

    //expand orders so the shipments submenu becomes visible
    await page.getByText('Orders', { exact: true }).click();

    //navigate through the now visible shipments link
    await page.locator('a[href="/app/orders/shipments"]').click();

    //confirm the expected shipments page rendered
    await expect(
        page.getByText('SHIPMENTS', { exact: true })
    ).toBeVisible();
})