
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

    test('WTY20601_11', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapExpect,
    }) => {
        const testData = loadTestData('TY206/wty20601', 'wty20601', 'TC_init');
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await testPage.navigate();
        const headerTile = await testPage.waitForTextInBody(testPage.Texts.headingTitle);
        expect(headerTile).toBe(true);
        await snapExpect();
    });

    test('WTY20601_12', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapExpect,
    }) => {
        const testData = loadTestData('TY206/wty20601', 'wty20601', 'TC_init');
        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Step 2: Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await testPage.navigate();

        await testPage.clickIconMenu()

        const buttonInventory = await testPage.waitForTextInBody(testPage.Texts.buttonInventory);
        expect(buttonInventory).toBe(true);

        const buttonProduct = await testPage.waitForTextInBody(testPage.Texts.buttonProduct);
        expect(buttonProduct).toBe(true);

        const buttonClear = await testPage.waitForTextInBody(testPage.Texts.buttonClear);
        expect(buttonClear).toBe(true);

        const buttonConfirm = await testPage.waitForTextInBody(testPage.Texts.buttonConfirm);
        expect(buttonConfirm).toBe(true);

        await snapExpect();
    });

    test('WTY20601_13', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapExpect,
    }) => {
        const testData = loadTestData('TY206/wty20601', 'wty20601', 'TC_init');
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

        // Verify header table texts
        const textsHeaderTable = await testPage.verifyTextsInLocator(testPage.Locators.classHeaderTable, testPage.Texts.textHeaderTable);
        expect(textsHeaderTable).toBe(true);

        const selectedRow = await testPage.clickRandomRow();
        const isHighlighted = await testPage.verifyHighlightedRow(selectedRow.row);
        expect(isHighlighted).toBe(true);
        await snapExpect();
    });

    test('WTY20601_15', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapExpect,
    }) => {
        const testData = loadTestData('TY206/wty20601', 'wty20601', 'TC_init');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        await testPage.navigate();

        const loadingText = await testPage.waitForTextInBody('Loading...');
        await snapExpect();
        expect(loadingText).toBe(true);
    });

    test('WTY20601_07', async ({
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

    test('WTY20601_08', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapExpect,
    }) => {
        const testData = loadTestData('TY206/wty20601', 'wty20601', 'TC_not_data');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });
        await testPage.navigate();
        const classTable = await testPage.hasChildElements(testPage.Locators.classTable);
        expect(classTable).toBe(false);
        await snapExpect();
    });

    test('WTY20601_09', async ({
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

    test('WTY20601_10', async ({
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
    });

    test('WTY20601_16', async ({
       page,
       baseUrl,
       indexedDBHelper,
       snapExpect,
   }) => {
        const testData = loadTestData('TY206/wty20601', 'wty20601', 'TC_btnTextbox');
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

        await testPage.fillBtnTextBox("test_error_msg");
        await testPage.blurInputById(testPage.Locators.idBtnTextBox);
        const messageError = await testPage.waitForTextInBody(testPage.Texts.errorBtnTextBox);
        expect(messageError).toBe(true);
        await snapExpect();
    });

    test('WTY20601_17', async ({
       page,
       baseUrl,
       indexedDBHelper,
       snapExpect,
   }) => {
        const testData = loadTestData('TY206/wty20601', 'wty20601', 'TC_btnTextbox');
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

        await testPage.selectedOption(testPage.Texts.zaiJt, testPage.ZAI_JT_NM.NEW);
        await testPage.selectedOption(testPage.Texts.thiKbn, testPage.THI_KBN_NM.AUTO);
        expect(await testPage.isBtnTextBoxDisabled()).toBe(true);

        await testPage.selectedOption(testPage.Texts.thiKbn, testPage.THI_KBN_NM.JITEN);
        expect(await testPage.isBtnTextBoxDisabled()).toBe(true);

        await testPage.selectedOption(testPage.Texts.thiKbn, testPage.THI_KBN_NM.TATEN);
        expect(await testPage.isBtnTextBoxDisabled()).toBe(false);

        await testPage.selectedOption(testPage.Texts.thiKbn, testPage.THI_KBN_NM.SUMI);
        expect(await testPage.isBtnTextBoxDisabled()).toBe(true);

        await snapExpect();
    });

    test('WTY20601_18', async ({
       page,
       baseUrl,
       indexedDBHelper,
       snapExpect,
   }) => {
        const testData = loadTestData('TY206/wty20601', 'wty20601', 'TC_18');
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

        const deliveryPlaceSection = await testPage.waitForTextInBody(testPage.Texts.deliveryPlaceSection);
        expect(deliveryPlaceSection).toBe(true);

        await snapExpect();
    });

    test('WTY20601_19', async ({
       page,
       baseUrl,
       indexedDBHelper,
       snapExpect,
   }) => {
        const testData = loadTestData('TY206/wty20601', 'wty20601', 'TC_btnTextbox');
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

        await testPage.fillBtnTextBox("test");
        const departmentStore = await testPage.waitForTextInBody(testPage.Texts.departmentStore);
        expect(departmentStore).toBe(true);
        await snapExpect();
    });
});
