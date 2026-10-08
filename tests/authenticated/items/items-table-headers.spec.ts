import { test, expect } from '@playwright/test';
import { ItemsPage } from '../../../pages/ItemsPage';

/**
 * What:
 * Verify the items table renders its core indentifying columns
 *
 * Why:
 * Structural assertions provide stable coverage of the table contract
 * without depending on Item records that can change over time
 */

test('items table displays core columns', async ({ page }) => {
    const itemsPage = new ItemsPage(page);

    await itemsPage.goto();

    // Verify stable table structure using always present column headers
    await expect(
        page.locator('thead').getByText('SKU', { exact: true })
    ).toBeVisible();

    await expect(
        page.locator('thead').getByText('Type')
    ).toBeVisible();

    await expect(
        page.locator('thead').getByText('HS Code')
    ).toBeVisible();
});