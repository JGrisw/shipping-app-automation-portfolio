import type { Page } from '@playwright/test';
import { DataTable } from './components/DataTable';


/*
 * What:
 * Encapsulate shared navigation for the Items page
 *
 * Why:
 * Keeping repeated page knowledge in one place reduces duplication
 * while leaving each test responsible for its own behavior and assertions
 */

export class ItemsPage {

    readonly table: DataTable;

    constructor(private readonly page: Page) {
        this.table = new DataTable(page);
    }

    async goto() {
        await this.page.goto('/app/items');
    };

    async waitForRows() {
        await this.table.waitForRows();
    }
}