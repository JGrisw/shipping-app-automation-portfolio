import { test, expect } from '@playwright/test';
import { OrdersPage } from '../../../pages/OrdersPage';

/*
 * What:
 * Verify selection dependent order actions are enabled when
 * orders are selected
 *
 * Why:
 * Verifies actions that require order context to be triggered
 * trigger when appropriately selected
 */

test('selection dependent actions are enabled with order selected', async ({ page }) =>{
    const ordersPage = new OrdersPage(page);

    await ordersPage.goto();

    //dynamically grab a selected row
    const firstOrderRow = page
        .locator('tbody tr[data-row-id]')
        .first();

    const firstOrderRowCheckbox = firstOrderRow.getByRole('checkbox');

    await firstOrderRowCheckbox.check();

    const actionsButton = page.locator(
        '[data-test="actions-menu"]'
    );

    await actionsButton.click();

    const reprintShippingLabels = page.locator(
        '[data-test="orders-reprint-labels"]'
    );

    await expect(reprintShippingLabels).not.toHaveAttribute(
        'aria-disabled',
        'false'
    );
});