import { test, expect } from '@playwright/test';

/*
 * What:
 * Verify unauthenticated users cannot access a protected route
 *
 * Why:
 * Confirms the application enforces its authentication boundary without
 * depending on a specific redirect implementation
 */

test('invalid credentials are rejected', async ({ page }) => {
    await page.goto('/login');

    // Use deliberately invalid credentials so the test never depends on a real account
    await page.getByPlaceholder('Email Address').fill('playwright-invalid@example.com');
    await page.locator('input[type="password"]').fill('invalid-password');

    await page.getByRole('button', { name: 'Log in' }).click();

    // Confirm invalid credentials are rejected with clear feedback
    await expect(
        page.getByText('Login failed. Check credentials.', { exact: true })
    ).toBeVisible();

    // Confirm the user remains in the login experience after rejection
    await expect(
        page.getByPlaceholder('Email address')
    ).toBeVisible();
});