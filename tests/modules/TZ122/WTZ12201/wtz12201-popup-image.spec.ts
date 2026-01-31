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

    test('WTZ12201_33', async ({
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

        await pageRecommendation.clickRowTable(0);
        await snapInput();
        const verifyModalVisible = await pageRecommendation.isPreviewModalVisible();
        expect(verifyModalVisible).toBe(true);
        await page.waitForTimeout(1000);
        await snapExpect();
    });

    test('WTZ12201_34', async ({
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

        await pageRecommendation.clickRowTable(0);
        await snapInput();
        const verifyModalTitle = await pageRecommendation.checkTitlePreviewModal();
        expect(verifyModalTitle).toBe(testData.outputData.titlePopup);
        await page.waitForTimeout(1000);
        await snapExpect();
    });
    
    test('WTZ12201_35', async ({
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

        await pageRecommendation.clickRowTable(0);
        await snapInput();
        const verifyModalImageModal = await pageRecommendation.checkExistsImagePreviewModal();
        expect(verifyModalImageModal).toBe(true);
        await page.waitForTimeout(1000);
        await snapExpect();
    });

    test('WTZ12201_36', async ({
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

        await pageRecommendation.clickRowTableRecommend(2);
        await snapInput();
        const verifyModalImageModal = await pageRecommendation.checkNotExistsImagePreviewModal();
        expect(verifyModalImageModal).toBe(true);
        await page.waitForTimeout(1000);
        await snapExpect();
    });

    test('WTZ12201_37', async ({
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

        await pageRecommendation.clickRowTableRecommend(2);
        await snapInput();
        // click button x
        await pageRecommendation.clickButtonClosePreviewModal();
        
        const verifyModalVisible = await pageRecommendation.isPreviewModalVisible();
        expect(verifyModalVisible).toBe(false);
        await page.waitForTimeout(1000);
        await snapExpect();
    });

    test('WTZ12201_38', async ({
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

        await pageRecommendation.clickRowTableRecommend(2);
        await snapInput();
        // Nút Zoom In (+)
        await pageRecommendation.clickButtonZoomIn();
        await page.waitForTimeout(2000);
        const verifyButtonZoomOutDisabled = await pageRecommendation.isButtonZoomOutDisabled();
        expect(verifyButtonZoomOutDisabled).toBe(true);
        await page.waitForTimeout(1000);
        await snapExpect();
    });

    test('WTZ12201_39', async ({
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

        await pageRecommendation.clickRowTableRecommend(0);
        await snapInput();
        // Nút Zoom In (+)
        await pageRecommendation.clickButtonZoomIn();
        await pageRecommendation.clickButtonZoomIn();
        await pageRecommendation.clickButtonZoomIn();

        await pageRecommendation.clickButtonZoomOut();
        await pageRecommendation.clickButtonZoomOut();
        await pageRecommendation.clickButtonZoomOut();

        await page.waitForTimeout(2000);
        const verifyButtonZoomOutDisabled = await pageRecommendation.isButtonZoomOutNotExistsDisabled();
        await page.waitForTimeout(2000);
        expect(verifyButtonZoomOutDisabled).toBe(true);
        
        await snapExpect();
    });
    
});
