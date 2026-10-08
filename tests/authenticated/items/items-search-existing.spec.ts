import { test, expect } from '@playwright/test';
import { ItemsPage } from '../../../pages/ItemsPage';

/*
 * What:
 * Verify Items search can find an existing Item using a dynamically captured SKU.
 *
 * Why:
 * Confirms the global Items table search returns matching records without
 * depending on a hard-coded SKU.
 */

test('items search displays results for a matched query', async ({ page }) => {
    const itemsPage = new ItemsPage(page);

    await itemsPage.goto();
    await itemsPage.waitForRows();

    const searchInput = page
        .getByRole('main')
        .getByPlaceholder('Search...');

    // Resolve the SKU column dynamically instead of depending on a fixed position
    const skuHeader = page.getByRole('columnheader', {
        name: 'SKU Add filter for SKU',
        exact: true,
    });

    await expect(skuHeader).toBeVisible();

    const skuColumnIndex = await skuHeader.evaluate(
        (header) => (header as HTMLTableCellElement).cellIndex
    );

    // cellIndex is zero based while CSS nth-child() is one based
    const firstSku = page
        .locator(
            `tbody tr[data-row-id] td:nth-child(${skuColumnIndex + 1})`
        )
        .first();

    await expect(firstSku).toBeVisible();

    // Capture an existing SKU so the search does not depend on fixed test data
    const skuValue = await firstSku.textContent();

    if (!skuValue) {
        throw new Error('SKU value was not available');
    }

    await searchInput.fill(skuValue);

    // Confirm the exact Item used to build the search remains in the results
    const exactSkuMatch = page.getByRole('cell', {
        name: skuValue,
        exact: true,
    });

    await expect(exactSkuMatch).toBeVisible();

    const filteredRows = page.locator('tbody tr[data-row-id]');

    // Because search is global to the table, every returned row should contain
    // the search value somewhere in its displayed data
    await expect.poll(async () => {
        const filteredRowText = await filteredRows.allTextContents();

        return (
            filteredRowText.length > 0 &&
            filteredRowText.every((rowText) =>
                rowText.toLowerCase().includes(skuValue.toLowerCase())
            )
        );
    }).toBe(true);
});