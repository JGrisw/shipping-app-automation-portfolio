import type { Locator, Page } from '@playwright/test';
import { DataTable } from './components/DataTable';

/*
 * What:
 * Encapsulate shared navigation for the Orders page
 *
 * Why:
 * Keeping repeated page knowledge in one place reduces duplication
 * while leaving each test responsible for its own behavior and assertions
 */

export class OrdersPage {

    readonly table: DataTable;
    readonly orderIds: Locator;

    constructor(private readonly page: Page) {
        this.table = new DataTable(page);

        this.orderIds = page.locator(
            'tbody tr[data-row-id] td:nth-child(4)'
        );
    }

    // Open Orders directly for tests that are not testing navigation
    async goto() {
        await this.page.goto('/app/orders');
    };

    async waitForRows() {
        await this.table.waitForRows();
    };
}