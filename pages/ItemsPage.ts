import type { Page } from '@playwright/test';

/*
 * What:
 * Encapsulate shared navigation for the Items page
 *
 * Why:
 * Keeping repeated page knowledge in one place reduces duplication
 * while leaving each test responsible for its own behavior and assertions
 */

export class ItemsPage {
    constructor(private readonly page: Page) {}

    async goto() {
        await this.page.goto('/app/items');
    };

    async waitForRows() {
        await this.page
            .locator('tbody tr[data-row-id]')
            .first()
            .waitFor({
                state: 'visible',
                timeout: 10000,
            });
    };
}