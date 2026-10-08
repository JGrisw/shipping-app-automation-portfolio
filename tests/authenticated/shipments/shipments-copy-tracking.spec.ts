import { test, expect } from '@playwright/test';
import { ShipmentsPage } from '../../../pages/ShipmentsPage';

/**
 * What:
 * Verify selecting an eligible Shipment enables Copy Selected Tracking and
 * confirms the copy action completes successfully
 *
 * Why:
 * Confirms selection state correctly enables a safe shipment action and
 * provides clear user feedback after copying
 */

test('selected eligible shipment can copy tracking number', async ({ page, context }) => {
    const shipmentsPage = new ShipmentsPage(page);

    // Grant clipboard permission because the action writes to the system clipboard
    await context.grantPermissions(['clipboard-write']);

    await shipmentsPage.goto();
    await shipmentsPage.waitForRows();

    // Use a Label created Shipment because it has tracking data available to copy
    const eligibleShipmentCheckbox = page
        .getByRole('row')
        .filter({ hasText: 'Label created' })
        .first()
        .getByRole('checkbox');

    // Confirm an eligible Shipment is available before interacting with it
    await expect(eligibleShipmentCheckbox).toBeVisible();

    await eligibleShipmentCheckbox.check();

    const actionsButton = shipmentsPage.table.actionsButton;

    await actionsButton.click();

    const copySelectedTracking = page
        .getByRole('listitem')
        .filter({ hasText: 'Copy Selected Tracking' });

    // Confirm the action becomes available after selecting an eligible Shipment
    await expect(copySelectedTracking).not.toHaveAttribute(
        'aria-disabled',
        'true'
    );

    await copySelectedTracking.click();

    // Confirm the application reports that the tracking number was copied
    await expect(
        page.getByText('Copied 1 tracking number.', { exact: true })
    ).toBeVisible();
});