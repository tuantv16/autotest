# Playwright + TypeScript E2E Test Framework 
 
# Running Tests
Run all tests (headless – default)
npm test
npm run test:headed
npm test -- tests/modules/TY205
npm test -- tests/modules/TY205/WTY20501
npm test -- tests/modules/TY205/WTY20501/wty20501-insert.spec.ts
npm test -- tests/modules/TY205/WTY20501/wty20501-insert.spec.ts -g "TC01"
npx playwright test tests/modules/TY205/WTY20501 --debug

npm run test:report

# Test Folder Structure
tests/
├── base/
│   └── base-test.ts
│       # Base test configuration & common hooks
│
├── fixtures/
│   └── TY205/
│       └── wty20501.json
│           # Test data (fixtures) for SCREEN_GROUP_ID = TY205
│
├── modules/
│   └── TY205/
│       └── WTY20501/
│           └── wty20501-insert.spec.ts
│               # Test cases for screen WTY20501 (Insert flow)
│
├── pages/
│   ├── base.page.ts
│   │   # Base Page Object (common UI actions)
│   │
│   └── TY205/
│       └── wty20501.page.ts
│           # Page Object for screen WTY20501
│
└── utils/
    ├── common-helper.ts
    │   # Common helper functions
    └── indexeddb-helper.ts
        # IndexedDB setup & encrypted data handling
