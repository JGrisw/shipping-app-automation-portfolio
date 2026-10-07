import { test, expect } from '@playwright/test';
import { OrdersPage } from '../../../pages/OrdersPage';
import { readFile } from 'node:fs/promises';

/*
 * What:
 * Verify an eligible order can export its data to CSV
 *
 * Why:
 * Validates the csv export workflow and downloaded file contents without
 * modifying Order data
 */

test('eligible order exports data to CSV', async ({ page }) => {
    const ordersPage = new OrdersPage(page);

    await ordersPage.goto();
    await ordersPage.waitForRows();

    // Select an eligible shipped Order without depending on a fixed Order ID
    const eligibleOrderCheckbox = page
        .getByRole('row')
        .filter({hasText: 'shipped' })
        .first()
        .getByRole('checkbox');

    await expect(eligibleOrderCheckbox).toBeVisible();
    await eligibleOrderCheckbox.check();

    const actionsButton = ordersPage.table.actionsButton;

    await actionsButton.click();

    const exportCSVButton = page.locator(
        '[data-test="actions-export-csv"]'
    );

    // Confirm Export CSV becomes available for the selected order
    await expect(exportCSVButton).not.toHaveAttribute(
        'aria-disabled',
        'true'
    );

    // Start listening before the final click so the download event is not missed
    const downloadPromise = page.waitForEvent('download');

    await exportCSVButton.click();

    const finalExportButton = page.getByRole('button', { name: "Export CSV" });

    await expect(finalExportButton).toBeVisible();

    await finalExportButton.click();

    const download = await downloadPromise;

    // A Successful Playwright download reports no failure message
    expect(await download.failure()).toBeNull();

    const filename = download.suggestedFilename();

    // Confirm the downloaded file is actually a CSV
    expect(filename).toMatch(/\.csv$/i);

    const downloadPath = await download.path();

    if(!downloadPath) {
        throw new Error('Downloaded CSV path was not available');
    }

    // Read the downladed file so we validate its contents, not just the download event
    const csvContents = await readFile(downloadPath, 'utf-8');

    expect(csvContents.length).toBeGreaterThan(0);

    const [headerRow] = csvContents.split(/\r?\n/);

    // Confirm the export contains a core Orders data column
    expect(headerRow).toContain('source_order_id');
});