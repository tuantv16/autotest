/**
 * WTZ12201 Recommendations
 * Tests for レコメンド screen using Page Object Model
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { WTZ12201Page } from '../../../pages/TZ122/WTZ12201.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';
import { COMMON_MESSAGES } from '../../../constants/messages';

test.describe('WTZ12201 (レコメンド)', () => {
    let pageRecommendation: WTZ12201Page;

    test.beforeEach(async ({ page, baseUrl }) => {
        pageRecommendation = new WTZ12201Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('WTZ12201_22_23', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TZ122/wtz12201', 'wtz12201', 'TC_01');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);
        await snapInput();
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);
        await pageRecommendation.navigate();
        await page.waitForTimeout(1000);

        expect(await pageRecommendation.isRowVisible(2)).toBe(true);
        await snapExpect();

    });

    test('WTZ12201_24_25', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TZ122/wtz12201', 'wtz12201', 'TC_03');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);
        await snapInput();
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);
        await pageRecommendation.navigate();
        await page.waitForTimeout(1000);

        const isVisibleApply = await pageRecommendation.isTextVisible(testData.outputData.messageNoAppliedPromotion);
        expect(isVisibleApply).toBe(true);

        const isVisibleRecommended = await pageRecommendation.isTextVisible(testData.outputData.messageNoRecommendedPromotion);
        expect(isVisibleRecommended).toBe(true);
        await snapExpect();

    });

    test('WTZ12201_26_27', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TZ122/wtz12201', 'wtz12201', 'TC_04');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);
        await snapInput();
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);
        await pageRecommendation.navigate();
        await page.waitForTimeout(1000);

        const isVisibleApply = await pageRecommendation.isTextVisible(testData.outputData.messageNoAppliedPromotion);
        await snapExpect();

    });

    test('WTZ12201_28', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TZ122/wtz12201', 'wtz12201', 'TC_05');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);
        await snapInput();
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);
        await pageRecommendation.navigate();
        await page.waitForTimeout(1000);

        const isEmptyData = await pageRecommendation.checkValueCellDate();
        expect(isEmptyData).toBe(true);
        await snapExpect();
    });

});
