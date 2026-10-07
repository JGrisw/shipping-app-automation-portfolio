import { test, expect } from '@playwright/test';

/*
 * What:
 * Verify that a user can navigate from the public landing page to login
 *
 * Why:
 * Tests a real user entry opint into authentication without submitting
 * credentials.
 */

test('user can navigate to the login page', async ({ page }) => {
    await page.goto('/');

    // Scope the login link to the public header to avoid matching unrelated links
    const loginLink = page
        .getByRole('banner')
        .getByRole('link', { name: 'Log in' });

    await loginLink.click();

    // Use the login form field as the stable signal that navigation completed
    await expect(page.getByPlaceholder('Email address')).toBeVisible();
});