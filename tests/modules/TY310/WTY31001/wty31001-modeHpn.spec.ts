/**
 * WTY31001 Test Suite - 返品 Mode
 */

import { test, expect, loadTestData } from "../../../base/base-test";
import { WTY31001Page } from "../../../pages/TY310/WTY31001/wty31001.page";
import { takeScreenshotOnFailure } from "../../../utils/common-helper";

test.describe("WTY31001 - 供給移動依頼商品入力 (返品 Mode) Test Suite", () => {
  let productInputPage: WTY31001Page;

  test.beforeEach(async ({ page, baseUrl }) => {
    productInputPage = new WTY31001Page(page);
  });

  test.afterEach(async ({ page }, testInfo) => {
    await takeScreenshotOnFailure(page, testInfo);
  });

  test("WTY31001_62", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001 (default 供給 mode)
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Verify: Default mode is 供給
    const kkyRadioChecked = await productInputPage.isKkyRadioChecked();
    expect(kkyRadioChecked).toBe(true);

    // Step 3: Switch to 返品 mode
    await productInputPage.clickHpnRadio();
    await page.waitForTimeout(500);

    // Verify: UI switches to 返品 mode correctly
    const hpnRadioChecked = await productInputPage.isHpnRadioChecked();
    expect(hpnRadioChecked).toBe(true);

    // Verify: Title label changes to "返品依頼商品登録"
    const titlePage = await productInputPage.getTitlePage();
    expect(titlePage).toContain("返品依頼商品登録");

    // Verify: 開梱依頼 field is displayed
    const isKaikonIriVisible = await productInputPage.isKaikonIriInputVisible();
    expect(isKaikonIriVisible).toBe(true);

    // Verify: Labels and borders change to red color
    await productInputPage.expectAllLabelsRed({
      exclude: ["mode", "tHai", "dcYukoZai", "hoju", "rHinIri"],
    });
    await productInputPage.expectAllInputBordersRed({
      exclude: ["tHai", "dcYukoZai", "hoju", "rHinIri"],
    });
  });

  test("WTY31001_63", async ({ page, baseUrl }) => {
    // Step 1: Setup and switch to 返品 mode
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await productInputPage.navigate();
    await page.waitForTimeout(500);

    // Switch to 返品 mode
    await productInputPage.clickHpnRadio();
    await page.waitForTimeout(500);

    // Enter data in 返品 mode
    await productInputPage.fillProductInput("00010013687");
    await productInputPage.fillTenjiIriInput("20");
    await productInputPage.fillKaikonIriInput("15");
    await productInputPage.fillTSuIriInput("30");
    await productInputPage.fillKisoIriInput("40");
    await page.waitForTimeout(500);

    // Step 2: Switch to 供給 mode
    await productInputPage.clickKkyRadio();
    await page.waitForTimeout(1000);

    // Step 3: Switch back to 返品 mode
    await productInputPage.clickHpnRadio();
    await page.waitForTimeout(1000);

    // Step 4: Verify all fields are reset (empty)
    const productValue = await productInputPage.getProductInputValue();
    const tenjiIriValue = await productInputPage.getTenjiIriInputValue();
    const kaikonIriValue = await productInputPage.getKaikonIriInputValue();
    const tSuIriValue = await productInputPage.getTSuIriInputValue();
    const kisoIriValue = await productInputPage.getKisoIriInputValue();

    expect(productValue).toBe("");
    expect(tenjiIriValue).toBe("");
    expect(kaikonIriValue).toBe("");
    expect(tSuIriValue).toBe("");
    expect(kisoIriValue).toBe("");

    // Verify: 開梱依頼 field is displayed
    const isKaikonIriVisible = await productInputPage.isKaikonIriInputVisible();
    expect(isKaikonIriVisible).toBe(true);
  });

  test("WTY31001_64", async ({ page, baseUrl, indexedDBHelper }) => {
    const testData = loadTestData("TY310/wty31001", "wty31001", "TC_64");
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Navigate to WTY31001 and switch to 返品 mode
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await productInputPage.clickHpnRadio();
    await page.waitForTimeout(1000);

    // Step 2: Enter valid product code
    await productInputPage.fillProductInput("00010013557");
    await page.waitForTimeout(500);

    // Step 3: Click search button
    await productInputPage.clickSearchButton();
    await page.waitForTimeout(1000);

    // Verify: Product information is displayed
    const kataValue = await productInputPage.getKataInputValue();
    const mkValue = await productInputPage.getMkInputValue();
    const rnkValue = await productInputPage.getRnkInputValue();
    const bKbnValue = await productInputPage.getBKbnInputValue();
    const shnNmValue = await productInputPage.getShnNmInputValue();

    expect(kataValue).toBe(testData.expected.kata);
    expect(mkValue).toBe(testData.expected.mk);
    expect(rnkValue).toBe(testData.expected.rnk);
    expect(bKbnValue).toBe(testData.expected.bKbn);
    expect(shnNmValue).toBe(testData.expected.shnNm);

    // Verify: Stock information is displayed
    const hbJsk4Value = await productInputPage.getHbJsk4InputValue();
    const hbJsk3Value = await productInputPage.getHbJsk3InputValue();
    const hbJsk2Value = await productInputPage.getHbJsk2InputValue();
    const hbJsk1Value = await productInputPage.getHbJsk1InputValue();

    expect(hbJsk4Value).toBe(testData.expected.hbJsk4);
    expect(hbJsk3Value).toBe(testData.expected.hbJsk3);
    expect(hbJsk2Value).toBe(testData.expected.hbJsk2);
    expect(hbJsk1Value).toBe(testData.expected.hbJsk1);
  });

  test("WTY31001_65", async ({ page, baseUrl, indexedDBHelper }) => {
    const testData = loadTestData("TY310/wty31001", "wty31001", "TC_51");
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Navigate to WTY31001 and switch to 返品 mode
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await productInputPage.clickHpnRadio();
    await page.waitForTimeout(1000);

    // Step 2: Enter JAN code (13 digits)
    await productInputPage.fillProductInput("04962458558440");
    await page.waitForTimeout(500);

    // Step 3: Click search button
    await productInputPage.clickSearchButton();
    await page.waitForTimeout(2000);

    // Verify: Search works with JAN code
    const kataValue = await productInputPage.getKataInputValue();
    const mkValue = await productInputPage.getMkInputValue();
    const shnNmValue = await productInputPage.getShnNmInputValue();

    expect(kataValue).toBe(testData.expected.kata);
    expect(mkValue).toBe(testData.expected.mk);
    expect(shnNmValue).toBe(testData.expected.shnNm);
  });

  test("WTY31001_66", async ({ page, baseUrl, indexedDBHelper }) => {
    const testData = loadTestData("TY310/wty31001", "wty31001", "TC_64");
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Navigate to WTY31001 and switch to 返品 mode
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await productInputPage.clickHpnRadio();
    await page.waitForTimeout(1000);

    // Step 2: Enter non-existent product code
    await productInputPage.fillProductInput("00010013555");
    await page.waitForTimeout(500);

    // Step 3: Click search button
    await productInputPage.clickSearchButton();
    await page.waitForTimeout(2000);

    // Verify: Error message is displayed
    const errorMessage = await productInputPage.getErrorMessageDialog();
    expect(errorMessage).toContain("TE5136");
    expect(errorMessage).toContain("商品情報が存在しません。");
  });

  test("WTY31001_68", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Navigate to WTY31001 and switch to 返品 mode
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await productInputPage.clickHpnRadio();
    await page.waitForTimeout(1000);

    // Step 2: Enter some data in 定数依頼 and 基礎依頼
    await productInputPage.fillTSuIriInput("100");
    await productInputPage.fillKisoIriInput("200");
    await page.waitForTimeout(500);

    // Step 3: Toggle 定数削除 = ON
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

  test("WTY31001_69", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Navigate to WTY31001 and switch to 返品 mode
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await productInputPage.clickHpnRadio();
    await page.waitForTimeout(1000);

    // Step 2: Toggle 定数削除 = ON first
    const initialState = await productInputPage.getTsuDelToggleState();
    if (!initialState) {
      await productInputPage.clickTsuDelToggle();
      await page.waitForTimeout(500);
    }

    // Step 3: Toggle 定数削除 = OFF
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

  test("WTY31001_72", async ({ page, baseUrl, indexedDBHelper }) => {
    const testData = loadTestData("TY310/wty31001", "wty31001", "TC_64");
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Navigate to WTY31001 and switch to 返品 mode
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await productInputPage.clickHpnRadio();
    await page.waitForTimeout(1000);

    // Step 2: Enter 型番 (model code)
    await productInputPage.fillProductInput("000100136");
    await page.waitForTimeout(500);

    // Step 3: Click search button
    const [newPage] = await Promise.all([
      page.context().waitForEvent("page"),
      productInputPage.clickSearchButton(),
    ]);

    // Verify: New tab is opened with WTZ10101
    await newPage.waitForLoadState("domcontentloaded");
    expect(newPage.url()).toContain("WTZ10101");
  });

  test("WTY31001_73", async ({ page, baseUrl, indexedDBHelper }) => {
    const testData = loadTestData("TY310/wty31001", "wty31001", "TC_64");
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Navigate to WTY31001 and switch to 返品 mode
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await productInputPage.clickHpnRadio();
    await page.waitForTimeout(1000);

    // Step 2: Click on 商品 field to focus
    await productInputPage.focusProductInput();
    await page.waitForTimeout(1000);

    const isVisible = await productInputPage.searchProductButtonVisible();
    expect(isVisible).toBe(true);

    // Step 3: Click on 型番検索 button
    const [newPage] = await Promise.all([
      page.context().waitForEvent("page"),
      productInputPage.clickSearchProductButton(),
    ]);

    // Verify: New tab is opened with WTZ10101
    await newPage.waitForLoadState("domcontentloaded");
    expect(newPage.url()).toContain("WTZ10101");
  });
});
