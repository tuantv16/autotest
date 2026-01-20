/**
 * WTY10401 Summary Input Test Suite
 * Tests for 摘要欄入力 screen using Page Object Model
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { TY1040Page } from '../../../pages/TY104/wty10401.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';
import { COMMON_MESSAGES, VALIDATION_ERROR_MESSAGES } from '../../../constants/messages';

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
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_01');
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
            modeFlgData: testData.modeFlgData,
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

        const isErrorMessageVisible = await summaryPage.isErrorMessageVisible(VALIDATION_ERROR_MESSAGES.REQUIRED_FIELD, '商品');
        expect(isErrorMessageVisible).toBe(true);
    });

    test('WTY10401_25', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_03');
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
            modeFlgData: testData.modeFlgData,
        });

        // Step 3: Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        // Step 4: Click on move down button
        await summaryPage.clickMoveDown();
        await page.waitForTimeout(1000);

        // Step 5: Fill product code with invalid length (7 characters)
        await summaryPage.fillInputById('shnCd', testData.sessionData.value.wty10401InfoDT[0].shnCd);
        await page.waitForTimeout(1000);

        // Step 6: Click search button
        await summaryPage.clickSearchButton();
        await page.waitForTimeout(2000);

        // Step 7: Verify error message for invalid length
        const isErrorMessageVisible = await summaryPage.isErrorMessageVisible(VALIDATION_ERROR_MESSAGES.INVALID_LENGTH, '商品');
        expect(isErrorMessageVisible).toBe(true);
    });

});
