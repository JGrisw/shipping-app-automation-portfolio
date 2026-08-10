import { test, expect } from '@playwright/test';

/**
 * What:
 * verify the shipments table renders its core indentifying columns
 *
 * Why:
 * structural assertions provide stable coverage of the page contract
 * without depending on shipment records that can change over time
 */

test('shipments table displays core columns', async ({ page }) => {
    // navigate directly because sidebar navigation is covered seperately
    await page.goto('/app/orders/shipments');

    //verify stable table structure rather than dynamic shipment data
    await expect(
        page.getByText('Shipment ID', { exact: true })
    ).toBeVisible();

    await expect(
        page.getByText('Tracking', { exact: true })
    ).toBeVisible();

    await expect(
        page.getByText('Status', { exact: true })
    ).toBeVisible();
});