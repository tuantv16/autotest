import { test, expect, loadTestData } from '../../../base/base-test';
import { TY10101Page } from '../../../pages/TY101/wty10101.page';
import { CommonHelper, takeScreenshotOnFailure } from '../../../utils/common-helper';

test.describe('WTY10101 - Show product info', () => {
    let productInquiryPage: TY10101Page;

    test.beforeEach(async ({ page }) => {
        productInquiryPage = new TY10101Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    const commonData = CommonHelper.loadTestData('TY101/wty10101-common-data').commonData;
    const searchCodeDefault = CommonHelper.loadTestData('TY101/wty10101-show-product-info').wty10101.searchCodeList.default;

    test('WTY10101_27', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_27');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.searchProduct(testData.searchCode);
        await page.waitForTimeout(1000);

        const expected = testData.responseData.outDS.shnKhnInfoDT[0];

        expect(await productInquiryPage.getModelNumber()).toContain(expected.mkKata);
        expect(await productInquiryPage.getMakerName()).toContain(expected.rykmkrNmKnj);
        expect(await productInquiryPage.getProductName()).toContain(expected.rykchuNmKnj);
        expect(await productInquiryPage.getClassificationCode()).toBe(`${expected.daiCd}${expected.chuCd}`);

    });

    test('WTY10101_28', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_28');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.searchProduct(testData.searchCode);
        await page.waitForTimeout(1000);

        const expected = testData.responseData.outDS.shnKhnInfoDT[0];

        expect(await productInquiryPage.getRankValue()).toBe(`${expected.shnRnk}${expected.shnRnk2}`);
        expect(await productInquiryPage.getObjectType()).toContain(expected.btrKbn);

        const setValue = await productInquiryPage.getSetType();
        const expectedSetLabel = expected.setKbn === 'S' ? '親' : expected.setKbn === 'K' ? '子' : '';
        expect(setValue).toBe(expectedSetLabel);

    });

    test('WTY10101_29', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_29');
        const expectedDetail = testData.expectedResults.detail;

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.searchProduct(testData.searchCode);
        await page.waitForTimeout(1000);

        const detailButton = page.locator('button:has-text("詳細")').first();
        await detailButton.click();

        expect((await page.inputValue('#tenJchKahiFlg')).trim()).toBe(expectedDetail.storeOrder);
        expect((await page.inputValue('#htbDate')).trim()).toBe(expectedDetail.htbDate);
        expect((await page.inputValue('#thKbn')).trim()).toBe(expectedDetail.thKbn);
        expect((await page.inputValue('#chksKahiFlg')).trim()).toBe(expectedDetail.chksKahiFlg);
        expect((await page.inputValue('#ykbrKahiFlg')).trim()).toBe(expectedDetail.ykbrKahiFlg);
        expect((await page.inputValue('#nykaskGntShnFlg')).trim()).toBe(expectedDetail.nykaskGntShnFlg);
        expect((await page.inputValue('#ktenNm1')).trim()).toBe(expectedDetail.ktenNm1);
        expect((await page.inputValue('#ktenNm2')).trim()).toBe(expectedDetail.ktenNm2);
        expect((await page.inputValue('#ktenNm3')).trim()).toBe(expectedDetail.ktenNm3);

    });

    test('WTY10101_30', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_30');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.searchProduct(testData.searchCode);
        await page.waitForTimeout(1000);

        // Close dialog if shown
        const dialogOk = page.locator('#ty101-error-dialog button:has-text("OK")');
        if (await dialogOk.isVisible({ timeout: 1000 }).catch(() => false)) {
            await dialogOk.click();
        }

        const detailButton = page.locator('button:has-text("詳細")').first();
        await detailButton.click();

        await expect(page.locator('#tenJchKahiFlg')).toBeVisible();
        await expect(page.locator('#htbDate')).toBeVisible();
        await expect(page.locator('#thKbn')).toBeVisible();
        await expect(page.locator('#chksKahiFlg')).toBeVisible();
        await expect(page.locator('#ykbrKahiFlg')).toBeVisible();
        await expect(page.locator('#nykaskGntShnFlg')).toBeVisible();
        await expect(page.locator('#ktenNm1')).toBeVisible();
        await expect(page.locator('#ktenNm2')).toBeVisible();
        await expect(page.locator('#ktenNm3')).toBeVisible();

    });

    test('WTY10101_32', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_32');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.searchProduct(testData.searchCode);
        await page.waitForTimeout(1000);

        const generalLabel = productInquiryPage.getGeneralPriceModeLabel();
        const memberLabel = productInquiryPage.getMemberPriceModeLabel();
        const anshinLabel = productInquiryPage.getAnshinPriceModeLabel();

        await generalLabel.click();

        await expect(generalLabel).toHaveClass(/bg-white/);
        await expect(memberLabel).not.toHaveClass(/bg-white/);
        await expect(anshinLabel).not.toHaveClass(/bg-white/);
    });

    test('WTY10101_33', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_33');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.searchProduct(testData.searchCode);
        await page.waitForTimeout(1000);

        const generalLabel = productInquiryPage.getGeneralPriceModeLabel();
        const memberLabel = productInquiryPage.getMemberPriceModeLabel();
        const anshinLabel = productInquiryPage.getAnshinPriceModeLabel();

        await memberLabel.click();

        await expect(memberLabel).toHaveClass(/bg-white/);
        await expect(generalLabel).not.toHaveClass(/bg-white/);
        await expect(anshinLabel).not.toHaveClass(/bg-white/);
    });

    test('WTY10101_34', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_34');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.searchProduct(testData.searchCode);
        await page.waitForTimeout(1000);

        const generalLabel = productInquiryPage.getGeneralPriceModeLabel();
        const memberLabel = productInquiryPage.getMemberPriceModeLabel();
        const anshinLabel = productInquiryPage.getAnshinPriceModeLabel();

        await anshinLabel.click();

        await expect(anshinLabel).toHaveClass(/bg-white/);
        await expect(generalLabel).not.toHaveClass(/bg-white/);
        await expect(memberLabel).not.toHaveClass(/bg-white/);
    });

    test('WTY10101_35', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_35');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.searchProduct(testData.searchCode);
        await page.waitForTimeout(1000);

        const taxIncludedLabel = productInquiryPage.getTaxIncludedModeLabel();
        const taxExcludedLabel = productInquiryPage.getTaxExcludedModeLabel();

        await taxIncludedLabel.click();

        const activeClassPattern = new RegExp(testData.expectedResults.activeButtonBg);
        await expect(taxIncludedLabel).toHaveClass(activeClassPattern);
        await expect(taxExcludedLabel).not.toHaveClass(activeClassPattern);

        const row1PriceCell = productInquiryPage.getPriceRowValueCell(1);
        const row2PriceCell = productInquiryPage.getPriceRowValueCell(2);
        const row3PriceCell = productInquiryPage.getPriceRowValueCell(3);

        await expect(row1PriceCell).toHaveText(testData.expectedResults.priceTable.row1.price);
        await expect(row2PriceCell).toHaveText(testData.expectedResults.priceTable.row2.price);
        await expect(row3PriceCell).toHaveText(testData.expectedResults.priceTable.row3.price);
    });

    test('WTY10101_36', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_36');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.searchProduct(testData.searchCode);
        await page.waitForTimeout(1000);

        const taxIncludedLabel = productInquiryPage.getTaxIncludedModeLabel();
        const taxExcludedLabel = productInquiryPage.getTaxExcludedModeLabel();

        await taxExcludedLabel.click();

        const activeClassPattern = new RegExp(testData.expectedResults.activeButtonBg);
        await expect(taxExcludedLabel).toHaveClass(activeClassPattern);
        await expect(taxIncludedLabel).not.toHaveClass(activeClassPattern);

        const row1PriceCell = productInquiryPage.getPriceRowValueCell(1);
        const row2PriceCell = productInquiryPage.getPriceRowValueCell(2);
        const row3PriceCell = productInquiryPage.getPriceRowValueCell(3);

        await expect(row1PriceCell).toHaveText(testData.expectedResults.priceTable.row1.price);
        await expect(row2PriceCell).toHaveText(testData.expectedResults.priceTable.row2.price);
        await expect(row3PriceCell).toHaveText(testData.expectedResults.priceTable.row3.price);
    });

    test('WTY10101_37', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_37');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.searchProduct(testData.searchCode);
        await page.waitForTimeout(1000);

        const normalPointLabel = productInquiryPage.getNormalPointModeLabel();
        const limitedPointLabel = productInquiryPage.getLimitedPointModeLabel();

        await normalPointLabel.click();
        await page.waitForTimeout(500);

        const activeClassPattern = new RegExp(testData.expectedResults.activeButtonBg);
        await expect(normalPointLabel).toHaveClass(activeClassPattern);
        await expect(limitedPointLabel).not.toHaveClass(activeClassPattern);

        const row1Rate = productInquiryPage.getNormalPointRateCell(1);
        const row1Amount = productInquiryPage.getNormalPointAmountCell(1);
        const row2Rate = productInquiryPage.getNormalPointRateCell(2);
        const row2Amount = productInquiryPage.getNormalPointAmountCell(2);
        const row3Rate = productInquiryPage.getNormalPointRateCell(3);
        const row3Amount = productInquiryPage.getNormalPointAmountCell(3);

        await expect(row1Rate).toHaveText(testData.expectedResults.pointTable.row1.rate);
        await expect(row1Amount).toHaveText(testData.expectedResults.pointTable.row1.amount);
        await expect(row2Rate).toHaveText(testData.expectedResults.pointTable.row2.rate);
        await expect(row2Amount).toHaveText(testData.expectedResults.pointTable.row2.amount);
        await expect(row3Rate).toHaveText(testData.expectedResults.pointTable.row3.rate);
        await expect(row3Amount).toHaveText(testData.expectedResults.pointTable.row3.amount);
    });

    test('WTY10101_38', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_38');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.searchProduct(testData.searchCode);
        await page.waitForTimeout(1000);

        const normalPointLabel = productInquiryPage.getNormalPointModeLabel();
        const limitedPointLabel = productInquiryPage.getLimitedPointModeLabel();

        await limitedPointLabel.click();
        await page.waitForTimeout(500);

        const activeClassPattern = new RegExp(testData.expectedResults.activeButtonBg);
        await expect(limitedPointLabel).toHaveClass(activeClassPattern);
        await expect(normalPointLabel).not.toHaveClass(activeClassPattern);

        const row1Rate = productInquiryPage.getLimitedPointRateCell(1);
        const row1Amount = productInquiryPage.getLimitedPointAmountCell(1);
        const row2Rate = productInquiryPage.getLimitedPointRateCell(2);
        const row2Amount = productInquiryPage.getLimitedPointAmountCell(2);
        const row3Rate = productInquiryPage.getLimitedPointRateCell(3);
        const row3Amount = productInquiryPage.getLimitedPointAmountCell(3);

        await expect(row1Rate).toHaveText(testData.expectedResults.pointTable.row1.rate);
        await expect(row1Amount).toHaveText(testData.expectedResults.pointTable.row1.amount);
        await expect(row2Rate).toHaveText(testData.expectedResults.pointTable.row2.rate);
        await expect(row2Amount).toHaveText(testData.expectedResults.pointTable.row2.amount);
        await expect(row3Rate).toHaveText(testData.expectedResults.pointTable.row3.rate);
        await expect(row3Amount).toHaveText(testData.expectedResults.pointTable.row3.amount);
    });

    test('WTY10101_39', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_39');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);
        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await productInquiryPage.searchProduct(testData.searchCode);
        await page.waitForTimeout(1000);

        const dmToggleButton = productInquiryPage.getDmDisplayToggleButton();
        await dmToggleButton.click();
        await page.waitForTimeout(500);

        const row2 = productInquiryPage.getPriceRow(2);
        const row3 = productInquiryPage.getPriceRow(3);

        await expect(row2).toBeVisible();
        await expect(row3).toBeVisible();
    });

    test('WTY10101_40', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_40');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);
        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.searchProduct(testData.searchCode);
        await page.waitForTimeout(1500);

        const stockGrid = productInquiryPage.getStockGrid();
        await expect(stockGrid).toBeVisible();

        const stockRows = await productInquiryPage.getStockRows().count();
        expect(stockRows).toBeGreaterThan(0);
    });

    test('WTY10101_41', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_41');
        const expectedWarranty = testData.expectedResults.warranty;

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);
        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.searchProduct(testData.searchCode);
        await page.waitForTimeout(1500);

        const makerWarranty = await productInquiryPage.getMakerWarrantyValue();
        const anshinWarranty = await productInquiryPage.getAnshinWarrantyValue();
        const extendedWarranty = await productInquiryPage.getExtendedWarrantyValue();
        const warrantyRateLabel = productInquiryPage.getLabelByFor('guarantee');

        expect(makerWarranty.trim()).toBe(expectedWarranty.makerWarranty);
        expect(anshinWarranty.trim()).toBe(expectedWarranty.anshin);
        expect(extendedWarranty.trim()).toBe(expectedWarranty.extendedWarranty);
        expect(await warrantyRateLabel.textContent()).toBe(expectedWarranty.guaranteeRateLabel);
    });

    test('WTY10101_42', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_42');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.searchProduct(searchCodeDefault);
        await page.waitForTimeout(1500);

        const warrantyRateLabel = productInquiryPage.getLabelByFor('guarantee');
        const warrantyRate = productInquiryPage.getGuaranteeRateValue();
        expect(await warrantyRateLabel.textContent()).toBe(testData.expectedResults.warranty.guaranteeRateLabel);
        expect(await warrantyRate).toBe(testData.expectedResults.warranty.guaranteeRate);
    });

    test('WTY10101_43', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_43');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await page.waitForTimeout(200);
        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.searchProduct(testData.searchCode);
        await page.waitForTimeout(1500);

        const warrantyLabel = productInquiryPage.getLabelByFor('guarantee');
        const warrantyFee = productInquiryPage.getGuaranteeRateValue();
        expect(await warrantyLabel.textContent()).toBe(testData.expectedResults.warranty.guaranteeAmountLabel);
        expect(await warrantyFee).toBe(testData.expectedResults.warranty.guaranteeAmount);
    });

    test('WTY10101_44', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_44');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.searchProduct(searchCodeDefault);

        const supplierName = await productInquiryPage.getSupplierNameValue();
        const supplierCode = await productInquiryPage.getSupplierCodeValue();
        expect(supplierName).toBe(testData.expectedResults.shiirerykKnj);
        expect(supplierCode).toBe(testData.expectedResults.shiireCd);
    });
    test('WTY10101_45', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_45');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await page.waitForTimeout(200);
        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await productInquiryPage.searchProduct(testData.searchCode);

        const isSetProductTableVisible = await productInquiryPage.isSetProductTableVisible();
        expect(isSetProductTableVisible).toBe(true);

        const apiRequestCount = await productInquiryPage.clickSetProductTableRowAndCountApiRequests(testData.expectedResults.filterText);
        await page.waitForTimeout(1000);
        expect(apiRequestCount).toBe(1);
    });

    test('WTY10101_46', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_46');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await productInquiryPage.searchProduct(testData.searchCode);

        const isSetProductTableVisible = await productInquiryPage.isSetProductTableVisible();
        expect(isSetProductTableVisible).toBe(true);

        const apiRequestCount = await productInquiryPage.clickSetProductTableRowAndCountApiRequests(testData.expectedResults.filterText);
        await page.waitForTimeout(1000);
        expect(apiRequestCount).toBe(1);
    });
});
