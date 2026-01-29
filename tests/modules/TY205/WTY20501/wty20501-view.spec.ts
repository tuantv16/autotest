/**
 * WTY20501 Summary Input Test Suite
 * Tests for 摘要欄入力 screen using Page Object Model
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { TY2050Page } from '../../../pages/TY205/wty20501.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';

test.describe('WTY20501 - Summary Input (摘要欄入力)', () => {
    let summaryPage: TY2050Page;

    test.beforeEach(async ({ page, baseUrl }) => {
        summaryPage = new TY2050Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('WTY20501_56', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY205/wty20501', 'wty20501', 'TC_10');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        
        await summaryPage.verifyInitData(testData.formData.outputData);
        await snapExpect();
    });

    test('WTY20501_57', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY205/wty20501', 'wty20501', 'TC_10');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);

        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        
        const customerNameKanji = await summaryPage.getCustomerNameKanji();
        expect(customerNameKanji).toBe(testData.formData.outputData.customerNameKanji);
        await snapExpect();
    });

    test('WTY20501_58', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY205/wty20501', 'wty20501', 'TC_10');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);

        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        
        const customerNameKanji = await summaryPage.getCustomerNameKanji();
        expect(customerNameKanji).toBe(testData.formData.outputData.customerNameKanji);
        await snapExpect();
    });

    test('WTY20501_59', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY205/wty20501', 'wty20501', 'TC_10');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);

        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        
        const keishoKbn = await summaryPage.isCheckedKeishoKbn(testData.formData.outputData.keishoKbnText);
        expect(keishoKbn).toBe(true);

        await snapExpect();
    });

    test('WTY20501_60', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY205/wty20501', 'wty20501', 'TC_10');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);

        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        
        const shHou = await summaryPage.isCheckedShHou(testData.formData.outputData.shHouText);
        expect(shHou).toBe(true);
        await snapExpect();
    });

    test('WTY20501_61', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY205/wty20501', 'wty20501', 'TC_10');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);

        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        
        const deliveryDate = await summaryPage.getDeliveryDate();
        expect(deliveryDate).toBe(testData.formData.outputData.deliveryDate);
        await snapExpect();
    });

    test('WTY20501_62', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY205/wty20501', 'wty20501', 'TC_11_01');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);

        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        
        const deliveryDate = await summaryPage.getDeliveryDate();
        expect(deliveryDate).toBe(testData.formData.outputData.deliveryDate);
        await snapExpect();
    });

    test('WTY20501_63', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY205/wty20501', 'wty20501', 'TC_11');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);

        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        
        const summaryText = await summaryPage.getSummaryText();
        expect(summaryText).toBe(testData.formData.outputData.summaryText);
        await snapExpect();
    });

    test('WTY20501_64', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY205/wty20501', 'wty20501', 'TC_12');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        
        const isInputDisabledByName = await summaryPage.isInputDisabledByName(summaryPage.fieldNames.customerNameKanji);
        expect(isInputDisabledByName).toBe(true);
        const isInputDisabledByNameKana = await summaryPage.isInputDisabledByName(summaryPage.fieldNames.customerNameKana);
        expect(isInputDisabledByNameKana).toBe(true);
        const isTextareaDisabledByName = await summaryPage.isTextareaDisabledByName(summaryPage.fieldNames.summary);
        expect(isTextareaDisabledByName).toBe(true);   
        await snapExpect();
    });

    // test('WTY20501_65', async ({
    //     page,
    //     baseUrl,
    //     indexedDBHelper,
    //     snapInput,
    //     snapExpect,
    // }) => {
    //     const testData = loadTestData('TY205/wty20501', 'wty20501', 'TC_13');
    //     await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    //     await page.waitForTimeout(500);

    //     await indexedDBHelper.initializeDB({
    //         sessionData: testData.sessionData,
    //         commonData: testData.commonData
    //     });
        
    //     await page.waitForTimeout(500);
    //     await summaryPage.navigate();
    //     await page.waitForTimeout(1000);
    //     const verifyDefaultData = await summaryPage.verifyDefaultData();
    //     expect(verifyDefaultData).toBe(true);
    //     await snapExpect();
    // });

    test('WTY20501_66', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY205/wty20501', 'wty20501', 'TC_13');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);

        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        const isTextVisibleSummary = await summaryPage.isTextVisible(testData.formData.label.summary);
        expect(isTextVisibleSummary).toBe(true);
        const isTextVisibleCustomerNameKanji = await summaryPage.isTextVisible(testData.formData.label.customerNameKanji);
        expect(isTextVisibleCustomerNameKanji).toBe(true);
        const isTextVisibleCustomerNameKana = await summaryPage.isTextVisible(testData.formData.label.customerNameKana);
        expect(isTextVisibleCustomerNameKana).toBe(true);

        await snapExpect();
    });



});
