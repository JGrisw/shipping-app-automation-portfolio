import { test, expect } from '@playwright/test';

/*
 * What:
 * Verify that a user can navigate from the public landing page to login
 *
 * Why:
 * This tests a real user interaction and establishes the entry point for
 * future authentication coverage without submitting credentials
 */

test('user can navigate to the login page', async ({ page }) => {
    await page.goto('/');

    const loginLink = page
        .getByRole('banner')
        .getByRole('link', { name: 'Log in' });

    await loginLink.click();

    // Temporary pause used to identify a stable login-page assertion.
    await expect(page.getByPlaceholder('Email address')).toBeVisible();
});