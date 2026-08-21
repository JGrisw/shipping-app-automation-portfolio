import { test, expect } from '@playwright/test';
import { ShipmentsPage } from '../../../pages/ShipmentsPage';

/*
 * What:
 * Verify the Shipments sort control can change the table from newest to oldest
 * into oldest to newest order
 *
 * Why:
 * Confirms the top level sort control changes the ordering of shipments results
 * not just the selected sort label
 */

test('Sort control orders Shipments from oldest to newest', async ({ page }) => {
    const shipmentsPage = new ShipmentsPage(page);

    await shipmentsPage.goto();

    const createDateHeader = page.getByRole('columnheader', {
        name: 'Create Date Filter Create Date',
    });

    const createDateColumnIndex = await createDateHeader.evaluate(
        (header) => (header as HTMLTableCellElement).cellIndex
    );

    const createDateCells = page.locator(
        `tbody tr[data-row-id] td:nth-child(${createDateColumnIndex + 1})`
    );

    await expect(createDateCells.first()).toBeVisible();

    await page
        .getByRole('button', { name: 'Expand "Sort: Newest to' })
        .click();

    await page.getByText('Oldest to newest', { exact: true }).click();

    await expect.poll(async () => {
        const createDates = await createDateCells.allTextContents();

        const timestamps = createDates.map((date) => new Date(date).getTime());

        return timestamps.every(
            (timestamp, index) =>
                index === 0 || timestamps[index - 1] <= timestamp
        );
    }).toBe(true);
});