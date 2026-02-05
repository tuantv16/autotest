/**
 * WTY20701Page Arrage Plan Direct Delivery Test Suite
 * Tests for 手配予定照会(直送) screen using Page Object Model
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { WTY20701Page } from '../../../pages/TY207/wty20701.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';
import {API_ENDPOINTS} from "../../../constants/api-endpoints";

test.describe('WTY20701Page - Arrage Plan Direct Delivery (手配予定照会(直送))', () => {
  test.afterEach(async ({ page }, testInfo) => {
    await takeScreenshotOnFailure(page, testInfo);
  });

  test('WTY20701_21', async ({ page, baseUrl, indexedDBHelper, snapExpect }) => {
    const testData = loadTestData('TY207/wty20701', 'wty20701', 'TC_init');

    // Initialize
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    const apiResponsePromise = page.waitForResponse((res) => {
      return (
          res.request().method() === 'POST' &&
          res.url().includes(API_ENDPOINTS.TY207_WTY20701GetThiChBC)
      );
    }, { timeout: 15000 });
    const testPage = new WTY20701Page(page);
    await testPage.navigate();

    const apiResponse = await apiResponsePromise;

    // Check response status
    expect(apiResponse.status()).toBe(200);

    const response = await apiResponse.json();

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
    const verifyOutput = await testPage.verifyMultiRowCellData(response.outDS.rstHkatChDT);
    expect(verifyOutput).toBe(true);
    await snapExpect();
  });

  test('WTY20701_19', async ({ page, baseUrl, indexedDBHelper, snapExpect }) => {
    const testData = loadTestData('TY207/wty20701', 'wty20701', 'TC_api_pass');

    // Initialize
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    const apiResponsePromise = page.waitForResponse((res) => {
      return (
          res.request().method() === 'POST' &&
          res.url().includes(API_ENDPOINTS.TY207_WTY20701GetThiChBC)
      );
    }, { timeout: 15000 });
    const testPage = new WTY20701Page(page);
    await testPage.navigate();

    const apiResponse = await apiResponsePromise;

    // Check response status
    expect(apiResponse.status()).toBe(200);

    const response = await apiResponse.json();

    // Find indices of items with hkatFukaFlg == "1"
    const hkatFukaIndices = testPage.getHkatFukaIndices(response.outDS.rstHkatChDT);

    // Verify that these rows have red text color
    const result = await testPage.verifyRedTextInRows(hkatFukaIndices);

    expect(result.allRed).toBe(true);
    await snapExpect();
  });


  test('WTY20701_20', async ({ page, baseUrl, indexedDBHelper, snapExpect }) => {
    const testData = loadTestData('TY207/wty20701', 'wty20701', 'TC_init');

    // Initialize
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    const apiResponsePromise = page.waitForResponse((res) => {
      return (
          res.request().method() === 'POST' &&
          res.url().includes(API_ENDPOINTS.TY207_WTY20701GetThiChBC)
      );
    }, { timeout: 15000 });
    const testPage = new WTY20701Page(page);
    await testPage.navigate();

    const apiResponse = await apiResponsePromise;

    // Check response status
    expect(apiResponse.status()).toBe(200);

    const response = await apiResponse.json();

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
    const verifyOutput = await testPage.verifyMultiRowCellData(response.outDS.rstHkatChDT);
    expect(verifyOutput).toBe(true);
    await snapExpect();
  });

  test('WTY20701_22', async ({ page, baseUrl, indexedDBHelper, snapExpect }) => {
    const testData = loadTestData('TY207/wty20701', 'wty20701', 'TC_api');

    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    const apiResponsePromise = page.waitForResponse((res) => {
      return (
          res.request().method() === 'POST' &&
          res.url().includes(API_ENDPOINTS.TY207_WTY20701GetThiChBC)
      );
    }, { timeout: 15000 });
    const testPage = new WTY20701Page(page);
    await testPage.navigate();

    const apiResponse = await apiResponsePromise;

    // Check response status
    expect(apiResponse.status()).toBe(200);

    const response = await apiResponse.json();

    const msgID = await testPage.waitForTextInBody(response.outDS.resultDT[0].msgID, 500);
    expect(msgID).toBe(true);
    const messageErr = await testPage.waitForTextInBody(response.outDS.resultDT[0].msgArg1, 500);
    expect(messageErr).toBe(true);

    const noCellOutput = await testPage.verifyCellOutputNotExist();
    expect(noCellOutput).toBe(true);
    await snapExpect();
  });
});
