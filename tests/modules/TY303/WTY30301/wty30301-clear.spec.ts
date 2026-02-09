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

    test('WTY30301_124', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {
        const testData = loadTestData('TY303/wty30301', 'wty30301', 'TC_01');

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
        await snapInput(1);

        // Step 4: Wait for form to be ready
        await summaryPage.waitForFormReady();
        const initialFormValues = await summaryPage.getFormValues();

        // Step 5: Fill form
        await summaryPage.fillForm(testData.formData);
        await page.waitForTimeout(1000);
        await snapInput(2);

        // Step 6: Clear form
        await summaryPage.clickFooterClear();
        await page.waitForTimeout(1000);

        // Step 7: Verify form is cleared
        await summaryPage.verifyFormEquals(initialFormValues);
        await snapExpect();
    });

    test('WTY30301_125', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {
        const testData = loadTestData('TY303/wty30301', 'wty30301', 'TC_01');

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
        await snapInput(1)

        // Step 4: Wait for form to be ready
        await summaryPage.waitForFormReady();
        const { outputDateInput } = await summaryPage.getFormValues();

        // Step 5: Snapshot only 出力日
        await summaryPage.fillForm({
            outputDateInput: testData.formData.outputDateInput,
        });
        await page.waitForTimeout(1000);
        await snapInput(2)

        // Step 6: Fill only 出力日
        await summaryPage.clickFooterClear();
        await page.waitForTimeout(1000);

        // Step 7: Verify form is cleared
        await summaryPage.verifyFormEquals({
            outputDateInput,
        });
        await snapExpect();
    });

    test('WTY30301_130', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {
        const testData = loadTestData('TY303/wty30301', 'wty30301', 'TC_01');

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
        await snapInput(1)

        // Step 4: Wait for form to be ready
        await summaryPage.waitForFormReady();
        const { sizeInput } = await summaryPage.getFormValues();

        // Step 5: Snapshot only サイズ
        await summaryPage.fillForm({
            sizeInput: testData.formData.sizeInput,
        });
        await page.waitForTimeout(1000);
        await snapInput(2)

        // Step 6: Fill only サイズ
        await summaryPage.clickFooterClear();
        await page.waitForTimeout(1000);

        // Step 7: Verify form is cleared
        await summaryPage.verifyFormEquals({
            sizeInput,
        });
        await snapExpect();
    });
});