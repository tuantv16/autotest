/**
 * WTY20702Page Arrage Plan Own Delivery
 * Tests for 手配予定照会(直送) screen using Page Object Model
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { WTY20702Page } from '../../../pages/TY207/wty20702.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';
import {API_ENDPOINTS} from "../../../constants/api-endpoints";

test.describe('WTY20702Page - Arrage Plan Direct Delivery (手配予定照会(自社))', () => {
  test.afterEach(async ({ page }, testInfo) => {
    await takeScreenshotOnFailure(page, testInfo);
  });

  test('WTY20702_05 ', async ({ page, baseUrl, indexedDBHelper, snapExpect}) => {
    const testData = loadTestData('TY207/wty20702', 'wty20702', 'TC_init');

    // Step 1: Navigate to base URL
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

    // Step 2: Initialize IndexedDB
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });
    const apiResponsePromise = page.waitForResponse((res) => {
      return (
          res.request().method() === 'POST' &&
          res.url().includes(API_ENDPOINTS.TY207_WTY20702GetThiJsBC)
      );
    }, { timeout: 15000 });

    // Step 3: Navigate to target screen
    const testPage = new WTY20702Page(page);
    await testPage.navigate();

    const apiResponse = await apiResponsePromise;
    // Check response status
    expect(apiResponse.status()).toBe(200);

    const response = await apiResponse.json();
    // Step 4: Verify title
    const titleSuccess = await testPage.waitForTextInBody(testPage.Texts.textTitle, 500); // Increased timeout to 10s
    expect(titleSuccess).toBe(true);

    const headersVisible = await testPage.verifyTexts(testPage.Texts.textHeaders);
    expect(headersVisible).toBe(true);

    const textDataMkKata = await testPage.verifyTextInCellOutput(response.outDS.rstHkatJsDT[0].mkKata, 500);
    expect(textDataMkKata).toBe(true);

    const textDataJchSu = await testPage.verifyTextInCellOutput(response.outDS.rstHkatJsDT[0].jchSu, 500);
    expect(textDataJchSu).toBe(true);

    const textDataSaiChiNhnDate = await testPage.verifyTextInCellOutput(response.outDS.rstHkatJsDT[0].saiChiNhnDate, 500);
    expect(textDataSaiChiNhnDate).toBe(true);
    await snapExpect();
  });

  test('WTY20702_11', async ({ page, baseUrl, indexedDBHelper, snapExpect }) => {
    const testData = loadTestData('TY207/wty20702', 'wty20702', 'TC_init');
    // Step 1: Navigate to base URL first to establish origin for localStorage
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

    // Step 2: Initialize IndexedDB (now localStorage is accessible)
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    const apiResponsePromise = page.waitForResponse((res) => {
      return (
          res.request().method() === 'POST' &&
          res.url().includes(API_ENDPOINTS.TY207_WTY20702GetThiJsBC)
      );
    }, { timeout: 15000 });

    // Step 3: Navigate to target screen
    const testPage = new WTY20702Page(page);
    await testPage.navigate();

    const apiResponse = await apiResponsePromise;
    // Check response status
    expect(apiResponse.status()).toBe(200);

    const response = await apiResponse.json();

    // Check label and input value - Note: WTY20702 uses rstHeadJsDT (自社/Jisha) not rstHeadChDT (直送/Chokusou)
    const inputValue = await testPage.checkLabelAndInputValue(testPage.Texts.Shkoten_Text, response.outDS.rstHeadJsDT[0].shkobtenNm);
    expect(inputValue).toBe(response.outDS.rstHeadJsDT[0].shkobtenNm);
    await snapExpect();
  });

  test('WTY20702_12', async ({ page, baseUrl, indexedDBHelper, snapExpect }) => {
    const testData = loadTestData('TY207/wty20702', 'wty20702', 'TC_init');

    // Initialize
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    const apiResponsePromise = page.waitForResponse((res) => {
      return (
          res.request().method() === 'POST' &&
          res.url().includes(API_ENDPOINTS.TY207_WTY20702GetThiJsBC)
      );
    }, { timeout: 15000 });

    // Step 3: Navigate to target screen
    const testPage = new WTY20702Page(page);
    await testPage.navigate();

    const apiResponse = await apiResponsePromise;
    // Check response status
    expect(apiResponse.status()).toBe(200);

    const response = await apiResponse.json();

    // Check label and input value
    const inputValue = await testPage.checkLabelAndInputValue(testPage.Texts.SaiChiNhnDateZen_Text);

    if (!response.outDS.rstHeadJsDT[0].saiChiNhnDateZen || response.outDS.rstHeadJsDT[0].saiChiNhnDateZen.trim() === '') {
      expect(inputValue).toBe('');
    } else {
      // If has data, must match YYYY/MM/DD format
      const dateFormatRegex = /^\d{4}\/\d{2}\/\d{2}$/;
      expect(inputValue).toMatch(dateFormatRegex);
    }
    await snapExpect();
  });

  test('WTY20702_13', async ({ page, baseUrl, indexedDBHelper, snapExpect }) => {
    const testData = loadTestData('TY207/wty20702', 'wty20702', 'TC_hidden_sc');

    // Initialize
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    const testPage = new WTY20702Page(page);
    await testPage.navigate();

    const textLabel = await testPage.waitForTextInBody(testPage.Texts.scInventoryType, 500);
    expect(textLabel).toBe(false);
    await snapExpect();
  });

  test('WTY20702_14', async ({ page, baseUrl, indexedDBHelper, snapExpect }) => {
    const testData = loadTestData('TY207/wty20702', 'wty20702', 'TC_init');

    // Initialize
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    const testPage = new WTY20702Page(page);
    await testPage.navigate();

    const textLabel = await testPage.waitForTextInBody(testPage.Texts.scInventoryType, 500);
    expect(textLabel).toBe(true);

    const optionsVisible = await testPage.verifyTexts(testPage.Texts.textOptions);
    expect(optionsVisible).toBe(true);
    await snapExpect();
  });

  test('WTY20702_15', async ({ page, baseUrl, indexedDBHelper, snapExpect }) => {
    const testData = loadTestData('TY207/wty20702', 'wty20702', 'TC_init');

    // Initialize
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    const testPage = new WTY20702Page(page);
    await testPage.navigate();

    // Check if rows in ag-pinned-left-cols-container have sequential numbers
    const result = await testPage.checkPinnedLeftRowsSequential();
    // Verify that rows have sequential numbers (1, 2, 3, ...)
    expect(result.isSequential).toBe(true);
    expect(result.rowNumbers.length).toBeGreaterThan(0);
    await snapExpect();
  });

  test('WTY20702_16', async ({ page, baseUrl, indexedDBHelper, snapExpect }) => {
    const testData = loadTestData('TY207/wty20702', 'wty20702', 'TC_init');

    // Initialize
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    const apiResponsePromise = page.waitForResponse((res) => {
      return (
          res.request().method() === 'POST' &&
          res.url().includes(API_ENDPOINTS.TY207_WTY20702GetThiJsBC)
      );
    }, { timeout: 15000 });

    // Step 3: Navigate to target screen
    const testPage = new WTY20702Page(page);
    await testPage.navigate();

    const apiResponse = await apiResponsePromise;
    // Check response status
    expect(apiResponse.status()).toBe(200);

    const response = await apiResponse.json();
    const textDataMkKata = await testPage.verifyTextInCellOutput(response.outDS.rstHkatJsDT[0].mkKata, 500);
    expect(textDataMkKata).toBe(true);
    await snapExpect();
  });

  test('WTY20702_17', async ({ page, baseUrl, indexedDBHelper, snapExpect }) => {
    const testData = loadTestData('TY207/wty20702', 'wty20702', 'TC_init');

    // Initialize
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    const apiResponsePromise = page.waitForResponse((res) => {
      return (
          res.request().method() === 'POST' &&
          res.url().includes(API_ENDPOINTS.TY207_WTY20702GetThiJsBC)
      );
    }, { timeout: 15000 });

    // Step 3: Navigate to target screen
    const testPage = new WTY20702Page(page);
    await testPage.navigate();

    const apiResponse = await apiResponsePromise;
    // Check response status
    expect(apiResponse.status()).toBe(200);

    const response = await apiResponse.json();
    // Get unique thiKbn display texts from test data
    const thiKbnTexts = testPage.getThiKbnDisplayTexts(response.outDS.rstHkatJsDT);

    // Verify that all thiKbn texts are displayed in multi-row-cell-item divs
    const allTextsFound = await testPage.verifyThiKbnTextsInMultiRowCells(thiKbnTexts);

    expect(allTextsFound).toBe(true);
    await snapExpect();
  });

  test('WTY20702_18', async ({ page, baseUrl, indexedDBHelper, snapExpect }) => {
    const testData = loadTestData('TY207/wty20702', 'wty20702', 'TC_init');
    // Initialize
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });
    const apiResponsePromise = page.waitForResponse((res) => {
      return (
          res.request().method() === 'POST' &&
          res.url().includes(API_ENDPOINTS.TY207_WTY20702GetThiJsBC)
      );
    }, { timeout: 15000 });

    // Step 3: Navigate to target screen
    const testPage = new WTY20702Page(page);
    await testPage.navigate();

    const apiResponse = await apiResponsePromise;
    // Check response status
    expect(apiResponse.status()).toBe(200);

    const response = await apiResponse.json();
    const textDataBtrKbn = await testPage.verifyTextInCellOutput(response.outDS.rstHkatJsDT[0].btrKbn, 500);
    expect(textDataBtrKbn).toBe(true);
    await snapExpect();
  });

  test('WTY20702_19', async ({ page, baseUrl, indexedDBHelper, snapExpect }) => {
    const testData = loadTestData('TY207/wty20702', 'wty20702', 'TC_init');

    // Initialize
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    const apiResponsePromise = page.waitForResponse((res) => {
      return (
          res.request().method() === 'POST' &&
          res.url().includes(API_ENDPOINTS.TY207_WTY20702GetThiJsBC)
      );
    }, { timeout: 15000 });

    // Step 3: Navigate to target screen
    const testPage = new WTY20702Page(page);
    await testPage.navigate();

    const apiResponse = await apiResponsePromise;
    // Check response status
    expect(apiResponse.status()).toBe(200);

    const response = await apiResponse.json();
    // Get unique zaiJt display texts from test data
    const zaiJtTexts = testPage.getZaiJtDisplayTexts(response.outDS.rstHkatJsDT);

    // Verify that all zaiJt texts are displayed in multi-row-cell-item divs
    const allTextsFound = await testPage.verifyZaiJtTextsInMultiRowCells(zaiJtTexts);

    expect(allTextsFound).toBe(true);
    await snapExpect();
  });

  test('WTY20702_20', async ({ page, baseUrl, indexedDBHelper, snapExpect }) => {
    const testData = loadTestData('TY207/wty20702', 'wty20702', 'TC_init');

    // Initialize
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });
    const apiResponsePromise = page.waitForResponse((res) => {
      return (
          res.request().method() === 'POST' &&
          res.url().includes(API_ENDPOINTS.TY207_WTY20702GetThiJsBC)
      );
    }, { timeout: 15000 });

    // Step 3: Navigate to target screen
    const testPage = new WTY20702Page(page);
    await testPage.navigate();

    const apiResponse = await apiResponsePromise;
    // Check response status
    expect(apiResponse.status()).toBe(200);

    const response = await apiResponse.json();
    const textDataJchSu = await testPage.verifyTextInCellOutput(response.outDS.rstHkatJsDT[0].jchSu, 500);
    expect(textDataJchSu).toBe(true);
    await snapExpect();
  });

  test('WTY20702_21', async ({ page, baseUrl, indexedDBHelper, snapExpect }) => {
    const testData = loadTestData('TY207/wty20702', 'wty20702', 'TC_init');

    // Initialize
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    const apiResponsePromise = page.waitForResponse((res) => {
      return (
          res.request().method() === 'POST' &&
          res.url().includes(API_ENDPOINTS.TY207_WTY20702GetThiJsBC)
      );
    }, { timeout: 15000 });

    // Step 3: Navigate to target screen
    const testPage = new WTY20702Page(page);
    await testPage.navigate();

    const apiResponse = await apiResponsePromise;
    // Check response status
    expect(apiResponse.status()).toBe(200);

    const response = await apiResponse.json();

    if (!response.outDS.rstHkatJsDT[0].saiChiNhnDate) {
      const textDataSaiChiNhnDate = await testPage.verifyTextInCellOutput('不可', 500);
      expect(textDataSaiChiNhnDate).toBe(true);
    } else {
      const textDataSaiChiNhnDate = await testPage.verifyTextInCellOutput(response.outDS.rstHkatJsDT[0].saiChiNhnDate, 500);
      expect(textDataSaiChiNhnDate).toBe(true);
    }
    await snapExpect();
  });

  test('WTY20702_24', async ({ page, baseUrl, indexedDBHelper, snapExpect }) => {
    const testData = loadTestData('TY207/wty20702', 'wty20702', 'TC_init');

    // Initialize
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    const apiResponsePromise = page.waitForResponse((res) => {
      return (
          res.request().method() === 'POST' &&
          res.url().includes(API_ENDPOINTS.TY207_WTY20702GetThiJsBC)
      );
    }, { timeout: 15000 });

    // Step 3: Navigate to target screen
    const testPage = new WTY20702Page(page);
    await testPage.navigate();

    const apiResponse = await apiResponsePromise;
    // Check response status
    expect(apiResponse.status()).toBe(200);

    const response = await apiResponse.json();
    // Get unique thiKbn display texts from test data
    const thiKbnTexts = testPage.getThiKbnDisplayTexts(response.outDS.rstHkatJsDT);

    // Verify that all thiKbn texts are displayed in multi-row-cell-item divs
    const allTextsFound = await testPage.verifyThiKbnTextsInMultiRowCells(thiKbnTexts);

    expect(allTextsFound).toBe(true);
    await snapExpect();
  });

  test('WTY20702_25', async ({ page, baseUrl, indexedDBHelper, snapExpect }) => {
    const testData = loadTestData('TY207/wty20702', 'wty20702', 'TC_init');

    // Initialize
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    const apiResponsePromise = page.waitForResponse((res) => {
      return (
          res.request().method() === 'POST' &&
          res.url().includes(API_ENDPOINTS.TY207_WTY20702GetThiJsBC)
      );
    }, { timeout: 15000 });

    // Step 3: Navigate to target screen
    const testPage = new WTY20702Page(page);
    await testPage.navigate();

    const apiResponse = await apiResponsePromise;
    // Check response status
    expect(apiResponse.status()).toBe(200);

    const response = await apiResponse.json();
    // Get unique zaiJt display texts from test data
    const zaiJtTexts = testPage.getZaiJtDisplayTexts(response.outDS.rstHkatJsDT);

    // Verify that all zaiJt texts are displayed in multi-row-cell-item divs
    const allTextsFound = await testPage.verifyZaiJtTextsInMultiRowCells(zaiJtTexts);

    expect(allTextsFound).toBe(true);
    await snapExpect();
  });

  test('WTY20702_27', async ({ page, baseUrl, indexedDBHelper, snapExpect }) => {
    const testData = loadTestData('TY207/wty20702', 'wty20702', 'TC_init');

    // Initialize
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });
    const apiResponsePromise = page.waitForResponse((res) => {
      return (
          res.request().method() === 'POST' &&
          res.url().includes(API_ENDPOINTS.TY207_WTY20702GetThiJsBC)
      );
    }, { timeout: 15000 });
    const testPage = new WTY20702Page(page);
    await testPage.navigate();
    const apiResponse = await apiResponsePromise;

    // Check response status
    expect(apiResponse.status()).toBe(200);

    // Get and verify request payload
    const requestPayload = apiResponse.request().postDataJSON();

    // Get and verify response payload
    const responsePayload = await apiResponse.json();

    // Verify response structure (add your specific checks)
    expect(requestPayload).toBeDefined();
    expect(responsePayload.outDS).toBeDefined();

    // Example: Check specific fields in response
    if (responsePayload.outDS.rstHkatJsDT) {
      expect(Array.isArray(responsePayload.outDS.rstHkatJsDT)).toBe(true);
    }
    await snapExpect();
  });

  test('WTY20702_26', async ({ page, baseUrl, indexedDBHelper, snapExpect }) => {
    const testData = loadTestData('TY207/wty20702', 'wty20702', 'TC_output_red');

    // Initialize
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    const apiResponsePromise = page.waitForResponse((res) => {
      return (
          res.request().method() === 'POST' &&
          res.url().includes(API_ENDPOINTS.TY207_WTY20702GetThiJsBC)
      );
    }, { timeout: 15000 });

    // Step 3: Navigate to target screen
    const testPage = new WTY20702Page(page);
    await testPage.navigate();

    const apiResponse = await apiResponsePromise;
    // Check response status
    expect(apiResponse.status()).toBe(200);

    const response = await apiResponse.json();

    // Verify that red text exists in cells
    const hasRedText = await testPage.verifyRedTextInCells(undefined, 5000);
    expect(hasRedText).toBe(true);

    // Verify specific data that should be in red (from test data where hkatFukaFlg is true)
    if (response.outDS.rstHkatJsDT[0].hkatFukaFlg === 'true') {
      // Check if mkKata is displayed in red
      const mkKataInRed = await testPage.verifyRedTextInCells(response.outDS.rstHkatJsDT[0].mkKata, 5000);
      expect(mkKataInRed).toBe(true);

      // Check if jchSu is displayed in red
      const jchSuInRed = await testPage.verifyRedTextInCells(response.outDS.rstHkatJsDT[0].jchSu, 5000);
      expect(jchSuInRed).toBe(true);

      // Check if saiChiNhnDate is displayed in red
      const saiChiNhnDateInRed = await testPage.verifyRedTextInCells(response.outDS.rstHkatJsDT[0].saiChiNhnDate, 5000);
      expect(saiChiNhnDateInRed).toBe(true);
    }
    await snapExpect();
  });

  test('WTY20702_28', async ({ page, baseUrl, indexedDBHelper, snapExpect }) => {
    const testData = loadTestData('TY207/wty20702', 'wty20702', 'TC_init');

    // Initialize
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });
    const apiResponsePromise = page.waitForResponse((res) => {
      return (
          res.request().method() === 'POST' &&
          res.url().includes(API_ENDPOINTS.TY207_WTY20702GetThiJsBC)
      );
    }, { timeout: 15000 });
    const testPage = new WTY20702Page(page);
    await testPage.navigate();

    const apiResponse = await apiResponsePromise;

    // Check response status
    expect(apiResponse.status()).toBe(200);

    const response = await apiResponse.json();
    expect(response.outDS).toBeDefined();
    expect(response.outDS.resultDT[0].resultKbn).toEqual("0");

    const shkotenValue = await testPage.checkLabelAndInputValue(testPage.Texts.Shkoten_Text, response.outDS.rstHeadJsDT[0].shkobtenNm);
    expect(shkotenValue).toBe(response.outDS.rstHeadJsDT[0].shkobtenNm);

    const saiChiNhnDateZenValue = await testPage.checkLabelAndInputValue(testPage.Texts.SaiChiNhnDateZen_Text);

    if (!response.outDS.rstHeadJsDT[0].saiChiNhnDateZen || response.outDS.rstHeadJsDT[0].saiChiNhnDateZen.trim() === '') {
      expect(saiChiNhnDateZenValue).toBe('');
    } else {
      // If has data, must match YYYY/MM/DD format
      const dateFormatRegex = /^\d{4}\/\d{2}\/\d{2}$/;
      expect(saiChiNhnDateZenValue).toMatch(dateFormatRegex);
    }
    const textDataMkKata = await testPage.verifyTextInCellOutput(response.outDS.rstHkatJsDT[0].mkKata, 500);
    expect(textDataMkKata).toBe(true);

    const textDataBtrKbn = await testPage.verifyTextInCellOutput(response.outDS.rstHkatJsDT[0].btrKbn, 500);
    expect(textDataBtrKbn).toBe(true);

    const textDataJchSu = await testPage.verifyTextInCellOutput(response.outDS.rstHkatJsDT[0].jchSu, 500);
    expect(textDataJchSu).toBe(true);
    await snapExpect();
  });

  test('WTY20702_29', async ({ page, baseUrl, indexedDBHelper, snapExpect }) => {
    const testData = loadTestData('TY207/wty20702', 'wty20702', 'TC_api_error');

    // Initialize
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });
    const apiResponsePromise = page.waitForResponse((res) => {
      return (
          res.request().method() === 'POST' &&
          res.url().includes(API_ENDPOINTS.TY207_WTY20702GetThiJsBC)
      );
    }, { timeout: 15000 });
    const testPage = new WTY20702Page(page);
    await testPage.navigate();

    const apiResponse = await apiResponsePromise;

    // Check response status
    expect(apiResponse.status()).toBe(200);

    const response = await apiResponse.json();
    expect(response.outDS).toBeDefined();
    expect(response.outDS.resultDT[0].resultKbn).toEqual("1");

    const idErrorMessage= await testPage.waitForTextInBody(await response.outDS.resultDT[0].msgID);
    expect(idErrorMessage).toBe(true);

    const messageError= await testPage.waitForTextInBody(await response.outDS.resultDT[0].msgArg1);
    expect(messageError).toBe(true);
    await snapExpect();
  });

  test('WTY20702_31', async ({ page, baseUrl, indexedDBHelper, snapExpect }) => {
    const testData = loadTestData('TY207/wty20702', 'wty20702', 'TC_init');
    // Step 1: Navigate to base URL first to establish origin for localStorage
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

    // Step 2: Initialize IndexedDB (now localStorage is accessible)
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    // Step 3: Navigate to target screen
    const testPage = new WTY20702Page(page);
    await testPage.navigate();

    await testPage.clickSpanByText(testPage.Texts.textSC1);
    const isHighlighted = await testPage.verifyHighlight(testPage.Texts.textSC1, testPage.Locators.highlight);
    expect(isHighlighted).toBe(true);

    let isNotHighlighted = await testPage.verifyHighlight(testPage.Texts.textSC2, testPage.Locators.highlight);
    expect(isNotHighlighted).toBe(false);

    isNotHighlighted = await testPage.verifyHighlight(testPage.Texts.textSC3, testPage.Locators.highlight);
    expect(isNotHighlighted).toBe(false);
    await snapExpect();
  });

  test('WTY20702_32', async ({ page, baseUrl, indexedDBHelper, snapExpect }) => {
    const testData = loadTestData('TY207/wty20702', 'wty20702', 'TC_init');
    // Step 1: Navigate to base URL first to establish origin for localStorage
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

    // Step 2: Initialize IndexedDB (now localStorage is accessible)
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    // Step 3: Navigate to target screen
    const testPage = new WTY20702Page(page);
    await testPage.navigate();

    await testPage.clickSpanByText(testPage.Texts.textSC2);
    const isHighlighted = await testPage.verifyHighlight(testPage.Texts.textSC2, testPage.Locators.highlight);
    expect(isHighlighted).toBe(true);

    let isNotHighlighted = await testPage.verifyHighlight(testPage.Texts.textSC1, testPage.Locators.highlight);
    expect(isNotHighlighted).toBe(false);

    isNotHighlighted = await testPage.verifyHighlight(testPage.Texts.textSC3, testPage.Locators.highlight);
    expect(isNotHighlighted).toBe(false);
    await snapExpect();
  });

  test('WTY20702_33', async ({ page, baseUrl, indexedDBHelper, snapExpect }) => {
    const testData = loadTestData('TY207/wty20702', 'wty20702', 'TC_init');
    // Step 1: Navigate to base URL first to establish origin for localStorage
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

    // Step 2: Initialize IndexedDB (now localStorage is accessible)
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    // Step 3: Navigate to target screen
    const testPage = new WTY20702Page(page);
    await testPage.navigate();

    await testPage.clickSpanByText(testPage.Texts.textSC3);
    const isHighlighted = await testPage.verifyHighlight(testPage.Texts.textSC3, testPage.Locators.highlight);
    expect(isHighlighted).toBe(true);

    let isNotHighlighted = await testPage.verifyHighlight(testPage.Texts.textSC1, testPage.Locators.highlight);
    expect(isNotHighlighted).toBe(false);

    isNotHighlighted = await testPage.verifyHighlight(testPage.Texts.textSC2, testPage.Locators.highlight);
    expect(isNotHighlighted).toBe(false);
    await snapExpect();
  });

  test('WTY20702_34', async ({ page, baseUrl, indexedDBHelper, snapExpect }) => {
    const testData = loadTestData('TY207/wty20702', 'wty20702', 'TC_init');
    // Step 1: Navigate to base URL first to establish origin for localStorage
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

    // Step 2: Initialize IndexedDB (now localStorage is accessible)
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    // Step 3: Navigate to target screen
    const testPage = new WTY20702Page(page);
    await testPage.navigate();

    await testPage.clickSpanByText(testPage.Texts.textSC1);
    await snapExpect(0);
    await testPage.clickSpanByText(testPage.Texts.textSC2);
    await snapExpect(1);
    await testPage.clickSpanByText(testPage.Texts.textSC3);
    await snapExpect(2);
    await testPage.clickSpanByText(testPage.Texts.textSC1);
    const isHighlighted = await testPage.verifyHighlight(testPage.Texts.textSC1, testPage.Locators.highlight);
    expect(isHighlighted).toBe(true);

    let isNotHighlighted = await testPage.verifyHighlight(testPage.Texts.textSC2, testPage.Locators.highlight);
    expect(isNotHighlighted).toBe(false);

    isNotHighlighted = await testPage.verifyHighlight(testPage.Texts.textSC3, testPage.Locators.highlight);
    expect(isNotHighlighted).toBe(false);
    await snapExpect(3);
  });

  test('WTY20702_35', async ({ page, baseUrl, indexedDBHelper, snapExpect }) => {
    const testData = loadTestData('TY207/wty20702', 'wty20702', 'TC_init');
    // Step 1: Navigate to base URL first to establish origin for localStorage
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

    // Step 2: Initialize IndexedDB (now localStorage is accessible)
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });
    const testPage = new WTY20702Page(page);
    await testPage.navigate();
    await testPage.clickSpanByText(testPage.Texts.textSC1);
    await testPage.clickButtonByText(testPage.Texts.textSearch)
    const apiResponsePromise = page.waitForResponse((res) => {
      return (
          res.request().method() === 'POST' &&
          res.url().includes(API_ENDPOINTS.TY207_WTY20702GetThiJsBC)
      );
    }, { timeout: 15000 });
    const apiResponse = await apiResponsePromise;
    const payload = apiResponse.request().postDataJSON();
    expect(payload.inDS.searchJknJsDT[0].scZaikoTesuKbn).toBe("1");
    // Check response status
    expect(apiResponse.status()).toBe(200);

    const response = await apiResponse.json();
    expect(response.outDS).toBeDefined();
    expect(response.outDS.resultDT[0].resultKbn).toEqual("0");

    const shkotenValue = await testPage.checkLabelAndInputValue(testPage.Texts.Shkoten_Text, response.outDS.rstHeadJsDT[0].shkobtenNm);
    expect(shkotenValue).toBe(response.outDS.rstHeadJsDT[0].shkobtenNm);

    const saiChiNhnDateZenValue = await testPage.checkLabelAndInputValue(testPage.Texts.SaiChiNhnDateZen_Text);

    // If response.outDS.rstHeadJsDT[0].saiChiNhnDateZen is empty, expect empty
    if (!response.outDS.rstHeadJsDT[0].saiChiNhnDateZen || response.outDS.rstHeadJsDT[0].saiChiNhnDateZen.trim() === '') {
      expect(saiChiNhnDateZenValue).toBe('');
    } else {
      // If has data, must match YYYY/MM/DD format
      const dateFormatRegex = /^\d{4}\/\d{2}\/\d{2}$/;
      expect(saiChiNhnDateZenValue).toMatch(dateFormatRegex);
    }

    // Verify specific data that should be in red (from test data where hkatFukaFlg is true)
    if (response.outDS.rstHkatJsDT[0].hkatFukaFlg === 'true') {
      // Check if mkKata is displayed in red
      const mkKataInRed = await testPage.verifyRedTextInCells(response.outDS.rstHkatJsDT[0].mkKata, 500);
      expect(mkKataInRed).toBe(true);

      // Check if jchSu is displayed in red
      const jchSuInRed = await testPage.verifyRedTextInCells(response.outDS.rstHkatJsDT[0].jchSu, 500);
      expect(jchSuInRed).toBe(true);

      // Check if saiChiNhnDate is displayed in red
      const saiChiNhnDateInRed = await testPage.verifyRedTextInCells(response.outDS.rstHkatJsDT[0].saiChiNhnDate, 500);
      expect(saiChiNhnDateInRed).toBe(true);
    }
    await snapExpect();
  });

  test('WTY20702_36', async ({ page, baseUrl, indexedDBHelper, snapExpect }) => {
    const testData = loadTestData('TY207/wty20702', 'wty20702', 'TC_init');
    // Step 1: Navigate to base URL first to establish origin for localStorage
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

    // Step 2: Initialize IndexedDB (now localStorage is accessible)
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });
    const testPage = new WTY20702Page(page);
    await testPage.navigate();
    await testPage.clickSpanByText(testPage.Texts.textSC2);
    await testPage.clickButtonByText(testPage.Texts.textSearch)
    const apiResponsePromise = page.waitForResponse((res) => {
      return (
          res.request().method() === 'POST' &&
          res.url().includes(API_ENDPOINTS.TY207_WTY20702GetThiJsBC)
      );
    }, { timeout: 15000 });

    const apiResponse = await apiResponsePromise;
    const payload = apiResponse.request().postDataJSON();
    expect(payload.inDS.searchJknJsDT[0].scZaikoTesuKbn).toBe("2");
    // Check response status
    expect(apiResponse.status()).toBe(200);

    const response = await apiResponse.json();
    expect(response.outDS).toBeDefined();
    expect(response.outDS.resultDT[0].resultKbn).toEqual("0");

    const shkotenValue = await testPage.checkLabelAndInputValue(testPage.Texts.Shkoten_Text, response.outDS.rstHeadJsDT[0].shkobtenNm);
    expect(shkotenValue).toBe(response.outDS.rstHeadJsDT[0].shkobtenNm);

    const saiChiNhnDateZenValue = await testPage.checkLabelAndInputValue(testPage.Texts.SaiChiNhnDateZen_Text);

    // If response.outDS.rstHeadJsDT[0].saiChiNhnDateZen is empty, expect empty
    if (!response.outDS.rstHeadJsDT[0].saiChiNhnDateZen || response.outDS.rstHeadJsDT[0].saiChiNhnDateZen.trim() === '') {
      expect(saiChiNhnDateZenValue).toBe('');
    } else {
      // If has data, must match YYYY/MM/DD format
      const dateFormatRegex = /^\d{4}\/\d{2}\/\d{2}$/;
      expect(saiChiNhnDateZenValue).toMatch(dateFormatRegex);
    }

    // Verify specific data that should be in red (from test data where hkatFukaFlg is true)
    if (response.outDS.rstHkatJsDT[0].hkatFukaFlg === 'true') {
      // Check if mkKata is displayed in red
      const mkKataInRed = await testPage.verifyRedTextInCells(response.outDS.rstHkatJsDT[0].mkKata, 500);
      expect(mkKataInRed).toBe(true);

      // Check if jchSu is displayed in red
      const jchSuInRed = await testPage.verifyRedTextInCells(response.outDS.rstHkatJsDT[0].jchSu, 500);
      expect(jchSuInRed).toBe(true);

      // Check if saiChiNhnDate is displayed in red
      const saiChiNhnDateInRed = await testPage.verifyRedTextInCells(response.outDS.rstHkatJsDT[0].saiChiNhnDate, 500);
      expect(saiChiNhnDateInRed).toBe(true);
    }
    await snapExpect();
  });

  test('WTY20702_37', async ({ page, baseUrl, indexedDBHelper, snapExpect }) => {
    const testData = loadTestData('TY207/wty20702', 'wty20702', 'TC_init');
    // Step 1: Navigate to base URL first to establish origin for localStorage
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

    // Step 2: Initialize IndexedDB (now localStorage is accessible)
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });
    const testPage = new WTY20702Page(page);
    await testPage.navigate();
    await testPage.clickSpanByText(testPage.Texts.textSC3);
    await testPage.clickButtonByText(testPage.Texts.textSearch)
    const apiResponsePromise = page.waitForResponse((res) => {
      return (
          res.request().method() === 'POST' &&
          res.url().includes(API_ENDPOINTS.TY207_WTY20702GetThiJsBC)
      );
    }, { timeout: 15000 });

    const apiResponse = await apiResponsePromise;
    const payload = apiResponse.request().postDataJSON();
    expect(payload.inDS.searchJknJsDT[0].scZaikoTesuKbn).toBe("3");
    // Check response status
    expect(apiResponse.status()).toBe(200);

    const response = await apiResponse.json();
    expect(response.outDS).toBeDefined();
    expect(response.outDS.resultDT[0].resultKbn).toEqual("0");

    const shkotenValue = await testPage.checkLabelAndInputValue(testPage.Texts.Shkoten_Text, response.outDS.rstHeadJsDT[0].shkobtenNm);
    expect(shkotenValue).toBe(response.outDS.rstHeadJsDT[0].shkobtenNm);

    const saiChiNhnDateZenValue = await testPage.checkLabelAndInputValue(testPage.Texts.SaiChiNhnDateZen_Text);

    // If response.outDS.rstHeadJsDT[0].saiChiNhnDateZen is empty, expect empty
    if (!response.outDS.rstHeadJsDT[0].saiChiNhnDateZen || response.outDS.rstHeadJsDT[0].saiChiNhnDateZen.trim() === '') {
      expect(saiChiNhnDateZenValue).toBe('');
    } else {
      // If has data, must match YYYY/MM/DD format
      const dateFormatRegex = /^\d{4}\/\d{2}\/\d{2}$/;
      expect(saiChiNhnDateZenValue).toMatch(dateFormatRegex);
    }

    // Verify specific data that should be in red (from test data where hkatFukaFlg is true)
    if (response.outDS.rstHkatJsDT[0].hkatFukaFlg === 'true') {
      // Check if mkKata is displayed in red
      const mkKataInRed = await testPage.verifyRedTextInCells(response.outDS.rstHkatJsDT[0].mkKata, 500);
      expect(mkKataInRed).toBe(true);

      // Check if jchSu is displayed in red
      const jchSuInRed = await testPage.verifyRedTextInCells(response.outDS.rstHkatJsDT[0].jchSu, 500);
      expect(jchSuInRed).toBe(true);

      // Check if saiChiNhnDate is displayed in red
      const saiChiNhnDateInRed = await testPage.verifyRedTextInCells(response.outDS.rstHkatJsDT[0].saiChiNhnDate, 500);
      expect(saiChiNhnDateInRed).toBe(true);
    }
    await snapExpect();
  });
});
