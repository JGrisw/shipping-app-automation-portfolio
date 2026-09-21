import { test, expect } from '@playwright/test';
import { ItemsPage } from '../../../pages/ItemsPage';

/**
 * What:
 * verify the items table renders its core indentifying columns
 *
 * Why:
 * structural assertions provide stable coverage of the page contract
 * without depending on items records that can change over time
 */

test('items table displays core columns', async ({ page }) => {
    const itemsPage = new ItemsPage(page);

    await itemsPage.goto();

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