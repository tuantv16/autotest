import { test, expect, loadTestData } from '../../../base/base-test';
import { TY30301Page } from '../../../pages/TY303/wty30301.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';

test.describe('WTY30301 - (マルチＰＯＰ出力指示)', () => {

    let summaryPage: TY30301Page;

    test.beforeEach(async ({ page, baseUrl }) => {
        summaryPage = new TY30301Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('WTY30301_72', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {

        const testData = loadTestData('TY303/wty30301', 'wty30301', 'TC_02');
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        // Step 3: Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        snapInput(0);

        // Step 4: Wait for form to be ready
        await summaryPage.waitForFormReady();

        // Step 5: Snapshot only 商品
        await summaryPage.fillForm({
            merchandiseCdInput: testData.formData.merchandiseCdInput,
        });
        await page.waitForTimeout(1000);
        snapInput(1);

        // Step 6: Click search button
        await summaryPage.clickSearchButton();
        await page.waitForTimeout(1000);

        // Step 7: Verify mockSuMae is formatted with thousand separators
        await summaryPage.expectThousandSeparated('mockSuMae');
        await snapExpect();
    });

    test('WTY30301_74', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {

        const testData = loadTestData('TY303/wty30301', 'wty30301', 'TC_02');
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        // Step 3: Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        snapInput(0);

        // Step 4: Wait for form to be ready
        await summaryPage.waitForFormReady();

        // Step 5: Snapshot only 商品
        await summaryPage.fillForm({
            merchandiseCdInput: testData.formData.merchandiseCdInput,
        });
        await page.waitForTimeout(1000);
        snapInput(1);

        // Step 6: Click search button
        await summaryPage.clickSearchButton();
        await page.waitForTimeout(1000);

        // Step 7: Verify yukoZai is formatted with thousand separators
        await summaryPage.expectThousandSeparated('yukoZai');
        await snapExpect();
    });

    test('WTY30301_75', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {

        const testData = loadTestData('TY303/wty30301', 'wty30301', 'TC_02');
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        // Step 3: Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        snapInput(0);

        // Step 4: Wait for form to be ready
        await summaryPage.waitForFormReady();

        // Step 5: Snapshot only 商品
        await summaryPage.fillForm({
            merchandiseCdInput: testData.formData.merchandiseCdInput,
        });
        await page.waitForTimeout(1000);
        snapInput(1);

        // Step 6: Click search button
        await summaryPage.clickSearchButton();
        await page.waitForTimeout(1000);

        // Step 7: Verify tentZai is formatted with thousand separators
        await summaryPage.expectThousandSeparated('tentZai');
        await snapExpect();
    });

    test('WTY30301_76', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {

        const testData = loadTestData('TY303/wty30301', 'wty30301', 'TC_02');
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        // Step 3: Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        snapInput(0);

        // Step 4: Wait for form to be ready
        await summaryPage.waitForFormReady();

        // Step 5: Snapshot only 商品
        await summaryPage.fillForm({
            merchandiseCdInput: testData.formData.merchandiseCdInput,
        });
        await page.waitForTimeout(1000);
        snapInput(1);

        // Step 6: Click search button
        await summaryPage.clickSearchButton();
        await page.waitForTimeout(1000);

        // Step 7: Verify tenjiZai is formatted with thousand separators
        await summaryPage.expectThousandSeparated('tenjiZai');
        await snapExpect();
    });

    test('WTY30301_80', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {

        const testData = loadTestData('TY303/wty30301', 'wty30301', 'TC_02');
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        // Step 3: Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        snapInput(0);

        // Step 4: Wait for form to be ready
        await summaryPage.waitForFormReady();

        // Step 5: Snapshot only 商品
        await summaryPage.fillForm({
            merchandiseCdInput: testData.formData.merchandiseCdInput,
        });
        await page.waitForTimeout(1000);
        snapInput(1);

        // Step 6: Click search button
        await summaryPage.clickSearchButton();
        await page.waitForTimeout(1000);

        // Step 7: Verify tenjiZai is formatted with thousand separators
        await summaryPage.expectThousandSeparated('prtMsu');
        await snapExpect();
    });

    test('WTY30301_81', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {

        const testData = loadTestData('TY303/wty30301', 'wty30301', 'TC_02');
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        // Step 3: Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        snapInput(0);

        // Step 4: Wait for form to be ready
        await summaryPage.waitForFormReady();

        // Step 5: Snapshot only 商品
        await summaryPage.fillForm({
            merchandiseCdInput: testData.formData.merchandiseCdInput,
        });
        await page.waitForTimeout(1000);
        snapInput(1);

        // Step 6: Click search button
        await summaryPage.clickSearchButton();
        await page.waitForTimeout(1000);

        // Step 7: Verify keisaiKk is formatted with thousand separators
        await summaryPage.expectThousandSeparated('keisaiKk');
        await snapExpect();
    });

    test('WTY30301_82', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {

        const testData = loadTestData('TY303/wty30301', 'wty30301', 'TC_02');
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        // Step 3: Navigate to target URL
        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        snapInput(0);

        // Step 4: Wait for form to be ready
        await summaryPage.waitForFormReady();

        // Step 5: Snapshot only 商品
        await summaryPage.fillForm({
            merchandiseCdInput: testData.formData.merchandiseCdInput,
        });
        await page.waitForTimeout(1000);
        snapInput(1);

        // Step 6: Click search button
        await summaryPage.clickSearchButton();
        await page.waitForTimeout(1000);

        // Step 7: Verify lbk is formatted with thousand separators
        await summaryPage.expectThousandSeparated('lbk');
        await snapExpect();
    });
});