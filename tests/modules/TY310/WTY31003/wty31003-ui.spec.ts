/**
 * WTY31003 Test Suite
 */

import { test, expect, loadTestData } from "../../../base/base-test";
import { WTY31003Page } from "../../../pages/TY310/WTY31003/wty31003.page";
import { takeScreenshotOnFailure } from "../../../utils/common-helper";

test.describe("WTY31003 - 供給移動依頼登録 Test Suite", () => {
  let productInputPage: WTY31003Page;

  test.beforeEach(async ({ page, baseUrl }) => {
    productInputPage = new WTY31003Page(page);
  });

  test.afterEach(async ({ page }, testInfo) => {
    await takeScreenshotOnFailure(page, testInfo);
  });

  test("WTY31003_13", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Open WTY31001 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    // Verify: Page title displays
    const pageTitle = await productInputPage.getPageTitle();
    expect(pageTitle).toBe(true);

    await snapExpect();
  });

  test("WTY31003_14", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Open WTY31001 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    //Step 3: Open menu
    await productInputPage.openMenu();
    await page.waitForTimeout(500);

    // Verify: Buttons in menu are visible
    const btnsVisible = await productInputPage.btnMenuIsVisible();
    expect(btnsVisible).toBe(true);

    await snapExpect();
  });

  test("WTY31003_15", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Open WTY31001 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    // Verify: Clear button is visible
    const clearButtonVisible =
      await productInputPage.isClearButtonButtonVisible();
    expect(clearButtonVisible).toBe(true);

    await snapExpect();
  });

  test("WTY31003_16", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Open WTY31001 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    // Verify: Fields in form are visible
    const fieldsVisible = await productInputPage.areFieldsVisible();
    expect(fieldsVisible).toBe(true);

    await snapExpect();
  });

  test("WTY31003_17", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Open WTY31001 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    // Verify: Columns in grid are visible
    const gridColumnsVisible = await productInputPage.areGridColumnsVisible();
    expect(gridColumnsVisible).toBe(true);

    await snapExpect();
  });

  test("WTY31003_19", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = await loadTestData("TY310/wty31003", "wty31003", "TC_19");
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY31001 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Verify:
    await productInputPage.clearTanCdInputClick();
    await productInputPage.fillInputShnCd(testData.formData.shnCd_19);
    await productInputPage.clickSearchButton();
    await page.waitForTimeout(1000);

    await productInputPage.openMenu();
    await snapInput();
    await productInputPage.clickButtonEdit();
    await page.waitForTimeout(1000);
    const message = await productInputPage.getErrorMessageDialog();
    expect(message).toContain("TE5175");
    expect(message).toContain("依頼を選択してください。");

    await snapExpect();
  });

  test("WTY31003_20", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = await loadTestData("TY310/wty31003", "wty31003", "TC_19");
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY31001 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Verify:
    await productInputPage.clearTanCdInputClick();
    await productInputPage.fillInputShnCd(testData.formData.shnCd_19);
    await productInputPage.clickSearchButton();
    await page.waitForTimeout(1000);

    await productInputPage.openMenu();
    await snapInput();
    await productInputPage.clickButtonRequestInquiry();
    await page.waitForTimeout(1000);
    const message = await productInputPage.getErrorMessageDialog();
    expect(message).toContain("TE5175");
    expect(message).toContain("依頼を選択してください。");

    await snapExpect();
  });

  test("WTY31003_21", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Open WTY31001 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    // Verify: 担当者名 is displayed
    const isTanNmInputDisplayed = await productInputPage.isTanNmDisplayed();
    expect(isTanNmInputDisplayed).toBe(true);

    await snapExpect();
  });

  test("WTY31003_22", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Open WTY31001 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    // Verify: 担当者名 is displayed
    const isBnrNmInputDisplayed = await productInputPage.isBnrNmDisplayed();
    expect(isBnrNmInputDisplayed).toBe(true);

    await snapExpect();
  });

  test("WTY31003_23", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Open WTY31001 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    // Verify: 担当者名 is displayed
    const isKataInputDisplayed = await productInputPage.isKataDisplayed();
    expect(isKataInputDisplayed).toBe(true);

    await snapExpect();
  });

  test("WTY31003_24", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Open WTY31001 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    // Verify: Table is empty
    const isTableEmpty = await productInputPage.isAgGridEmpty();
    expect(isTableEmpty).toBe(true);

    await snapExpect();
  });

  test("WTY31003_25", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Open WTY31001 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    // Verify:
    await productInputPage.focusBnrCdInput();
    const search2ndVisible = await productInputPage.search2ndButtonVisible();
    expect(search2ndVisible).toBe(true);
    const search3ndVisible = await productInputPage.search3ndButtonVisible();
    expect(search3ndVisible).toBe(true);

    await snapExpect();
  });

  test("WTY31003_26", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Open WTY31001 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    // Verify:
    await productInputPage.focusShnInput();
    const searchModelNoVisible =
      await productInputPage.searchModelNoButtonVisible();
    expect(searchModelNoVisible).toBe(true);

    await snapExpect();
  });
});
