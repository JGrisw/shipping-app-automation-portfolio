import { test, expect } from '@playwright/test';
import { ShipmentsPage } from '../../../pages/ShipmentsPage';

/*
 * What:
 * Verify selection dependent shipments actions are disabled when no
 * shipments are selected
 *
 * Why:
 * Prevents actions that require shipment context from being triggered
 * with an empy selection
 */

test('selection-dependent actions are disabled with no shipment selected', async ({ page }) => {
    const shipmentsPage = new ShipmentsPage(page);

    await shipmentsPage.goto();

    const actionsButton = page.locator('[data-test="actions-menu"]');

    await actionsButton.click();

    const cancelSelectedLabels = page.locator(
        '[data-test="shipments-cancel-selected-labels"]'
    );

    // Confirm selection dependent actions cannot be run with an empty selection
    await expect(cancelSelectedLabels).toHaveAttribute(
        'aria-disabled',
        'true'
    );

    const copySelectedTracking = page
        .getByRole('listitem')
        .filter({ hasText: 'Copy Selected Tracking' });

    const reprintShippingLabels = page
        .locator('[data-test="shipments-reprint-labels"]');

    await expect(copySelectedTracking).toHaveAttribute(
        'aria-disabled',
        'true'
    );

    await expect(reprintShippingLabels).toHaveAttribute(
        'aria-disabled',
        'true'
    );
});