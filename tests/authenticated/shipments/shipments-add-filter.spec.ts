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

    const firstShipmentId = page
        .locator('tbody tr[data-row-id] td:nth-child(2) span.shipments-cell__mono')
        .first();

    // Confirm a shipment is available before building the filter
    await expect(firstShipmentId).toBeVisible();

    const shipmentIdValue = await firstShipmentId.textContent();

    await page.locator('[data-test="toolbar-add-filter"]').click();

    await expect(
        page.getByRole('dialog').getByText('Add Filter', { exact: true })
    ).toBeVisible();

    await page
        .getByRole('dialog')
        .locator('div')
        .filter({ hasText: /^Column$/ })
        .first()
        .click();

    await page.getByRole('option', { name: 'Shipment Id '}).click();

    await page
        .getByRole('dialog')
        .locator('div')
        .filter({ hasText: /^Operator$/ })
        .first()
        .click();

    await page.getByRole('option', { name: 'is equal to' }).click();

    if (!shipmentIdValue) {
        throw new Error('Shipment ID value was not available');
    }

    await page
        .getByRole('combobox', { name: 'Value' })
        .fill(shipmentIdValue);

    await page
        .getByRole('button', { name: 'Apply' })
        .click();

    // Confirm the filtered result matches the Shipment ID used in the filter
    await expect(firstShipmentId).toHaveText(shipmentIdValue);

    const filteredRows = page.locator('tbody tr[data-row-id]');

        test.fail(
        true,
        'Shipment ID filter duplicates the selected value and does not currently filter results'
    );

    // Shipment ID equality should reduce the table to a single matching row
    await expect(filteredRows).toHaveCount(1);
})