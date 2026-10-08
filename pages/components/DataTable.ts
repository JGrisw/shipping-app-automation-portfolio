import type { Locator, Page } from '@playwright/test';

/*
 * What:
 * Encapsulate table controls shared across authenticated data table pages
 *
 * Why:
 * Centralizing repeating table locators and readiness logic reduces duplication
 * while keeping page specific behavior in each Page Object and test
 */

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
        // Allow additional time for API-backend table data to finish rendering
        await this.rows
            .first()
            .waitFor({
                state: 'visible',
                timeout: 10000,
            });
    }
}