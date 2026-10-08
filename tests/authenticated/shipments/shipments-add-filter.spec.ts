import { test, expect } from '@playwright/test';
import { ShipmentsPage } from '../../../pages/ShipmentsPage';

/*
 * What:
 * Verify Add Filter can limit Shipments to a dynamically selected Shipment ID
 *
 * Why:
 * Validates advanced table filtering without depending on a hard-coded
 * shipment record 
 */

test('Filter can limit Shipments to a dynamically selected shipment', async ({ page }) => { 
    const shipmentsPage = new ShipmentsPage(page); 

    await shipmentsPage.goto();
    await shipmentsPage.waitForRows();

    const firstShipmentId = shipmentsPage.shipmentIds.first();

    // Capture an existing Shipment ID so the filter does not depend on a fixed test data
    await expect(firstShipmentId).toBeVisible();

    const shipmentIdValue = await firstShipmentId.textContent();

    // Fail clearly if the dynamic filter value could not be captured
    if (!shipmentIdValue) {
        throw new Error('Shipment ID value was not available');
    }

    await page
        .getByRole('button', { name: 'Add filter', exact: true }).click();

    // Scope subsequent controls to the Add Filter dialog
    const filterDialog = page.getByRole('dialog');

    await expect(
        filterDialog.getByText('Add Filter', { exact: true })
    ).toBeVisible();

    await filterDialog
        .locator('div')
        .filter({ hasText: /^Column$/ })
        .first()
        .click();

    await page.getByRole('option', { name: 'Shipment Id '}).click();

    await filterDialog
        .locator('div')
        .filter({ hasText: /^Operator$/ })
        .first()
        .click();

    await page.getByRole('option', { name: 'is equal to' }).click();

    await filterDialog
        .getByRole('combobox', { name: 'Value' })
        .fill(shipmentIdValue);

    await filterDialog
        .getByRole('button', { name: 'Apply' })
        .click();

    const filteredRows = shipmentsPage.table.rows;

    // Known defect: the selected Shipment ID is duplicated and the equality
    // filter does not currently reduce the result set as intended
    test.fail(
        true,
        'Shipment ID filter duplicates the selected value and does not currently filter results'
    );

    // Shipment ID equality should reduce the table to a single matching row
    await expect(filteredRows).toHaveCount(1);
});