import { test, expect } from '@playwright/test';
import { OrdersPage } from '../../../pages/OrdersPage';

/*
 * What:
 * Verify an eligible order can open its existing shipping label for reprint
 *
 * Why:
 * Validates the label retrieval workflow without modifying shipping data
 */

test('eligble order opens existing label PDF for reprint', async ({ page, context }) => {
    const ordersPage = new OrdersPage(page);

    await ordersPage.goto();

    const eligibleOrderCheckbox = page
        .getByRole('row')
        .filter({hasText: 'shipped' })
        .first()
        .getByRole('checkbox');

    await expect(eligibleOrderCheckbox).toBeVisible();
    await eligibleOrderCheckbox.check();

    const actionsButton = page.locator(
        '[data-test="actions-menu"]'
    );

    await actionsButton.click();

    const reprintShippingLabels = page.locator(
        '[data-test="orders-reprint-labels"]'
    );

    await expect(reprintShippingLabels).not.toHaveAttribute(
        'aria-disabled',
        'true'
    );

    const pdfResponsePromise = context.waitForEvent('response', response => {
        return response.headers()['content-type']?.includes('application/pdf') === true;
    });
    
    const labelPagePromise = page.waitForEvent('popup');

    await reprintShippingLabels.click();

    const pdfResponse = await pdfResponsePromise;

    expect(pdfResponse.ok()).toBe(true);

    const pdfBody = await pdfResponse.body();

    expect(pdfBody.length).toBeGreaterThan(0);

    const labelPage = await labelPagePromise;

    expect(labelPage.isClosed()).toBe(false);

    await expect(
        page.getByText('Opened 1 label in a single PDF.', { exact: true })
    ).toBeVisible();
});