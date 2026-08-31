import { test, expect } from '@playwright/test';
import { OrdersPage } from '../../../pages/OrdersPage';

/*
 * What:
 * Verify selection dependent order actions are disabled when no
 * orders are selected
 *
 * Why:
 * Prevents actions that require order context from being triggered
 * with an empty selection
 */

test('selection dependent actions are disabled with no order selected', async ({ page }) => {
    const ordersPage = new OrdersPage(page);

    await ordersPage.goto();

    const actionsButton = page.locator(
        '[data-test="actions-menu"]'
    );

    await actionsButton.click();

    const reprintSelectedLabels = page.locator(
        '[data-test="orders-reprint-labels"]'
    );

    await expect(reprintSelectedLabels).toHaveAttribute(
        'aria-disabled',
        'true'
    );

    // check another action item that should be disabled
    const purchaseReturnLabel = page.locator(
        '[data-test="orders-buy-return-label"]'
    );

    await expect(purchaseReturnLabel).toHaveAttribute(
        'aria-disabled',
        'true'
    );
});