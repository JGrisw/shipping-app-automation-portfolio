import { test, expect } from '@playwright/test';
import { OrdersPage } from '../../../pages/OrdersPage';

/*
 * What:
 * Verify selection dependent Order actions are disabled when no
 * Orders are selected
 *
 * Why:
 * Prevents actions that require Order context from being triggered
 * with an empty selection
 */

test('selection dependent actions are disabled with no order selected', async ({ page }) => {
    const ordersPage = new OrdersPage(page);

    await ordersPage.goto();

    const actionsButton = ordersPage.table.actionsButton;

    // Open Actions without selecting a row to verify empty selection safeguards
    await actionsButton.click();

    const reprintSelectedLabels = page.locator(
        '[data-test="orders-reprint-labels"]'
    );

    // These menu actions expose disabled state through aria-disabled
    await expect(reprintSelectedLabels).toHaveAttribute(
        'aria-disabled',
        'true'
    );

    // Check a section action item that should be disabled
    const purchaseReturnLabel = page.locator(
        '[data-test="orders-buy-return-label"]'
    );

    await expect(purchaseReturnLabel).toHaveAttribute(
        'aria-disabled',
        'true'
    );
});