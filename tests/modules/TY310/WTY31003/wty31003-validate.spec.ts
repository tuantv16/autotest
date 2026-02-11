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

  test("WTY31003_27", async ({
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

    await productInputPage.clearTanCdInputClick();
    await productInputPage.fillInputTanCd(testData.formData.tanCd_27);
    await snapInput();
    await page.waitForTimeout(500);
    await productInputPage.blurInputTanCd();
    await page.waitForTimeout(500);

    // Verify:
    const tanNm = await productInputPage.getValueTanNm();
    expect(tanNm).toBe(testData.expected.tanNm);

    await snapExpect();
  });

  test("WTY31003_29", async ({ page, baseUrl, snapInput, snapExpect }) => {
    const testData = await loadTestData("TY310/wty31003", "wty31003", "TC_19");
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Open WTY31001 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();

    await productInputPage.fillValueIraiDateFrom(
      testData.formData.iraiDateFrom_29,
    );

    // Verify:
    const iraiDateFrom = await productInputPage.getValueIraiDateFrom();
    expect(iraiDateFrom).toBe(testData.expected.iraiDateFrom_29);

    await snapExpect();
  });

  test("WTY31003_30", async ({ page, baseUrl, snapInput, snapExpect }) => {
    const testData = await loadTestData("TY310/wty31003", "wty31003", "TC_19");
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Open WTY31001 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();

    await productInputPage.fillValueIraiDateTo(testData.formData.iraiDateTo_30);

    // Verify:
    const iraiDateTo = await productInputPage.getValueIraiDateTo();
    expect(iraiDateTo).toBe(testData.expected.iraiDateTo_30);

    await snapExpect();
  });

  test("WTY31003_31", async ({ page, baseUrl, snapInput, snapExpect }) => {
    const testData = await loadTestData("TY310/wty31003", "wty31003", "TC_19");
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Open WTY31001 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await productInputPage.fillValueIraiDateFrom(
      testData.formData.iraiDateFrom_31,
    );
    await productInputPage.fillValueIraiDateTo(testData.formData.iraiDateTo_31);
    await snapInput();

    // Verify:
    await productInputPage.clickSearchButton();
    const message =
      await productInputPage.getFieldErrorMessageById("iraiDateTo_TextBox");
    expect(message).toContain("期間の指定が誤っています。");
    await snapExpect();
  });

  test("WTY31003_43", async ({ page, baseUrl, indexedDBHelper, snapInput, snapExpect }) => {
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

    await productInputPage.fillValueIraiDateFrom(
      testData.formData.iraiDateFrom_29,
    );
    await productInputPage.fillValueIraiDateTo(testData.formData.iraiDateTo_30);
    await snapInput();

    await productInputPage.clickSearchButton();
    await page.waitForTimeout(1000);
    await productInputPage.clickFirstRow();

    // Verify:
    const isButtonViewProVisible =
      await productInputPage.isButtonViewProVisible();
    expect(isButtonViewProVisible).toBe(true);

    const isButtonEditProVisible =
      await productInputPage.isButtonEditProVisible();
    expect(isButtonEditProVisible).toBe(true);
    await snapExpect();
  });
});
