import { test, expect } from '@playwright/test';
import { ShipmentsPage } from '../../../pages/ShipmentsPage';

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
    await shipmentsPage.waitForRows();

    // Use the first stable cell as the click target because clicking
    // anywhere in a Shipment row expands that row
    const firstShipmentCell = page
        .getByRole('cell', { name: '#' })
        .first();

    await firstShipmentCell.click();

    // Confirm content unique to the expandded Shipment row becomes visible
    await expect(
        page.getByText('Recent Events').first()
    ).toBeVisible();
});