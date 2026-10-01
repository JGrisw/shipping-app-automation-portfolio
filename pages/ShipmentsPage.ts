import type { Locator, Page } from '@playwright/test';
import { DataTable } from './components/DataTable';

/*
 * What:
 * Encapsulate shared navigation for the Shipments page
 *
 * Why:
 * Keeping repeated page knowledge in one place reduces duplication while
 * leaving each test responsible for its own behavior and assertions
 */

export class ShipmentsPage {

    readonly table: DataTable;
    readonly shipmentIds: Locator;

    constructor(private readonly page: Page) {
        this.table = new DataTable(page);

        this.shipmentIds = page.locator(
            'tbody tr[data-row-id] td:nth-child(2) span.shipments-cell__mono'
        );
    }

        // Open Shipments directly for tests that are not testing navigation itself
        async goto() {
            await this.page.goto('/app/orders/shipments');
        };

        async waitForRows() {
            await this.table.waitForRows();
        };
};