import { test, expect } from '@playwright/test';
import { ShipmentsPage } from '../../../pages/ShipmentsPage';

/*
 * What:
 * Verify selection dependent Shipment actions are disabled when no
 * shipments are selected
 *
 * Why:
 * Prevents actions that require Shipment context from being triggered
 * with an empy selection
 */

test('selection-dependent actions are disabled with no shipment selected', async ({ page }) => {
    const shipmentsPage = new ShipmentsPage(page);

    await shipmentsPage.goto();

    const actionsButton = shipmentsPage.table.actionsButton;

    // Open Actions without selecting a Shipment to verify empty-selection safeguard
    await actionsButton.click();

    const cancelSelectedLabels = page.locator(
        '[data-test="shipments-cancel-selected-labels"]'
    );

    // Selection-dependent menu actions expose disabled state through aria-diabled
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