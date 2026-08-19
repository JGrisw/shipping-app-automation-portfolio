import { test, expect } from '@playwright/test';
import { ShipmentsPage } from '../../../pages/ShipmentsPage';

/*
 * What:
 * Verify an eligible shipment can open its existing shipping label for reprint
 *
 * Why:
 * Validates the label retrieval workflow without modifying shipment data
 */

test('eligible shipment opens existing label PDF for reprint', async ({ page, context }) => {
        const shipmentsPage = new ShipmentsPage(page);

        await shipmentsPage.goto();

        const eligibleShipmentCheckbox = page
            .getByRole('row')
            .filter({ hasText: 'Label created' })
            .first()
            .getByRole('checkbox');

        // Confirm an eligible shipment is available before interacting with it
        await expect(eligibleShipmentCheckbox).toBeVisible();
        await eligibleShipmentCheckbox.check();

        await page.locator('[data-test="actions-menu"]').click();

        const reprintShippingLabels = page.locator(
        '[data-test="shipments-reprint-labels"]'
        );

        // Confirm Reprint Shipping Labels becomes available for the selection
        await expect(reprintShippingLabels).not.toHaveAttribute(
            'aria-disabled',
            'true'
        );

        const pdfResponsePromise = context.waitForEvent('response', response => {
            return response.headers()['content-type']?.includes('application/pdf') === true;
        });

        // Start listening before the click so we don't miss the new label tab
        const labelPagePromise = page.waitForEvent('popup');

        await reprintShippingLabels.click();

        const pdfResponse = await pdfResponsePromise;

        // Confirm the PDF request completed successfully
        expect(pdfResponse.ok()).toBe(true);

        const pdfBody = await pdfResponse.body();

        // Confirm the returned PDF contains data
        expect(pdfBody.length).toBeGreaterThan(0);

        const labelPage = await labelPagePromise;

        // Confirm the newly opened label tab remains available
        expect(labelPage.isClosed()).toBe(false);

        // Confirm the application reports that the label was opened
        await expect(
            page.getByText('Opened 1 label in a single PDF.', { exact: true })
        ).toBeVisible();
    });