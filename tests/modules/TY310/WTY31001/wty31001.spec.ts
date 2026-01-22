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

  test("WTY31001_10", async ({ page, baseUrl }) => {
    // Step 1: Load base page
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Verify: Page title
    const pageTitle = await productInputPage.getPageTitle();
    expect(pageTitle).toBe(true);
  });

  test("WTY31001_11", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Open menu
    await productInputPage.openMenu();
    await page.waitForTimeout(500);

    // Verify: Menu buttons visibility
    const requestSearchButton =
      await productInputPage.isRequestSearchButtonVisible();
    const arrivalScheduleButton =
      await productInputPage.isArrivalScheduleButtonVisible();

    expect(requestSearchButton).toBe(true);
    expect(arrivalScheduleButton).toBe(true);
  });

  test("WTY301001_12", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Verify: Menu buttons visibility
    const clearButton = await productInputPage.isClearButtonButtonVisible();
    const confirmButton = await productInputPage.isConfirmButtonVisible();

    expect(clearButton).toBe(true);
    expect(confirmButton).toBe(true);
  });

  test("WTY31001_13", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001 (Open screen)
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Verify: Radio button 供給 is visible
    const kkyRadioVisible = await productInputPage.isKkyRadioVisible();
    expect(kkyRadioVisible).toBe(true);

    // Verify: Radio button 返品 is visible
    const hpnRadioVisible = await productInputPage.isHpnRadioVisible();
    expect(hpnRadioVisible).toBe(true);

    // Verify: Radio button 供給 is checked by default
    const kkyRadioChecked = await productInputPage.isKkyRadioChecked();
    expect(kkyRadioChecked).toBe(true);

    // Verify: Radio button 返品 is not checked by default
    const hpnRadioChecked = await productInputPage.isHpnRadioChecked();
    expect(hpnRadioChecked).toBe(false);
  });

  test("WTY31001_14", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001 (Open screen)
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Verify: Input 商品 is visible and editable
    const isProductInputVisible =
      await productInputPage.productInputIsVisible();
    expect(isProductInputVisible).toBe(true);

    const isProductInputEditable =
      await productInputPage.productInputIsEditable();
    expect(isProductInputEditable).toBe(true);

    // Verify: Input 良品依頼 is visible and editable
    const isRHinIriInputVisible =
      await productInputPage.rHinIriInputIsVisible();
    expect(isRHinIriInputVisible).toBe(true);
    const isRHinIriInputEditable =
      await productInputPage.rHinIriInputIsEditable();
    expect(isRHinIriInputEditable).toBe(true);

    // Verify: Input 展示依頼 is visible and editable
    const isTenjiIriInputVisible =
      await productInputPage.tenjiIriInputIsVisible();
    expect(isTenjiIriInputVisible).toBe(true);
    const isTenjiIriInputEditable =
      await productInputPage.tenjiIriInputIsEditable();
    expect(isTenjiIriInputEditable).toBe(true);

    // Verify: Input 定数依頼 is visible and editable
    const isTSuIriInputVisible = await productInputPage.tSuIriInputIsVisible();
    expect(isTSuIriInputVisible).toBe(true);
    const isTSuIriInputEditable =
      await productInputPage.tSuIriInputIsEditable();
    expect(isTSuIriInputEditable).toBe(true);

    // Verify: Input 基礎依頼 is visible and editable
    const isKisoIriInputVisible =
      await productInputPage.kisoIriInputIsVisible();
    expect(isKisoIriInputVisible).toBe(true);
    const isKisoIriInputEditable =
      await productInputPage.kisoIriInputIsEditable();
    expect(isKisoIriInputEditable).toBe(true);
  });

  test("WTY31001_15", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001 (Open screen)
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Select radio "供給" (should already be selected by default)
    await productInputPage.clickKkyRadio();
    await page.waitForTimeout(1000);

    // Verify: Radio button 供給 is checked
    const kkyRadioChecked = await productInputPage.isKkyRadioChecked();
    expect(kkyRadioChecked).toBe(true);

    // Verify: 開梱依頼 field is NOT visible when 供給 is selected
    const isKaikonIriVisible = await productInputPage.isKaikonIriInputVisible();
    expect(isKaikonIriVisible).toBe(false);

    // Verify: Label colors are default when 供給 is selected
    await productInputPage.expectAllLabelsNotRed({
      exclude: ["kaikon", "kaikonIri"],
    });

    // Verify: Input border colors are defaultwhen 供給 is selected
    await productInputPage.expectAllInputBordersNotRed({
      exclude: ["kaikon", "kaikonIri"],
    });
  });

  test("WTY31001_16", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001 (Open screen)
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Select radio "返品"
    await productInputPage.clickHpnRadio();
    await page.waitForTimeout(1000);

    // Verify: Radio button 返品 is checked
    const hpnRadioChecked = await productInputPage.isHpnRadioChecked();
    expect(hpnRadioChecked).toBe(true);

    // Verify: 開梱依頼 field is visible when 返品 is selected
    const isKaikonIriVisible = await productInputPage.isKaikonIriInputVisible();
    expect(isKaikonIriVisible).toBe(true);

    // Verify: Label colors are red when 返品 is selected
    await productInputPage.expectAllLabelsRed({
      exclude: ["mode", "tHai", "dcYukoZai", "hoju", "rHinIri"],
    });

    // Verify: Input border colors are red when 返品 is selected
    await productInputPage.expectAllInputBordersRed({
      exclude: ["tHai", "dcYukoZai", "hoju", "rHinIri"],
    });
  });

  test("WTY31001_17", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001 (Open screen)
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Verify: 行No is visible and NOT editable
    const gyoNoVisible = await productInputPage.gyoNoInputIsVisible();
    expect(gyoNoVisible).toBe(true);
    const gyoNoEditable = await productInputPage.gyoNoInputIsEditable();
    expect(gyoNoEditable).toBe(false);

    // Verify: 型番 is visible and NOT editable
    const kataVisible = await productInputPage.kataInputIsVisible();
    expect(kataVisible).toBe(true);
    const kataEditable = await productInputPage.kataInputIsEditable();
    expect(kataEditable).toBe(false);

    // Verify: 客区 (メーカ) is visible and NOT editable
    const mkVisible = await productInputPage.mkInputIsVisible();
    expect(mkVisible).toBe(true);
    const mkEditable = await productInputPage.mkInputIsEditable();
    expect(mkEditable).toBe(false);

    // Verify: ランク is visible and NOT editable
    const rnkVisible = await productInputPage.rnkInputIsVisible();
    expect(rnkVisible).toBe(true);
    const rnkEditable = await productInputPage.rnkInputIsEditable();
    expect(rnkEditable).toBe(false);

    // Verify: 物 is visible and NOT editable
    const bKbnVisible = await productInputPage.bKbnInputIsVisible();
    expect(bKbnVisible).toBe(true);
    const bKbnEditable = await productInputPage.bKbnInputIsEditable();
    expect(bKbnEditable).toBe(false);

    // Verify: 商品名 is visible and NOT editable
    const shnNmVisible = await productInputPage.shnNmInputIsVisible();
    expect(shnNmVisible).toBe(true);
    const shnNmEditable = await productInputPage.shnNmInputIsEditable();
    expect(shnNmEditable).toBe(false);

    // Verify: 販売実績 is visible and NOT editable
    const hbJsk4Visible = await productInputPage.hbJsk4InputIsVisible();
    expect(hbJsk4Visible).toBe(true);
    const hbJsk4Editable = await productInputPage.hbJsk4InputIsEditable();
    expect(hbJsk4Editable).toBe(false);
    const hbJsk3Visible = await productInputPage.hbJsk3InputIsVisible();
    expect(hbJsk3Visible).toBe(true);
    const hbJsk3Editable = await productInputPage.hbJsk3InputIsEditable();
    expect(hbJsk3Editable).toBe(false);
    const hbJsk2Visible = await productInputPage.hbJsk2InputIsVisible();
    expect(hbJsk2Visible).toBe(true);
    const hbJsk2Editable = await productInputPage.hbJsk2InputIsEditable();
    expect(hbJsk2Editable).toBe(false);
    const hbJsk1Visible = await productInputPage.hbJsk1InputIsVisible();
    expect(hbJsk1Visible).toBe(true);
    const hbJsk1Editable = await productInputPage.hbJsk1InputIsEditable();
    expect(hbJsk1Editable).toBe(false);

    // Verify: 実在庫 is visible and NOT editable
    const gZaiVisible = await productInputPage.gZaiInputIsVisible();
    expect(gZaiVisible).toBe(true);
    const gZaiEditable = await productInputPage.gZaiInputIsEditable();
    expect(gZaiEditable).toBe(false);

    // Verify: 有効在庫 is visible and NOT editable
    const yukoZaiVisible = await productInputPage.yukoZaiInputIsVisible();
    expect(yukoZaiVisible).toBe(true);
    const yukoZaiEditable = await productInputPage.yukoZaiInputIsEditable();
    expect(yukoZaiEditable).toBe(false);

    // Verify: 手配数 is visible and NOT editable
    const tHaiVisible = await productInputPage.tHaiInputIsVisible();
    expect(tHaiVisible).toBe(true);
    const tHaiEditable = await productInputPage.tHaiInputIsEditable();
    expect(tHaiEditable).toBe(false);

    // Verify: 上位DC is visible and NOT editable
    const dcYukoZaiVisible = await productInputPage.dcYukoZaiInputIsVisible();
    expect(dcYukoZaiVisible).toBe(true);
    const dcYukoZaiEditable = await productInputPage.dcYukoZaiInputIsEditable();
    expect(dcYukoZaiEditable).toBe(false);

    // Verify: 発注単位 is visible and NOT editable
    const hchTaniVisible = await productInputPage.hchTaniInputIsVisible();
    expect(hchTaniVisible).toBe(true);
    const hchTaniEditable = await productInputPage.hchTaniInputIsEditable();
    expect(hchTaniEditable).toBe(false);

    // Verify: 上位特定 is visible and NOT editable
    const jouiTokuteiVisible =
      await productInputPage.jouiTokuteiInputIsVisible();
    expect(jouiTokuteiVisible).toBe(true);
    const jouiTokuteiEditable =
      await productInputPage.jouiTokuteiInputIsEditable();
    expect(jouiTokuteiEditable).toBe(false);

    // Verify: 補充予定 is visible and NOT editable
    const hojuVisible = await productInputPage.hojuInputIsVisible();
    expect(hojuVisible).toBe(true);
    const hojuEditable = await productInputPage.hojuInputIsEditable();
    expect(hojuEditable).toBe(false);

    // Verify: 展示品 is visible and NOT editable
    const tenjiVisible = await productInputPage.tenjiInputIsVisible();
    expect(tenjiVisible).toBe(true);
    const tenjiEditable = await productInputPage.tenjiInputIsEditable();
    expect(tenjiEditable).toBe(false);

    // Verify: 開梱品 is visible and NOT editable
    await productInputPage.clickHpnRadio();
    await page.waitForTimeout(1000);

    const kaikonVisible = await productInputPage.kaikonInputIsVisible();
    expect(kaikonVisible).toBe(true);
    const kaikonEditable = await productInputPage.kaikonInputIsEditable();
    expect(kaikonEditable).toBe(false);

    await productInputPage.clickKkyRadio();
    await page.waitForTimeout(1000);

    // Verify: 第１定数 is visible and NOT editable
    const d1tSuVisible = await productInputPage.d1tSuInputIsVisible();
    expect(d1tSuVisible).toBe(true);
    const d1tSuEditable = await productInputPage.d1tSuInputIsEditable();
    expect(d1tSuEditable).toBe(false);

    // Verify: 第２定数 is visible and NOT editable
    const d2tSuVisible = await productInputPage.d2tSuInputIsVisible();
    expect(d2tSuVisible).toBe(true);
    const d2tSuEditable = await productInputPage.d2tSuInputIsEditable();
    expect(d2tSuEditable).toBe(false);

    // Verify: 展示基礎 is visible and NOT editable
    const tenjiKisoSuVisible =
      await productInputPage.tenjiKisoSuInputIsVisible();
    expect(tenjiKisoSuVisible).toBe(true);
    const tenjiKisoSuEditable =
      await productInputPage.tenjiKisoSuInputIsEditable();
    expect(tenjiKisoSuEditable).toBe(false);
  });

  test("WTY31001_18", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001 (Open screen)
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Verify: Button Clear is visible and enabled
    const clearButtonVisible =
      await productInputPage.isClearButtonButtonVisible();
    expect(clearButtonVisible).toBe(true);
  });

  test("WTY31001_19", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001 (Open screen)
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Verify: Button Clear is visible and enabled
    const searchButtonVisible =
      await productInputPage.isBtnSearchProductVisible();
    expect(searchButtonVisible).toBe(true);

    const searchButtonEnabled =
      await productInputPage.isBtnSearchProductEnable();
    expect(searchButtonEnabled).toBe(true);
  });

  test("WTY31001_20", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001 (Open screen)
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Verify: Toggle button 定数削除 is visible
    const toggleVisible = await productInputPage.isTsuDelToggleVisible();
    expect(toggleVisible).toBe(true);

    const initialState = await productInputPage.getTsuDelToggleState();

    await productInputPage.clickTsuDelToggle();
    await page.waitForTimeout(500);

    const stateAfterFirstClick = await productInputPage.getTsuDelToggleState();
    expect(stateAfterFirstClick).toBe(!initialState);

    await productInputPage.clickTsuDelToggle();
    await page.waitForTimeout(500);

    const stateAfterSecondClick = await productInputPage.getTsuDelToggleState();
    expect(stateAfterSecondClick).toBe(initialState);
  });

  test("WTY31001_21", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001 (Open screen)
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Click Toggle button 定数削除
    await productInputPage.clickTsuDelToggle();
    await page.waitForTimeout(500);

    // Verify: 定数依頼 và 基礎依頼 fields are disabled when ON
    const tSuIriInputEnabled = await productInputPage.tSuIriInputIsEditable();
    expect(tSuIriInputEnabled).toBe(false);

    const kisoIriInputEnabled = await productInputPage.kisoIriInputIsEditable();
    expect(kisoIriInputEnabled).toBe(false);
  });

  test("WTY31001_22", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001 (Open screen)
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Check Toggle button 定数削除
    await productInputPage.clickTsuDelToggle();
    await page.waitForTimeout(500);
    // Uncheck Toggle button 定数削除
    await productInputPage.clickTsuDelToggle();
    await page.waitForTimeout(500);

    // Verify: 定数依頼 và 基礎依頼 fields are disabled when ON
    const tSuIriInputEnabled = await productInputPage.tSuIriInputIsEditable();
    expect(tSuIriInputEnabled).toBe(true);

    const kisoIriInputEnabled = await productInputPage.kisoIriInputIsEditable();
    expect(kisoIriInputEnabled).toBe(true);
  });

  test("WTY31001_23", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001 (Open screen in NEW mode)
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Verify: All editable fields are editable
    const productEditable = await productInputPage.productInputIsEditable();
    expect(productEditable).toBe(true);

    const rHinIriEditable = await productInputPage.rHinIriInputIsEditable();
    expect(rHinIriEditable).toBe(true);

    const tenjiIriEditable = await productInputPage.tenjiIriInputIsEditable();
    expect(tenjiIriEditable).toBe(true);

    const tSuIriEditable = await productInputPage.tSuIriInputIsEditable();
    expect(tSuIriEditable).toBe(true);

    const kisoIriEditable = await productInputPage.kisoIriInputIsEditable();
    expect(kisoIriEditable).toBe(true);

    // Step 3: Select radio "供給" (default mode)
    await productInputPage.clickKkyRadio();
    await page.waitForTimeout(1000);

    // Verify: When selecting 供給, labels and borders display default colors (NOT red)
    await productInputPage.expectAllLabelsNotRed({
      exclude: ["kaikon", "kaikonIri"],
    });
    await productInputPage.expectAllInputBordersNotRed({
      exclude: ["kaikon", "kaikonIri"],
    });

    // Step 4: Select radio "返品"
    await productInputPage.clickHpnRadio();
    await page.waitForTimeout(1000);

    // Verify: When selecting 返品, labels and borders display red color
    await productInputPage.expectAllLabelsRed({
      exclude: ["mode", "tHai", "dcYukoZai", "hoju", "rHinIri"],
    });
    await productInputPage.expectAllInputBordersRed({
      exclude: ["tHai", "dcYukoZai", "hoju", "rHinIri"],
    });
  });

  test("WTY31001_24", async ({ page, baseUrl, indexedDBHelper }) => {
    const testData = loadTestData("TY310/wty31001", "wty31001", "TC_24");
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Navigate to WTY31001 (Open screen in NEW mode)
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Verify: All editable fields are editable
    const rHinIriEditable = await productInputPage.rHinIriInputIsEditable();
    expect(rHinIriEditable).toBe(true);

    const tenjiIriEditable = await productInputPage.tenjiIriInputIsEditable();
    expect(tenjiIriEditable).toBe(true);

    const tSuIriEditable = await productInputPage.tSuIriInputIsEditable();
    expect(tSuIriEditable).toBe(true);

    const kisoIriEditable = await productInputPage.kisoIriInputIsEditable();
    expect(kisoIriEditable).toBe(true);
  });

  test("WTY31001_25", async ({ page, baseUrl, indexedDBHelper }) => {
    const testData = loadTestData("TY310/wty31001", "wty31001", "TC_25");
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Navigate to WTY31001 (Open screen in View mode)
    await productInputPage.navigate();
    await page.waitForTimeout(10000);

    // Verify: Radio button 供給 is disabled
    const kkyRadioDisabled = await productInputPage.isKkyRadioDisabled();
    expect(kkyRadioDisabled).toBe(true);

    // Verify: Radio button 返品 is disabled
    const hpnRadioDisabled = await productInputPage.isHpnRadioDisabled();
    expect(hpnRadioDisabled).toBe(true);

    // Verify: All editable fields are disabled
    const productInputIsDisabled =
      await productInputPage.productInputIsDisabled();
    expect(productInputIsDisabled).toBe(true);

    const rHinIriInputIsDisabled =
      await productInputPage.rHinIriInputIsDisabled();
    expect(rHinIriInputIsDisabled).toBe(true);

    const tenjiIriInputIsDisabled =
      await productInputPage.tenjiIriInputIsDisabled();
    expect(tenjiIriInputIsDisabled).toBe(true);

    const tSuIriInputIsDisabled =
      await productInputPage.tSuIriInputIsDisabled();
    expect(tSuIriInputIsDisabled).toBe(true);

    const kisoIriInputIsDisabled =
      await productInputPage.kisoIriInputIsDisabled();
    expect(kisoIriInputIsDisabled).toBe(true);
  });

  test("WTY31001_26", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Enter lowercase product code "a123" into 商品 field
    await productInputPage.fillProductInput("a123");
    await page.waitForTimeout(500);

    // Step 4: Blur the field
    await productInputPage.blurProductInput();
    await page.waitForTimeout(500);

    // Verify: Value is converted to uppercase
    const productValue = await productInputPage.getProductInputValue();
    expect(productValue).toBe("A123");
  });

  test("WTY31001_27", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Leave 商品 field empty
    await productInputPage.fillProductInput("");
    await page.waitForTimeout(500);

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
  });

  test("WTY31001_28", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Enter full-width characters into 商品 field
    await productInputPage.fillProductInput("ＡＢＣ１２３ａｂｃアイウえお");
    await page.waitForTimeout(500);

    // Step 4: Blur the field
    await productInputPage.blurProductInput();
    await page.waitForTimeout(500);

    // Verify: Full-width characters are converted to half-width
    const productValue = await productInputPage.getProductInputValue();
    expect(productValue).toMatch(/ABC123ABC/);
  });

  test("WTY31001_29", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Enter number "10" into 良品依頼 field
    await productInputPage.fillRHinIriInput("10");
    await page.waitForTimeout(500);

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
  });

  test("WTY31001_30", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Try to enter non-numeric characters into 良品依頼 field
    await productInputPage.fillRHinIriInput("abc");
    await page.waitForTimeout(500);

    // Step 4: Blur the field
    await productInputPage.blurRHinIriInput();
    await page.waitForTimeout(500);

    // Verify: Non-numeric characters are not allowed
    const rHinIriValue = await productInputPage.getRHinIriInputValue();
    expect(rHinIriValue).not.toBe("abc");
  });

  test("WTY31001_31", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Enter "0" into 良品依頼 field
    await productInputPage.fillRHinIriInput("0");
    await page.waitForTimeout(500);

    // Step 4: Blur the field
    await productInputPage.blurRHinIriInput();
    await page.waitForTimeout(500);

    // Verify: Value "0" is accepted
    const rHinIriValue = await productInputPage.getRHinIriInputValue();
    expect(rHinIriValue).toBe("0");
  });

  test("WTY31001_32", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Enter "99999" into 良品依頼 field
    await productInputPage.fillRHinIriInput("99999");
    await page.waitForTimeout(500);

    // Step 4: Blur the field
    await productInputPage.blurRHinIriInput();
    await page.waitForTimeout(500);

    // Verify: Value "99999" is accepted
    const rHinIriValue = await productInputPage.getRHinIriInputValue();
    expect(rHinIriValue).toBe("99,999");
  });

  test("WTY31001_33", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Enter number with more than 5 digits "1000000" into 良品依頼 field
    await productInputPage.fillRHinIriInput("1000000");
    await page.waitForTimeout(500);

    // Step 4: Blur the field
    await productInputPage.blurRHinIriInput();
    await page.waitForTimeout(1000);

    // Step 5: Click confirm button
    await productInputPage.clickConfirmButton();
    await page.waitForTimeout(1000);

    // Verify: Error message is displayed
    const isErrorVisible =
      await productInputPage.getFieldErrorMessage("良品依頼");
    expect(isErrorVisible).toBe("良品依頼は5桁以内で入力してください。");
  });

  test("WTY31001_34", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Enter number "10" into 展示依頼 field
    await productInputPage.fillTenjiIriInput("10");
    await page.waitForTimeout(500);

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
  });

  test("WTY31001_35", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Try to enter non-numeric characters into 展示依頼 field
    await productInputPage.fillTenjiIriInput("abc");
    await page.waitForTimeout(500);

    // Step 4: Blur the field
    await productInputPage.blurTenjiIriInput();
    await page.waitForTimeout(500);

    // Verify: Non-numeric characters are not allowed
    const tenjiIriValue = await productInputPage.getTenjiIriInputValue();
    expect(tenjiIriValue).not.toBe("abc");
  });

  test("WTY31001_36", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Enter "0" into 展示依頼 field
    await productInputPage.fillTenjiIriInput("0");
    await page.waitForTimeout(500);

    // Step 4: Blur the field
    await productInputPage.blurTenjiIriInput();
    await page.waitForTimeout(500);

    // Verify: Value "0" is accepted
    const tenjiIriValue = await productInputPage.getTenjiIriInputValue();
    expect(tenjiIriValue).toBe("0");
  });

  test("WTY31001_37", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Enter "99999" into 展示依頼 field
    await productInputPage.fillTenjiIriInput("99999");
    await page.waitForTimeout(500);

    // Step 4: Blur the field
    await productInputPage.blurTenjiIriInput();
    await page.waitForTimeout(500);

    // Verify: Value "99999" is accepted
    const tenjiIriValue = await productInputPage.getTenjiIriInputValue();
    expect(tenjiIriValue).toBe("99,999");
  });

  test("WTY31001_38", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Enter number with more than 5 digits "1000000" into 展示依頼 field
    await productInputPage.fillTenjiIriInput("1000000");
    await page.waitForTimeout(500);

    // Step 4: Blur the field
    await productInputPage.blurTenjiIriInput();
    await page.waitForTimeout(1000);

    // Step 5: Click confirm button
    await productInputPage.clickConfirmButton();
    await page.waitForTimeout(1000);

    // Verify: Error message is displayed
    const isErrorVisible =
      await productInputPage.getFieldErrorMessage("展示依頼");
    expect(isErrorVisible).toBe("展示依頼は5桁以内で入力してください。");
  });
  test("WTY31001_39", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Enter number "10" into 定数依頼 field
    await productInputPage.fillTSuIriInput("10");
    await page.waitForTimeout(500);

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
  });

  test("WTY31001_40", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Try to enter non-numeric characters into 定数依頼 field
    await productInputPage.fillTSuIriInput("abc");
    await page.waitForTimeout(500);

    // Step 4: Blur the field
    await productInputPage.blurTSuIriInput();
    await page.waitForTimeout(500);

    // Verify: Non-numeric characters are not allowed
    const tSuIriValue = await productInputPage.getTSuIriInputValue();
    expect(tSuIriValue).not.toBe("abc");
  });

  test("WTY31001_41", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Enter "0" into 定数依頼 field
    await productInputPage.fillTSuIriInput("0");
    await page.waitForTimeout(500);

    // Step 4: Blur the field
    await productInputPage.blurTSuIriInput();
    await page.waitForTimeout(500);

    // Verify: Value "0" is accepted
    const tSuIriValue = await productInputPage.getTSuIriInputValue();
    expect(tSuIriValue).toBe("0");
  });

  test("WTY31001_42", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Enter "99999" into 定数依頼 field
    await productInputPage.fillTSuIriInput("99999");
    await page.waitForTimeout(500);

    // Step 4: Blur the field
    await productInputPage.blurTSuIriInput();
    await page.waitForTimeout(500);

    // Verify: Value "99999" is accepted
    const tSuIriValue = await productInputPage.getTSuIriInputValue();
    expect(tSuIriValue).toBe("99,999");
  });

  test("WTY31001_43", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Enter number with more than 5 digits "1000000" into 定数依頼 field
    await productInputPage.fillTSuIriInput("1000000");
    await page.waitForTimeout(500);

    // Step 4: Blur the field
    await productInputPage.blurTSuIriInput();
    await page.waitForTimeout(1000);

    // Step 5: Click confirm button
    await productInputPage.clickConfirmButton();
    await page.waitForTimeout(1000);

    // Verify: Error message is displayed
    const isErrorVisible =
      await productInputPage.getFieldErrorMessage("定数依頼");
    expect(isErrorVisible).toBe("定数依頼は5桁以内で入力してください。");
  });

  test("WTY31001_44", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Enter number "10" into 基礎依頼 field
    await productInputPage.fillKisoIriInput("10");
    await page.waitForTimeout(500);

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
  });

  test("WTY31001_45", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Try to enter non-numeric characters into 基礎依頼 field
    await productInputPage.fillKisoIriInput("abc");
    await page.waitForTimeout(500);

    // Step 4: Blur the field
    await productInputPage.blurKisoIriInput();
    await page.waitForTimeout(500);

    // Verify: Non-numeric characters are not allowed
    const kisoIriValue = await productInputPage.getKisoIriInputValue();
    expect(kisoIriValue).not.toBe("abc");
  });

  test("WTY31001_46", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Enter "0" into 基礎依頼 field
    await productInputPage.fillKisoIriInput("0");
    await page.waitForTimeout(500);

    // Step 4: Blur the field
    await productInputPage.blurKisoIriInput();
    await page.waitForTimeout(500);

    // Verify: Value "0" is accepted
    const kisoIriValue = await productInputPage.getKisoIriInputValue();
    expect(kisoIriValue).toBe("0");
  });

  test("WTY31001_47", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Enter "99999" into 基礎依頼 field
    await productInputPage.fillKisoIriInput("99999");
    await page.waitForTimeout(500);

    // Step 4: Blur the field
    await productInputPage.blurKisoIriInput();
    await page.waitForTimeout(500);

    // Verify: Value "99999" is accepted
    const kisoIriValue = await productInputPage.getKisoIriInputValue();
    expect(kisoIriValue).toBe("99,999");
  });

  test("WTY31001_48", async ({ page, baseUrl }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Enter number with more than 5 digits "1000000" into 基礎依頼 field
    await productInputPage.fillKisoIriInput("1000000");
    await page.waitForTimeout(500);

    // Step 4: Blur the field
    await productInputPage.blurKisoIriInput();
    await page.waitForTimeout(1000);

    // Step 5: Click confirm button
    await productInputPage.clickConfirmButton();
    await page.waitForTimeout(1000);

    // Verify: Error message is displayed
    const isErrorVisible =
      await productInputPage.getFieldErrorMessage("基礎依頼");
    expect(isErrorVisible).toBe("基礎依頼は5桁以内で入力してください。");
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
    await productInputPage.expectAllLabelsNotRed();
    await productInputPage.expectAllInputBordersNotRed();
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

    expect(kataValue).toBe("IHL-SLV4S？？？？4？？");
    expect(mkValue).toBe("ﾙﾐﾅｽ");
    expect(rnkValue).toBe("F ");
    expect(bKbnValue).toBe(" ");
    expect(shnNmValue).toBe("ＡＶファニチャー");
    expect(hbJsk4Value).toBe("7");
    expect(hbJsk3Value).toBe("5");
    expect(hbJsk2Value).toBe("1");
    expect(hbJsk1Value).toBe("6");
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

    expect(kataValue).toBe("IHL-SLV4S？？？？4？？");
    expect(mkValue).toBe("ﾙﾐﾅｽ");
    expect(rnkValue).toBe("F ");
    expect(bKbnValue).toBe(" ");
    expect(shnNmValue).toBe("ＡＶファニチャー");
    expect(hbJsk4Value).toBe("7");
    expect(hbJsk3Value).toBe("5");
    expect(hbJsk2Value).toBe("1");
    expect(hbJsk1Value).toBe("6");
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
    await page.waitForTimeout(1000);

    // Step 3: Click on 商品 field to focus
    await productInputPage.focusProductInput();
    await page.waitForTimeout(1000);

    const isVisible = await productInputPage.searchProductButtonVisible();
    expect(isVisible).toBe(true);

    const [newPage] = await Promise.all([
      page.context().waitForEvent("page"),
      productInputPage.clickSearchProductButton(),
    ]);

    await page.waitForTimeout(1000);

    // Verify: New tab is opened with WTZ10101
    await newPage.waitForLoadState("domcontentloaded");
    expect(newPage.url()).toContain("WTZ10101");
  });
});
