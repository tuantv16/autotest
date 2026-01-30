/**
 * WTY10101 Screen Initialization Test Suite
 * Test Case 5: Khởi tạo màn hình - Kiểm tra màn hình hiển thị đúng khi mở từ menu
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { WTY10701Page } from '../../../pages/TY107/wty10701.page';
import { CommonHelper, takeScreenshotOnFailure } from '../../../utils/common-helper';

test.describe('WTY10701 - UI Test Suite', () => {
    let wty10701Page: WTY10701Page;

    test.beforeEach(async ({ page }) => {
        wty10701Page = new WTY10701Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    const commonData = CommonHelper.loadTestData('TY107/wty10701-ui').wty10701.commonData;

    
    test('WTY10701_08', async ({ page, baseUrl, indexedDBHelper,  snapInput,
        snapExpect,}) => {
        const testData = loadTestData('TY107/wty10701-ui', 'wty10701', 'TC_08');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await wty10701Page.navigate();
        await wty10701Page.waitForFormReady();
        await wty10701Page.isHeadingTitleVisible()
        await snapInput();

        await wty10701Page.clickIconMenu()
        await page.waitForTimeout(500);

        const basicProductMenuItem = await wty10701Page.getBasicProductMenuItem();
        expect(basicProductMenuItem).toBeVisible();
        const productPriceMenuItem = await wty10701Page.getProductPriceMenuItem();
        expect(productPriceMenuItem).toBeVisible();
        const storeInventoryMenuItem = await wty10701Page.getStoreInventoryMenuItem();
        expect(storeInventoryMenuItem).toBeVisible();
        await snapExpect();
    });

    test('WTY10701_09', async ({ page, baseUrl, indexedDBHelper,  snapInput,
        snapExpect,}) => {
        const testData = loadTestData('TY107/wty10701-ui', 'wty10701', 'TC_09');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await wty10701Page.navigate();
        await wty10701Page.waitForFormReady();
        await snapInput();

        await wty10701Page.focusBtenCdInput();
        await page.waitForTimeout(500);

        const popup = await wty10701Page.getPopup();
        expect(popup).toBeVisible();
        const popupContent = await popup.textContent();
        expect(popupContent).toContain(testData.expectedResults.popupContent);
        await snapExpect();
    });

    test('WTY10701_10', async ({ page, baseUrl, indexedDBHelper,  snapInput,
        snapExpect,}) => {
        const testData = loadTestData('TY107/wty10701-ui', 'wty10701', 'TC_10');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await wty10701Page.navigate();
        await wty10701Page.waitForFormReady();
        await snapInput();

        await wty10701Page.focusShnCdInput();
        await page.waitForTimeout(500);

        const popup = await wty10701Page.getPopup();
        expect(popup).toBeVisible();
        const popupContent = await popup.textContent();
        expect(popupContent).toContain(testData.expectedResults.popupContent);
        await snapExpect();
    });

    test('WTY10701_13', async ({ page, baseUrl, indexedDBHelper,  snapInput,
        snapExpect,}) => {
        const testData = loadTestData('TY107/wty10701-ui', 'wty10701', 'TC_13');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await wty10701Page.navigate();
        await wty10701Page.waitForFormReady();
        await snapInput();

        const clearInputIcon = await wty10701Page.getClearInputIcon();
        expect(clearInputIcon).not.toBeVisible();
        const scannerIcon = await wty10701Page.getScannerIcon();
        expect(scannerIcon).not.toBeVisible();
        const searchButton = await wty10701Page.getSearchButton();
        expect(searchButton).toBeDisabled();
        const buttonClear = await wty10701Page.getButtonClear();
        expect(buttonClear).not.toBeVisible();
        const btenCdInput = await wty10701Page.getBtenCdInput();
        expect(btenCdInput).toBeDisabled();
        const shnCdInput = await wty10701Page.getShnCdInput();
        expect(shnCdInput).toBeDisabled();
        await snapExpect();
    });

    test('WTY10701_14', async ({ page, baseUrl, indexedDBHelper,  snapInput,
        snapExpect,}) => {
        const testData = loadTestData('TY107/wty10701-ui', 'wty10701', 'TC_14');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await wty10701Page.navigate();
        await wty10701Page.waitForFormReady();
        await snapInput();
        const iconScanner = await wty10701Page.getScannerIcon();
        await iconScanner.click();
        await page.waitForTimeout(500);
        await wty10701Page.clickBody();
        const popup = await wty10701Page.getErrorDialog();
        const popupContent = await popup.textContent();
        expect(popupContent).toContain(testData.expectedResults.errorMessage);
        await snapExpect();
    });
});
