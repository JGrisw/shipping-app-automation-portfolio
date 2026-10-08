import type { Locator, Page } from '@playwright/test';
import { DataTable } from './components/DataTable';

/*
 * What:
 * Encapsulate Shipment specific navigation and table locators while exposing
 * shared table behavior through DataTable
 *
 * Why:
 * Keeping repeated page knowledge in one place while leaving test behavior and
 * assertions inside the individual Shipments specs
 */

export class ShipmentsPage {

    readonly table: DataTable;
    readonly shipmentIds: Locator;

    constructor(private readonly page: Page) {
        this.table = new DataTable(page);

        // Keep Shipments specific column knowledge here instead of in the shared DataTable
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