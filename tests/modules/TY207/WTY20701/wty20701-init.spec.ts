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
    console.log('[TEST] Loading base page to establish origin...');
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

    // Step 2: Initialize IndexedDB
    console.log('[TEST] Injecting IndexedDB data...');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    // Step 3: Navigate to target screen
    const testPage = new WTY207010Page(page);
    console.log('[TEST] Navigating to WTY20701 screen...');
    await testPage.navigate();

    // Step 4: Verify title
    console.log('[TEST] Checking title 手配予定照会（直送）...');
    const titleSuccess = await testPage.waitForTextInBody("手配予定照会(直送)", 500); // Increased timeout to 10s
    expect(titleSuccess).toBe(true);
    console.log('[TEST] ✅ Title verified successfully');

    // Find indices of items with hkatFukaFlg == "1"
    const hkatFukaIndices = testPage.getHkatFukaIndices(testData.outDS.rstHkatChDT);
    console.log('[TEST] Verifying red text color in rows with 引当不可 status...');
    const result = await testPage.verifyRedTextInRows(hkatFukaIndices);
    // Log details
    for (const detail of result.details) {
      console.log(`[TEST] Row ${detail.rowIndex}: color=${detail.color}, isRed=${detail.isRed}`);
    }
    expect(result.allRed).toBe(true);
    console.log('[TEST] ✅ All rows with hkatFukaFlg == "1" have red text color');
  });

  test('TC11 - Check field labels and data 出庫店', async ({ page, baseUrl, indexedDBHelper }) => {
    const testData = loadTestData('TY207/wty20701', 'wty20701', 'TC_init');
    // Step 1: Navigate to base URL first to establish origin for localStorage
    console.log('[TEST] Loading base page to establish origin...');
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

    // Step 2: Initialize IndexedDB (now localStorage is accessible)
    console.log('[TEST] Injecting IndexedDB data...');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    // Step 3: Navigate to target screen
    const testPage = new WTY207010Page(page);
    console.log('[TEST] Navigating to WTY20701 screen...');
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
      console.log(`[TEST] ✅ Date format is valid: ${inputValue}`);
    } else {
      // If empty, that's also acceptable
      expect(inputValue).toBe('');
      console.log('[TEST] ✅ Input is empty as expected');
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
    console.log('[TEST] Getting input value for #SaiBin_Lable...');
    const inputValue = await testPage.getFieldValue('#SaiBin_Lable');
    console.log(`[TEST] Input value for #SaiBin_Lable is: ${inputValue}`);

    // Check if value contains text 便
    expect(inputValue).toContain('便');
    console.log('[TEST] ✅ Input contains text 便');
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
    console.log('[TEST] Checking sequential row numbers in ag-pinned-left-cols-container...');
    const result = await testPage.checkPinnedLeftRowsSequential();

    console.log(`[TEST] Found ${result.rowNumbers.length} rows with numbers: [${result.rowNumbers.join(', ')}]`);

    if (result.error) {
      console.error(`[TEST] ❌ Error: ${result.error}`);
    }

    // Verify that rows have sequential numbers (1, 2, 3, ...)
    expect(result.isSequential).toBe(true);
    expect(result.rowNumbers.length).toBeGreaterThan(0);
    console.log('[TEST] ✅ Row numbers are sequential');

    //verify text headers
    const textHeaders = ["型番", "数量", "引当", "ｵｰﾀﾞｰ", "発注", "発売日"];
    const headersVisible = await testPage.verifyTextHeaders(textHeaders);
    expect(headersVisible).toBe(true);
    console.log('[TEST] ✅ All text headers are visible');

    // Verify multi-row cell data
    const verifyOutput = await testPage.verifyMultiRowCellData(testData.outDS.rstHkatChDT);
    expect(verifyOutput).toBe(true);
    console.log('[TEST] ✅ All multi-row cell data verified successfully');
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
    console.log('[TEST] Extracting thiKbn display texts from test data...');
    const thiKbnTexts = testPage.getThiKbnDisplayTexts(testData.outDS.rstHkatChDT);
    console.log(`[TEST] Found ${thiKbnTexts.size} unique thiKbn texts: ${Array.from(thiKbnTexts).join(', ')}`);

    // Verify that all thiKbn texts are displayed in multi-row-cell-item divs
    console.log('[TEST] Verifying thiKbn texts in multi-row-cell-item divs...');
    const allTextsFound = await testPage.verifyThiKbnTextsInMultiRowCells(thiKbnTexts);

    expect(allTextsFound).toBe(true);
    console.log('[TEST] ✅ All thiKbn display texts verified successfully');
  });
});
