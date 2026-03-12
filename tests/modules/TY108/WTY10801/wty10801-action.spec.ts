/**
 * WTY10801 Check purchase history information Test Suite
 * Tests for 購入履歴照会 screen using Page Object Model
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { WTY10801Page } from '../../../pages/TY108/wty10801.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';
import { COMMON_MESSAGES } from '../../../constants/messages';

test.describe('WTY10801 - Check purchase history information (購入履歴照会)', () => {
    let purchaseHistoryPage: WTY10801Page;

    test.beforeEach(async ({ page, baseUrl }) => {
        purchaseHistoryPage = new WTY10801Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('WTY10801_26', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        
        await page.waitForTimeout(500);

        await purchaseHistoryPage.navigate();
        await page.waitForTimeout(1000);

        await purchaseHistoryPage.waitForFormReady();

        await purchaseHistoryPage.clickBarCodeButton();

        const message = await purchaseHistoryPage.waitForTextInBody('スキャナーはFlutterアプリ内でのみ動作します');
        expect(message).toBe(true);

        await snapExpect();
    });

    test('WTY10801_36', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY108/wty10801', 'wty10801', 'TC_15');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);

        await purchaseHistoryPage.navigate();
        await page.waitForTimeout(1000);

        await purchaseHistoryPage.waitForFormReady();

        await purchaseHistoryPage.fillChuCd(testData.formData.chuCd_36);
        await snapInput();

        await purchaseHistoryPage.clearChuCd();
        const chuCdValue = await purchaseHistoryPage.selectorsObj.chuCdInput.inputValue();
        expect(chuCdValue).toBe('');

        await snapExpect();
    });

    test('WTY10801_37', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY108/wty10801', 'wty10801', 'TC_15');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);

        await purchaseHistoryPage.navigate();
        await page.waitForTimeout(1000);

        await purchaseHistoryPage.waitForFormReady();

        await purchaseHistoryPage.fillDenNo(testData.formData.denNo_37);
        await snapInput();

        await purchaseHistoryPage.clearDenNo();
        const denNoValue = await purchaseHistoryPage.selectorsObj.denNoInput.inputValue();
        expect(denNoValue).toBe('');

        await snapExpect();
    });

    test('WTY10801_38', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY108/wty10801', 'wty10801', 'TC_15');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);

        await purchaseHistoryPage.navigate();
        await page.waitForTimeout(1000);

        await purchaseHistoryPage.waitForFormReady();

        await purchaseHistoryPage.fillStartDate(testData.formData.startDate_38);
        await snapInput();

        await purchaseHistoryPage.clickClearStartDateButton();
        await page.waitForTimeout(500);
        const startDateValue = await purchaseHistoryPage.selectorsObj.startDate.inputValue();
        expect(startDateValue).toBe('');

        await snapExpect();
    });

    test('WTY10801_39', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY108/wty10801', 'wty10801', 'TC_15');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);

        await purchaseHistoryPage.navigate();
        await page.waitForTimeout(1000);

        await purchaseHistoryPage.waitForFormReady();

        await purchaseHistoryPage.fillEndDate(testData.formData.endDate_39);
        await snapInput();

        await purchaseHistoryPage.clickClearEndDateButton();
        await page.waitForTimeout(500);
        const endDateValue = await purchaseHistoryPage.selectorsObj.endDate.inputValue();
        expect(endDateValue).toBe('');

        await snapExpect();
    });

    test('WTY10801_43', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY108/wty10801', 'wty10801', 'TC_15');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);

        await purchaseHistoryPage.navigate();
        await page.waitForTimeout(1000);

        await purchaseHistoryPage.waitForFormReady();

        await purchaseHistoryPage.clickMenuButton();
        await page.waitForTimeout(500);
        snapInput();
        await purchaseHistoryPage.clickDetail();
        await page.waitForTimeout(500);
        const message = await purchaseHistoryPage.waitForTextInBody('購入履歴を選択してください。');
        expect(message).toBe(true);

        await snapExpect();
    });

});
    