/**
 * WTY31002 Test Suite
 */

import { test, expect, loadTestData } from "../../../base/base-test";
import { WTY31002Page } from "../../../pages/TY310/WTY31002/wty31002.page";
import { takeScreenshotOnFailure } from "../../../utils/common-helper";

test.describe("WTY31002 - 供給移動依頼登録 Test Suite", () => {
  let productInputPage: WTY31002Page;

  test.beforeEach(async ({ page, baseUrl }) => {
    productInputPage = new WTY31002Page(page);
  });

  test.afterEach(async ({ page }, testInfo) => {
    await takeScreenshotOnFailure(page, testInfo);
  });

  test("WTY31002_52", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY310/wty31002", "wty31002", "TC_11");

    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY31002 screen
    await productInputPage.navigate();
    await page.waitForTimeout(2000);
    await snapInput();

    // Step 3: Select one row
    await productInputPage.clickFirstRow();
    await page.waitForTimeout(1000);

    // Verify
    const isButtonEditProVisible =
      await productInputPage.isButtonEditProVisible();
    expect(isButtonEditProVisible).toBe(true);

    const isButtonCancelProVisible =
      await productInputPage.isButtonCancelProVisible();
    expect(isButtonCancelProVisible).toBe(true);

    await snapExpect();
  });

  test("WTY31002_52_1", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY310/wty31002", "wty31002", "TC_24");

    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY31002 screen
    await productInputPage.navigate();
    await page.waitForTimeout(2000);
    await snapInput();

    // Step 3: Select one row
    await productInputPage.clickFirstRow();
    await page.waitForTimeout(1000);

    // Verify
    const isButtonEditProVisible =
      await productInputPage.isButtonEditProVisible();
    expect(isButtonEditProVisible).toBe(true);

    const isButtonCancelProVisible =
      await productInputPage.isButtonCancelProVisible();
    expect(isButtonCancelProVisible).toBe(true);

    const isButtonCheckProVisible =
      await productInputPage.isButtonCheckProVisible();
    expect(isButtonCheckProVisible).toBe(true);

    await snapExpect();
  });

  test("WTY31002_52_2", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY310/wty31002", "wty31002", "TC_25");

    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY31002 screen
    await productInputPage.navigate();
    await page.waitForTimeout(2000);
    await snapInput();

    // Step 3: Select one row
    await productInputPage.clickFirstRow();
    await page.waitForTimeout(1000);

    // Verify
    const isButtonInfoProVisible =
      await productInputPage.isButtonInfoProVisible();
    expect(isButtonInfoProVisible).toBe(true);

    const isButtonCheckProVisible =
      await productInputPage.isButtonCheckProVisible();
    expect(isButtonCheckProVisible).toBe(true);

    await snapExpect();
  });
});
