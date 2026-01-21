import { TY32101Page } from './../../../pages/TY321/wty32101.page';
import { expect, loadTestData, test } from '../../../base/base-test';
import { ApiMockHelper } from '../../../utils/api-mock-helper';
import { MockResponses, API_ENDPOINTS } from '../../../mocks/TY321/wty32101-mock-factory';

test.describe('WTY32101 Initialzation Tests', () => {
    let PageTY32101: TY32101Page;

    test.beforeEach(async ({ page }) => {
        PageTY32101 = new TY32101Page(page);
    });

    test('TC06 - Check header', async ({ page, baseUrl, indexedDBHelper }) => {
        const expectedTitle = '棚卸前処理';
        const testData = loadTestData('TY321/wty32101', 'wty32101', 'TC_01');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: testData.commonData
        });

        await PageTY32101.navigate();
        const titleFound = await PageTY32101.waitForTextInBody(expectedTitle, 5000);

        expect(titleFound).toBe(true);
    });

    test('TC07 - Error: No Inventory Info', async ({ page, baseUrl, indexedDBHelper }) => {
        const testData = loadTestData('TY321/wty32101', 'wty32101', 'TC_02');
        const apiMock = new ApiMockHelper(page);
        const expectedErrorMessage = '棚卸情報が存在しません。';

        // Mock API with predefined error response
        await apiMock.mockApiResponse(API_ENDPOINTS.INIT, MockResponses.noInventoryInfo());

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({
            commonData: testData.commonData
        });

        await PageTY32101.navigate();

        await expect(
            page.locator(PageTY32101.selectors.errorDialog)
        ).toContainText(expectedErrorMessage);
    });

    test('TC08 - Error: No System Config', async ({ page, baseUrl, indexedDBHelper }) => {
        const testData = loadTestData('TY321/wty32101', 'wty32101', 'TC_02');
        const apiMock = new ApiMockHelper(page);
        const expectedErrorMessage = 'システム環境設定マスタが存在しません。';

        // Mock API with predefined error response
        await apiMock.mockApiResponse(API_ENDPOINTS.INIT, MockResponses.noSystemConfig());

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({
            commonData: testData.commonData
        });

        await PageTY32101.navigate();

        await expect(
            page.locator(PageTY32101.selectors.errorDialog)
        ).toContainText(expectedErrorMessage);
    });

    // Example: Custom mock with specific changes
    test('TC09 - tablet/mobile not allowed', async ({ page, baseUrl, indexedDBHelper }) => {
        const testData = loadTestData('TY321/wty32101', 'wty32101', 'TC_02');
        const apiMock = new ApiMockHelper(page);
        const expectedErrorMessage = 'この店舗では、この画面を使って棚卸できません。棚卸帳票印刷画面から棚卸作業をしてください。';

        await apiMock.mockApiResponse(API_ENDPOINTS.INIT, MockResponses.noTableMobileNotAllowed());

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await PageTY32101.navigate();

        await expect(
            page.locator(PageTY32101.selectors.errorDialog)
        ).toContainText(expectedErrorMessage);
    });

    test('TC010 - tablet/mobile allowed', async ({ page, baseUrl, indexedDBHelper }) => {
        const testData = loadTestData('TY321/wty32101', 'wty32101', 'TC_02');
        const apiMock = new ApiMockHelper(page);

        await apiMock.mockApiResponse(API_ENDPOINTS.INIT, MockResponses.tableMobileAllowed());
        
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await PageTY32101.navigate();  

        // Not yet impelmented
    });

    test('TC14 - Check show Inventory classification with tnorsKbn = 0', async ({ page, baseUrl, indexedDBHelper }) => {
        const expectedValue = '翌日差異調査';
        const testData = loadTestData('TY321/wty32101', 'wty32101', 'TC_01');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: testData.commonData
        });

        // Navigate to target URL
        await PageTY32101.navigate();
        await PageTY32101.selectComboboxOptionByText('12月循環棚卸／3', PageTY32101.selectors.InventoryGuideCombobox);
        
        const actualText = await PageTY32101.getValueByName('tnorsKbn');

        await expect(actualText).toBe(expectedValue);
    }); 

    test('TC15 - Check show Inventory classification with tnorsKbn != 0', async ({ page, baseUrl, indexedDBHelper }) => {
        const expectedValue = '当日差異調査(総数確認有)';
        const testData = loadTestData('TY321/wty32101', 'wty32101', 'TC_01');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: testData.commonData
        });

        // Navigate to target URL
        await PageTY32101.navigate();

        await PageTY32101.selectComboboxOptionByText('1月定期棚卸／2', PageTY32101.selectors.InventoryGuideCombobox);
        const actualText = await PageTY32101.getValueByName('tnorsKbn');

        await expect(actualText).toBe(expectedValue);
    })

    test('TC18 - Handle unknown error gracefully', async ({ page, baseUrl, indexedDBHelper }) => {
        const expectedErrorMessage = 'サーバAPでエラーが発生しました。';

        const testData = loadTestData('TY321/wty32101', 'wty32101', 'TC_02');
        const apiMock = new ApiMockHelper(page);

        // Mock API with predefined unknown error response
        await apiMock.mockApiResponse(API_ENDPOINTS.INIT, MockResponses.unknownError());
        
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            commonData: testData.commonData
        });
        
        await PageTY32101.navigate();
        await expect(
            page.locator(PageTY32101.selectors.errorDialog)
        ).toContainText(expectedErrorMessage);
    });
})