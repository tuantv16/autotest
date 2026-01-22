import { expect, loadTestData, test } from '../../../base/base-test';
import { TY32101Page } from '../../../pages/TY321/wty32101.page';

const testDataTC_01 = loadTestData('TY321/wty32101', 'wty32101', 'TC_01');

test.describe('WTY32101 Operations Tests', () => {
    let PageTY32101: TY32101Page;

    test.beforeEach(async ({ page }) => {
        PageTY32101 = new TY32101Page(page);
    });

    test('WTY32101_20 - Verify Inventory Date options presence', async ({ page, baseUrl, indexedDBHelper }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: testDataTC_01.commonData
        });

        // Navigate to target URL
        await PageTY32101.navigate();

        const selectedInventoryDate = await PageTY32101.getTextByLocator(page.locator(PageTY32101.selectors.inventoryGuideText));
        const InventoryClassificationText = await PageTY32101.getValueByName('tnorsKbn');

        await expect(selectedInventoryDate).toBe(PageTY32101.INVENTORY_GUIDES.JANUARY_REGULAR);
        await expect(InventoryClassificationText).toBe(PageTY32101.INVENTORY_CLASSIFICATIONS.SAME_DAY_WITH_TOTAL);

        await PageTY32101.selectComboboxOptionByText(PageTY32101.INVENTORY_DATES.DECEMBER_15_2024, PageTY32101.selectors.inventoryDateCombobox);

        const selectedInventoryDate2 = await PageTY32101.getTextByLocator(page.locator(PageTY32101.selectors.inventoryGuideText));
        const InventoryClassificationText2 = await PageTY32101.getValueByName('tnorsKbn');

        await expect(selectedInventoryDate2).toBe(PageTY32101.INVENTORY_GUIDES.DECEMBER_CYCLE);
        await expect(InventoryClassificationText2).toBe(PageTY32101.INVENTORY_CLASSIFICATIONS.NEXT_DAY);
    }); 

    test('WTY32101_21 - Verify Inventory Date options absence', async ({ page, baseUrl, indexedDBHelper }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: testDataTC_01.commonData
        });

        // Navigate to target URL
        await PageTY32101.navigate();

        const inventoryDate = await PageTY32101.getTextByLocator(page.locator(PageTY32101.selectors.inventoryDateText));
        const InventoryClassificationText = await PageTY32101.getValueByName('tnorsKbn');

        await expect(inventoryDate).toBe(PageTY32101.INVENTORY_DATES.JANUARY_20_2025);
        await expect(InventoryClassificationText).toBe(PageTY32101.INVENTORY_CLASSIFICATIONS.SAME_DAY_WITH_TOTAL);

        await PageTY32101.selectComboboxOptionByText(PageTY32101.INVENTORY_GUIDES.DECEMBER_CYCLE, PageTY32101.selectors.InventoryGuideCombobox);
        
        const inventoryDate2 = await PageTY32101.getTextByLocator(page.locator(PageTY32101.selectors.inventoryDateText));
        const InventoryClassificationText2 = await PageTY32101.getValueByName('tnorsKbn');

        await expect(inventoryDate2).toBe(PageTY32101.INVENTORY_DATES.DECEMBER_15_2024);
        await expect(InventoryClassificationText2).toBe(PageTY32101.INVENTORY_CLASSIFICATIONS.NEXT_DAY);
    }); 
}); 

