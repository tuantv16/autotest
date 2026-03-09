/**
 * Base Test Class
 * Common setup and utilities for all tests
 */

import { test as base, expect } from '@playwright/test';
import { IndexedDBHelper } from '../utils/indexeddb-helper';
import { CommonHelper } from '../utils/common-helper';
import { snapExpect as snapExpectImpl, snapInput as snapInputImpl } from '../utils/screenshot-helper';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env.test') });

export interface TestFixtures {
  indexedDBHelper: IndexedDBHelper;
  commonHelper: typeof CommonHelper;
  baseUrl: string;
  snapInput: (index?: string | number) => Promise<string>;
  snapExpect: (index?: string | number) => Promise<string>;
}

/**
 * Extended test with custom fixtures
 */
export const test = base.extend<TestFixtures>({
  // Page fixture with automatic cipher setup
  page: async ({ page }, use) => {
    // Set cipher in localStorage before any page navigation
    const defaultCipher = process.env.DEFAULT_CIPHER || 'LOCAL_DEV_DUMMY_KEY';
    await page.addInitScript((cipher) => {
      localStorage.setItem('cipher', cipher);
      console.log('[PAGE] Cipher preset in localStorage:', cipher);
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
    const url = process.env.BASE_URL || 'http://localhost:5173';
    await use(url);
  },

  snapInput: async ({ page }, use, testInfo) => {
    await use(async (index?: string | number) => snapInputImpl(page, testInfo, index));
  },

  snapExpect: async ({ page }, use, testInfo) => {
    await use(async (index?: string | number) => snapExpectImpl(page, testInfo, index));
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
 * Helper to load test data from Json fixture files
 * @param fileName - Name of the test data file .json(e.g., 'TY205/wty20501' or 'wty20501')
 * @param screenCode - Screen code (e.g., 'wty20501')
 * @param caseCode - Test case code (e.g., 'TC_01')
 */
export function loadTestData(fileName: string, screenCode: string, caseCode: string): any {
  const allData = CommonHelper.loadTestData(fileName);
  return allData[screenCode]?.[caseCode];
}

/**
 * Helper to load test data from TypeScript fixture files (supports dynamic env variables)
 * @param fileName - Name of the test data file .ts (e.g., 'TY205/wty20501' or 'wty20501')
 * @param screenCode - Screen code (e.g., 'wty20501')
 * @param caseCode - Test case code (e.g., 'TC_01')
 * @example
 * const testData = loadTestDataTS('TY201/wty20101', 'wty20101', 'TC_01');
 */
export function loadTestDataTS(fileName: string, screenCode: string, caseCode: string): any {
  const allData = CommonHelper.loadTestDataTS(fileName);
  return allData[screenCode]?.[caseCode];
}

