/**
 * WTY10301 Summary Input Test Suite
 * Tests for 商品価格照会 screen using Page Object Model
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { TY103Page } from '../../../pages/TY103/wty10301.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';
import { COMMON_MESSAGES } from '../../../constants/messages';

test.describe('WTY10301 - Product price inquiry (商品価格照会)', () => {
  let productPricePage: TY103Page;
    test.beforeEach(async ({ page, baseUrl }) => {
    productPricePage = new TY103Page(page);
  }
    );
    test.afterEach(async ({ page }, testInfo) => {
    await takeScreenshotOnFailure(page, testInfo);
  }
    );

    test('WTY10301_17 - validate required 基準日', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_17');
      console.log('[TEST] Running 17 - validate required 基準日 successfully');
      // Step 1: Go to base URL and wait for it to load
      console.log('[TEST] Loading base page...');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      // Step 2: Inject IndexedDB data AFTER page loaded
      console.log('[TEST] Injecting IndexedDB data...');
      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });
      // Step 3: Navigate to target URL
      console.log('[TEST] Navigating to WTY10301ProductPriceInformation...');
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 4: Wait for form to be ready
      await productPricePage.waitForFormReady();
      // Step 5: Fill form
      console.log('[TEST] Filling form...');
      await productPricePage.fillForm(testData.formData);
      // Step 6: Search
      console.log('[TEST] Searching product price...');
      await productPricePage.clickSearch();
      // Step 7: Verify search results
      console.log('[TEST] Verifying search results...');
      const resultFound = await productPricePage.waitForTextInBody('必須入力項目です。', 10000);
      expect(resultFound).toBe(true);
      console.log('[TEST] ✅ 基準日 required validation message is displayed');
    });

    test('WTY10301_18 - validate isNumeric 基準日', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_18');
      console.log('[TEST] Running 18 - validate isNumeric 基準日 successfully');
      // Step 1: Go to base URL and wait for it to load
      console.log('[TEST] Loading base page...');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      // Step 2: Inject IndexedDB data AFTER page loaded
      console.log('[TEST] Injecting IndexedDB data...');
      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });
      // Step 3: Navigate to target URL
      console.log('[TEST] Navigating to WTY10301ProductPriceInformation...');
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 4: Wait for form to be ready
      await productPricePage.waitForFormReady();
      // Step 5: Fill form
      console.log('[TEST] Filling form...');
      await productPricePage.fillForm(testData.formData);
      // Step 6: Search
      console.log('[TEST] Searching product price...');
      await productPricePage.clickSearch();
      // Step 7: Verify search results
      console.log('[TEST] Verifying search results...');
      const resultFound = await productPricePage.waitForTextInBody('数値で入力してください。', 10000);
      expect(resultFound).toBe(true);
      console.log('[TEST] ✅ validate isNumeric 基準日 successfully');
    });

    test('WTY10301_19 - validate length 基準日', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_19');
      console.log('[TEST] Running 19 - validate length 基準日 successfully');
      // Step 1: Go to base URL and wait for it to load
      console.log('[TEST] Loading base page...');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      // Step 2: Inject IndexedDB data AFTER page loaded
      console.log('[TEST] Injecting IndexedDB data...');
      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });
      // Step 3: Navigate to target URL
      console.log('[TEST] Navigating to WTY10301ProductPriceInformation...');
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 4: Wait for form to be ready
      await productPricePage.waitForFormReady();
      // Step 5: Fill form
      console.log('[TEST] Filling form...');
      await productPricePage.fillForm(testData.formData);
      // Step 6: Search
      console.log('[TEST] Searching product price...');
      await productPricePage.clickSearch();
      // Step 7: Verify search results
      console.log('[TEST] Verifying search results...');
      const resultFound = await productPricePage.waitForTextInBody('日付を入力してください。', 10000);
      expect(resultFound).toBe(true);
      console.log('[TEST] ✅ 基準日 length validation message is displayed');
    });

    test('WTY10301_20 - validate min max 基準日', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_20');
      console.log('[TEST] Running 20 - validate min max 基準日 successfully');
      // Step 1: Go to base URL and wait for it to load
      console.log('[TEST] Loading base page...');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      // Step 2: Inject IndexedDB data AFTER page loaded
      console.log('[TEST] Injecting IndexedDB data...');
      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });
      // Step 3: Navigate to target URL
      console.log('[TEST] Navigating to WTY10301ProductPriceInformation...');
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 4: Wait for form to be ready
      await productPricePage.waitForFormReady();
      // Step 5: Fill form
      console.log('[TEST] Filling form...');
      await productPricePage.fillForm(testData.formData);
      // Step 6: Search
      console.log('[TEST] Searching product price...');
      await productPricePage.clickSearch();
      // Step 7: Verify search results
      console.log('[TEST] Verifying search results...');
      const resultFound = await productPricePage.waitForTextInBody('日付を入力してください。', 10000);
      expect(resultFound).toBe(true);
      console.log('[TEST] ✅ 基準日 min max validation message is displayed');
    });

    test('WTY10301_21 - validate pass baseDate', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_21');
      console.log('[TEST] Running 21 - validate pass baseDate successfully');
      // Step 1: Go to base URL and wait for it to load
      console.log('[TEST] Loading base page...');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      // Step 2: Inject IndexedDB data AFTER page loaded
      console.log('[TEST] Injecting IndexedDB data...');
      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });
      // Step 3: Navigate to target URL
      console.log('[TEST] Navigating to WTY10301ProductPriceInformation...');
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 4: Wait for form to be ready
      await productPricePage.waitForFormReady();
      // Step 5: Fill form
      console.log('[TEST] Filling form...');
      await productPricePage.fillForm(testData.formData);
      await page.waitForTimeout(500);
      // Step 6: Search
      console.log('[TEST] Searching product price...');
      await productPricePage.clickSearch();
      await page.waitForTimeout(1000);
      // Step 7: Verify search results
      console.log('[TEST] Verifying search results...');
      const resultFound = await productPricePage.waitForTextInBody('基準日は11/30～07/1の日付を入力してください。', 10000);
      expect(resultFound).toBe(true);
      console.log('[TEST] ✅ validate pass baseDate successfully');
    });

    test('WTY10301_22 - validate required 部店', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_22');
      console.log('[TEST] Running 22 - validate required 部店 successfully');
      // Step 1: Go to base URL and wait for it to load
      console.log('[TEST] Loading base page...');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      // Step 2: Inject IndexedDB data AFTER page loaded
      console.log('[TEST] Injecting IndexedDB data...');
      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });
      // Step 3: Navigate to target URL
      console.log('[TEST] Navigating to WTY10301ProductPriceInformation...');
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 4: Wait for form to be ready
      await productPricePage.waitForFormReady();
      // Step 5: Fill form
      console.log('[TEST] Filling form...');
      await productPricePage.fillForm(testData.formData);
      await page.waitForTimeout(500);
      // Step 6: Search
      console.log('[TEST] Searching product price...');
      await productPricePage.clickSearch();
      await page.waitForTimeout(1000);
      // Step 7: Verify search results
      console.log('[TEST] Verifying search results...');
      const resultFound = await productPricePage.waitForTextInBody('必須入力項目です。', 10000);
      expect(resultFound).toBe(true);
      console.log('[TEST] ✅ validate required 部店 successfully');
    });

    test('WTY10301_23 - validate isnumeric 部店', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_23');
      console.log('[TEST] Running 23 - validate isnumeric 部店 successfully');
      // Step 1: Go to base URL and wait for it to load
      console.log('[TEST] Loading base page...');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      // Step 2: Inject IndexedDB data AFTER page loaded
      console.log('[TEST] Injecting IndexedDB data...');
      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });
      // Step 3: Navigate to target URL
      console.log('[TEST] Navigating to WTY10301ProductPriceInformation...');
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 4: Wait for form to be ready
      await productPricePage.waitForFormReady();
      // Step 5: Fill form
      console.log('[TEST] Filling form...');
      await productPricePage.fillForm(testData.formData);
      // Step 6: Search
      console.log('[TEST] Searching product price...');
      await productPricePage.clickSearch();
      // Step 7: Verify search results
      console.log('[TEST] Verifying search results...');
      const resultFound = await productPricePage.waitForTextInBody('数値で入力してください。', 10000);
      expect(resultFound).toBe(true);
      console.log('[TEST] ✅ 部店 isnumeric validation message is displayed');
    });

    test('WTY10301_24 - validate length 部店', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_24');
      console.log('[TEST] Running 24 - validate length 部店 successfully');
      // Step 1: Go to base URL and wait for it to load
      console.log('[TEST] Loading base page...');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      // Step 2: Inject IndexedDB data AFTER page loaded
      console.log('[TEST] Injecting IndexedDB data...');
      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });
      // Step 3: Navigate to target URL
      console.log('[TEST] Navigating to WTY10301ProductPriceInformation...');
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 4: Wait for form to be ready
      await productPricePage.waitForFormReady();
      // Step 5: Fill form
      console.log('[TEST] Filling form...');
      await productPricePage.fillForm(testData.formData);
      // Step 6: Search
      console.log('[TEST] Searching product price...');
      await productPricePage.clickSearch();
      // Step 7: Verify search results
      console.log('[TEST] Verifying search results...');
      const resultFound = await productPricePage.waitForTextInBody('部店コードが誤っています。', 10000);
      expect(resultFound).toBe(true);
      console.log('[TEST] ✅ 部店 length validation message is displayed');
    });

    test('WTY10301_25 - validate required 商品', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_25');
      console.log('[TEST] Running 25 - validate required 商品 successfully');
      // Step 1: Go to base URL and wait for it to load
      console.log('[TEST] Loading base page...');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      // Step 2: Inject IndexedDB data AFTER page loaded
      console.log('[TEST] Injecting IndexedDB data...');
      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });
      // Step 3: Navigate to target URL
      console.log('[TEST] Navigating to WTY10301ProductPriceInformation...');
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 4: Wait for form to be ready
      await productPricePage.waitForFormReady();
      // Step 5: Fill form
      console.log('[TEST] Filling form...');
      await productPricePage.fillForm(testData.formData);
      // Step 6: Search
      console.log('[TEST] Searching product price...');
      await productPricePage.clickSearch();
      // Step 7: Verify search results
      console.log('[TEST] Verifying search results...');
      const resultFound = await productPricePage.waitForTextInBody('必須入力項目です。', 10000);
      expect(resultFound).toBe(true);
      console.log('[TEST] ✅ validate required 商品 successfully');
    });

    test('WTY10301_26 - validate width 商品', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_26');
      console.log('[TEST] Running 26 - validate width 商品 successfully');
      // Step 1: Go to base URL and wait for it to load
      console.log('[TEST] Loading base page...');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      // Step 2: Inject IndexedDB data AFTER page loaded
      console.log('[TEST] Injecting IndexedDB data...');
      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });
      // Step 3: Navigate to target URL
      console.log('[TEST] Navigating to WTY10301ProductPriceInformation...');
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 4: Wait for form to be ready
      await productPricePage.waitForFormReady();
      // Step 5: Fill form
      console.log('[TEST] Filling form...');
      await productPricePage.fillForm(testData.formData);
      // Step 6: Search
      console.log('[TEST] Searching product price...');
      await productPricePage.clickSearch();
      // Step 7: Verify search results
      console.log('[TEST] Verifying search results...');
      const resultFound = await productPricePage.waitForTextInBody('半角で入力してください。', 10000);
      expect(resultFound).toBe(true);
      console.log('[TEST] ✅ validate width 商品 successfully');
    });

});