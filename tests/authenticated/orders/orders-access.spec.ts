import { test, expect } from '@playwright/test';
import { OrdersPage } from '../../../pages/OrdersPage';

/*
 * What:
 * Verifies an authenticated user can access the Orders page
 *
 * Why:
 * Confirms the protected Orders route and primary Orders table
 * render for an authenticaed user
 */

test('authenticated user can directly access Orders', async ({ page }) => {
    const ordersPage = new OrdersPage(page);

    await ordersPage.goto();

    await expect(
        page.locator('[data-test="orders-title"]')
    ).toBeVisible();

    await expect(
        page.getByRole('columnheader', { name: 'Order ID Filter Order ID'})
    ).toBeVisible();
});