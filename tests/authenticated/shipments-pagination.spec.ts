import { test, expect } from '@playwright/test';
import { ShipmentsPage } from '../../pages/ShipmentsPage';

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

    const nextPageButton = page.getByRole('button', { name: 'Next page' });
    const previousPageButton = page.getByRole('button', { name: 'Previous page' });
    const shipmentIds = page.locator(
        'tbody tr[data-row-id] td:nth-child(2) span.shipments-cell__mono'
    );

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