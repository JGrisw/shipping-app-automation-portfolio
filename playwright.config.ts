import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

/*
 * What:
 * Load environment configuration and define how the Playwright suite runs.
 *
 * Why:
 * Centralizing environment, browser, and authentication settings keeps tests
 * portable while separating logged-out and authenticated test contexts.
 */

dotenv.config();

export default defineConfig({
  // Keep test discovery predictable and separate from framework configuration.
  testDir: './tests',

  use: {
    // Allows relative navigation such as page.goto('/login').
    baseURL: process.env.APP_BASE_URL,

    // Capture diagnostics only when a test needs to retry.
    trace: 'on-first-retry',
  },

  projects: [
    {
      // Creates reusable authenticated browser state.
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },

    {
      // Public tests intentionally start without authentication.
      name: 'chromium-public',
      testMatch: [
        /.*smoke\/.*\.spec\.ts/,
        /.*auth\/.*\.spec\.ts/,
      ],

      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      // Protected-page tests start with the saved authenticated state.
      name: 'chromium-authenticated',
      testMatch: /.*authenticated\/.*\.spec\.ts/,

      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },

      dependencies: ['setup'],
    },
  ],
});