import { expect, loadTestData, test } from '../../../base/base-test';
import { TY32101Page } from '../../../pages/TY321/wty32101.page';

const testDataTC_01 = loadTestData('TY321/wty32101', 'wty32101', 'TC_01');
const testDataTC_03 = loadTestData('TY321/wty32101', 'wty32101', 'TC_03');

test.describe('WTY32101 Action Tests', () => {
    let PageTY32101: TY32101Page;
    
    test.beforeEach(async ({ page }) => {
        PageTY32101 = new TY32101Page(page);
    });

    test('WTY32101_22', async ({ 
        page, 
        baseUrl, 
        indexedDBHelper,
        snapInput,
        snapExpect, }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: testDataTC_01.commonData,
        });

        await PageTY32101.navigate();
        await snapInput();

        const selectedInventoryDate = await PageTY32101.getTextByLocator(page.locator(PageTY32101.selectors.inventoryGuideText));
        const inventoryDate = await PageTY32101.getTextByLocator(page.locator(PageTY32101.selectors.inventoryDateText));
        const InventoryClassificationText = await PageTY32101.getValueByName(PageTY32101.selectors.tnorsKbn);
        
        await snapExpect(1);
        await expect(selectedInventoryDate).toBe(PageTY32101.INVENTORY_GUIDES.JANUARY_REGULAR);
        await expect(inventoryDate).toBe(PageTY32101.INVENTORY_DATES.JANUARY_20_2025);
        await expect(InventoryClassificationText).toBe(PageTY32101.INVENTORY_CLASSIFICATIONS.SAME_DAY_WITH_TOTAL);

        await page.locator(PageTY32101.selectors.clearButton).click();
        await snapExpect(2);

        const selectedInventoryDate2 = await PageTY32101.getTextByLocator(page.locator(PageTY32101.selectors.inventoryGuideText));
        const inventoryDate2 = await PageTY32101.getTextByLocator(page.locator(PageTY32101.selectors.inventoryDateText));
        const InventoryClassificationText2 = await PageTY32101.getValueByName(PageTY32101.selectors.tnorsKbn);

        await expect(selectedInventoryDate2).toBe(PageTY32101.INVENTORY_GUIDES.JANUARY_REGULAR);
        await expect(inventoryDate2).toBe(PageTY32101.INVENTORY_DATES.JANUARY_20_2025);
        await expect(InventoryClassificationText2).toBe(PageTY32101.INVENTORY_CLASSIFICATIONS.SAME_DAY_WITH_TOTAL);
    });

    test('WTY32101_23', async ({ 
        page, 
        baseUrl, 
        indexedDBHelper,
        snapInput,
        snapExpect,
     }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: testDataTC_01.commonData,
        });

        await PageTY32101.navigate();
        await snapInput();

        await PageTY32101.selectComboboxOptionByText(PageTY32101.INVENTORY_DATES.DECEMBER_15_2024, PageTY32101.selectors.inventoryDateCombobox);

        const selectedInventoryDateChanged = await PageTY32101.getTextByLocator(page.locator(PageTY32101.selectors.inventoryGuideText));
        const inventoryDateChanged = await PageTY32101.getTextByLocator(page.locator(PageTY32101.selectors.inventoryDateText));
        const InventoryClassificationTextChanged = await PageTY32101.getValueByName(PageTY32101.selectors.tnorsKbn);
        
        await snapExpect(1);
        await expect(selectedInventoryDateChanged).toBe(PageTY32101.INVENTORY_GUIDES.DECEMBER_CYCLE);
        await expect(inventoryDateChanged).toBe(PageTY32101.INVENTORY_DATES.DECEMBER_15_2024);
        await expect(InventoryClassificationTextChanged).toBe(PageTY32101.INVENTORY_CLASSIFICATIONS.NEXT_DAY);

        await page.locator(PageTY32101.selectors.clearButton).click();

        const selectedInventoryDate2 = await PageTY32101.getTextByLocator(page.locator(PageTY32101.selectors.inventoryGuideText));
        const inventoryDate2 = await PageTY32101.getTextByLocator(page.locator(PageTY32101.selectors.inventoryDateText));
        const InventoryClassificationText2 = await PageTY32101.getValueByName(PageTY32101.selectors.tnorsKbn);
        await snapExpect(2);

        await expect(selectedInventoryDate2).toBe("1月定期棚卸／2");
        await expect(inventoryDate2).toBe(PageTY32101.INVENTORY_DATES.JANUARY_20_2025);
        await expect(InventoryClassificationText2).toBe(PageTY32101.INVENTORY_CLASSIFICATIONS.SAME_DAY_WITH_TOTAL);
    });

    test('WTY32101_50', async ({ 
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
     }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: testDataTC_03.commonData,
        });

        await PageTY32101.navigate();
        await snapInput();
        
        await page.locator(PageTY32101.selectors.confirmButton).click();
        await page.locator(PageTY32101.selectors.confirmButtonModal).click();

        // Verify navigation to WTY32102 page
        await page.waitForTimeout(500)
        await snapExpect();
        await expect(page).toHaveURL(/.*WTY32201/);
    });
});