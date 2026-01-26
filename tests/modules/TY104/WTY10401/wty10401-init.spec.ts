/**
 * WTY10401 Summary Input Test Suite
 * Tests for 摘要欄入力 screen using Page Object Model
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { TY1040Page } from '../../../pages/TY104/wty10401.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';
import { COMMON_MESSAGES } from '../../../constants/messages';

test.describe('WTY10401 - (店別在庫照会)', () => {
    let summaryPage: TY1040Page;

    test.beforeEach(async ({ page, baseUrl }) => {
        summaryPage = new TY1040Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('WTY10401_06', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_01');
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await summaryPage.navigate();

        await snapExpect();
        const isVisible = await summaryPage.isHeadingTitleVisible();
        expect(isVisible).toBe(true);
        
        await snapExpect();
    });

    test('WTY10401_08', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_01');
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });

        // Step 3: Navigate to target URL
        await summaryPage.navigate();

        // Step 4: Verify product input field exists
        const isProductInputVisible = await summaryPage.isProductInputVisible();
        expect(isProductInputVisible).toBe(true);

        // Step 5: Verify product barcode button exists
        const isBarcodeButtonVisible = await summaryPage.isProductBarcodeButtonVisible();
        expect(isBarcodeButtonVisible).toBe(true);
        
        await snapExpect();
    });

    test('WTY10401_11', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_01');
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });

        // Step 3: Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        // Click on move down button
        await summaryPage.clickMoveDown();
        await page.waitForTimeout(1000);
        // Step 4: Observe Sales Department (営業部) section and verify combobox is visible
        const isComboboxVisible = await summaryPage.isSalesDepartmentComboboxClickable();
        await page.waitForTimeout(1000);
        expect(isComboboxVisible).toBe(true);
        
        await snapExpect();
    });

    test('WTY10401_12', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_01');
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });

        // Step 3: Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        // Click on move down button
        await summaryPage.clickMoveDown();  
        await page.waitForTimeout(1000);
        // Step 4: Click on store label (店舗)
        await summaryPage.clickStoreLabel();
        await page.waitForTimeout(1000);
        
        await snapExpect();
    });

    test('WTY10401_13', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_01');
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });

        // Step 3: Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        // Click on move down button
        await summaryPage.clickMoveDown();
        await page.waitForTimeout(1000);
        // Step 4: Observe Sales Department (営業部) section and verify combobox is visible
        await summaryPage.isSalesDepartmentComboboxClickable();
        await page.waitForTimeout(1000); 
        // Step 5: Verify combobox dropdown contains expected options
        const expectedOptions = ['エディオン', '中四国・九州', '旧東京エディオン'];
        const allOptionsPresent = await summaryPage.verifyComboboxOptions(expectedOptions);
        expect(allOptionsPresent).toBe(true); 
        
        await snapExpect();
    });

    test('WTY10401_14', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_01');
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });

        // Step 3: Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        // Click on move down button
        await summaryPage.clickMoveDown();
        await page.waitForTimeout(2000);
        // Step 4: Observe Sales Department (営業部) section and verify combobox is visible
        await summaryPage.isSalesDepartmentComboboxClickable();

        // Step 5: Verify combobox dropdown contains expected options
        const expectedOptions = ['エディオン', '中四国・九州', '事業会社コード2'];
        const allOptionsPresent = await summaryPage.verifyComboboxOptions(expectedOptions);
        expect(allOptionsPresent).toBe(true); 
        
        await snapExpect();
    });

    test('WTY10401_15', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_01');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });

        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.clickMoveDown();
        await page.waitForTimeout(1000);

        const isSearchButtonVisible = await summaryPage.isSearchButtonVisible();
        expect(isSearchButtonVisible).toBe(true);
        
        await snapExpect();
    });

    test('WTY10401_16', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_01');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });

        await summaryPage.navigate();
        await summaryPage.clickIconMenu();
        const isMenuIconVisible = await summaryPage.isMenuIconVisible('カート');
        expect(isMenuIconVisible).toBe(true);
        
        await snapExpect();
    });
    
});
