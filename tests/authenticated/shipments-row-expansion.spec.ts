import { test, expect } from '@playwright/test';

/*
 * What:
 * Verify Clicking a shipment row reveals its expanded details
 *
 * Why:
 * Confirms row level interaction exposes additional shipment
 * information without relying on a specific shipment record
 */

test('shipment row expands to show details', async ({ page }) => {
    await page.goto('/app/orders/shipments');

    const firstShipmentCell = page
        .getByRole('cell', { name: '#' })
        .first();

    await firstShipmentCell.click();

    // Confirm expanded shipment details become available
    await expect(
        page.getByText('Recent Events').first()
    ).toBeVisible();
});