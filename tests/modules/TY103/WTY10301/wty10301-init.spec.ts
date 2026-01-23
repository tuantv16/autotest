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
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      // Step 2: Navigate to target URL
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 3: Wait for form to be ready
      await productPricePage.waitForFormReady();
      // Step 4: Click menu button
      await productPricePage.clickMenuButton();
      // Step 5: Check button
      const menuItem1 = await productPricePage.waitForTextInBody('商品基本', 10000);
      expect(menuItem1).toBe(true);

      const menuItem2 = await productPricePage.waitForTextInBody('店別在庫', 10000);
      expect(menuItem2).toBe(true);

      const menuItem3 = await productPricePage.waitForTextInBody('カート', 10000);
      expect(menuItem3).toBe(true);

      const menuItem4 = await productPricePage.waitForTextInBody('オーダー', 10000);
      expect(menuItem4).toBe(true);
    });

    test('WTY10301_07 - input 基準日', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'init');
    //   Step 1: Go to base URL and wait for it to load
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      // Step 2: Inject IndexedDB data AFTER page loaded
      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });
      // Step 3: Navigate to target URL
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 4: Wait for form to be ready
      await productPricePage.waitForFormReady();
      // Step 5: Search
      await productPricePage.clickSearch();
        // Step 6: Check format value
      const inputValue = await productPricePage.checkValueInput(productPricePage.selectorsObj.baseDateInput,10000);
      expect(inputValue).toBe('10/28');
    });

    test('WTY10301_08 - input 部店', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'init');
    //   Step 1: Go to base URL and wait for it to load
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      // Step 2: Inject IndexedDB data AFTER page loaded
      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });
      // Step 3: Navigate to target URL
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 4: Wait for form to be ready
      await productPricePage.waitForFormReady();
      // Step 5: Search
      await productPricePage.clickSearch();
        // Step 6: Check format value
      const inputValue = await productPricePage.checkValueInput(productPricePage.selectorsObj.btnCdInput, 10000);
      expect(inputValue).toBe('04388');
    });

    test('WTY10301_09 - input 部店名', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'init');
    //   Step 1: Go to base URL and wait for it to load
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      // Step 2: Inject IndexedDB data AFTER page loaded
      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });
      // Step 3: Navigate to target URL
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 4: Wait for form to be ready
      await productPricePage.waitForFormReady();
      // Step 5: Search
      await productPricePage.clickSearch();
        // Step 6: Check format value
      const inputValue = await productPricePage.checkValueInput(productPricePage.selectorsObj.btnNmInput, 10000);
      expect(inputValue).toBe('東海通');
    });

    test('WTY10301_11 - input blank', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'init');
    //   Step 1: Go to base URL and wait for it to load
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      // Step 2: Inject IndexedDB data AFTER page loaded
      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });
      // Step 3: Navigate to target URL
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 4: Wait for form to be ready
      await productPricePage.waitForFormReady();
      // Step 5: Search
      await productPricePage.clickSearch();
        // Step 6: Check format value
      const kataInput = await productPricePage.checkValueInput(productPricePage.selectorsObj.kataInput, 10000);
      expect(kataInput).toBe('');

      const kkNmInput = await productPricePage.checkValueInput(productPricePage.selectorsObj.kkNmInput, 10000);
      expect(kkNmInput).toBe('');

      const priceBkInput = await productPricePage.checkValueInput(productPricePage.selectorsObj.priceBkInput, 10000);
      expect(priceBkInput).toBe('');
    });

    test('WTY10301_12 - check toggle', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'init');
    //   Step 1: Go to base URL and wait for it to load
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      // Step 2: Inject IndexedDB data AFTER page loaded
      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });
      // Step 3: Navigate to target URL
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 4: Wait for form to be ready
      await productPricePage.waitForFormReady();
      // Step 5: Search
      await productPricePage.clickSearch();
        // Step 6: Check format value
      const zeiKbnChecked = await productPricePage.selectorsObj.zeiKbnRadio('1').isChecked();
      expect(zeiKbnChecked).toBe(true);
    });

    test('WTY10301_13 - check toggle not Tsutaya', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC13');
    //   Step 1: Go to base URL and wait for it to load
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      // Step 2: Inject IndexedDB data AFTER page loaded
      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });
      // Step 3: Navigate to target URL
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 4: Wait for form to be ready
      await productPricePage.waitForFormReady();
        // Step 7: Check format value
      const zeiKbnChecked = await productPricePage.selectorsObj.zeiKbnRadio('1').isChecked();
      expect(zeiKbnChecked).toBe(true);

      const ptSbtChecked = await productPricePage.selectorsObj.ptSbtRadio('1').isChecked();
      expect(ptSbtChecked).toBe(true);
    });

    test('WTY10301_14 - check toggle Tsutaya', async ({
      page,
      baseUrl,
      indexedDBHelper,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC14');
    //   Step 1: Go to base URL and wait for it to load
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      // Step 2: Inject IndexedDB data AFTER page loaded
      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });
      // Step 3: Navigate to target URL
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 4: Wait for form to be ready
      await productPricePage.waitForFormReady();
        // Step 7: Check format value
      const zeiKbnChecked = await productPricePage.selectorsObj.zeiKbnRadio('1').isHidden();
      expect(zeiKbnChecked).toBe(true);

      const ptSbtChecked = await productPricePage.selectorsObj.ptSbtRadio('1').isHidden();
      expect(ptSbtChecked).toBe(true);
    });

});