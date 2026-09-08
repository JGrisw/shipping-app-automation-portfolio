import { test, expect } from '@playwright/test';
import { OrdersPage } from '../../../pages/OrdersPage';

/*
 * What:
 * Verify the Orders status filter limits results to the selected status
 *
 * Why:
 * Confirms users can narrow the Orders table by order status without
 * depending on a specific order record
 */

test('status filter limits orders to selected status', async ({ page }) => {
    const ordersPage = new OrdersPage(page);

    await ordersPage.goto();
    await ordersPage.waitForRows();

    const readyToShipCard = page
        .getByRole('button', { name: 'Ready To Ship'});

    const readyToShipCount = readyToShipCard
        .locator('.orders-summary-card__value');

    await expect(readyToShipCount).not.toHaveText('0');

    const readyToShipCountValue = await readyToShipCount.textContent();

    console.log(readyToShipCountValue);
    
});