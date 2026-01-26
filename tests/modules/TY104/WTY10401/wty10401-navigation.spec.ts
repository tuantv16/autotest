/**
 * WTY10401 Summary Input Test Suite
 * Tests for 摘要欄入力 screen using Page Object Model
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { TY1040Page } from '../../../pages/TY104/wty10401.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';
import { COMMON_MESSAGES, VALIDATION_ERROR_MESSAGES } from '../../../constants/messages';

test.describe('WTY10401 - (店別在庫照会)', () => {
    let summaryPage: TY1040Page;

    test.beforeEach(async ({ page, baseUrl }) => {
        summaryPage = new TY1040Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('WTY10401_70', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_06');
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.focusShnCd();
        await summaryPage.clickButtonSearchNumber();

        await page.waitForTimeout(1000);
        const currentUrl = page.url();
        expect(currentUrl).toContain('TZ101');
        
        await snapExpect();
    });

    test('WTY10401_71', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_06');
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.focusShnCd();
        await summaryPage.blurShnCd();

        await page.waitForTimeout(1000);
        const currentUrl = page.url();
        expect(currentUrl.includes('TZ101')).toBe(false); 
        
        await snapExpect();
    });

    test('WTY10401_72', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_06');
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        await summaryPage.clickMoveDown();
        await summaryPage.fillInputShnCd(testData.formData.shnCd_72);
        await summaryPage.clickSearchButton();
        await page.waitForTimeout(1000);
        await summaryPage.clickItemMenuColorVariation();
        await page.waitForTimeout(2000);
        const currentUrl = page.url();
        expect(currentUrl).toContain('TZ120');   
        
        await snapExpect();
    });

    test('WTY10401_73', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_06');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.clickMoveDown();
        
        await summaryPage.fillInputDataCondition(testData.formData);

        await summaryPage.clickSearchButton();

        await summaryPage.clearData();

        await page.waitForTimeout(1000);
        const verifyDefaultTable = await summaryPage.verifySummaryTableHasNoDataRow();
        expect(verifyDefaultTable).toBe(true);
        
        await snapExpect();
    });

    test('WTY10401_74', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_06');
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.clickMoveDown();

        await summaryPage.fillInputDataCondition(testData.formData);
        await summaryPage.clearData();

        await page.waitForTimeout(1000);
        const verifyDefaultData = await summaryPage.verifyDefaultData();
        expect(verifyDefaultData).toBe(true);
        
        await snapExpect();
    });

    test('WTY10401_75', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_06');
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        // Step 3: Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.clickItemMenuProductBasic();
        await page.waitForTimeout(1000);
        
        const currentUrl = page.url();
        expect(currentUrl).toContain('TY101');   
        
        await snapExpect();
    });

    test('WTY10401_76', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_06');
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        // Step 3: Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.clickItemMenuProductPrice();
        await page.waitForTimeout(1000);
        
        const currentUrl = page.url();
        expect(currentUrl).toContain('TY103');   
        
        await snapExpect();
    });

    test('WTY10401_77', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_06');
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        // Step 3: Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.clickItemMenuOrder();
        await page.waitForTimeout(1000);
        
        const currentUrl = page.url();
        expect(currentUrl).toContain('TY107');   
        
        await snapExpect();
    });

    test('WTY10401_78', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_06');
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        // Step 3: Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.clickItemMenuArrivePlan();
        await page.waitForTimeout(1000);
        
        const currentUrl = page.url();
        expect(currentUrl).toContain('TY110');   
        
        await snapExpect();
    });

    test('WTY10401_79', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_06');
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        // Step 3: Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.clickItemMenuBarcode();
        await page.waitForTimeout(1000);
        
        const currentUrl = page.url();
        expect(currentUrl).toContain('TZ121');   
        
        await snapExpect();
    });

    test('WTY10401_80', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_06');
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        // Step 3: Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.clickMoveDown();
        await summaryPage.fillInputShnCd(testData.formData.shnCd_standard);
        await page.waitForTimeout(1000);

        await summaryPage.clickSearchButton();

        await summaryPage.clickItemMenuCart();
        await page.waitForTimeout(1000);
        
        const currentUrl = page.url();
        expect(currentUrl).toContain('TY201');
        
        await snapExpect();
    });

    test('WTY10401_81', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_06');
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        // Step 3: Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.clearInputShnCd();

        await summaryPage.clickItemMenuCart();
        await page.waitForTimeout(1000);

        expect(await summaryPage.getErrorMessageAddCart(COMMON_MESSAGES.ERROR_MESSAGE_ADD_CART)).toBe(true);
        
        await snapExpect();
    });

    test('WTY10401_82', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_06');
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        // Step 3: Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.fillInputShnCd(testData.formData.shnCdInvalid);
        await summaryPage.clearData();

        const isErrorMessageVisible = await summaryPage.verifyErrorMessageInvalid(testData.formData.shnCdInvalid);
        expect(isErrorMessageVisible).toBe(false);
        
        await snapExpect();
    });

    test('WTY10401_86', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_06');
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        // Step 3: Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.clearData();

        await summaryPage.fillInputShnCd(testData.formData.shnCd_standard);

        await summaryPage.clearInputShnCd();

        const verifyDefaultShnCd = await summaryPage.verifyDefaultShnCd();
        expect(verifyDefaultShnCd).toBe(true);
        
        await snapExpect();
    });

    test('WTY10401_89', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_06');
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        // Step 3: Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.clickMoveDown();
        await page.waitForTimeout(1000);

        await summaryPage.clickMoveDown();
        await page.waitForTimeout(2000);
        
        await snapExpect();
        // check test manual sheet No.89
    });

});