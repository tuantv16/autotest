/**
 * WTY10101 Screen Initialization Test Suite
 * Test Case 5: Khởi tạo màn hình - Kiểm tra màn hình hiển thị đúng khi mở từ menu
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { WTY10701Page } from '../../../pages/TY107/wty10701.page';
import { CommonHelper, takeScreenshotOnFailure } from '../../../utils/common-helper';

test.describe('WTY10701 - Clear Data Test Suite', () => {
    let wty10701Page: WTY10701Page;

    test.beforeEach(async ({ page }) => {
        wty10701Page = new WTY10701Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    const commonData = CommonHelper.loadTestData('TY107/wty10701-clear-data').wty10701.commonData;

    
    test('WTY10701_36', async ({ page, baseUrl, indexedDBHelper,  snapInput,
        snapExpect,}) => {
        const testData = loadTestData('TY107/wty10701-clear-data', 'wty10701', 'data');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await wty10701Page.navigate();
        await wty10701Page.waitForFormReady();

        await wty10701Page.fillBtenCdInput(testData.form.TC_36.btenCd);
        await snapInput();

        await wty10701Page.getBtenCdClearInputIcon().click();

        const btenCdInput = await wty10701Page.getBtenCdInput().getAttribute('value');
        expect(btenCdInput).toBeFalsy();
        
        await snapExpect();
    });

    test('WTY10701_37', async ({ page, baseUrl, indexedDBHelper,  snapInput,
        snapExpect,}) => {
        const testData = loadTestData('TY107/wty10701-clear-data', 'wty10701', 'data');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await wty10701Page.navigate();
        await wty10701Page.waitForFormReady();

        await wty10701Page.fillShnCdInput(testData.form.TC_37.shnCd);
        await snapInput();

        await wty10701Page.getShnCdClearInputIcon().click();

        const shnCdInput = await wty10701Page.getShnCdInput().getAttribute('value');
        expect(shnCdInput).toBeFalsy();
        
        await snapExpect();
    });

    test('WTY10701_38', async ({ page, baseUrl, indexedDBHelper,  snapInput,
        snapExpect,}) => {
        const testData = loadTestData('TY107/wty10701-clear-data', 'wty10701', 'data');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await wty10701Page.navigate();
        await wty10701Page.waitForFormReady();

        await wty10701Page.fillBtenCdInput(testData.form.TC_38.btenCd);
        await wty10701Page.fillShnCdInput(testData.form.TC_38.shnCd);
        await snapInput();

        await page.waitForTimeout(1000);
        await wty10701Page.clickSearchButton();
        await snapInput(2);

        const btnClear = await wty10701Page.getButtonClear();
        await btnClear.click();
        await page.waitForTimeout(1000);

        const btenCdInput = await wty10701Page.getBtenCdInput().getAttribute('value');
        expect(btenCdInput).toBeFalsy();

        const shnCdInput = await wty10701Page.getShnCdInput().getAttribute('value');
        expect(shnCdInput).toBeFalsy();

        const storeNameInput = await wty10701Page.getStoreNameInputValue();
        expect(storeNameInput).toBeFalsy();

        const modelNumberInput = await wty10701Page.getModelNumberInputValue();
        expect(modelNumberInput).toBeFalsy();

        const manufacturerNameInput = await wty10701Page.getManufacturerNameInputValue();
        expect(manufacturerNameInput).toBeFalsy();

        const setInput = await wty10701Page.getSetInputValue();
        expect(setInput).toBeFalsy();

        const rankInput = await wty10701Page.getRankInputValue();
        expect(rankInput).toBeFalsy();

        const setInput2 = await wty10701Page.getSetInputValue2();
        expect(setInput2).toBeFalsy();

        await snapExpect();
    });

    test('WTY10701_39', async ({ page, baseUrl, indexedDBHelper,  snapInput,
        snapExpect,}) => {
        const testData = loadTestData('TY107/wty10701-clear-data', 'wty10701', 'data');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await wty10701Page.navigate();
        await wty10701Page.waitForFormReady();

        const btnClear = await wty10701Page.getButtonClear();
        await btnClear.click();
        await page.waitForTimeout(1000);
        await snapInput();

        const btenCdInput = await wty10701Page.getBtenCdInput().getAttribute('value');
        expect(btenCdInput).toBeFalsy();

        const shnCdInput = await wty10701Page.getShnCdInput().getAttribute('value');
        expect(shnCdInput).toBeFalsy();

        const storeNameInput = await wty10701Page.getStoreNameInputValue();
        expect(storeNameInput).toBeFalsy();

        const modelNumberInput = await wty10701Page.getModelNumberInputValue();
        expect(modelNumberInput).toBeFalsy();

        const manufacturerNameInput = await wty10701Page.getManufacturerNameInputValue();
        expect(manufacturerNameInput).toBeFalsy();

        const setInput = await wty10701Page.getSetInputValue();
        expect(setInput).toBeFalsy();

        const rankInput = await wty10701Page.getRankInputValue();
        expect(rankInput.trim()).toBeFalsy();

        const setInput2 = await wty10701Page.getSetInputValue2();
        expect(setInput2).toBeFalsy();

        await snapExpect();
    });

});