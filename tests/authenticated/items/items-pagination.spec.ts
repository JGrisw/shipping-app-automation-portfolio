import { test, expect } from '@playwright/test';
import { ItemsPage } from '../../../pages/ItemsPage';

/*
 * What:
 * Verify moving to the next Items page changes the visible result range.
 *
 * Why:
 * Confirms pagination updates the displayed data without depending
 * on fixed item records or a fixed total count.
 */

test('items pagination loads the next result set', async ({ page }) => {
    const itemsPage = new ItemsPage(page);

    await itemsPage.goto();
    await itemsPage.waitForRows();

    // Dismiss the persistent page tip so it does not block pagination controls.
    const toolTipCancel = page.getByRole('button', {
        name: 'Close page tip',
    });

    await toolTipCancel.click();

    const nextPageButton = page.getByRole('button', {
        name: 'Next page',
    });

    const previousPageButton = page.getByRole('button', {
        name: 'Previous page',
    });

    // Capture the current total dynamically.
    const itemCountSummary = page.getByText(
        /Showing \d+ to \d+ of \d+ items/
    );

    await expect(itemCountSummary).toBeVisible();

    const itemCountText = await itemCountSummary.textContent();
    const totalMatch = itemCountText?.match(/of (\d+) items/);

    if (!totalMatch) {
        throw new Error('Total item count was not available');
    }

    const totalItems = Number(totalMatch[1]);

    if (totalItems <= 5) {
        throw new Error('Not enough items available to test pagination');
    }

    // Force pagination by reducing the page size to five rows.
    const rowsPerPageButton = page
        .getByText('arrow_drop_down')
        .nth(3);

    await rowsPerPageButton.click();

    const fiveRowsPerPageAction = page.getByRole('option', {
        name: '5',
        exact: true,
    });

    await fiveRowsPerPageAction.click();

    await expect(previousPageButton).toBeDisabled();
    await expect(nextPageButton).toBeEnabled();

    await expect(
        page.getByText(`Showing 1 to 5 of ${totalItems} items`)
    ).toBeVisible();

    // Move forward and verify the displayed result range changed.
    await nextPageButton.click();

    const secondPageEnd = Math.min(10, totalItems);

    await expect(
        page.getByText(
            `Showing 6 to ${secondPageEnd} of ${totalItems} items`
        )
    ).toBeVisible();

    await expect(previousPageButton).toBeEnabled();

    // Return to the first page and verify the original range is restored.
    await previousPageButton.click();

    await expect(
        page.getByText(`Showing 1 to 5 of ${totalItems} items`)
    ).toBeVisible();
});