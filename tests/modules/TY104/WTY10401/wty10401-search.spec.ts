import { test, expect, loadTestData } from '../../../base/base-test';
import { TY1040Page } from '../../../pages/TY104/wty10401.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';
import { COMMON_MESSAGES, VALIDATION_ERROR_MESSAGES } from '../../../constants/messages';
import { API_ENDPOINTS } from '../../../constants/api-endpoints';

test.describe('WTY10401 - (店別在庫照会)', () => {
    let summaryPage: TY1040Page;

    test.beforeEach(async ({ page, baseUrl }) => {
        summaryPage = new TY1040Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('WTY10401_33', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_04');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.clickMoveDown();
        await page.waitForTimeout(1000);

        await summaryPage.inputDataSearchBasic(testData.formData);

        const apiResponsePromise = page.waitForResponse((res) => {
            return (
                res.request().method() === 'POST' &&
                res.url().includes(API_ENDPOINTS.TY104_WTY10411ZaiInfoGetBC)
            );
        }, { timeout: 15000 });

        await summaryPage.clickSearchButton();

        // Wait for API response to complete
        const apiResponse = await apiResponsePromise;
        expect(apiResponse.status()).toBe(200);
    });

    test('WTY10401_36', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_04');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.fillInputShnCd(testData.formData.shnCd_36);
        await page.waitForTimeout(1000);
        await summaryPage.clickMoveDown();
    
        const apiResponsePromise = page.waitForResponse((res) => {
            return (
                res.request().method() === 'POST' &&
                res.url().includes(API_ENDPOINTS.TY104_WTY10411ZaiInfoGetBC)
            );
        }, { timeout: 15000 });

        await summaryPage.clickSearchButton();
        const shnCdValue = await summaryPage.getValueById('shnCd');
        expect(shnCdValue).toBe( testData.formData.shnCd_36_expected);

        // Wait for API response to complete
        const apiResponse = await apiResponsePromise;
        expect(apiResponse.status()).toBe(200);

    });

    test('WTY10401_37', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_04');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.fillInputShnCd(testData.formData.shnCd_37);
        await page.waitForTimeout(1000);

        await summaryPage.clickMoveDown();
        //await summaryPage.clickSearchButton();
        // await summaryPage.blurInputById('shnCd');

        const apiResponsePromise = page.waitForResponse((res) => {
            return (
                res.request().method() === 'POST' &&
                res.url().includes(API_ENDPOINTS.TY104_WTY10411ZaiInfoGetBC)
            );
        }, { timeout: 15000 });

        await summaryPage.clickSearchButton();
        
        // Wait for API response to complete
        const apiResponse = await apiResponsePromise;
        expect(apiResponse.status()).toBe(200);

    });

    test('WTY10401_38', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_04');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.fillInputShnCd(testData.formData.shnCd_38);
        await page.waitForTimeout(1000);

        await summaryPage.clickMoveDown();
        await summaryPage.clickSearchButton();
        // await summaryPage.blurInputById('shnCd');

        const apiResponsePromise = page.waitForResponse((res) => {
            return (
                res.request().method() === 'POST' &&
                res.url().includes(API_ENDPOINTS.TY104_WTY10411ZaiInfoGetBC)
            );
        }, { timeout: 15000 });

        await summaryPage.clickSearchButton();

        // Wait for API response to complete
        const apiResponse = await apiResponsePromise;
        expect(apiResponse.status()).toBe(200);

    });

    test('WTY10401_39', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_04');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        await summaryPage.clickMoveDown();
        await summaryPage.fillInputShnCd(testData.formData.shnCd_sample);
        await page.waitForTimeout(1000);
        await summaryPage.clickOptionDCSC();
        await page.waitForTimeout(1000);
        await summaryPage.clickSearchButton();
        await page.waitForTimeout(1000);

        const apiResponsePromise = page.waitForResponse((res) => {
            return (
                res.request().method() === 'POST' &&
                res.url().includes(API_ENDPOINTS.TY104_WTY10411ZaiInfoGetBC)
            );
        }, { timeout: 15000 });

        await summaryPage.clickSearchButton();

        // Wait for API response to complete
        const apiResponse = await apiResponsePromise;
        expect(apiResponse.status()).toBe(200);

    });

    test('WTY10401_40', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_04');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });

        await summaryPage.navigate();
        await page.waitForTimeout(1000);
       
        await page.waitForTimeout(1000);

        await summaryPage.clickMoveDown();

        await summaryPage.clickOptionOtherStore();
        await summaryPage.fillInputShnCd(testData.formData.shnCd_sample);

        const apiResponsePromise = page.waitForResponse((res) => {
            return (
                res.request().method() === 'POST' &&
                res.url().includes(API_ENDPOINTS.TY104_WTY10411ZaiInfoGetBC)
            );
        }, { timeout: 15000 });

        await summaryPage.clickSearchButton();

        // Wait for API response to complete
        const apiResponse = await apiResponsePromise;
        expect(apiResponse.status()).toBe(200);

    });

    test('WTY10401_41', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_04');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        await summaryPage.navigate();
        await page.waitForTimeout(1000);

       
        await page.waitForTimeout(1000);

        await summaryPage.clickMoveDown();
        await summaryPage.fillInputShnCd(testData.formData.shnCd_sample);
        await summaryPage.selectComboboxOptionKinki();
       // await summaryPage.clickSearchButton();
        // await summaryPage.blurInputById('shnCd');

        const apiResponsePromise = page.waitForResponse((res) => {
            return (
                res.request().method() === 'POST' &&
                res.url().includes(API_ENDPOINTS.TY104_WTY10411ZaiInfoGetBC)
            );
        }, { timeout: 15000 });

        await summaryPage.clickSearchButton();

        // Wait for API response to complete
        const apiResponse = await apiResponsePromise;
        expect(apiResponse.status()).toBe(200);

    });

    test('WTY10401_42', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_04');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.clickMoveDown();
        await summaryPage.fillInputShnCd(testData.formData.shnCd_sample);
        await page.waitForTimeout(1000);

        await summaryPage.clickOptionOtherStore();
        await page.waitForTimeout(1000);
        
        await summaryPage.selectCbArea();
        await page.waitForTimeout(1000);
        const apiResponsePromise = page.waitForResponse((res) => {
            return (
                res.request().method() === 'POST' &&
                res.url().includes(API_ENDPOINTS.TY104_WTY10411ZaiInfoGetBC)
            );
        }, { timeout: 15000 });

        await summaryPage.clickSearchButton();

        // Wait for API response to complete
        const apiResponse = await apiResponsePromise;
        expect(apiResponse.status()).toBe(200);

    });

    test('WTY10401_43', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_04');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        await summaryPage.navigate();
        await page.waitForTimeout(1000);

        await summaryPage.clickMoveDown();
        await summaryPage.fillInputShnCd(testData.formData.shnCd_sample);
        await page.waitForTimeout(1000);

        await summaryPage.clickOptionOtherStore();
        await page.waitForTimeout(1000);
        
        await summaryPage.selectCbAreaValueEmpty();
        await page.waitForTimeout(1000);
        const apiResponsePromise = page.waitForResponse((res) => {
            return (
                res.request().method() === 'POST' &&
                res.url().includes(API_ENDPOINTS.TY104_WTY10411ZaiInfoGetBC)
            );
        }, { timeout: 15000 });

        await summaryPage.clickSearchButton();

        // Wait for API response to complete
        const apiResponse = await apiResponsePromise;
        expect(apiResponse.status()).toBe(200);

    });

    test('WTY10401_46', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_04');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        
        await summaryPage.clickMoveDown();
        await summaryPage.fillInputShnCd(testData.formData.shnCd_46);
        await page.waitForTimeout(1000);

        const apiResponsePromise = page.waitForResponse((res) => {
            return (
                res.request().method() === 'POST' &&
                res.url().includes(API_ENDPOINTS.TY104_WTY10411ZaiInfoGetBC)
            );
        }, { timeout: 15000 });

        await summaryPage.clickSearchButton();

        const apiResponse = await apiResponsePromise;
        expect(apiResponse.status()).toBe(200);
        await page.waitForTimeout(1000);

        const { rankValue, logisticsValue } = await summaryPage.getRankAndLogisticsValues();

        expect(rankValue).toBe('');
        expect(logisticsValue).toBe('');
    });

    test('WTY10401_48', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_04');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        
        await summaryPage.clickMoveDown();
        await summaryPage.fillInputShnCd(testData.formData.shnCd_48);
        await page.waitForTimeout(1000);

        await summaryPage.clickSearchButton();
        await page.waitForTimeout(1000);
        const mkKataValue = await summaryPage.getMkKataValue();
        expect(mkKataValue).toBe(testData.formData.mkKata_48);
    });

    test('WTY10401_49', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_04');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        
        await summaryPage.clickMoveDown();
        await summaryPage.fillInputShnCd(testData.formData.shnCd_49);
        await page.waitForTimeout(1000);

        await summaryPage.clickSearchButton();
        await page.waitForTimeout(1000);
        
        // Verify all summary table column headers
        const expectedHeaders = {
            rank: 'ﾗﾝｸ',
            logistics: '物流',
            newProducts: '新品',
            display: '展示',
            unpacked: '開梱',
            secured: '確保',
            defective: '不良',
        };
        
        await summaryPage.verifySummaryTableHeaders(expectedHeaders);
    });


    test('WTY10401_50', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_05');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        
        await summaryPage.clickMoveDown();
        await summaryPage.fillInputShnCd(testData.formData.shnCd_5);
        await page.waitForTimeout(1000);

        await summaryPage.clickSearchButton();
        await page.waitForTimeout(1000);
        await summaryPage.verifyTableCell('rank', 'A', 0);

    });

    test('WTY10401_51', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_05');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        
        await summaryPage.clickMoveDown();
        await summaryPage.fillInputShnCd(testData.formData.shnCd_51);
        await page.waitForTimeout(1000);

        await summaryPage.clickSearchButton();
        await page.waitForTimeout(1000);
        await summaryPage.verifyTableCell('newProducts', '16', 0);
        await summaryPage.verifyTableCell('display', '12', 0);
        await summaryPage.verifyTableCell('unpacked', '20', 0);
    });
    
    test('WTY10401_52', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_05');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        
        await summaryPage.clickMoveDown();
        await summaryPage.fillInputShnCd(testData.formData.shnCd_52);
        await page.waitForTimeout(1000);
        await summaryPage.clickOptionActualInventory();
        await page.waitForTimeout(1000);
        await summaryPage.clickSearchButton();
        await page.waitForTimeout(1000);
        await summaryPage.verifyTableCell('secured', '0', 0);
        await summaryPage.verifyTableCell('defective', '0', 0);
    });

    test('WTY10401_53', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_04');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        
        await summaryPage.clickMoveDown();
        await summaryPage.fillInputShnCd(testData.formData.shnCd_53);
        await page.waitForTimeout(1000);

        await summaryPage.clickSearchButton();
        await page.waitForTimeout(2000);
        
        await summaryPage.verifyTableCell('code', '00099', 0);
        await summaryPage.verifyTableCell('name', '広島商品センター', 0);

    });

    test('WTY10401_54', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_04');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        
        await summaryPage.clickMoveDown();
        await summaryPage.fillInputShnCd(testData.formData.shnCd_54);
        await page.waitForTimeout(1000);

        await summaryPage.clickSearchButton();
        await page.waitForTimeout(4000);
        
        await summaryPage.verifyDetailTableCell('newProducts', '30', 0);
        await summaryPage.verifyDetailTableCell('specific', '0', 0);
        await summaryPage.verifyDetailTableCell('display', '40', 0);
        await summaryPage.verifyDetailTableCell('unpacked', '15', 0);

    });

    test('WTY10401_55', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_05');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        
        await summaryPage.clickMoveDown();
        await summaryPage.fillInputShnCd(testData.formData.shnCd_55);
        await page.waitForTimeout(1000);

        await summaryPage.clickSearchButton();
        await page.waitForTimeout(2000);
        await summaryPage.verifyTableCell('logistics', 'F', 0);
    });

    test('WTY10401_56', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_05');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        
        await summaryPage.clickMoveDown();
        await summaryPage.fillInputShnCd(testData.formData.shnCd_standard);
        await summaryPage.clickOptionDCSC();
        await page.waitForTimeout(1000);

        await summaryPage.clickSearchButton();
        await page.waitForTimeout(2000);

        await summaryPage.verifyTableCell('rank', 'B', 0);
        await summaryPage.verifyTableCell('logistics', 'F', 0);
        await summaryPage.verifyTableCell('newProducts', '0', 0);
        await summaryPage.verifyTableCell('display', '0', 0);
        await summaryPage.verifyTableCell('unpacked', '0', 0);
        await summaryPage.verifyTableCell('secured', '0', 0);
        await summaryPage.verifyTableCell('defective', '0', 0);
    });
        
    test('WTY10401_58', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_05');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        
        await summaryPage.clickMoveDown();
        await summaryPage.fillInputShnCd(testData.formData.shnCd_standard);
        await summaryPage.clickOptionDCSC();
        await page.waitForTimeout(1000);

        await summaryPage.clickSearchButton();
        await page.waitForTimeout(1000);

        await summaryPage.verifyEndOfData();

    });

    test('WTY10401_60', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY104/wty10401', 'wty10401', 'TC_05');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });

        await summaryPage.navigate();
        await page.waitForTimeout(1000);
        
        await summaryPage.clickMoveDown();
        await summaryPage.fillInputShnCd(testData.formData.shnCd_standard);
        await page.waitForTimeout(1000);

        await summaryPage.clickSearchButton();
        await page.waitForTimeout(2000);

        await summaryPage.clickRowTable(0);
        //verify manual test sheet No.60
    });
});