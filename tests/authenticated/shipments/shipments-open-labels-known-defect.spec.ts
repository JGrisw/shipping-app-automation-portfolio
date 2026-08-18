import { test, expect } from '@playwright/test';
import { ShipmentsPage } from '../../../pages/ShipmentsPage';

/*
 * What: Captures a known defect where a label-dependent action remains unavailable
 * even when the selected shipment has an existing label
 *
 * Why:
 * Captures a known defect where a label-dependent action remains unavailable
 */


test('eligible shipment can open selected labels', async ({ page }) => {
    const shipmentsPage = new ShipmentsPage(page);

    await shipmentsPage.goto();

    const eligibleShipmentCheckbox = page
        .getByRole('row')
        .filter({ hasText: 'Label created' })
        .first()
        .getByRole('checkbox');

    await expect(eligibleShipmentCheckbox).toBeVisible();
    await eligibleShipmentCheckbox.check();

    await page.locator('[data-test="actions-menu"]').click();

    const openSelectedLabels = page
        .getByRole('listitem')
        .filter({ hasText: 'Open Selected Labels' });

    // Known defect: eligilble shipments should enable Open Selected Labels
    test.fail(true, 'Open Selected Labels remains disabled for eligible shipments');

    await expect(openSelectedLabels).not.toHaveAttribute(
        'aria-disabled',
        'true'
    );
});