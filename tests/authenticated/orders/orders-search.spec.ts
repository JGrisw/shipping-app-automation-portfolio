import { test, expect } from '@playwright/test';
import { OrdersPage } from '../../../pages/OrdersPage';

/*
 * What:
 * Verify Search can limit orders to a dynamically selected Order ID
 *
 * Why:
 * Validates advanced table searching without depending on a hard coded
 * order record
 */

test('orders search can limit results to dynamically selected order', async ({ page }) => {
    const ordersPage = new OrdersPage(page);

    await ordersPage.goto();

    const firstOrderId = page
        .locator('tbody tr[data-row-id] td:nth-child(4)')
        .first();

    await expect(firstOrderId).toBeVisible();

    const orderIdValue = await firstOrderId.textContent();

    if(!orderIdValue){
        throw new Error('Order ID value was not available');
    }

    const searchInput = page
        .getByRole('main')
        .getByPlaceholder('Search...');

    await searchInput.fill(orderIdValue);

    await expect(
        page.getByText('Showing 1 to 1 of 1 orders', { exact: true })
    ).toBeVisible();

    await expect(searchInput).toHaveValue(orderIdValue);

    await expect(firstOrderId).toHaveText(orderIdValue);
});