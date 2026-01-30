import { Page } from '@playwright/test';
import { TY32101Page } from './../../../pages/TY321/wty32101.page';
import { expect, loadTestData, test } from '../../../base/base-test';
import { ApiMockHelper } from '../../../utils/api-mock-helper';
import { MockResponses, API_ENDPOINTS } from '../../../mocks/TY321/wty32101-mock-factory';

const MessageDialog = {
    NO_INVENTORY_INFO: '棚卸情報が存在しません。',
    NO_SYSTEM_CONFIG: 'システム環境設定マスタが存在しません。',
    TABLET_MOBILE_NOT_ALLOWED: 'この店舗では、この画面を使って棚卸できません。棚卸帳票印刷画面から棚卸作業をしてください。',
    UNKNOWN_ERROR: 'サーバAPでエラーが発生しました。',
}

const testDataTC_01 = loadTestData('TY321/wty32101', 'wty32101', 'TC_01');
const testDataTC_02 = loadTestData('TY321/wty32101', 'wty32101', 'TC_02');

test.describe('WTY32101 Initialzation Tests', () => {
    let PageTY32101: TY32101Page;

    test.beforeEach(async ({ page }) => {
        PageTY32101 = new TY32101Page(page);
    });

    test('WTY32101_06', async ({ 
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
     }) => {
        const expectedTitle = '棚卸前処理';

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: testDataTC_01.commonData
        });

        await PageTY32101.navigate();
        
        const titleFound = await PageTY32101.waitForTextInBody(expectedTitle, 5000);

        expect(titleFound).toBe(true);
        await snapExpect();
    });

    test('WTY32101_07', async ({ 
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
     }) => {
        const apiMock = new ApiMockHelper(page);

        // Mock API with predefined error response
        await apiMock.mockApiResponse(API_ENDPOINTS.INIT, MockResponses.noInventoryInfo());

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({
            commonData: testDataTC_02.commonData
        });

        await PageTY32101.navigate();

        await expect(
            page.locator(PageTY32101.selectors.errorDialog)
        ).toContainText(MessageDialog.NO_INVENTORY_INFO);
        await snapExpect();
    });

    test('WTY32101_08', async ({ page, baseUrl, indexedDBHelper, snapInput, snapExpect }) => {
        const apiMock = new ApiMockHelper(page);

        // Mock API with predefined error response
        await apiMock.mockApiResponse(API_ENDPOINTS.INIT, MockResponses.noSystemConfig());

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({
            commonData: testDataTC_02.commonData
        });

        await PageTY32101.navigate();

        await expect(
            page.locator(PageTY32101.selectors.errorDialog)
        ).toContainText(MessageDialog.NO_SYSTEM_CONFIG);
        await snapExpect();
    });

    test('WTY32101_09', async ({ page, baseUrl, indexedDBHelper, snapInput, snapExpect }) => {
        const apiMock = new ApiMockHelper(page);

        await apiMock.mockApiResponse(API_ENDPOINTS.INIT, MockResponses.noTableMobileNotAllowed());

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: testDataTC_02.commonData });
        await PageTY32101.navigate();

        await expect(
            page.locator(PageTY32101.selectors.errorDialog)
        ).toContainText(MessageDialog.TABLET_MOBILE_NOT_ALLOWED);
        await snapExpect();
    });

    test('WTY32101_10', async ({ page, baseUrl, indexedDBHelper, snapInput, snapExpect }) => {
        const testData = loadTestData('TY321/wty32101', 'wty32101', 'TC_01');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: testData.commonData });

        await PageTY32101.navigate();  
        await snapInput();

        const expectedInventoryDateOptions = [
            PageTY32101.INVENTORY_DATES.JANUARY_20_2025,
            PageTY32101.INVENTORY_DATES.DECEMBER_15_2024,
            PageTY32101.INVENTORY_DATES.DECEMBER_20_2024
        ];

        const expectedInventoryGuideOptions = [
            PageTY32101.INVENTORY_GUIDES.JANUARY_REGULAR,
            PageTY32101.INVENTORY_GUIDES.DECEMBER_CYCLE,
            PageTY32101.INVENTORY_GUIDES.NOVEMBER_CYCLE
        ];

        await page.locator(PageTY32101.selectors.inventoryDateCombobox).click();
        await page.waitForTimeout(500);
        await snapExpect(1);
        await PageTY32101.verifyOpenedComboboxOptionsText(expectedInventoryDateOptions);
        await PageTY32101.clickOutside();

        await page.locator(PageTY32101.selectors.InventoryGuideCombobox).click();
        await page.waitForTimeout(500);
        await snapExpect(2);
        await PageTY32101.verifyOpenedComboboxOptionsText(expectedInventoryGuideOptions);
        
        const clearButton = await PageTY32101.isClearButtonVisible(PageTY32101.selectors.clearButton);
        const confirmButton = await PageTY32101.isConfirmButtonVisible(PageTY32101.selectors.confirmButton);
        
        expect(clearButton).toBe(true);
        expect(confirmButton).toBe(true);
    });

    test('WTY32101_14', async ({ page, baseUrl, indexedDBHelper, snapInput, snapExpect }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: testDataTC_01.commonData
        });

        // Navigate to target URL
        await PageTY32101.navigate();
        await snapInput();

        await PageTY32101.selectComboboxOptionByText(PageTY32101.INVENTORY_GUIDES.DECEMBER_CYCLE, PageTY32101.selectors.InventoryGuideCombobox);
        
        const actualText = await PageTY32101.getValueByName(PageTY32101.selectors.tnorsKbn);
        await expect(actualText).toBe(PageTY32101.INVENTORY_CLASSIFICATIONS.NEXT_DAY);
        await snapExpect();
    }); 

    test('WTY32101_15', async ({ page, baseUrl, indexedDBHelper, snapInput, snapExpect }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: testDataTC_01.commonData
        });

        // Navigate to target URL
        await PageTY32101.navigate();
        await snapInput();

        await PageTY32101.selectComboboxOptionByText(PageTY32101.INVENTORY_GUIDES.JANUARY_REGULAR, PageTY32101.selectors.InventoryGuideCombobox);
        
        const actualText = await PageTY32101.getValueByName(PageTY32101.selectors.tnorsKbn);
        await expect(actualText).toBe(PageTY32101.INVENTORY_CLASSIFICATIONS.SAME_DAY_WITH_TOTAL);
        await snapExpect();
    })

    test('WTY32101_18', async ({ page, baseUrl, indexedDBHelper, snapInput, snapExpect }) => {
        const apiMock = new ApiMockHelper(page);

        // Mock API with predefined unknown error response
        await apiMock.mockApiResponse(API_ENDPOINTS.INIT, MockResponses.unknownError());
        
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            commonData: testDataTC_02.commonData
        });
        
        await PageTY32101.navigate();
        await expect(
            page.locator(PageTY32101.selectors.errorDialog)
        ).toContainText(MessageDialog.UNKNOWN_ERROR);
        await snapExpect();
    });
})