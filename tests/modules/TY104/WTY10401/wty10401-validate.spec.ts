/**
 * WTY10401 Summary Input Test Suite
 * Tests for 摘要欄入力 screen using Page Object Model
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { TY1040Page } from '../../../pages/TY104/wty10401.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';
import { COMMON_MESSAGES, VALIDATION_ERROR_MESSAGES } from '../../../constants/messages';
import { API_ENDPOINTS } from '../../../constants/api-endpoints';

test.describe('WTY10401 - (店別在庫照会)', () => {
    let summaryPage: TY1040Page;

    test.beforeEach(async ({ page, baseUrl }) => {
        summaryPage = new TY1040Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('WTY10401_24', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_04');
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        // Step 3: Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        // Step 4: Click on move down button
        await summaryPage.clickMoveDown();
        await page.waitForTimeout(1000);

        // Step 5: Click search button
        await summaryPage.clickSearchButton();

        await page.waitForTimeout(2000);

        const isErrorMessageVisible = await summaryPage.verifyErrorMessageInvalid(testData.formData.shnCd_24);
        expect(isErrorMessageVisible).toBe(true);
        
        await snapExpect();
    });

    test('WTY10401_25', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_04');
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        // Step 3: Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        // Step 4: Click on move down button
        await summaryPage.clickMoveDown();
        await page.waitForTimeout(1000);

        // Step 5: Fill product code with invalid length (7 characters)
        await summaryPage.fillInputShnCd(testData.formData.shnCd_25);
        await page.waitForTimeout(1000);

        // Step 6: Click search button
        await summaryPage.clickSearchButton();
        await page.waitForTimeout(2000);

        // Step 7: Verify error message for invalid length
        const isErrorMessageVisible = await summaryPage.isErrorMessageVisible(VALIDATION_ERROR_MESSAGES.INVALID_LENGTH, '商品');
        expect(isErrorMessageVisible).toBe(true);
        
        await snapExpect();
    });

    test('WTY10401_26', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_04');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.clickMoveDown();
        await page.waitForTimeout(1000);

        await summaryPage.fillInputShnCd(testData.formData.shnCd_26);
        await page.waitForTimeout(1000);

        await snapInput();
        // Wait for API response before clicking search button
        const apiResponsePromise = page.waitForResponse((res) => {
            return (
                res.request().method() === 'POST' &&
                res.url().includes(API_ENDPOINTS.TY104_WTY10411ZaiInfoGetBC)
            );
        }, { timeout: 15000 });

        // Click search button and wait for API response
        await summaryPage.clickSearchButton();

        // Wait for API response to complete
        const apiResponse = await apiResponsePromise;
        expect(apiResponse.status()).toBe(200);

        // Wait a bit for UI to update after search
        await page.waitForTimeout(2000);
        
        await snapExpect();
    });

    test('WTY10401_27', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_04');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.clickMoveDown();
        await page.waitForTimeout(1000);

        await summaryPage.fillInputShnCd(testData.formData.shnCd_27);
        await page.waitForTimeout(1000);

        const jgyksCdValue = testData.formData.jgyksCd_27;
        await summaryPage.selectComboboxOptionByValue(jgyksCdValue);
        await snapInput();
        // Wait for API response before clicking search button
        const apiResponsePromise = page.waitForResponse((res) => {
            return (
                res.request().method() === 'POST' &&
                res.url().includes(API_ENDPOINTS.TY104_WTY10411ZaiInfoGetBC)
            );
        }, { timeout: 15000 });

        // Click search button and wait for API response
        await summaryPage.clickSearchButton();
        await page.waitForTimeout(1000);
        await snapExpect(1);
        // Wait for API response to complete
        const apiResponse = await apiResponsePromise;
        expect(apiResponse.status()).toBe(200);

        await summaryPage.scrollToBottom();
        await page.waitForTimeout(1000);
        await snapExpect(2);
    });

    test('WTY10401_28', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_04');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.clickMoveDown();
        await page.waitForTimeout(1000);

        await summaryPage.fillInputShnCd(testData.formData.shnCd_28);
        await page.waitForTimeout(1000);

        // Wait for API response before clicking search button
        const apiResponsePromise = page.waitForResponse((res) => {
            return (
                res.request().method() === 'POST' &&
                res.url().includes(API_ENDPOINTS.TY104_WTY10411ZaiInfoGetBC)
            );
        }, { timeout: 15000 });

        // Click search button and wait for API response
        await summaryPage.clickSearchButton();
        await page.waitForTimeout(1000);
        await snapExpect(1);

        // Wait for API response to complete
        const apiResponse = await apiResponsePromise;
        expect(apiResponse.status()).toBe(200);
        
        await summaryPage.scrollToBottom();
        await page.waitForTimeout(1000);
        await snapExpect(2);
    });

    test('WTY10401_29', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {

        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_04');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.fillInputShnCd(testData.formData.shnCd_29);
        await page.waitForTimeout(1000);

        await summaryPage.clickMoveDown();

        await page.waitForTimeout(1000);
        await snapInput();

        await summaryPage.clickSearchButton();
        const shnCdValue = await summaryPage.getValueById('shnCd');
        expect(shnCdValue).toBe( testData.formData.shnCd_29_expected);
        
        await snapExpect(1);
        await summaryPage.scrollToBottom();
        await page.waitForTimeout(1000);
        await snapExpect(2);
    });

    test('WTY10401_30', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {

        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_04');
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        // Step 3: Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.fillInputShnCd(testData.formData.shnCd_30);
        await page.waitForTimeout(1000);
        await snapInput();
        await summaryPage.blurShnCd();
       
        await page.waitForTimeout(500); // Wait for validation error to appear
        expect(await summaryPage.hasErrorBorderShnCd()).toBe(true);
        await snapExpect();

    });

    test('WTY10401_31', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {

        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_04');
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.fillInputShnCd(testData.formData.shnCd_30);
        await page.waitForTimeout(1000);
        await snapInput();

        await summaryPage.blurShnCd();
        
        await summaryPage.focusShnCd();
        await page.waitForTimeout(2000);
        expect(await summaryPage.hasErrorBorderShnCd()).toBe(false);
        await snapExpect();

    });
});
