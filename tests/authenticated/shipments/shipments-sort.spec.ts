import { test, expect } from '@playwright/test';
import { ShipmentsPage } from '../../../pages/ShipmentsPage';

/*
 * What:
 * Verify Shipment ID sorting toggles direction and reorders the visible rows
 *
 * Why:
 * Confirms the sort control state and rendered Shipment ID order stay aligned
 */

test('shipment ID sort toggles direction', async ({ page }) => {

    const shipmentsPage = new ShipmentsPage(page);

    await shipmentsPage.goto();
    await shipmentsPage.waitForRows();

    // Use the Shipment ID header as both the sort trigger and state indicator
    const shipmentIdHeader = page.locator('th', { hasText: 'Shipment ID' });

    const shipmentIds = shipmentsPage.shipmentIds;

    // Confirm Shipment IDs are available before evaluating their order
    await expect(shipmentIds.first()).toBeVisible({ timeout: 10000 });

    // First click applies ascending sort
    await shipmentIdHeader.click();

    // Verify the header reports ascending sort state
    await expect(shipmentIdHeader).toHaveClass(/sorted/);
    await expect(shipmentIdHeader).not.toHaveClass(/sort-desc/);

    // Wait for the refreshed rows to reflect ascending numeric order
    await expect.poll(async () => {
        const ids = (await shipmentIds.allTextContents()).map(Number);

        return ids.every((id, index) =>
        index === 0 || ids[index - 1] <= id
        );
    }).toBe(true);

    // Second click applies descending sort
    await shipmentIdHeader.click();

    // Verify the header reports descending sort state
    await expect(shipmentIdHeader).toHaveClass(/sort-desc/);

    // Wait for the refreshed rows to reflect descending numeric order
    await expect.poll(async () => {
        const ids = (await shipmentIds.allTextContents()).map(Number);

        return ids.every((id, index) =>
            index === 0 || ids[index - 1] >= id
        );
    }).toBe(true);
});