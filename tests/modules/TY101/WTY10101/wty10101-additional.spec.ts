import { test, expect, loadTestData } from '../../../base/base-test';
import { TY10101Page } from '../../../pages/TY101/wty10101.page';
import { CommonHelper, takeScreenshotOnFailure } from '../../../utils/common-helper';

test.describe('WTY10101 - Additional', () => {
    let productInquiryPage: TY10101Page;

    test.beforeEach(async ({ page }) => {
        productInquiryPage = new TY10101Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });


    test('WTY10101_105', async ({ page, baseUrl, indexedDBHelper, snapInput, snapExpect }, testInfo) => {

        const testData = loadTestData('TY101/wty10101-additional', 'wty10101', 'TC_105');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.searchProduct(testData.searchCode);

        await snapInput();

        let searchValue = await productInquiryPage.getSearchInputValue();
        expect(searchValue).toBeTruthy();

        let kataValue = await productInquiryPage.getKataInputValue();
        expect(kataValue).toBeTruthy();

        await productInquiryPage.clickMenuButton();
        const clearMenuItem = await productInquiryPage.getClearMenuItem();
        await clearMenuItem.click();
        await page.waitForTimeout(1000);

        searchValue = await productInquiryPage.getSearchInputValue();
        expect(searchValue).toBeFalsy();

        kataValue = await productInquiryPage.getKataInputValue();
        expect(kataValue).toBeFalsy();

        await snapExpect();
    });

    test('WTY10101_106', async ({ page, baseUrl, indexedDBHelper, snapInput, snapExpect }, testInfo) => {
        // use TC_105 data
        const testData = loadTestData('TY101/wty10101-additional', 'wty10101', 'TC_105');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.searchProduct(testData.searchCode_TC_106);
        await productInquiryPage.clickDetailDisclosure();

        await snapInput();

        const limitedInputValue = await productInquiryPage.getLimitedInputValue();
        expect(limitedInputValue).toBe(testData.expectedResults.limitedInputValue_TC_106);

        await snapExpect();
    });

    test('WTY10101_107', async ({ page, baseUrl, indexedDBHelper, snapInput, snapExpect }, testInfo) => {
        // use TC_105 data
        const testData = loadTestData('TY101/wty10101-additional', 'wty10101', 'TC_105');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.searchProduct(testData.searchCode_TC_107);
        await productInquiryPage.clickDetailDisclosure();

        await snapInput();

        const limitedInputValue = await productInquiryPage.getLimitedInputValue();
        expect(limitedInputValue).toBe(testData.expectedResults.limitedInputValue_TC_107);

        await snapExpect();
    });
});
