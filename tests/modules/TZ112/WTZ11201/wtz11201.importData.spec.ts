import { expect, loadTestData, test } from "../../../base/base-test";
import { WTZ11201Page } from "../../../pages/tz112/wtz11201.page";

const ERROR_MESSAGES = {
    SEARCH_CONDITION_REQUIRED: "検索条件を入力してください。",
};

test.describe('WTZ11201 Input Data Tests', () => {
    let PageWTZ11201: WTZ11201Page;
    
    test.beforeEach(async ({ page }) => {
        PageWTZ11201 = new WTZ11201Page(page);
        await PageWTZ11201.navigate();
    });

    test('WTZ11201_21', async ({ 
        page,
        snapExpect,
    }) => {
        await PageWTZ11201.navigate();
        
        // Step 1-2: Click on telephone number field and enter "0312345678"
        await page.locator(PageWTZ11201.selectors.telNoInput).click();
        await page.locator(PageWTZ11201.selectors.telNoInput).fill('0312345678');
        
        // Step 3: Verify the value in the field
        const telNoValue = await PageWTZ11201.getInputValue(PageWTZ11201.selectors.telNoInput);
        expect(telNoValue).toBe('0312345678');
        
        await snapExpect();
    });

    test('WTZ11201_22', async ({
        page,
        snapExpect,
    }) => {
        await PageWTZ11201.navigate();
        
        // Step 1-2: Click on Kana name field and enter "タナカタロウ"
        await page.locator(PageWTZ11201.selectors.kokNameKanaInput).click();
        await page.locator(PageWTZ11201.selectors.kokNameKanaInput).fill('タナカタロウ');
        
        // Step 3: Verify the value in the field
        const kokNameKanaValue = await PageWTZ11201.getInputValue(PageWTZ11201.selectors.kokNameKanaInput);
        expect(kokNameKanaValue).toBe('タナカタロウ');
        
        await snapExpect();
    });

    test('WTZ11201_23', async ({
        page,
        snapExpect,
    }) => {
        await PageWTZ11201.navigate();
        
        // Step 1-2: Click on Customer Code field and enter "AA1010175014"
        await page.locator(PageWTZ11201.selectors.kokCdInput).click();
        await page.locator(PageWTZ11201.selectors.kokCdInput).fill('AA1010175014');
        
        // Step 3: Verify the value in the field
        const kokCdValue = await PageWTZ11201.getInputValue(PageWTZ11201.selectors.kokCdInput);
        expect(kokCdValue).toBe('AA1010175014');
        
        await snapExpect();
    });

    test('WTZ11201_24', async ({
        page,
        snapExpect,
    }) => {
        await PageWTZ11201.navigate();
        
        // Step 1-2: Click on Postal Code field and enter "FA1010174728"
        await page.locator(PageWTZ11201.selectors.kanNoInput).click();
        await page.locator(PageWTZ11201.selectors.kanNoInput).fill('FA1010174728');
        
        // Step 3: Verify the value in the field
        const postNoValue = await PageWTZ11201.getInputValue(PageWTZ11201.selectors.kanNoInput);
        expect(postNoValue).toBe('FA1010174728');
        
        await snapExpect();
    });

    test('WTZ11201_25', async ({
        page,
        snapExpect,
    }) => {
        await PageWTZ11201.navigate();
        
        await page.locator(PageWTZ11201.selectors.searchButton).click();

        await expect(
            page.locator(PageWTZ11201.selectors.errorDialog)
        ).toContainText(ERROR_MESSAGES.SEARCH_CONDITION_REQUIRED);

        await snapExpect(); 
    });

    test('WTZ11201_26', async ({
        page,
        snapInput,
        snapExpect,
    }) => {
        await PageWTZ11201.navigate();
        
        await page.locator(PageWTZ11201.selectors.telNoInput).fill('    ');
        await snapInput();
        await page.locator(PageWTZ11201.selectors.searchButton).click();

        await expect(
            page.locator(PageWTZ11201.selectors.errorDialog)
        ).toContainText(ERROR_MESSAGES.SEARCH_CONDITION_REQUIRED);

        await snapExpect(); 
    });
});