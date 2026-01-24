import { test, expect, loadTestData } from '../../../base/base-test';
import { TY10101Page } from '../../../pages/TY101/wty10101.page';
import { CommonHelper, takeScreenshotOnFailure } from '../../../utils/common-helper';

test.describe('WTY10101 - Inquiry mode', () => {
    let productInquiryPage: TY10101Page;

    test.beforeEach(async ({ page }) => {
        productInquiryPage = new TY10101Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    const data = CommonHelper.loadTestData('TY101/wty10101-common-data').commonData;
    const commonData = [
        ...data,
        {
            "id": "modeFlg",
            "value":
            {
                "modeFlg": "1"
            }
        }
    ];

    test('WTY10101_93', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY101/wty10101-inquiry', 'wty10101', 'WTY10101_93');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({ commonData: commonData, sessionData: testData.sessionData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await page.waitForTimeout(2000);

        await productInquiryPage.clickProductMakerAccordion();
        await page.waitForTimeout(1000);

        let apiRequestCount = 0;
        let shouldTrack = false;
        const requestListener = (request: any) => {
            if (!shouldTrack) return;
            const url = request.url();
            if (url.includes('/api/')) {
                apiRequestCount++;
            }
        };
        page.on('request', requestListener);
        shouldTrack = true;

        const janLink = productInquiryPage.getProductJanLinkBySection(testData.expectedResults.parentClassName, testData.expectedResults.janCode);
        await expect(janLink).toBeVisible();
        await janLink.click();
        await page.waitForTimeout(1500);

        shouldTrack = false;
        page.off('request', requestListener);

        expect(apiRequestCount).toBe(0);
    });

    test('WTY10101_92', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY101/wty10101-inquiry', 'wty10101', 'WTY10101_92');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({ commonData: commonData, sessionData: testData.sessionData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await page.waitForTimeout(2000);

        await productInquiryPage.clickProductColorAccordion();
        await page.waitForTimeout(1000);

        let apiRequestCount = 0;
        let shouldTrack = false;
        const requestListener = (request: any) => {
            if (!shouldTrack) return;
            const url = request.url();
            if (url.includes('/api/')) {
                apiRequestCount++;
            }
        };
        page.on('request', requestListener);
        shouldTrack = true;
        const janLink = productInquiryPage.getProductJanLinkBySection(testData.expectedResults.parentClassName, testData.expectedResults.janCode);
        await expect(janLink).toBeVisible();
        await janLink.click();
        await page.waitForTimeout(1500);

        shouldTrack = false;
        page.off('request', requestListener);

        expect(apiRequestCount).toBe(0);
    });

    test('WTY10101_91', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY101/wty10101-inquiry', 'wty10101', 'WTY10101_91');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({ commonData: commonData, sessionData: testData.sessionData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await page.waitForTimeout(2000);

        const apiRequestCount = await productInquiryPage.clickSetProductTableRowAndCountApiRequests(testData.expectedResults.filterText);
        expect(apiRequestCount).toBe(0);
    });

});
