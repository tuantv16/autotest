import { expect, loadTestData, test } from '../../../base/base-test';
import { TY32101Page } from '../../../pages/TY321/wty32101.page';

// Test data constants
const INVENTORY_GUIDES = {
    JANUARY_REGULAR: '1月定期棚卸／2',
    DECEMBER_CYCLE: '12月循環棚卸／3',
};

const INVENTORY_DATES = {
    JANUARY_20_2025: '2025年01月20日',
    DECEMBER_15_2024: '2024年12月15日',
};

const INVENTORY_CLASSIFICATIONS = {
    SAME_DAY_WITH_TOTAL: '当日差異調査(総数確認有)',
    NEXT_DAY: '翌日差異調査',
};

test.describe('WTY32101 Operations Tests', () => {
    let PageTY32101: TY32101Page;

    test.beforeEach(async ({ page }) => {
        PageTY32101 = new TY32101Page(page);
    });


    test('TC20 - Verify Inventory Date options presence', async ({ page, baseUrl, indexedDBHelper }) => {
        const testData = loadTestData('TY321/wty32101', 'wty32101', 'TC_01');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: testData.commonData
        });

        // Navigate to target URL
        await PageTY32101.navigate();

        await PageTY32101.selectComboboxOptionByText(INVENTORY_DATES.JANUARY_20_2025, PageTY32101.selectors.inventoryDateCombobox);
        const selectedInventoryDate = await PageTY32101.getTextByLocator(page.locator(PageTY32101.selectors.inventoryGuideText));
        const InventoryClassificationText = await PageTY32101.getValueByName('tnorsKbn');

        await expect(selectedInventoryDate).toBe(INVENTORY_GUIDES.JANUARY_REGULAR);
        await expect(InventoryClassificationText).toBe(INVENTORY_CLASSIFICATIONS.SAME_DAY_WITH_TOTAL);

        await PageTY32101.selectComboboxOptionByText(INVENTORY_DATES.DECEMBER_15_2024, PageTY32101.selectors.inventoryDateCombobox);

        const selectedInventoryDate2 = await PageTY32101.getTextByLocator(page.locator(PageTY32101.selectors.inventoryGuideText));
        const InventoryClassificationText2 = await PageTY32101.getValueByName('tnorsKbn');

        await expect(selectedInventoryDate2).toBe(INVENTORY_GUIDES.DECEMBER_CYCLE);
        await expect(InventoryClassificationText2).toBe(INVENTORY_CLASSIFICATIONS.NEXT_DAY);
    }); 

    test('TC21 - Verify Inventory Date options absence', async ({ page, baseUrl, indexedDBHelper }) => {
        const testData = loadTestData('TY321/wty32101', 'wty32101', 'TC_01');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: testData.commonData
        });

        // Navigate to target URL
        await PageTY32101.navigate();

        await PageTY32101.selectComboboxOptionByText(INVENTORY_GUIDES.JANUARY_REGULAR, PageTY32101.selectors.InventoryGuideCombobox);
        const inventoryDate = await PageTY32101.getTextByLocator(page.locator(PageTY32101.selectors.inventoryDateText));
        const InventoryClassificationText = await PageTY32101.getValueByName('tnorsKbn');

        await expect(inventoryDate).toBe(INVENTORY_DATES.JANUARY_20_2025);
        await expect(InventoryClassificationText).toBe(INVENTORY_CLASSIFICATIONS.SAME_DAY_WITH_TOTAL);

        await PageTY32101.selectComboboxOptionByText(INVENTORY_GUIDES.DECEMBER_CYCLE, PageTY32101.selectors.InventoryGuideCombobox);
        
        const inventoryDate2 = await PageTY32101.getTextByLocator(page.locator(PageTY32101.selectors.inventoryDateText));
        const InventoryClassificationText2 = await PageTY32101.getValueByName('tnorsKbn');

        await expect(inventoryDate2).toBe(INVENTORY_DATES.DECEMBER_15_2024);
        await expect(InventoryClassificationText2).toBe(INVENTORY_CLASSIFICATIONS.NEXT_DAY);

        console.log(await page.viewportSize());
    }); 
}); 

