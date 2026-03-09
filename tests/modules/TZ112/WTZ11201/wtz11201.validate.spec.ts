import { expect, test } from "../../../base/base-test";
import { WTZ11201Page } from "../../../pages/tz112/wtz11201.page";

const VALIDATION_LABELS = {
    TEL_NO: "電話番号",
    KOK_NAME_KANA: "顧客名カナ",
    KOK_CD: "顧客コード",
};

const VALIDATION_MESSAGES = {
    TEL_NO_RANGE: "電話番号は9～11桁で入力してください。",
    HALF_WIDTH_REQUIRED: "半角で入力してください。",
    KOK_CD_MAX_20: "顧客コードは20桁以内で入力してください。",
    KOK_CD_10_OR_12: "顧客コードは10・12桁で入力してください。",
    FIRST_DIGIT_ALPHA: "1桁目は半角英字で入力してください。",
    ALPHA_OR_NUMERIC: "アルファベットまたは数値で入力してください。",
    KAN_NO_DIGITS: "会員番号は7・8・12・20桁で入力してください。",
};

test.describe('WTZ11201 Validation Tests', () => {
    let PageWTZ11201: WTZ11201Page;
    
    test.beforeEach(async ({ page }) => {
        PageWTZ11201 = new WTZ11201Page(page);
        await PageWTZ11201.navigate();
    });
    
    test('WTZ11201_32', async ({
        page,
        snapInput,
        snapExpect,
     }) => {
        await PageWTZ11201.navigate();
        
        await page.locator(PageWTZ11201.selectors.telNoInput).fill('1234');
        await snapInput();

        await page.locator(PageWTZ11201.selectors.searchButton).click();

        await PageWTZ11201.verifyValidateMessageByLabel(VALIDATION_LABELS.TEL_NO, VALIDATION_MESSAGES.TEL_NO_RANGE);
        await snapExpect();
    });

    test('WTZ11201_34', async ({
        page, 
        snapInput,
        snapExpect,
     }) => {
        await PageWTZ11201.navigate();

        await page.locator(PageWTZ11201.selectors.kokNameKanaInput).fill('タナカ');
        await snapInput();

        await page.locator(PageWTZ11201.selectors.searchButton).click();

        await PageWTZ11201.verifyValidateMessageByLabel(VALIDATION_LABELS.KOK_NAME_KANA, VALIDATION_MESSAGES.HALF_WIDTH_REQUIRED);
        await snapExpect();
    })

    test('WTZ11201_35', async ({
        page, 
        snapInput,
        snapExpect,
     }) => {
        await PageWTZ11201.navigate();

        await page.locator(PageWTZ11201.selectors.kokCdInput).fill('123456789012345678901');
        await snapInput();

        await page.locator(PageWTZ11201.selectors.searchButton).click();

        await PageWTZ11201.verifyValidateMessageByLabel(VALIDATION_LABELS.KOK_CD, VALIDATION_MESSAGES.KOK_CD_MAX_20);
        await snapExpect();
     });

    test('WTZ11201_36', async ({
        page, 
        snapInput,
        snapExpect,
     }) => {
        await PageWTZ11201.navigate();

        await page.locator(PageWTZ11201.selectors.kokCdInput).fill('12345');
        await snapInput();

        await page.locator(PageWTZ11201.selectors.searchButton).click();

        await PageWTZ11201.verifyValidateMessageByLabel(VALIDATION_LABELS.KOK_CD, VALIDATION_MESSAGES.KOK_CD_10_OR_12);
        await snapExpect();
    });

    test('WTZ11201_37', async ({
        page, 
        snapInput,
        snapExpect,
     }) => {
        await PageWTZ11201.navigate();

        await page.locator(PageWTZ11201.selectors.kokCdInput).fill('1234567890');
        await snapInput();

        await page.locator(PageWTZ11201.selectors.searchButton).click();

        await PageWTZ11201.verifyValidateMessageByLabel(VALIDATION_LABELS.KOK_CD, VALIDATION_MESSAGES.FIRST_DIGIT_ALPHA);
        await snapExpect();
     });

    test('WTZ11201_38', async ({ 
        page,
        snapInput, 
        snapExpect 
    }) => {
        await PageWTZ11201.navigate();

        await page.locator(PageWTZ11201.selectors.kokCdInput).fill('A123@45678');
        await snapInput();

        await page.locator(PageWTZ11201.selectors.searchButton).click();

        await PageWTZ11201.verifyValidateMessageByLabel(VALIDATION_LABELS.KOK_CD, VALIDATION_MESSAGES.ALPHA_OR_NUMERIC);
        await snapExpect();
    });

    test('WTZ11201_41', async ({
        page, 
        snapInput,
        snapExpect,
     }) => {
        await PageWTZ11201.navigate();

        await page.locator(PageWTZ11201.selectors.kanNoInput).fill('A234');
        await snapInput();

        await page.locator(PageWTZ11201.selectors.searchButton).click();

        await PageWTZ11201.verifyValidateMessageByLabel(VALIDATION_LABELS.KOK_CD, VALIDATION_MESSAGES.KAN_NO_DIGITS);
        await snapExpect();
    }); 

    test('WTZ11201_42', async ({
        page, 
        snapInput,
        snapExpect,
     }) => {
        await PageWTZ11201.navigate();

        await page.locator(PageWTZ11201.selectors.kanNoInput).fill('12345678');
        await snapInput();

        await page.locator(PageWTZ11201.selectors.searchButton).click();

        await PageWTZ11201.verifyValidateMessageByLabel(VALIDATION_LABELS.KOK_CD, VALIDATION_MESSAGES.FIRST_DIGIT_ALPHA);
        await snapExpect();
    });

    test('WTZ11201_43', async ({
        page, 
        snapInput,
        snapExpect,
     }) => {
        await PageWTZ11201.navigate();

        await page.locator(PageWTZ11201.selectors.kanNoInput).fill('A123456@7');
        await snapInput();

        await page.locator(PageWTZ11201.selectors.searchButton).click();

        await PageWTZ11201.verifyValidateMessageByLabel(VALIDATION_LABELS.KOK_CD, VALIDATION_MESSAGES.ALPHA_OR_NUMERIC);
        await snapExpect();
    }); 
});