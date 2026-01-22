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

    test('WTY10301_27 - delete / focus input 基準日', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'init');
      console.log('[TEST] Running 27 - delete / focus input 基準日 successfully');
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
      //Step 5: blur form
      console.log('[TEST] bluring form...');
      await productPricePage.selectorsObj.baseDateInput.click();
      // Step 6: Check format value
      const inputValue = await productPricePage.checkValueInput(productPricePage.selectorsObj.baseDateInput, 10000);
      expect(inputValue).toBe('1028');
      console.log('[TEST] ✅ Check delete / focus input 基準日 successfully');
    });

    test('WTY10301_28 - Blur input 基準日', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_28');
      console.log('[TEST] Running 28 - Blur input 基準日 successfully');
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
      //Step 5: fill form
      await productPricePage.fillForm(testData.formData);
      console.log('[TEST] bluring form...');
      // Step 6: blur form
      productPricePage.selectorsObj.baseDateInput.blur();
      await page.waitForTimeout(500);
      // Step 7: Check format value
      const inputValue = await productPricePage.checkValueInput(productPricePage.selectorsObj.baseDateInput, 10000);
      expect(inputValue).toBe('10/28');
      console.log('[TEST] ✅ Check Blur input 基準日 successfully');
    });

    test('WTY10301_31 - show submenu input 部店', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      console.log('[TEST] Running 31 - show submenu input  部店 successfully');
    //   Step 1: Go to base URL and wait for it to load
      console.log('[TEST] Loading base page...');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      // Step 2: Navigate to target URL
      console.log('[TEST] Navigating to WTY10301ProductPriceInformation...');
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 3: Wait for form to be ready
      await productPricePage.waitForFormReady();
      //Step 4: click input
      await productPricePage.selectorsObj.btnCdInput.click();
      await page.waitForTimeout(500);
      // Step 5: Check value
      const resultFound = await productPricePage.waitForTextInBody('部店検索', 10000);
      expect(resultFound).toBe(true);
      console.log('[TEST] ✅ show submenu input  部店 successfully');
    });

    test('WTY10301_31 - show submenu input 商品', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      console.log('[TEST] Running 31 - show submenu input 商品 successfully');
    //   Step 1: Go to base URL and wait for it to load
      console.log('[TEST] Loading base page...');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      // Step 2: Navigate to target URL
      console.log('[TEST] Navigating to WTY10301ProductPriceInformation...');
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 3: Wait for form to be ready
      await productPricePage.waitForFormReady();
      //Step 4: click input
      await productPricePage.selectorsObj.shnCdInput.click();
      await page.waitForTimeout(500);
      // Step 5: Check format value
      const resultFound = await productPricePage.waitForTextInBody('型番検索', 10000);
      expect(resultFound).toBe(true);
      console.log('[TEST] ✅ show submenu input 商品 successfully');
    });

    test('WTY10301_32 - search with 8 商品', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_32');
      console.log('[TEST] Running 32 - search with 8 商品 successfully');
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
      // Step 5: Fill form
      console.log('[TEST] Filling form...');
      await productPricePage.fillForm(testData.formData);
      await productPricePage.clickSearch();
      await page.waitForTimeout(1000);
      // Step 8: Verify form is cleared
      const shnCdValue = await productPricePage.checkValueInput(productPricePage.selectorsObj.kataInput, 10000);
      expect(shnCdValue).toBe('ディン・バ・クエット');
      console.log('[TEST] ✅ search with 8 商品 successfully');
    });

    test('WTY10301_33 - search with 11 商品', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_33');
      console.log('[TEST] Running 33 - search with 11 商品 successfully');
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
      // Step 5: Fill form
      console.log('[TEST] Filling form...');
      await productPricePage.fillForm(testData.formData);
      await productPricePage.clickSearch();
      await page.waitForTimeout(1000);
      // Step 8: Verify form is cleared
      const shnCdValue = await productPricePage.checkValueInput(productPricePage.selectorsObj.kataInput, 10000);
      expect(shnCdValue).toBe('L32H01');
      console.log('[TEST] ✅ search with 11 商品 successfully');
    });

    test('WTY10301_34 - search with 13 商品', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_34');
      console.log('[TEST] Running 34 - search with 13 商品 successfully');
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
      // Step 5: Fill form
      console.log('[TEST] Filling form...');
      await productPricePage.fillForm(testData.formData);
      await productPricePage.clickSearch();
      await page.waitForTimeout(1000);
      // Step 8: Verify form is cleared
      const shnCdValue = await productPricePage.checkValueInput(productPricePage.selectorsObj.kataInput, 10000);
      expect(shnCdValue).toBe('DSA-456');
      console.log('[TEST] ✅ search with 13 商品 successfully');
    });

    test('WTY10301_35 - transition 型番検索', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_35');
      console.log('[TEST] Running 35 - transition 型番検索 successfully');
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
      await expect(page).toHaveURL(/WTZ10101ModelSearch/);
      console.log('[TEST] ✅ transition 型番検索 successfully');
    });

    test('WTY10301_36 - scan barcode not supported', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      console.log('[TEST] Running 36 - scan barcode not supported successfully');
    //   Step 1: Go to base URL and wait for it to load
      console.log('[TEST] Loading base page...');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      // Step 2: Navigate to target URL
      console.log('[TEST] Navigating to WTY10301ProductPriceInformation...');
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 3: Wait for form to be ready
      await productPricePage.waitForFormReady();
      //Step 4: click barcode button
      console.log('[TEST] clicking barcode button...');
      await productPricePage.clickBarCode();
      await page.waitForTimeout(500);
      // Step 5: check result
      const resultFound = await productPricePage.waitForTextInBody('スキャナーはFlutterアプリ内でのみ動作します', 10000);
      expect(resultFound).toBe(true);
      console.log('[TEST] ✅ scan barcode not supported successfully');
    });

    test('WTY10301_41 - search', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_41');
      console.log('[TEST] Running 41 - search successfully');
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
      // Step 5: Fill form
      console.log('[TEST] Filling form...');
      await productPricePage.fillForm(testData.formData);
      await page.waitForTimeout(1000);
      // Step 6: Click search button
      console.log('[TEST] Searching product price...');
      await productPricePage.clickSearch();
      await page.waitForTimeout(1000);
      // Step 8: Verify form is cleared
      const btnNmInputValue = await productPricePage.checkValueInput(productPricePage.selectorsObj.btnNmInput, 10000);
      expect(btnNmInputValue).toBe('東海通');
      const kataInputValue = await productPricePage.checkValueInput(productPricePage.selectorsObj.kataInput, 10000);
      expect(kataInputValue).toBe('37C3500');
      const priceBkInputValue = await productPricePage.checkValueInput(productPricePage.selectorsObj.priceBkInput, 10000);
      expect(priceBkInputValue).toBe('227,333');
      console.log('[TEST] ✅ search successfully');
    });

    test('WTY10301_42 - display toggle 税別', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_42');
      console.log('[TEST] Running 42 - display toggle 税別 successfully');
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
      // Step 5: Fill form
      console.log('[TEST] Filling form...');
      await productPricePage.fillForm(testData.formData);
      await page.waitForTimeout(1000);
      // Step 6: Click search button
      console.log('[TEST] Searching product price...');
      await productPricePage.clickSearch();
      await page.waitForTimeout(1000);
      // Step 8: Verify form is cleared
      const priceBkInputValue = await productPricePage.checkValueInput(productPricePage.selectorsObj.priceBkInput, 10000);
      expect(priceBkInputValue).toBe('206,667');
      console.log('[TEST] ✅ display toggle 税別 successfully');
    });

    test('WTY10301_43 - display toggle 税込', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_43');
      console.log('[TEST] Running 43 - display toggle 税込 successfully');
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
      // Step 5: Fill form
      console.log('[TEST] Filling form...');
      await productPricePage.fillForm(testData.formData);
      await page.waitForTimeout(1000);
      // Step 6: Click search button
      console.log('[TEST] Searching product price...');
      await productPricePage.clickSearch();
      await page.waitForTimeout(1000);
      // Step 8: Verify form is cleared
      const priceBkInputValue = await productPricePage.checkValueInput(productPricePage.selectorsObj.priceBkInput, 10000);
      expect(priceBkInputValue).toBe('227,333');
      console.log('[TEST] ✅ display toggle 税込 successfully');
    });

    test('WTY10301_44 - display toggle 一般', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_44');
      console.log('[TEST] Running 44 - display toggle 一般 successfully');
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
      // Step 5: Fill form
      console.log('[TEST] Filling form...');
      await productPricePage.fillForm(testData.formData);
      await page.waitForTimeout(1000);
      // Step 6: Click search button
      console.log('[TEST] Searching product price...');
      await productPricePage.clickSearch();
      await page.waitForTimeout(1000);
      // Step 8: Verify form is cleared
      const text = await page.locator('div.ag-cell-wrapper span[role="presentation"]').first().innerText();
      console.log('Price Type Text:', text);
      await page.waitForTimeout(1000);
      expect(text).toBe('一般');
      console.log('[TEST] ✅ display toggle 一般 successfully');
    });

    test('WTY10301_45 - display toggle 正会員', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_45');
      console.log('[TEST] Running 45 - display toggle 正会員 successfully');
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
      // Step 5: Fill form
      console.log('[TEST] Filling form...');
      await productPricePage.fillForm(testData.formData);
      await page.waitForTimeout(1000);
      // Step 6: Click search button
      console.log('[TEST] Searching product price...');
      await productPricePage.clickSearch();
      await page.waitForTimeout(1000);
      // Step 8: Verify form is cleared
      const text = await page.locator('div.ag-cell-wrapper span[role="presentation"]').first().innerText();
      console.log('Price Type Text:', text);
      await page.waitForTimeout(1000);
      expect(text).toBe('正会員');
      console.log('[TEST] ✅ display toggle 正会員 successfully');
    });

    test('WTY10301_46 - display toggle あ会員', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_46');
      console.log('[TEST] Running 46 - display toggle 正会員 successfully');
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
      // Step 5: Fill form
      console.log('[TEST] Filling form...');
      await productPricePage.fillForm(testData.formData);
      await page.waitForTimeout(1000);
      // Step 6: Click search button
      console.log('[TEST] Searching product price...');
      await productPricePage.clickSearch();
      await page.waitForTimeout(1000);
      // Step 8: Verify form is cleared
      const text = await page.locator('div.ag-cell-wrapper span[role="presentation"]').first().innerText();
      await page.waitForTimeout(1000);
      expect(text).toBe('あ会員');
      console.log('[TEST] ✅ display toggle あんしん会員 successfully');
    });

    test('WTY10301_47 - click toggle 通常P', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_46');
      console.log('[TEST] Running 47 - display toggle 通常P successfully');
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
      // Step 5: Fill form
      console.log('[TEST] Filling form...');
      await productPricePage.fillForm(testData.formData);
      await page.waitForTimeout(1000);
      // Step 6: Click search button
      console.log('[TEST] Searching product price...');
      await productPricePage.clickSearch();
      await page.waitForTimeout(1000);
      // Step 8: Verify form is cleared
      let text = '';
      const count = await page.locator('div.ag-cell-wrapper span[role="presentation"]').count();
      for (let i = 0; i < count; i++) {
        if(i == 2){
          text = await page.locator('div.ag-cell-wrapper span[role="presentation"]').nth(i).innerText();
        }
      }
      await page.waitForTimeout(1000);
      expect(text).toBe('1.00');
      console.log('[TEST] ✅ click toggle 通常P successfully');
    });

    test('WTY10301_48 - click toggle 期間限定P without data', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_48');
      console.log('[TEST] Running 48 - click toggle 期間限定P without data successfully');
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
      // Step 5: Fill form
      console.log('[TEST] Filling form...');
      await productPricePage.fillForm(testData.formData);
      await page.waitForTimeout(1000);
      // Step 6: Click search button
      console.log('[TEST] Searching product price...');
      await productPricePage.clickSearch();
      await page.waitForTimeout(1000);
      // Step 8: Verify form is cleared
      let text = '';
      let color = '';
      const count = await page.locator('div.ag-cell-wrapper span[role="presentation"]').count();
      for (let i = 0; i < count; i++) {
        if(i == 3){
          text = await page.locator('div.ag-cell-wrapper span[role="presentation"]').nth(i).innerText();
        }
      }
      await page.waitForTimeout(1000);
      expect(text).toBe('50');
      console.log('[TEST] ✅ click toggle 期間限定P without data successfully');
    });

    test('WTY10301_49 - click toggle 期間限定P without data', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_49');
      console.log('[TEST] Running 49 - click toggle 期間限定P without data successfully');
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
      // Step 5: Fill form
      console.log('[TEST] Filling form...');
      await productPricePage.fillForm(testData.formData);
      await page.waitForTimeout(1000);
      // Step 6: Click search button
      console.log('[TEST] Searching product price...');
      await productPricePage.clickSearch();
      await page.waitForTimeout(1000);
      // Step 8: Verify form is cleared
      let text = '';
      let color = '';
      const count = await page.locator('div.ag-cell-wrapper span[role="presentation"]').count();
      for (let i = 0; i < count; i++) {
        if(i == 2){
          text = await page.locator('div.ag-cell-wrapper span[role="presentation"]').nth(i).innerText();
          color = await page.locator('div.ag-cell-wrapper span[role="presentation"]').nth(i).evaluate(el => {
            return getComputedStyle(el).color;
          });
        }
      }
      await page.waitForTimeout(1000);
      expect(text).toBe('0.00');
      expect(color).toBe('rgb(156, 163, 175)');
      console.log('[TEST] ✅ click toggle 期間限定P without data successfully');
    });

    test('WTY10301_50 - select row', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_50');
      console.log('[TEST] Running 50 - select row successfully');
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
      // Step 5: Fill form
      console.log('[TEST] Filling form...');
      await productPricePage.fillForm(testData.formData);
      await page.waitForTimeout(1000);
      // Step 6: Click search button
      console.log('[TEST] Searching product price...');
      await productPricePage.clickSearch();
      await page.waitForTimeout(1000);
      // Step 8: Verify form is cleared
      const text = await page.locator('div[row-index="0"]').first().click();
      await page.waitForTimeout(1000);
      expect(await page.locator('#kkNm').inputValue()).toBe('テスト_最大処理件数調査_特売');
      console.log('[TEST] ✅ select row successfully');
    });

    test('WTY10301_51 - clear form', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_51');
      console.log('[TEST] Running 51 - clear form successfully');
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
      // Step 5: Fill form
      console.log('[TEST] Filling form...');
      await productPricePage.fillForm(testData.formData);
      await page.waitForTimeout(1000);

      await productPricePage.clickSearch();
      await page.waitForTimeout(1000);
      // Step 6: Click clear button
      console.log('[TEST] Check button...');
      // Click exact menu item by accessible role/name
      await productPricePage.clickClearButton();
      await page.waitForTimeout(500);
      // Step 8: Verify form is cleared
      const shnCdValue = await productPricePage.checkValueInput(productPricePage.selectorsObj.shnCdInput, 10000);
      expect(shnCdValue).toBe('');
      console.log('[TEST] ✅ clear form successfully');
    });

    test('WTY10301_52 - clear 基準日', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_56');
      console.log('[TEST] Running 52 - clear 基準日 successfully');
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

      await page.locator('#baseDate+img').click();
      await page.waitForTimeout(500);

      const result = await productPricePage.checkValueInput(productPricePage.selectorsObj.baseDateInput, 10000);

      expect(result).toBe('');
      console.log('[TEST] ✅ clear 基準日 successfully');
    });

    test('WTY10301_53 - clear 部店', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_56');
      console.log('[TEST] Running 53 - clear 部店 successfully');
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

      await page.locator('#btnCd+img').click();
      await page.waitForTimeout(500);

      const result = await productPricePage.checkValueInput(productPricePage.selectorsObj.btnCdInput, 10000);

      expect(result).toBe('');
      console.log('[TEST] ✅ clear 部店 successfully');
    });

    test('WTY10301_54 - clear 商品', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_56');
      console.log('[TEST] Running 54 - clear 商品 successfully');
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

      await page.locator('#shnCd+div+img').click();
      await page.waitForTimeout(500);

      const result = await productPricePage.checkValueInput(productPricePage.selectorsObj.shnCdInput, 10000);

      expect(result).toBe('');
      console.log('[TEST] ✅ clear 商品 successfully');
    });

    test('WTY10301_73 - Loading init', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      // Step 1: Go to base URL and wait for it to load
      console.log('[TEST] Loading base page...');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      // Debug injected data for verification
      await indexedDBHelper.debugCipherAndData();
      // Step 2: Navigate to target URL
      console.log('[TEST] Navigating to WTY10301ProductPriceInformation...');
      const start = Date.now();
      await productPricePage.navigate();
      
      // Step 3: Wait for form to be ready
      await expect(productPricePage.selectorsObj.actionMenuButton).toBeEnabled();
      const duration = Date.now() - (start);
      expect(duration).toBeLessThan(1000);
      console.log('[TEST] ✅ Transition to 型番検索 successfully');
    });

    test('WTY10301_74 - Loading search price', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_41');
      console.log('[TEST] Running 74 - Loading search price successfully');
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
      // Step 4: Wait for form to be ready
      await productPricePage.waitForFormReady();
      // Step 5: Fill form
      console.log('[TEST] Filling form...');
      await productPricePage.fillForm(testData.formData);
      await page.waitForTimeout(500);
      // Step 6: Click search button
      console.log('[TEST] Searching product price...');
      await productPricePage.clickSearch();
      const start = Date.now();
      await page.waitForTimeout(500);
      // Step 8: Verify form is cleared
      const btnNmInputValue = await productPricePage.checkValueInput(productPricePage.selectorsObj.btnNmInput, 10000);
      expect(btnNmInputValue).toBe('東海通');
      const kataInputValue = await productPricePage.checkValueInput(productPricePage.selectorsObj.kataInput, 10000);
      expect(kataInputValue).toBe('37C3500');
      const priceBkInputValue = await productPricePage.checkValueInput(productPricePage.selectorsObj.priceBkInput, 10000);
      expect(priceBkInputValue).toBe('227,333');
      const duration = Date.now() - (start);
      expect(duration).toBeLessThan(3000);

      console.log('[TEST] ✅ search successfully');
    });

    test('WTY10301_75 - Loading search price', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_41');
      console.log('[TEST] Running 75 - Loading search price successfully');
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
      // Step 4: Wait for form to be ready
      await productPricePage.waitForFormReady();
      // Step 5: Fill form
      console.log('[TEST] Filling form...');
      await productPricePage.fillForm(testData.formData);
      await page.waitForTimeout(500);
      // Step 6: Click search button
      console.log('[TEST] Searching product price...');
      await productPricePage.clickSearch();
      const start = Date.now();
      await page.waitForTimeout(500);
      // Step 8: Verify form is cleared
      const btnNmInputValue = await productPricePage.checkValueInput(productPricePage.selectorsObj.btnNmInput, 10000);
      expect(btnNmInputValue).toBe('東海通');
      const kataInputValue = await productPricePage.checkValueInput(productPricePage.selectorsObj.kataInput, 10000);
      expect(kataInputValue).toBe('37C3500');
      const priceBkInputValue = await productPricePage.checkValueInput(productPricePage.selectorsObj.priceBkInput, 10000);
      expect(priceBkInputValue).toBe('227,333');
      const duration = Date.now() - (start);
      expect(duration).toBeLessThan(3000);

      console.log('[TEST] ✅ search successfully');
    });


});