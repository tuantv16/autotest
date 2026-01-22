import { expect, loadTestData, test } from '../../../base/base-test';
import { TY32101Page } from '../../../pages/TY321/wty32101.page';

const Label = {
    INVENTORY_DATE: '棚卸日',
    INVENTORY_GUIDE: '棚卸指示名称／棚卸指示番号',
}

const ErrorMessage = {
    INVENTORY_DATE_REQUIRED: '棚卸日が指定されていないため前処理ができません。',
    INVENTORY_GUIDE_INVALID: '棚卸指示名称が正しくないため前処理ができません。',
}

const testDataTC_01 = loadTestData('TY321/wty32101', 'wty32101', 'TC_01');

test.describe('WTY32101 Validation Tests', () => {
    let PageTY32101: TY32101Page;

    test.beforeEach(async ({ page }) => {
        PageTY32101 = new TY32101Page(page);
    });

    test('WTY32101_25 - Validate required fields', async ({ page, baseUrl, indexedDBHelper }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: testDataTC_01.commonData
        });

        await PageTY32101.navigate();

        // Clear Inventory Date selection to trigger validation
        await PageTY32101.selectComboboxOptionByText('', PageTY32101.selectors.inventoryDateCombobox);

        // Click Confirm button to trigger validation
        await page.locator(PageTY32101.selectors.confirmButton).click();

        await PageTY32101.verifyValidateMessageByLabel(Label.INVENTORY_DATE, ErrorMessage.INVENTORY_DATE_REQUIRED);
    }); 

    test('WTY32101_26 - Validate no error when required fields are filled', async ({ page, baseUrl, indexedDBHelper }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: testDataTC_01.commonData
        });

        await PageTY32101.navigate();

        // Ensure Inventory Date has a valid selection
        await PageTY32101.selectComboboxOptionByText('', PageTY32101.selectors.inventoryGuideText);

        // Click Confirm button to trigger validation
        await page.locator(PageTY32101.selectors.confirmButton).click();

        await PageTY32101.verifyValidateMessageByLabel(Label.INVENTORY_GUIDE, ErrorMessage.INVENTORY_GUIDE_INVALID);
    });
});
