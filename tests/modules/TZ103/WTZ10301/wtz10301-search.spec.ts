import { expect, loadTestData, test } from '../../../base/base-test';
import { WTZ10301Page } from '../../../pages/TZ103/wtz10301.page';

test.describe('WTZ10301 Search Tests', () => {
    let PageWTZ10301: WTZ10301Page;
    
    test.beforeEach(async ({ page }) => {
        PageWTZ10301 = new WTZ10301Page(page);
    });

    test('WTZ10301_12', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapExpect,
        snapInput
    }) => {
        const dataTest = loadTestData('TZ103/wtz10301', 'wtz10301', 'TC_01');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: dataTest.commonData,
            sessionData: dataTest.sessionData,
        });

        await PageWTZ10301.navigate();
        await page.waitForTimeout(1000);

        await PageWTZ10301.verifyClearButtonVisible();
        await page.waitForTimeout(1000);
        await snapInput();

        await PageWTZ10301.verifyClearButtonFunctionality();
        await page.waitForTimeout(1000);
        await snapExpect();

    });

    test('WTZ10301_15', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapExpect,
        snapInput
    }) => {
        const dataTest = loadTestData('TZ103/wtz10301', 'wtz10301', 'TC_03');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: dataTest.commonData,
            sessionData: dataTest.sessionData,
        });

        await PageWTZ10301.navigate();
        await page.waitForTimeout(1000);
        await snapInput();

        await PageWTZ10301.verifyTableColumnHeaders();
        await page.waitForTimeout(1000);
        await snapExpect();

    });

    test('WTZ10301_16', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapExpect,
        snapInput
    }) => {
        const dataTest = loadTestData('TZ103/wtz10301', 'wtz10301', 'TC_03');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: dataTest.commonData,
            sessionData: dataTest.sessionData,
        });

        await PageWTZ10301.navigate();
        await page.waitForTimeout(1000);
        await snapInput();

        await PageWTZ10301.verifyTableColumnHeaders();
        await page.waitForTimeout(1000);
        await snapExpect();

    });

    test('WTZ10301_17', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapExpect,
        snapInput
    }) => {
        const dataTest = loadTestData('TZ103/wtz10301', 'wtz10301', 'TC_03');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: dataTest.commonData,
            sessionData: dataTest.sessionData,
        });

        await PageWTZ10301.navigate();
        await page.waitForTimeout(1000);
        await snapInput();

        // Click radio コード (value="1")
        const radioCode = page.locator(PageWTZ10301.selectors.radioCode);
        await radioCode.click();
        await page.waitForTimeout(1000);

        // Assert コード is checked, カナ is not checked
        const radioKanaInput = page.locator('input[type="radio"][value="0"][name="searchMode"]');
        const radioCodeInput = page.locator('input[type="radio"][value="1"][name="searchMode"]');

        await expect(radioCodeInput).toBeChecked();
        await expect(radioKanaInput).not.toBeChecked();

        // Input 4 digits into search text input
        const searchKeyInput = page.locator(PageWTZ10301.selectors.searchKeyInput);
        await searchKeyInput.fill('1234');
        await expect(searchKeyInput).toHaveValue('1234');
        await page.waitForTimeout(2000);
        await snapExpect();

    });

    test('WTZ10301_18', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapExpect,
        snapInput
    }) => {
        const dataTest = loadTestData('TZ103/wtz10301', 'wtz10301', 'TC_02');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: dataTest.commonData,
            sessionData: dataTest.sessionData,
        });

        await PageWTZ10301.navigate();
        await page.waitForTimeout(1000);
        await snapInput();

        // Click radio カナ (value="0") - switching from default state
        const radioKana = page.locator(PageWTZ10301.selectors.radioKana);
        await radioKana.click();
        await page.waitForTimeout(1000);

        // Assert カナ is checked, コード is not checked
        const radioKanaInput = page.locator('input[type="radio"][value="0"][name="searchMode"]');
        const radioCodeInput = page.locator('input[type="radio"][value="1"][name="searchMode"]');

        await expect(radioKanaInput).toBeChecked();
        await expect(radioCodeInput).not.toBeChecked();

        // Input half-width katakana characters into search text input
        const searchKeyInput = page.locator(PageWTZ10301.selectors.searchKeyInput);
        await searchKeyInput.fill('ｱｱｱ');
        await expect(searchKeyInput).toHaveValue('ｱｱｱ');

        await page.waitForTimeout(1500);
        await snapExpect();
    });

    test('WTZ10301_19', async ({
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
        await page.waitForTimeout(1000);

        const searchKeyInput = page.locator(PageWTZ10301.selectors.searchKeyInput);
        const halfWidthText = 'ﾃｽﾄ'; 
        
        await searchKeyInput.fill(halfWidthText);
        
        await expect(searchKeyInput).toHaveValue(halfWidthText);
        await snapInput();

        const clearBtn = page.locator(PageWTZ10301.selectors.clearButton);
        await clearBtn.click();
        await page.waitForTimeout(500);

        await expect(searchKeyInput).toHaveValue('');
        
        await snapExpect();
    });

  
});
