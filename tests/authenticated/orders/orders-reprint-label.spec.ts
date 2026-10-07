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
    await ordersPage.waitForRows();

    // Select an eligible shipped Order without depending on a fixed Order ID
    const eligibleOrderCheckbox = page
        .getByRole('row')
        .filter({hasText: 'shipped' })
        .first()
        .getByRole('checkbox');

    await expect(eligibleOrderCheckbox).toBeVisible();
    await eligibleOrderCheckbox.check();

    const actionsButton = ordersPage.table.actionsButton;

    await actionsButton.click();

    const reprintShippingLabels = page.locator(
        '[data-test="orders-reprint-labels"]'
    );

    // Confirm the label action becomes available for the selected Order
    await expect(reprintShippingLabels).not.toHaveAttribute(
        'aria-disabled',
        'true'
    );

    // Start listening before the click so we do not miss the PDF response or popup
    const pdfResponsePromise = context.waitForEvent('response', response => {
        return response.headers()['content-type']?.includes('application/pdf') === true;
    });
    
    const labelPagePromise = page.waitForEvent('popup');

    await reprintShippingLabels.click();

    // Confirm the application received a successful PDF response with actual content 
    const pdfResponse = await pdfResponsePromise;

    expect(pdfResponse.ok()).toBe(true);

    const pdfBody = await pdfResponse.body();

    expect(pdfBody.length).toBeGreaterThan(0);

    const labelPage = await labelPagePromise;

    // Confirm the label opened in a new tab and remained available to the user
    expect(labelPage.isClosed()).toBe(false);

    await expect(
        page.getByText('Opened 1 label in a single PDF.', { exact: true })
    ).toBeVisible();
});