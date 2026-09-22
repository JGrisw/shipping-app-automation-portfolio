import { test, expect } from '@playwright/test';
import { ItemsPage } from '../../../pages/ItemsPage';

/*
 * What:
 * Verify Items search can find an existing item using a dynamically captured SKU.
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

    const skuHeader = page.getByRole('columnheader', {
        name: 'SKU Filter SKU',
        exact: true,
    });

    await expect(skuHeader).toBeVisible();

    const skuColumnIndex = await skuHeader.evaluate(
        (header) => (header as HTMLTableCellElement).cellIndex
    );

    const firstSku = page
        .locator(
            `tbody tr[data-row-id] td:nth-child(${skuColumnIndex + 1})`
        )
        .first();

    await expect(firstSku).toBeVisible();

    const skuValue = await firstSku.textContent();

    if (!skuValue) {
        throw new Error('SKU value was not available');
    }

    await searchInput.fill(skuValue);

    const exactSkuMatch = page.getByRole('cell', {
        name: skuValue,
        exact: true,
    });

    await expect(exactSkuMatch).toBeVisible();

    const filteredRows = page.locator('tbody tr[data-row-id]');

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