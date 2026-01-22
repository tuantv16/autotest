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
    }) => {
        const testData = loadTestData('TY101/wty10101-init', 'wty10101', 'TC_05');
        console.log('[TEST] Running TC05 - Verify screen displays correctly when opened from menu');

        console.log('[TEST] Step 1: Loading base page (Đăng nhập hệ thống)...');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        console.log('[TEST] Injecting IndexedDB data...');
        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await page.waitForTimeout(100);

        console.log('[TEST] Step 2-3: Opening menu and selecting "商品基本照会"...');
        await productInquiryPage.navigate();
        await page.waitForTimeout(500);

        console.log('[TEST] Waiting for page to be ready...');
        await productInquiryPage.waitForPageReady();

        console.log('[TEST] Verification Point: Checking page title displays "商品基本照会"...');
        const isTitleVisible = await productInquiryPage.isPageTitleVisible();
        expect(isTitleVisible).toBe(true);

        const pageTitle = await productInquiryPage.getPageTitle();
        expect(pageTitle).toContain('商品基本照会');

        console.log('[TEST] Verification Point: Checking input fields are displayed...');

        const isSearchInputVisible = await productInquiryPage.isSearchInputVisible();
        expect(isSearchInputVisible).toBe(true);
        console.log('[TEST] Search input field (商品) is displayed');

        const isSearchButtonVisible = await productInquiryPage.isSearchButtonVisible();
        expect(isSearchButtonVisible).toBe(true);

        console.log('[TEST] Additional checks: Verifying other UI components...');

        const searchInputValue = await productInquiryPage.getSearchInputValue();
        expect(searchInputValue).toBe('');
        console.log('[TEST] Search input is empty initially');

        const isSearchInputDisabled = await productInquiryPage.isSearchInputDisabled();
        expect(isSearchInputDisabled).toBe(false);
        console.log('[TEST] Search input is enabled (not in inquiry mode)');
        const isSearchButtonDisabled = await productInquiryPage.isSearchButtonDisabled();
        expect(isSearchButtonDisabled).toBe(false);
        console.log('[TEST] Search button is enabled');

        console.log('[TEST] TC05 PASSED: Screen initialization verified successfully');
    });

    test('WTY10101_06', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY101/wty10101-init', 'wty10101', 'TC_06');
        console.log('[TEST] Running TC06 - Verify screen state when has previous data');

        console.log('[TEST] Step 1: Loading base page (Đăng nhập hệ thống)...');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        console.log('[TEST] Injecting IndexedDB data...');
        await indexedDBHelper.initializeDB({ sessionData: testData.sessionData, commonData: testData.commonData });
        await page.waitForTimeout(100);

        console.log('[TEST] Step 2-3: Opening menu and selecting "商品基本照会"...');
        await productInquiryPage.navigate();
        await page.waitForTimeout(200);

        console.log('[TEST] Waiting for page to be ready...');
        await productInquiryPage.waitForPageReady();
        await page.waitForTimeout(200);

        const kataInputValue = await productInquiryPage.getKataInputValue();
        expect(kataInputValue).not.toBe('');
        console.log('[TEST] Kata input is not empty');
    });

    test('WTY10101_07', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY101/wty10101-init', 'wty10101', 'TC_07');
        console.log('[TEST] Running TC07 - Verify screen state when has no previous data');

        console.log('[TEST] Step 1: Loading base page (Đăng nhập hệ thống)...');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        console.log('[TEST] Injecting IndexedDB data...');
        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await page.waitForTimeout(100);
        console.log('[TEST] Step 2-3: Opening menu and selecting "商品基本照会"...');
        await productInquiryPage.navigate();
        await page.waitForTimeout(500);

        console.log('[TEST] Waiting for page to be ready...');
        await productInquiryPage.waitForPageReady();

        const kataInputValue = await productInquiryPage.getKataInputValue();
        expect(kataInputValue).toBe('');
        console.log('[TEST] Kata input is empty');

        const searchInputValue = await productInquiryPage.getSearchInputValue();
        expect(searchInputValue).toBe('');
        console.log('[TEST] Search input is empty');
    });

    test('WTY10101_09', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY101/wty10101-init', 'wty10101', 'TC_09');
        console.log('[TEST] Step 1: Loading base page (Đăng nhập hệ thống)...');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        console.log('[TEST] Injecting IndexedDB data...');
        await indexedDBHelper.initializeDB({ commonData: testData.commonData });

        console.log('[TEST] Step 2-3: Opening menu and selecting "商品基本照会"...');
        await productInquiryPage.navigate();

        console.log('[TEST] Step 4: Clicking menu button...');
        await productInquiryPage.clickMenuButton();
        await page.waitForTimeout(200);

        const productPriceMenuItem = await productInquiryPage.getProductPriceMenuItem();
        expect(productPriceMenuItem).toBeTruthy();
        console.log('[TEST] Product price menu item is displayed');

        const storeStockMenuItem = await productInquiryPage.getStoreStockMenuItem();
        expect(storeStockMenuItem).toBeTruthy();
        console.log('[TEST] Store stock menu item is displayed');

        const orderMenuItem = await productInquiryPage.getOrderMenuItem();
        expect(orderMenuItem).toBeTruthy();
        console.log('[TEST] Order menu item is displayed');

        const arrivalMenuItem = await productInquiryPage.getArrivalMenuItem();
        expect(arrivalMenuItem).toBeTruthy();
        console.log('[TEST] Arrival menu item is displayed');
    });

    test('WTY10101_10', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY101/wty10101-init', 'wty10101', 'TC_10');
        console.log('[TEST] Step 1: Loading base page (Đăng nhập hệ thống)...');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        console.log('[TEST] Injecting IndexedDB data...');
        await indexedDBHelper.initializeDB({ commonData: testData.commonData });

        console.log('[TEST] Step 2-3: Opening menu and selecting "商品基本照会"...');
        await productInquiryPage.navigate();

        console.log('[TEST] Step 4: Clicking menu button...');
        await productInquiryPage.clickMenuButton();
        await page.waitForTimeout(200);

        const cartMenuItem = await productInquiryPage.getCartMenuItem();
        expect(cartMenuItem).toBeFalsy();
        console.log('[TEST] Cart menu item is not displayed');
    });

    test('WTY10101_11', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY101/wty10101-init', 'wty10101', 'TC_11');
        console.log('[TEST] Step 1: Loading base page (Đăng nhập hệ thống)...');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        console.log('[TEST] Injecting IndexedDB data...');
        await indexedDBHelper.initializeDB({ sessionData: testData.sessionData, commonData: testData.commonData });

        console.log('[TEST] Step 2-3: Opening menu and selecting "商品基本照会"...');
        await productInquiryPage.navigate();
        await page.waitForTimeout(10000);
        console.log('[TEST] Step 4: Clicking menu button...');
        await productInquiryPage.clickMenuButton();
        await page.waitForTimeout(5000);

        const cartMenuItem = await productInquiryPage.getCartMenuItem();
        expect(cartMenuItem).toBeTruthy();
        console.log('[TEST] Cart menu item is displayed');

        const clearMenuItem = await productInquiryPage.getClearMenuItem();
        expect(clearMenuItem).toBeTruthy();
        console.log('[TEST] Clear menu item is displayed');
    });

    test('WTY10101_13', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY101/wty10101-init', 'wty10101', 'TC_13');
        console.log('[TEST] Step 1: Loading base page (Đăng nhập hệ thống)...');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        console.log('[TEST] Injecting IndexedDB data...');
        await indexedDBHelper.initializeDB({ sessionData: testData.sessionData, commonData: testData.commonData });

        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await page.waitForTimeout(2000);

        const isSearchInputDisabled = await productInquiryPage.isSearchInputDisabled();
        expect(isSearchInputDisabled).toBeTruthy();
        console.log('[TEST] Search input is disabled');

        const clearInputIcon = await productInquiryPage.getClearInputIcon();
        expect(clearInputIcon).toBeFalsy();
        console.log('[TEST] Clear input icon is not displayed');

        const isSearchButtonDisabled = await productInquiryPage.isSearchButtonDisabled();
        expect(isSearchButtonDisabled).toBeTruthy();
        console.log('[TEST] Search button is disabled');

        const isScannerIconVisible = await productInquiryPage.isScannerIconVisible();
        expect(isScannerIconVisible).toBeFalsy();
        console.log('[TEST] Scanner icon is not visible');

    });

});
