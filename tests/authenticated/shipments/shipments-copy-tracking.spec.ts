import { test, expect } from '@playwright/test';
import { ShipmentsPage } from '../../../pages/ShipmentsPage';

/**
 * What:
 * Verify selecting a shipment enables Copy Selected Tracking and confirms
 * the copy action
 *
 * Why:
 * Confirms selection state correctly enables a safe shipment action and
 * provides user feedback
 */

test('selected eligible shipment can copy tracking number', async ({ page, context }) => {
    const shipmentsPage = new ShipmentsPage(page);
    await context.grantPermissions(['clipboard-write']);

    await shipmentsPage.goto();

    const eligibleShipmentCheckbox = page
        .getByRole('row')
        .filter({ hasText: 'Label created' })
        .first()
        .getByRole('checkbox');

    // Verify we found an eligle shipment before interacting with it
    await expect(eligibleShipmentCheckbox).toBeVisible();

    await eligibleShipmentCheckbox.check();

    const actionsButton = page.locator('[data-test="actions-menu"]');

    await actionsButton.click();

    const copySelectedTracking = page
        .getByRole('listitem')
        .filter({ hasText: 'Copy Selected Tracking' });

    // Confirm the action is no longer marked unavailable
    await expect(copySelectedTracking).not.toHaveAttribute(
        'aria-disabled',
        'true'
    );

    await copySelectedTracking.click();

    // Confirm the copy action completed successfully
    await expect(
        page.getByText('Copied 1 tracking number.', { exact: true })
    ).toBeVisible();
});