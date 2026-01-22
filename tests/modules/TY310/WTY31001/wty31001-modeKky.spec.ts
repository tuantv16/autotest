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

  test("WTY31001_49", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Initially in 返品 mode, click 供給 radio
    await productInputPage.clickHpnRadio();
    await page.waitForTimeout(500);

    // Step 4: Switch to 供給 mode
    await productInputPage.clickKkyRadio();
    await page.waitForTimeout(1000);

    // Verify: Check title page
    const titlePage = await productInputPage.getTitlePage();
    expect(titlePage).toBe("供給依頼商品登録");

    // Verify: 供給 radio is checked
    const isKkyChecked = await productInputPage.isKkyRadioChecked();
    expect(isKkyChecked).toBe(true);

    // Verify: 開梗依頼 field is not visible
    const isKaikonIriVisible = await productInputPage.isKaikonIriInputVisible();
    expect(isKaikonIriVisible).toBe(false);

    // Verify: Labels and input borders are default color
    await productInputPage.expectAllLabelsNotRed({
      exclude: ["kaikon", "kaikonIri"],
    });
    await productInputPage.expectAllInputBordersNotRed({
      exclude: ["kaikon", "kaikonIri"],
    });
  });

  test("WTY31001_50", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001 (default 供給 mode)
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Enter data in 供給 mode
    await productInputPage.fillProductInput("TEST123");
    await productInputPage.fillRHinIriInput("10");
    await productInputPage.fillTenjiIriInput("20");
    await productInputPage.fillTSuIriInput("30");
    await productInputPage.fillKisoIriInput("40");
    await page.waitForTimeout(500);

    // Step 4: Switch to 返品 mode
    await productInputPage.clickHpnRadio();
    await page.waitForTimeout(1000);

    // Step 5: Switch back to 供給 mode
    await productInputPage.clickKkyRadio();
    await page.waitForTimeout(1000);

    // Verify: All fields are reset (empty)
    const productValue = await productInputPage.getProductInputValue();
    const rHinIriValue = await productInputPage.getRHinIriInputValue();
    const tenjiIriValue = await productInputPage.getTenjiIriInputValue();
    const tSuIriValue = await productInputPage.getTSuIriInputValue();
    const kisoIriValue = await productInputPage.getKisoIriInputValue();

    expect(productValue).toBe("");
    expect(rHinIriValue).toBe("");
    expect(tenjiIriValue).toBe("");
    expect(tSuIriValue).toBe("");
    expect(kisoIriValue).toBe("");

    // Verify: 開梗依頼 field is hidden
    const isKaikonIriVisible = await productInputPage.isKaikonIriInputVisible();
    expect(isKaikonIriVisible).toBe(false);
  });

  test("WTY31001_51", async ({ page, baseUrl, indexedDBHelper }) => {
    const testData = loadTestData("TY310/wty31001", "wty31001", "TC_51");
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

    // Step 3: Enter valid product code
    await productInputPage.fillProductInput("00010013557");
    await page.waitForTimeout(500);

    // Step 4: Click search button
    await productInputPage.clickSearchButton();
    await page.waitForTimeout(1000);

    // Verify: Product information is displayed
    const kataValue = await productInputPage.getKataInputValue();
    const mkValue = await productInputPage.getMkInputValue();
    const rnkValue = await productInputPage.getRnkInputValue();
    const bKbnValue = await productInputPage.getBKbnInputValue();
    const shnNmValue = await productInputPage.getShnNmInputValue();
    const hbJsk4Value = await productInputPage.getHbJsk4InputValue();
    const hbJsk3Value = await productInputPage.getHbJsk3InputValue();
    const hbJsk2Value = await productInputPage.getHbJsk2InputValue();
    const hbJsk1Value = await productInputPage.getHbJsk1InputValue();

    expect(kataValue).toBe(testData.expected.kata);
    expect(mkValue).toBe(testData.expected.mk);
    expect(rnkValue).toBe(testData.expected.rnk);
    expect(bKbnValue).toBe(testData.expected.bKbn);
    expect(shnNmValue).toBe(testData.expected.shnNm);
    expect(hbJsk4Value).toBe(testData.expected.hbJsk4);
    expect(hbJsk3Value).toBe(testData.expected.hbJsk3);
    expect(hbJsk2Value).toBe(testData.expected.hbJsk2);
    expect(hbJsk1Value).toBe(testData.expected.hbJsk1);
  });

  test("WTY31001_52", async ({ page, baseUrl, indexedDBHelper }) => {
    const testData = loadTestData("TY310/wty31001", "wty31001", "TC_51");
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

    // Step 3: Enter JAN code (13 digits)
    await productInputPage.fillProductInput("04962458558440");
    await page.waitForTimeout(500);

    // Step 4: Click search button
    await productInputPage.clickSearchButton();
    await page.waitForTimeout(2000);

    // Verify: Search works with JAN code
    // Verify: Product information is displayed
    const kataValue = await productInputPage.getKataInputValue();
    const mkValue = await productInputPage.getMkInputValue();
    const rnkValue = await productInputPage.getRnkInputValue();
    const bKbnValue = await productInputPage.getBKbnInputValue();
    const shnNmValue = await productInputPage.getShnNmInputValue();
    const hbJsk4Value = await productInputPage.getHbJsk4InputValue();
    const hbJsk3Value = await productInputPage.getHbJsk3InputValue();
    const hbJsk2Value = await productInputPage.getHbJsk2InputValue();
    const hbJsk1Value = await productInputPage.getHbJsk1InputValue();

    expect(kataValue).toBe(testData.expected.kata);
    expect(mkValue).toBe(testData.expected.mk);
    expect(rnkValue).toBe(testData.expected.rnk);
    expect(bKbnValue).toBe(testData.expected.bKbn);
    expect(shnNmValue).toBe(testData.expected.shnNm);
    expect(hbJsk4Value).toBe(testData.expected.hbJsk4);
    expect(hbJsk3Value).toBe(testData.expected.hbJsk3);
    expect(hbJsk2Value).toBe(testData.expected.hbJsk2);
    expect(hbJsk1Value).toBe(testData.expected.hbJsk1);
  });

  test("WTY31001_53", async ({ page, baseUrl, indexedDBHelper }) => {
    const testData = loadTestData("TY310/wty31001", "wty31001", "TC_51");
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

    // Step 3: Enter non-existent product code
    await productInputPage.fillProductInput("00010013555");
    await page.waitForTimeout(500);

    // Step 4: Click search button
    await productInputPage.clickSearchButton();
    await page.waitForTimeout(2000);

    // Verify: Error message is displayed
    const errorMessage = await productInputPage.getErrorMessageDialog();
    expect(errorMessage).toContain("TE5136");
    expect(errorMessage).toContain("商品情報が存在しません。");
  });

  test("WTY31001_55", async ({ page, baseUrl, indexedDBHelper }) => {
    const testData = loadTestData("TY310/wty31001", "wty31001", "TC_51");
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

    // Step 3: Enter product code
    await productInputPage.fillProductInput("00010013557");
    await page.waitForTimeout(500);

    // Step 5: Click confirm button
    await productInputPage.clickConfirmButton();
    await page.waitForTimeout(1000);

    // Verify: Error message is displayed
    const errorMessage = await productInputPage.getErrorMessageDialog();
    expect(errorMessage).toContain("TE5137");
    expect(errorMessage).toContain("依頼指示を設定してください。");
  });

  test("WTY31001_56", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Enter some data in 定数依頼 and 基礎依頼
    await productInputPage.fillTSuIriInput("100");
    await productInputPage.fillKisoIriInput("200");
    await page.waitForTimeout(500);

    // Step 4: Toggle 定数削除 = ON
    const initialState = await productInputPage.getTsuDelToggleState();
    if (!initialState) {
      await productInputPage.clickTsuDelToggle();
    }
    await page.waitForTimeout(1000);

    // Verify: 定数削除 is ON
    const toggleState = await productInputPage.getTsuDelToggleState();
    expect(toggleState).toBe(!initialState);

    // Verify: 定数依頼 and 基礎依頼 should be disabled
    const tSuIriDisabled = await productInputPage.tSuIriInputIsDisabled();
    const kisoIriDisabled = await productInputPage.kisoIriInputIsDisabled();
    expect(tSuIriDisabled).toBe(true);
    expect(kisoIriDisabled).toBe(true);

    // Verify: 定数依頼 and 基礎依頼 values are cleared
    const tSuIriValue = await productInputPage.getTSuIriInputValue();
    const kisoIriValue = await productInputPage.getKisoIriInputValue();
    expect(tSuIriValue).toBe("");
    expect(kisoIriValue).toBe("");
  });

  test("WTY31001_57", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Toggle 定数削除 = ON first
    const initialState = await productInputPage.getTsuDelToggleState();
    if (!initialState) {
      await productInputPage.clickTsuDelToggle();
      await page.waitForTimeout(500);
    }

    // Step 4: Toggle 定数削除 = OFF
    await productInputPage.clickTsuDelToggle();
    await page.waitForTimeout(500);

    // Verify: 定数削除 is OFF
    const toggleState = await productInputPage.getTsuDelToggleState();
    expect(toggleState).toBe(initialState);

    // Verify: 定数依頼 and 基礎依頼 should be enabled
    const tSuIriEditable = await productInputPage.tSuIriInputIsEditable();
    const kisoIriEditable = await productInputPage.kisoIriInputIsEditable();
    expect(tSuIriEditable).toBe(true);
    expect(kisoIriEditable).toBe(true);
  });

  test("WTY31001_60", async ({ page, baseUrl, indexedDBHelper }) => {
    const testData = loadTestData("TY310/wty31001", "wty31001", "TC_51");
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

    // Step 3: Enter 型番 (model code)
    await productInputPage.fillProductInput("000100136");
    await page.waitForTimeout(500);

    // Step 4: Click search button
    const [newPage] = await Promise.all([
      page.context().waitForEvent("page"),
      productInputPage.clickSearchButton(),
    ]);

    // Verify: New tab is opened with WTZ10101
    await newPage.waitForLoadState("domcontentloaded");
    expect(newPage.url()).toContain("WTZ10101");
  });

  test("WTY31001_61", async ({ page, baseUrl, indexedDBHelper }) => {
    const testData = loadTestData("TY310/wty31001", "wty31001", "TC_51");
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(500);

    // Step 3: Click on 商品 field to focus
    await productInputPage.focusProductInput();
    await page.waitForTimeout(1000);

    const isVisible = await productInputPage.searchProductButtonVisible();
    expect(isVisible).toBe(true);

    const [newPage] = await Promise.all([
      page.context().waitForEvent("page"),
      productInputPage.clickSearchProductButton(),
    ]);

    // Verify: New tab is opened with WTZ10101
    await newPage.waitForLoadState("domcontentloaded");
    expect(newPage.url()).toContain("WTZ10101");
  });
});
