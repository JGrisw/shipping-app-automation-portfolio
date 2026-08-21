import { test, expect } from '@playwright/test';
import { ShipmentsPage } from '../../../pages/ShipmentsPage';

/*
 * What:
 * Verify the Shipments status filter limits results to the selected status
 *
 * Why:
 * Confirms users can narrow the Shipments table by shipment status without
 * depending on a specific shipment record
 */

test('status filter limits shipments to selected status', async ({ page }) => {
    const shipmentsPage = new ShipmentsPage(page);

    await shipmentsPage.goto();

    const statusFilter = page.getByRole('button', {
        name: 'Expand "All statuses"',
    });

    await statusFilter.click();

    const labelCreatedOption = page
        .getByRole('list')
        .getByText('Label created', { exact: true });

    // Confirm the expected status option is available in the filter menu
    await expect(labelCreatedOption).toBeVisible();

    // Apply the Label created status filter
    await labelCreatedOption.click();

    // Confirm the filter control reflects the selected status
    await expect(
        page.getByRole('button', { name: 'Expand "Label created"' })
    ).toBeVisible();

    const shipmentRows = page.locator('tbody tr[data-row-id]');

    // Wait for the filtered result set to render
    await expect(shipmentRows.first()).toBeVisible();

    const visibleStatuses = shipmentRows.getByText('Label created', { exact: true });

    // Confirm every visible shipment row matches the selected status
    await expect(visibleStatuses).toHaveCount(await shipmentRows.count());
});