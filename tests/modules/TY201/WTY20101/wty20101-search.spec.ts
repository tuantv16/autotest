/**
 * WTY20101 
 * Tests for 摘要欄入力 screen using Page Object Model
 */
import { test, expect, loadTestDataTS } from '../../../base/base-test';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';
import { COMMON_MESSAGES, VALIDATION_ERROR_MESSAGES } from '../../../constants/messages';
import { TY20101Page } from '../../../pages/TY201/wty20101.page';

test.describe('WTY20101', () => {
    let summaryPage: TY20101Page;

    test.beforeEach(async ({ page, baseUrl }) => {
        summaryPage = new TY20101Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('WTY20101_26', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestDataTS('TY201/wty20101', 'wty20101', 'TC_01');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);

        await summaryPage.navigate();
        await page.waitForTimeout(5000);
        await snapInput();
        // await summaryPage.fillForm(testData.formData.inputData);
        // await snapInput();
        // await summaryPage.clickConfirm();
        
        // const successMessageFound = await summaryPage.waitForTextInBody(COMMON_MESSAGES.REGISTRATION_COMPLETED, 5000);
        // expect(successMessageFound).toBe(true);
        // await snapExpect();
    });

});