import { test, expect } from '@playwright/test';
import { ShipmentsPage } from '../../../pages/ShipmentsPage';

/*
 * What:
 * Verify shipments search handles a query with no matching records
 *
 * Why:
 * A deterministic no result search tests filtering behavior without
 * depending on specific shipment data being present
 */

test('shipments search displays zero results for an unmatched query', async ({ page }) => {

    const shipmentsPage = new ShipmentsPage(page);

    await shipmentsPage.goto();

    const searchInput = page
        .getByRole('main')
        .getByPlaceholder('Search...');

    // Use a deliberately impossible value to keep the result deterministic
    await searchInput.fill('__playwright_no_match__');

    await expect(
        page.getByText('Showing 0 to 0 of 0 shipments', { exact: true })
    ).toBeVisible();

    // Confirm the entered search value remains applied
    await expect(searchInput).toHaveValue('__playwright_no_match__');
});