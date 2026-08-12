import { test, expect } from '@playwright/test';

/*
 * What:
 * Verify unauthenticated users cannot access a protected route
 *
 * Why:
 * Understanding the actual access-control behavior lets us assert the
 * security boundary without assuming how redirects are implemented
 */

test('logged out user cannot directly access the app', async ({ page }) => {
    await page.goto('/app');

    // Confirm unauthenticated access is redirected to the login experience
    await expect(
        page.getByPlaceholder('Email address')
    ).toBeVisible();
});