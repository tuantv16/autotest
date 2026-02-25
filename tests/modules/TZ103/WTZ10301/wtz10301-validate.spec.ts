import { expect, loadTestData, test } from '../../../base/base-test';
import { WTZ10301Page } from '../../../pages/TZ103/wtz10301.page';

test.describe('WTZ10301 Search Tests', () => {
    let PageWTZ10301: WTZ10301Page;
    
    test.beforeEach(async ({ page }) => {
        PageWTZ10301 = new WTZ10301Page(page);
    });

    test('WTZ10301_30', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapExpect,
        snapInput
    }) => {
        const dataTest = loadTestData('TZ103/wtz10301', 'wtz10301', 'TC_01');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({
            commonData: dataTest.commonData,
            sessionData: dataTest.sessionData,
        });

        await PageWTZ10301.navigate();

        const searchKeyInput = page.locator(PageWTZ10301.selectors.searchKeyInput);
        await searchKeyInput.fill('');
        await page.waitForTimeout(1000);
        await snapInput();

        const searchBtn = page.locator(PageWTZ10301.selectors.searchButton);
        await searchBtn.click();

        const errorMessage = page.locator('p.text-red-600');
        
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText(PageWTZ10301.messages.requiredField);
        await page.waitForTimeout(800);

        await snapExpect();
    });

    test('WTZ10301_31', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapExpect,
        snapInput
    }) => {
        const dataTest = loadTestData('TZ103/wtz10301', 'wtz10301', 'TC_01');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({
            commonData: dataTest.commonData,
            sessionData: dataTest.sessionData,
        });

        await PageWTZ10301.navigate();

        const searchKeyInput = page.locator(PageWTZ10301.selectors.searchKeyInput);
        await searchKeyInput.fill('デジタルカメラ');
        await page.waitForTimeout(1000);
        await snapInput();

        const searchBtn = page.locator(PageWTZ10301.selectors.searchButton);
        await searchBtn.click();

        const errorMessage = page.locator('p.text-red-600');
        
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText(PageWTZ10301.messages.halfWidthOnly);
        await page.waitForTimeout(800);

        await snapExpect();
    });

    test('WTZ10301_32', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapExpect,
        snapInput
    }) => {
        const dataTest = loadTestData('TZ103/wtz10301', 'wtz10301', 'TC_02');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({
            commonData: dataTest.commonData,
            sessionData: dataTest.sessionData,
        });

        await PageWTZ10301.navigate();

        const searchKeyInput = page.locator(PageWTZ10301.selectors.searchKeyInput);
        await searchKeyInput.fill('12AB');
        await page.waitForTimeout(1000);
        await snapInput();

        const searchBtn = page.locator(PageWTZ10301.selectors.searchButton);
        await searchBtn.click();

        const errorMessage = page.locator('p.text-red-600');
        
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText(PageWTZ10301.messages.numericOnly);
        await page.waitForTimeout(800);

        await snapExpect();
    });

    test('WTZ10301_33', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapExpect,
        snapInput
    }) => {
        const dataTest = loadTestData('TZ103/wtz10301', 'wtz10301', 'TC_02');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({
            commonData: dataTest.commonData,
            sessionData: dataTest.sessionData,
        });

        await PageWTZ10301.navigate();

        const searchKeyInput = page.locator(PageWTZ10301.selectors.searchKeyInput);
        await searchKeyInput.fill('１２３');
        await page.waitForTimeout(1000);
        await snapInput();

        const searchBtn = page.locator(PageWTZ10301.selectors.searchButton);
        await searchBtn.click();

        const errorMessage = page.locator('p.text-red-600');
        
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText(PageWTZ10301.messages.numericOnly);
        await page.waitForTimeout(800);

        await snapExpect();
    });

    test('WTZ10301_34', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapExpect,
        snapInput
    }) => {
        const dataTest = loadTestData('TZ103/wtz10301', 'wtz10301', 'TC_02');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({
            commonData: dataTest.commonData,
            sessionData: dataTest.sessionData,
        });

        await PageWTZ10301.navigate();

        const searchKeyInput = page.locator(PageWTZ10301.selectors.searchKeyInput);
        await searchKeyInput.fill('');
        await page.waitForTimeout(1000);
        await snapInput();

        const searchBtn = page.locator(PageWTZ10301.selectors.searchButton);
        await searchBtn.click();

        const errorMessage = page.locator('p.text-red-600');
        
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText(PageWTZ10301.messages.requiredField);
        await page.waitForTimeout(800);

        await snapExpect();
    });

  
});
