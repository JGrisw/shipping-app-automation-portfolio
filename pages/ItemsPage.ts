import type { Page } from '@playwright/test';
import { DataTable } from './components/DataTable';


/*
 * What:
 * Encapsulate Items navigation while exposing shared table behavior
 * through DataTable
 *
 * Why:
 * Keeping repeated table interaction centralized while leaving Items specific
 * behavior and assertions inside the individual Items specs
 */

export class ItemsPage {

    readonly table: DataTable;

    constructor(private readonly page: Page) {
        this.table = new DataTable(page);
    }

    // Open Items directly for tests taht are not testing navigation itself
    async goto() {
        await this.page.goto('/app/items');
    };

    async waitForRows() {
        await this.table.waitForRows();
    }
}