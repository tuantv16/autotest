/**
 * WTY10101 Screen Initialization Test Suite
 * Test Case 5: Khởi tạo màn hình - Kiểm tra màn hình hiển thị đúng khi mở từ menu
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { WTY10701Page } from '../../../pages/TY107/wty10701.page';
import { CommonHelper, takeScreenshotOnFailure } from '../../../utils/common-helper';

test.describe('WTY10701 - Search and Display Test Suite', () => {
    let wty10701Page: WTY10701Page;

    test.beforeEach(async ({ page }) => {
        wty10701Page = new WTY10701Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    const commonData = CommonHelper.loadTestData('TY107/wty10701-search-and-display').wty10701.commonData;

    
    test('WTY10701_28', async ({ page, baseUrl, indexedDBHelper,  snapInput,
        snapExpect,}) => {
        const testData = loadTestData('TY107/wty10701-search-and-display', 'wty10701', 'data');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await wty10701Page.navigate();
        await wty10701Page.waitForFormReady();
        

        await wty10701Page.fillBtenCdInput(testData.form.TC_28.btenCd);
        await snapInput();
        
        await wty10701Page.fillShnCdInput(testData.form.TC_28.shnCd);
        await snapInput(2);
        
        await wty10701Page.clickSearchButton();

        await page.waitForTimeout(2000);

        const storeNameInputValue = await wty10701Page.getStoreNameInputValue();
        expect(storeNameInputValue).toBe(testData.expectedResults.TC_28.storeName);
        const manufacturerNameInputValue = await wty10701Page.getManufacturerNameInputValue();
        expect(manufacturerNameInputValue).toBe(testData.expectedResults.TC_28.manufacturerName);
        const setInputValue = await wty10701Page.getSetInputValue();
        expect(setInputValue).toBe(testData.expectedResults.TC_28.set1);
        const setInputValue2 = await wty10701Page.getSetInputValue2();
        expect(setInputValue2).toBe(testData.expectedResults.TC_28.set2);
        const rankInputValue = await wty10701Page.getRankInputValue();
        expect(rankInputValue.trim()).toBe(testData.expectedResults.TC_28.rank);

        await snapExpect();
    });

    test('WTY10701_29', async ({ page, baseUrl, indexedDBHelper,  snapInput,
        snapExpect,}) => {
        const testData = loadTestData('TY107/wty10701-search-and-display', 'wty10701', 'data');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await wty10701Page.navigate();
        await wty10701Page.waitForFormReady();
        
        await wty10701Page.fillBtenCdInput(testData.form.TC_29.btenCd);
        
        await wty10701Page.fillShnCdInput(testData.form.TC_29.shnCd);
        await snapInput();
        
        await wty10701Page.clickSearchButton();

        const availableQuantityValue = await wty10701Page.getAvailableQuantityValue();
        expect(availableQuantityValue).toBe(testData.expectedResults.TC_29.availableQuantity);
        await snapExpect();
    });

    test('WTY10701_30', async ({ page, baseUrl, indexedDBHelper,  snapInput,
        snapExpect,}) => {
        const testData = loadTestData('TY107/wty10701-search-and-display', 'wty10701', 'data');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await wty10701Page.navigate();
        await wty10701Page.waitForFormReady();
        // use TC_29 data
        await wty10701Page.fillBtenCdInput(testData.form.TC_29.btenCd);
        // use TC_29 data
        await wty10701Page.fillShnCdInput(testData.form.TC_29.shnCd);
        await snapInput();
        
        await wty10701Page.clickSearchButton();

        const date = await wty10701Page.getDataTableByColAndRow(0, 1);
        expect(date).toBe(testData.expectedResults.TC_30.date);
        const quantity = await wty10701Page.getDataTableByColAndRow(0, 2);
        expect(quantity).toBe(testData.expectedResults.TC_30.quantity);

        await snapExpect();
    });

    test('WTY10701_31', async ({ page, baseUrl, indexedDBHelper,  snapInput,
        snapExpect,}) => {
        const testData = loadTestData('TY107/wty10701-search-and-display', 'wty10701', 'data');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await wty10701Page.navigate();
        await wty10701Page.waitForFormReady();
        await wty10701Page.fillBtenCdInput(testData.form.TC_31.btenCd);
        await wty10701Page.fillShnCdInput(testData.form.TC_31.shnCd);
        await snapInput();

        await wty10701Page.clickSearchButton();

        const errorMessage = await wty10701Page.getErrorDialog().textContent();
        expect(errorMessage).toContain(testData.expectedResults.TC_31.errorMessage);

        const modelNumberInputValue = await wty10701Page.getModelNumberInputValue();
        expect(modelNumberInputValue).toBeFalsy();

        await snapExpect();
    });

    test('WTY10701_32', async ({ page, baseUrl, indexedDBHelper,  snapInput,
        snapExpect,}) => {

        const testData = loadTestData('TY107/wty10701-search-and-display', 'wty10701', 'data');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await wty10701Page.navigate();
        await wty10701Page.waitForFormReady();
        await wty10701Page.fillBtenCdInput(testData.form.TC_32.btenCd);
        await snapInput();

        await wty10701Page.blurBtenCdInput();

        const btenName = await wty10701Page.getStoreNameInputValue();
        expect(btenName).toBe(testData.expectedResults.TC_32.btenName);

        await snapExpect();
    });

    test('WTY10701_33', async ({ page, baseUrl, indexedDBHelper,  snapInput,
        snapExpect,}) => {
        const testData = loadTestData('TY107/wty10701-search-and-display', 'wty10701', 'data');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await wty10701Page.navigate();
        await wty10701Page.waitForFormReady();
        
        await wty10701Page.fillBtenCdInput(testData.form.TC_33.btenCd);
        
        await wty10701Page.fillShnCdInput(testData.form.TC_33.shnCd);
        await snapInput();
        
        await wty10701Page.clickSearchButton();

        const date = await wty10701Page.getDataTableByColAndRow(0, 1);
        const quantity = await wty10701Page.getDataTableByColAndRow(0, 2);
        
        expect(date).toMatch(/^\d{2}月\d{2}日$/);
        expect(quantity).toBeTruthy();

        await snapExpect();
    });
});