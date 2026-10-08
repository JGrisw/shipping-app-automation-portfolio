import { test, expect } from '@playwright/test';
import { ItemsPage } from '../../../pages/ItemsPage';

/*
 * What:
 * Verify Items search handles a query with no matching records
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

    // Use a deliberately impossible value to keep the result deterministic
    await searchInput.fill('__playwright_no_match__');

    // Confirm the table reaches the expected zero result state
    await expect(
        page.getByText('Showing 0 to 0 of 0 items', { exact: true })
    ).toBeVisible();

    // Confirm the entered search value remains applied
    await expect(searchInput).toHaveValue('__playwright_no_match__');
});