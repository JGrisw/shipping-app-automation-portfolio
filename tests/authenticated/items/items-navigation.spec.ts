import { test, expect } from '@playwright/test';

/*
 * What:
 * Verify an authenticated user can nvaigate to the Items page through the app UI
 *
 * Why:
 * Confirms the protected Items nabvigation path works independently of
 * direct-route acess and table behavior
 */

test('authenticated user can navigate to items', async ({ page }) => {
    await page.goto('/app');

    // Expand the Items menu so its submenu link becomes available
    await page.getByText('Items').first().click();

    // Use the rendered Items link to exercise the real sidebar navigation
    await page.locator('a[href="/app/items"]').click();

    // Confirm the Items page rendered after navigating through the UI
    await expect(
        page.getByRole('main').getByText('Items', { exact: true })
    ).toBeVisible();
});