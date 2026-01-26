import { test, expect, loadTestData } from '../../../base/base-test';
import { TY10101Page } from '../../../pages/TY101/wty10101.page';
import { CommonHelper, takeScreenshotOnFailure } from '../../../utils/common-helper';

test.describe('WTY10101 - Action behavior', () => {
    let productInquiryPage: TY10101Page;

    test.beforeEach(async ({ page }) => {
        productInquiryPage = new TY10101Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    const commonData = CommonHelper.loadTestData('TY101/wty10101-common-data').commonData;

    test('WTY10101_14', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-action', 'wty10101', 'TC_14');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await page.waitForTimeout(500);

        await productInquiryPage.clickMenuButton();
        await page.waitForTimeout(500);

        await snapInput();

        const cartMenuItem = await productInquiryPage.getCartMenuItem();
        expect(await cartMenuItem).toBeFalsy();

        const clearMenuItem = await productInquiryPage.getClearMenuItem();
        expect(await clearMenuItem.isVisible()).toBeFalsy();

        await snapExpect();
    });

    test('WTY10101_15', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await page.waitForTimeout(500);

        await productInquiryPage.focusSearchInput();

        await snapInput();

        const isPopupVisible = await productInquiryPage.isFunctionPopupVisible();
        expect(isPopupVisible).toBeTruthy();

        const isModelSearchVisible = await productInquiryPage.isModelSearchPopupItemVisible();
        expect(isModelSearchVisible).toBeTruthy();

        await snapExpect();
    });

    test('WTY10101_16', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await page.waitForTimeout(500);

        await productInquiryPage.focusSearchInput();
        expect(await productInquiryPage.isFunctionPopupVisible()).toBeTruthy();

        await snapInput();

        await productInquiryPage.clickOutside();
        await page.waitForTimeout(500);

        const isPopupVisible = await productInquiryPage.isFunctionPopupVisible();
        expect(isPopupVisible).toBeFalsy();

        await snapExpect();
    });

    // test('WTY10101_17', async ({
    //     page,
    //     baseUrl,
    //     indexedDBHelper,
    //     snapInput,
    //     snapExpect,
    // }) => {
    //     const testData = loadTestData('TY101/wty10101-action', 'wty10101', 'TC_17');

    //     await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

    //     await indexedDBHelper.initializeDB({ commonData: commonData });
    //     await page.waitForTimeout(200);

    //     await productInquiryPage.navigate();
    //     await page.waitForTimeout(500);

    //     await productInquiryPage.searchProduct(testData.searchCode);
    //     await page.waitForTimeout(1000);

    //     await snapInput();

    //     const displayedProductName = await productInquiryPage.getProductName();
    //     const expectedProductName = testData.responseData.outDS.shnKhnInfoDT[0].rykchuNmKnj;
    //     expect(displayedProductName).toContain(expectedProductName);

    //     await snapExpect();
    // });

    test('WTY10101_18', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-action', 'wty10101', 'TC_18');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await page.waitForTimeout(500);

        await productInquiryPage.searchProduct(testData.searchCode);
        await page.waitForTimeout(1000);

        await snapInput();

        const displayedModel = await productInquiryPage.getModelNumber();
        const expectedModel = testData.responseData.outDS.shnKhnInfoDT[0].mkKata;
        expect(displayedModel).toContain(expectedModel);

        const displayedProductName = await productInquiryPage.getProductName();
        const expectedProductName = testData.responseData.outDS.shnKhnInfoDT[0].rykchuNmKnj;
        expect(displayedProductName).toContain(expectedProductName);

        await snapExpect();
    });

    test('WTY10101_19', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-action', 'wty10101', 'TC_19');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await page.waitForTimeout(500);

        await productInquiryPage.searchProduct(testData.searchCode);
        await page.waitForTimeout(1000);

        await snapInput();

        const displayedModel = await productInquiryPage.getModelNumber();
        const expectedModel = testData.responseData.outDS.shnKhnInfoDT[0].mkKata;
        expect(displayedModel).toContain(expectedModel);

        const displayedMaker = await productInquiryPage.getMakerName();
        const expectedMaker = testData.responseData.outDS.shnKhnInfoDT[0].rykmkrNmKnj;
        expect(displayedMaker).toContain(expectedMaker);

        await snapExpect();
    });

    test('WTY10101_24', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-action', 'wty10101', 'TC_24');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.clickBarcodeButton();

        await snapInput();

        const isDialogVisible = await productInquiryPage.waitForErrorDialog(5000);
        expect(isDialogVisible).toBeTruthy();

        const dialogMessage = await productInquiryPage.getErrorDialogMessage();
        expect(dialogMessage).toContain(testData.errorMessage);

        await snapExpect();

        await productInquiryPage.dismissErrorDialog();
    });

    test('WTY10101_26', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-action', 'wty10101', 'TC_26');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.fillSearchInput(testData.searchCode);

        await snapInput();

        await productInquiryPage.clickClearButton();

        expect(await productInquiryPage.getSearchInputValue()).toBe('');
        expect(await productInquiryPage.getClearInputIcon()).toBeTruthy();

        await snapExpect();
    });

    test('WTY10101_20', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-action', 'wty10101', 'TC_20');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await page.waitForTimeout(500);

        const urlBeforeSearch = page.url();

        await productInquiryPage.searchProduct(testData.searchCode);
        await page.waitForTimeout(1000);

        await snapInput();

        const urlAfterSearch = page.url();
        expect(urlAfterSearch).not.toBe(urlBeforeSearch);

        await snapExpect();
    });

    test('WTY10101_21', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-action', 'wty10101', 'TC_21');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await page.waitForTimeout(500);

        await productInquiryPage.clickSearch();
        await page.waitForTimeout(500);

        await snapInput();

        const message = await productInquiryPage.isBlankErrorMsgVisible();
        expect(message).toBeTruthy();

        await snapExpect();
    });

    test('WTY10101_22', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-action', 'wty10101', 'TC_22');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await page.waitForTimeout(500);

        await productInquiryPage.fillSearchInput(testData.searchCode);
        await page.waitForTimeout(500);

        await snapInput();

        const searchInput = page.locator('input[name="shnCd"]').first();
        await searchInput.press('Enter');
        await page.waitForTimeout(1000);

        const mkKataValue = await productInquiryPage.getKataInputValue();
        expect(mkKataValue).toBe('');

        await snapExpect();
    });
});
