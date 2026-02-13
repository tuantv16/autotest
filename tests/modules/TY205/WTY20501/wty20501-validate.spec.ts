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
        await snapInput();

        await summaryPage.inputCustomerNameKanji(testData.formData.customerNameKanji_32);
        const actualInput = await summaryPage.getCustomerNameKanji();
        const verifyInputMaxLength = await summaryPage.verifyInputValue(
            testData.formData.customerNameKanjiStandard_32,
            testData.formData.maxlength.customerNameKanji,
            actualInput
        );
        expect(verifyInputMaxLength).toBe(true);
        await snapExpect();
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
        await snapInput();
        await summaryPage.inputCustomerNameKana(testData.formData.customerNameKana_37);
        const actualInput = await summaryPage.getCustomerNameKana();
        const verifyInputMaxLength = await summaryPage.verifyInputValue(
            testData.formData.customerNameKanaStandard_37,
            testData.formData.maxlength.customerNameKanji,
            actualInput
        );
        expect(verifyInputMaxLength).toBe(true);
        await snapExpect();
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

    test('WTY20501_42', async ({
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

        await summaryPage.fillDeliveryDate(testData.formData.estimateDeliveryDate_42);
        await page.waitForTimeout(1000);
        await snapInput();

        await summaryPage.clickConfirm();
        await page.waitForTimeout(1000);
        const isErrorMessageVisible = await summaryPage.isErrorMessageVisible(
            VALIDATION_ERROR_MESSAGES.INVALID_LATER_DATE,
            testData.formData.estimateDeliveryDateLabel
        );

        expect(isErrorMessageVisible).toBe(true);
        await snapExpect();
    });

    test('WTY20501_43', async ({
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

        await summaryPage.fillDeliveryDate(testData.formData.estimateDeliveryDate_43);
        await page.waitForTimeout(1000);
        await snapInput();

        await summaryPage.clickConfirm();
        await page.waitForTimeout(1000);
        await snapExpect();
        const isErrorMessageVisible = await summaryPage.isErrorMessageVisible(
            VALIDATION_ERROR_MESSAGES.INVALID_DATE_AFTER_REIWA_70,
            testData.formData.estimateDeliveryDateLabel
        );
        
        expect(isErrorMessageVisible).toBe(true);
        await snapExpect();
    });

    test('WTY20501_44', async ({
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
        await summaryPage.fillFormEmptyDate(testData.formData.inputData);
        
        await snapExpect();
        const isErrorBorderVisible = await summaryPage.isErrorBorderVisible(
            testData.formData.estimateDeliveryDateLabel
        );
        expect(isErrorBorderVisible).toBe(false);

        await summaryPage.clickConfirm();
    });

    test('WTY20501_45', async ({
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

        await summaryPage.inputAbstractColumn(testData.formData.abstractColumn_45);
        const actualInput = await summaryPage.getSummaryText();
        const verifyInputMaxLength = await summaryPage.verifyInputValue(
            testData.formData.abstractColumnStandard_45,
            testData.formData.maxlength.summaryText,
            actualInput
        );

        expect(verifyInputMaxLength).toBe(true);
        await snapExpect();
    });

    test('WTY20501_46', async ({
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

        await summaryPage.inputAbstractColumn(testData.formData.abstractColumn_46);
        await snapInput();
        await summaryPage.clickOutside();

        const isErrorMessageVisible = await summaryPage.isErrorMessageVisible(
            VALIDATION_ERROR_MESSAGES.FULL_WIDTH_REQUIRED,
            testData.formData.abstractColumnLabel
        );

        expect(isErrorMessageVisible).toBe(false);
        await snapExpect();
    });

    test('WTY20501_47', async ({
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

        await summaryPage.inputAbstractColumn(testData.formData.abstractColumn_47);

        await summaryPage.clickConfirm();
        const isErrorMessageVisible = await summaryPage.isErrorMessageVisible(
            VALIDATION_ERROR_MESSAGES.FULL_WIDTH_REQUIRED,
            testData.formData.abstractColumnLabel
        );
        expect(isErrorMessageVisible).toBe(true);
        await snapExpect();
    });

    test('WTY20501_49', async ({
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

        await summaryPage.inputAbstractColumn(testData.formData.abstractColumn_49);
        await summaryPage.blurSummaryText();
        await page.waitForTimeout(1000);
        await snapInput();

        await summaryPage.focusSummaryText();
        const isErrorMessageVisible = await summaryPage.isErrorBorderVisible(
            testData.formData.guestNameKanaLabel
        );
        expect(isErrorMessageVisible).toBe(false);
        await snapExpect();
    });

    test('WTY20501_52', async ({
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

        await summaryPage.selectHonorific(2); // 御中
        await page.waitForTimeout(1000);
        const isOptionHonorificVisible = await summaryPage.isOptionHonorificVisible(
            testData.formData.honorificYourHonorLabel // "御中" 
        );
        expect(isOptionHonorificVisible).toBe(true);
        await snapExpect();
    });

    test('WTY20501_55', async ({
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

        await summaryPage.selectPaymentMethod(2); // 振込
        await page.waitForTimeout(1000);
        const isOptionPaymentMethodVisible = await summaryPage.isOptionPaymentMethodVisible(
            testData.formData.paymentMethodTranferLabel// Payment method label
        );  
        expect(isOptionPaymentMethodVisible).toBe(true);
        await snapExpect();
    });

});