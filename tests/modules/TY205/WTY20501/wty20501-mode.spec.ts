/**
 * WTY20501 Summary Input Test Suite
 * Tests for 摘要欄入力 screen using Page Object Model
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { TY2050Page } from '../../../pages/TY205/wty20501.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';
import { COMMON_MESSAGES } from '../../../constants/messages';

test.describe('WTY20501 - Summary Input (摘要欄入力)', () => {
    let summaryPage: TY2050Page;

    test.beforeEach(async ({ page, baseUrl }) => {
        summaryPage = new TY2050Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('WTY10401_23', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY205/wty20501', 'wty20501', 'TC_05');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);

        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        const isDisabled = await summaryPage.isInputDisabledByName(summaryPage.fieldNames.customerNameKanji);
        expect(isDisabled).toBe(true);
        await snapExpect();
    });

    test('WTY10401_24', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY205/wty20501', 'wty20501', 'TC_05');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);

        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        const isDisabled = await summaryPage.isInputDisabledByName(summaryPage.fieldNames.customerNameKana);
        expect(isDisabled).toBe(true);
        await snapExpect();
    });

    test('WTY10401_25', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY205/wty20501', 'wty20501', 'TC_05');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);

        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        const isDisabled = await summaryPage.isInputRadioDisabled(summaryPage.fieldNames.honorific);
        expect(isDisabled).toBe(true);
        await snapExpect();
    });

    test('WTY10401_26', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY205/wty20501', 'wty20501', 'TC_05');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);

        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        const isDisabled = await summaryPage.isInputRadioDisabled(summaryPage.fieldNames.paymentMethod);
        expect(isDisabled).toBe(true);
        await snapExpect();
    });

    test('WTY10401_27', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY205/wty20501', 'wty20501', 'TC_05');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);

        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        const isDisabled = await summaryPage.isInputDisabledByName(summaryPage.fieldNames.deliveryDate);
        expect(isDisabled).toBe(true);
        await snapExpect();
    });

    test('WTY10401_28', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY205/wty20501', 'wty20501', 'TC_05');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);

        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        const isDisabled = await summaryPage.isTextareaDisabledByName(summaryPage.fieldNames.summary);
        expect(isDisabled).toBe(true);
        await snapExpect();
    });

    test('WTY10401_29', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY205/wty20501', 'wty20501', 'TC_05');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);

        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        const isTextVisible = await summaryPage.isTextVisible(testData.formData.cancelLabel);
        expect(isTextVisible).toBe(false);
        await snapExpect();
    });

    test('WTY10401_30', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY205/wty20501', 'wty20501', 'TC_05');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);

        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        const isTextVisible = await summaryPage.isTextVisible(testData.formData.confirmLabel);
        expect(isTextVisible).toBe(false);
        await snapExpect();
    });
});
    