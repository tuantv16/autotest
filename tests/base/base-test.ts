/**
 * Base Test Class
 * Common setup and utilities for all tests
 *
 * FILE NÀY KHÔNG BIẾT DỰ ÁN NÀO LÀ DỰ ÁN NÀO. Không import seeder/page/const của một
 * dự án cụ thể, không hardcode cổng hay tên container. Tri thức riêng của từng dự án
 * nằm ở `tests/support/**` (extend từ file này) và `project.config.json`.
 *
 * Sửa file này chỉ được phép trong cửa sổ onboard (`advanced.baseLocked = false`) —
 * CLAUDE.md §1 Luật 3. Kiểm bằng: python core/cfg.py --guard <đường dẫn>
 */

import { test as base, expect } from '@playwright/test';
import { IndexedDBHelper } from '../utils/indexeddb-helper';
import { CommonHelper } from '../utils/common-helper';
import { snapExpect as snapExpectImpl, snapInput as snapInputImpl } from '../utils/screenshot-helper';
import { projectBaseUrl } from '../support/project-config';
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

  // Base URL fixture — lấy từ project.config.json của dự án ĐANG ACTIVE.
  // Trước đây mặc định là 'http://localhost:5173' (cổng của một dự án cũ): quên khai
  // BASE_URL là test lặng lẽ chọc vào app khác và fail với lý do vô nghĩa.
  // projectBaseUrl() ưu tiên biến môi trường khai ở advanced.baseUrlEnvVar, rồi mới
  // tới khóa baseUrl. BASE_URL vẫn được tôn trọng để không phá thói quen cũ.
  baseUrl: async ({}, use) => {
    const url = process.env.BASE_URL || projectBaseUrl();
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
 * @param fileName - Name of the test data file .json(e.g., '<MODULE>/<screen>' or '<screen>')
 * @param screenCode - Screen code (e.g., '<screen>')
 * @param caseCode - Test case code (e.g., 'TC_01')
 */
export function loadTestData(fileName: string, screenCode: string, caseCode: string): any {
  const allData = CommonHelper.loadTestData(fileName);
  return allData[screenCode]?.[caseCode];
}

/**
 * Helper to load test data from TypeScript fixture files (supports dynamic env variables)
 * @param fileName - Name of the test data file .ts (e.g., '<MODULE>/<screen>' or '<screen>')
 * @param screenCode - Screen code (e.g., '<screen>')
 * @param caseCode - Test case code (e.g., 'TC_01')
 * @example
 * const testData = loadTestDataTS('<MODULE>/<screen>', '<screen>', 'TC_01');
 */
export function loadTestDataTS(fileName: string, screenCode: string, caseCode: string): any {
  const allData = CommonHelper.loadTestDataTS(fileName);
  return allData[screenCode]?.[caseCode];
}

