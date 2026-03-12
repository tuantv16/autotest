
import { test, expect, loadTestData } from '../../../base/base-test';
import { TY20601Page } from '../../../pages/TY206/wty20601.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';
import {API_ENDPOINTS} from "../../../constants/api-endpoints";

test.describe('WTY20601 - (店別在庫照会)', () => {
    let testPage: TY20601Page;

    test.beforeEach(async ({ page, baseUrl }) => {
        testPage = new TY20601Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('WTY20601_20', async ({
       page,
       baseUrl,
       indexedDBHelper,
       snapExpect,
   }) => {
        const testData = loadTestData('TY206/wty20601', 'wty20601', 'TC_20');
        await page.goto(baseUrl, {waitUntil: 'domcontentloaded'});
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        const apiResponsePromise = page.waitForResponse((res) => {
            return (
                res.request().method() === 'POST' &&
                res.url().includes(API_ENDPOINTS.TY206_WTY20601InitBC)
            );
        }, {timeout: 15000});

        await testPage.navigate();
        const apiResponse = await apiResponsePromise;
        expect(apiResponse.status()).toBe(200);

        const selectedRow = await testPage.clickRandomRow(1);
        await testPage.selectedOption(testPage.Texts.thiKbn, testPage.THI_KBN_NM.AUTO);
        expect(await testPage.isBtnTextBoxDisabled()).toBe(true);
        expect(await testPage.verifyHighlight(testPage.THI_KBN_NM.JITEN, testPage.Locators.highlight)).toBe(false);
        expect(await testPage.verifyHighlight(testPage.THI_KBN_NM.TATEN, testPage.Locators.highlight)).toBe(false);
        expect(await testPage.verifyHighlight(testPage.THI_KBN_NM.SUMI, testPage.Locators.highlight)).toBe(false);
        expect(await testPage.isThibtenNmDisabled()).toBe(true);

        const zaiZokuSeiFlg = testData.sessionData?.[0]?.value?.cartUriMeiDT[selectedRow.index + 1]?.zaiZokuSeiFlg;
        if (!zaiZokuSeiFlg) {
            const zaiJt = testData.sessionData?.[0]?.value?.cartUriMeiDT?.[selectedRow.index + 1]?.zaiJt;
            const zaiJtName = await testPage.getZaiJtName(zaiJt);
            expect (await testPage.hasParentLabelWithBgWhite(zaiJtName)).toBe(true);
        }
        await snapExpect();
    });

    test('WTY20601_21', async ({
       page,
       baseUrl,
       indexedDBHelper,
       snapExpect,
   }) => {
        const testData = loadTestData('TY206/wty20601', 'wty20601', 'TC_20');
        await page.goto(baseUrl, {waitUntil: 'domcontentloaded'});
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        const apiResponsePromise = page.waitForResponse((res) => {
            return (
                res.request().method() === 'POST' &&
                res.url().includes(API_ENDPOINTS.TY206_WTY20601InitBC)
            );
        }, {timeout: 15000});

        await testPage.navigate();
        const apiResponse = await apiResponsePromise;
        expect(apiResponse.status()).toBe(200);

        const selectedRow = await testPage.clickRandomRow(1);
        await testPage.selectedOption(testPage.Texts.thiKbn, testPage.THI_KBN_NM.JITEN);

        expect(await testPage.verifyHighlight(testPage.THI_KBN_NM.JITEN, testPage.Locators.highlight)).toBe(true);
        expect(await testPage.verifyHighlight(testPage.THI_KBN_NM.AUTO, testPage.Locators.highlight)).toBe(false);
        expect(await testPage.verifyHighlight(testPage.THI_KBN_NM.TATEN, testPage.Locators.highlight)).toBe(false);
        expect(await testPage.verifyHighlight(testPage.THI_KBN_NM.SUMI, testPage.Locators.highlight)).toBe(false);
        const btnTextBox = await testPage.getInputValue(testPage.Selectors.btnTextBox);
        expect(btnTextBox).toEqual(testData.commonData[0].value.syoriStoreCd);
        const thibtenNm = await testPage.getInputValue(testPage.Selectors.thibtenNm);
        expect(thibtenNm).toEqual(testData.commonData[0].value.syoriStoreNmKnj);
        expect(await testPage.isTextInRow(selectedRow.row, btnTextBox)).toBe(true);
        await snapExpect();
    });

    test('WTY20601_22', async ({
       page,
       baseUrl,
       indexedDBHelper,
       snapExpect,
   }) => {
        const testData = loadTestData('TY206/wty20601', 'wty20601', 'TC_20');
        await page.goto(baseUrl, {waitUntil: 'domcontentloaded'});
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        const apiResponsePromise = page.waitForResponse((res) => {
            return (
                res.request().method() === 'POST' &&
                res.url().includes(API_ENDPOINTS.TY206_WTY20601InitBC)
            );
        }, {timeout: 15000});

        await testPage.navigate();
        const apiResponse = await apiResponsePromise;
        expect(apiResponse.status()).toBe(200);

        const selectedRow = await testPage.clickRandomRow(1);
        await testPage.selectedOption(testPage.Texts.thiKbn, testPage.THI_KBN_NM.TATEN);

        expect(await testPage.verifyHighlight(testPage.THI_KBN_NM.TATEN, testPage.Locators.highlight)).toBe(true);
        expect(await testPage.isBtnTextBoxDisabled()).toBe(false);
        const thibtenNm = await testPage.getInputValue(testPage.Selectors.thibtenNm);
        expect(thibtenNm).toEqual('　');
        await testPage.fillBtnTextBox(" ");
        const departmentStore = await testPage.waitForTextInBody(testPage.Texts.departmentStore);
        expect(departmentStore).toBe(true);
        await snapExpect();
    });

    test('WTY20601_23', async ({
       page,
       baseUrl,
       indexedDBHelper,
       snapExpect,
   }) => {
        const testData = loadTestData('TY206/wty20601', 'wty20601', 'TC_20');
        await page.goto(baseUrl, {waitUntil: 'domcontentloaded'});
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        const apiResponsePromise = page.waitForResponse((res) => {
            return (
                res.request().method() === 'POST' &&
                res.url().includes(API_ENDPOINTS.TY206_WTY20601InitBC)
            );
        }, {timeout: 15000});

        await testPage.navigate();
        const apiResponse = await apiResponsePromise;
        expect(apiResponse.status()).toBe(200);

        const selectedRow = await testPage.clickRandomRow(1);
        await testPage.selectedOption(testPage.Texts.thiKbn, testPage.THI_KBN_NM.SUMI);

        expect(await testPage.verifyHighlight(testPage.THI_KBN_NM.SUMI, testPage.Locators.highlight)).toBe(true);
        expect(await testPage.verifyHighlight(testPage.THI_KBN_NM.JITEN, testPage.Locators.highlight)).toBe(false);
        expect(await testPage.verifyHighlight(testPage.THI_KBN_NM.AUTO, testPage.Locators.highlight)).toBe(false);
        expect(await testPage.verifyHighlight(testPage.THI_KBN_NM.TATEN, testPage.Locators.highlight)).toBe(false);
        expect(await testPage.isThibtenNmDisabled()).toBe(true);
        expect(await testPage.isBtnTextBoxDisabled()).toBe(true);
        expect(await testPage.isTextInRow(selectedRow.row, '済')).toBe(true);

        await snapExpect();
    });

    test('WTY20601_24', async ({
       page,
       baseUrl,
       indexedDBHelper,
       snapExpect,
   }) => {
        const testData = loadTestData('TY206/wty20601', 'wty20601', 'TC_20');
        await page.goto(baseUrl, {waitUntil: 'domcontentloaded'});
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        const apiResponsePromise = page.waitForResponse((res) => {
            return (
                res.request().method() === 'POST' &&
                res.url().includes(API_ENDPOINTS.TY206_WTY20601InitBC)
            );
        }, {timeout: 15000});

        await testPage.navigate();
        const apiResponse = await apiResponsePromise;
        expect(apiResponse.status()).toBe(200);

        const selectedRow = await testPage.clickRandomRow(0);
        await testPage.selectedOption(testPage.Texts.thiKbn, testPage.THI_KBN_NM.TATEN);

        expect(await testPage.verifyHighlight(testPage.THI_KBN_NM.TATEN, testPage.Locators.highlight)).toBe(true);
        expect(await testPage.isBtnTextBoxDisabled()).toBe(false);
        await testPage.fillBtnTextBox("00102");
        await testPage.blurInputById(testPage.Locators.idBtnTextBox);

        const errorBtnTextBox = await testPage.waitForTextInBody(testPage.Texts.errorBtnTextBox, 500);
        expect(errorBtnTextBox).toBe(false);

        const errorBtnTextBoxTE5147 = await testPage.waitForTextInBody(testPage.Texts.errorBtnTextBoxTE5147, 500);
        expect(errorBtnTextBoxTE5147).toBe(false);

        const errorBtnTextBoxTE5133 = await testPage.waitForTextInBody(testPage.Texts.errorBtnTextBoxTE5133, 500);
        expect(errorBtnTextBoxTE5133).toBe(false);

        await snapExpect();
    });

    test('WTY20601_25', async ({
       page,
       baseUrl,
       indexedDBHelper,
       snapExpect,
   }) => {
        const testData = loadTestData('TY206/wty20601', 'wty20601', 'TC_20');
        await page.goto(baseUrl, {waitUntil: 'domcontentloaded'});
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        const apiResponsePromise = page.waitForResponse((res) => {
            return (
                res.request().method() === 'POST' &&
                res.url().includes(API_ENDPOINTS.TY206_WTY20601InitBC)
            );
        }, {timeout: 15000});

        await testPage.navigate();
        const apiResponse = await apiResponsePromise;
        expect(apiResponse.status()).toBe(200);

        const selectedRow = await testPage.clickRandomRow(1);
        await testPage.selectedOption(testPage.Texts.thiKbn, testPage.THI_KBN_NM.TATEN);

        expect(await testPage.verifyHighlight(testPage.THI_KBN_NM.TATEN, testPage.Locators.highlight)).toBe(true);
        expect(await testPage.isBtnTextBoxDisabled()).toBe(false);
        await testPage.fillBtnTextBox("ABC12");
        await testPage.blurInputById(testPage.Locators.idBtnTextBox);
        const errorBtnTextBox = await testPage.waitForTextInBody(testPage.Texts.errorBtnTextBox);
        expect(errorBtnTextBox).toBe(true);
        await snapExpect();
    });

    test('WTY20601_26', async ({
       page,
       baseUrl,
       indexedDBHelper,
       snapExpect,
   }) => {
        const testData = loadTestData('TY206/wty20601', 'wty20601', 'TC_20');
        await page.goto(baseUrl, {waitUntil: 'domcontentloaded'});
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        const apiResponsePromise = page.waitForResponse((res) => {
            return (
                res.request().method() === 'POST' &&
                res.url().includes(API_ENDPOINTS.TY206_WTY20601InitBC)
            );
        }, {timeout: 15000});

        await testPage.navigate();
        const apiResponse = await apiResponsePromise;
        expect(apiResponse.status()).toBe(200);

        const selectedRow = await testPage.clickRandomRow(1);
        await testPage.selectedOption(testPage.Texts.thiKbn, testPage.THI_KBN_NM.TATEN);

        expect(await testPage.verifyHighlight(testPage.THI_KBN_NM.TATEN, testPage.Locators.highlight)).toBe(true);
        expect(await testPage.isBtnTextBoxDisabled()).toBe(false);
        await testPage.fillBtnTextBox("123");
        await testPage.blurInputById(testPage.Locators.idBtnTextBox);
        const errorBtnTextBoxTE5133 = await testPage.waitForTextInBody(testPage.Texts.errorBtnTextBoxTE5133);
        expect(errorBtnTextBoxTE5133).toBe(true);
        await snapExpect();
    });

    test('WTY20601_27', async ({
       page,
       baseUrl,
       indexedDBHelper,
       snapExpect,
   }) => {
        const testData = loadTestData('TY206/wty20601', 'wty20601', 'TC_20');
        await page.goto(baseUrl, {waitUntil: 'domcontentloaded'});
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        const apiResponsePromise = page.waitForResponse((res) => {
            return (
                res.request().method() === 'POST' &&
                res.url().includes(API_ENDPOINTS.TY206_WTY20601InitBC)
            );
        }, {timeout: 15000});

        await testPage.navigate();
        const apiResponse = await apiResponsePromise;
        expect(apiResponse.status()).toBe(200);

        const selectedRow = await testPage.clickRandomRow(1);
        await testPage.selectedOption(testPage.Texts.thiKbn, testPage.THI_KBN_NM.TATEN);

        expect(await testPage.verifyHighlight(testPage.THI_KBN_NM.TATEN, testPage.Locators.highlight)).toBe(true);
        expect(await testPage.isBtnTextBoxDisabled()).toBe(false);
        await testPage.fillBtnTextBox(testData.commonData[0].value.syoriStoreCd);
        await testPage.blurInputById(testPage.Locators.idBtnTextBox);
        const errorBtnTextBoxTE5147 = await testPage.waitForTextInBody(testPage.Texts.errorBtnTextBoxTE5147);
        expect(errorBtnTextBoxTE5147).toBe(true);
        await snapExpect();
    });

    test('WTY20601_28', async ({
       page,
       baseUrl,
       indexedDBHelper,
       snapExpect,
   }) => {
        const testData = loadTestData('TY206/wty20601', 'wty20601', 'TC_20');
        await page.goto(baseUrl, {waitUntil: 'domcontentloaded'});
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        const apiResponsePromise = page.waitForResponse((res) => {
            return (
                res.request().method() === 'POST' &&
                res.url().includes(API_ENDPOINTS.TY206_WTY20601InitBC)
            );
        }, {timeout: 15000});

        await testPage.navigate();
        const apiResponse = await apiResponsePromise;
        expect(apiResponse.status()).toBe(200);

        const selectedRow = await testPage.clickRandomRow(1);
        await testPage.selectedOption(testPage.Texts.zaiJt, testPage.ZAI_JT_NM.NEW);

        expect(await testPage.verifyHighlight(testPage.ZAI_JT_NM.NEW, testPage.Locators.highlight)).toBe(true);
        expect(await testPage.verifyHighlight(testPage.ZAI_JT_NM.TENJI, testPage.Locators.highlight)).toBe(false);
        expect(await testPage.verifyHighlight(testPage.ZAI_JT_NM.KAIKON, testPage.Locators.highlight)).toBe(false);
        expect(await testPage.verifyHighlight(testPage.ZAI_JT_NM.SHITEI, testPage.Locators.highlight)).toBe(false);

        await snapExpect();
    });

    test('WTY20601_29', async ({
       page,
       baseUrl,
       indexedDBHelper,
       snapInput,
       snapExpect,
   }) => {
        const testData = loadTestData('TY206/wty20601', 'wty20601', 'TC_20');
        await page.goto(baseUrl, {waitUntil: 'domcontentloaded'});
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        const apiResponsePromise = page.waitForResponse((res) => {
            return (
                res.request().method() === 'POST' &&
                res.url().includes(API_ENDPOINTS.TY206_WTY20601InitBC)
            );
        }, {timeout: 15000});

        await testPage.navigate();
        await snapInput();
        const apiResponse = await apiResponsePromise;
        expect(apiResponse.status()).toBe(200);

        const selectedRow = await testPage.clickRandomRow(1);
        await testPage.selectedOption(testPage.Texts.zaiJt, testPage.ZAI_JT_NM.TENJI);

        expect(await testPage.verifyHighlight(testPage.ZAI_JT_NM.NEW, testPage.Locators.highlight)).toBe(false);
        expect(await testPage.verifyHighlight(testPage.ZAI_JT_NM.TENJI, testPage.Locators.highlight)).toBe(true);
        expect(await testPage.verifyHighlight(testPage.ZAI_JT_NM.KAIKON, testPage.Locators.highlight)).toBe(false);
        expect(await testPage.verifyHighlight(testPage.ZAI_JT_NM.SHITEI, testPage.Locators.highlight)).toBe(false);
        expect(await testPage.isTextInRow(selectedRow.row, '展')).toBe(true);

        const jznUriDenFlg = testData.sessionData?.[0]?.value?.jznUriDenFlg;
        if (jznUriDenFlg === "0" || !jznUriDenFlg) {
            expect(await testPage.verifyHighlight(testPage.THI_KBN_NM.JITEN, testPage.Locators.highlight)).toBe(true);
            expect(await testPage.isTextInRow(selectedRow.row, testData.commonData[0].value.syoriStoreCd)).toBe(true);
        }
        await snapExpect();
    });

    test('WTY20601_30', async ({
       page,
       baseUrl,
       indexedDBHelper,
       snapInput,
       snapExpect,
   }) => {
        const testData = loadTestData('TY206/wty20601', 'wty20601', 'TC_20');
        await page.goto(baseUrl, {waitUntil: 'domcontentloaded'});
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        const apiResponsePromise = page.waitForResponse((res) => {
            return (
                res.request().method() === 'POST' &&
                res.url().includes(API_ENDPOINTS.TY206_WTY20601InitBC)
            );
        }, {timeout: 15000});

        await testPage.navigate();
        await snapInput();
        const apiResponse = await apiResponsePromise;
        expect(apiResponse.status()).toBe(200);

        const selectedRow = await testPage.clickRandomRow(1);
        await testPage.selectedOption(testPage.Texts.zaiJt, testPage.ZAI_JT_NM.KAIKON);

        expect(await testPage.verifyHighlight(testPage.ZAI_JT_NM.NEW, testPage.Locators.highlight)).toBe(false);
        expect(await testPage.verifyHighlight(testPage.ZAI_JT_NM.TENJI, testPage.Locators.highlight)).toBe(false);
        expect(await testPage.verifyHighlight(testPage.ZAI_JT_NM.KAIKON, testPage.Locators.highlight)).toBe(true);
        expect(await testPage.verifyHighlight(testPage.ZAI_JT_NM.SHITEI, testPage.Locators.highlight)).toBe(false);
        expect(await testPage.isTextInRow(selectedRow.row, '開')).toBe(true);

        const jznUriDenFlg = testData.sessionData?.[0]?.value?.jznUriDenFlg;
        if (jznUriDenFlg === "0" || !jznUriDenFlg) {
            expect(await testPage.verifyHighlight(testPage.THI_KBN_NM.JITEN, testPage.Locators.highlight)).toBe(true);
            expect(await testPage.isTextInRow(selectedRow.row, testData.commonData[0].value.syoriStoreCd)).toBe(true);
        }
        await snapExpect();
    });

    test('WTY20601_31', async ({
       page,
       baseUrl,
       indexedDBHelper,
       snapInput,
       snapExpect,
   }) => {
        const testData = loadTestData('TY206/wty20601', 'wty20601', 'TC_20');
        await page.goto(baseUrl, {waitUntil: 'domcontentloaded'});
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        const apiResponsePromise = page.waitForResponse((res) => {
            return (
                res.request().method() === 'POST' &&
                res.url().includes(API_ENDPOINTS.TY206_WTY20601InitBC)
            );
        }, {timeout: 15000});

        await testPage.navigate();
        await snapInput();
        const apiResponse = await apiResponsePromise;
        expect(apiResponse.status()).toBe(200);

        const selectedRow = await testPage.clickRandomRow(1);
        await testPage.selectedOption(testPage.Texts.zaiJt, testPage.ZAI_JT_NM.SHITEI);

        expect(await testPage.verifyHighlight(testPage.ZAI_JT_NM.NEW, testPage.Locators.highlight)).toBe(false);
        expect(await testPage.verifyHighlight(testPage.ZAI_JT_NM.TENJI, testPage.Locators.highlight)).toBe(false);
        expect(await testPage.verifyHighlight(testPage.ZAI_JT_NM.KAIKON, testPage.Locators.highlight)).toBe(false);
        expect(await testPage.verifyHighlight(testPage.ZAI_JT_NM.SHITEI, testPage.Locators.highlight)).toBe(true);
        expect(await testPage.isTextInRow(selectedRow.row, '指')).toBe(true);

        const jznUriDenFlg = testData.sessionData?.[0]?.value?.jznUriDenFlg;
        if (jznUriDenFlg === "0" || !jznUriDenFlg) {
            expect(await testPage.isTextInRow(selectedRow.row, testData.commonData[0].value.syoriStoreCd)).toBe(true);
        }
        await snapExpect();
    });

    test('WTY20601_32', async ({
       page,
       baseUrl,
       indexedDBHelper,
       snapInput,
       snapExpect,
   }) => {
        const testData = loadTestData('TY206/wty20601', 'wty20601', 'TC_32');
        await page.goto(baseUrl, {waitUntil: 'domcontentloaded'});
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        const apiResponsePromise = page.waitForResponse((res) => {
            return (
                res.request().method() === 'POST' &&
                res.url().includes(API_ENDPOINTS.TY206_WTY20601InitBC)
            );
        }, {timeout: 15000});

        await testPage.navigate();
        await snapInput();
        const apiResponse = await apiResponsePromise;
        expect(apiResponse.status()).toBe(200);

        const selectedRow = await testPage.clickRandomRow(1);
        await testPage.clickButtonByText(testPage.Texts.deliveryPlaceSection);
        await page.waitForTimeout(500);
        expect(await testPage.isTextInRow(selectedRow.row, '引')).toBe(true);
        await snapExpect();
    });

    test('WTY20601_33', async ({
       page,
       baseUrl,
       indexedDBHelper,
       snapInput,
       snapExpect,
   }) => {
        const testData = loadTestData('TY206/wty20601', 'wty20601', 'TC_32');
        await page.goto(baseUrl, {waitUntil: 'domcontentloaded'});
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        const apiResponsePromise = page.waitForResponse((res) => {
            return (
                res.request().method() === 'POST' &&
                res.url().includes(API_ENDPOINTS.TY206_WTY20601InitBC)
            );
        }, {timeout: 15000});

        await testPage.navigate();
        await snapInput();
        const apiResponse = await apiResponsePromise;
        expect(apiResponse.status()).toBe(200);

        const selectedRow = await testPage.clickRandomRow(1);
        await testPage.clickButtonByText(testPage.Texts.deliveryPlaceSection);
        await testPage.clickButtonByText(testPage.Texts.deliveryPlaceSection);
        expect(await testPage.isTextInRow(selectedRow.row, '持')).toBe(true);
        await snapExpect();
    });

    test('WTY20601_34', async ({
       page,
       baseUrl,
       indexedDBHelper,
       snapInput,
       snapExpect,
   }) => {
        const testData = loadTestData('TY206/wty20601', 'wty20601', 'TC_20');
        await page.goto(baseUrl, {waitUntil: 'domcontentloaded'});
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        const apiResponsePromise = page.waitForResponse((res) => {
            return (
                res.request().method() === 'POST' &&
                res.url().includes(API_ENDPOINTS.TY206_WTY20601InitBC)
            );
        }, {timeout: 15000});

        await testPage.navigate();
        const apiResponse = await apiResponsePromise;
        expect(apiResponse.status()).toBe(200);

        await testPage.clickRandomRow(0);
        await snapInput();
        const selectedRow = await testPage.clickRandomRow(1);
        expect(await testPage.verifyHighlightedRow(selectedRow.row)).toBe(true);

        const index = 1
        expect(await testPage.getInputValue(testPage.Selectors.productNo)).toEqual((index).toString());
        await snapExpect();

        const productKata = testData.sessionData?.[0]?.value?.cartUriMeiDT[index]?.mkKata;
        expect (await testPage.getInputValue(testPage.Selectors.productKata)).toEqual(productKata)

        const thKbn = await testPage.getThKbnName(testData.sessionData?.[0]?.value?.cartUriMeiDT[index]?.thKbn);
        expect (await testPage.getInputValue(testPage.Selectors.thKbn)).toEqual(thKbn);

        const chksKahiFlg = await testPage.getCksKahiName(testData.sessionData?.[0]?.value?.cartUriMeiDT[index]?.chksKahiFlg);
        expect (await testPage.getInputValue(testPage.Selectors.chksKahiFlg)).toEqual(chksKahiFlg);

        const ykbrKahiFlg = await testPage.getYbKahiName(testData.sessionData?.[0]?.value?.cartUriMeiDT[index]?.ykbrKahiFlg);
        expect (await testPage.getInputValue(testPage.Selectors.ykbrKahiFlg)).toEqual(ykbrKahiFlg);

        const thibtenNm = await testPage.emptyToSpace(testData.sessionData?.[0]?.value?.cartUriMeiDT[index]?.thibtenNm);
        expect (await testPage.getInputValue(testPage.Selectors.thibtenNm)).toEqual(thibtenNm);

        const zaiZokuSeiFlg = testData.sessionData?.[0]?.value?.cartUriMeiDT[index]?.zaiZokuSeiFlg;
        if (!zaiZokuSeiFlg) {
            const zaiJt = testData.sessionData?.[0]?.value?.cartUriMeiDT?.[index]?.zaiJt;
            const zaiJtName = await testPage.getZaiJtName(zaiJt);
            expect (await testPage.hasParentLabelWithBgWhite(zaiJtName)).toBe(true);
        }
        expect(await testPage.waitForTextInBody(testPage.Texts.errorBtnTextBox)).toBe(true);
        await snapExpect();
    });

});
