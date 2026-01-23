/**
 * WTY207010Page Arrage Plan Direct Delivery Test Suite
 * Tests for 手配予定照会(直送) screen using Page Object Model
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { WTY207010Page } from '../../../pages/TY207/wty20701.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';

test.describe('WTY207010Page - Arrage Plan Direct Delivery (手配予定照会(直送))', () => {
  test.afterEach(async ({ page }, testInfo) => {
    await takeScreenshotOnFailure(page, testInfo);
  });

  test('TC07 - Check title 手配予定照会（直送） and red text "不可" for hkatFukaFlg = 1', async ({ page, baseUrl, indexedDBHelper }) => {
    const testData = loadTestData('TY207/wty20701', 'wty20701', 'TC_init');

    // Step 1: Navigate to base URL
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

    // Step 2: Initialize IndexedDB
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    // Step 3: Navigate to target screen
    const testPage = new WTY207010Page(page);
    await testPage.navigate();

    // Step 4: Verify title
    const titleSuccess = await testPage.waitForTextInBody("手配予定照会(直送)", 500); // Increased timeout to 10s
    expect(titleSuccess).toBe(true);

    // Find indices of items with hkatFukaFlg == "1"
    const hkatFukaIndices = testPage.getHkatFukaIndices(testData.outDS.rstHkatChDT);
    const result = await testPage.verifyRedTextInRows(hkatFukaIndices);
    expect(result.allRed).toBe(true);
  });

  test('TC11 - Check field labels and data 出庫店', async ({ page, baseUrl, indexedDBHelper }) => {
    const testData = loadTestData('TY207/wty20701', 'wty20701', 'TC_init');
    // Step 1: Navigate to base URL first to establish origin for localStorage
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

    // Step 2: Initialize IndexedDB (now localStorage is accessible)
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    // Step 3: Navigate to target screen
    const testPage = new WTY207010Page(page);
    await testPage.navigate();

    // Check label and input value
    const inputValue = await testPage.checkLabelAndInputValue('出庫店', 'ＬＣ中部・ＤＣ');
    expect(inputValue).toBe('ＬＣ中部・ＤＣ');
  });

  test('TC12 - Check field labels and data 配送種類', async ({ page, baseUrl, indexedDBHelper }) => {
    const testData = loadTestData('TY207/wty20701', 'wty20701', 'TC_init');

    // Initialize
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    const testPage = new WTY207010Page(page);
    await testPage.navigate();

    // Check label and input value (no expected value, just verify it exists)
    const inputValue = await testPage.checkLabelAndInputValue('配送種類');
    expect(inputValue).toBeTruthy();
  });

  test('TC13 - Check field labels and data L/T', async ({ page, baseUrl, indexedDBHelper }) => {
    const testData = loadTestData('TY207/wty20701', 'wty20701', 'TC_init');

    // Initialize
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    const testPage = new WTY207010Page(page);
    await testPage.navigate();

    // Check label and input value
    const inputValue = await testPage.checkLabelAndInputValue('L/T', '97日');
    expect(inputValue).toBe('97日');
  });

  test('TC14 - Check field labels and data 最短お届け日', async ({ page, baseUrl, indexedDBHelper }) => {
    const testData = loadTestData('TY207/wty20701', 'wty20701', 'TC_init');

    // Initialize
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    const testPage = new WTY207010Page(page);
    await testPage.navigate();

    // Check label and input value
    const inputValue = await testPage.checkLabelAndInputValue('最短お届け日');

    // If input has value, it must match YYYY/MM/DD format
    if (inputValue && inputValue.trim() !== '') {
      const dateFormatRegex = /^\d{4}\/\d{2}\/\d{2}$/;
      expect(inputValue).toMatch(dateFormatRegex);
    } else {
      // If empty, that's also acceptable
      expect(inputValue).toBe('');
    }
  });

  test('TC15 - Check input SaiBin_Lable contains text 便', async ({ page, baseUrl, indexedDBHelper }) => {
    const testData = loadTestData('TY207/wty20701', 'wty20701', 'TC_init');

    // Initialize
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    const testPage = new WTY207010Page(page);
    await testPage.navigate();

    // Get input value by id
    const inputValue = await testPage.getFieldValue('#SaiBin_Lable');

    // Check if value contains text 便
    expect(inputValue).toContain('便');
  });

  test('TC16- Check ag-pinned-left-cols-container has sequential row numbers', async ({ page, baseUrl, indexedDBHelper }) => {
    const testData = loadTestData('TY207/wty20701', 'wty20701', 'TC_init');

    // Initialize
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    const testPage = new WTY207010Page(page);
    await testPage.navigate();

    // Check if rows in ag-pinned-left-cols-container have sequential numbers
    const result = await testPage.checkPinnedLeftRowsSequential();
    // Verify that rows have sequential numbers (1, 2, 3, ...)
    expect(result.isSequential).toBe(true);
    expect(result.rowNumbers.length).toBeGreaterThan(0);

    //verify text headers
    const textHeaders = ["型番", "数量", "引当", "ｵｰﾀﾞｰ", "発注", "発売日"];
    const headersVisible = await testPage.verifyTextHeaders(textHeaders);
    expect(headersVisible).toBe(true);

    // Verify multi-row cell data
    const verifyOutput = await testPage.verifyMultiRowCellData(testData.outDS.rstHkatChDT);
    expect(verifyOutput).toBe(true);
  });

  test('TC18 - Verify thiKbn display texts in multi-row-cell-item', async ({ page, baseUrl, indexedDBHelper }) => {
    const testData = loadTestData('TY207/wty20701', 'wty20701', 'TC_init');

    // Initialize
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    const testPage = new WTY207010Page(page);
    await testPage.navigate();

    // Get unique thiKbn display texts from test data
    const thiKbnTexts = testPage.getThiKbnDisplayTexts(testData.outDS.rstHkatChDT);

    // Verify that all thiKbn texts are displayed in multi-row-cell-item divs
    const allTextsFound = await testPage.verifyThiKbnTextsInMultiRowCells(thiKbnTexts);

    expect(allTextsFound).toBe(true);
  });
});
