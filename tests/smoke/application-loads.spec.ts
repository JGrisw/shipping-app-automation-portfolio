import { test, expect } from '@playwright/test';

/*
* what: 
* Verify that the configured application environment can be reached
* 
* Why:
* this provides a fast baseline check that the URL, network connection
* and Playwright configuration work before feature tests are attempted
* (fast fail)
 */

test('application loads successfully', async ({ page }) =>
{
    // Navigate to the environment configured by the baseURL
    const response = await page.goto('/');

    // Confirm that navigation returned a successful HTTP response    
    expect(response?.ok()).toBeTruthy();

    // Confirm the expected landing-page navigation rendered
    await expect(
        page.getByRole('banner').getByRole('link', { name: 'Log in' })
    ).toBeVisible();

});