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

  test("WTY30401_5", async ({
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

  test("WTY30401_6", async ({
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

    const tnhdIdBarcodeIconIsVisible =
      await productInputPage.tnhdIdBarcodeIconIsVisible();
    expect(tnhdIdBarcodeIconIsVisible).toBe(true);

    const clearTnhdIdInputIsVisible =
      await productInputPage.clearTnhdIdInputIsVisible();
    expect(clearTnhdIdInputIsVisible).toBe(true);

    const shnCdInputIsEditable = await productInputPage.shnCdInputIsEditable();
    expect(shnCdInputIsEditable).toBe(true);

    await productInputPage.fillInputById("shnCd", testData.formData.shnCd_05);

    const shnCdBarcodeIconIsVisible =
      await productInputPage.shnCdBarcodeIconIsVisible();
    expect(shnCdBarcodeIconIsVisible).toBe(true);

    const clearShnCdInputIsVisible =
      await productInputPage.clearShnCdInputIsVisible();
    expect(clearShnCdInputIsVisible).toBe(true);

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

  test("WTY30401_7", async ({
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

    const tnhdIdBarcodeIconIsVisible =
      await productInputPage.tnhdIdBarcodeIconIsVisible();
    expect(tnhdIdBarcodeIconIsVisible).toBe(true);

    const clearTnhdIdInputIsVisible =
      await productInputPage.clearTnhdIdInputIsVisible();
    expect(clearTnhdIdInputIsVisible).toBe(true);

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
});
