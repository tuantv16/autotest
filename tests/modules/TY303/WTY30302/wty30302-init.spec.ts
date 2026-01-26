/**
 * WTY30302 Summary Input Test Suite
 * Tests for マルチPOP出力指示一覧 screen using Page Object Model
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';
import { TY30302Page } from '../../../pages/TY303/wty30302.page';

test.describe('WTY30302 - (マルチPOP出力指示一覧)', () => {
    let summaryPage: TY30302Page;

    test.beforeEach(async ({ page, baseUrl }) => {
        summaryPage = new TY30302Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('WTY30302_05', async ({
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

        // Wait for page to be ready and verify heading title
        const isVisible = await summaryPage.isHeadingTitleVisible();
        expect(isVisible).toBe(true);

        // Open action menu by clicking MUI button
        await summaryPage.clickMuiButton();

        // Verify Delete button (削除) is visible
        const isDeleteButtonVisible = await summaryPage.isDeleteButtonVisible();
        expect(isDeleteButtonVisible).toBe(true);

        // Verify Edit button (修正) is visible
        const isEditButtonVisible = await summaryPage.isEditButtonVisible();
        expect(isEditButtonVisible).toBe(true);

        // Verify POP list table is visible
        const isTableVisible = await summaryPage.isPopListTableVisible();
        expect(isTableVisible).toBe(true);

        await snapExpect();
    });

    test('WTY30302_06', async ({
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

        // Verify column "No" exists
        const isColumnNoVisible = await summaryPage.isColumnNoVisible();
        expect(isColumnNoVisible).toBe(true);

        // Verify column "型番" exists
        const isColumnKatabanVisible = await summaryPage.isColumnKatabanVisible();
        expect(isColumnKatabanVisible).toBe(true);

        // Verify column "サイズ" exists
        const isColumnSizeVisible = await summaryPage.isColumnSizeVisible();
        expect(isColumnSizeVisible).toBe(true);

        // Verify column "枚数" exists
        const isColumnMaisuVisible = await summaryPage.isColumnMaisuVisible();
        expect(isColumnMaisuVisible).toBe(true);

        // Verify column "マルチコメント" exists
        const isColumnMultiCommentVisible = await summaryPage.isColumnMultiCommentVisible();
        expect(isColumnMultiCommentVisible).toBe(true);

        // Verify column "セール名" exists
        const isColumnSaleNameVisible = await summaryPage.isColumnSaleNameVisible();
        expect(isColumnSaleNameVisible).toBe(true);

        await snapExpect();
    });

    test('WTY30302_07', async ({
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

        // Verify Back button (戻る) is visible and enabled
        const isBackButtonVisible = await summaryPage.isBackButtonVisible();
        expect(isBackButtonVisible).toBe(true);
        const isBackButtonEnabled = await summaryPage.isBackButtonEnabled();
        expect(isBackButtonEnabled).toBe(true);

        // Open action menu to check Delete and Edit buttons
        await summaryPage.clickMuiButton();

        // Verify Delete button (削除) is visible and enabled
        const isDeleteButtonVisible = await summaryPage.isDeleteButtonVisible();
        expect(isDeleteButtonVisible).toBe(true);
        const isDeleteButtonEnabled = await summaryPage.isDeleteButtonEnabled();
        expect(isDeleteButtonEnabled).toBe(true);

        // Verify Edit button (修正) is visible and enabled
        const isEditButtonVisible = await summaryPage.isEditButtonVisible();
        expect(isEditButtonVisible).toBe(true);
        const isEditButtonEnabled = await summaryPage.isEditButtonEnabled();
        expect(isEditButtonEnabled).toBe(true);

        await snapExpect();
    });
});
