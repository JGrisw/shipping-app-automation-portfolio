import { test, expect } from '@playwright/test';

/*
 * What:
 * Verify Shipment ID sorting toggles between ascending and descending states
 *
 * Why:
 * Confirms the table exposes and updates its sort direction without depending
 * on specific shipment records
 */

test('shipment ID sort toggles direction', async ({ page }) => {
    await page.goto('/app/orders/shipments');

    const shipmentIdHeader = page.locator('th', { hasText: 'Shipment ID' });

    // First click applies ascending sort
    await shipmentIdHeader.click();

    // Confirm the header is marked as sorted
    await expect(shipmentIdHeader).toHaveClass(/sorted/);
    // Confirm descending is NOT active yet
    await expect(shipmentIdHeader).not.toHaveClass(/sort-desc/);

    await shipmentIdHeader.click();

    // Confirm descending sort is now active
    await expect(shipmentIdHeader).toHaveClass(/sort-desc/);
});