
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

    test('WTY20601_47', async ({
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
        await testPage.fillBtnTextBox("00102");
        await testPage.blurInputById(testPage.Locators.idBtnTextBox);
        await snapInput();
        await testPage.clickMenuButton();
        await testPage.clickMenuItemByText(testPage.Texts.buttonInventory);
        await snapExpect();
        await testPage.navigate();
        const btnTextBox = await testPage.getInputValue(testPage.Selectors.btnTextBox);
        expect(btnTextBox).toEqual("00102");

        await snapExpect(2);
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

    test('WTY20601_49', async ({
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
        await snapInput();
        await testPage.clickButtonByText(testPage.Texts.buttonConfirm);
        let messageError = await testPage.waitForTextInBody(testPage.Texts.errorBtnTextBox);
        expect(messageError).toBe(true);
        await snapExpect();
    });

    test('WTY20601_50', async ({
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
        await snapInput();
        await testPage.fillBtnTextBox("test_error_msg");
        await testPage.clickButtonByText(testPage.Texts.buttonConfirm);
        let messageError = await testPage.waitForTextInBody(testPage.Texts.errorBtnTextBox);
        expect(messageError).toBe(true);
        await snapExpect();
    });

    test('WTY20601_51', async ({
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
        await snapInput();
        await testPage.fillBtnTextBox("1234");
        await testPage.clickButtonByText(testPage.Texts.buttonConfirm);
        let messageError = await testPage.waitForTextInBody(testPage.Texts.errorBtnTextBoxTE5133);
        expect(messageError).toBe(true);
        await snapExpect();
    });

    test('WTY20601_52', async ({
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
        await snapInput();
        await testPage.fillBtnTextBox("04388");
        await testPage.clickButtonByText(testPage.Texts.buttonConfirm);
        let messageError = await testPage.waitForTextInBody(testPage.Texts.errorBtnTextBoxTE5147);
        expect(messageError).toBe(true);
        await snapExpect();
    });

    test('WTY20601_53', async ({
       page,
       baseUrl,
       indexedDBHelper,
       snapInput,
       snapExpect,
   }) => {
        const testData = loadTestData('TY206/wty20601', 'wty20601', 'TC_53');
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
        await snapInput();
        await testPage.clickButtonByText(testPage.Texts.buttonConfirm);
        let messageError = await testPage.waitForTextInBody(testPage.Texts.errorTE5147);
        expect(messageError).toBe(true);
        await snapExpect();
    });

    test('WTY20601_54', async ({
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

    test('WTY20601_59', async ({
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
        await testPage.fillBtnTextBox("00102");
        await testPage.blurInputById(testPage.Locators.idBtnTextBox);
        await snapInput();
        await testPage.fillBtnTextBox("00102");
        await testPage.navigate();
        const btnTextBox = await testPage.getInputValue(testPage.Selectors.btnTextBox);
        expect(btnTextBox).toEqual("00102");
        await snapExpect();
    });


    test('WTY20601_60', async ({
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

    test('WTY20601_61', async ({
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

    test('WTY20601_62', async ({
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

    test('WTY20601_63', async ({
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

    test('WTY20601_64', async ({
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

    test('WTY20601_65', async ({
       page,
       baseUrl,
       indexedDBHelper,
       snapExpect,
   }) => {
        const testData = loadTestData('TY206/wty20601', 'wty20601', 'TC_full_data');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });
        await testPage.navigate();

        const amountOfProducts = testData.sessionData?.[0]?.value?.cartUriMeiDT?.length ?? 0;
        const amountOfRows = await testPage.countTableRows();
        expect(amountOfRows).toEqual(amountOfProducts - 1);

        for (let i = 1; i < amountOfRows; i++) {
            const row = await testPage.getRowByIndex(i - 1);
            const textInRows = testPage.Input.inputTable.map(key =>
                testData.sessionData?.[0]?.value?.cartUriMeiDT?.[i]?.[key] ?? ''
            );

            expect(await testPage.verifyTextsInRow(row, textInRows)).toBe(true);
        }

        const index = Number(testData.sessionData?.[0]?.value?.indexDT?.[0]?.index ?? 0) + 1

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
        await snapExpect();
    });


    test('WTY20601_66', async ({
       page,
       baseUrl,
       indexedDBHelper,
       snapExpect,
   }) => {
        const testData = loadTestData('TY206/wty20601', 'wty20601', 'TC_error_msg');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        const apiResponsePromise = page.waitForResponse((res) => {
            return (
                res.request().method() === 'POST' &&
                res.url().includes(API_ENDPOINTS.TY206_WTY20601InitBC)
            );
        }, { timeout: 15000 });

        await testPage.navigate();
        const apiResponse = await apiResponsePromise;
        expect(apiResponse.status()).toBe(200);

        const response = await apiResponse.json();
        expect(response.outDS).toBeDefined();
        expect(response.outDS.resultDT[0].resultKbn).toEqual("1");
        const idErrorMessage= await testPage.waitForTextInBody(await response.outDS.resultDT[0].msgID);
        expect(idErrorMessage).toBe(true);

        const messageError= await testPage.waitForTextInBody(await response.outDS.resultDT[0].msgArg1);
        expect(messageError).toBe(true);

        const classTable = await testPage.hasChildElements(testPage.Locators.classTable);
        expect(classTable).toBe(false);
        await snapExpect();
    });

    test('WTY20601_67', async ({
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

    test('WTY20601_68', async ({
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

});
