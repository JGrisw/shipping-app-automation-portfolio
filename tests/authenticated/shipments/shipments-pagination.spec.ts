import { test, expect } from '@playwright/test';
import { ShipmentsPage } from '../../../pages/ShipmentsPage';

/*
 * What:
 * Verify moving to the next shipments page changes the visible result set
 *
 * Why:
 * Confirms pagination updates the displayed data without depending on fixed
 * Shipment records or a fixed total count
 */

test('shipments pagination loads the next result set', async ({ page }) => {

    const shipmentsPage = new ShipmentsPage(page);

    await shipmentsPage.goto();
    await shipmentsPage.waitForRows();

    const nextPageButton = shipmentsPage.table.nextPageButton;
    const previousPageButton = shipmentsPage.table.previousPageButton;

    const shipmentIds = shipmentsPage.shipmentIds;

    // Confirm previous page is disabled on initial page
    await expect(previousPageButton).toBeDisabled();

    // Wait for the initial result set before capturing its IDs
    await expect(shipmentIds.first()).toBeVisible();

    const firstPageIds = await shipmentIds.allTextContents();

    await nextPageButton.click();

    // Wait until pagination replaces the first page's shipment IDs
    await expect.poll(async () =>
        shipmentIds.allTextContents()
    ).not.toEqual(firstPageIds);

    // Confirm previous page becomes enabled after moving forward
    await expect(previousPageButton).not.toBeDisabled();
});