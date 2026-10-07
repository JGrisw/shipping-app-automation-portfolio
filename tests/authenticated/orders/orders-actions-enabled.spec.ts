import { test, expect } from '@playwright/test';
import { OrdersPage } from '../../../pages/OrdersPage';

/*
 * What:
 * Verify selection dependent order actions are enabled when
 * an Order is selected
 *
 * Why:
 * Confirms actions that require Order context become available only
 * after the user provides a valid selection
 */

test('selection dependent actions are enabled with order selected', async ({ page }) =>{
    const ordersPage = new OrdersPage(page);

    await ordersPage.goto();
    await ordersPage.waitForRows();

    // Select the first available Order without depending on a fixed Order Id
    const firstOrderRow = ordersPage.table.rows.first();
    const firstOrderRowCheckbox = firstOrderRow.getByRole('checkbox');

    await firstOrderRowCheckbox.check();

    const actionsButton = ordersPage.table.actionsButton;

    await actionsButton.click();

    const reprintShippingLabels = page.locator(
        '[data-test="orders-reprint-labels"]'
    );


    await expect(reprintShippingLabels).not.toHaveAttribute(
        'aria-disabled',
        'true'
    );
});