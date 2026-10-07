import { test, expect } from '@playwright/test';
import { OrdersPage } from '../../../pages/OrdersPage';

/*
 * What:
 * Verify Search can limit Orders to a dynamically selected Order ID
 *
 * Why:
 * Validates table searching against real available data without depending
 * on a hard-coded order record
 */

test('orders search can limit results to dynamically selected order', async ({ page }) => {
    const ordersPage = new OrdersPage(page);

    await ordersPage.goto();
    await ordersPage.waitForRows();

    // Capture an existing Order ID so the search stays independent of fixed test data
    const firstOrderId = ordersPage.orderIds.first();

    await expect(firstOrderId).toBeVisible();

    const orderIdValue = await firstOrderId.textContent();

    // Fail clearly if the dynamic search value could not be captured
    if(!orderIdValue){
        throw new Error('Order ID value was not available');
    }

    const searchInput = ordersPage.table.searchInput;

    await searchInput.fill(orderIdValue);

    // Confirm the search narows to the expected order and keeps the query applied
    await expect(
        page.getByText('Showing 1 to 1 of 1 orders', { exact: true })
    ).toBeVisible();

    await expect(searchInput).toHaveValue(orderIdValue);

    await expect(firstOrderId).toHaveText(orderIdValue);
});