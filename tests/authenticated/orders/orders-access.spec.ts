import { test, expect } from '@playwright/test';
import { OrdersPage } from '../../../pages/OrdersPage';

/*
 * What:
 * Verifies an authenticated user can directly access the Orders page
 *
 * Why:
 * Confirms the protected Orders route and primary Orders table
 * render for an authenticaed user
 */

test('authenticated user can directly access Orders', async ({ page }) => {
    const ordersPage = new OrdersPage(page);

    await ordersPage.goto();

    // Confirm the Orders page itself rendered successfully
    await expect(
        page.locator('[data-test="orders-title"]')
    ).toBeVisible();

    // Confirm the primary Orders table initialized, not just the page sheell. 
    await expect(
        page.getByRole('columnheader', { name: 'Order ID Add filter for Order'})
    ).toBeVisible();
});