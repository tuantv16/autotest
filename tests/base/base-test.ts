/**
 * Base Test Class
 * Common setup and utilities for all tests
 */

import { test as base, expect } from "@playwright/test";
import { IndexedDBHelper } from "../utils/indexeddb-helper";
import { CommonHelper } from "../utils/common-helper";
import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables
dotenv.config({ path: path.join(__dirname, "../../.env.test") });

export interface TestFixtures {
  indexedDBHelper: IndexedDBHelper;
  commonHelper: typeof CommonHelper;
  baseUrl: string;
}

/**
 * Extended test with custom fixtures
 */
export const test = base.extend<TestFixtures>({
  // Page fixture with automatic cipher setup
  page: async ({ page }, use) => {
    // Set cipher in localStorage before any page navigation
    const defaultCipher = process.env.DEFAULT_CIPHER || "LOCAL_DEV_DUMMY_KEY";
    await page.addInitScript((cipher) => {
      localStorage.setItem("cipher", cipher);
      console.log("[PAGE] Cipher preset in localStorage:", cipher);
    }, defaultCipher);

    await use(page);
  },

  // IndexedDB Helper fixture
  indexedDBHelper: async ({ page }, use) => {
    const helper = new IndexedDBHelper(page);
    await use(helper);
    // Cleanup after test
    await helper.clearDB().catch(() => {});
  },

  // Common Helper fixture
  commonHelper: async ({}, use) => {
    await use(CommonHelper);
  },

  // Base URL fixture
  baseUrl: async ({}, use) => {
    const url = process.env.BASE_URL || "http://localhost:5173";
    await use(url);
  },
});

export { expect };

/**
 * Base Test Data Interface
 */
export interface BaseTestData {
  sessionData: {
    key: string;
    value: any;
  };
  commonData: {
    id: string;
    value: any;
  };
}

/**
 * Helper to load test data from fixtures with shared data support
 * @param fileName - Name of the test data file (e.g., 'TY205/wty20501' or 'wty20501')
 * @param screenCode - Screen code (e.g., 'wty20501')
 * @param caseCode - Test case code (e.g., 'TC_01')
 */
export function loadTestData(
  fileName: string,
  screenCode: string,
  caseCode: string,
): any {
  const allData = CommonHelper.loadTestData(fileName);
  const testData = allData[screenCode]?.[caseCode];

  if (!testData) {
    return testData;
  }

  // Check if test data uses shared references
  if (testData._useShared) {
    // Try to load shared data file
    try {
      const sharedFileName = fileName.endsWith(".json")
        ? fileName.replace(".json", "-shared")
        : fileName + "-shared";
      const { SHARED_DATA } = require(`../fixtures/${sharedFileName}`);

      // Clone the test data to avoid mutating original
      const result = JSON.parse(JSON.stringify(testData));

      // Process commonData to expand shared references
      if (result.commonData && Array.isArray(result.commonData)) {
        result.commonData = result.commonData.map((item: any) => {
          if (item._ref) {
            // Replace with shared data
            return {
              id: item.id,
              value: SHARED_DATA[item._ref],
            };
          }
          return item;
        });
      }

      // Remove _useShared flag from result
      delete result._useShared;

      return result;
    } catch (error) {
      console.warn(`Failed to load shared data for ${fileName}:`, error);
      return testData;
    }
  }

  return testData;
}
