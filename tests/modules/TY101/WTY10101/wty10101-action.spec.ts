import { test, expect, loadTestData } from '../../../base/base-test';
import { TY10101Page } from '../../../pages/TY101/wty10101.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';

test.describe('WTY10101 - Action behavior', () => {
    let productInquiryPage: TY10101Page;

    test.beforeEach(async ({ page }) => {
        productInquiryPage = new TY10101Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('WTY10101_14', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY101/wty10101-action', 'wty10101', 'TC_14');
        console.log('[TEST] Step 1: Loading base page (Đăng nhập hệ thống)...');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        console.log('[TEST] Step 2: Injecting IndexedDB data with modeFlg=1...');
        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await page.waitForTimeout(200);

        console.log('[TEST] Step 3: Navigating to product inquiry page...');
        await productInquiryPage.navigate();
        await page.waitForTimeout(500);

        console.log('[TEST] Step 4: Clicking menu button...');
        await productInquiryPage.clickMenuButton();
        await page.waitForTimeout(500);

        console.log('[TEST] Step 5: Verifying Cart menu item is hidden...');
        const cartMenuItem = await productInquiryPage.getCartMenuItem();
        expect(cartMenuItem).toBeFalsy();
        console.log('[TEST] Cart menu item is hidden');

        console.log('[TEST] Step 6: Verifying Clear menu item is hidden...');
        const clearMenuItem = await productInquiryPage.getClearMenuItem();
        expect(clearMenuItem).toBeFalsy();
        console.log('[TEST] Clear menu item is hidden');
    });

    test('WTY10101_15', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        console.log('[TEST] Step 1: Loading base page...');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Essential for initialization
        const testData = loadTestData('TY101/wty10101-action', 'wty10101', 'TC_15');
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await page.waitForTimeout(500);

        console.log('[TEST] Step 2: Focusing on search input...');
        await productInquiryPage.focusSearchInput();

        console.log('[TEST] Step 3: Verifying popup is visible...');
        const isPopupVisible = await productInquiryPage.isFunctionPopupVisible();
        expect(isPopupVisible).toBeTruthy();
        console.log('[TEST] Function popup is visible');

        console.log('[TEST] Step 4: Verifying Model Search button is visible in popup...');
        const isModelSearchVisible = await productInquiryPage.isModelSearchPopupItemVisible();
        expect(isModelSearchVisible).toBeTruthy();
        console.log('[TEST] Model Search button is visible');
    });

    test('WTY10101_16', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        console.log('[TEST] Step 1: Loading base page...');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await page.waitForTimeout(500);

        console.log('[TEST] Step 2: Focusing on search input...');
        await productInquiryPage.focusSearchInput();
        expect(await productInquiryPage.isFunctionPopupVisible()).toBeTruthy();

        console.log('[TEST] Step 3: Clicking outside to blur...');
        await productInquiryPage.clickOutside();

        // Use longer timeout because there's a 200ms delay in component handleInputBlur
        await page.waitForTimeout(500);

        console.log('[TEST] Step 4: Verifying popup is hidden...');
        const isPopupVisible = await productInquiryPage.isFunctionPopupVisible();
        expect(isPopupVisible).toBeFalsy();
        console.log('[TEST] Function popup is hidden');
    });

    test('WTY10101_17', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY101/wty10101-action', 'wty10101', 'TC_17');
        console.log('[TEST] Step 1: Loading base page...');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        console.log('[TEST] Step 2: Injecting IndexedDB data...');
        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await page.waitForTimeout(200);

        console.log('[TEST] Step 3: Navigating to inquiry page...');
        await productInquiryPage.navigate();
        await page.waitForTimeout(500);

        console.log('[TEST] Step 4: Searching for 8-digit code:', testData.searchCode);
        await productInquiryPage.searchProduct(testData.searchCode);
        await page.waitForTimeout(1000);

        const displayedProductName = await productInquiryPage.getProductName();
        const expectedProductName = testData.responseData.outDS.shnKhnInfoDT[0].rykchuNmKnj;
        console.log('displayedProductName', displayedProductName)
        expect(displayedProductName).toContain(expectedProductName);

        console.log(`[TEST] TC17 Successful: Found product ${expectedProductName}`);
    });

    test('WTY10101_18', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY101/wty10101-action', 'wty10101', 'TC_18');
        console.log('[TEST] Step 1: Loading base page...');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        console.log('[TEST] Step 2: Injecting IndexedDB data...');
        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await page.waitForTimeout(200);

        console.log('[TEST] Step 3: Navigating to inquiry page...');
        await productInquiryPage.navigate();
        await page.waitForTimeout(500);

        console.log('[TEST] Step 4: Searching for 11-digit code:', testData.searchCode);
        await productInquiryPage.searchProduct(testData.searchCode);
        await page.waitForTimeout(1000);

        console.log('[TEST] Step 6: Verifying product info display...');
        const displayedModel = await productInquiryPage.getModelNumber();
        const expectedModel = testData.responseData.outDS.shnKhnInfoDT[0].mkKata;
        console.log('displayedModel', displayedModel)
        expect(displayedModel).toContain(expectedModel);

        const displayedProductName = await productInquiryPage.getProductName();
        const expectedProductName = testData.responseData.outDS.shnKhnInfoDT[0].rykchuNmKnj;
        expect(displayedProductName).toContain(expectedProductName);

        console.log(`[TEST] TC18 Successful: Found product ${expectedProductName}`);
    });

    test('WTY10101_19', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY101/wty10101-action', 'wty10101', 'TC_19');
        console.log('[TEST] Step 1: Loading base page...');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        console.log('[TEST] Step 2: Injecting IndexedDB data...');
        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await page.waitForTimeout(200);

        console.log('[TEST] Step 3: Navigating to inquiry page...');
        await productInquiryPage.navigate();
        await page.waitForTimeout(500);

        console.log('[TEST] Step 5: Searching for 13-digit JAN code:', testData.searchCode);
        await productInquiryPage.searchProduct(testData.searchCode);
        await page.waitForTimeout(1000);

        console.log('[TEST] Step 6: Verifying product info display...');
        const displayedModel = await productInquiryPage.getModelNumber();
        console.log('displayedModel', displayedModel)
        const expectedModel = testData.responseData.outDS.shnKhnInfoDT[0].mkKata;
        expect(displayedModel).toContain(expectedModel);

        const displayedMaker = await productInquiryPage.getMakerName();
        console.log('displayedMaker', displayedMaker)
        const expectedMaker = testData.responseData.outDS.shnKhnInfoDT[0].rykmkrNmKnj;
        expect(displayedMaker).toContain(expectedMaker);

        console.log(`[TEST] TC19 Successful: Found product with Maker ${expectedMaker}`);
    });

    test('WTY10101_24', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY101/wty10101-action', 'wty10101', 'TC_24');

        console.log('[TEST] Step 1: Loading base page...');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        console.log('[TEST] Step 2: Injecting IndexedDB data...');
        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await page.waitForTimeout(200);

        console.log('[TEST] Step 3: Navigating to product inquiry page...');
        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        console.log('[TEST] Step 4: Triggering barcode scan...');
        await productInquiryPage.clickBarcodeButton();

        console.log('[TEST] Step 5: Waiting for error dialog about unsupported device...');
        const isDialogVisible = await productInquiryPage.waitForErrorDialog(5000);
        expect(isDialogVisible).toBeTruthy();

        const dialogMessage = await productInquiryPage.getErrorDialogMessage();
        expect(dialogMessage).toContain(testData.errorMessage);
        console.log('[TEST] Displayed warning for unsupported scanner device');

        await productInquiryPage.dismissErrorDialog();
    });

    test('WTY10101_26', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY101/wty10101-action', 'wty10101', 'TC_26');

        console.log('[TEST] Step 1: Loading base page...');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        console.log('[TEST] Step 2: Injecting IndexedDB data...');
        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await page.waitForTimeout(200);

        console.log('[TEST] Step 3: Navigating to product inquiry page...');
        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        console.log('[TEST] Step 4: Input product code into search field...');
        await productInquiryPage.fillSearchInput(testData.searchCode);

        console.log('[TEST] Step 6: Clicking clear (×) button...');
        await productInquiryPage.clickClearButton();

        console.log('[TEST] Step 7: Validating search field is cleared and clear icon remains visible...');
        expect(await productInquiryPage.getSearchInputValue()).toBe('');
        expect(await productInquiryPage.getClearInputIcon()).toBeTruthy();

        console.log('[TEST] Search input cleared and clear icon still displayed');
    });
});
