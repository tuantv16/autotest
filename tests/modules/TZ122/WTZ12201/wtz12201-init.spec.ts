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

    test('WTZ12201_06', async ({
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

         await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);

        await pageRecommendation.navigate();
        await page.waitForTimeout(1000);

        const isVisible = await pageRecommendation.isHeadingTitleVisible();
        expect(isVisible).toBe(true);
        await snapExpect();
    });

    test('WTZ12201_08_09', async ({
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

        const isVisible = await pageRecommendation.isHeadingTitleVisible();
        expect(isVisible).toBe(true);
        await snapExpect();
    });

    test('WTZ12201_10', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TZ122/wtz12201', 'wtz12201', 'TC_02');
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

        const text = await pageRecommendation.getCellTextByColumnId('sskNbkNm', 0);
        expect(text).toBe('春のセール');
        await snapExpect();
    });

    test('WTZ12201_11_12', async ({
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

    test('WTZ12201_13', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TZ122/wtz12201', 'wtz12201', 'TC_02');
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

        const isVisible = await pageRecommendation.isTextVisible(testData.outputData.wtz12201AppliedGrid.nbkStrDate);
        expect(isVisible).toBe(true);
        await snapExpect();
    });

    test('WTZ12201_14_15', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TZ122/wtz12201', 'wtz12201', 'TC_02');
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

        const isVisible = await pageRecommendation.isTextVisible(testData.outputData.labelEndOfData);
        expect(isVisible).toBe(true);
        await snapExpect();
    });

    test('WTZ12201_16_17', async ({
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
});
    