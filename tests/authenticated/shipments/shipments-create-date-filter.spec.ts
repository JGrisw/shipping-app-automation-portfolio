import { test, expect } from '@playwright/test';
import { ShipmentsPage } from '../../../pages/ShipmentsPage';

/*
 * What:
 * Verify the Create date filter limits Shipments by the selected date range
 *
 * Why:
 * Confirms date-based filtering updates the Shipments table without depending
 * on specific shipment records
 */

test("Create date filter filters Shipments by created-after-date", async ({ page }) => {
    const shipmentsPage = new ShipmentsPage(page);

    await shipmentsPage.goto();

    const createDateFilter = page.locator('[data-test="toolbar-create-date-filter"]');

    await createDateFilter.click();

    await expect(
        page.getByRole('textbox', { name: 'Created after' })
    ).toBeVisible();

    const createdAfter = page.getByRole('textbox', { name: 'Created after' });

    // Use a future date that should exclude all existing shipments
    await createdAfter.fill('12312099');

    await page.getByRole('button', { name: 'Apply' }).click();

    await expect(
        page.getByText('Showing 0 to 0 of 0 shipments', { exact: true })
    ).toBeVisible();
});