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

    test('WTY20501_87', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY205/wty20501', 'wty20501', 'TC_07');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);

        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await snapInput();
        await summaryPage.clearData();
        const verifyDefaultData = await summaryPage.verifyDefaultData();
        expect(verifyDefaultData).toBe(true);
        await snapExpect(); 
    });

    test('WTY20501_88', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY205/wty20501', 'wty20501', 'TC_07');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);

        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.fillForm(testData.formData.inputData);
        await snapInput();
        await summaryPage.clearData();
        const verifyDefaultData = await summaryPage.verifyDefaultData();
        expect(verifyDefaultData).toBe(true);
        await snapExpect(); 
    });

    test('WTY20501_91', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY205/wty20501', 'wty20501', 'TC_07');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);

        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.fillForm(testData.formData.inputData);
        await snapInput();
        await summaryPage.clickConfirm();
        await snapExpect(); 
        await page.waitForTimeout(1000);
        await summaryPage.clickOK();
    });

});
