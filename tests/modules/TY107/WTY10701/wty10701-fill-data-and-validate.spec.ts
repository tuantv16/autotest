/**
 * WTY10101 Screen Initialization Test Suite
 * Test Case 5: Khởi tạo màn hình - Kiểm tra màn hình hiển thị đúng khi mở từ menu
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { WTY10701Page } from '../../../pages/TY107/wty10701.page';
import { CommonHelper, takeScreenshotOnFailure } from '../../../utils/common-helper';

test.describe('WTY10701 - Fill Data and Validate Test Suite', () => {
    let wty10701Page: WTY10701Page;

    test.beforeEach(async ({ page }) => {
        wty10701Page = new WTY10701Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    const commonData = CommonHelper.loadTestData('TY107/wty10701-fill-data-and-validate').wty10701.commonData;

    
    test('WTY10701_17', async ({ page, baseUrl, indexedDBHelper,  snapInput,
        snapExpect,}) => {
        const testData = loadTestData('TY107/wty10701-fill-data-and-validate', 'wty10701', 'TC_17');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await wty10701Page.navigate();
        await wty10701Page.waitForFormReady();
        await wty10701Page.isHeadingTitleVisible()
        

        await wty10701Page.fillBtenCdInput(testData.storeCd);
        await snapInput();
        await wty10701Page.blurBtenCdInput();
        await page.waitForTimeout(2000);

        const storeNameInputValue = await wty10701Page.getStoreNameInputValue();
        expect(storeNameInputValue).toBe(testData.expectedResults.storeName);
        await snapExpect();
    });

    test('WTY10701_18', async ({ page, baseUrl, indexedDBHelper,  snapInput,
        snapExpect,}) => {
        const testData = loadTestData('TY107/wty10701-fill-data-and-validate', 'wty10701', 'TC_18');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await wty10701Page.navigate();
        await wty10701Page.waitForFormReady();
        await wty10701Page.isHeadingTitleVisible()
        

        await wty10701Page.fillBtenCdInput(testData.storeCd);
        await snapInput();
        await wty10701Page.blurBtenCdInput();
        await page.waitForTimeout(2000);

        const storeNameInputValue = await wty10701Page.getStoreNameInputValue();
        expect(storeNameInputValue).toBeFalsy();
        const errorDialog = await wty10701Page.getErrorDialog();
        expect(errorDialog).not.toBeVisible();
        await snapExpect();
    });

    test('WTY10701_19', async ({ page, baseUrl, indexedDBHelper,  snapInput,
        snapExpect,}) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await wty10701Page.navigate();
        await wty10701Page.waitForFormReady();
        await wty10701Page.isHeadingTitleVisible()
        
        await snapInput();
 
        await wty10701Page.clickSearchButton();

        const blankErrorLabels = wty10701Page.getBlankErrorLabel();
        const blankErrorLabelsCount = await blankErrorLabels.count();
        expect(blankErrorLabelsCount).toBe(2);
        for (let i = 0; i < blankErrorLabelsCount; i++) {
            await expect(blankErrorLabels.nth(i)).toBeVisible();
        }

        await snapExpect();
    });

    test('WTY10701_20', async ({ page, baseUrl, indexedDBHelper,  snapInput,
        snapExpect,}) => {
        const testData = loadTestData('TY107/wty10701-fill-data-and-validate', 'wty10701', 'TC_20');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await wty10701Page.navigate();
        await wty10701Page.waitForFormReady();
        await wty10701Page.isHeadingTitleVisible()
        
        await wty10701Page.fillBtenCdInput(testData.form.btenCd);
        await snapInput();
        
        await wty10701Page.clickSearchButton();

        const errorLabel = await wty10701Page.getErrorLabel().first();
        expect(errorLabel).toBeVisible();
        const errorLabelText = await errorLabel.textContent();
        expect(errorLabelText).toBe(testData.expectedResults.errorLabel);

        await snapExpect();
    });

    test('WTY10701_21', async ({ page, baseUrl, indexedDBHelper,  snapInput,
        snapExpect,}) => {
        // use TC_20 data
        const testData = loadTestData('TY107/wty10701-fill-data-and-validate', 'wty10701', 'TC_20');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await wty10701Page.navigate();
        await wty10701Page.waitForFormReady();
        await wty10701Page.isHeadingTitleVisible()
        
        await wty10701Page.fillBtenCdInput(testData.form.btenCD_TC_21);
        await snapInput();
        
        await wty10701Page.clickSearchButton();

        const errorLabel = await wty10701Page.getErrorLabel().first();
        expect(errorLabel).toBeVisible();
        const errorLabelText = await errorLabel.textContent();
        expect(errorLabelText).toBe(testData.expectedResults.errorLabel_TC_21);

        await snapExpect();
    });

    test('WTY10701_22', async ({ page, baseUrl, indexedDBHelper,  snapInput,
        snapExpect,}) => {
        // use TC_20 data
        const testData = loadTestData('TY107/wty10701-fill-data-and-validate', 'wty10701', 'TC_20');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await wty10701Page.navigate();
        await wty10701Page.waitForFormReady();
        await wty10701Page.isHeadingTitleVisible()
        
        await wty10701Page.fillBtenCdInput(testData.form.btenCD_TC_22);
        await snapInput();
        
        await wty10701Page.clickSearchButton();

        const errorLabel = await wty10701Page.getErrorLabel().first();
        expect(errorLabel).toBeVisible();
        const errorLabelText = await errorLabel.textContent();
        expect(errorLabelText).toBe(testData.expectedResults.errorLabel_TC_22);

        await snapExpect();
    });

    test('WTY10701_23', async ({ page, baseUrl, indexedDBHelper,  snapInput,
        snapExpect,}) => {
        const testData = loadTestData('TY107/wty10701-fill-data-and-validate', 'wty10701', 'TC_23');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await wty10701Page.navigate();
        await wty10701Page.waitForFormReady();

        await wty10701Page.fillShnCdInput(testData.form.shnCd);
        await snapInput();
        await wty10701Page.blurShnCdInput();
        await page.waitForTimeout(2000);

        const mkKataValue = await wty10701Page.getModelNumberInputValue();
        expect(mkKataValue).toBe(testData.expectedResults.mkKata);
        await snapExpect();
    });

    test('WTY10701_24', async ({ page, baseUrl, indexedDBHelper,  snapInput,
        snapExpect,}) => {
        // use TC_23 data
        const testData = loadTestData('TY107/wty10701-fill-data-and-validate', 'wty10701', 'TC_23');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await wty10701Page.navigate();
        await wty10701Page.waitForFormReady();

        await wty10701Page.fillShnCdInput(testData.form.shnCD_TC_24);
        await snapInput();
        await wty10701Page.blurShnCdInput();
        await page.waitForTimeout(2000);

        const mkKataValue = await wty10701Page.getModelNumberInputValue();
        expect(mkKataValue).toBe(testData.expectedResults.mkKata_TC_24);
        await snapExpect();
    });

    test('WTY10701_25', async ({ page, baseUrl, indexedDBHelper,  snapInput,
        snapExpect,}) => {
        // use TC_23 data
        const testData = loadTestData('TY107/wty10701-fill-data-and-validate', 'wty10701', 'TC_23');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await wty10701Page.navigate();
        await wty10701Page.waitForFormReady();

        await wty10701Page.fillShnCdInput(testData.form.shnCD_TC_25);
        await snapInput();
        await wty10701Page.blurShnCdInput();
        await page.waitForTimeout(2000);

        const mkKataValue = await wty10701Page.getModelNumberInputValue();
        expect(mkKataValue).toBe(testData.expectedResults.mkKata_TC_25);
        await snapExpect();
    });

    test('WTY10701_26', async ({ page, baseUrl, indexedDBHelper,  snapInput,
        snapExpect,}) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await wty10701Page.navigate();
        await wty10701Page.waitForFormReady();
        await snapInput();

        await wty10701Page.clickSearchButton();

        const blankErrorLabels = wty10701Page.getBlankErrorLabel();
        const blankErrorLabelsCount = await blankErrorLabels.count();
        expect(blankErrorLabelsCount).toBe(2);
        for (let i = 0; i < blankErrorLabelsCount; i++) {
            await expect(blankErrorLabels.nth(i)).toBeVisible();
        }

        await snapExpect();
    });

    test('WTY10701_27', async ({ page, baseUrl, indexedDBHelper,  snapInput,
        snapExpect,}) => {
        // use TC_23 data
        const testData = loadTestData('TY107/wty10701-fill-data-and-validate', 'wty10701', 'TC_23');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await wty10701Page.navigate();
        await wty10701Page.waitForFormReady();

        await wty10701Page.fillShnCdInput(testData.form.shnCD_TC_27);
        await snapInput();
        await wty10701Page.blurShnCdInput();
        await page.waitForTimeout(2000);

        const mkKataValue = await wty10701Page.getModelNumberInputValue();
        expect(mkKataValue).toBe(testData.expectedResults.mkKata_TC_27);
        await snapExpect();
    });
});
