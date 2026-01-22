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
        await summaryPage.clickSearchButton();
        // await summaryPage.blurInputById('shnCd');

        const shnCdValue = await summaryPage.getValueById('shnCd');
        expect(shnCdValue).toBe( testData.formData.shnCd_36_expected);

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

       
        await page.waitForTimeout(1000);

        await summaryPage.clickMoveDown();

        await summaryPage.clickOptionDCSC();
        await summaryPage.fillInputShnCd(testData.formData.shnCd_39);

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

    test('WTY10401_40', async ({
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

        await summaryPage.clickOptionOtherStore();
        await summaryPage.fillInputShnCd(testData.formData.shnCd_sample);

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

});