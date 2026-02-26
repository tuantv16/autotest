import { expect, loadTestData, test } from '../../../base/base-test';
import { WTZ10301Page } from '../../../pages/TZ103/wtz10301.page';

test.describe('WTZ10301 Initialzation Tests', () => {
    let PageWTZ10301: WTZ10301Page;
    
    test.beforeEach(async ({ page }) => {
        PageWTZ10301 = new WTZ10301Page(page);
    });

    test('WTZ10301_06', async ({ 
        snapExpect,
    }) => {
        const expectedTitle = '中分類検索';

        await PageWTZ10301.navigate();
        
        const titleFound = await PageWTZ10301.waitForTextInBody(expectedTitle, 5000);

        expect(titleFound).toBe(true);
        await snapExpect();
    });

    test('WTZ10301_08', async ({
        page,
        baseUrl,
        snapExpect,
        snapInput
    }) => {
        await PageWTZ10301.navigate();
        await page.waitForTimeout(1000);
        
        const confirmButton = await PageWTZ10301.findConfirmedButton();
        expect(await confirmButton.isVisible()).toBe(true);
        await PageWTZ10301.clickConfirmButton();
        await snapExpect();
    });

    test('WTZ10301_09', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapExpect,
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

        await PageWTZ10301.verifyRadioAndTextboxInitialState();

        await snapExpect();

    });

    test('WTZ10301_10', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapExpect,
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
        await PageWTZ10301.verifyRadioCodeSelectedState();

        await snapExpect();
    });

    test('WTZ10301_11', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapExpect,
    }) => {
        const dataTest = loadTestData('TZ103/wtz10301', 'wtz10301', 'TC_03');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: dataTest.commonData,
        });

        await PageWTZ10301.navigate();
        await page.waitForTimeout(1000);

        await PageWTZ10301.verifyRadioAndTextboxInitialState();

        await snapExpect();
    });

    
});
