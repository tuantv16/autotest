import { expect, loadTestData, test } from '../../../base/base-test';
import { WTZ10401Page } from '../../../pages/TZ104/wtz10401.page';

test.describe('WTZ10401 Search Tests', () => {
    let PageWTZ10401: WTZ10401Page;
    
    test.beforeEach(async ({ page }) => {
        PageWTZ10401 = new WTZ10401Page(page);
    });

    test('WTZ10401_21', async ({
        page,
        snapExpect,
    }) => {
        await PageWTZ10401.navigate();
        
        await page.locator('label:has(span:text("コード"))').click();
        await page.waitForTimeout(1000);

        await snapExpect();
        expect(await PageWTZ10401.isInputMaxLength('input[name="searchKey"]', 6)).toBe(true);
        await page.waitForTimeout(1000);
        expect(page.locator('input[name="searchKey"]')).toBeFocused();
    });

    test('WTZ10401_22', async ({
        page,
        baseUrl, 
        indexedDBHelper,
        snapExpect,
    }) => {
        const dataTest = loadTestData('TZ104/wtz10401', 'wtz10401', 'TC_02');
        
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: dataTest.commonData,
            sessionData: dataTest.sessionData,
        });

        await PageWTZ10401.navigate();
        
        await page.locator('label:has(span:text("カナ"))').click();
        await page.waitForTimeout(1000);

        expect(await PageWTZ10401.isInputMaxLength('input[name="searchKey"]', 15)).toBe(true);
        await snapExpect();
    });

    test('WTZ10401_23', async ({
        page,
        snapInput,
        snapExpect,
    }) => {
        await PageWTZ10401.navigate();
        
        await page.locator('input[name="searchKey"]').fill('12345');
        await snapInput();

        await PageWTZ10401.clickClearByInput('#searchKey');
        const searchKey = await page.locator('input[name="searchKey"]').inputValue();
        expect(searchKey).toBe('');
        await snapExpect();
    });

    test('WTZ10401_24', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const dataTest = loadTestData('TZ104/wtz10401', 'wtz10401', 'TC_01');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: dataTest.commonData,
        });

        await PageWTZ10401.navigate();

        await page.locator('label:has(span:text("コード"))').click();
        await page.waitForTimeout(1000);
        
        await page.locator('input[name="searchKey"]').fill('99999');
        await snapInput();

        await page.locator(PageWTZ10401.selectors.searchButton).click();
        await page.waitForTimeout(2000);

        await expect(
            page.locator(PageWTZ10401.selectors.errorDialog)
        ).toContainText("該当データが存在しません。");
        await snapExpect();
    });
});