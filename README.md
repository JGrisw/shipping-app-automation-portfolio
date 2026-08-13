# Shipping App Automation Portfolio

[![Playwright Tests](https://github.com/JGrisw/shipping-app-automation-portfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/JGrisw/shipping-app-automation-portfolio/actions/workflows/playwright.yml)

A standalone Playwright and TypeScript automation suite demonstrating black-box testing of a real-world shipping application.

## What This Project Demonstrates

- Black-box end-to-end testing with Playwright
- TypeScript-based test automation
- Public and authenticated test contexts
- Reusable authenticated browser state
- Stable locator and assertion strategies
- Page-object refactoring where duplication justifies it
- Automated type-checking and browser tests in GitHub Actions

## Current Coverage

### Public / Logged-Out

- Application availability smoke check
- Navigation to the login page
- Required-field login validation
- Invalid credential rejection
- Successful login
- Protected-route redirect behavior

### Authenticated

- Dashboard access using reusable browser state
- Shipments navigation
- Shipments table structure
- Zero-result search behavior
- Shipment ID sorting and rendered row order
- Pagination behavior
- Shipment row expansion

## Running Locally

Install dependencies:

```bash
npm ci
npx playwright install chromium
cp .env.example .env
npm run typecheck
npm test
```

## Continuous Integration

GitHub Actions runs the test suite automatically on pushes and pull requests to `main`.

The CI pipeline:

- Installs dependencies with `npm ci`
- Runs TypeScript validation with `npm run typecheck`
- Installs Chromium and required system dependencies
- Runs the Playwright suite with one worker for stable CI execution
- Uses GitHub repository secrets for the target URL and test credentials
