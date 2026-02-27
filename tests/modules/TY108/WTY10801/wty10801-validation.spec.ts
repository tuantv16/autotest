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

    test('WTY10801_15', async ({
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

        await purchaseHistoryPage.fillStartDate(testData.formData.startDate_15);
        await snapInput();

        await purchaseHistoryPage.clickSearchButton();

        await page.waitForTimeout(500);

        const message = await purchaseHistoryPage.waitForTextInBody('日付を入力してください。');
        expect(message).toBe(true);

        await snapExpect();
    });

    test('WTY10801_16', async ({
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

        await purchaseHistoryPage.fillEndDate(testData.formData.startDate_15);
        await snapInput();

        await purchaseHistoryPage.clickSearchButton();

        await page.waitForTimeout(500);

        const message = await purchaseHistoryPage.waitForTextInBody('日付を入力してください。');
        expect(message).toBe(true);

        await snapExpect();
    });

    test('WTY10801_17', async ({
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

        await purchaseHistoryPage.fillStartDate(testData.formData.startDate_17);
        await purchaseHistoryPage.fillEndDate(testData.formData.endDate_17);
        await snapInput();

        await purchaseHistoryPage.clickSearchButton();

        await page.waitForTimeout(500);

        const message = await purchaseHistoryPage.waitForTextInBody('受注日終了には受注日開始以降の日付を入力してください。');
        expect(message).toBe(true);

        await snapExpect();
    });

    test('WTY10801_18', async ({
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

        await purchaseHistoryPage.fillChuCd(testData.formData.chuCd_18);
        await snapInput();

        await purchaseHistoryPage.clickSearchButton();

        await page.waitForTimeout(500);

        const message = await purchaseHistoryPage.waitForTextInBody('中分類コードが不正です。');
        expect(message).toBe(true);

        await snapExpect();
    });

    test('WTY10801_19', async ({
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

        await purchaseHistoryPage.fillChuCd(testData.formData.chuCd_19);
        await snapInput();

        await purchaseHistoryPage.clickSearchButton();

        await page.waitForTimeout(500);

        const message = await purchaseHistoryPage.waitForTextInBody('数値で入力してください。');
        expect(message).toBe(true);

        await snapExpect();
    });

    test('WTY10801_20', async ({
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

        await purchaseHistoryPage.fillDenNo(testData.formData.denNo_20);
        await snapInput();

        await purchaseHistoryPage.clickSearchButton();

        await page.waitForTimeout(500);

        const message = await purchaseHistoryPage.waitForTextInBody('数値で入力してください。');
        expect(message).toBe(true);

        await snapExpect();
    });

    test('WTY10801_21', async ({
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

        await purchaseHistoryPage.fillDenNo(testData.formData.denNo_21);

        await page.waitForTimeout(500);

        const message = await purchaseHistoryPage.selectorsObj.denNoInput.inputValue();

        expect(message).toBe('12345678909876');

        await snapExpect();
    });

    test('WTY10801_22', async ({
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

        await purchaseHistoryPage.fillStartDate(testData.formData.startDate_22);
        await purchaseHistoryPage.fillEndDate(testData.formData.startDate_22);

        await page.waitForTimeout(500);

        const startDate = await purchaseHistoryPage.selectorsObj.startDate.inputValue();
        const endDate = await purchaseHistoryPage.selectorsObj.endDate.inputValue();

        expect(startDate).toBe('2026/02/23');
        expect(endDate).toBe('2026/02/23');

        await snapExpect();
    });

    test('WTY10801_24', async ({
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

        await purchaseHistoryPage.selectorsObj.chuCdInput.focus();

        const subMenu = await purchaseHistoryPage.waitForTextInBody('中分類');
        expect(subMenu).toBe(true);
        await snapExpect();
    });

});
    