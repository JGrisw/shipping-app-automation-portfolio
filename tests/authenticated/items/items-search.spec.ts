import { test, expect } from '@playwright/test';
import { ItemsPage } from '../../../pages/ItemsPage';

/*
 * What:
 * Verify items search handles a query with no matching records
 *
 * Why:
 * A deterministic no result search tests filtering behavior without
 * depending on specific item data being present
 */

test('items search displays zero results for an unmatched query', async ({ page }) => {
    const itemsPage= new ItemsPage(page);

    await itemsPage.goto();

    await itemsPage.waitForRows();

    const searchInput = page
        .getByRole('main')
        .getByPlaceholder('search...');

    await searchInput.fill('__playwright_no_match__');

    await expect(
        page.getByText('Showing 0 to 0 of 0 items', { exact: true })
    ).toBeVisible();

    await expect(searchInput).toHaveValue('__playwright_no_match__');
});