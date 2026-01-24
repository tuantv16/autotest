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
      snapExpect,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_56');
      // Step 1: Go to base URL and wait for it to load
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      // Step 2: Inject IndexedDB data AFTER page loaded
      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });
      // Debug injected data for verification
      await indexedDBHelper.debugCipherAndData();
      // Step 3: Navigate to target URL
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 4: Wait for form to be ready
      await productPricePage.waitForFormReady();
      // Step 5: Click menu button
      await productPricePage.clickMenuButton();
      // Step 7: Check button
      // Click exact menu item by accessible role/name
      await productPricePage.clickItemMenuByText('商品基本');
      await page.waitForTimeout(500);
      await snapExpect();
      await expect(page).toHaveURL(/WTY101ProductBasicInquiry/);
    });

    test('WTY10301_57 - Transition to 店別在庫照会', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapExpect,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_56');
      // Step 1: Go to base URL and wait for it to load
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      // Step 2: Inject IndexedDB data AFTER page loaded
      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });
      // Debug injected data for verification
      await indexedDBHelper.debugCipherAndData();
      // Step 3: Navigate to target URL
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 4: Wait for form to be ready
      await productPricePage.waitForFormReady();
      // Step 5: Click menu button
      await productPricePage.clickMenuButton();
      // Step 7: Check button
      // Click exact menu item by accessible role/name
      await productPricePage.clickItemMenuByText('店別在庫');
      await page.waitForTimeout(500);
      await snapExpect();
      await expect(page).toHaveURL(/WTY10401StoreInventoryInquiry/);
    });

    test('WTY10301_58 - Transition to オーダー商品在庫照会', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapExpect,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_56');
      // Step 1: Go to base URL and wait for it to load
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      // Step 2: Inject IndexedDB data AFTER page loaded
      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });
      // Debug injected data for verification
      await indexedDBHelper.debugCipherAndData();
      // Step 3: Navigate to target URL
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 4: Wait for form to be ready
      await productPricePage.waitForFormReady();

      await productPricePage.fillForm(testData.formData);

      await productPricePage.clickSearch();
      // Step 5: Click menu button
      await productPricePage.clickMenuButton();
      // Step 7: Check button
      // Click exact menu item by accessible role/name
      await productPricePage.clickItemMenuByText('オーダー');
      await page.waitForTimeout(500);
      await snapExpect();
      await expect(page).toHaveURL(/WTY10701InquiryOfOrderedProductInventory/);
    });

    test('WTY10301_59 - Transition to 商品入力', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapExpect,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_56');
      // Step 1: Go to base URL and wait for it to load
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      // Step 2: Inject IndexedDB data AFTER page loaded
      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });
      // Debug injected data for verification
      await indexedDBHelper.debugCipherAndData();
      // Step 3: Navigate to target URL
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 4: Wait for form to be ready
      await productPricePage.waitForFormReady();

      await productPricePage.fillForm(testData.formData);

      await productPricePage.clickSearch();
      // Step 5: Click menu button
      await productPricePage.clickMenuButton();
      // Step 7: Check button
      // Click exact menu item by accessible role/name
      await productPricePage.clickItemMenuByText('カート');
      await page.waitForTimeout(500);
      await snapExpect();
      await expect(page).toHaveURL(/WTY20201/);
    });

    test('WTY10301_60 - Transition to 部店検索', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapExpect,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_56');
      // Step 1: Go to base URL and wait for it to load
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      // Step 2: Inject IndexedDB data AFTER page loaded
      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });
      // Debug injected data for verification
      await indexedDBHelper.debugCipherAndData();
      // Step 3: Navigate to target URL
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 4: Wait for form to be ready
      await productPricePage.waitForFormReady();

      await productPricePage.selectorsObj.btnCdInput.focus();
      await page.waitForTimeout(500);

      await productPricePage.clickSubMenuBtn('部店検索');
      await snapExpect();
      await expect(page).toHaveURL(/WTZ10901/);
    });

    test('WTY10301_61 - Transition to 型番検索', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapExpect,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_56');
      // Step 1: Go to base URL and wait for it to load
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      // Step 2: Inject IndexedDB data AFTER page loaded
      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });
      // Debug injected data for verification
      await indexedDBHelper.debugCipherAndData();
      // Step 3: Navigate to target URL
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 4: Wait for form to be ready
      await productPricePage.waitForFormReady();

      await productPricePage.selectorsObj.shnCdInput.focus();
      await page.waitForTimeout(500);

      await productPricePage.clickSubMenuBtn('型番検索');
      await snapExpect();
      await expect(page).toHaveURL(/WTZ10101ModelSearch/);
    });
});