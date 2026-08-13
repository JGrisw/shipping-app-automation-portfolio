import { test, expect } from '@playwright/test';
import { ShipmentsPage } from '../../pages/ShipmentsPage';

/*
 * What:
 * Verify Clicking a shipment row reveals its expanded details
 *
 * Why:
 * Confirms row level interaction exposes additional shipment
 * information without relying on a specific shipment record
 */

test('shipment row expands to show details', async ({ page }) => {

    const shipmentsPage = new ShipmentsPage(page);

    await shipmentsPage.goto();

    const firstShipmentCell = page
        .getByRole('cell', { name: '#' })
        .first();

    await firstShipmentCell.click();

    // Confirm expanded shipment details become available
    await expect(
        page.getByText('Recent Events').first()
    ).toBeVisible();
});