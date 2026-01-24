import { test, expect, loadTestData } from '../../../base/base-test';
import { TY10101Page } from '../../../pages/TY101/wty10101.page';
import { CommonHelper, takeScreenshotOnFailure } from '../../../utils/common-helper';

test.describe('WTY10101 - Display rule', () => {
    let productInquiryPage: TY10101Page;

    test.beforeEach(async ({ page }) => {
        productInquiryPage = new TY10101Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    const commonData = CommonHelper.loadTestData('TY101/wty10101-common-data').commonData;

    test('WTY10101_94', async ({ page, baseUrl, indexedDBHelper }, testInfo) => {
        const testData = loadTestData('TY101/wty10101-display-rule', 'wty10101', 'TC_94');

        // Start capturing API responses
        const responseCapture = productInquiryPage.startCapturingApiResponses();

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.searchProduct(testData.searchCode);

        // Stop capturing and attach responses to test report
        responseCapture.stop();
        if (responseCapture.responses.length > 0) {
            await testInfo.attach('api-responses-wty10101-94.json', {
                body: JSON.stringify(responseCapture.responses, null, 2),
                contentType: 'application/json'
            });
        }

        const productImageAccordionButton = await productInquiryPage.getProductImageAccordionButton();
        await expect(productImageAccordionButton).not.toBeVisible();
    });

    test('WTY10101_95', async ({ page, baseUrl, indexedDBHelper }, testInfo) => {
        // use TC_94 data
        const testData = loadTestData('TY101/wty10101-display-rule', 'wty10101', 'TC_94');

        // Start capturing API responses
        const responseCapture = productInquiryPage.startCapturingApiResponses();

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.searchProduct(testData.searchCode);

        // Stop capturing and attach responses to test report
        responseCapture.stop();
        if (responseCapture.responses.length > 0) {
            await testInfo.attach('api-responses-wty10101-95.json', {
                body: JSON.stringify(responseCapture.responses, null, 2),
                contentType: 'application/json'
            });
        }

        const productImageAccordionButton = await productInquiryPage.getProductDescriptionAccordionButton();
        await expect(productImageAccordionButton).not.toBeVisible();
    });

    test('WTY10101_96', async ({ page, baseUrl, indexedDBHelper }, testInfo) => {
        // use TC_94 data
        const testData = loadTestData('TY101/wty10101-display-rule', 'wty10101', 'TC_94');

        // Start capturing API responses
        const responseCapture = productInquiryPage.startCapturingApiResponses();

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.searchProduct(testData.searchCode);

        // Stop capturing and attach responses to test report
        responseCapture.stop();
        if (responseCapture.responses.length > 0) {
            await testInfo.attach('api-responses-wty10101-96.json', {
                body: JSON.stringify(responseCapture.responses, null, 2),
                contentType: 'application/json'
            });
        }

        const productDescriptionAccordionButton = await productInquiryPage.getProductDescriptionAccordionButton();
        await expect(productDescriptionAccordionButton).not.toBeVisible();
    });

    test('WTY10101_97', async ({ page, baseUrl, indexedDBHelper }, testInfo) => {
        // use TC_94 data
        const testData = loadTestData('TY101/wty10101-display-rule', 'wty10101', 'TC_94');

        // Start capturing API responses
        const responseCapture = productInquiryPage.startCapturingApiResponses();

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.searchProduct(testData.searchCode);

        // Stop capturing and attach responses to test report
        responseCapture.stop();
        if (responseCapture.responses.length > 0) {
            await testInfo.attach('api-responses-wty10101-97.json', {
                body: JSON.stringify(responseCapture.responses, null, 2),
                contentType: 'application/json'
            });
        }

        const productColorAccordionButton = await productInquiryPage.getProductColorAccordionButton();
        await expect(productColorAccordionButton).not.toBeVisible();
    });

    test('WTY10101_98', async ({ page, baseUrl, indexedDBHelper }, testInfo) => {
        // use TC_94 data
        const testData = loadTestData('TY101/wty10101-display-rule', 'wty10101', 'TC_94');

        // Start capturing API responses
        const responseCapture = productInquiryPage.startCapturingApiResponses();

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.searchProduct(testData.searchCode);

        // Stop capturing and attach responses to test report
        responseCapture.stop();
        if (responseCapture.responses.length > 0) {
            await testInfo.attach('api-responses-wty10101-98.json', {
                body: JSON.stringify(responseCapture.responses, null, 2),
                contentType: 'application/json'
            });
        }

        const productMakerOptionAccordionButton = await productInquiryPage.getProductMakerAccordionButton();
        await expect(productMakerOptionAccordionButton).not.toBeVisible();
    });

});
