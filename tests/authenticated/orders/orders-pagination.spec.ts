import { test, expect } from '@playwright/test';
import { OrdersPage } from '../../../pages/OrdersPage';

/*
 * What:
 * Verify moving to the next orders page changes the visible result set
 *
 * Why:
 * Confirms pagination updates the displayed the data without depending
 * on fixed order records or a fixed total count
 */

test('orders pagination loads the next result set', async ({ page }) => {
    const ordersPage = new OrdersPage(page);

    await ordersPage.goto();

    const nextPageButton = page.getByRole('button', { name: 'Next page' });

    const previousPageButton = page.getByRole('button', { name: 'Previous page' });
    const orderIds = page.locator(
        'tbody tr[data-row-id] td:nth-child(4)'
    );

    // Confirm previous page is disabled on initial page
    await expect(previousPageButton).toBeDisabled();

    // Wait for the initial result set before capturing its IDs
    await expect(orderIds.first()).toBeVisible();

    const firstPageIds = await orderIds.allTextContents();

    await expect(nextPageButton).toBeEnabled();

    await nextPageButton.click();

    // Wait until pagination replaces the first page's order IDs
    await expect.poll(async () =>
        orderIds.allTextContents()
    ).not.toEqual(firstPageIds);

    // Confirm previous page becomes enabled after moving forward
    await expect(previousPageButton).not.toBeDisabled();
});