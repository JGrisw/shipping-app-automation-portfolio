import { test, expect } from '@playwright/test';
import { ShipmentsPage } from '../../pages/ShipmentsPage';

/*
 * What:
 * Verify Shipment ID sorting toggles direction and reorders the visible rows
 *
 * Why:
 * Confirms the sort control state and rendered shipment ID order stay aligned
 */

test('shipment ID sort toggles direction', async ({ page }) => {

    const shipmentsPage = new ShipmentsPage(page);

    await shipmentsPage.goto();

    const shipmentIdHeader = page.locator('th', { hasText: 'Shipment ID' });

    const shipmentIds = page.locator(
    'tbody tr[data-row-id] td:nth-child(2) span.shipments-cell__mono'
    );

    // Wait for shipment rows to finish rendering before reading their values.
    await expect(shipmentIds.first()).toBeVisible();

    // First click applies ascending sort
    await shipmentIdHeader.click();

    // Confirm the header is marked as sorted
    await expect(shipmentIdHeader).toHaveClass(/sorted/);
    // Confirm descending is NOT active yet
    await expect(shipmentIdHeader).not.toHaveClass(/sort-desc/);

    // Wait for the refreshed rows to reflect ascending order
    await expect.poll(async () => {
        const ids = (await shipmentIds.allTextContents()).map(Number);

        return ids.every((id, index) =>
        index === 0 || ids[index - 1] <= id
        );
    }).toBe(true);

    // Second click applies descending sort
    await shipmentIdHeader.click();

    // Confirm descending sort is now active
    await expect(shipmentIdHeader).toHaveClass(/sort-desc/);

    // Wait for the refreshed rows to reflect descending order
    await expect.poll(async () => {
        const ids = (await shipmentIds.allTextContents()).map(Number);

        return ids.every((id, index) =>
            index === 0 || ids[index - 1] >= id
        );
    }).toBe(true);
});