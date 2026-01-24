/**
 * WTY30302 Summary Input Test Suite
 * Tests for マルチPOP出力指示一覧 screen using Page Object Model
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';
import { TY30302Page } from '../../../pages/TY303/wty30302.page';
import { WTY30302_COLUMN_NAMES } from '../../../constants/messages'; 

test.describe('WTY30302 - (マルチPOP出力指示一覧)', () => {
    let summaryPage: TY30302Page;

    test.beforeEach(async ({ page, baseUrl }) => {
        summaryPage = new TY30302Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('WTY30302_10~24', async ({
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
        // TC_02 has サイズ = "C" (A4)
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });

        // Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(5000);

        // Verify POP list table is visible
        const isTableVisible = await summaryPage.isPopListTableVisible();
        expect(isTableVisible).toBe(true);

        // Verify table contains サイズ value "A4"
        const sizeMap: Record<string, string> = {
            'C': 'Ａ４',
            'D': 'Ａ５',
            'E': 'Ａ６',
            'F': 'Ａ７',
            'G': 'Ａ８',
            'H': 'ＤＶＤ',
            'I': '冷蔵庫',
            'J': '調理',
            '1': 'Ｅ１',
            '2': 'Ｅ２',
            '3': 'Ｅ３',
            '4': 'Ｅ４',
            '5': 'Ｅ５',
            '6': 'Ｅ６',
            '7': 'Ｍ１',
        }
        
        for (const size of Object.values(sizeMap)) {
            const hasValue = await summaryPage.isTableCellHaveValue(size, WTY30302_COLUMN_NAMES.SIZE);
            expect(hasValue).toBe(true);
            await snapExpect(size);
        }
    });

    test('WTY30302_25~29', async ({
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

        // Verify POP list table is visible
        const isTableVisible = await summaryPage.isPopListTableVisible();
        expect(isTableVisible).toBe(true);

        // Verify cmt
        const cmtMap: Record<string, string> = {
            '1': 'ズバリ',
            '2': 'さら割',
            '3': 'インプロ',
            '4': 'さら割＆インプロ',
            '5': ''
        }
         
        for (const cmt of Object.values(cmtMap)) {
            const hasValue = await summaryPage.isTableCellHaveValue(cmt, WTY30302_COLUMN_NAMES.MULTI_COMMENT);
            expect(hasValue).toBe(true);
            await snapExpect(cmt);
        }
    });

    test('WTY30302_30', async ({
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

        // Verify POP list table is visible
        const isTableVisible = await summaryPage.isPopListTableVisible();
        expect(isTableVisible).toBe(true);

        // Verify cmt
        const prtMsu = "5"

        const hasValue = await summaryPage.isTableCellHaveValue(prtMsu, WTY30302_COLUMN_NAMES.QUANTITY);
        expect(hasValue).toBe(true);
        await snapExpect();
    });

    test('WTY30302_31', async ({
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

        // Verify POP list table is visible
        const isTableVisible = await summaryPage.isPopListTableVisible();
        expect(isTableVisible).toBe(true);

        // Verify mkKata
        const mkKata = "ABC-123"

        const hasValue = await summaryPage.isTableCellHaveValue(mkKata, WTY30302_COLUMN_NAMES.MODEL_NUMBER);
        expect(hasValue).toBe(true);

        await snapExpect();
    });

    test('WTY30302_32~33', async ({
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

        // Verify POP list table is visible
        const isTableVisible = await summaryPage.isPopListTableVisible();
        expect(isTableVisible).toBe(true);

        // Verify kkNm
        const kkNm: Record<string, string> = {
            '1': '新春セール',
            '2': '',
        }

        for (const kk of Object.values(kkNm)) {
            const hasValue = await summaryPage.isTableCellHaveValue(kk, WTY30302_COLUMN_NAMES.SALE_NAME);
            expect(hasValue).toBe(true);
            await snapExpect(kk);
        }
    });
});
