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

     test('WTZ11001_19', async ({
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

        const dateValue = await page.locator(deliveryWorkPage.selectorsObj.haikojiDateInput).inputValue();
        expect(dateValue).toBe('10/28');
        await page.waitForTimeout(500);
        await snapExpect();
    });

     test('WTZ11001_20', async ({
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
        await deliveryWorkPage.clickHaiMdKbn(2);

        const dateValue = await page.locator(deliveryWorkPage.selectorsObj.haikojiDateInput).inputValue();
        expect(dateValue).toBe('10/29');
        await page.waitForTimeout(500);
        await snapExpect();
    });

    test('WTZ11001_21', async ({
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

        const dateValue = await page.locator(deliveryWorkPage.selectorsObj.haikojiDateInput).inputValue();
        expect(dateValue).toBe('10/30');

        await expect(page.locator(deliveryWorkPage.selectorsObj.haikojiDateInput)).not.toBeDisabled();
        await page.waitForTimeout(500);
        await snapExpect();
    });

     test('WTZ11001_25', async ({
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

        await page.locator(deliveryWorkPage.selectorsObj.chikiCdInput).focus();

        const checkButton = await deliveryWorkPage.waitForTextInBody('地域検索');
        expect(checkButton).toBe(true);
        await page.waitForTimeout(500);
        await snapExpect();
    });

    test('WTZ11001_27', async ({
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

        await snapInput();
        await page.waitForTimeout(1000);
        await deliveryWorkPage.fillChikiCd(testData.formData.chikiCd_15);
        await page.waitForTimeout(1000);
        await page.locator(deliveryWorkPage.selectorsObj.chikiCdInput).blur();

        const chikiNm = await page.locator(deliveryWorkPage.selectorsObj.chikiNmInput).inputValue();
        expect(chikiNm.trim()).toBe('');
        await page.waitForTimeout(500);
        await snapExpect();
    });

     test('WTZ11001_32', async ({
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

        await deliveryWorkPage.fillChikiCd(testData.formData.chikiCd_15);

        await page.waitForTimeout(500);
        await deliveryWorkPage.clickSearchButton();
        await page.waitForTimeout(1000);
        await snapInput();
        await page.waitForTimeout(1000);
        await deliveryWorkPage.clearButton();
        await page.waitForTimeout(1000);

        const dateInput = await page.locator(deliveryWorkPage.selectorsObj.haikojiDateInput).inputValue();
        expect(dateInput).toBe('');

        const chikiCdInput = await page.locator(deliveryWorkPage.selectorsObj.chikiCdInput).inputValue();
        expect(chikiCdInput).toBe('');
        await page.waitForTimeout(500);
        await snapExpect();
    });

     test('WTZ11001_33', async ({
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

        await deliveryWorkPage.fillChikiCd(testData.formData.chikiCd_15);

        await page.waitForTimeout(500);
        await deliveryWorkPage.clickSearchButton();
        await page.waitForTimeout(1000);
        await snapInput();
        await page.waitForTimeout(1000);
        await deliveryWorkPage.clearChikiCd();
        await page.waitForTimeout(1000);

        const chikiCdInput = await page.locator(deliveryWorkPage.selectorsObj.chikiCdInput).inputValue();
        expect(chikiCdInput).toBe('');
        await page.waitForTimeout(500);
        await snapExpect();
    });

    test('WTZ11001_34', async ({
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
        await snapInput();
        await page.waitForTimeout(1000);
        await deliveryWorkPage.clearHaikojiDate();
        await page.waitForTimeout(1000);

        const dateInput = await page.locator(deliveryWorkPage.selectorsObj.haikojiDateInput).inputValue();
        expect(dateInput).toBe('');
        await page.waitForTimeout(500);
        await snapExpect();
    });
    
});
    