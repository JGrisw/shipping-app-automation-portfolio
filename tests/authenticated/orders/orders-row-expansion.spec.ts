import { test, expect } from '@playwright/test';
import { OrdersPage } from '../../../pages/OrdersPage';

/**
 * What:
 * Verify clicking an order row reveals its expanded details
 *
 * Why:
 * Confirms row level interation exposes additional order
 * information without relying on a specific order record
 */

test('order row expands to show details', async ({ page }) => {

    const ordersPage = new OrdersPage(page);

    await ordersPage.goto();

    const firstOrderCell = page
        .locator('tbody tr[data-row-id] td:nth-child(4)')
        .first();

    await firstOrderCell.click();

    //Confirm expanded order details become available
    await expect(
        page.getByText('Fulfillment').first()
    ).toBeVisible();

});