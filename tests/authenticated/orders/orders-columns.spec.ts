import { test, expect } from '@playwright/test';
import { OrdersPage } from '../../../pages/OrdersPage';

/*
 * What:
 * Verify the Orders Columns control can hide and restore a visible table column
 *
 * Why:
 * Confirms users can customize which order data is displayed while ensuring
 * the test restores the original column state for later tests
 */

test('Orders Columns control can change visible table columns', async ({ page }) => {

    const ordersPage = new OrdersPage(page);

    await ordersPage.goto();

    const durationColumn = page.getByRole('columnheader', { name: 'Duration Add filter for' });

    // Establish that Duration is visible before changing the column configuration
    await expect(durationColumn).toBeVisible();

    const columnsButton = page.locator('[data-test="toolbar-manage-columns"]');

    await expect(columnsButton).toBeVisible();

    await columnsButton.click();

    const columnsModalHeader = page.getByText('Arrange Columns');

    await expect(columnsModalHeader).toBeVisible();

    const columnsDialog = page.getByRole('dialog');

    // Scope the toggle to the Duration item rather than relying on button order
    const durationItem = columnsDialog
        .locator('.columns-manager-dialog__item')
        .filter({ hasText: 'Duration' });

    const durationToggle = durationItem.getByRole('button');

    await expect(durationToggle).toBeVisible();

    await durationToggle.click();

    await page.getByRole('button', { name: 'Done' }).click();

    // Confirm the column configuration was applied to the table
    await expect(durationColumn).not.toBeVisible()

    // Restore Duration so this test does not change the starting state of later tests
    await columnsButton.click();

    await expect(columnsModalHeader).toBeVisible();

    await durationToggle.click();

    await page.getByRole('button', { name: 'Done' }).click();

    await expect(durationColumn).toBeVisible()

});