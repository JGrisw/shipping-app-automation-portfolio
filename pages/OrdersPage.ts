import type { Page } from '@playwright/test';

/*
 * What:
 * Encapsulate shared navigation for the Orders page
 *
 * Why:
 * Keeping repeated page knowledge in one place reduces duplication
 * while leaving each test responsible for its own behavior and assertions
 */

export class OrdersPage {
    constructor(private readonly page: Page) {}

    // Open Orders directly for tests that are not testing navigation
    async goto() {
        await this.page.goto('/app/orders');
    }
}