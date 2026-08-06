import { defineConfig , devices} from '@playwright/test';
import dotenv from 'dotenv';

/*
*What:
* load the key/value pairs from our local .env file into process.env
* 
* WHY:
* Environment-specific values such as the application URL
* and login credentials should remain outside the test code
* this lets the same test suite run against different environments
* without changing tests or committing private information
*/

dotenv.config();

export default defineConfig
({

// Keep test discovery predictable and separate from framework configuration
    testDir: './tests',

    use: 
    {
// Allows relative navigation such as page.goto('/login')
        baseURL: process.env.APP_BASE_URL,
    
// Capture diagnostics only when a test needs to retry
        trace: 'on-first-retry',
    },

    projects:[
        {
//Start with one browser to keep the initial suite focused and fast           
            name: 'chromium',

// Reuse Playwright's standard desktop browser context
            use: 
            { 
                ...devices['Desktop Chrome'] 
            },
        },
    ],
});