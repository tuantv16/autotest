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

    test('WTY10301_06 - Menu button', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      // Step 1: Go to base URL and wait for it to load
      console.log('[TEST] Loading base page...');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      // Step 2: Navigate to target URL
      console.log('[TEST] Navigating to WTY10301ProductPriceInformation...');
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 3: Wait for form to be ready
      await productPricePage.waitForFormReady();
      // Step 4: Click menu button
      console.log('[TEST] clicking menu button...');
      await productPricePage.clickMenuButton();
      // Step 5: Check button
      console.log('[TEST] Check button...');
      const found商品基本 = await productPricePage.waitForTextInBody('商品基本', 10000);
      expect(found商品基本).toBe(true);

      const found店別在庫 = await productPricePage.waitForTextInBody('店別在庫', 10000);
      expect(found店別在庫).toBe(true);

      const foundカート = await productPricePage.waitForTextInBody('カート', 10000);
      expect(foundカート).toBe(true);

      const foundクリア = await productPricePage.waitForTextInBody('クリア', 10000);
      expect(foundクリア).toBe(true);

      const foundオーダー = await productPricePage.waitForTextInBody('オーダー', 10000);
      expect(foundオーダー).toBe(true);
      console.log('[TEST] ✅ Menu button successfully');
    });

    test('WTY10301_07 - input 基準日', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'init');
      console.log('[TEST] Running 07 - format value 基準日 successfully');
    //   Step 1: Go to base URL and wait for it to load
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
      // Step 5: Search
      console.log('[TEST] Searching product price...');
      await productPricePage.clickSearch();
        // Step 6: Check format value
      const inputValue = await productPricePage.checkValueInput(productPricePage.selectorsObj.baseDateInput,10000);
      expect(inputValue).toBe('10/28');

      console.log('[TEST] ✅ Check format value 基準日 successfully');
    });

    test('WTY10301_08 - input 部店', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'init');
      console.log('[TEST] Running 08 - input 部店 successfully');
    //   Step 1: Go to base URL and wait for it to load
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
      // Step 5: Search
      console.log('[TEST] Searching product price...');
      await productPricePage.clickSearch();
        // Step 6: Check format value
      const inputValue = await productPricePage.checkValueInput(productPricePage.selectorsObj.btnCdInput, 10000);
      expect(inputValue).toBe('04388');

      console.log('[TEST] ✅ Check format value 部店 successfully');
    });

    test('WTY10301_09 - input 部店名', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'init');
      console.log('[TEST] Running 09 - input 部店名 successfully');
    //   Step 1: Go to base URL and wait for it to load
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
      // Step 5: Search
      console.log('[TEST] Searching product price...');
      await productPricePage.clickSearch();
        // Step 6: Check format value
      const inputValue = await productPricePage.checkValueInput(productPricePage.selectorsObj.btnNmInput, 10000);
      expect(inputValue).toBe('東海通');

      console.log('[TEST] ✅ Check format value 基準日 successfully');
    });

    test('WTY10301_11 - input blank', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'init');
      console.log('[TEST] Running 11 - input blank successfully');
    //   Step 1: Go to base URL and wait for it to load
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
      // Step 5: Search
      console.log('[TEST] Searching product price...');
      await productPricePage.clickSearch();
        // Step 6: Check format value
      const kataInput = await productPricePage.checkValueInput(productPricePage.selectorsObj.kataInput, 10000);
      expect(kataInput).toBe('');

      const kkNmInput = await productPricePage.checkValueInput(productPricePage.selectorsObj.kkNmInput, 10000);
      expect(kkNmInput).toBe('');

      const priceBkInput = await productPricePage.checkValueInput(productPricePage.selectorsObj.priceBkInput, 10000);
      expect(priceBkInput).toBe('');

      console.log('[TEST] ✅ Check format value input blank successfully');
    });

    test('WTY10301_12 - check toggle', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'init');
      console.log('[TEST] Running 12 - check toggle successfully');
    //   Step 1: Go to base URL and wait for it to load
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
      // Step 5: Search
      console.log('[TEST] Searching product price...');
      await productPricePage.clickSearch();
        // Step 6: Check format value
      const zeiKbnChecked = await productPricePage.selectorsObj.zeiKbnRadio('1').isChecked();
      expect(zeiKbnChecked).toBe(true);

      console.log('[TEST] ✅ check toggle successfully');
    });

    test('WTY10301_13 - check toggle not Tsutaya', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC13');
      console.log('[TEST] Running TC13 - check toggle not Tsutaya successfully');
    //   Step 1: Go to base URL and wait for it to load
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
        // Step 7: Check format value
      const zeiKbnChecked = await productPricePage.selectorsObj.zeiKbnRadio('1').isChecked();
      expect(zeiKbnChecked).toBe(true);

      const ptSbtChecked = await productPricePage.selectorsObj.ptSbtRadio('1').isChecked();
      expect(ptSbtChecked).toBe(true);

      console.log('[TEST] ✅ check toggle not Tsutaya successfully');
    });

    test('WTY10301_14 - check toggle Tsutaya', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC14');
      console.log('[TEST] Running TC14 - check toggle Tsutaya successfully');
    //   Step 1: Go to base URL and wait for it to load
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
        // Step 7: Check format value
      const zeiKbnChecked = await productPricePage.selectorsObj.zeiKbnRadio('1').isHidden();
      expect(zeiKbnChecked).toBe(true);

      const ptSbtChecked = await productPricePage.selectorsObj.ptSbtRadio('1').isHidden();
      expect(ptSbtChecked).toBe(true);

      console.log('[TEST] ✅ check toggle Tsutaya successfully');
    });

});