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

    test('WTY10301_56 - Transition to 商品基本照会', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_56');
      console.log('[TEST] Running TC56 - Transition to 商品基本照会 successfully');
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
      // Debug injected data for verification
      await indexedDBHelper.debugCipherAndData();
      // Step 3: Navigate to target URL
      console.log('[TEST] Navigating to WTY10301ProductPriceInformation...');
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 4: Wait for form to be ready
      await productPricePage.waitForFormReady();
      // Step 5: Click menu button
      console.log('[TEST] clicking menu button...');
      await productPricePage.clickMenuButton();
      // Step 7: Check button
      console.log('[TEST] Check button...');
      // Click exact menu item by accessible role/name
      await productPricePage.clickItemMenuByText('商品基本');
      await page.waitForTimeout(500);
      await expect(page).toHaveURL(/WTY101ProductBasicInquiry/);
      console.log('[TEST] ✅ Transition to 商品基本照会 successfully');
    });

    test('WTY10301_57 - Transition to 店別在庫照会', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_56');
      console.log('[TEST] Running TC57 - Transition to 店別在庫照会 successfully');
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
      // Debug injected data for verification
      await indexedDBHelper.debugCipherAndData();
      // Step 3: Navigate to target URL
      console.log('[TEST] Navigating to WTY10301ProductPriceInformation...');
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 4: Wait for form to be ready
      await productPricePage.waitForFormReady();
      // Step 5: Click menu button
      console.log('[TEST] clicking menu button...');
      await productPricePage.clickMenuButton();
      // Step 7: Check button
      console.log('[TEST] Check button...');
      // Click exact menu item by accessible role/name
      await productPricePage.clickItemMenuByText('店別在庫');
      await page.waitForTimeout(500);
      await expect(page).toHaveURL(/WTY10401StoreInventoryInquiry/);
      console.log('[TEST] ✅ Transition to 店別在庫照会 successfully');
    });

    test('WTY10301_58 - Transition to オーダー商品在庫照会', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_56');
      console.log('[TEST] Running 58 - Transition to オーダー商品在庫照会 successfully');
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
      // Debug injected data for verification
      await indexedDBHelper.debugCipherAndData();
      // Step 3: Navigate to target URL
      console.log('[TEST] Navigating to WTY10301ProductPriceInformation...');
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 4: Wait for form to be ready
      await productPricePage.waitForFormReady();

      await productPricePage.fillForm(testData.formData);

      await productPricePage.clickSearch();
      // Step 5: Click menu button
      console.log('[TEST] clicking menu button...');
      await productPricePage.clickMenuButton();
      // Step 7: Check button
      console.log('[TEST] Check button...');
      // Click exact menu item by accessible role/name
      await productPricePage.clickItemMenuByText('オーダー');
      await page.waitForTimeout(500);
      await expect(page).toHaveURL(/WTY10701InquiryOfOrderedProductInventory/);
      console.log('[TEST] ✅ Transition to オーダー商品在庫照会 successfully');
    });

    test('WTY10301_59 - Transition to 商品入力', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_56');
      console.log('[TEST] Running 59 - Transition to 商品入力 successfully');
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
      // Debug injected data for verification
      await indexedDBHelper.debugCipherAndData();
      // Step 3: Navigate to target URL
      console.log('[TEST] Navigating to WTY10301ProductPriceInformation...');
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 4: Wait for form to be ready
      await productPricePage.waitForFormReady();

      await productPricePage.fillForm(testData.formData);

      await productPricePage.clickSearch();
      // Step 5: Click menu button
      console.log('[TEST] clicking menu button...');
      await productPricePage.clickMenuButton();
      // Step 7: Check button
      console.log('[TEST] Check button...');
      // Click exact menu item by accessible role/name
      await productPricePage.clickItemMenuByText('カート');
      await page.waitForTimeout(500);
      await expect(page).toHaveURL(/WTY20201/);
      console.log('[TEST] ✅ Transition to 商品入力 successfully');
    });

    test('WTY10301_60 - Transition to 部店検索', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_56');
      console.log('[TEST] Running 60 - Transition to 部店検索 successfully');
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
      // Debug injected data for verification
      await indexedDBHelper.debugCipherAndData();
      // Step 3: Navigate to target URL
      console.log('[TEST] Navigating to WTY10301ProductPriceInformation...');
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 4: Wait for form to be ready
      await productPricePage.waitForFormReady();

      await productPricePage.selectorsObj.btnCdInput.focus();
      await page.waitForTimeout(500);

      await productPricePage.clickSubMenuBtn('部店検索');

      await expect(page).toHaveURL(/WTZ10901/);
      console.log('[TEST] ✅ Transition to 部店検索 successfully');
    });

    test('WTY10301_61 - Transition to 型番検索', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_56');
      console.log('[TEST] Running 61 - Transition to 型番検索 successfully');
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
      // Debug injected data for verification
      await indexedDBHelper.debugCipherAndData();
      // Step 3: Navigate to target URL
      console.log('[TEST] Navigating to WTY10301ProductPriceInformation...');
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 4: Wait for form to be ready
      await productPricePage.waitForFormReady();

      await productPricePage.selectorsObj.shnCdInput.focus();
      await page.waitForTimeout(500);

      await productPricePage.clickSubMenuBtn('型番検索');

      await expect(page).toHaveURL(/WTZ10101ModelSearch/);
      console.log('[TEST] ✅ Transition to 型番検索 successfully');
    });
});