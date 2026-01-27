/**
 * WTY31001 Test Suite
 */

import { test, expect, loadTestData } from "../../../base/base-test";
import { WTY31001Page } from "../../../pages/TY310/WTY31001/wty31001.page";
import { takeScreenshotOnFailure } from "../../../utils/common-helper";

test.describe("WTY31001 - 供給移動依頼商品入力 Test Suite", () => {
  let productInputPage: WTY31001Page;

  test.beforeEach(async ({ page, baseUrl }) => {
    productInputPage = new WTY31001Page(page);
  });

  test.afterEach(async ({ page }, testInfo) => {
    await takeScreenshotOnFailure(page, testInfo);
  });

  test("WTY31001_28", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Enter lowercase product code "a123" into 商品 field
    await productInputPage.fillProductInput("a123");
    await page.waitForTimeout(500);

    await snapInput();

    // Step 4: Blur the field
    await productInputPage.blurProductInput();
    await page.waitForTimeout(500);

    // Verify: Value is converted to uppercase
    const productValue = await productInputPage.getProductInputValue();
    expect(productValue).toBe("A123");
    await snapExpect();
  });

  test("WTY31001_29", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Leave 商品 field empty
    await productInputPage.fillProductInput("");
    await page.waitForTimeout(500);

    await snapInput();

    // Step 4: Click search button
    await productInputPage.clickSearchButton();
    await page.waitForTimeout(1000);

    // Verify: Error message text is correct
    const errorMessageSearch = await productInputPage.findMessageText();
    expect(errorMessageSearch).toBe(true);

    // Step 5: Try clicking confirm button with empty field
    await productInputPage.clickConfirmButton();
    await page.waitForTimeout(1000);

    // Verify: Error message text is correct
    const errorMessageConfirm = await productInputPage.findMessageText();
    expect(errorMessageConfirm).toBe(true);
    await snapExpect();
  });

  test("WTY31001_30", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Enter full-width characters into 商品 field
    await productInputPage.fillProductInput("ＡＢＣ１２３ａｂｃアイウえお");
    await page.waitForTimeout(500);
    await snapInput();

    // Step 4: Blur the field
    await productInputPage.blurProductInput();
    await page.waitForTimeout(500);

    // Verify: Full-width characters are converted to half-width
    const productValue = await productInputPage.getProductInputValue();
    expect(productValue).toBe("ABC123ABCｱｲｳｴｵ");
    await snapExpect();
  });

  test("WTY31001_31", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Enter number "10" into 良品依頼 field
    await productInputPage.fillRHinIriInput("10");
    await page.waitForTimeout(500);
    await snapInput();

    // Step 4: Blur the field
    await productInputPage.blurRHinIriInput();
    await page.waitForTimeout(500);

    // Verify: Value is formatted correctly
    const rHinIriValue = await productInputPage.getRHinIriInputValue();
    expect(rHinIriValue).toBe("10");

    // Verify: No error message is displayed
    const isErrorVisible =
      await productInputPage.getFieldErrorMessage("良品依頼");
    expect(isErrorVisible).toBe("");
    await snapExpect();
  });

  test("WTY31001_32", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Try to enter non-numeric characters into 良品依頼 field
    await productInputPage.fillRHinIriInput("abc");
    await page.waitForTimeout(500);
    await snapInput();

    // Step 4: Blur the field
    await productInputPage.blurRHinIriInput();
    await page.waitForTimeout(500);

    // Verify: Non-numeric characters are not allowed
    const rHinIriValue = await productInputPage.getRHinIriInputValue();
    expect(rHinIriValue).not.toBe("abc");
    await snapExpect();
  });

  test("WTY31001_33", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Enter "0" into 良品依頼 field
    await productInputPage.fillRHinIriInput("0");
    await page.waitForTimeout(500);
    await snapInput();

    // Step 4: Blur the field
    await productInputPage.blurRHinIriInput();
    await page.waitForTimeout(500);

    // Verify: Value "0" is accepted
    const rHinIriValue = await productInputPage.getRHinIriInputValue();
    expect(rHinIriValue).toBe("0");
    await snapExpect();
  });

  test("WTY31001_34", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Enter "99999" into 良品依頼 field
    await productInputPage.scrollToBottom();
    await productInputPage.fillRHinIriInput("99999");
    await page.waitForTimeout(500);
    await snapInput();

    // Step 4: Blur the field
    await productInputPage.blurRHinIriInput();
    await page.waitForTimeout(500);

    // Verify: Value "99999" is accepted
    const rHinIriValue = await productInputPage.getRHinIriInputValue();
    expect(rHinIriValue).toBe("99,999");
    await snapExpect();
  });

  test("WTY31001_35", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY310/wty31001", "wty31001", "TC_64");
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await productInputPage.fillProductInput(testData.formData.shnCd);
    await productInputPage.clickSearchButton();
    await page.waitForTimeout(1000);

    // Step 3: Enter number with more than 5 digits "1000000" into 良品依頼 field
    await productInputPage.scrollToBottom();
    await productInputPage.fillRHinIriInput("1000000");
    await page.waitForTimeout(500);
    await snapInput();

    // Step 4: Blur the field
    await productInputPage.blurRHinIriInput();
    await page.waitForTimeout(1000);

    // Step 5: Click confirm button
    await productInputPage.clickConfirmButton();
    await page.waitForTimeout(1000);

    // Verify: Error message is displayed
    const isErrorVisible = await productInputPage.getErrorMessageDialog();
    expect(isErrorVisible).toContain("良品依頼は5桁以内で入力してください。");
    await snapExpect();
  });

  test("WTY31001_36", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Enter number "10" into 展示依頼 field
    await productInputPage.scrollToBottom();
    await productInputPage.fillTenjiIriInput("10");
    await page.waitForTimeout(500);
    await snapInput();
    // Step 4: Blur the field
    await productInputPage.blurTenjiIriInput();
    await page.waitForTimeout(500);

    // Verify: Value is formatted correctly
    const tenjiIriValue = await productInputPage.getTenjiIriInputValue();
    expect(tenjiIriValue).toBe("10");

    // Verify: No error message is displayed
    const isErrorVisible =
      await productInputPage.getFieldErrorMessage("展示依頼");
    expect(isErrorVisible).toBe("");
    await snapExpect();
  });

  test("WTY31001_37", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Try to enter non-numeric characters into 展示依頼 field
    await productInputPage.scrollToBottom();
    await productInputPage.fillTenjiIriInput("abc");
    await page.waitForTimeout(500);
    await snapInput();

    // Step 4: Blur the field
    await productInputPage.blurTenjiIriInput();
    await page.waitForTimeout(500);

    // Verify: Non-numeric characters are not allowed
    const tenjiIriValue = await productInputPage.getTenjiIriInputValue();
    expect(tenjiIriValue).not.toBe("abc");
    await snapExpect();
  });

  test("WTY31001_38", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Enter "0" into 展示依頼 field
    await productInputPage.scrollToBottom();
    await productInputPage.fillTenjiIriInput("0");
    await page.waitForTimeout(500);
    await snapInput();

    // Step 4: Blur the field
    await productInputPage.blurTenjiIriInput();
    await page.waitForTimeout(500);

    // Verify: Value "0" is accepted
    const tenjiIriValue = await productInputPage.getTenjiIriInputValue();
    expect(tenjiIriValue).toBe("0");
    await snapExpect();
  });

  test("WTY31001_39", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Enter "99999" into 展示依頼 field
    await productInputPage.scrollToBottom();
    await productInputPage.fillTenjiIriInput("99999");
    await page.waitForTimeout(500);
    await snapInput();

    // Step 4: Blur the field
    await productInputPage.blurTenjiIriInput();
    await page.waitForTimeout(500);

    // Verify: Value "99999" is accepted
    const tenjiIriValue = await productInputPage.getTenjiIriInputValue();
    expect(tenjiIriValue).toBe("99,999");
    await snapExpect();
  });

  test("WTY31001_40", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY310/wty31001", "wty31001", "TC_64");
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await productInputPage.fillProductInput(testData.formData.shnCd);
    await productInputPage.clickSearchButton();
    await page.waitForTimeout(1000);

    // Step 3: Enter number with more than 5 digits "1000000" into 展示依頼 field
    await productInputPage.scrollToBottom();
    await productInputPage.fillTenjiIriInput("1000000");
    await page.waitForTimeout(500);
    await snapInput();

    // Step 4: Blur the field
    await productInputPage.blurTenjiIriInput();
    await page.waitForTimeout(1000);

    // Step 5: Click confirm button
    await productInputPage.clickConfirmButton();
    await page.waitForTimeout(1000);

    // Verify: Error message is displayed
    const isErrorVisible = await productInputPage.getErrorMessageDialog();
    expect(isErrorVisible).toContain("展示依頼は5桁以内で入力してください。");
    await snapExpect();
  });

  test("WTY31001_41", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Enter number "10" into 定数依頼 field
    await productInputPage.scrollToBottom();
    await productInputPage.fillTSuIriInput("10");
    await page.waitForTimeout(500);
    await snapInput();

    // Step 4: Blur the field
    await productInputPage.blurTSuIriInput();
    await page.waitForTimeout(500);

    // Verify: Value is formatted correctly
    const tSuIriValue = await productInputPage.getTSuIriInputValue();
    expect(tSuIriValue).toBe("10");

    // Verify: No error message is displayed
    const isErrorVisible =
      await productInputPage.getFieldErrorMessage("定数依頼");
    expect(isErrorVisible).toBe("");
    await snapExpect();
  });

  test("WTY31001_42", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Try to enter non-numeric characters into 定数依頼 field
    await productInputPage.scrollToBottom();
    await productInputPage.fillTSuIriInput("abc");
    await page.waitForTimeout(500);
    await snapInput();

    // Step 4: Blur the field
    await productInputPage.blurTSuIriInput();
    await page.waitForTimeout(500);

    // Verify: Non-numeric characters are not allowed
    const tSuIriValue = await productInputPage.getTSuIriInputValue();
    expect(tSuIriValue).not.toBe("abc");
    await snapExpect();
  });

  test("WTY31001_43", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Enter "0" into 定数依頼 field
    await productInputPage.scrollToBottom();
    await productInputPage.fillTSuIriInput("0");
    await page.waitForTimeout(500);
    await snapInput();

    // Step 4: Blur the field
    await productInputPage.blurTSuIriInput();
    await page.waitForTimeout(500);

    // Verify: Value "0" is accepted
    const tSuIriValue = await productInputPage.getTSuIriInputValue();
    expect(tSuIriValue).toBe("0");
    await snapExpect();
  });

  test("WTY31001_44", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Enter "99999" into 定数依頼 field
    await productInputPage.scrollToBottom();
    await productInputPage.fillTSuIriInput("99999");
    await page.waitForTimeout(500);
    await snapInput();

    // Step 4: Blur the field
    await productInputPage.blurTSuIriInput();
    await page.waitForTimeout(500);

    // Verify: Value "99999" is accepted
    const tSuIriValue = await productInputPage.getTSuIriInputValue();
    expect(tSuIriValue).toBe("99,999");
    await snapExpect();
  });

  test("WTY31001_45", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY310/wty31001", "wty31001", "TC_64");
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await productInputPage.fillProductInput(testData.formData.shnCd);
    await productInputPage.clickSearchButton();
    await page.waitForTimeout(1000);

    // Step 3: Enter number with more than 5 digits "1000000" into 定数依頼 field
    await productInputPage.scrollToBottom();
    await productInputPage.fillTSuIriInput("1000000");
    await page.waitForTimeout(500);
    await snapInput();

    // Step 4: Blur the field
    await productInputPage.blurTSuIriInput();
    await page.waitForTimeout(1000);

    // Step 5: Click confirm button
    await productInputPage.clickConfirmButton();
    await page.waitForTimeout(1000);

    // Verify: Error message is displayed
    const isErrorVisible = await productInputPage.getErrorMessageDialog();
    expect(isErrorVisible).toContain("定数依頼は5桁以内で入力してください。");
    await snapExpect();
  });

  test("WTY31001_46", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Enter number "10" into 基礎依頼 field
    await productInputPage.scrollToBottom();
    await productInputPage.fillKisoIriInput("10");
    await page.waitForTimeout(500);
    await snapInput();

    // Step 4: Blur the field
    await productInputPage.blurKisoIriInput();
    await page.waitForTimeout(500);

    // Verify: Value is formatted correctly
    const kisoIriValue = await productInputPage.getKisoIriInputValue();
    expect(kisoIriValue).toBe("10");

    // Verify: No error message is displayed
    const isErrorVisible =
      await productInputPage.getFieldErrorMessage("基礎依頼");
    expect(isErrorVisible).toBe("");
    await snapExpect();
  });

  test("WTY31001_47", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Try to enter non-numeric characters into 基礎依頼 field
    await productInputPage.scrollToBottom();
    await productInputPage.fillKisoIriInput("abc");
    await page.waitForTimeout(500);
    await snapInput();

    // Step 4: Blur the field
    await productInputPage.blurKisoIriInput();
    await page.waitForTimeout(500);

    // Verify: Non-numeric characters are not allowed
    const kisoIriValue = await productInputPage.getKisoIriInputValue();
    expect(kisoIriValue).not.toBe("abc");
    await snapExpect();
  });

  test("WTY31001_48", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Enter "0" into 基礎依頼 field
    await productInputPage.scrollToBottom();
    await productInputPage.fillKisoIriInput("0");
    await page.waitForTimeout(500);
    await snapInput();

    // Step 4: Blur the field
    await productInputPage.blurKisoIriInput();
    await page.waitForTimeout(500);

    // Verify: Value "0" is accepted
    const kisoIriValue = await productInputPage.getKisoIriInputValue();
    expect(kisoIriValue).toBe("0");
    await snapExpect();
  });

  test("WTY31001_49", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Enter "99999" into 基礎依頼 field
    await productInputPage.scrollToBottom();
    await productInputPage.fillKisoIriInput("99999");
    await page.waitForTimeout(500);
    await snapInput();

    // Step 4: Blur the field
    await productInputPage.blurKisoIriInput();
    await page.waitForTimeout(500);

    // Verify: Value "99999" is accepted
    const kisoIriValue = await productInputPage.getKisoIriInputValue();
    expect(kisoIriValue).toBe("99,999");
    await snapExpect();
  });

  test("WTY31001_50", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY310/wty31001", "wty31001", "TC_64");
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await productInputPage.fillProductInput(testData.formData.shnCd);
    await productInputPage.clickSearchButton();
    await page.waitForTimeout(1000);

    // Step 3: Enter number with more than 5 digits "1000000" into 基礎依頼 field
    await productInputPage.scrollToBottom();
    await productInputPage.fillKisoIriInput("1000000");
    await page.waitForTimeout(500);

    // Step 4: Blur the field
    await productInputPage.blurKisoIriInput();
    await page.waitForTimeout(1000);
    await snapInput();

    // Step 5: Click confirm button
    await productInputPage.clickConfirmButton();
    await page.waitForTimeout(1000);

    // Verify: Error message is displayed
    const isErrorVisible = await productInputPage.getErrorMessageDialog();
    expect(isErrorVisible).toContain("基礎依頼は5桁以内で入力してください。");
    await snapExpect();
  });
});
