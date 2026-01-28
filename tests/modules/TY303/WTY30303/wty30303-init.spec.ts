import { test, expect, loadTestData } from '../../../base/base-test';
import { TY30303Page } from "../../../pages/TY303/wty30303.page";
import { takeScreenshotOnFailure } from '../../../utils/common-helper';

test.describe('WTY30301 - (セール選択)', () => {
    let summaryPage: TY30303Page;

    test.beforeEach(async ({ page, baseUrl }) => {
        summaryPage = new TY30303Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('WTY30303_08', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {
        const testData = loadTestData('TY303/wty30303', 'wty30303', 'TC_01');
        
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(1000);

        // Step 3: Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        await snapInput();

        // Step 4: Verify セール is displayed as「新春セール」
        await summaryPage.verifyMultiCommentText(0, '新春セール');
        await snapExpect();
    });

    test('WTY30303_09', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {
        const testData = loadTestData('TY303/wty30303', 'wty30303', 'TC_01');
        
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(1000);

        // Step 3: Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        await snapInput();

        // Step 4: Verify 期間 is displayed as「2026/01/01　～　2026/01/31」
        await summaryPage.verifyMultiCommentText(0, '2026/01/01　～　2026/01/31');
        await snapExpect();
    });

    test('WTY30303_10', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {
        const testData = loadTestData('TY303/wty30303', 'wty30303', 'TC_01');
        
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(1000);

        // Step 3: Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        await snapInput();

        // Step 4: Verify マルチコメント is displayed as「ズバリ」
        await summaryPage.verifyMultiCommentText(0, 'ズバリ');
        await snapExpect();
    });

    test('WTY30303_11', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {
        const testData = loadTestData('TY303/wty30303', 'wty30303', 'TC_01');
        
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(1000);

        // Step 3: Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        await snapInput();

        // Step 4: Verify マルチコメント is displayed as「インプロ」
        await summaryPage.verifyMultiCommentText(1, 'インプロ');
        await snapExpect();
    });

    test('WTY30303_12', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {
        const testData = loadTestData('TY303/wty30303', 'wty30303', 'TC_01');

        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(1000);

        // Step 3: Navigate to セール選択 screen
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        await snapInput();

        // Step 4: Verify マルチコメント is blank
        await summaryPage.verifyMultiCommentIsBlank(2);
        await snapExpect();
    });

    test('WTY30303_13', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {
        const testData = loadTestData('TY303/wty30303', 'wty30303', 'TC_04');

        // Step 1: Open base URL
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        // Step 2: Initialize IndexedDB with mock data
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(1000);

        // Step 3: Navigate to セール選択 screen
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        await snapInput();

        // Step 4: Verify sale text color is black
        await summaryPage.verifySaleTextColor(0, false);
        await snapExpect();
    });

    test('WTY30303_14', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {
        const testData = loadTestData('TY303/wty30303', 'wty30303', 'TC_04');

        // Step 1: Open base URL
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        // Step 2: Initialize IndexedDB with mock data
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(1000);

        // Step 3: Navigate to セール選択 screen
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        await snapInput();

        // Step 4: Verify sale text color is blue
        await summaryPage.verifySaleTextColor(1, true);
        await snapExpect();
    });

    test('WTY30303_15', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {
        const testData = loadTestData('TY303/wty30303', 'wty30303', 'TC_04');

        // Step 1: Open base URL
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        // Step 2: Initialize IndexedDB with mock data
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(1000);

        // Step 3: Navigate to セール選択 screen
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        await snapInput();

        // Step 4: Verify preview notice for printed (blue) sales is displayed
        const notice = await summaryPage.waitForTextInBody('青色のセールは印刷指示済です', 5000);
        expect(notice).toBe(true);
        await snapExpect();
    });

    test('WTY30303_16', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {
        const testData = loadTestData('TY303/wty30303', 'wty30303', 'TC_01');

        // Step 1: Open base URL
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        // Step 2: Initialize IndexedDB with mock data
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(1000);

        // Step 3: Navigate to セール選択 screen
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        await snapInput();

        // Step 4: Click first sale
        await summaryPage.getRowByIndex(0).click();
        await page.waitForTimeout(1000);

        // Step 5: Verify selected sale & confirm button
        await summaryPage.verifySaleHighlighted(0);
        await summaryPage.verifyFooterButtonVisible('確定');
        await snapExpect();
    });

    test('WTY30303_17', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
        }) => {
        const testData = loadTestData('TY303/wty30303', 'wty30303', 'TC_01');

        // Step 1: Open base URL
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        // Step 2: Initialize IndexedDB with mock data
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(1000);

        // Step 3: Navigate to セール選択 screen
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        await snapInput();

        // Step 4: Ensure table has data and click first sale (use page object methods only)
        const rowCount = await summaryPage.getRowCount();
        if (rowCount < 1) {
            throw new Error(`Expected table to have at least 1 row, but found ${rowCount}`);
        }
        await summaryPage.getRowByIndex(0).click();
        await page.waitForTimeout(1000);

        // Step 5: Verify selected sale background is highlighted and sale image is visible
        await summaryPage.verifySaleHighlighted(0);
        const imgVisible = await summaryPage.isSaleImageVisible(0);
        expect(imgVisible).toBe(true);
                await snapExpect();
    });

    test('WTY30303_18', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {
        const testData = loadTestData('TY303/wty30303', 'wty30303', 'TC_01');

        // Step 1: Open base URL
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        // Step 2: Initialize IndexedDB with mock data
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(1000);

        // Step 3: Navigate to セール選択 screen
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        await snapInput();

        // Step 4: Select first sale (index 0)
        const rowCount = await summaryPage.getRowCount();
        if (rowCount < 1) {
            throw new Error(`Expected at least 1 row, but found ${rowCount}`);
        }
        await summaryPage.getRowByIndex(0).click();
        await page.waitForTimeout(1000);

        // Step 5: Verify Edion sale image is visible and Pict image is hidden
        const previewSrc = await summaryPage.getPreviewImageSrc();
        expect(previewSrc).toBeTruthy();
        // EDION images contain 'EDION' or '/EDIONw/' in src
        expect(previewSrc?.toLowerCase()).toContain('edion');

        const pictVisible = await summaryPage.isPictImageVisible();
        expect(pictVisible).toBe(false);

        await snapExpect();
    });

    test('WTY30303_19', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {
        const testData = loadTestData('TY303/wty30303', 'wty30303', 'TC_01');

        // Step 1: Open base URL
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        // Step 2: Initialize IndexedDB with mock data
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(1000);

        // Step 3: Navigate to セール選択 screen
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        await snapInput();

        // Step 4: Select second sale (index 1) which is expected to have ediontsutayaFlg != "1"
        const rowCount2 = await summaryPage.getRowCount();
        if (rowCount2 < 2) {
            throw new Error(`Expected at least 2 rows, but found ${rowCount2}`);
        }
        await summaryPage.getRowByIndex(1).click();
        await page.waitForTimeout(1000);

        // Step 5: Verify セール Image (EDION) and Pict Image both visible
        const previewSrc2 = await summaryPage.getPreviewImageSrc();
        expect(previewSrc2).toBeTruthy();

        const saleImgVisible = await summaryPage.isSaleImageVisible(1);
        expect(saleImgVisible).toBe(true);

        const pictVisible2 = await summaryPage.isPictImageVisible();
        expect(pictVisible2).toBe(true);
        await snapExpect();
    });

    test('WTY30303_20', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {
        const testData = loadTestData('TY303/wty30303', 'wty30303', 'TC_01');

        // Step 1: Open base URL
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        // Step 2: Initialize IndexedDB with mock data
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(1000);

        // Step 3: Navigate to セール選択 screen and prepare
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        await snapInput();

        // Step 4: Select first sale (row 1)
        const rowCount = await summaryPage.getRowCount();
        if (rowCount < 1) {
            throw new Error(`Expected table to have at least 1 row, but found ${rowCount}`);
        }
        await summaryPage.getRowByIndex(0).click();
        await page.waitForTimeout(1000);

        // Step 5: Click footer confirm and verify navigation returns to previous screen
        await summaryPage.verifySaleHighlighted(0);
        await summaryPage.clickFooterConfirm('確定');
        await page.waitForTimeout(1500);

        const isSaleTitleVisibleAfter = await summaryPage.isSaleTitleVisible();
        expect(isSaleTitleVisibleAfter).toBe(false);
        await snapExpect();
    });

    test('WTY30303_21', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {
        const testData = loadTestData('TY303/wty30303', 'wty30303', 'TC_01');
        
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(1000);

        // Step 3: Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        await snapInput();

        // Step 4: Verify back button (<) is visible on the header
        const isBackButtonVisible = await summaryPage.isBackButtonVisible();
        expect(isBackButtonVisible).toBe(true);

        // Step 5: Click the back button
        await summaryPage.clickBackButton();
        await page.waitForTimeout(2000);

        // Step 6: Verify navigation returns to previous screen
        const isSaleTitleVisible = await summaryPage.isSaleTitleVisible();
        expect(isSaleTitleVisible).toBe(false);
        await snapExpect();
    });

    test('WTY30303_22', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {
        const testData = loadTestData('TY303/wty30303', 'wty30303', 'TC_01');

        // Step 1: Open base URL
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        // Step 2: Inject IndexedDB
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(1000);

        // Step 3: Navigate to セール選択 screen
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        await snapInput();

        // Step 4: Verify 期間 format
        await summaryPage.verifyPeriodDateFormat(0);
        await snapExpect();
    });

    test('WTY30303_23', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {
        const testData = loadTestData('TY303/wty30303', 'wty30303', 'TC_01');

        // Step 1: Open application
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        // Step 2: Inject IndexedDB mock data
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(1000);

        // Step 3: Navigate to セール選択 screen
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        await snapInput();

        // Step 4: Verify sale not printed (shoriMode = "1") is displayed in black
        await summaryPage.verifySaleTextColor(0, false);

        // Step 5: Verify sale printed (shoriMode = "2") is displayed in blue
        await summaryPage.verifySaleTextColor(1, true);

        await snapExpect();
    });

    test('WTY30303_24', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {
        const testData = loadTestData('TY303/wty30303', 'wty30303', 'TC_01');

        // Step 1: Go to base URL
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        // Step 2: Inject IndexedDB data
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        // Step 3: Navigate to セール選択 screen
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        await snapInput();

        // Step 4: Ensure table has at least 1 row
        const rowCount = await summaryPage.getRowCount();
        if (rowCount < 1) {
            throw new Error(`Expected table to have at least 1 row, but found ${rowCount}`);
        }

        // Step 5: Click the first sale repeatedly (simulate rapid clicks)
        const clickTimes = 5;
        let lastSrc = null;
        for (let i = 0; i < clickTimes; i++) {
            await summaryPage.getRowByIndex(0).click();
            // small pause between clicks to simulate user
            await page.waitForTimeout(200);
            // capture preview src after each click
            lastSrc = await summaryPage.getPreviewImageSrc();
        }

        // Step 6: Verify the sale row is highlighted, confirm button is visible and enabled, and preview image is visible
        await summaryPage.verifySaleHighlighted(0);
        await summaryPage.verifyFooterButtonVisible('確定');
        const imgVisible = await summaryPage.isSaleImageVisible(0);
        expect(imgVisible).toBe(true);
        // Ensure preview src updated and is same as last captured
        const finalSrc = await summaryPage.getPreviewImageSrc();
        expect(finalSrc).toBe(lastSrc);

        await snapExpect();
    });

    test('WTY30303_26', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {
        const testData = loadTestData('TY303/wty30303', 'wty30303', 'TC_01');

        // Step 1: Go to base URL
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        // Step 2: Inject IndexedDB data
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        // Step 3: Navigate to セール選択 screen
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        await snapInput();

        // Step 4: Verify 掲載価格 format of first sale
        await summaryPage.verifyPriceFormat(0);

        await snapExpect();
    });

    test('WTY30303_27', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {
        const testData = loadTestData('TY303/wty30303', 'wty30303', 'TC_01');

        // Step 1: Open base URL
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        // Step 2: Inject IndexedDB data
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(1000);

        // Step 3: Navigate to セール選択 screen
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        await snapInput();

        // Step 4: Require list has multiple rows
        const rowCount = await summaryPage.getRowCount();
        if (rowCount < 3) {
            throw new Error(`Expected table to have multiple rows (>=3), but found ${rowCount}`);
        }

        // Step 5: Scroll to middle of the list and click that row
        const midIndex = Math.floor(rowCount / 2);
        const midRow = summaryPage.getRowByIndex(midIndex);
        await midRow.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
        await midRow.click();
        await page.waitForTimeout(1000);

        // Step 6: Verify that the clicked sale is highlighted, footer confirm displayed, and preview image visible
        await summaryPage.verifySaleHighlighted(midIndex);
        await summaryPage.verifyFooterButtonVisible('確定');
        const imgVisible = await summaryPage.isSaleImageVisible(midIndex);
        expect(imgVisible).toBe(true);

        // Optional: check preview src exists
        const previewSrc = await summaryPage.getPreviewImageSrc();
        expect(previewSrc).toBeTruthy();
        await snapExpect();
    });

    test('WTY30303_28', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {
        const testData = loadTestData('TY303/wty30303', 'wty30303', 'TC_01');

        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(1000);

        // Step 3: Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        // Step 4: Select first sale
        const rowCount = await summaryPage.getRowCount();
        if (rowCount < 1) throw new Error(`Expected at least 1 row, found ${rowCount}`);
        await summaryPage.getRowByIndex(0).click();
        await page.waitForTimeout(1000);

        // verify selection present before reload
        await summaryPage.verifySaleHighlighted(0);
        await summaryPage.verifyFooterButtonVisible('確定');
        const imgVisibleBefore = await summaryPage.isSaleImageVisible(0);
        expect(imgVisibleBefore).toBe(true);
        await snapInput();

        // Step 5: Clear client-side storage AND IndexedDB then reload the page
        await page.reload({ waitUntil: 'domcontentloaded' });
        await page.waitForLoadState('networkidle');

        // Wait for the list to re-render after reload. Do NOT call summaryPage.navigate() here
        // because that would trigger a second full load.
        await summaryPage.waitForVisible(summaryPage.getRowByIndex(0), 5000);

        // Confirm button should not be visible
        const confirmVisible = await summaryPage.isFooterButtonVisible('確定');
        expect(confirmVisible).toBe(false);

        // Preview image should not be visible
        const imgVisibleAfter = await summaryPage.isSaleImageVisible(0);
        expect(imgVisibleAfter).toBe(false);
        await snapExpect();
    });

    test('WTY30303_29', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {
        const testData = loadTestData('TY303/wty30303', 'wty30303', 'TC_01');

        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(1000);

        // Step 3: Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        await snapInput();

        // Step 4: Verify back button (<) is visible on the header
        const isBackButtonVisible = await summaryPage.isBackButtonVisible();
        expect(isBackButtonVisible).toBe(true);

        // Step 5: Click the back button
        await summaryPage.clickBackButton();
        await page.waitForTimeout(2000);

        // Step 6: Verify navigation returns to previous screen
        const isSaleTitleVisible = await summaryPage.isSaleTitleVisible();
        expect(isSaleTitleVisible).toBe(false);
        await snapExpect();
    });

    test('WTY30303_30', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {
        const testData = loadTestData('TY303/wty30303', 'wty30303', 'TC_01');

        // Step 1: Open the application and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        // Step 2: Inject IndexedDB mock data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(1000);

        // Step 3: Navigate to Sale Selection screen (セール選択)
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        await snapInput();

        // Step 4: Select one sale
        await summaryPage.getRowByIndex(0).click();
        await page.waitForTimeout(1000);

        // Step 5: Verify back button (<) is visible
        const isBackButtonVisible = await summaryPage.isBackButtonVisible();
        expect(isBackButtonVisible).toBe(true);

        // Step 6: Click the back button (<)
        await summaryPage.clickBackButton();
        await page.waitForTimeout(2000);

        // Step 7: Verify navigation returns to the previous screen
        const isSaleTitleVisible = await summaryPage.isSaleTitleVisible();
        expect(isSaleTitleVisible).toBe(false);

        // Step 8: Capture expected snapshot
        await snapExpect();
    });

    test('WTY30303_31', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {
        const testData = loadTestData('TY303/wty30303', 'wty30303', 'TC_01');

        // Step 1: Open base URL
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        // Step 2: Initialize IndexedDB with mock data
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(1000);

        // Step 3: Navigate to セール選択 screen
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        await snapInput();

        // Step 4: Ensure there is at least one row and select the first
        const rowCount = await summaryPage.getRowCount();
        if (rowCount < 1) {
            throw new Error(`Expected at least 1 row, but found ${rowCount}`);
        }
        await summaryPage.getRowByIndex(0).click();
        await page.waitForTimeout(1000);

        // Step 5: Verify footer confirm button visible and positioned at bottom
        await summaryPage.verifySaleHighlighted(0);
        await summaryPage.verifyFooterButtonVisible('確定');
        const imgVisible = await summaryPage.isSaleImageVisible(0);
        expect(imgVisible).toBe(true);
        const previewSrc = await summaryPage.getPreviewImageSrc();
        expect(previewSrc).toBeTruthy();
    });

    test('WTY30303_32', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {
        const testData = loadTestData('TY303/wty30303', 'wty30303', 'TC_01');

        // Step 1: Open base URL
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        // Step 2: Initialize IndexedDB with mock data
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(1000);

        // Step 3: Navigate to セール選択 screen
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        await snapInput();

        // Step 4: Ensure there is at least one row and select the last row
        const rowCount = await summaryPage.getRowCount();
        if (rowCount < 1) {
            throw new Error(`Expected at least 1 row, but found ${rowCount}`);
        }
        const lastIndex = rowCount - 1;
        const lastRow = summaryPage.getRowByIndex(lastIndex);
        await lastRow.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        await lastRow.click();
        await page.waitForTimeout(1000);

        // Step 5: Verify footer confirm button visible and positioned at bottom, and image preview shows
        await summaryPage.verifySaleHighlighted(lastIndex);
        await summaryPage.verifyFooterButtonVisible('確定');
        const imgVisible = await summaryPage.isSaleImageVisible(lastIndex);
        expect(imgVisible).toBe(true);
        const previewSrc = await summaryPage.getPreviewImageSrc();
        expect(previewSrc).toBeTruthy();
        await snapExpect();
    });

    test('WTY30303_33', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {
        const testData = loadTestData('TY303/wty30303', 'wty30303', 'TC_01');

        // Step 1: Open base URL
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        // Step 2: Initialize IndexedDB with mock data
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(1000);

        // Step 3: Navigate to セール選択 screen
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        await snapInput();

        // Step 4: Ensure there are 2-3 rows (no need to scroll)
        const rowCount = await summaryPage.getRowCount();
        if (rowCount < 2 || rowCount > 3) {
            throw new Error(`Expected table to have 2-3 rows for this case, but found ${rowCount}`);
        }

        // Step 5: Verify a vertical scrollbar IS visible in the grid viewport (force-scrollcase)
        const hasNoVScroll = await summaryPage.hasNoVerticalScroll();
        const hasVScroll = !hasNoVScroll;
        expect(hasVScroll).toBe(true);
        await snapExpect();
    });

    test('WTY30303_34', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {
        const testData = loadTestData('TY303/wty30303', 'wty30303', 'TC_01');

        // Step 1: Open base URL
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        // Step 2: Initialize IndexedDB with mock data
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(1000);

        // Step 3: Navigate to セール選択 screen
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        await snapInput();

        // Step 4: Ensure there is at least one row and select the first
        const rowCount = await summaryPage.getRowCount();
        if (rowCount < 1) {
            throw new Error(`Expected at least 1 row, but found ${rowCount}`);
        }
        await summaryPage.getRowByIndex(0).click();
        await page.waitForTimeout(1000);

        // Step 5: Verify selected sale is highlighted, confirm button and image visible
        await summaryPage.verifySaleHighlighted(0);
        await summaryPage.verifyFooterButtonVisible('確定');
        const imgVisibleBefore = await summaryPage.isSaleImageVisible(0);
        expect(imgVisibleBefore).toBe(true);

        // Step 6: Click outside the selection area
        await summaryPage.clickOutside();
        await page.waitForTimeout(1000);

        // Step 7: Verify selection remains, confirm button and image still visible
        await summaryPage.verifySaleHighlighted(0);
        await summaryPage.verifyFooterButtonVisible('確定');
        const imgVisibleAfter = await summaryPage.isSaleImageVisible(0);
        expect(imgVisibleAfter).toBe(true);
        await snapExpect();
    });

    test('WTY30303_35', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {
        const testData = loadTestData('TY303/wty30303', 'wty30303', 'TC_02');

        // Step 1: Open the application and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        // Step 2: Inject IndexedDB mock data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(1000);

        // Step 3: Navigate to Sale Selection screen (セール選択)
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        await snapInput();

        // Step 4: Verify no data message
        const noDataMessageFound = await summaryPage.waitForTextInBody('該当データが存在しません。', 5000);
        expect(noDataMessageFound).toBe(true);
        await snapExpect();
    });

    test('WTY30303_36', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {
        const testData = loadTestData('TY303/wty30303', 'wty30303', 'TC_01');

        // Step 1: Go to base URL
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        // Step 2: Inject IndexedDB data (API resultCnt > 0)
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(1000);

        // Step 3: Navigate to セール選択 screen
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        await snapInput();

        // Step 4: Verify sale list table is displayed 
        const firstRow = summaryPage.getRowByIndex(0);
        await expect(firstRow).toBeVisible();
        await snapExpect();
    });

    test('WTY30303_37', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {
        const testData = loadTestData('TY303/wty30303', 'wty30303', 'TC_01');

        // Step 1: Open base URL
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        // Step 2: Initialize IndexedDB with mock data
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(1000);

        // Step 3: Navigate to セール選択 screen
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        await snapInput();

        // Step 4: Ensure there is at least one sale and select it
        const rowCount = await summaryPage.getRowCount();
        if (rowCount < 1) {
            throw new Error(`Expected at least 1 row, but found ${rowCount}`);
        }
        await summaryPage.getRowByIndex(0).click();
        await page.waitForTimeout(500);

        // Step 5: Click 確定 to navigate to WTY30301 (マルチＰＯＰ出力指示)
        await summaryPage.clickFooterConfirm('確定');

        // Step 6: Verify navigation to WTY30301
        await page.waitForTimeout(1000);
        const currentUrl = page.url();
        expect(currentUrl).toContain('WTY30301SalesInAdvanceCorrection');

        // Also verify title on page
        const titleFound = await summaryPage.waitForTextInBody('マルチＰＯＰ出力指示', 5000);
        expect(titleFound).toBe(true);
        await snapExpect();
    });

    test('WTY30303_38', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {
        const testData = loadTestData('TY303/wty30303', 'wty30303', 'TC_03');

        // Step 1: Go to base URL
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        // Step 2: Inject IndexedDB data (API resultCnt > 0)
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(1000);

        // Step 3: Navigate to セール選択 screen
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        await snapInput();

        // Step 4: Verify message error api response
        const noDataMessageFound = await summaryPage.waitForTextInBody('パラメータ不正（部店コード）が誤っています。', 5000);
        expect(noDataMessageFound).toBe(true);
        await snapExpect();
    });
});