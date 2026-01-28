/**
 * WTY20501 Summary Input Test Suite
 * Tests for 摘要欄入力 screen using Page Object Model
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { TY2050Page } from '../../../pages/TY205/wty20501.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';
import { COMMON_MESSAGES, VALIDATION_ERROR_MESSAGES } from '../../../constants/messages';

test.describe('WTY20501 - Summary Input (摘要欄入力)', () => {
    let summaryPage: TY2050Page;

    test.beforeEach(async ({ page, baseUrl }) => {
        summaryPage = new TY2050Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('WTY20501_32', async ({
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
        const actualInput = await summaryPage.getCustomerNameKanji();
        const verifyInputMaxLength = await summaryPage.verifyInputValue(
            testData.formData.customerNameKanjiStandard_32,
            testData.formData.maxlength.customerNameKanji,
            actualInput
        );
        expect(verifyInputMaxLength).toBe(true);
        await snapInput();
    });

    test('WTY20501_33', async ({
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
    
    test('WTY20501_34', async ({
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
        await summaryPage.inputCustomerNameKanji(testData.formData.customerNameKanji_34);
        await snapInput();
        await summaryPage.blurCustomerNameKanji();
        
        const isErrorMessageVisible = await summaryPage.isErrorMessageVisible(
            VALIDATION_ERROR_MESSAGES.FULL_WIDTH_REQUIRED,
            testData.formData.guestNameKanjiLabel
        );
        expect(isErrorMessageVisible).toBe(true);
        
        await snapExpect();
    });

    test('WTY20501_35', async ({
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

        await summaryPage.inputCustomerNameKanji(testData.formData.customerNameKanji_34);
        await snapInput();

        await summaryPage.clickConfirm();
        const isErrorMessageVisible = await summaryPage.isErrorMessageVisible(
            VALIDATION_ERROR_MESSAGES.FULL_WIDTH_REQUIRED,
            testData.formData.guestNameKanjiLabel
        );
        expect(isErrorMessageVisible).toBe(true);
        
        await snapExpect();
    });

    test('WTY20501_36', async ({
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

        await summaryPage.inputCustomerNameKanji(testData.formData.customerNameKanji_34);
        await summaryPage.blurCustomerNameKanji();
        await page.waitForTimeout(1000);
        await snapInput();

        await summaryPage.focusCustomerNameKanji();
        const isErrorMessageVisible = await summaryPage.isErrorBorderVisible(
            testData.formData.guestNameKanjiLabel
        );
        expect(isErrorMessageVisible).toBe(false);
        
        await snapExpect();
    });

    test('WTY20501_37', async ({
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

        await summaryPage.inputCustomerNameKana(testData.formData.customerNameKana_37);
        const actualInput = await summaryPage.getCustomerNameKana();
        const verifyInputMaxLength = await summaryPage.verifyInputValue(
            testData.formData.customerNameKanaStandard_37,
            testData.formData.maxlength.customerNameKanji,
            actualInput
        );
        expect(verifyInputMaxLength).toBe(true);
        await snapInput();
    });

    test('WTY20501_38', async ({
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
        await summaryPage.inputCustomerNameKana(testData.formData.customerNameKanaStandard_38);
        await snapExpect();
        const nameGuestExpect = await summaryPage.getCustomerNameKana();
        expect(nameGuestExpect == testData.formData.customerNameKanaStandard_38).toBe(true);
    });

    test('WTY20501_39', async ({
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
        await summaryPage.inputCustomerNameKana(testData.formData.customerNameKanaError_39);
        await snapInput();
        await summaryPage.blurCustomerNameKana();
        
        const isErrorMessageVisible = await summaryPage.isErrorMessageVisible(
            VALIDATION_ERROR_MESSAGES.HALF_WIDTH_REQUIRED,
            testData.formData.guestNameKanaLabel
        );
        expect(isErrorMessageVisible).toBe(true);
        
        await snapExpect();
    });

    test('WTY20501_41', async ({
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

        await summaryPage.inputCustomerNameKana(testData.formData.customerNameKana_41);
        await summaryPage.blurCustomerNameKana();
        await page.waitForTimeout(1000);
        await snapInput();

        await summaryPage.focusCustomerNameKana();
        const isErrorMessageVisible = await summaryPage.isErrorBorderVisible(
            testData.formData.guestNameKanaLabel
        );
        expect(isErrorMessageVisible).toBe(false);
        
        await snapExpect();
    });
});