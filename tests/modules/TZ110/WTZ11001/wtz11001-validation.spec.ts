/**
 * WTZ11001 Delivery work result search Test Suite
 * Tests for 配達工事果検索 screen using Page Object Model
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { WTZ11001Page } from '../../../pages/TZ110/wtz11001.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';
import { VALIDATION_ERROR_MESSAGES } from '../../../pages/TZ110/const/const-wtz110';
test.describe('WTZ11001 - Delivery work result search (配達工事果検索)', () => {
    let deliveryWorkPage: WTZ11001Page;

    test.beforeEach(async ({ page, baseUrl }) => {
        deliveryWorkPage = new WTZ11001Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('WTZ11001_14', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        
        await page.waitForTimeout(500);

        await deliveryWorkPage.navigate();
        await page.waitForTimeout(1000);

        await deliveryWorkPage.waitForFormReady();

        await deliveryWorkPage.clickHaiMdKbn(3);

        await deliveryWorkPage.clearHaikojiDate();

        await deliveryWorkPage.clickSearchButton();

        const button1 = await deliveryWorkPage.waitForTextInBody(VALIDATION_ERROR_MESSAGES.REQUIRED_FIELD);
        expect(button1).toBe(true);
        await page.waitForTimeout(500);
        await snapExpect();
    });

    test('WTZ11001_15', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TZ110/wtz11001', 'wtz11001', 'TC_15');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        await indexedDBHelper.initializeDB({
            commonData: testData.commonData
        });

        await deliveryWorkPage.navigate();
        await page.waitForTimeout(1000);

        await deliveryWorkPage.waitForFormReady();

        await deliveryWorkPage.clickHaiMdKbn(3);
        await page.waitForTimeout(1000);
        await deliveryWorkPage.fillHaikojiDate(testData.formData.haikojiDate_15);
        await page.waitForTimeout(500);
        await deliveryWorkPage.fillChikiCd(testData.formData.chikiCd_15);
        await page.waitForTimeout(500);
        await page.locator(deliveryWorkPage.selectorsObj.chikiCdInput).blur();
        await page.waitForTimeout(500);

        await deliveryWorkPage.clickSearchButton();

        const button1 = await deliveryWorkPage.waitForTextInBody('有効な日付の範囲は 2025/10/28 以上 2026/04/27 以下です。');
        expect(button1).toBe(true);
        await page.waitForTimeout(500);
        await snapExpect();
    });

    test('WTZ11001_16', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TZ110/wtz11001', 'wtz11001', 'TC_15');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        await indexedDBHelper.initializeDB({
            commonData: testData.commonData
        });

        await deliveryWorkPage.navigate();
        await page.waitForTimeout(1000);

        await deliveryWorkPage.waitForFormReady();

        await deliveryWorkPage.clickSearchButton();

        const button1 = await deliveryWorkPage.waitForTextInBody(VALIDATION_ERROR_MESSAGES.REQUIRED_FIELD);
        expect(button1).toBe(true);
        await page.waitForTimeout(500);
        await snapExpect();
    });

     test('WTZ11001_17', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TZ110/wtz11001', 'wtz11001', 'TC_15');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        await indexedDBHelper.initializeDB({
            commonData: testData.commonData
        });

        await deliveryWorkPage.navigate();
        await page.waitForTimeout(1000);

        await deliveryWorkPage.waitForFormReady();

        await deliveryWorkPage.fillChikiCd(testData.formData.chikiCd_17);
        await page.waitForTimeout(500);
        await snapInput();
        await page.locator(deliveryWorkPage.selectorsObj.chikiCdInput).blur();
        await page.waitForTimeout(500);
        await deliveryWorkPage.clickSearchButton();

        const button1 = await deliveryWorkPage.waitForTextInBody(VALIDATION_ERROR_MESSAGES.FORMART_CHIKI_CD);
        expect(button1).toBe(true);
        await page.waitForTimeout(500);
        await snapExpect();
    });

     test('WTZ11001_18', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TZ110/wtz11001', 'wtz11001', 'TC_15');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        await indexedDBHelper.initializeDB({
            commonData: testData.commonData
        });

        await deliveryWorkPage.navigate();
        await page.waitForTimeout(1000);

        await deliveryWorkPage.waitForFormReady();

        await deliveryWorkPage.fillChikiCd(testData.formData.chikiCd_18);
        await page.waitForTimeout(500);
        await snapInput();
        await page.waitForTimeout(500);
        await page.locator(deliveryWorkPage.selectorsObj.chikiCdInput).blur();
        await page.waitForTimeout(500);
        await deliveryWorkPage.clickSearchButton();

        const button1 = await deliveryWorkPage.waitForTextInBody(VALIDATION_ERROR_MESSAGES.CHIKI_CD_LENGTH);
        expect(button1).toBe(true);
        await page.waitForTimeout(500);
        await snapExpect();
    });


    
});
    