# Pet Care Clinic UI - Playwright Test Suite

This directory contains comprehensive end-to-end tests for the Pet Care Clinic UI application using Playwright.

## Test Structure

### Test Files Overview

- **`SymptomChecker.spec.ts`** - Tests for the Symptom Checker page functionality
- **`general-questions.spec.ts`** - Tests for the General Medical Questions page
- **`vets.spec.ts`** - Tests for the Vets page including data table and modal interactions
- **`pets.spec.ts`** - Tests for the Pets page including responsive design and search functionality
- **`navigation.spec.ts`** - Tests for navigation between all pages
- **`accessibility.spec.ts`** - Accessibility compliance tests
- **`full-app-integration.spec.ts`** - End-to-end integration tests covering complete user workflows

## What's Covered

### ✅ Navigation & Routing

- Navigation between all pages using the navigation bar
- Direct URL access to all routes
- Browser back/forward button functionality
- Home icon navigation

### ✅ Symptom Checker Page

- Form input and submission
- Multiline symptom input support
- Loading states
- Error handling
- Keyboard navigation
- Accessibility

### ✅ General Medical Questions Page

- Question input and submission
- Conversation history management
- Multiple question support
- Form clearing after submission
- Loading states and error handling

### ✅ Vets Page

- Data table display with correct columns and data
- Row selection with checkboxes
- Column sorting functionality
- Pagination controls
- Cell editing capabilities
- Modal opening/closing
- Keyboard navigation in data grid

### ✅ Pets Page

- Responsive design (desktop table vs mobile search)
- Data table functionality on desktop
- Search/autocomplete functionality on mobile
- Pet details display
- Add New Pet modal
- Proper viewport-based component switching

### ✅ Accessibility

- WCAG compliance testing
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Proper ARIA labels and roles
- Color contrast and visual indicators

### ✅ Integration & Cross-Browser

- Complete user workflows
- Error state handling
- Responsive behavior across all pages
- JavaScript error monitoring
- Cross-page state management

## Running the Tests

### Prerequisites

Make sure you have the development server running:

```bash
npm run dev
```

### Run All Tests

```bash
npm run test:e2e
# or
npx playwright test
```

### Run Specific Test Suites

```bash
# Navigation tests
npx playwright test navigation.spec.ts

# Symptom Checker tests
npx playwright test SymptomChecker.spec.ts

# General Questions tests
npx playwright test general-questions.spec.ts

# Vets page tests
npx playwright test vets.spec.ts

# Pets page tests
npx playwright test pets.spec.ts

# Accessibility tests
npx playwright test accessibility.spec.ts

# Integration tests
npx playwright test full-app-integration.spec.ts
```

### Run Tests in Different Browsers

```bash
# Run in Chrome
npx playwright test --project=chromium

# Run in Firefox
npx playwright test --project=firefox

# Run in Safari
npx playwright test --project=webkit
```

### Run Tests in Debug Mode

```bash
npx playwright test --debug
```

### Run Tests with UI Mode

```bash
npx playwright test --ui
```

## Test Configuration

The tests are configured in `playwright.config.ts` with:

- Base URL: `http://localhost:3000`
- Multiple browser support (Chrome, Firefox, Safari)
- Automatic dev server startup
- HTML reporting
- Trace on retry for debugging

## Test Data

The tests use the mock data that's loaded in the application, including:

### Vets Data

- Jon Snow (35 years old)
- Cersei Lannister (42 years old)
- Jaime Lannister (45 years old)
- Arya Stark (16 years old)
- Daenerys Targaryen (150 years old)

### Pets Data

- Sophie Snow (15 years old) - 123 Pine Lane, Frostville, WI 54321
- Chanel Lannister (6 years old) - 456 Golden Road, Westport, CA 90210
- Nico Lannister (3 years old) - 456 Golden Road, Westport, CA 90210
- Tilly Stark (6 years old) - 789 Winter Avenue, Northfield, MN 55057
- Cricket Targaryen (9 years old) - 321 Dragon Street, Firestone, NV 89123

## Responsive Testing

The tests include responsive design verification:

- **Desktop**: 1200x800 viewport (shows data tables)
- **Tablet**: 768x600 viewport
- **Mobile**: 400x600 viewport (shows search interface for pets)

## Best Practices Followed

1. **Page Object Pattern**: Tests use Playwright's built-in locator strategies
2. **Descriptive Test Names**: Each test clearly describes what it's testing
3. **Setup/Teardown**: Proper beforeEach hooks for consistent test state
4. **Waiting Strategies**: Appropriate waits for dynamic content
5. **Error Handling**: Tests verify both success and error scenarios
6. **Accessibility First**: Comprehensive accessibility testing
7. **Cross-Browser**: Tests run on multiple browsers
8. **Integration Testing**: End-to-end user journey coverage

## Debugging Failed Tests

1. **Check the HTML Report**: `npx playwright show-report`
2. **Run with Debug Mode**: `npx playwright test --debug [test-file]`
3. **Use Trace Viewer**: Available for failed tests in the report
4. **Check Screenshots**: Automatically captured on failure
5. **Verify Dev Server**: Ensure `npm run dev` is running on port 3000

## Adding New Tests

When adding new features, consider adding tests for:

1. Core functionality
2. Edge cases and error handling
3. Accessibility compliance
4. Responsive behavior
5. Keyboard navigation
6. Integration with existing features

Follow the existing test structure and naming conventions for consistency.
