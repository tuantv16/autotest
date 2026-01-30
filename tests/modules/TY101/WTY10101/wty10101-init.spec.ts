/**
 * WTY10101 Screen Initialization Test Suite
 * Test Case 5: Khởi tạo màn hình - Kiểm tra màn hình hiển thị đúng khi mở từ menu
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { TY10101Page } from '../../../pages/TY101/wty10101.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';

test.describe('WTY10101 - TC05: Screen Initialization (Khởi tạo màn hình)', () => {
    let productInquiryPage: TY10101Page;

    test.beforeEach(async ({ page }) => {
        productInquiryPage = new TY10101Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('WTY10101_05', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect
    }) => {
        const testData = loadTestData('TY101/wty10101-init', 'wty10101', 'TC_05');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await page.waitForTimeout(100);

        await productInquiryPage.navigate();
        await page.waitForTimeout(500);

        await productInquiryPage.waitForPageReady();

        await snapInput();

        const isTitleVisible = await productInquiryPage.isPageTitleVisible();
        expect(isTitleVisible).toBe(true);

        const pageTitle = await productInquiryPage.getPageTitle();
        expect(pageTitle).toContain('商品基本照会');


        const isSearchInputVisible = await productInquiryPage.isSearchInputVisible();
        expect(isSearchInputVisible).toBe(true);

        const isSearchButtonVisible = await productInquiryPage.isSearchButtonVisible();
        expect(isSearchButtonVisible).toBe(true);


        const searchInputValue = await productInquiryPage.getSearchInputValue();
        expect(searchInputValue).toBe('');

        const isSearchInputDisabled = await productInquiryPage.isSearchInputDisabled();
        expect(isSearchInputDisabled).toBe(false);
        const isSearchButtonDisabled = await productInquiryPage.isSearchButtonDisabled();
        expect(isSearchButtonDisabled).toBe(false);

        await snapExpect();
    });

    test('WTY10101_06', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-init', 'wty10101', 'TC_06');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({ sessionData: testData.sessionData, commonData: testData.commonData });
        await page.waitForTimeout(100);

        await productInquiryPage.navigate();
        await page.waitForTimeout(200);

        await productInquiryPage.waitForPageReady();

        await snapInput();

        const kataInputValue = await productInquiryPage.getKataInputValue();
        expect(kataInputValue).not.toBe('');

        await snapExpect();
    });

    test('WTY10101_07', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-init', 'wty10101', 'TC_07');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await page.waitForTimeout(100);
        await productInquiryPage.navigate();
        await page.waitForTimeout(500);

        await productInquiryPage.waitForPageReady();

        await snapInput();

        const kataInputValue = await productInquiryPage.getKataInputValue();
        expect(kataInputValue).toBe('');

        const searchInputValue = await productInquiryPage.getSearchInputValue();
        expect(searchInputValue).toBe('');

        await snapExpect();
    });

    test('WTY10101_09', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-init', 'wty10101', 'TC_09');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({ commonData: testData.commonData });

        await productInquiryPage.navigate();

        await productInquiryPage.clickMenuButton();
        await page.waitForTimeout(200);

        await snapInput();

        const productPriceMenuItem = await productInquiryPage.getProductPriceMenuItem();
        expect(productPriceMenuItem).toBeTruthy();

        const storeStockMenuItem = await productInquiryPage.getStoreStockMenuItem();
        expect(storeStockMenuItem).toBeTruthy();

        const orderMenuItem = await productInquiryPage.getOrderMenuItem();
        expect(orderMenuItem).toBeTruthy();

        const arrivalMenuItem = await productInquiryPage.getArrivalMenuItem();
        expect(arrivalMenuItem).toBeTruthy();

        await snapExpect();
    });

    test('WTY10101_10', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-init', 'wty10101', 'TC_10');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({ commonData: testData.commonData });

        await productInquiryPage.navigate();

        await productInquiryPage.clickMenuButton();
        await page.waitForTimeout(200);

        await snapInput();

        const cartMenuItem = await productInquiryPage.getCartMenuItem();
        expect(cartMenuItem).toBeFalsy();

        await snapExpect();
    });

    test('WTY10101_11', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-init', 'wty10101', 'TC_11');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({ sessionData: testData.sessionData, commonData: testData.commonData });

        await productInquiryPage.navigate();
        await page.waitForTimeout(10000);
        await productInquiryPage.clickMenuButton();
        await page.waitForTimeout(5000);

        await snapInput();

        const cartMenuItem = await productInquiryPage.getCartMenuItem();
        expect(cartMenuItem).toBeTruthy();

        const clearMenuItem = await productInquiryPage.getClearMenuItem();
        expect(clearMenuItem).toBeTruthy();

        await snapExpect();
    });

    test('WTY10101_13', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-init', 'wty10101', 'TC_13');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({ sessionData: testData.sessionData, commonData: testData.commonData });

        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await page.waitForTimeout(2000);

        await snapInput();

        const isSearchInputDisabled = await productInquiryPage.isSearchInputDisabled();
        expect(isSearchInputDisabled).toBeTruthy();

        const clearInputIcon = await productInquiryPage.getClearInputIcon();
        expect(clearInputIcon).toBeFalsy();

        const isSearchButtonDisabled = await productInquiryPage.isSearchButtonDisabled();
        expect(isSearchButtonDisabled).toBeTruthy();

        const isScannerIconVisible = await productInquiryPage.isScannerIconVisible();
        expect(isScannerIconVisible).toBeFalsy();

        await snapExpect();
    });

});
