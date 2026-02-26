/**
 * WTY30302 Summary Input Test Suite
 * Tests for マルチPOP出力指示一覧 screen using Page Object Model
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';
import { TY30302Page } from '../../../pages/TY303/wty30302.page';
import { WTY30302_COLUMN_NAMES, WTY30302_MESSAGES } from '../../../constants/TY303/messages';

test.describe('WTY30302 - (マルチPOP出力指示一覧)', () => {
    let summaryPage: TY30302Page;

    test.beforeEach(async ({ page, baseUrl }) => {
        summaryPage = new TY30302Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('WTY30302_34', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY303/wty30302', 'wty30302', 'TC_03');
        // Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });

        // Navigate to target URL
        await summaryPage.navigate();

        // Click on first row
        await summaryPage.clickFirstRow();

        // Verify row is selected/highlighted
        let isRowSelected = await summaryPage.isRowSelected(0); // first row is index 0
        expect(isRowSelected).toBe(true);

        // Click on row 2
        await summaryPage.clickRowByIndex(1);
        isRowSelected = await summaryPage.isRowSelected(1); // second row is index 1
        expect(isRowSelected).toBe(true);

        // Verify at least one row is selected
        const selectedRowCount = await summaryPage.getSelectedRowCount();
        expect(selectedRowCount).toEqual(1);

        // Open action menu by clicking MUI button
        await summaryPage.clickMuiButton();

        // Verify Delete button (削除) is visible
        const isDeleteButtonVisible = await summaryPage.isDeleteButtonVisible();
        expect(isDeleteButtonVisible).toBe(true);

        // Verify Edit button (修正) is visible
        const isEditButtonVisible = await summaryPage.isEditButtonVisible();
        expect(isEditButtonVisible).toBe(true);

        await snapExpect();
    });

    test('WTY30302_35', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY303/wty30302', 'wty30302', 'TC_02');
        // Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });

        // Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(5000);

        // Click on first row to select it
        await summaryPage.clickFirstRow();

        // Verify row is selected
        const isRowSelected = await summaryPage.isRowSelected();
        expect(isRowSelected).toBe(true);

        // Open action menu by clicking MUI button
        await summaryPage.clickMuiButton();

        // Click Delete button (削除)
        await summaryPage.clickDeleteButton();

        // Verify confirmation dialog is visible
        const isDialogVisible = await summaryPage.isErrorDialogVisible("wty30302-error-dialog ._modal_1fy9j_13");
        expect(isDialogVisible).toBe(true);

        // Verify confirmation message
        const confirmMessage = await summaryPage.getConfirmationMessage();
        expect(confirmMessage).toContain(WTY30302_MESSAGES.CONFIRM_DELETE);

        await snapExpect();
    });

    test('WTY30302_37', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY303/wty30302', 'wty30302', 'TC_01');
        // Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });

        // Navigate to target URL
        await summaryPage.navigate();

        // Verify POP list table is visible
        const isTableVisible = await summaryPage.isPopListTableVisible();
        expect(isTableVisible).toBe(true);

        // Get initial row count
        const initialRowCount = await summaryPage.getRowCount();
        expect(initialRowCount).toBeGreaterThan(0);
        
        // Click on first row to select it
        await summaryPage.clickFirstRow();

        // Open action menu by clicking MUI button
        await summaryPage.clickMuiButton();

        // Click Delete button (削除)
        await summaryPage.clickDeleteButton();

        // Verify confirmation dialog is visible
        const isDialogVisible = await summaryPage.isErrorDialogVisible("wty30302-error-dialog ._modal_1fy9j_13");
        expect(isDialogVisible).toBe(true);

        await snapExpect(1);

        // Click Cancel button (いいえ) to cancel deletion
        await summaryPage.clickCancelButton();

        // Wait for dialog to close
        await summaryPage.waitForDialogToClose();

        // Verify dialog is closed
        const isDialogStillVisible = await summaryPage.isErrorDialogVisible("wty30302-error-dialog ._modal_1fy9j_13");
        expect(isDialogStillVisible).toBe(false);

        // Verify row count remains the same
        const finalRowCount = await summaryPage.getRowCount();
        expect(finalRowCount).toBe(initialRowCount);

        // Verify action buttons are hidden (MUI button should not be showing menu)
        const isEditButtonStillVisible = await summaryPage.isEditButtonVisible();
        expect(isEditButtonStillVisible).toBe(false);

        await snapExpect(2);
    });

    test('WTY30302_39', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY303/wty30302', 'wty30302', 'TC_04');
        // Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });

        // Navigate to target URL
        await summaryPage.navigate();

        // Click on first row to select it
        await summaryPage.clickRowByIndex(2);

        // Verify row is selected
        const isRowSelected = await summaryPage.isRowSelected(2);
        expect(isRowSelected).toBe(true);

        // Open action menu by clicking MUI button
        await summaryPage.clickMuiButton();

        // Verify Edit button (修正) is visible
        const isEditButtonVisible = await summaryPage.isEditButtonVisible();
        expect(isEditButtonVisible).toBe(true);

        // Click Edit button (修正)
        await summaryPage.clickEditButton();

        // Wait for navigation
        await page.waitForTimeout(2000);

        // Verify navigation to WTY30301 screen
        const currentUrl = page.url();
        expect(currentUrl).toContain('WTY30301SalesInAdvanceCorrection');

        await snapExpect();
    });

    test('WTY30302_40', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY303/wty30302', 'wty30302', 'TC_04');
        // Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });

        // Go to WTY30301 screen
        await page.goto(`${baseUrl}/index.html?pilotkey=prod#/WTY30301SalesInAdvanceCorrection`, { waitUntil: 'domcontentloaded' });

        // Navigate to target URL
        await summaryPage.navigate();

        await summaryPage.dismissErrorDialog("wty30302-error-dialog ._modal_1fy9j_13");

        // Before clicking back button screenshot
        await snapExpect(1);

        // Click button back
        await summaryPage.clickBackButton();

        // Verify back to WTY30301 screen
        const currentUrl = page.url();
        expect(currentUrl).toContain('WTY30301SalesInAdvanceCorrection');

        await snapExpect(2);
    });

    test('WTY30302_46', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        // Load data with sbnFlg is 0
        const testData = loadTestData('TY303/wty30302', 'wty30302', 'TC_01');
        // Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });

        // Navigate to target URL
        await summaryPage.navigate();
        
        // Get initial row count
        const initialRowCount = await summaryPage.getRowCount();
        expect(initialRowCount).toBeGreaterThan(0);

        await snapExpect();
    });

    test('WTY30302_47', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        // Load data with sbnFlg is 1 
        const testData = loadTestData('TY303/wty30302', 'wty30302', 'TC_05');
        // Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });

        // Navigate to target URL
        await summaryPage.navigate();
        
        // Get initial row count
        const initialRowCount = await summaryPage.getRowCount();
        expect(initialRowCount).toBeGreaterThan(0);

        await snapExpect();
    });

    test('WTY30302_48', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        // Load data with sbnFlg is 1 
        const testData = loadTestData('TY303/wty30302', 'wty30302', 'TC_06');
        // Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });

        // Navigate to target URL
        await summaryPage.navigate();
        
        // Get initial row count
        const dataRowCount = await summaryPage.getRowCount();
        expect(dataRowCount).toBeGreaterThan(0);

        const isEmptyValue = await summaryPage.isTableCellHaveValue("", WTY30302_COLUMN_NAMES.SIZE);
        expect(isEmptyValue).toBe(true);

        await snapExpect();
    });

    test('WTY30302_49', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        // Load data with cmtKbn is 9
        const testData = loadTestData('TY303/wty30302', 'wty30302', 'TC_07');
        // Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });

        // Navigate to target URL
        await summaryPage.navigate();
        
        // Get initial row count
        const dataRowCount = await summaryPage.getRowCount();
        expect(dataRowCount).toBeGreaterThan(0);

        const isEmptyValue = await summaryPage.isTableCellHaveValue("", WTY30302_COLUMN_NAMES.MULTI_COMMENT);
        expect(isEmptyValue).toBe(true);

        await snapExpect();
    });

    test('WTY30302_51', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        // Load data with multiple POPs
        const testData = loadTestData('TY303/wty30302', 'wty30302', 'TC_02');
        // Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });

        // Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(5000);
        
        // Get initial header position before scrolling
        const initialHeaderPosition = await summaryPage.getTableHeaderPosition();
        expect(initialHeaderPosition.top).toBeGreaterThan(0);

        // Before scrolling screenshot
        await snapExpect(1);

        // Scroll table down
        await summaryPage.scrollTableDownEndOfData();

        // Get header position after scrolling
        const afterScrollHeaderPosition = await summaryPage.getTableHeaderPosition();

        // Verify header position remains fixed (top position should be the same or very close)
        // Allow small difference due to rendering
        expect(afterScrollHeaderPosition.top).toEqual(initialHeaderPosition.top);

        // After scrolling screenshot
        await snapExpect(2);
    });

     test('WTY30302_52', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        // Load data with multiple POPs
        const testData = loadTestData('TY303/wty30302', 'wty30302', 'TC_02');
        // Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });

        // Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(5000);

        // Get initial row count
        const dataRowCount = await summaryPage.getRowCount();
        expect(dataRowCount).toBeGreaterThan(0);

        const isEmptyValue = await summaryPage.isTableCellHaveValue("0", WTY30302_COLUMN_NAMES.QUANTITY);
        expect(isEmptyValue).toBe(true);

        await snapExpect();
    });
    
});

