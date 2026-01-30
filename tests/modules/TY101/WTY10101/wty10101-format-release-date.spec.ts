import { test, expect, loadTestData } from '../../../base/base-test';
import { TY10101Page } from '../../../pages/TY101/wty10101.page';
import { CommonHelper, takeScreenshotOnFailure } from '../../../utils/common-helper';

test.describe('WTY10101 - Screen transition', () => {
    let productInquiryPage: TY10101Page;

    test.beforeEach(async ({ page }) => {
        productInquiryPage = new TY10101Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    const commonData = CommonHelper.loadTestData('TY101/wty10101-common-data').commonData;

    test('WTY10101_99', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {

        const testData = loadTestData('TY101/wty10101-format-release-date', 'wty10101', 'TC_99');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.fillSearchInput(testData.searchCode);
        await snapInput();
        await productInquiryPage.clickSearch();
        await page.waitForTimeout(2000);

        await productInquiryPage.clickDetailDisclosure();
        await page.waitForTimeout(1000);

        const releaseDateInput = await productInquiryPage.getReleaseDateInputValue();
        expect(releaseDateInput).toBeFalsy();

        await snapExpect();
    });

    test('WTY10101_100', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-format-release-date', 'wty10101', 'TC_100');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.searchProduct(testData.searchCode);
        await productInquiryPage.clickDetailDisclosure();

        await snapInput();

        const releaseDateInput = await productInquiryPage.getReleaseDateInputValue();
        expect(releaseDateInput).toBe(testData.expectedResults.releaseDateInputValue);

        await snapExpect();
    });

    test('WTY10101_101', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-format-release-date', 'wty10101', 'TC_101');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.searchProduct(testData.searchCode);
        await productInquiryPage.clickDetailDisclosure();

        await snapInput();

        const releaseDateInput = await productInquiryPage.getReleaseDateInputValue();
        expect(releaseDateInput).toBe(testData.expectedResults.releaseDateInputValue);

        await snapExpect();
    });

    test('WTY10101_102', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-format-release-date', 'wty10101', 'TC_102');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.searchProduct(testData.searchCode);
        await productInquiryPage.clickDetailDisclosure();

        await snapInput();

        const releaseDateInput = await productInquiryPage.getReleaseDateInputValue();
        expect(releaseDateInput).toBe(testData.expectedResults.releaseDateInputValue);

        await snapExpect();
    });

    test('WTY10101_103', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-format-release-date', 'wty10101', 'TC_103');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.searchProduct(testData.searchCode);
        await productInquiryPage.clickDetailDisclosure();

        await snapInput();

        const releaseDateInput = await productInquiryPage.getReleaseDateInputValue();
        expect(releaseDateInput).toBe(testData.expectedResults.releaseDateInputValue);

        await snapExpect();
    });

    test('WTY10101_104', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-format-release-date', 'wty10101', 'TC_104');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.searchProduct(testData.searchCode);
        await productInquiryPage.clickDetailDisclosure();

        await snapInput();

        const releaseDateInput = await productInquiryPage.getReleaseDateInputValue();
        expect(releaseDateInput).toBe(testData.expectedResults.releaseDateInputValue);

        await snapExpect();
    });
});
