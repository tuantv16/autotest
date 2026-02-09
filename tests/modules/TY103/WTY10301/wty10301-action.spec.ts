/**
 * WTY10301 Summary Input Test Suite
 * Tests for 商品価格照会 screen using Page Object Model
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { TY103Page } from '../../../pages/TY103/wty10301.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';
import { COMMON_MESSAGES } from '../../../constants/messages';
import { snapInput } from '../../../utils/screenshot-helper';

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
      snapInput,
      snapExpect,
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
      await snapInput();
      //Step 5: blur form
      await productPricePage.selectorsObj.baseDateInput.click();
      // Step 6: Check format value
      const inputValue = await productPricePage.checkValueInput(productPricePage.selectorsObj.baseDateInput, 10000);
      await snapExpect();
      expect(inputValue).toBe('1028');
    });

    test('WTY10301_28 - Blur input 基準日', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapExpect,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_28');
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
      //Step 5: fill form
      await productPricePage.fillForm(testData.formData);
      // Step 6: blur form
      productPricePage.selectorsObj.baseDateInput.blur();
      await page.waitForTimeout(500);
      await snapExpect();
      // Step 7: Check format value
      const inputValue = await productPricePage.checkValueInput(productPricePage.selectorsObj.baseDateInput, 10000);
      expect(inputValue).toBe('10/28');
    });

    test('WTY10301_31 - show submenu input 部店', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapExpect,
    }) => {
    //   Step 1: Go to base URL and wait for it to load
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      // Step 2: Navigate to target URL
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 3: Wait for form to be ready
      await productPricePage.waitForFormReady();
      //Step 4: click input
      await productPricePage.selectorsObj.btnCdInput.click();
      await page.waitForTimeout(500);
      await snapExpect();
      // Step 5: Check value
      const resultFound = await productPricePage.waitForTextInBody('部店検索', 10000);
      expect(resultFound).toBe(true);
    });

    test('WTY10301_31 - show submenu input 商品', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapExpect,
    }) => {
    //   Step 1: Go to base URL and wait for it to load
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      // Step 2: Navigate to target URL
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 3: Wait for form to be ready
      await productPricePage.waitForFormReady();
      //Step 4: click input
      await productPricePage.selectorsObj.shnCdInput.click();
      await page.waitForTimeout(500);
      await snapExpect();
      // Step 5: Check format value
      const resultFound = await productPricePage.waitForTextInBody('型番検索', 10000);
      expect(resultFound).toBe(true);
    });

    test('WTY10301_32 - search with 8 商品', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_32');
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
      // Step 5: Fill form
      await productPricePage.fillForm(testData.formData);
      await page.waitForTimeout(1000);
      await snapInput();
      await productPricePage.clickSearch();
      await page.waitForTimeout(1000);
      await snapExpect();
      // Step 8: Verify form is cleared
      const shnCdValue = await productPricePage.checkValueInput(productPricePage.selectorsObj.kataInput, 10000);
      expect(shnCdValue).toBe('ディン・バ・クエット');
    });

    test('WTY10301_33 - search with 11 商品', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_33');
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
      // Step 5: Fill form
      await productPricePage.fillForm(testData.formData);
      await page.waitForTimeout(1000);
      await snapInput();
      await productPricePage.clickSearch();
      await page.waitForTimeout(1000);
      await snapExpect();
      // Step 8: Verify form is cleared
      const shnCdValue = await productPricePage.checkValueInput(productPricePage.selectorsObj.kataInput, 10000);
      expect(shnCdValue).toBe('L32H01');
    });

    test('WTY10301_34 - search with 13 商品', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_34');
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
      // Step 5: Fill form
      await productPricePage.fillForm(testData.formData);
      await page.waitForTimeout(1000);
      await snapInput();
      await productPricePage.clickSearch();
      await page.waitForTimeout(1000);
      await snapExpect();
      // Step 8: Verify form is cleared
      const shnCdValue = await productPricePage.checkValueInput(productPricePage.selectorsObj.kataInput, 10000);
      expect(shnCdValue).toBe('DSA-456');
    });

    test('WTY10301_36 - scan barcode not supported', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapExpect,
    }) => {
    //   Step 1: Go to base URL and wait for it to load
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      // Step 2: Navigate to target URL
      await productPricePage.navigate();
      await page.waitForTimeout(1000);
      // Step 3: Wait for form to be ready
      await productPricePage.waitForFormReady();
      //Step 4: click barcode button
      await productPricePage.clickBarCode();
      await page.waitForTimeout(500);
      await snapExpect();
      // Step 5: check result
      const resultFound = await productPricePage.waitForTextInBody('スキャナーはFlutterアプリ内でのみ動作します', 10000);
      expect(resultFound).toBe(true);
    });

    test('WTY10301_41 - search', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_41');
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
      // Step 5: Fill form
      await productPricePage.fillForm(testData.formData);
      await page.waitForTimeout(1000);
      await snapInput();
      // Step 6: Click search button
      await productPricePage.clickSearch();
      await page.waitForTimeout(1000);
      await snapExpect();
      // Step 8: Verify form is cleared
      const btnNmInputValue = await productPricePage.checkValueInput(productPricePage.selectorsObj.btnNmInput, 10000);
      expect(btnNmInputValue).toBe('東海通');
      const kataInputValue = await productPricePage.checkValueInput(productPricePage.selectorsObj.kataInput, 10000);
      expect(kataInputValue).toBe('37C3500');
      const priceBkInputValue = await productPricePage.checkValueInput(productPricePage.selectorsObj.priceBkInput, 10000);
      expect(priceBkInputValue).toBe('227,333');
    });

    test('WTY10301_42 - display toggle 税別', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_42');
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
      // Step 5: Fill form
      await productPricePage.fillForm(testData.formData);
      await page.waitForTimeout(1000);
      await snapInput();
      // Step 6: Click search button
      await productPricePage.clickSearch();
      await page.waitForTimeout(1000);
      await snapExpect();
      // Step 8: Verify form is cleared
      const priceBkInputValue = await productPricePage.checkValueInput(productPricePage.selectorsObj.priceBkInput, 10000);
      expect(priceBkInputValue).toBe('206,667');
    });

    test('WTY10301_43 - display toggle 税込', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_43');
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
      // Step 5: Fill form
      await productPricePage.fillForm(testData.formData);
      await page.waitForTimeout(1000);
      await snapInput();
      // Step 6: Click search button
      await productPricePage.clickSearch();
      await page.waitForTimeout(1000);
      await snapExpect();
      // Step 8: Verify form is cleared
      const priceBkInputValue = await productPricePage.checkValueInput(productPricePage.selectorsObj.priceBkInput, 10000);
      expect(priceBkInputValue).toBe('227,333');
    });

    test('WTY10301_44 - display toggle 一般', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapExpect,
      snapInput,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_44');
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
      // Step 5: Fill form
      await productPricePage.fillForm(testData.formData);
      await page.waitForTimeout(1000);
      await snapInput();
      // Step 6: Click search button
      await productPricePage.clickSearch();
      await page.waitForTimeout(1000);
      await snapExpect();
      // Step 8: Verify form is cleared
      const text = await productPricePage.selectorsObj.cellTable.first().innerText();
      await page.waitForTimeout(1000);
      expect(text).toBe('一般');
    });

    test('WTY10301_45 - display toggle 正会員', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapExpect,
      snapInput,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_45');
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
      // Step 5: Fill form
      await productPricePage.fillForm(testData.formData);
      await page.waitForTimeout(1000);
      await snapInput();
      // Step 6: Click search button
      await productPricePage.clickSearch();
      await page.waitForTimeout(1000);
      await snapExpect();
      // Step 8: Verify form is cleared
      const text = await productPricePage.selectorsObj.cellTable.first().innerText();
      await page.waitForTimeout(1000);
      expect(text).toBe('正会員');
    });

    test('WTY10301_46 - display toggle あ会員', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_46');
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
      // Step 5: Fill form
      await productPricePage.fillForm(testData.formData);
      await page.waitForTimeout(1000);
      await snapInput();
      // Step 6: Click search button
      await productPricePage.clickSearch();
      await page.waitForTimeout(1000);
      // Step 8: Verify form is cleared
      const text = await productPricePage.selectorsObj.cellTable.first().innerText();
      await page.waitForTimeout(1000);
      await snapExpect();
      expect(text).toBe('あ会員');
    });

    test('WTY10301_47 - click toggle 通常P', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapExpect,
      snapInput,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_46');
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
      // Step 5: Fill form
      await productPricePage.fillForm(testData.formData);
      await page.waitForTimeout(1000);
      snapInput();
      // Step 6: Click search button
      await productPricePage.clickSearch();
      await page.waitForTimeout(1000);
      snapExpect();
      // Step 8: Verify form is cleared
      let text = '';
      const count = await productPricePage.selectorsObj.cellTable.count();
      for (let i = 0; i < count; i++) {
        if(i == 2){
          text = await productPricePage.selectorsObj.cellTable.nth(i).innerText();
        }
      }
      await page.waitForTimeout(1000);
      expect(text).toBe('1.00');
    });

    test('WTY10301_48 - click toggle 期間限定P without data', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_48');
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
      // Step 5: Fill form
      await productPricePage.fillForm(testData.formData);
      await page.waitForTimeout(1000);
      await snapInput();
      // Step 6: Click search button
      await productPricePage.clickSearch();
      await page.waitForTimeout(1000);
      await snapExpect();
      // Step 8: Verify form is cleared
      let text = '';
      let color = '';
      const count = await productPricePage.selectorsObj.cellTable.count();
      for (let i = 0; i < count; i++) {
        if(i == 3){
          text = await productPricePage.selectorsObj.cellTable.nth(i).innerText();
        }
      }
      await page.waitForTimeout(1000);
      expect(text).toBe('50');
    });

    test('WTY10301_49 - click toggle 期間限定P without data', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_49');
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
      // Step 5: Fill form
      await productPricePage.fillForm(testData.formData);
      await page.waitForTimeout(1000);
      await snapInput();
      // Step 6: Click search button
      await productPricePage.clickSearch();
      await page.waitForTimeout(1000);
      await snapExpect();
      // Step 8: Verify form is cleared
      let text = '';
      let color = '';
      const count = await productPricePage.selectorsObj.cellTable.count();
      for (let i = 0; i < count; i++) {
        if(i == 2){
          text = await productPricePage.selectorsObj.cellTable.nth(i).innerText();
          color = await productPricePage.selectorsObj.cellTable.nth(i).evaluate(el => {
            return getComputedStyle(el).color;
          });
        }
      }
      await page.waitForTimeout(1000);
      expect(text).toBe('0.00');
      expect(color).toBe('rgb(156, 163, 175)');
    });

    test('WTY10301_50 - select row', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_50');
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
      // Step 5: Fill form
      await productPricePage.fillForm(testData.formData);
      await page.waitForTimeout(1000);
      await snapInput();
      // Step 6: Click search button
      await productPricePage.clickSearch();
      await page.waitForTimeout(1000);
      await snapExpect();
      // Step 8: Verify form is cleared
      await productPricePage.selectorsObj.firstRowTable.first().click();
      await page.waitForTimeout(1000);
      expect(await productPricePage.selectorsObj.kkNmInput.inputValue()).toBe('テスト_最大処理件数調査_特売');
    });

    test('WTY10301_51 - clear form', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData('TY103/wty10301', 'wty10301', 'TC_51');
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
      // Step 5: Fill form
      await productPricePage.fillForm(testData.formData);
      await page.waitForTimeout(1000);
      await snapInput();
      await productPricePage.clickSearch();
      await page.waitForTimeout(1000);
      await snapExpect();
      // Step 6: Click clear button
      await productPricePage.clickClearButton();
      await page.waitForTimeout(500);
      // Step 8: Verify form is cleared
      const shnCdValue = await productPricePage.checkValueInput(productPricePage.selectorsObj.shnCdInput, 10000);
      expect(shnCdValue).toBe('');
    });

    test('WTY10301_52 - clear 基準日', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapExpect,
      snapInput,
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
      await snapInput();
      await productPricePage.selectorsObj.clearBaseDate.click();
      await page.waitForTimeout(500);
      await snapExpect();
      const result = await productPricePage.checkValueInput(productPricePage.selectorsObj.baseDateInput, 10000);

      expect(result).toBe('');
    });

    test('WTY10301_53 - clear 部店', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
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
      await snapInput();
      await snapInput();
      await productPricePage.selectorsObj.clearBtnCd.click();
      await page.waitForTimeout(500);
      await snapExpect();
      const result = await productPricePage.checkValueInput(productPricePage.selectorsObj.btnCdInput, 10000);

      expect(result).toBe('');
    });

    test('WTY10301_54 - clear 商品', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
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
      await snapInput();
      await productPricePage.selectorsObj.clearShnCd.click();
      await page.waitForTimeout(500);
      await snapExpect();
      const result = await productPricePage.checkValueInput(productPricePage.selectorsObj.shnCdInput, 10000);

      expect(result).toBe('');
    });

});