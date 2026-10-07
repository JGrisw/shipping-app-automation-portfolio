import type { Locator, Page } from '@playwright/test';


export class DataTable {
    readonly nextPageButton: Locator; 
    readonly previousPageButton: Locator;
    readonly rows: Locator; 
    readonly searchInput: Locator;
    readonly actionsButton: Locator; 

    constructor( page: Page) {

        this.nextPageButton = page.getByRole('button', {
            name: 'Next page',
        });

        this.previousPageButton = page.getByRole('button', {
            name: 'Previous page',
        });

        this.rows = page.locator('tbody tr[data-row-id]');

        this.searchInput = page
            .getByRole('main')
            .getByPlaceholder('Search...');   
            
        this.actionsButton = page.locator('[data-test="actions-menu"]');
    }

    async waitForRows() {
        await this.rows
            .first()
            .waitFor({
                state: 'visible',
                timeout: 10000,
            });
    }
}