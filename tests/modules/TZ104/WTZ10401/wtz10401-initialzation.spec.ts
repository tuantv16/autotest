import { expect, loadTestData, test } from '../../../base/base-test';
import { WTZ10401Page } from '../../../pages/TZ104/wtz10401.page';

test.describe('WTZ10401 Initialzation Tests', () => {
    let PageWTZ10401: WTZ10401Page;
    
    test.beforeEach(async ({ page }) => {
        PageWTZ10401 = new WTZ10401Page(page);
    });

    test('WTZ10401_06', async ({ 
        snapExpect,
    }) => {
        const expectedTitle = '小分類検索';

        await PageWTZ10401.navigate();
        
        const titleFound = await PageWTZ10401.waitForTextInBody(expectedTitle, 5000);

        expect(titleFound).toBe(true);
        await snapExpect();
    });

    test('WTZ10401_07', async ({
        snapExpect,
     }) => {
        await PageWTZ10401.navigate();

        const isBackButtonVisible = await PageWTZ10401.isBackButtonVisible();
        expect(isBackButtonVisible).toBe(true);

        await snapExpect();
    });

    test('WTZ10401_08', async ({
        snapExpect,
    }) => {
        await PageWTZ10401.navigate();
        
        const confirmButton = await PageWTZ10401.findConfirmedButton();
        expect(await confirmButton.isVisible()).toBe(true);
        await snapExpect();
    });

    test('WTZ10401_09', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapExpect,
    }) => {
        const dataTest = loadTestData('TZ104/wtz10401', 'wtz10401', 'TC_01');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: dataTest.commonData,
            sessionData: dataTest.sessionData,
        });

        await PageWTZ10401.navigate();
        await page.waitForTimeout(2000); 

        expect(await PageWTZ10401.isRadioChecked('searchKbn', 'コード')).toBe(false);
        expect(await PageWTZ10401.isRadioChecked('searchKbn', 'カナ')).toBe(true);
        expect(await PageWTZ10401.isInputMaxLength('input[name="searchKey"]', 15)).toBe(true);
        await snapExpect();
    });

    test('WTZ10401_10', async ({
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

        expect(await PageWTZ10401.isRadioChecked('searchKbn', 'コード')).toBe(true);
        expect(await PageWTZ10401.isRadioChecked('searchKbn', 'カナ')).toBe(false);
        expect(await PageWTZ10401.isInputMaxLength('input[name="searchKey"]', 6)).toBe(true);
        await snapExpect();
    });

    test('WTZ10401_11', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapExpect,
    }) => {
        const dataTest = loadTestData('TZ104/wtz10401', 'wtz10401', 'TC_01');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: dataTest.commonData,
        });

        await PageWTZ10401.navigate();

        expect(await PageWTZ10401.isRadioChecked('searchKbn', 'カナ')).toBe(true);
        expect(await PageWTZ10401.isRadioChecked('searchKbn', 'コード')).toBe(false);
        expect(await PageWTZ10401.isInputMaxLength('input[name="searchKey"]', 15)).toBe(true);
        await snapExpect();
    });

    test('WTZ10401_12', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapExpect,
    }) => {
        const dataTest = loadTestData('TZ104/wtz10401', 'wtz10401', 'TC_01');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: dataTest.commonData,
            sessionData: dataTest.sessionData,
        });

        await PageWTZ10401.navigate();

        expect(await PageWTZ10401.isRadioChecked('searchKbn', 'カナ')).toBe(true);
        const searchKey = await page.locator('input[name="searchKey"]').inputValue();
        expect(searchKey).toBe('ア');
        
        const hasData = await PageWTZ10401.hasAgGridData('div[role="presentation"]');
        expect(hasData).toBe(true);
        await snapExpect();
    });

    test('WTZ10401_13', async ({
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

        expect(await PageWTZ10401.isRadioChecked('searchKbn', 'コード')).toBe(true);
        const searchKey = await page.locator('input[name="searchKey"]').inputValue();
        expect(searchKey).toBe('01020');
        
        const hasData = await PageWTZ10401.hasAgGridData('div[role="presentation"]');
        expect(hasData).toBe(true);
        await snapExpect();
    }); 

    test('WTZ10401_14', async ({
        page,
        snapExpect,
    }) => {
        await PageWTZ10401.navigate();

        expect(await PageWTZ10401.isRadioChecked('searchKbn', 'カナ')).toBe(true);
        const searchKey = await page.locator('input[name="searchKey"]').inputValue();
        expect(searchKey).toBe('');
        
        const hasData = await PageWTZ10401.hasAgGridData('div[role="presentation"]');
        expect(hasData).toBe(false);
        await snapExpect();
    });
});
