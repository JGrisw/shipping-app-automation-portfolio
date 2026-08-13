import type { Page } from '@playwright/test';

/*
 * What:
 * Encapsulate shared navigation for the Shipments page
 *
 * Why:
 * Keeping repeated page knowledge in one place reduces duplication while
 * leaving each test responsible for its own behavior and assertions
 */

export class ShipmentsPage {
    constructor(private readonly page: Page) {}

        // Open Shipments directly for tests that are not testing navigation itself
        async goto() {
            await this.page.goto('/app/orders/shipments');
        }
}