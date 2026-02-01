import { expect, loadTestData, test } from "../../../base/base-test"; 
import { TY10901Page } from "../../../pages/TY109/wty10901.page";

// Constants
const EXPECTED_TITLE = '事前売上見積修正';
const MENU_DETAIL_TEXT = '事売詳細';
const EXPECTED_HEADERS = [
    '区分',
    '事売番号',
    '時間',
    '商品',
    '担当者',
    '顧客',
    '合計金額',
];

test.describe('WTY10901 Initialization Tests', () => {
    let PageTY10901: TY10901Page;

    test.beforeEach(async ({ page }) => {
        PageTY10901 = new TY10901Page(page);
    });

    test('WTY10901_05', async ({ 
        snapExpect,
     }) => {
        await PageTY10901.navigate();
        
        const titleFound = await PageTY10901.waitForTextInBody(EXPECTED_TITLE, 5000);

        expect(titleFound).toBe(true);
        await snapExpect();
    }); 

    test('WTY10901_06', async ({ 
        page,
        snapExpect,
     }) => {
        await PageTY10901.navigate();
        
        // Check that 番号 (Number) field is empty and enabled
        const numberInput = page.locator(PageTY10901.selectors.uriNoInput).first();
        const numberValue = await numberInput.inputValue().catch(() => '');
        expect(numberValue).toBe('');
        const numberEnabled = await numberInput.isEnabled().catch(() => false);
        expect(numberEnabled).toBe(true);
        
        // Check that 顧客コード (Customer Code) field is empty and enabled
        const customerInput = page.locator(PageTY10901.selectors.kokCdInput).first();
        const customerValue = await customerInput.inputValue().catch(() => '');
        expect(customerValue).toBe('');
        const customerEnabled =  await customerInput.isEnabled().catch(() => false);
        expect(customerEnabled).toBe(true);

        // Check that 担当者 (Person in charge) field is empty and enabled
        const personInput = page.locator(PageTY10901.selectors.tanCdInput).first();
        const personEnabled = await personInput.isEnabled().catch(() => false);
        expect(personEnabled).toBe(true);

        // Check that 顧客
        const kokNmInput = page.locator(PageTY10901.selectors.kokNmInput).first();
        const kokNmValue = await kokNmInput.inputValue().catch(() => '');
        expect(kokNmValue).toBe('');
        const kokNmEnabled = await kokNmInput.isEnabled().catch(() => false);
        expect(kokNmEnabled).toBe(false);

        await snapExpect();
     }); 

    test('WTY10901_07', async ({ 
        page,
        snapExpect,
     }) => {
        await PageTY10901.navigate();

        await PageTY10901.clickMenuButton();
        const menu = page.locator('#basic-menu');
        await expect(
        menu.locator('li[role="menuitem"]', { hasText: MENU_DETAIL_TEXT })
        ).toBeVisible();
        
        // Check that 検索 (Search) button is enabled
        const searchButton = page.locator(PageTY10901.selectors.searchButton).first();
        const searchEnabled = await searchButton.isEnabled().catch(() => false);
        expect(searchEnabled).toBe(true);

        // Check that クリア (Clear) button is enabled
        const clearButton = page.locator(PageTY10901.selectors.clearButton).first();
        const clearEnabled = await clearButton.isEnabled().catch(() => false);
        expect(clearEnabled).toBe(true);
        await snapExpect();
    });

    test('WTY10901_09', async ({ 
        page,
        snapExpect,
     }) => {
        await PageTY10901.navigate();   

        await snapExpect();
        await expect(
            page.locator('.ag-center-cols-container .ag-row')
        ).toHaveCount(0);
    });

    test('WTY10901_10', async ({
        page,
        snapExpect,
     }) => {
        await PageTY10901.navigate();   

        const headerCells = page.locator('.multi-row-header-cell');

        const actualHeaders = await headerCells.allTextContents();

        for (const header of EXPECTED_HEADERS) {
            expect(actualHeaders).toContain(header);
        }
        await snapExpect();
    }); 
});