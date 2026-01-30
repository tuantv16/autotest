/**
 * WTY11001 Check arrival schedule information Test Suite
 * Tests for 入荷予定情報照会 screen using Page Object Model
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { WTY11001Page } from '../../../pages/TY110/wty11001.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';
import { COMMON_MESSAGES, VALIDATION_ERROR_MESSAGES, WTY11001_ERROR_MESSAGES } from '../../../constants/messages';

test.describe('WTY11001 - Check arrival schedule information (入荷予定情報照会)', () => {
    let schedulePage: WTY11001Page;

    test.beforeEach(async ({ page, baseUrl }) => {
        schedulePage = new WTY11001Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('WTY11001_22', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY110/wty11001', 'wty11001', 'TC_22');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        await schedulePage.navigate();
        await page.waitForTimeout(1000);

        await schedulePage.waitForFormReady();

        await schedulePage.fillStartDate(testData.formData.startDate_22);
        await page.waitForTimeout(1000);
        await schedulePage.fillEndDate(testData.formData.endDate_22);
        await snapInput();

        await schedulePage.clickSearchButton();

        await page.waitForTimeout(2000);

        const isValidateMessageVisible = await schedulePage.waitForTextInBody(VALIDATION_ERROR_MESSAGES.START_DATE_AFTER_END_DATE, 5000);
        expect(isValidateMessageVisible).toBe(true);

        await snapExpect();
    });

    test('WTY11001_23', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY110/wty11001', 'wty11001', 'TC_22');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        await schedulePage.navigate();
        await page.waitForTimeout(1000);

        await schedulePage.waitForFormReady();

        await schedulePage.fillStartDate(testData.formData.startDate_23);
        await schedulePage.fillEndDate(testData.formData.endDate_23);
        await schedulePage.fillSlipNo(testData.formData.slipNo_23);
        await schedulePage.clickRootKbnSelector();
        await schedulePage.selectCombobox('モバイル')
        await snapInput();

        await schedulePage.clickSearchButton();

        await page.waitForTimeout(2000);

        const isValidateMessageVisible = await schedulePage.waitForTextInBody(WTY11001_ERROR_MESSAGES.SLIP_NO_LENGTH_14_MOBIE, 5000);
        expect(isValidateMessageVisible).toBe(true);

        await snapExpect();
    });

    test('WTY11001_24', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY110/wty11001', 'wty11001', 'TC_22');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        await schedulePage.navigate();
        await page.waitForTimeout(1000);

        await schedulePage.waitForFormReady();

        await schedulePage.fillStartDate(testData.formData.startDate_23);
        await schedulePage.fillEndDate(testData.formData.endDate_23);
        await schedulePage.fillSlipNo(testData.formData.slipNo_23);
        await schedulePage.clickRootKbnSelector();
        await schedulePage.selectCombobox('メーカ直納')
        await snapInput();

        await schedulePage.clickSearchButton();

        await page.waitForTimeout(2000);

        const isValidateMessageVisible = await schedulePage.waitForTextInBody(WTY11001_ERROR_MESSAGES.SLIP_NO_LENGTH_14_SUPPLY, 5000);
        expect(isValidateMessageVisible).toBe(true);

        await snapExpect();
    });

    test('WTY11001_25', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY110/wty11001', 'wty11001', 'TC_22');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        await schedulePage.navigate();
        await page.waitForTimeout(1000);

        await schedulePage.waitForFormReady();

        await schedulePage.fillShnCd(testData.formData.shnCd_25);
        await page.waitForTimeout(1000);
        await snapInput();

        const shnCdInput = await schedulePage.selectorsObj.shnCdInput.inputValue();
        expect(shnCdInput).toBe("1234567890987654321234567");

        await snapExpect();
    });

    test('WTY11001_26', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY110/wty11001', 'wty11001', 'TC_22');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        await schedulePage.navigate();
        await page.waitForTimeout(1000);

        await schedulePage.waitForFormReady();

        await schedulePage.clickRootKbnSelector();
        await schedulePage.selectCombobox('メーカ直納');
        await page.waitForTimeout(500);

        await schedulePage.clickArriveReasonSelector();
        await schedulePage.selectCombobox('展示品');

        await schedulePage.fillSlipNo(testData.formData.slipNo_26);
        await page.waitForTimeout(1000);
        await snapInput();

        await schedulePage.clickSearchButton();

        const messageValidate = await schedulePage.waitForTextInBody(WTY11001_ERROR_MESSAGES.SLIP_NO_ERROR, 5000);
        expect(messageValidate).toBe(true);

        await snapExpect();
    });

     test('WTY11001_27', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY110/wty11001', 'wty11001', 'TC_22');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        await schedulePage.navigate();
        await page.waitForTimeout(1000);

        await schedulePage.waitForFormReady();

        await schedulePage.fillBrCd(testData.formData.brCd_27);
        await page.waitForTimeout(1000);
        await snapInput();

        await schedulePage.clickSearchButton();

        const messageValidate = await schedulePage.waitForTextInBody(WTY11001_ERROR_MESSAGES.BRCD_LENGTH_ERROR, 5000);
        expect(messageValidate).toBe(true);

        await snapExpect();
    });
});