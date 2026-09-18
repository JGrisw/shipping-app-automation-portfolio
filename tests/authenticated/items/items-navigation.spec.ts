import { test, expect } from '@playwright/test';

/*
 * What:
 * Explore navigation from the authenticated app to the items page
 *
 * Why:
 * This establistes the first protected workflow before we begin
 * asserting item data or table behavior
 */

test('authenticated user can navigate to items', async ({ page }) => {
    await page.goto('/app');

    await page.getByText('Items').first().click();

    await page.locator('a[href="/app/items"]').click();

    await expect(
        page.getByText('ITEMS', { exact: true })
    ).toBeVisible();
})