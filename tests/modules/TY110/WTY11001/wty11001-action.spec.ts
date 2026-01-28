/**
 * WTY11001 Check arrival schedule information Test Suite
 * Tests for 入荷予定情報照会 screen using Page Object Model
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { WTY11001Page } from '../../../pages/TY110/wty11001.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';
import { COMMON_MESSAGES } from '../../../constants/messages';

test.describe('WTY11001 - Check arrival schedule information (入荷予定情報照会)', () => {
    let schedulePage: WTY11001Page;

    test.beforeEach(async ({ page, baseUrl }) => {
        schedulePage = new WTY11001Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('WTY11001_28', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await schedulePage.navigate();
        await page.waitForTimeout(1000);

        await schedulePage.waitForFormReady();

        await schedulePage.selectorsObj.shnCdInput.focus();
        await page.waitForTimeout(500);
        const subMenu = await schedulePage.waitForTextInBody('型番検索', 5000);
        expect(subMenu).toBe(true);

        await snapExpect();
    });

    test('WTY11001_29', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await schedulePage.navigate();
        await page.waitForTimeout(1000);

        await schedulePage.waitForFormReady();

        await schedulePage.selectorsObj.brCdInput.focus();
        await page.waitForTimeout(500);
        const subMenu1 = await schedulePage.waitForTextInBody('中分類', 5000);
        expect(subMenu1).toBe(true);

        const subMenu2 = await schedulePage.waitForTextInBody('小分類', 5000);
        expect(subMenu2).toBe(true);

        await snapExpect();
    });

    test('WTY11001_33', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY110/wty11001', 'wty11001', 'TC_22');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        
        await page.waitForTimeout(500);

        await schedulePage.navigate();
        await page.waitForTimeout(1000);

        await schedulePage.waitForFormReady();

        await schedulePage.clickBarCodeButton();

        const messageValidate = await schedulePage.waitForTextInBody("スキャナーはFlutterアプリ内でのみ動作します", 5000);
        expect(messageValidate).toBe(true);

        await snapExpect();
    });

    test('WTY11001_39', async ({
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

        await schedulePage.navigate();
        await page.waitForTimeout(1000);

        await schedulePage.waitForFormReady();

        await page.waitForTimeout(500);
        await schedulePage.clickSearchButton();

        const isValidateMessageVisible = await schedulePage.waitForTextInBody("該当データが存在しません。", 5000);

        expect(isValidateMessageVisible).toBe(true);
        await snapExpect();
    });

    test('WTY11001_40', async ({
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

        await schedulePage.navigate();
        await page.waitForTimeout(1000);

        await schedulePage.waitForFormReady();

        await page.waitForTimeout(500);
        await schedulePage.fillStartDate(testData.formData.startDate_40);
        await schedulePage.fillEndDate(testData.formData.endDate_40);
        await page.waitForTimeout(500);
        await snapInput();
        await schedulePage.clickSearchButton();

        const startDate = await schedulePage.selectorsObj.startDateInput.inputValue();
        const endDate = await schedulePage.selectorsObj.endDateInput.inputValue();

        expect(startDate).toBe("2026/01/01");
        expect(endDate).toBe("2026/01/02");
        await snapExpect();
    });

    test('WTY11001_42', async ({
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

        await schedulePage.navigate();
        await page.waitForTimeout(1000);

        await schedulePage.waitForFormReady();

        await page.waitForTimeout(500);
        await schedulePage.fillSlipNo(testData.formData.slipNo_26);
        await schedulePage.fillShnCd(testData.formData.shnCd_25);
        await schedulePage.fillBrCd(testData.formData.brCd_27);
        await page.waitForTimeout(500);
        await snapInput();
        await page.waitForTimeout(500);
        await schedulePage.clickClearButton();

        const slipNo = await schedulePage.selectorsObj.slipNoInput.inputValue();
        const shnCd = await schedulePage.selectorsObj.shnCdInput.inputValue();
        const brCd = await schedulePage.selectorsObj.brCdInput.inputValue();

        expect(slipNo).toBe("");
        expect(shnCd).toBe("");
        expect(brCd).toBe("");
        await snapExpect();
    });

    test('WTY11001_43', async ({
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

        await schedulePage.navigate();
        await page.waitForTimeout(1000);

        await schedulePage.waitForFormReady();

        await page.waitForTimeout(500);
        await schedulePage.fillSlipNo(testData.formData.slipNo_26);
        await page.waitForTimeout(500);
        await snapInput();
        await page.waitForTimeout(500);
        await schedulePage.clickClearSlipNoButton();

        const slipNo = await schedulePage.selectorsObj.slipNoInput.inputValue();

        expect(slipNo).toBe("");
        await snapExpect();
    });

    test('WTY11001_44', async ({
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

        await schedulePage.navigate();
        await page.waitForTimeout(1000);

        await schedulePage.waitForFormReady();

        await page.waitForTimeout(500);
        await schedulePage.fillShnCd(testData.formData.shnCd_25);
        await page.waitForTimeout(500);
        await snapInput();
        await page.waitForTimeout(500);
        await schedulePage.clickClearShnCdButton();

        const shnCd = await schedulePage.selectorsObj.shnCdInput.inputValue();

        expect(shnCd).toBe("");
        await snapExpect();
    });

    test('WTY11001_45', async ({
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

        await schedulePage.navigate();
        await page.waitForTimeout(1000);

        await schedulePage.waitForFormReady();

        await page.waitForTimeout(500);
        await schedulePage.fillBrCd(testData.formData.brCd_27);
        await page.waitForTimeout(500);
        await snapInput();
        await page.waitForTimeout(500);
        await schedulePage.clickClearBrCdButton();
        const brCd = await schedulePage.selectorsObj.brCdInput.inputValue();

        expect(brCd).toBe("");
        await snapExpect();
    });

    test('WTY11001_52', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY110/wty11001', 'wty11001', 'TC_22');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        
        await page.waitForTimeout(500);

        await schedulePage.navigate();
        await page.waitForTimeout(1000);

        await schedulePage.waitForFormReady();

        await schedulePage.clickMenuButton();
        await schedulePage.clickItemMenuByText('詳細');

        const messageValidate = await schedulePage.waitForTextInBody("入荷予定", 5000);
        expect(messageValidate).toBe(true);

        await snapExpect();
    });
});