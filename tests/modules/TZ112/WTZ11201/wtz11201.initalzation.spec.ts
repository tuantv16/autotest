import { expect, loadTestData, test } from '../../../base/base-test';
import { WTZ11201Page } from "../../../pages/tz112/wtz11201.page";

const MENU_LABELS = {
    POTENTIAL_CUSTOMER: '見込み客',
    PURCHASE_HISTORY: '購入履歴',
    NOT_REGISTERED: '未登録',
    VIP: '上様',
    SALE_REQUEST: '依頼売上',
};

test.describe('WTZ11201 Initialzation Tests', () => {
    let PageWTZ11201: WTZ11201Page;
    
    test.beforeEach(async ({ page }) => {
        PageWTZ11201 = new WTZ11201Page(page);
    });

    test('WTZ11201_06', async ({ 
        page,
        snapExpect,
    }) => {
        await PageWTZ11201.navigate();
        
        const telNoValue = await page.locator(PageWTZ11201.selectors.telNoInput).inputValue();
        expect(telNoValue).toBe('');

        const kokNameKanaValue = await page.locator(PageWTZ11201.selectors.kokNameKanaInput).inputValue();
        expect(kokNameKanaValue).toBe('');
        
        const kokCdValue = await page.locator(PageWTZ11201.selectors.kokCdInput).inputValue();
        expect(kokCdValue).toBe('');    

        const kanNoValue = await page.locator(PageWTZ11201.selectors.kanNoInput).inputValue();
        expect(kanNoValue).toBe('');

        await snapExpect();
    });

    // Test Mobile
    test('WTZ11201_07', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapExpect,
    }) => {
        test.skip(process.env.SNAP_DEVICE !== 'mobile', 'Mobile only test');
        const dataTest = loadTestData('TZ112/wtz11201', 'wtz11201', 'TC_01');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: dataTest.commonData,
            sessionData: dataTest.sessionData,
        });

        await PageWTZ11201.navigate();

        await PageWTZ11201.clickIconMenu();
        await page.waitForTimeout(1000);
        
        const isPotentialCustimersMenu = await PageWTZ11201.isMenuIconVisible(MENU_LABELS.POTENTIAL_CUSTOMER);
        const isPurchaseHistoryMenu = await PageWTZ11201.isMenuIconVisible(MENU_LABELS.PURCHASE_HISTORY);
        
        expect(isPotentialCustimersMenu).toBe(true);
        expect(isPurchaseHistoryMenu).toBe(true);
        await snapExpect();
    });

    // Test Tablet
    test('WTZ11201_08', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapExpect,
    }) => {
        test.skip(process.env.SNAP_DEVICE === 'mobile', 'Tablet only test');
        const dataTest = loadTestData('TZ112/wtz11201', 'wtz11201', 'TC_01');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: dataTest.commonData,
            sessionData: dataTest.sessionData,
        });

        await PageWTZ11201.navigate();

        const isPotentialCustimerButtonVisible = await PageWTZ11201.isPotentialCustimerButtonVisible();
        expect(isPotentialCustimerButtonVisible).toBe(true);

        const isPurchaseHistoryButtonVisible = await PageWTZ11201.isPurchaseHistoryButtonVisible();
        expect(isPurchaseHistoryButtonVisible).toBe(true);

        const isClearButtonVisible = await PageWTZ11201.isClearButtonVisible();
        expect(isClearButtonVisible).toBe(true);

        const isSearchButtonVisible = await PageWTZ11201.isSearchButtonVisible();
        expect(isSearchButtonVisible).toBe(true);

        await snapExpect();
    });

    // Test Mobile
    test('WTZ11201_09', async ({ 
        page,
        baseUrl,
        indexedDBHelper,
        snapExpect,
    }) => {
        test.skip(process.env.SNAP_DEVICE !== 'mobile', 'Mobile only test');
        const dataTest = loadTestData('TZ112/wtz11201', 'wtz11201', 'TC_02');
        const dataTestMobile = loadTestData('TZ112/wtz11201', 'wtz11201', 'TC_07');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: dataTestMobile.commonData,
            sessionData: dataTest.sessionData,
        });

        await PageWTZ11201.navigateWTY20101();

        await page.locator(PageWTZ11201.selectors.showModalButton).click();
        await page.waitForTimeout(2000);

        await PageWTZ11201.clickBottomLeftButtonByPosition();
        await page.waitForTimeout(1000);
        
        const isNotRegisteredMenu = await PageWTZ11201.isButtonWithTextExists(MENU_LABELS.NOT_REGISTERED);
        const isPotentialCustimerMenu = await PageWTZ11201.isButtonWithTextExists(MENU_LABELS.POTENTIAL_CUSTOMER);
        const isSaleRequestMenu = await PageWTZ11201.isButtonWithTextExists(MENU_LABELS.SALE_REQUEST);
        
        expect(isNotRegisteredMenu).toBe(true);
        expect(isPotentialCustimerMenu).toBe(true);
        expect(isSaleRequestMenu).toBe(true);
        await snapExpect();
    });

    // Test Tablet
    test('WTZ11201_10', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapExpect,
    }) => {
        test.skip(process.env.SNAP_DEVICE === 'mobile', 'Tablet only test');
        const dataTest = loadTestData('TZ112/wtz11201', 'wtz11201', 'TC_02');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: dataTest.commonData,
            sessionData: dataTest.sessionData,
        });

        await PageWTZ11201.navigateWTY20101();

        await page.locator(PageWTZ11201.selectors.showModalButton).click();
        await page.waitForTimeout(1000);

        const isNotRegisteredButtonVisible = await PageWTZ11201.isNotRegisteredButtonVisible();
        expect(isNotRegisteredButtonVisible).toBe(true);

        const isVipButtonVisible = await PageWTZ11201.isVipButtonVisible();
        expect(isVipButtonVisible).toBe(true);

        const isSaleRequestButtonVisible = await PageWTZ11201.isSaleRequestButtonVisible();
        expect(isSaleRequestButtonVisible).toBe(true);

        const isNotRegisteredVisible = await PageWTZ11201.isNotRegisteredButtonVisible();
        expect(isNotRegisteredVisible).toBe(true);

        const isPurchaseHistoryButtonVisible = await PageWTZ11201.isPurchaseHistoryButtonVisible();
        expect(isPurchaseHistoryButtonVisible).toBe(true);

        const isClearButtonVisible = await PageWTZ11201.isClearButtonVisible();
        expect(isClearButtonVisible).toBe(true);

        const isSearchButtonVisible = await PageWTZ11201.isSearchButtonVisible();
        expect(isSearchButtonVisible).toBe(true);
        await snapExpect();
    });

    // Test Mobile
    test('WTZ11201_11', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapExpect,
    }) => {
        test.skip(process.env.SNAP_DEVICE !== 'mobile', 'Mobile only test');
        const dataTest = loadTestData('TZ112/wtz11201', 'wtz11201', 'TC_03');
        const dataTestMobile = loadTestData('TZ112/wtz11201', 'wtz11201', 'TC_07');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: dataTestMobile.commonData,
            sessionData: dataTest.sessionData,
        });

         await PageWTZ11201.navigateWTY20101();

        await page.locator(PageWTZ11201.selectors.showModalButton).click();
        await page.waitForTimeout(2000);

        await PageWTZ11201.clickBottomLeftButtonByPosition();
        await page.waitForTimeout(1000);

        const isPotentialCustimersMenu = await PageWTZ11201.isButtonWithTextExists(MENU_LABELS.POTENTIAL_CUSTOMER);
        expect(isPotentialCustimersMenu).toBe(true);
        
        const isPurchaseHistoryMenu = await PageWTZ11201.isButtonWithTextExists(MENU_LABELS.PURCHASE_HISTORY);
        expect(isPurchaseHistoryMenu).toBe(true);
        await snapExpect();
    }); 

    // Test Tablet
    test('WTZ11201_12', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapExpect,
    }) => {
        test.skip(process.env.SNAP_DEVICE === 'mobile', 'Tablet only test');
        const dataTest = loadTestData('TZ112/wtz11201', 'wtz11201', 'TC_03');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: dataTest.commonData,
            sessionData: dataTest.sessionData,
        });

        await PageWTZ11201.navigate();

        const isPotentialCustimerButtonVisible = await PageWTZ11201.isPotentialCustimerButtonVisible();
        expect(isPotentialCustimerButtonVisible).toBe(true);

        const isPurchaseHistoryButtonVisible = await PageWTZ11201.isPurchaseHistoryButtonVisible();
        expect(isPurchaseHistoryButtonVisible).toBe(true);

        const isClearButtonVisible = await PageWTZ11201.isClearButtonVisible();
        expect(isClearButtonVisible).toBe(true);

        const isSearchButtonVisible = await PageWTZ11201.isSearchButtonVisible();
        expect(isSearchButtonVisible).toBe(true);

        await snapExpect(); 
    });

    // Test Mobile
    test('WTZ11201_13', async ({ 
        page,
        baseUrl,
        indexedDBHelper,
        snapExpect,
    }) => {
        test.skip(process.env.SNAP_DEVICE !== 'mobile', 'Mobile only test');
        const dataTest = loadTestData('TZ112/wtz11201', 'wtz11201', 'TC_04');
        const dataTestMobile = loadTestData('TZ112/wtz11201', 'wtz11201', 'TC_07');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: dataTestMobile.commonData,
            sessionData: dataTest.sessionData,
        });

         await PageWTZ11201.navigateWTY20101();

        await page.locator(PageWTZ11201.selectors.showModalButton).click();
        await page.waitForTimeout(2000);

        await PageWTZ11201.clickBottomLeftButtonByPosition();
        await page.waitForTimeout(1000);
        
        const isPotentialCustimerMenu = await PageWTZ11201.isButtonWithTextExists(MENU_LABELS.POTENTIAL_CUSTOMER);
        const isVipMenu = await PageWTZ11201.isButtonWithTextExists(MENU_LABELS.VIP);
        const isSaleRequestMenu = await PageWTZ11201.isButtonWithTextExists(MENU_LABELS.SALE_REQUEST);
        const isPurchaseHistoryMenu = await PageWTZ11201.isButtonWithTextExists(MENU_LABELS.PURCHASE_HISTORY);
        
        expect(isPotentialCustimerMenu).toBe(true);
        expect(isPurchaseHistoryMenu).toBe(true);
        expect(isSaleRequestMenu).toBe(true);
        expect(isVipMenu).toBe(true);
        await snapExpect();
    }); 

    // Test Tablet
    test('WTZ11201_14', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapExpect,
    }) => {
        test.skip(process.env.SNAP_DEVICE === 'mobile', 'Tablet only test');
        const dataTest = loadTestData('TZ112/wtz11201', 'wtz11201', 'TC_04');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: dataTest.commonData,
            sessionData: dataTest.sessionData,
        });

        await PageWTZ11201.navigateWTY20101();

        await page.locator(PageWTZ11201.selectors.showModalButton).click();
        await page.waitForTimeout(1000);

        await snapExpect();

        const isVipButtonVisible = await PageWTZ11201.isVipButtonVisible();
        expect(isVipButtonVisible).toBe(true);

        const isSaleRequestButtonVisible = await PageWTZ11201.isSaleRequestButtonVisible();
        expect(isSaleRequestButtonVisible).toBe(true);

        const isPurchaseHistoryButtonVisible = await PageWTZ11201.isPurchaseHistoryButtonVisible();
        expect(isPurchaseHistoryButtonVisible).toBe(true);

        const isClearButtonVisible = await PageWTZ11201.isClearButtonVisible();
        expect(isClearButtonVisible).toBe(true);

        const isSearchButtonVisible = await PageWTZ11201.isSearchButtonVisible();
        expect(isSearchButtonVisible).toBe(true);
    });

    // Test Mobile
    test('WTZ11201_15', async ({ 
        page,
        baseUrl,
        indexedDBHelper,
        snapExpect,
    }) => {
        test.skip(process.env.SNAP_DEVICE !== 'mobile', 'Mobile only test');
        const dataTest = loadTestData('TZ112/wtz11201', 'wtz11201', 'TC_05');
        const dataTestMobile = loadTestData('TZ112/wtz11201', 'wtz11201', 'TC_07');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: dataTestMobile.commonData,
            sessionData: dataTest.sessionData,
        });

         await PageWTZ11201.navigateWTY20101();

        await page.locator(PageWTZ11201.selectors.showModalButton).click();
        await page.waitForTimeout(2000);

        await PageWTZ11201.clickBottomLeftButtonByPosition();
        await page.waitForTimeout(1000);

        const isPurchaseHistoryMenu = await PageWTZ11201.isButtonWithTextExists(MENU_LABELS.PURCHASE_HISTORY);
        expect(isPurchaseHistoryMenu).toBe(true);

        await snapExpect();
    });

    // Test Tablet
    test('WTZ11201_16', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapExpect,
    }) => {
        test.skip(process.env.SNAP_DEVICE === 'mobile', 'Tablet only test');
        const dataTest = loadTestData('TZ112/wtz11201', 'wtz11201', 'TC_05');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: dataTest.commonData,
            sessionData: dataTest.sessionData,
        });

        await PageWTZ11201.navigate();

        const isPurchaseHistoryButtonVisible = await PageWTZ11201.isPurchaseHistoryButtonVisible();
        expect(isPurchaseHistoryButtonVisible).toBe(true);

        const isClearButtonVisible = await PageWTZ11201.isClearButtonVisible();
        expect(isClearButtonVisible).toBe(true);

        const isSearchButtonVisible = await PageWTZ11201.isSearchButtonVisible();
        expect(isSearchButtonVisible).toBe(true);

        await snapExpect();
    });

    // Test Mobile
    test('WTZ11201_17', async ({ 
        page,
        baseUrl,
        indexedDBHelper,
        snapExpect,
    }) => {
        test.skip(process.env.SNAP_DEVICE !== 'mobile', 'Mobile only test');
        const dataTest = loadTestData('TZ112/wtz11201', 'wtz11201', 'TC_06');
        const dataTestMobile = loadTestData('TZ112/wtz11201', 'wtz11201', 'TC_07');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: dataTestMobile.commonData,
            sessionData: dataTest.sessionData,
        });

         await PageWTZ11201.navigateWTY20101();

        await page.locator(PageWTZ11201.selectors.showModalButton).click();
        await page.waitForTimeout(2000);

        await PageWTZ11201.clickBottomLeftButtonByPosition();
        await page.waitForTimeout(1000);
        
        const isNotRegisteredMenu = await PageWTZ11201.isButtonWithTextExists(MENU_LABELS.NOT_REGISTERED);
        const isPotentialCustimerMenu = await PageWTZ11201.isButtonWithTextExists(MENU_LABELS.POTENTIAL_CUSTOMER);
        const isVipMenu = await PageWTZ11201.isButtonWithTextExists(MENU_LABELS.VIP);
        const isSaleRequestMenu = await PageWTZ11201.isButtonWithTextExists(MENU_LABELS.SALE_REQUEST);
        const isPurchaseHistoryMenu = await PageWTZ11201.isButtonWithTextExists(MENU_LABELS.PURCHASE_HISTORY);
        
        expect(isNotRegisteredMenu).toBe(false);
        expect(isPotentialCustimerMenu).toBe(false);
        expect(isPurchaseHistoryMenu).toBe(false);
        expect(isSaleRequestMenu).toBe(false);
        expect(isVipMenu).toBe(false);
        await snapExpect();
    });

    // Test Tablet
    test('WTZ11201_18', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapExpect,
    }) => {
        test.skip(process.env.SNAP_DEVICE === 'mobile', 'Tablet only test');
        const dataTest = loadTestData('TZ112/wtz11201', 'wtz11201', 'TC_06');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: dataTest.commonData,
            sessionData: dataTest.sessionData,
        });

        await PageWTZ11201.navigate();

        const isNotRegisteredButtonVisible = await PageWTZ11201.isNotRegisteredButtonVisible();
        expect(isNotRegisteredButtonVisible).toBe(false);

        const isVipButtonVisible = await PageWTZ11201.isVipButtonVisible();
        expect(isVipButtonVisible).toBe(false);

        const isSaleRequestButtonVisible = await PageWTZ11201.isSaleRequestButtonVisible();
        expect(isSaleRequestButtonVisible).toBe(false);

        const isNotRegisteredVisible = await PageWTZ11201.isNotRegisteredButtonVisible();
        expect(isNotRegisteredVisible).toBe(false);

        const isPurchaseHistoryButtonVisible = await PageWTZ11201.isPurchaseHistoryButtonVisible();
        expect(isPurchaseHistoryButtonVisible).toBe(false);

        const isClearButtonVisible = await PageWTZ11201.isClearButtonVisible();
        expect(isClearButtonVisible).toBe(true);

        const isSearchButtonVisible = await PageWTZ11201.isSearchButtonVisible();
        expect(isSearchButtonVisible).toBe(true);

        await snapExpect(); 
    });

    test('WTZ11201_19', async ({ 
        page,
        baseUrl, 
        indexedDBHelper,
        snapExpect,
    }) => {
        test.skip(process.env.SNAP_DEVICE !== 'mobile', 'Mobile only test');
        const dataTest = loadTestData('TZ112/wtz11201', 'wtz11201', 'TC_07');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: dataTest.commonData,
        });

        await PageWTZ11201.navigateWTY20101();

        await page.locator(PageWTZ11201.selectors.showModalButton).click();
        await page.waitForTimeout(1000);

        await page.locator(PageWTZ11201.selectors.kokNameKanaInput).fill('ｶｱ');

        await page.locator(PageWTZ11201.selectors.searchButton).click();
        await page.waitForTimeout(2000);

        const isConfirmDisabled = await PageWTZ11201.isButtonDisabled(
            PageWTZ11201.selectors.confirmButton
        );

        expect(isConfirmDisabled).toBe(true);
        await snapExpect();
    });

    test('WTZ11201_20', async ({
        page,   
        baseUrl,
        indexedDBHelper,
        snapExpect,
    }) => {
        test.skip(process.env.SNAP_DEVICE === 'mobile', 'Tablet only test');
        const dataTest = loadTestData('TZ112/wtz11201', 'wtz11201', 'TC_07');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: dataTest.commonData,
        });

        await PageWTZ11201.navigate();

        await expect(
            page.locator(PageWTZ11201.selectors.gridRowsContainer)
        ).toHaveCount(0);

        await snapExpect();
    }); 
}); 