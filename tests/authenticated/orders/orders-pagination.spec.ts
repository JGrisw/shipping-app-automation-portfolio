import { test, expect } from '@playwright/test';
import { OrdersPage } from '../../../pages/OrdersPage';

/*
 * What:
 * Verify moving to the next Order page changes the visible result set
 *
 * Why:
 * Confirms pagination updates the displayed data without depending
 * on fixed order records or a fixed total count
 */

test('orders pagination loads the next result set', async ({ page }) => {
    const ordersPage = new OrdersPage(page);

    await ordersPage.goto();
    await ordersPage.waitForRows();

    const nextPageButton = ordersPage.table.nextPageButton;
    const previousPageButton = ordersPage.table.previousPageButton;

    const orderIds = ordersPage.orderIds;

    // Confirm Previous is disabled on initial page
    await expect(previousPageButton).toBeDisabled();

    // Confirm the initial result set is available before capturing its Order IDs
    await expect(orderIds.first()).toBeVisible();

    // Capture the first page so we can prove the result set actually changes
    const firstPageIds = await orderIds.allTextContents();

    await expect(nextPageButton).toBeEnabled();

    await nextPageButton.click();

    // Wait until pagination replaces the first page's order IDs
    await expect.poll(async () =>
        orderIds.allTextContents(),
        { timeout: 10000 }
    ).not.toEqual(firstPageIds);

    // Confirm previous page becomes enabled after moving forward
    await expect(previousPageButton).not.toBeDisabled();
});