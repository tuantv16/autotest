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

  test('TC20, TC21 - Check ag-pinned-left-cols-container has sequential row numbers', async ({ page, baseUrl, indexedDBHelper }) => {
    const testData = loadTestData('TY207/wty20701', 'wty20701', 'TC_init');

    // Initialize
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });
    await page.waitForTimeout(1000);

    const testPage = new WTY207010Page(page);
    await testPage.navigate();
    await page.waitForTimeout(1000);

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

  test('TC19 - Verify red text color for rows with hkatFukaFlg = 1', async ({ page, baseUrl, indexedDBHelper }) => {
    const testData = loadTestData('TY207/wty20701', 'wty20701', 'TC_init');

    // Initialize
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });
    await page.waitForTimeout(1000);

    const testPage = new WTY207010Page(page);
    await testPage.navigate();
    await page.waitForTimeout(1000);

    // Find indices of items with hkatFukaFlg == "1"
    console.log('[TEST] Finding rows with hkatFukaFlg == "1"...');
    const hkatFukaIndices = testPage.getHkatFukaIndices(testData.outDS.rstHkatChDT);
    console.log(`[TEST] Found ${hkatFukaIndices.length} rows with hkatFukaFlg == "1" at indices: [${hkatFukaIndices.join(', ')}]`);

    // Verify that these rows have red text color
    console.log('[TEST] Verifying red text color in rows with 引当不可 status...');
    const result = await testPage.verifyRedTextInRows(hkatFukaIndices);

    // Log details
    for (const detail of result.details) {
      console.log(`[TEST] Row ${detail.rowIndex}: color=${detail.color}, isRed=${detail.isRed}`);
    }

    expect(result.allRed).toBe(true);
    console.log('[TEST] ✅ All rows with hkatFukaFlg == "1" have red text color');
  });

  test('TC22 - Verify API error response with msgID TE5130 and no classCellOutput', async ({ page, baseUrl, indexedDBHelper }) => {
    const testData = loadTestData('TY207/wty20701', 'wty20701', 'TC_api');

    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });
    await page.waitForTimeout(500);

    const testPage = new WTY207010Page(page);
    await testPage.navigate();
    await page.waitForTimeout(500);

    const msgID = await testPage.waitForTextInBody(testData.outDS.resultDT[0].msgID, 500);
    expect(msgID).toBe(true);
    const messageErr = await testPage.waitForTextInBody(testData.outDS.resultDT[0].msgArg1, 500);
    expect(messageErr).toBe(true);

    console.log('[TEST] Verifying that classCellOutput elements do not exist...');
    const noCellOutput = await testPage.verifyCellOutputNotExist();
    expect(noCellOutput).toBe(true);
    console.log('[TEST] ✅ No classCellOutput elements found on page');
  });
});
