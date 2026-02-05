import { expect, test } from '../../../base/base-test';
import { WTZ10401Page } from '../../../pages/TZ104/wtz10401.page';

test.describe('WTZ10401 Validate Tests', () => {
    let PageWTZ10401: WTZ10401Page;
    
    test.beforeEach(async ({ page }) => {
        PageWTZ10401 = new WTZ10401Page(page);
    });

    test('WTZ10401_16', async ({
        page,
        snapExpect,
     }) => {
        await PageWTZ10401.navigate();

        await page.locator(PageWTZ10401.selectors.searchButton).click();
        await page.waitForTimeout(500);

        await PageWTZ10401.expectErrorByInputName('searchKey', '必須入力項目です。');

        const hasData = await PageWTZ10401.hasAgGridData('div[role="presentation"]');
        expect(hasData).toBe(false);
        await snapExpect();
    });

    test('WTZ10401_17', async ({
        page,
        snapInput,
        snapExpect,
     }) => {
        await PageWTZ10401.navigate();

        await PageWTZ10401.getRadioLabelLocator(PageWTZ10401.labels.radioCode).click();

        await snapInput();
        await page.locator(PageWTZ10401.selectors.searchButton).click();
        await page.waitForTimeout(500);

        await PageWTZ10401.expectErrorByInputName('searchKey', PageWTZ10401.messages.requiredField);

        const hasData = await PageWTZ10401.hasAgGridData('div[role="presentation"]');
        expect(hasData).toBe(false);
        await snapExpect();
    });

    test('WTZ10401_18', async ({
        page,
        snapInput, 
        snapExpect,
     }) => {
        await PageWTZ10401.navigate();

        await PageWTZ10401.getRadioLabelLocator(PageWTZ10401.labels.radioCode).click();
        await page.waitForTimeout(1000);
        await page.locator('input[name="searchKey"]').fill('ｱ123'); // Exceeding max length of 5
        await snapInput();

        await page.locator(PageWTZ10401.selectors.searchButton).click();
        await page.waitForTimeout(1000);

        await PageWTZ10401.expectErrorByInputName('searchKey', PageWTZ10401.messages.numericOnly);

        const hasData = await PageWTZ10401.hasAgGridData('div[role="presentation"]');
        expect(hasData).toBe(false);
        await snapExpect();
    }); 

    test('WTZ10401_19', async ({
        page,
        snapExpect,
     }) => {
        await PageWTZ10401.navigate();

        await page.locator('input[name="searchKey"]').fill('１２３'); 

        await page.locator(PageWTZ10401.selectors.searchButton).click();
        await page.waitForTimeout(500);

        await PageWTZ10401.expectErrorByInputName('searchKey', PageWTZ10401.messages.halfWidthOnly);

        const hasData = await PageWTZ10401.hasAgGridData('div[role="presentation"]');
        expect(hasData).toBe(false);
        await snapExpect();
    });

    test('WTZ10401_20', async ({
        page,
        snapExpect,
    }) => {
        await PageWTZ10401.navigate();

        await PageWTZ10401.getRadioLabelLocator(PageWTZ10401.labels.radioCode).click();
        await page.waitForTimeout(1000);
        
        await page.locator('input[name="searchKey"]').fill('１２３'); 

        await page.locator(PageWTZ10401.selectors.searchButton).click();
        await page.waitForTimeout(500);

        await PageWTZ10401.expectErrorByInputName('searchKey', PageWTZ10401.messages.halfWidthOnly);

        const hasData = await PageWTZ10401.hasAgGridData('div[role="presentation"]');
        expect(hasData).toBe(false);
        await snapExpect();
    });

    test('WTZ10401_31', async ({
        page,
        snapInput,
        snapExpect,
    }) => {
        await PageWTZ10401.navigate();
        await snapInput();
        
        await page.locator(PageWTZ10401.selectors.confirmButton).click();
        await page.waitForTimeout(1000);

        await expect(
            page.locator(PageWTZ10401.selectors.errorDialog)
        ).toContainText(PageWTZ10401.messages.selectCategory);
        await snapExpect();
    });
});