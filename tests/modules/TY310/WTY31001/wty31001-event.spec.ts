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

  test("WTY31001_79", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY310/wty31001", "wty31001", "TC_6");
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(500);
    await snapInput();

    // Step 3: Click search button
    await productInputPage.clickBackButton();
    await page.waitForTimeout(500);
    // Verify: New tab is opened with WTZ10101
    expect(page.url()).not.toContain("WTY31001");
    await snapExpect();
  });

  test("WTY31001_80", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY310/wty31001", "wty31001", "TC_84");
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();

    // Step 2: Click back button
    await productInputPage.clickBackButton();
    await page.waitForTimeout(1000);

    // Verify:
    const errorMessage = await productInputPage.getErrorMessageDialog();
    expect(errorMessage).toContain("TN5021");
    expect(errorMessage).toContain(
      "確定されていないデータを破棄します。よろしいですか？",
    );
    await snapExpect(1);

    // Step 3: Confirm to go back
    await productInputPage.clickConfirmDialogButton();
    await page.waitForTimeout(1000);

    // Verify: Navigated back to WTZ10101
    expect(page.url()).not.toContain("WTY31001");
    await snapExpect(2);
  });

  test("WTY31001_81", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(500);

    // Step 2: Enter data inputs
    await productInputPage.scrollToBottom();
    await productInputPage.fillProductInput("00010013557");
    await productInputPage.fillRHinIriInput("10");
    await productInputPage.fillTenjiIriInput("1");
    await page.waitForTimeout(500);
    await snapInput();

    // Step 3: Click クリア button
    await productInputPage.clickClearButton();

    // Verify: All input fields are cleared
    expect(await productInputPage.getProductInputValue()).toBe("");
    expect(await productInputPage.getRHinIriInputValue()).toBe("");
    expect(await productInputPage.getTenjiIriInputValue()).toBe("");
    await snapExpect();
  });

  test("WTY31001_82", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY310/wty31001", "wty31001", "TC_53");
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(500);

    // Step 2: Click [依頼検索] button
    await productInputPage.openMenu();
    await page.waitForTimeout(500);
    await snapInput();

    const [newPage] = await Promise.all([
      page.context().waitForEvent("page"),
      await productInputPage.clickRequestSearchButton(),
    ]);

    // Verify: New tab is opened with WTY31003
    await newPage.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(3000);
    expect(newPage.url()).toContain("WTY31003");
    await snapExpect();
  });

  test("WTY31001_83", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY310/wty31001", "wty31001", "TC_53");
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(500);

    // Step 2: Click [依頼検索] button
    await productInputPage.openMenu();
    await page.waitForTimeout(500);
    await snapInput();

    const [newPage] = await Promise.all([
      page.context().waitForEvent("page"),
      await productInputPage.clickArrivalScheduleButton(),
    ]);

    // Verify: New tab is opened with WTY11001
    await newPage.waitForLoadState("domcontentloaded");
     await page.waitForTimeout(3000);
    expect(newPage.url()).toContain("WTY11001");
    await snapExpect();
  });

  test("WTY31001_84", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY310/wty31001", "wty31001", "TC_53");

    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(500);

    // Step 2: Enter valid data
    await productInputPage.fillProductInput("00010013557");
    await productInputPage.clickSearchButton();
    await page.waitForTimeout(1000);

    await productInputPage.fillRHinIriInput("10");
    await productInputPage.fillTenjiIriInput("1");
    await productInputPage.fillTSuIriInput("5");
    await productInputPage.fillKisoIriInput("3");
    await page.waitForTimeout(500);
    await snapInput();

    await productInputPage.clickConfirmButton();
    await page.waitForTimeout(500);

    const [newPage] = await Promise.all([
      page.context().waitForEvent("page"),
      await productInputPage.clickConfirmButton(),
    ]);

    // Verify: New tab is opened with WTY31002
    await newPage.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(3000);
    expect(newPage.url()).toContain("WTY31002");
    await snapExpect();
  });

  test("WTY31001_85", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(500);

    // Step 2: Click on 商品 field
    await productInputPage.focusProductInput();
    await page.waitForTimeout(500);
    await snapInput();

    // Verify: Check if popup 型番検索 is visible
    const isPopupVisible = await productInputPage.searchProductButtonVisible();
    expect(isPopupVisible).toBe(true);
    await snapExpect();
  });

  test("WTY31001_86", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(500);

    // Step 2: Enter value into 商品 field
    await productInputPage.fillProductInput("00010013687");
    await page.waitForTimeout(300);
    await snapInput();

    // Step 3: Click [×] button
    await productInputPage.clickClearProductButton();
    await page.waitForTimeout(300);

    // Verify: 商品 field is cleared
    const valueAfterClear = await productInputPage.getProductInputValue();
    expect(valueAfterClear).toBe("");
    await snapExpect();
  });

  test("WTY31001_92", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY310/wty31001", "wty31001", "TC_95");

    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(500);

    // Step 2: Enter value into 商品 field
    await productInputPage.scrollToBottom()
    await productInputPage.fillRHinIriInput("99999");
    await productInputPage.fillTenjiIriInput("88888");
    await productInputPage.fillTSuIriInput("77777");
    await productInputPage.fillKisoIriInput("66666");
    await page.waitForTimeout(300);
    await snapInput();

    // Step 3: Blur last input to trigger formatting
    await productInputPage.blurKisoIriInput();
    await page.waitForTimeout(300);

    // Verify: Numbers are formatted with commas
    const rHinIriValue = await productInputPage.getRHinIriInputValue();
    const tenjiIriValue = await productInputPage.getTenjiIriInputValue();
    const tSuIriValue = await productInputPage.getTSuIriInputValue();
    const kisoIriValue = await productInputPage.getKisoIriInputValue();

    expect(rHinIriValue).toBe(testData.expected.rHinIri);
    expect(tenjiIriValue).toBe(testData.expected.tenjiIri);
    expect(tSuIriValue).toBe(testData.expected.tSuIri);
    expect(kisoIriValue).toBe(testData.expected.kisoIri);
    await snapExpect();
  });
});
