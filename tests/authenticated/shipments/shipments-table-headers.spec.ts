import { test, expect } from '@playwright/test';
import { ShipmentsPage } from '../../../pages/ShipmentsPage';

/**
 * What:
 * Verify the Shipments table renders its core indentifying columns
 *
 * Why:
 * Structural assertions provide stable coverage of the table contract
 * without depending on shipment records that can change over time
 */

test('shipments table displays core columns', async ({ page }) => {

    const shipmentsPage = new ShipmentsPage(page);

    // Navigate directly because sidebar navigation is covered seperately
    await shipmentsPage.goto();

    // Verify stable table structure rather than dynamic shipment data
    await expect(
        page.getByText('Shipment ID', { exact: true })
    ).toBeVisible();

    await expect(
        page.getByText('Tracking', { exact: true })
    ).toBeVisible();

    await expect(
        page.getByText('Status', { exact: true })
    ).toBeVisible();
});