import { test, expect } from '@playwright/test';
import { OrdersPage } from '../../../pages/OrdersPage';
import { readFile } from 'node:fs/promises';

/*
 * What:
 * Verify an eligible order can export its data to CSV
 *
 * Why:
 * Validates the csv export workflow without modifying order data
 */

test('eligible order exports data to CSV', async ({ page }) => {
    const ordersPage = new OrdersPage(page);

    await ordersPage.goto();

    const eligibleOrderCheckbox = page
        .getByRole('row')
        .filter({hasText: 'shipped' })
        .first()
        .getByRole('checkbox');

    await expect(eligibleOrderCheckbox).toBeVisible();
    await eligibleOrderCheckbox.check();

    const actionsButton = page.locator(
        '[data-test="actions-menu"]'
    );

    await actionsButton.click();

    const exportCSVButton = page.locator(
        '[data-test="actions-export-csv"]'
    );

    await expect(exportCSVButton).not.toHaveAttribute(
        'aria-disabled',
        'true'
    );

    const downloadPromise = page.waitForEvent('download');

    await exportCSVButton.click();

    const finalExportButton = page.getByRole('button', { name: "Export CSV" });

    await expect(finalExportButton).toBeVisible();

    await finalExportButton.click();

    const download = await downloadPromise;

    expect(await download.failure()).toBeNull();

    const filename = download.suggestedFilename();

    expect(filename).toMatch(/\.csv$/i);

    const downloadPath = await download.path();

    if(!downloadPath) {
        throw new Error('Downloaded CSV path was not available');
    }

    const csvContents = await readFile(downloadPath, 'utf-8');

    expect(csvContents.length).toBeGreaterThan(0);

    const [headerRow] = csvContents.split(/\r?\n/);

    expect(headerRow).toContain('source_order_id');
});