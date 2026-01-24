import { test, expect, loadTestData } from '../../../base/base-test';
import { TY10101Page } from '../../../pages/TY101/wty10101.page';
import { CommonHelper, takeScreenshotOnFailure } from '../../../utils/common-helper';

test.describe('WTY10101 - Screen transition', () => {
    let productInquiryPage: TY10101Page;

    test.beforeEach(async ({ page }) => {
        productInquiryPage = new TY10101Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    const commonData = CommonHelper.loadTestData('TY101/wty10101-common-data').commonData;
    const actionData = CommonHelper.loadTestData('TY101/wty10101-screen-transitsion').wty10101.actionData;

    test('WTY10101_79', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await productInquiryPage.searchProduct(actionData.searchCode);
        await page.waitForTimeout(1500);

        const urlBeforeClick = page.url();
        await productInquiryPage.clickMenuButton();
        await page.waitForTimeout(200);
        const menuItem = page.locator(`ul[role="menu"] li:has-text("${actionData.menuItem.TC_79}")`);
        await menuItem.click();
        await page.waitForTimeout(1000);

        const urlAfterClick = page.url();
        expect(urlAfterClick).not.toBe(urlBeforeClick);
    });

    test('WTY10101_80', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await productInquiryPage.searchProduct(actionData.searchCode);
        await page.waitForTimeout(1500);

        const urlBeforeClick = page.url();
        await productInquiryPage.clickMenuButton();
        await page.waitForTimeout(200);
        const menuItem = page.locator(`ul[role="menu"] li:has-text("${actionData.menuItem.TC_80}")`);
        await menuItem.click();
        await page.waitForTimeout(1000);

        const urlAfterClick = page.url();
        expect(urlAfterClick).not.toBe(urlBeforeClick);
    });

    test('WTY10101_81', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await productInquiryPage.searchProduct(actionData.searchCode);
        await page.waitForTimeout(1500);

        const urlBeforeClick = page.url();
        await productInquiryPage.clickMenuButton();
        await page.waitForTimeout(200);
        const menuItem = page.locator(`ul[role="menu"] li:has-text("${actionData.menuItem.TC_81}")`);
        await menuItem.click();
        await page.waitForTimeout(1000);

        const urlAfterClick = page.url();
        expect(urlAfterClick).not.toBe(urlBeforeClick);
    });

    test('WTY10101_82', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await productInquiryPage.searchProduct(actionData.searchCode);
        await page.waitForTimeout(1500);

        const urlBeforeClick = page.url();
        await productInquiryPage.clickMenuButton();
        await page.waitForTimeout(200);
        const menuItem = page.locator(`ul[role="menu"] li:has-text("${actionData.menuItem.TC_82}")`);
        await menuItem.click();
        await page.waitForTimeout(1000);

        const urlAfterClick = page.url();
        expect(urlAfterClick).not.toBe(urlBeforeClick);
    });
    test('WTY10101_83', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        const testData = loadTestData('TY101/wty10101-screen-transitsion', 'wty10101', 'TC_83');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData, sessionData: testData.sessionData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await page.waitForTimeout(2000);
        const urlBeforeClick = page.url();
        await productInquiryPage.clickMenuButton();
        await page.waitForTimeout(200);
        const menuItem = page.locator(`ul[role="menu"] li:has-text("${actionData.menuItem.TC_83}")`);
        await menuItem.click();
        await page.waitForTimeout(1000);

        const urlAfterClick = page.url();
        expect(urlAfterClick).not.toBe(urlBeforeClick);
    });

    test('WTY10101_84', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await page.waitForTimeout(2000);
        const urlBeforeClick = page.url();

        await productInquiryPage.searchProduct(actionData.searchCode);
        await page.waitForTimeout(1000);

        const colorAccordion = productInquiryPage.getProductColorAccordionButton();
        await expect(colorAccordion).toBeVisible();

        await productInquiryPage.clickMenuButton();
        await page.waitForTimeout(200);
        const menuItem = page.locator(`ul[role="menu"] li:has-text("${actionData.menuItem.TC_84}")`);
        await menuItem.click();
        await page.waitForTimeout(1000);

        const urlAfterClick = page.url();
        expect(urlAfterClick).not.toBe(urlBeforeClick);
    });

    test('WTY10101_85', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await productInquiryPage.searchProduct(actionData.searchCode2);
        await page.waitForTimeout(1500);

        const colorAccordion = productInquiryPage.getProductColorAccordionButton();
        await expect(colorAccordion).not.toBeVisible();

        await productInquiryPage.clickMenuButton();
        await page.waitForTimeout(200);
        const colorVariationMenuItem = page.locator(`ul[role="menu"] li:has-text("カラバリ")`);
        await expect(colorVariationMenuItem).not.toBeVisible();
    });

    test('WTY10101_87', async ({
        page,
        baseUrl,
        indexedDBHelper,
    }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await page.waitForTimeout(1000);
        const urlBeforeClick = page.url();
        await productInquiryPage.clickIconBack();
        await page.waitForTimeout(1000);
        const urlAfterClick = page.url();
        expect(urlAfterClick).not.toBe(urlBeforeClick);
    });
});
