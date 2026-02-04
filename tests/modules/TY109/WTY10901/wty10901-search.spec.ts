import { test, expect, loadTestData } from '../../../base/base-test';
import { TY10901Page } from '../../../pages/TY109/wty10901.page';

// Constants
const Messages = {
    INPUT_REQUIRED: '事前売上番号、担当者、顧客のいずれかを入力',
    NO_PRESALE_INFO: '該当する事前売上情報が存在しません。',
    CUSTOMER_NOT_FOUND: '顧客情報が存在しません。',
    NUMERIC_INPUT_REQUIRED: '数値で入力してください。',
};

const TestData = {
    INVALID_NUMBER: '99999',
    VALID_NUMBER: '00001',
    VALID_CUSTOMER_CODE: 'AA1010174728',
    LONG_NUMBER: '12345678901234',
    INVALID_CUSTOMER_CODE: '999999999999',
    TEXT_INPUT: 'abcde',
    DATE_FROM: '2026/02/01',
    DATE_TO: '2026/01/01',
};

const Labels = {
    ESTIMATE: '見積',
    NUMBER: '番号',
};

test.describe('WTY10901 Search Tests', () => {
    let PageTY10901: TY10901Page;

    test.beforeEach(async ({ page }) => {
        PageTY10901 = new TY10901Page(page);
    });

    test('WTY10901_37', async ({ 
        page,
        snapExpect,
     }) => {
        await PageTY10901.navigate();

        await page.click(PageTY10901.selectors.tanCdInput);
        await page.fill(PageTY10901.selectors.tanCdInput, '');

        await page.locator(PageTY10901.selectors.searchButton).click();
        await page.waitForTimeout(500);
        
        await snapExpect();
        await expect(
            page.locator(PageTY10901.selectors.errorValidateDialog)
        ).toContainText(Messages.INPUT_REQUIRED);
    });

    test('WTY10901_38', async ({ 
        baseUrl,
        indexedDBHelper,
        page,
        snapExpect,
     }) => {
        const testData = loadTestData('TY109/wty10901', 'wty10901', 'TC_01');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: testData.commonData,
        });

        await PageTY10901.navigate();

        await page.click(PageTY10901.selectors.uriNoInput);
        await page.fill(PageTY10901.selectors.uriNoInput, TestData.INVALID_NUMBER);

        await page.locator(PageTY10901.selectors.searchButton).click();
        await page.waitForTimeout(500);
        
        await snapExpect();
        await page.waitForTimeout(500);
        await expect(
            page.locator(PageTY10901.selectors.errorDialog)
        ).toContainText(Messages.NO_PRESALE_INFO);
    });

    test('WTY10901_53', async ({
        page,
        baseUrl, 
        indexedDBHelper,
        snapInput,
        snapExpect,
        }) => {
        const testData = loadTestData('TY109/wty10901', 'wty10901', 'TC_01');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: testData.commonData,
        });

        await PageTY10901.navigate();

        await page.fill(PageTY10901.selectors.uriNoInput, TestData.VALID_NUMBER);
        await page.fill(PageTY10901.selectors.kokCdInput, TestData.VALID_CUSTOMER_CODE);
        
        await PageTY10901.clickOutside();
        await page.waitForTimeout(1000);
        await snapInput();
        
        await PageTY10901.clickClearByInput(PageTY10901.selectors.uriNoId);
        await PageTY10901.clickClearByInput(PageTY10901.selectors.kokCdId);
        await PageTY10901.clickClearByInput(PageTY10901.selectors.tanCdId);
        
        await snapExpect();
        const expectUriNoValue = await PageTY10901.getValueById("uriNo");
        expect(expectUriNoValue).toBe('');

        const expectKokCdValue = await PageTY10901.getValueById("kokCd");
        expect(expectKokCdValue).toBe('');
        
        const expectTanCdValue = await PageTY10901.getValueById("tanCd");
        expect(expectTanCdValue).toBe('');
    }); 

    test('WTY10901_54', async ({
        page,
        baseUrl, 
        indexedDBHelper,
        snapInput,
        snapExpect,
        }) => {
        const testData = loadTestData('TY109/wty10901', 'wty10901', 'TC_01');
        
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: testData.commonData,
        });

        await PageTY10901.navigate();

        await page.locator('label', { hasText: Labels.ESTIMATE }).click();

        await page.fill(PageTY10901.selectors.uriNoInput, TestData.LONG_NUMBER);
        await page.fill(PageTY10901.selectors.kokCdInput, TestData.VALID_CUSTOMER_CODE);
        
        await PageTY10901.clickOutside();
        await page.waitForTimeout(1000);

        await PageTY10901.fillkknDateDate(TestData.DATE_FROM);
        await PageTY10901.fillkknDate_secondDate(TestData.DATE_TO);

        await snapInput();
        
        await PageTY10901.clickClearByInput(PageTY10901.selectors.uriNoId);
        await PageTY10901.clickClearByInput(PageTY10901.selectors.kokCdId);
        await PageTY10901.clickClearByInput(PageTY10901.selectors.tanCdId);
        await PageTY10901.clearDateTime("kknDateFrom");
        await PageTY10901.clearDateTime("kknDateTo");
        
        await page.waitForTimeout(1000);
        await snapExpect();
        const expectKokCdValue = await PageTY10901.getValueById("kokCd");
        expect(expectKokCdValue).toBe('');

        const expectUriNoValue = await PageTY10901.getValueById("uriNo");
        expect(expectUriNoValue).toBe('');

        const expectTanCdValue = await PageTY10901.getValueById("tanCd");
        expect(expectTanCdValue).toBe('');
        
        const expectKknDateFromValue = await PageTY10901.getValueByName('kknDateFrom');
        expect(expectKknDateFromValue).toBe('');

        const expectKknDateToValue = await PageTY10901.getValueByName('kknDateTo');
        expect(expectKknDateToValue).toBe('');
    })

    test('WTY10901_56', async ({
        page,
        baseUrl, 
        indexedDBHelper,
        snapInput,
        snapExpect,
        }) => {
        const testData = loadTestData('TY109/wty10901', 'wty10901', 'TC_01');
        
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: testData.commonData,
        });

        await PageTY10901.navigate();

        await page.fill(PageTY10901.selectors.uriNoInput, TestData.TEXT_INPUT);
        await snapInput();
        
        await page.locator(PageTY10901.selectors.searchButton).click();
        await page.waitForTimeout(500);
        await snapExpect();
        await page.waitForTimeout(500);
        await PageTY10901.verifyValidateMessageByLabel(Labels.NUMBER, Messages.NUMERIC_INPUT_REQUIRED);
    }); 

    test('WTY10901_57', async ({
        page,
        baseUrl, 
        indexedDBHelper,
        snapInput,
        snapExpect,
        }) => {
        const testData = loadTestData('TY109/wty10901', 'wty10901', 'TC_01');
        
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        
        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: testData.commonData,
        });

        await PageTY10901.navigate();
        
        await page.fill(PageTY10901.selectors.kokCdInput, TestData.INVALID_CUSTOMER_CODE);
        await snapInput();

        await PageTY10901.clickOutside();
        await page.waitForTimeout(500);

        await expect(
            page.locator(PageTY10901.selectors.errorDialog)
        ).toContainText(Messages.CUSTOMER_NOT_FOUND);
        await snapExpect();
    }); 
});