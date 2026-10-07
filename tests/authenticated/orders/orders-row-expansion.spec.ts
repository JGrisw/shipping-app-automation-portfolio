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
    await ordersPage.waitForRows();

    // Use the first available Order ID cell as a stable click target for row expansion
    const firstOrderCell = ordersPage.orderIds.first();

    await firstOrderCell.click();

    //Confirm content unique to the expanded row becomes visible
    await expect(
        page.getByText('Fulfillment').first()
    ).toBeVisible();

});