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

  test("WTY31001_12", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Load base page
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    // Verify: Page title
    const pageTitle = await productInputPage.getPageTitle();
    expect(pageTitle).toBe(true);

    await snapExpect();
  });

  test("WTY31001_13", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Open menu
    await productInputPage.openMenu();
    await page.waitForTimeout(500);

    await snapInput();

    // Verify: Menu buttons visibility
    const requestSearchButton =
      await productInputPage.isRequestSearchButtonVisible();
    const arrivalScheduleButton =
      await productInputPage.isArrivalScheduleButtonVisible();

    expect(requestSearchButton).toBe(true);
    expect(arrivalScheduleButton).toBe(true);

    await snapExpect();
  });

  test("WTY31001_14", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    // Verify: Menu buttons visibility
    const clearButton = await productInputPage.isClearButtonButtonVisible();
    const confirmButton = await productInputPage.isConfirmButtonVisible();

    expect(clearButton).toBe(true);
    expect(confirmButton).toBe(true);

    await snapExpect();
  });

  test("WTY31001_15", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001 (Open screen)
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

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

    await snapExpect();
  });

  test("WTY31001_16", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001 (Open screen)
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

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

    await snapExpect();
  });

  test("WTY31001_17", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001 (Open screen)
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Select radio "供給" (should already be selected by default)
    await productInputPage.clickKkyRadio();
    await page.waitForTimeout(1000);

    await snapInput();

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

    await snapExpect();
  });

  test("WTY31001_18", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001 (Open screen)
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Select radio "返品"
    await productInputPage.clickHpnRadio();
    await page.waitForTimeout(1000);

    await snapInput();

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

    await snapExpect();
  });

  test("WTY31001_19", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001 (Open screen)
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

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

    await snapExpect();
  });

  test("WTY31001_20", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001 (Open screen)
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    // Verify: Button Clear is visible and enabled
    const clearButtonVisible =
      await productInputPage.isClearButtonButtonVisible();
    expect(clearButtonVisible).toBe(true);

    await snapExpect();
  });

  test("WTY31001_21", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001 (Open screen)
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    // Verify: Button Clear is visible and enabled
    const searchButtonVisible =
      await productInputPage.isBtnSearchProductVisible();
    expect(searchButtonVisible).toBe(true);

    const searchButtonEnabled =
      await productInputPage.isBtnSearchProductEnable();
    expect(searchButtonEnabled).toBe(true);

    await snapExpect();
  });

  test("WTY31001_22", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001 (Open screen)
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    // Verify: Toggle button 定数削除 is visible
    const toggleVisible = await productInputPage.isTsuDelToggleVisible();
    expect(toggleVisible).toBe(true);

    const initialState = await productInputPage.getTsuDelToggleState();

    await productInputPage.clickTsuDelToggle();
    await page.waitForTimeout(500);

    const stateAfterFirstClick = await productInputPage.getTsuDelToggleState();
    expect(stateAfterFirstClick).toBe(!initialState);

    await snapExpect(1);

    await productInputPage.clickTsuDelToggle();
    await page.waitForTimeout(500);

    const stateAfterSecondClick = await productInputPage.getTsuDelToggleState();
    expect(stateAfterSecondClick).toBe(initialState);
    await snapExpect(2);
  });

  test("WTY31001_23", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001 (Open screen)
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Click Toggle button 定数削除
    await productInputPage.clickTsuDelToggle();
    await page.waitForTimeout(500);

    await snapInput();

    // Verify: 定数依頼 và 基礎依頼 fields are disabled when ON
    const tSuIriInputEnabled = await productInputPage.tSuIriInputIsEditable();
    expect(tSuIriInputEnabled).toBe(false);

    const kisoIriInputEnabled = await productInputPage.kisoIriInputIsEditable();
    expect(kisoIriInputEnabled).toBe(false);

    await snapExpect();
  });

  test("WTY31001_24", async ({ page, baseUrl, snapInput, snapExpect }) => {
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
    await snapInput();

    // Verify: 定数依頼 và 基礎依頼 fields are disabled when ON
    const tSuIriInputEnabled = await productInputPage.tSuIriInputIsEditable();
    expect(tSuIriInputEnabled).toBe(true);

    const kisoIriInputEnabled = await productInputPage.kisoIriInputIsEditable();
    expect(kisoIriInputEnabled).toBe(true);

    await snapExpect();
  });

  test("WTY31001_25", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001 (Open screen in NEW mode)
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput(1);

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

    await snapExpect(1);

    // Step 3: Select radio "供給" (default mode)
    await productInputPage.clickKkyRadio();
    await page.waitForTimeout(1000);

    await snapInput(2);

    // Verify: When selecting 供給, labels and borders display default colors (NOT red)
    await productInputPage.expectAllLabelsNotRed({
      exclude: ["kaikon", "kaikonIri"],
    });
    await productInputPage.expectAllInputBordersNotRed({
      exclude: ["kaikon", "kaikonIri"],
    });

    await snapExpect(2);

    // Step 4: Select radio "返品"
    await productInputPage.clickHpnRadio();
    await page.waitForTimeout(1000);

    await snapInput(3);

    // Verify: When selecting 返品, labels and borders display red color
    await productInputPage.expectAllLabelsRed({
      exclude: ["mode", "tHai", "dcYukoZai", "hoju", "rHinIri"],
    });
    await productInputPage.expectAllInputBordersRed({
      exclude: ["tHai", "dcYukoZai", "hoju", "rHinIri"],
    });

    await snapExpect(3);
  });

  test("WTY31001_26", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
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
    await snapInput();

    // Verify: All editable fields are editable
    const rHinIriEditable = await productInputPage.rHinIriInputIsEditable();
    expect(rHinIriEditable).toBe(true);

    const tenjiIriEditable = await productInputPage.tenjiIriInputIsEditable();
    expect(tenjiIriEditable).toBe(true);

    const tSuIriEditable = await productInputPage.tSuIriInputIsEditable();
    expect(tSuIriEditable).toBe(true);

    const kisoIriEditable = await productInputPage.kisoIriInputIsEditable();
    expect(kisoIriEditable).toBe(true);
    await snapExpect();
  });

  test("WTY31001_27", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
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

    await snapInput();

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

    await snapExpect();
  });
});
