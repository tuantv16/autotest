import { test, expect, loadTestData } from '../../../base/base-test';
import { TY10901Page } from '../../../pages/TY109/wty10901.page';

// Constants
const Labels = {
    CUSTOMER: '顧客',
    NUMBER: '番号',
    DATE: '期間',
    ESTIMATE: '見積',
};

const ErrorMessages = {
    CUSTOMER_LENGTH: '顧客コードは１２桁で入力してください。',
    NUMBER_LENGTH: '見積番号は14桁で入力してください。',
    DATE_FORMAT: '日付を入力してください。',
    DATE_RANGE: '検索終了日には検索開始日以降の日付を入力してください。',
};

const TestData = {
    // Number input tests
    NUMBER_8_DIGITS: '12345678',
    NUMBER_20_DIGITS: '12345678901234567890',
    NUMBER_14_DIGITS: '12345678901234',
    NUMBER_13_DIGITS: '1234567890123',
    SPECIAL_CHARS: '!@#$%',
    EXPECTED_5_DIGITS: '12345',
    
    // Customer code tests
    CUSTOMER_11_DIGITS: '12345678901',
    CUSTOMER_13_DIGITS: '1234567890123',
    CUSTOMER_12_DIGITS: '123456789012',
    
    // Person in charge tests
    PERSON_9_DIGITS: '123456789',
    EXPECTED_4_DIGITS: '1234',
    
    // Date tests
    INVALID_DATE: '2026/02/30',
    DATE_FROM: '2026/02/01',
    DATE_TO: '2026/01/01',
};

test.describe('WTY10901 Validation Tests', () => {
    let PageTY10901: TY10901Page;

    test.beforeEach(async ({ page }) => {
        PageTY10901 = new TY10901Page(page);
    });

    test('WTY10901_11', async ({ 
        page,
        snapInput,
        snapExpect,
     }) => {
        await PageTY10901.navigate();
        
        await page.click(PageTY10901.selectors.uriNoInput);
        await page.fill(PageTY10901.selectors.uriNoInput, TestData.NUMBER_8_DIGITS);
        await snapInput();
        
        const inputValue = await page.inputValue(PageTY10901.selectors.uriNoInput);
        expect(inputValue.length).toBeLessThanOrEqual(5);
        expect(inputValue).toBe(TestData.EXPECTED_5_DIGITS);
        await snapExpect();
    });

    test('WTY10901_12', async ({ 
        page,
        snapInput,
        snapExpect,
     }) => {
        await PageTY10901.navigate();

        await page.locator('label', { hasText: Labels.ESTIMATE }).click();

        await page.click(PageTY10901.selectors.uriNoInput);
        await page.fill(PageTY10901.selectors.uriNoInput, TestData.NUMBER_20_DIGITS);
        await snapInput();
        
        const inputValue = await page.inputValue(PageTY10901.selectors.uriNoInput);
        expect(inputValue.length).toBeLessThanOrEqual(14);
        expect(inputValue).toBe(TestData.NUMBER_14_DIGITS);
        await snapExpect();
    });

    test('WTY10901_13', async ({ 
        page,
        snapInput,
        snapExpect,
     }) => {
        await PageTY10901.navigate();

        await page.locator('label', { hasText: Labels.ESTIMATE }).click();
        
        await page.click(PageTY10901.selectors.uriNoInput);
        await page.fill(PageTY10901.selectors.uriNoInput, TestData.NUMBER_13_DIGITS);
        await snapInput();
        
        await page.locator(PageTY10901.selectors.searchButton).click();
        await page.waitForTimeout(500);

        await snapExpect();
        await PageTY10901.verifyValidateMessageByLabel(Labels.NUMBER, ErrorMessages.NUMBER_LENGTH);
    });

    test('WTY10901_14', async ({ 
        page,
        snapInput,
        snapExpect,
     }) => {
        await PageTY10901.navigate();
        
        await page.click(PageTY10901.selectors.uriNoInput);
        
        await page.fill(PageTY10901.selectors.uriNoInput, TestData.SPECIAL_CHARS);
        await snapInput();
        
        const inputValue = await page.inputValue(PageTY10901.selectors.uriNoInput);
        expect(inputValue).toBe(TestData.SPECIAL_CHARS);
        await PageTY10901.clickOutside();
        await snapExpect();
    });

    test('WTY10901_15', async ({ 
        page,
        snapInput,
        snapExpect,
     }) => {
        await PageTY10901.navigate();
        
        await page.click(PageTY10901.selectors.kokCdInput);
        
        await page.fill(PageTY10901.selectors.kokCdInput, TestData.CUSTOMER_11_DIGITS);
        await snapInput();
        
        await page.locator(PageTY10901.selectors.searchButton).click();
        await page.waitForTimeout(500);
        
        await snapExpect();
        await PageTY10901.verifyValidateMessageByLabel(Labels.CUSTOMER, ErrorMessages.CUSTOMER_LENGTH);
    });

    test('WTY10901_16', async ({ 
        page,
        snapInput,
        snapExpect,
     }) => {
        await PageTY10901.navigate();
        
        await page.click(PageTY10901.selectors.kokCdInput);
        
        await page.fill(PageTY10901.selectors.kokCdInput, TestData.CUSTOMER_13_DIGITS);
        await snapInput();
        
        const inputValue = await page.inputValue(PageTY10901.selectors.kokCdInput);
        expect(inputValue.length).toBeLessThanOrEqual(12);
        expect(inputValue).toBe(TestData.CUSTOMER_12_DIGITS);
        await snapExpect();
    });

    test('WTY10901_17', async ({ 
        page,
        snapInput,
        snapExpect,
     }) => {
        await PageTY10901.navigate();
        
        await page.click(PageTY10901.selectors.tanCdInput);
        await page.fill(PageTY10901.selectors.tanCdInput, TestData.PERSON_9_DIGITS);
        await snapInput();
        
        const inputValue = await page.inputValue(PageTY10901.selectors.tanCdInput);
        expect(inputValue).toBe(TestData.EXPECTED_4_DIGITS);
        await snapExpect();
    });

    test('WTY10901_18', async ({ 
        page,
        snapInput,
        snapExpect,
     }) => {
        await PageTY10901.navigate();
        
        await page.locator('label', { hasText: Labels.ESTIMATE }).click();

        await PageTY10901.fillkknDateDate(TestData.INVALID_DATE);
        await snapInput();

        await page.locator(PageTY10901.selectors.searchButton).click();
        await page.waitForTimeout(500);
        
        await snapExpect();
        await PageTY10901.verifyValidateMessageByLabel(Labels.DATE, ErrorMessages.DATE_FORMAT);
    });

    test('WTY10901_19', async ({ 
        page,
        snapInput,
        snapExpect,
     }) => {
        await PageTY10901.navigate();
        
        // Switch to 見積 mode
        await page.locator('label', { hasText: Labels.ESTIMATE }).click();

        // Step 1 & 2: Fill FROM date with 2026/02/01
        await PageTY10901.fillkknDateDate(TestData.DATE_FROM);
        await PageTY10901.fillkknDate_secondDate(TestData.DATE_TO);
        await snapInput();

        // Click search button to trigger validation
        await page.locator(PageTY10901.selectors.searchButton).click();
        await page.waitForTimeout(500);
        
        // Verify error message
        await snapExpect();
        await PageTY10901.verifyValidateMessageByLabel(Labels.DATE, ErrorMessages.DATE_RANGE);
    });

    test('WTY10901_20', async ({ 
        page,
        baseUrl, 
        indexedDBHelper,
        snapInput,
        snapExpect,
     }) => {
        const testData = loadTestData('TY109/wty10901', 'wty10901', 'TC_03');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: testData.commonData,
        });

        await PageTY10901.navigate();

        await snapInput();

        await page.locator(PageTY10901.selectors.searchButton).click();
        
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);
        
        const errorMessages = await page.locator('p.text-red-600').count();
        expect(errorMessages).toBe(0);
        
        await snapExpect();
    });
}); 