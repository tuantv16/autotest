import { test, expect, loadTestData } from '../../../base/base-test';
import { TY1040Page } from '../../../pages/TY104/wty10401.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';
import { COMMON_MESSAGES, VALIDATION_ERROR_MESSAGES } from '../../../constants/messages';
import { API_ENDPOINTS } from '../../../constants/api-endpoints';

test.describe('WTY10401 - (店別在庫照会)', () => {
    let summaryPage: TY1040Page;

    test.beforeEach(async ({ page, baseUrl }) => {
        summaryPage = new TY1040Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('WTY10401_demo_screenshot', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_04');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.clickMoveDown();
        await page.waitForTimeout(1000);

        await summaryPage.inputDataSearchBasic(testData.formData);

        const apiResponsePromise = page.waitForResponse((res) => {
            return (
                res.request().method() === 'POST' &&
                res.url().includes(API_ENDPOINTS.TY104_WTY10411ZaiInfoGetBC)
            );
        }, { timeout: 15000 });

        await snapInput();

        await summaryPage.clickSearchButton();

        // Wait for API response to complete
        const apiResponse = await apiResponsePromise;
        expect(apiResponse.status()).toBe(200);

        await snapExpect(1);
        await snapExpect(2);
        await summaryPage.scrollToBottom();

        await page.waitForTimeout(1000);
        await snapExpect(1);
        await snapExpect(3);
        await page.waitForTimeout(4000);
    });

});