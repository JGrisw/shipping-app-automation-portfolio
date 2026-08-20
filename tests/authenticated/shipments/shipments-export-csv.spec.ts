import { test, expect } from '@playwright/test';
import { ShipmentsPage } from '../../../pages/ShipmentsPage';
import { readFile } from 'node:fs/promises';

/*
 * What:
 * Verify a selected shipment can be exported as a CSV file
 *
 * Why:
 * Validates a read-only export workflow and confirms the application
 * produces a downloadable file for the selected shipment
 */

test('selected shipment can export to CSV', async ({ page }) => {
    const shipmentsPage = new ShipmentsPage(page);

    await shipmentsPage.goto();

    const eligibleShipmentCheckbox = page
        .getByRole('row')
        .filter({ hasText: 'Label created' })
        .first()
        .getByRole('checkbox');

    // Confirm an exportable shipment is available before interacting with it
    await expect(eligibleShipmentCheckbox).toBeVisible();
    await eligibleShipmentCheckbox.check();

    await page.locator('[data-test="actions-menu"]').click();

    const exportCsvAction = page.getByText('Export CSV', { exact: true });

    await exportCsvAction.click();

    await expect(
        page.getByRole('button', { name: 'Export CSV' })
    ).toBeVisible();

    const exportCsvButton = page.getByRole('button', { name: 'Export CSV' });

    // Start listening before the click so we don't miss the download event
    const downloadPromise = page.waitForEvent('download');

    await exportCsvButton.click();

    const download = await downloadPromise;

    // Confirm the browser received a CSV file
    expect(download.suggestedFilename()).toMatch(/\.csv$/i);

    // Confirm the browser completed the download without an error
    expect(await download.failure()).toBeNull();

    const downloadPath = await download.path();

    // Confirm playwright has a download file availale to inspect
    expect(downloadPath).not.toBeNull();

    const csvContents = await readFile(downloadPath!, 'utf8');

    // Confirm the export file contains the expected Shipment ID column
    expect(csvContents).toContain('shipment_id');
});