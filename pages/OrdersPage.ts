import type { Locator, Page } from '@playwright/test';
import { DataTable } from './components/DataTable';

/*
 * What:
 * Encapsulate Orders specific navigation and table locators while exposing
 * shared table behavior through DataTable
 *
 * Why:
 * Keeps repeated UI knowledge in one place while leaving test behavior and
 * assertions inside the individual Orders specs
 */

export class OrdersPage {

    readonly table: DataTable;
    readonly orderIds: Locator;

    constructor(private readonly page: Page) {
        this.table = new DataTable(page);

        // Keep Orders specific column knowledge here instead of in the shared DataTable
        this.orderIds = page.locator(
            'tbody tr[data-row-id] td:nth-child(4)'
        );
    }

    // Open Orders directly for tests that are not testing navigation itself
    async goto() {
        await this.page.goto('/app/orders');
    };

    async waitForRows() {
        await this.table.waitForRows();
    };
}