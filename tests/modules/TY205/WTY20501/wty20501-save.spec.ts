/**
 * WTY20501 Summary Input Test Suite
 * Tests for 摘要欄入力 screen using Page Object Model
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { TY2050Page } from '../../../pages/TY205/wty20501.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';
import { COMMON_MESSAGES, VALIDATION_ERROR_MESSAGES } from '../../../constants/messages';
import { executeOracleNonQuery } from '../../../utils/oracle-db';
import { buildDeleteRcJmtrSql } from '../../../utils/db/sql/rc-jmtr-sql';
import { deleteRcJmtrTestRecord } from '../../../utils/db/rcJmtr.helper';
import { deleteRcJurzTestRecord } from '../../../utils/db/rcJurz.helper';

test.describe('WTY20501 - Summary Input (摘要欄入力)', () => {
    let summaryPage: TY2050Page;

    test.beforeEach(async ({ page, baseUrl }) => {
        summaryPage = new TY2050Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('WTY20501_67', async ({
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
        
        const successMessageFound = await summaryPage.waitForTextInBody(COMMON_MESSAGES.REGISTRATION_COMPLETED, 5000);
        expect(successMessageFound).toBe(true);
        await snapExpect();
    });

    test('WTY20501_68', async ({
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

        await summaryPage.fillCustomerNameKanji(testData.formData.inputData.customerNameKanji_68);
        await snapInput();
        await summaryPage.clickConfirm();
        
        const successMessageFound = await summaryPage.waitForTextInBody(COMMON_MESSAGES.REGISTRATION_COMPLETED, 5000);
        expect(successMessageFound).toBe(true);
        await snapExpect();
    });

    test('WTY20501_69', async ({
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

        await summaryPage.fillCustomerNameKana(testData.formData.inputData.customerNameKana_69);
        await snapInput();
        await summaryPage.clickConfirm();
        
        const successMessageFound = await summaryPage.waitForTextInBody(COMMON_MESSAGES.REGISTRATION_COMPLETED, 5000);
        expect(successMessageFound).toBe(true);
        await snapExpect();
    });

    test('WTY20501_70', async ({
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

        await summaryPage.selectHonorific(testData.formData.inputData.keishoKbn_70);
        await snapInput();
        await summaryPage.clickConfirm();
        
        const successMessageFound = await summaryPage.waitForTextInBody(COMMON_MESSAGES.REGISTRATION_COMPLETED, 5000);
        expect(successMessageFound).toBe(true);
        await snapExpect();
    });

    test('WTY20501_71', async ({
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

        await summaryPage.selectHonorific(testData.formData.inputData.keishoKbn_71);
        await snapInput();
        await summaryPage.clickConfirm();
        
        const successMessageFound = await summaryPage.waitForTextInBody(COMMON_MESSAGES.REGISTRATION_COMPLETED, 5000);
        expect(successMessageFound).toBe(true);
        await snapExpect();
    });

    test('WTY20501_72', async ({
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

        await summaryPage.selectPaymentMethod(testData.formData.inputData.shHou_72);
        await snapInput();
        await summaryPage.clickConfirm();
        
        const successMessageFound = await summaryPage.waitForTextInBody(COMMON_MESSAGES.REGISTRATION_COMPLETED, 5000);
        expect(successMessageFound).toBe(true);
        await snapExpect();
    });

    test('WTY20501_73', async ({
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

        await summaryPage.selectPaymentMethod(testData.formData.inputData.shHou_73);
        await snapInput();
        await summaryPage.clickConfirm();
        
        const successMessageFound = await summaryPage.waitForTextInBody(COMMON_MESSAGES.REGISTRATION_COMPLETED, 5000);
        expect(successMessageFound).toBe(true);
        await snapExpect();
    });

    test('WTY20501_74', async ({
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

        await summaryPage.fillDeliveryDate(testData.formData.inputData.nnyOtdkYoteiDate_74);
        await snapInput();
        await summaryPage.clickConfirm();
        
        const successMessageFound = await summaryPage.waitForTextInBody(COMMON_MESSAGES.REGISTRATION_COMPLETED, 5000);
        expect(successMessageFound).toBe(true);
        await snapExpect();
    });

    test('WTY20501_75', async ({
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

        // Clean up test data in RC_JMTR table
        await deleteRcJmtrTestRecord(testData.formData.inputData.jznuridenNo_75);
        await deleteRcJurzTestRecord(testData.formData.inputData.jznuridenNo_75);

        await summaryPage.fillForm(testData.formData.inputData);
        await snapInput();
        await summaryPage.clickConfirm();
        
        const successMessageFound = await summaryPage.waitForTextInBody(COMMON_MESSAGES.REGISTRATION_COMPLETED, 5000);
        expect(successMessageFound).toBe(true);
        await snapExpect();
    });

    test('WTY20501_76', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY205/wty20501', 'wty20501', 'TC_08');
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
        
        const successMessageFound = await summaryPage.waitForTextInBody(COMMON_MESSAGES.REGISTRATION_COMPLETED, 5000);
        expect(successMessageFound).toBe(true);
        await snapExpect();
    });
    
    test('WTY20501_77', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY205/wty20501', 'wty20501', 'TC_09');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);

        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.fillFormEmptyCustomerNameKanji(testData.formData.inputData);
        await snapInput();
        await summaryPage.clickConfirm();
        
        const successMessageFound = await summaryPage.waitForTextInBody(COMMON_MESSAGES.REGISTRATION_COMPLETED, 5000);
        expect(successMessageFound).toBe(true);
        await snapExpect();
    });

    test('WTY20501_78', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY205/wty20501', 'wty20501', 'TC_09');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);

        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.fillFormEmptyCustomerNameKana(testData.formData.inputData);
        await snapInput();
        await summaryPage.clickConfirm();
        
        const successMessageFound = await summaryPage.waitForTextInBody(COMMON_MESSAGES.REGISTRATION_COMPLETED, 5000);
        expect(successMessageFound).toBe(true);
        await snapExpect();
    });

    test('WTY20501_79', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY205/wty20501', 'wty20501', 'TC_09');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);

        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.fillFormEmptyHonorific(testData.formData.inputData);
        await snapInput();
        await summaryPage.clickConfirm();
        
        const successMessageFound = await summaryPage.waitForTextInBody(COMMON_MESSAGES.REGISTRATION_COMPLETED, 5000);
        expect(successMessageFound).toBe(true);
        await snapExpect();
    });

    test('WTY20501_80', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY205/wty20501', 'wty20501', 'TC_09');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);
        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.fillFormEmptyDate(testData.formData.inputData);

        await snapInput();
        await summaryPage.clickConfirm();
        
        const successMessageFound = await summaryPage.waitForTextInBody(COMMON_MESSAGES.REGISTRATION_COMPLETED, 5000);
        expect(successMessageFound).toBe(true);
        await snapExpect();
    });

    test('WTY20501_81', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY205/wty20501', 'wty20501', 'TC_09');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);
        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.fillFormEmptyAbstractColumn(testData.formData.inputData);
        await snapInput();

        await summaryPage.clickConfirm();
        
        const successMessageFound = await summaryPage.waitForTextInBody(COMMON_MESSAGES.REGISTRATION_COMPLETED, 5000);
        expect(successMessageFound).toBe(true);
        await snapExpect();
    });

    test('WTY20501_82', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY205/wty20501', 'wty20501', 'TC_09');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);
        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.fillFormEmptyDate(testData.formData.inputData_82);

        await snapInput();
        await summaryPage.clickConfirm();
        
        const successMessageFound = await summaryPage.waitForTextInBody(COMMON_MESSAGES.REGISTRATION_COMPLETED, 5000);
        expect(successMessageFound).toBe(true);
        await snapExpect();
    });

    test('WTY20501_83', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY205/wty20501', 'wty20501', 'TC_09');
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
        
        const successMessageFound = await summaryPage.waitForTextInBody(COMMON_MESSAGES.REGISTRATION_COMPLETED, 5000);
        expect(successMessageFound).toBe(true);
        await snapExpect();
    });
});