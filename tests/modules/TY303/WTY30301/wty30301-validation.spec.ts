import { test, expect, loadTestData } from "../../../base/base-test";
import { WTY30301_VALIDATION_MESSAGES } from "../../../constants/TY303/messages";
import { TY30301Page } from "../../../pages/TY303/wty30301.page";
import { takeScreenshotOnFailure } from "../../../utils/common-helper";

test.describe("WTY30301 - (マルチＰＯＰ出力指示)", () => {
  let summaryPage: TY30301Page;

  test.beforeEach(async ({ page, baseUrl }) => {
    summaryPage = new TY30301Page(page);
  });

  test.afterEach(async ({ page }, testInfo) => {
    await takeScreenshotOnFailure(page, testInfo);
  });

  test("WTY30301_90", async ({ page, baseUrl, indexedDBHelper, snapInput, snapExpect }) => {
    const testData = loadTestData("TY303/wty30301", "wty30301", "TC_05");

    // Navigate to WTY30301 screen
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });

    // Inject IndexedDB data AFTER page loaded
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // init screen with sbnFlg is 1
    await summaryPage.navigate();

    // click search with data init from onRestoreScreenInfo
    await summaryPage.clickButtonSearch();

    // clear Output Date field
    await summaryPage.clickClearOutputDateButton();
    await page.waitForTimeout(1000);
    await snapInput();

    // Click 確定 and verify error message
    const confirmButton = await summaryPage.findConfirmButton();
    await confirmButton.click();

    // verify error message
    const isErrorMessageCorrect = await summaryPage.checkValidateErrorMessage(
      WTY30301_VALIDATION_MESSAGES.OUTPUT_DATE_REQUIRED.message,
      WTY30301_VALIDATION_MESSAGES.OUTPUT_DATE_REQUIRED.msgId
    );
    expect(isErrorMessageCorrect).toBeTruthy();
    await snapExpect();
  });

  test("WTY30301_91", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY303/wty30301", "wty30301", "TC_05");

    // Navigate to WTY30301 screen
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });

    // Inject IndexedDB data AFTER page loaded
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // init screen with sbnFlg is 1
    await summaryPage.navigate();

    // click search with data init from onRestoreScreenInfo
    await summaryPage.clickButtonSearch();

    // fill Output invalid
    await summaryPage.fillOutputDate("00003232");
    await page.waitForTimeout(1000);
    await snapInput();

    // Click 確定 and verify error message
    const confirmButton = await summaryPage.findConfirmButton();
    await confirmButton.click();

    // verify error message
    const isErrorMessageCorrect = await summaryPage.checkValidateErrorMessage(
      WTY30301_VALIDATION_MESSAGES.INVALID_DATE_FORMAT.message,
      WTY30301_VALIDATION_MESSAGES.INVALID_DATE_FORMAT.msgId,
    );
    expect(isErrorMessageCorrect).toBeTruthy();
    await snapExpect();
  });

  test("WTY30301_92", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY303/wty30301", "wty30301", "TC_05");

    // Navigate to WTY30301 screen
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });

    // Inject IndexedDB data AFTER page loaded
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // init screen with sbnFlg is 1
    await summaryPage.navigate();

    await page.waitForTimeout(1000);
    await snapInput();

    // click search button
    const confirmButton = await summaryPage.findConfirmButton();
    await page.waitForTimeout(1000);
    await confirmButton.click();

    // verify error message
    const isErrorMessageCorrect = await summaryPage.checkValidateErrorMessage(
      WTY30301_VALIDATION_MESSAGES.PRODUCT_NOT_SEARCHED.message,
      WTY30301_VALIDATION_MESSAGES.PRODUCT_NOT_SEARCHED.msgId,
    );
    expect(isErrorMessageCorrect).toBeTruthy();
    await snapExpect();
  });

  test("WTY30301_93", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY303/wty30301", "wty30301", "TC_06");

    // Navigate to WTY30301 screen
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });

    // Inject IndexedDB data AFTER page loaded
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // init screen with data from WTY30303 and searching with data
    await summaryPage.navigate();
    await page.waitForTimeout(1000);

    // fill shnCd 
    await summaryPage.fillMerchandiseCd("4957812587815");
    await page.waitForTimeout(1000);
    await snapInput();

    // click save button
    const confirmButton = await summaryPage.findConfirmButton();
    await page.waitForTimeout(1000);
    await confirmButton.click();

    // verify error message
    const isErrorMessageCorrect = await summaryPage.checkValidateErrorMessage(
      WTY30301_VALIDATION_MESSAGES.PRODUCT_DOES_NOT_MATCH.message,
      WTY30301_VALIDATION_MESSAGES.PRODUCT_DOES_NOT_MATCH.msgId,
    );

    expect(isErrorMessageCorrect).toBeTruthy();
    await snapExpect();
  });

  test("WTY30301_94~97", async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
       const testData = loadTestData("TY303/wty30301", "wty30301", "TC_03");

      // Navigate to WTY30301 screen
      await page.goto(baseUrl, { waitUntil: "domcontentloaded" });

      // Inject IndexedDB data AFTER page loaded
      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData,
      });

      // init screen
      await summaryPage.navigate();
    
      const numberInputs = [
        'mockSuInput',
        'numberSheetsInput',
        'listedPriceInput',
        'finalSellingPriceInput',
      ] as const;
    
      const expectDigits: Record<string, number> = {
        "mockSuInput": 4,
        "numberSheetsInput": 4,
        "listedPriceInput": 8,
        "finalSellingPriceInput": 8,
      }
    
      for (const input of numberInputs) { 
        // Try to enter 5 digits (5桁) into Moc_TextBox
        const inputElement = await summaryPage.findInputs(input);
        await inputElement.click();
        await inputElement.fill("123456789"); // 9 digits for all inputs
        await page.waitForTimeout(1000);

        // Step 3: Verify that only 4 digits are allowed (blocked at input level)
        const actualValue = await inputElement.inputValue();
        expect(actualValue.length).toBeLessThanOrEqual(expectDigits[input]);
      }
    
      await snapExpect();
  });
  
  test("WTY30301_98", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY303/wty30301", "wty30301", "TC_06");

    // Navigate to WTY30301 screen
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });

    // Inject IndexedDB data AFTER page loaded
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // init screen with data from WTY30303 and searching with data
    await summaryPage.navigate();
    await page.waitForTimeout(1000);

    // fill 0 into keisaiKk - Tk_TextBox
    await summaryPage.fillFinalSellingPrice("0");
    await page.waitForTimeout(1000);
    await snapInput();

    // click save button
    const confirmButton = await summaryPage.findConfirmButton();
    await page.waitForTimeout(1000);
    await confirmButton.click();

    // verify error message
    const isErrorMessageCorrect = await summaryPage.checkValidateErrorMessage(
      WTY30301_VALIDATION_MESSAGES.FINAL_PRICE_CANNOT_BE_ZERO.message,
      WTY30301_VALIDATION_MESSAGES.FINAL_PRICE_CANNOT_BE_ZERO.msgId,
    );

    expect(isErrorMessageCorrect).toBeTruthy();
    await snapExpect();
  });

   test("WTY30301_99", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY303/wty30301", "wty30301", "TC_06");

    // Navigate to WTY30301 screen
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });

    // Inject IndexedDB data AFTER page loaded
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // init screen with data from WTY30303 and searching with data
    await summaryPage.navigate();
    await page.waitForTimeout(1000);

    // fill 0 into keisaiKk - Tk_TextBox
    await summaryPage.fillListedPrice("0");
    await page.waitForTimeout(1000);
    await snapInput();

    // click save button
    const confirmButton = await summaryPage.findConfirmButton();
    await page.waitForTimeout(1000);
    await confirmButton.click();

    // verify error message
    const isErrorMessageCorrect = await summaryPage.checkValidateErrorMessage(
      WTY30301_VALIDATION_MESSAGES.LISTED_PRICE_CANNOT_BE_ZERO.message,
      WTY30301_VALIDATION_MESSAGES.LISTED_PRICE_CANNOT_BE_ZERO.msgId,
    );

    expect(isErrorMessageCorrect).toBeTruthy();
    await snapExpect();
   });
  
  test("WTY30301_100", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY303/wty30301", "wty30301", "TC_06");

    // Navigate to WTY30301 screen
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });

    // Inject IndexedDB data AFTER page loaded
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // init screen with data from WTY30303 and searching with data
    await summaryPage.navigate();
    await page.waitForTimeout(1000);

    // fill 0 into keisaiKk - Tk_TextBox
    await summaryPage.fillSize("");
    await page.waitForTimeout(1000);
    await snapInput();

    // click save button
    const confirmButton = await summaryPage.findConfirmButton();
    await page.waitForTimeout(1000);
    await confirmButton.click();

    // verify error message
    const isErrorMessageCorrect = await summaryPage.checkValidateErrorMessage(
      WTY30301_VALIDATION_MESSAGES.SIZE_REQUIRED.message,
      WTY30301_VALIDATION_MESSAGES.SIZE_REQUIRED.msgId,
    );

    expect(isErrorMessageCorrect).toBeTruthy();
    await snapExpect();
  });

  test("WTY30301_101", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY303/wty30301", "wty30301", "TC_06");

    // Navigate to WTY30301 screen
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });

    // Inject IndexedDB data AFTER page loaded
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // init screen with data from WTY30303 and searching with data
    await summaryPage.navigate();
    await page.waitForTimeout(1000);

    // fill 0 into cmtKbn - Cmt_CombBox
    await summaryPage.fillMultiCmment("");
    await page.waitForTimeout(1000);
    await snapInput();

    // click save button
    const confirmButton = await summaryPage.findConfirmButton();
    await page.waitForTimeout(1000);
    await confirmButton.click();

    // verify error message
    const isErrorMessageCorrect = await summaryPage.checkValidateErrorMessage(
      WTY30301_VALIDATION_MESSAGES.MULTI_COMMENT_REQUIRED.message,
      WTY30301_VALIDATION_MESSAGES.MULTI_COMMENT_REQUIRED.msgId,
    );

    expect(isErrorMessageCorrect).toBeTruthy();
    await snapExpect();
  });

  test("WTY30301_102", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY303/wty30301", "wty30301", "TC_06");

    // Navigate to WTY30301 screen
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });

    // Inject IndexedDB data AFTER page loaded
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // init screen with data from WTY30303 and searching with data
    await summaryPage.navigate();
    await page.waitForTimeout(1000);

    // select cmtKbn - Cmt_CombBox is 1
    await summaryPage.fillMultiCmment("1");
    await page.waitForTimeout(1000);
    await snapInput();

    // fill 掲載価格 ≠ 最終売価
    await summaryPage.fillListedPrice("999"); // 掲載価格 ≠ 最終売価
    await summaryPage.fillFinalSellingPrice("1000");
    await snapInput();

    // click save button
    const confirmButton = await summaryPage.findConfirmButton();
    await page.waitForTimeout(1000);
    await confirmButton.click();

    // verify error message
    const isErrorMessageCorrect = await summaryPage.checkValidateErrorMessage(
      WTY30301_VALIDATION_MESSAGES.PRICE_MISMATCH.message,
      WTY30301_VALIDATION_MESSAGES.PRICE_MISMATCH.msgId
    );

    expect(isErrorMessageCorrect).toBeTruthy();
    await snapExpect();
  });

  test("WTY30301_103", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY303/wty30301", "wty30301", "TC_06");

    // Navigate to WTY30301 screen
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });

    // Inject IndexedDB data AFTER page loaded
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // init screen with data from WTY30303 and searching with data
    await summaryPage.navigate();
    await page.waitForTimeout(1000);

    // select cmtKbn - Cmt_CombBox is 3
    await summaryPage.fillMultiCmment("3");

    // fill 掲載価格 ≤ 最終売価
    await summaryPage.fillListedPrice("1000"); // 掲載価格 ≤ 最終売価
    await summaryPage.fillFinalSellingPrice("1000");
    await page.waitForTimeout(1000);
    await snapInput(1);

    // click save button
    const confirmButton = await summaryPage.findConfirmButton();
    await page.waitForTimeout(1000);
    await confirmButton.click();

    // verify error message
    let isErrorMessageCorrect = await summaryPage.checkValidateErrorMessage(
      WTY30301_VALIDATION_MESSAGES.LISTED_PRICE_MUST_BE_GREATER.message,
      WTY30301_VALIDATION_MESSAGES.LISTED_PRICE_MUST_BE_GREATER.msgId
    );

    expect(isErrorMessageCorrect).toBeTruthy();
    await snapExpect(1);

    await summaryPage.closeErrorDialog();

    // fill 掲載価格 ≤ 最終売価
    await summaryPage.fillListedPrice("999"); // 掲載価格 ≤ 最終売価
    await summaryPage.fillFinalSellingPrice("1000");
    await snapInput(2);

    // click save button
    await page.waitForTimeout(1000);
    await confirmButton.click();

    // verify error message
    isErrorMessageCorrect = await summaryPage.checkValidateErrorMessage(
      WTY30301_VALIDATION_MESSAGES.LISTED_PRICE_MUST_BE_GREATER.message,
      WTY30301_VALIDATION_MESSAGES.LISTED_PRICE_MUST_BE_GREATER.msgId
    );

    expect(isErrorMessageCorrect).toBeTruthy();
    await snapExpect(2);
    
  });

  test("WTY30301_104", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY303/wty30301", "wty30301", "TC_06");

    // Navigate to WTY30301 screen
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });

    // Inject IndexedDB data AFTER page loaded
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // init screen with data from WTY30303 and searching with data
    await summaryPage.navigate();
    await page.waitForTimeout(1000);

    // select cmtKbn - Cmt_CombBox is 1
    await summaryPage.fillMultiCmment("1");
    await snapInput();
    await page.waitForTimeout(1000);

    // fill 掲載価格 > 最終売価
    await summaryPage.fillListedPrice("99999999"); // 掲載価格 > 最終売価
    await snapInput();

    // click save button
    const confirmButton = await summaryPage.findConfirmButton();
    await page.waitForTimeout(1000);
    await confirmButton.click();

    // verify error message
    const isErrorMessageCorrect = await summaryPage.checkValidateErrorMessage(
      WTY30301_VALIDATION_MESSAGES.PRICE_MISMATCH.message,
      WTY30301_VALIDATION_MESSAGES.PRICE_MISMATCH.msgId
    );

    expect(isErrorMessageCorrect).toBeTruthy();
    await snapExpect();
  });

});
