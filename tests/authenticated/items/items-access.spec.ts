import { test, expect } from '@playwright/test';
import { ItemsPage } from '../../../pages/ItemsPage';

/*
 * What:
 * Verifies an authenticated user can access the Items page
 *
 * Why:
 * Confirms the protected Items route and primary Items table
 * render for an authenticaed user
 */

test('authenticated user can directly access Items', async ({ page }) => {
    const itemsPage= new ItemsPage(page);
    
    await itemsPage.goto();

    await expect(
        page.getByText('ITEMS', { exact: true })
    ).toBeVisible();

    await expect(
        page.locator('thead').getByText('SKU', { exact: true })
    ).toBeVisible();
});