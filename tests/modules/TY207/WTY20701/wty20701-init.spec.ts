/**
 * WTY207010Page Arrage Plan Direct Delivery Test Suite
 * Tests for 手配予定照会(直送) screen using Page Object Model
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { WTY207010Page } from '../../../pages/TY207/wty20701.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';

test.describe('WTY207010Page - Arrage Plan Direct Delivery (手配予定照会(直送))', () => {
  let testPage: WTY207010Page;

  test.beforeEach(async ({ page }) => {
    testPage = new WTY207010Page(page);
  });

  test.afterEach(async ({ page }, testInfo) => {
    await takeScreenshotOnFailure(page, testInfo);
  });

  test('TC10 - Check field labels and data 出庫店', async ({indexedDBHelper}) => {
    const testData = loadTestData('TY207/wty20701', 'wty20701', 'TC_01');

    // Initialize page with IndexedDB data
    await testPage.init(indexedDBHelper, testData.sessionData, testData.commonData);

    // Check label and input value
    const inputValue = await testPage.checkLabelAndInputValue('出庫店', 'ＬＣ中部・ＤＣ');
    expect(inputValue).toBe('ＬＣ中部・ＤＣ');
  });

  test('TC11 - Check field labels and data 配送種類', async ({indexedDBHelper}) => {
    const testData = loadTestData('TY207/wty20701', 'wty20701', 'TC_01');

    // Initialize page with IndexedDB data
    await testPage.init(indexedDBHelper, testData.sessionData, testData.commonData);

    // Check label and input value (no expected value, just verify it exists)
    const inputValue = await testPage.checkLabelAndInputValue('配送種類');
    expect(inputValue).toBeTruthy();
  });

  test('TC12 - Check field labels and data L/T', async ({indexedDBHelper}) => {
    const testData = loadTestData('TY207/wty20701', 'wty20701', 'TC_01');

    // Initialize page with IndexedDB data
    await testPage.init(indexedDBHelper, testData.sessionData, testData.commonData);

    // Check label and input value
    const inputValue = await testPage.checkLabelAndInputValue('L/T', '97日');
    expect(inputValue).toBe('97日');
  });

  test('TC13 - Check field labels and data 最短お届け日', async ({indexedDBHelper}) => {
    const testData = loadTestData('TY207/wty20701', 'wty20701', 'TC_01');

    // Initialize page with IndexedDB data
    await testPage.init(indexedDBHelper, testData.sessionData, testData.commonData);

    // Check label and input value
    const inputValue = await testPage.checkLabelAndInputValue('最短お届け日');

    // If input has value, it must match YYYY/MM/DD format
    if (inputValue && inputValue.trim() !== '') {
      const dateFormatRegex = /^\d{4}\/\d{2}\/\d{2}$/;
      expect(inputValue).toMatch(dateFormatRegex);
      console.log(`[TEST] ✅ Date format is valid: ${inputValue}`);
    } else {
      // If empty, that's also acceptable
      expect(inputValue).toBe('');
      console.log('[TEST] ✅ Input is empty as expected');
    }
  });

  test('TC14 - Check input SaiBin_Lable contains text 便', async ({indexedDBHelper}) => {
    const testData = loadTestData('TY207/wty20701', 'wty20701', 'TC_01');

    // Initialize page with IndexedDB data
    await testPage.init(indexedDBHelper, testData.sessionData, testData.commonData);

    // Get input value by id
    console.log('[TEST] Getting input value for #SaiBin_Lable...');
    const inputValue = await testPage.getFieldValue('#SaiBin_Lable');
    console.log(`[TEST] Input value for #SaiBin_Lable is: ${inputValue}`);

    // Check if value contains text 便
    expect(inputValue).toContain('便');
    console.log('[TEST] ✅ Input contains text 便');
  });
});
