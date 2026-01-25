/**
 * WTY10401 Summary Input Test Suite
 * Tests for 摘要欄入力 screen using Page Object Model
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { TY1040Page } from '../../../pages/TY104/wty10401.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';
import { COMMON_MESSAGES } from '../../../constants/messages';

test.describe('WTY10401 - (店別在庫照会)', () => {
    let summaryPage: TY1040Page;

    test.beforeEach(async ({ page, baseUrl }) => {
        summaryPage = new TY1040Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('WTY10401_18', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_02');
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
        await page.waitForTimeout(2000); // Wait for page to load and modeFlg to be applied
        const isShnCdDisabled = await summaryPage.isShnCdDisabled();
        expect(isShnCdDisabled).toBe(true);
        
        await snapExpect();
    });

    // Test cases 19, 20, 21, 22 - same test logic
    const testCases = [19, 20, 21, 22];
    for (const testCaseNumber of testCases) {
        test(`WTY10401_${testCaseNumber}`, async ({
            page,
            baseUrl,
            indexedDBHelper,
            snapInput,
            snapExpect,
        }) => {
            const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_02');
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
            await page.waitForTimeout(2000);

            // Step 4: Check if search icon (検索 button) is disabled
            const isIconDisabled = await summaryPage.isIconDisabled();
            expect(isIconDisabled).toBe(true);
            
            await snapExpect();
        });
    }

    test('WTY10401_23', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_02');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });

        await summaryPage.navigate();

        const isMenuIconVisible = await summaryPage.isMenuIconVisible('カート');
        expect(isMenuIconVisible).toBe(false);
        
        await snapExpect();
    });

});
