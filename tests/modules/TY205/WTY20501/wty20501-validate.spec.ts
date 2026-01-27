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

    test('WTY10401_32', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY205/wty20501', 'wty20501', 'TC_06');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);

        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.inputCustomerNameKanji(testData.formData.customerNameKanji_32);
        const verifyInputMaxLength = await summaryPage.verifyInputValue(
            testData.formData.customerNameKanjiStandard_32,
            testData.formData.maxlength.customerNameKanji
        );
        expect(verifyInputMaxLength).toBe(true);
        await snapInput();
    });

    test('WTY10401_33', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY205/wty20501', 'wty20501', 'TC_06');
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
        await summaryPage.inputCustomerNameKanji(testData.formData.customerNameKanjiStandard);
        await snapExpect();
        const nameGuestExpect = await summaryPage.getCustomerNameKanji();
        expect(nameGuestExpect == testData.formData.customerNameKanjiStandard).toBe(true);
    });
    
});