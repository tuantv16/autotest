/**
 * WTY30401 Test Suite
 */

import { test, expect, loadTestData } from "../../../base/base-test";
import { WTY30401Page } from "../../../pages/TY304/wty30401.page";
import { takeScreenshotOnFailure } from "../../../utils/common-helper";

test.describe("WTY30401 - 電子プライスペアリング情報登録 Test Suite", () => {
  let productInputPage: WTY30401Page;

  test.beforeEach(async ({ page, baseUrl }) => {
    productInputPage = new WTY30401Page(page);
  });

  test.afterEach(async ({ page }, testInfo) => {
    await takeScreenshotOnFailure(page, testInfo);
  });

  test("WTY30401_11", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY304/wty30401", "wty30401", "TC_05");

    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY30401 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    // Verify: Page title displays
    const pageTitle = await productInputPage.getPageTitle();
    expect(pageTitle).toBe(true);

    await snapExpect();
  });

  test("WTY30401_12", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY304/wty30401", "wty30401", "TC_05");

    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY30401 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    // Verify: Page title displays
    const clearButtonIsVisible = await productInputPage.clearButtonIsVisible();
    expect(clearButtonIsVisible).toBe(true);

    const confirmButtonIsVisible =
      await productInputPage.confirmButtonIsVisible();
    expect(confirmButtonIsVisible).toBe(true);

    await snapExpect();
  });

  test("WTY30401_13", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY304/wty30401", "wty30401", "TC_05");

    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY30401 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    // Verify:
    const isTorokuRadioChecked = await productInputPage.isTorokuRadioChecked();
    expect(isTorokuRadioChecked).toBe(true);

    const isTnhdIdInputIsEditable =
      await productInputPage.tnhdIdInputIsEditable();
    expect(isTnhdIdInputIsEditable).toBe(true);

    await productInputPage.fillInputById("tnhdId", testData.formData.tnhdId_05);

    const shnCdInputIsEditable = await productInputPage.shnCdInputIsEditable();
    expect(shnCdInputIsEditable).toBe(true);

    await productInputPage.fillInputById("shnCd", testData.formData.shnCd_05);

    const kataNmInputIsDisabled =
      await productInputPage.kataNmInputIsDisabled();
    expect(kataNmInputIsDisabled).toBe(true);

    const mkNmInputIsDisabled = await productInputPage.mkNmInputIsDisabled();
    expect(mkNmInputIsDisabled).toBe(true);

    const shnNmInputIsDisabled = await productInputPage.shnNmInputIsDisabled();
    expect(shnNmInputIsDisabled).toBe(true);

    const buttonSearchShnCdIsVisible =
      await productInputPage.buttonSearchShnCdIsVisible();
    expect(buttonSearchShnCdIsVisible).toBe(true);

    await snapExpect();
  });

  test("WTY30401_14", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY304/wty30401", "wty30401", "TC_05");

    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY30401 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    await productInputPage.clickKaijoRadio();
    await page.waitForTimeout(1000);

    // Verify:
    const isKaijoRadioChecked = await productInputPage.isKaijoRadioChecked();
    expect(isKaijoRadioChecked).toBe(true);

    const isTnhdIdInputIsEditable =
      await productInputPage.tnhdIdInputIsEditable();
    expect(isTnhdIdInputIsEditable).toBe(true);

    await productInputPage.fillInputById("tnhdId", testData.formData.tnhdId_05);

    const shnCdInputIsDisabled = await productInputPage.shnCdInputIsDisabled();
    expect(shnCdInputIsDisabled).toBe(true);

    const kataNmInputIsDisabled =
      await productInputPage.kataNmInputIsDisabled();
    expect(kataNmInputIsDisabled).toBe(true);

    const mkNmInputIsDisabled = await productInputPage.mkNmInputIsDisabled();
    expect(mkNmInputIsDisabled).toBe(true);

    const shnNmInputIsDisabled = await productInputPage.shnNmInputIsDisabled();
    expect(shnNmInputIsDisabled).toBe(true);

    const buttonSearchTnhIdIsVisible =
      await productInputPage.buttonSearchTnhIdIsVisible();
    expect(buttonSearchTnhIdIsVisible).toBe(true);

    await snapExpect();
  });

  test("WTY30401_15", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY304/wty30401", "wty30401", "TC_05");

    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY30401 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    // Verify:
    await productInputPage.shnCdInputFocus();
    const searchProductButtonVisible =
      await productInputPage.buttonSearchShnCdIsVisible();
    expect(searchProductButtonVisible).toBe(true);

    await snapExpect();
  });
});
