import { test, expect } from '@playwright/test';
import { OrdersPage } from '../../../pages/OrdersPage';

/*
 * What:
 * Verify the orders table renders its core identifying columns
 *
 * Why:
 * Structural assertions provide stable coverage of the page contract
 * without depending on order records that change over time
 */

test('orders table displays core columns', async ({ page }) => {
    const ordersPage = new OrdersPage(page);

    await ordersPage.goto();

    await expect(
        page.getByRole('columnheader', { name: 'Order ID Add filter for Order'})
    ).toBeVisible();

    await expect(
        page.getByRole('columnheader', { name: 'Customer Add filter for'})
    ).toBeVisible();

    await expect(
        page.getByRole('columnheader', { name: 'Status Add filter for Status'})
    ).toBeVisible();    
});
