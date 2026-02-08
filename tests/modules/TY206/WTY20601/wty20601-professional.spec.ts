
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

    test('WTY20601_35', async ({
       page,
       baseUrl,
       indexedDBHelper,
       snapExpect,
   }) => {
        const testData = loadTestData('TY206/wty20601', 'wty20601', 'TC_35');
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
        const index = 1;
        const selectedRow = await testPage.clickRandomRow(index);
        const hjJidoThi = testData.sessionData?.[0]?.value?.cartUriMeiDT[index + 1]?.hjThi
        expect(await testPage.isTextInRow(selectedRow.row, hjJidoThi)).toBe(true);
        await snapExpect();
    });

    test('WTY20601_36', async ({
       page,
       baseUrl,
       indexedDBHelper,
       snapExpect,
   }) => {
        const testData = loadTestData('TY206/wty20601', 'wty20601', 'TC_35');
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
        const index = 1;
        const selectedRow = await testPage.clickRandomRow(index);
        await testPage.selectedOption(testPage.Texts.thiKbn, testPage.THI_KBN_NM.JITEN);
        expect(await testPage.isTextInRow(selectedRow.row, testData.commonData[0].value.syoriStoreCd)).toBe(true);
        const btnTextBox = await testPage.getInputValue(testPage.Selectors.btnTextBox);
        expect(btnTextBox).toEqual(testData.commonData[0].value.syoriStoreCd);
        await snapExpect();
    });

    test('WTY20601_38', async ({
       page,
       baseUrl,
       indexedDBHelper,
       snapExpect,
   }) => {
        const testData = loadTestData('TY206/wty20601', 'wty20601', 'TC_35');
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
        const index = 1;
        const selectedRow = await testPage.clickRandomRow(index);
        await testPage.selectedOption(testPage.Texts.thiKbn, testPage.THI_KBN_NM.SUMI);
        expect(await testPage.isTextInRow(selectedRow.row, '済')).toBe(true);
        await snapExpect();
    });

    test('WTY20601_39', async ({
       page,
       baseUrl,
       indexedDBHelper,
       snapExpect,
   }) => {
        const testData = loadTestData('TY206/wty20601', 'wty20601', 'TC_18');
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
        const index = 1;
        const selectedRow = await testPage.clickRandomRow(index);
        await testPage.clickButtonByText(testPage.Texts.deliveryPlaceSection);
        await page.waitForTimeout(500);
        expect(await testPage.isTextInRow(selectedRow.row, '引')).toBe(true);
        expect(await testPage.verifyButtonHighlight(testPage.Texts.deliveryPlaceSection)).toBe(true);
        await snapExpect();
    });

    test('WTY20601_40', async ({
       page,
       baseUrl,
       indexedDBHelper,
       snapExpect,
   }) => {
        const testData = loadTestData('TY206/wty20601', 'wty20601', 'TC_18');
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
        const index = 1;
        const selectedRow = await testPage.clickRandomRow(index);
        expect(await testPage.isTextInRow(selectedRow.row, '持')).toBe(true);
        expect(await testPage.verifyButtonHighlight(testPage.Texts.deliveryPlaceSection)).toBe(false);
        await snapExpect();
    });

    test('WTY20601_41', async ({
       page,
       baseUrl,
       indexedDBHelper,
       snapExpect,
   }) => {
        const testData = loadTestData('TY206/wty20601', 'wty20601', 'TC_41');
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
        const index = 1;
        const selectedRow = await testPage.clickRandomRow(index);
        expect(await testPage.verifyHighlight(testPage.THI_KBN_NM.AUTO, testPage.Locators.highlight)).toBe(true);
        expect(await testPage.isRadioDisabledBySpanText(testPage.THI_KBN_NM.JITEN)).toBe(true);
        expect(await testPage.isRadioDisabledBySpanText(testPage.THI_KBN_NM.TATEN)).toBe(true);
        expect(await testPage.isRadioDisabledBySpanText(testPage.ZAI_JT_NM.TENJI)).toBe(true);
        expect(await testPage.isRadioDisabledBySpanText(testPage.ZAI_JT_NM.KAIKON)).toBe(true);
        expect(await testPage.isRadioDisabledBySpanText(testPage.ZAI_JT_NM.SHITEI)).toBe(true);
        await snapExpect();
    });

    test('WTY20601_42', async ({
       page,
       baseUrl,
       indexedDBHelper,
       snapInput,
       snapExpect,
   }) => {
        const testData = loadTestData('TY206/wty20601', 'wty20601', 'TC_42');
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
        const index = 1;
        const selectedRow = await testPage.clickRandomRow(index);
        expect(await testPage.isRadioDisabledBySpanText(testPage.ZAI_JT_NM.NEW)).toBe(true);
        expect(await testPage.isRadioDisabledBySpanText(testPage.ZAI_JT_NM.TENJI)).toBe(true);
        expect(await testPage.isRadioDisabledBySpanText(testPage.ZAI_JT_NM.KAIKON)).toBe(true);
        expect(await testPage.isRadioDisabledBySpanText(testPage.ZAI_JT_NM.SHITEI)).toBe(true);
        await snapExpect();
    });

    test('WTY20601_43', async ({
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
        const index = 1;
        const selectedRow = await testPage.clickRandomRow(index);

        await testPage.selectedOption(testPage.Texts.zaiJt, testPage.ZAI_JT_NM.TENJI);
        const jznUriDenFlg = testData.sessionData?.[0]?.value?.jznUriDenFlg;
        if (jznUriDenFlg === "0" || !jznUriDenFlg) {
            expect(await testPage.isTextInRow(selectedRow.row, testData.commonData[0].value.syoriStoreCd)).toBe(true);
        }
        expect(await testPage.isTextInRow(selectedRow.row, '展')).toBe(true);
        await snapExpect();

        await testPage.selectedOption(testPage.Texts.zaiJt, testPage.ZAI_JT_NM.KAIKON);
        if (jznUriDenFlg === "0" || !jznUriDenFlg) {
            expect(await testPage.isTextInRow(selectedRow.row, testData.commonData[0].value.syoriStoreCd)).toBe(true);
        }
        expect(await testPage.isTextInRow(selectedRow.row, '開')).toBe(true);
        await snapExpect(1);

        await testPage.selectedOption(testPage.Texts.zaiJt, testPage.ZAI_JT_NM.SHITEI);
        if (jznUriDenFlg === "0" || !jznUriDenFlg) {
            expect(await testPage.isTextInRow(selectedRow.row, testData.commonData[0].value.syoriStoreCd)).toBe(true);
        }
        expect(await testPage.isTextInRow(selectedRow.row, '指')).toBe(true);
        await snapExpect(2);
    });

    test('WTY20601_44', async ({
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

    test('WTY20601_48', async ({
       page,
       baseUrl,
       indexedDBHelper,
       snapInput,
       snapExpect,
   }) => {
        const testData = loadTestData('TY206/wty20601', 'wty20601', 'TC_42');
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
        const index = 0;
        const selectedRow = await testPage.clickRandomRow(index);
        await testPage.fillBtnTextBox("test_error_msg");
        await testPage.blurInputById(testPage.Locators.idBtnTextBox);
        let messageError = await testPage.waitForTextInBody(testPage.Texts.errorBtnTextBox);
        expect(messageError).toBe(true);
        await snapInput();
        await testPage.clickButtonByText(testPage.Texts.buttonClear);
        messageError = await testPage.waitForTextInBody(testPage.Texts.errorBtnTextBox);
        expect(messageError).toBe(false);
        await snapExpect();
    });

});
