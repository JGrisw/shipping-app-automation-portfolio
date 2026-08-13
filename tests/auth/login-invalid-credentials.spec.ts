import { test, expect } from '@playwright/test';

/*
 * What:
 * Verify invalid credentials are rejected with a clear authentication error
 *
 * Why:
 * Confirms failed login attempts do not grant access and provide useful
 * feedback without using a real account
 */

test('invalid credentials are rejected', async ({ page }) => {
    await page.goto('/login');

    await page.getByPlaceholder('Email Address').fill('playwright-invalid@example.com');
    await page.locator('input[type="password"]').fill('invalid-password');

    await page.getByRole('button', { name: 'Log in' }).click();

    // Confirm invalid credentials are rejected with clear feedback
    await expect(
        page.getByText('Login failed. Check credentials.', { exact: true })
    ).toBeVisible();

    // Confirm the user did not leave the login experience
    await expect(
        page.getByPlaceholder('Email address')
    ).toBeVisible();
});