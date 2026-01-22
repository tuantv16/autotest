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

  test("WTY31001_5", async ({ page, baseUrl }) => {
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Open menu "供給移動依頼商品入力"
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Verify: Page title displays "供給移動依頼商品入力"
    const pageTitle = await productInputPage.getPageTitle();
    expect(pageTitle).toBe(true);
  });

  test("WTY31001_6", async ({ page, baseUrl, indexedDBHelper }) => {
    const testData = loadTestData("TY310/wty31001", "wty31001", "TC_6");

    // Step 1: Setup - Initialize with data from screen (WTY31001)
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(3000);

    // Verify: Enter data
    await productInputPage.fillProductInput("00010013557");
    await productInputPage.clickSearchButton();
    await page.waitForTimeout(500);

    await productInputPage.fillRHinIriInput("10");
    await productInputPage.clickConfirmButton();
    await page.waitForTimeout(1000);

    await productInputPage.clickBackButton();
    await page.waitForTimeout(1000);

    // Verify: Data persists after navigating back
    const gyoNoValue = await productInputPage.getGyoNoValue();
    expect(gyoNoValue).toBe("002");

    const productValue = await productInputPage.getProductInputValue();
    expect(productValue).toBe("");
  });

  test("WTY31001_7", async ({ page, baseUrl }) => {
    // Step 1: Open screen without data in indexDB
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Verify: Screen is ready for new input without errors
    const pageTitle = await productInputPage.getPageTitle();
    expect(pageTitle).toBe(true);

    // Verify: Screen displays in new mode with empty fields
    const productValue = await productInputPage.getProductInputValue();
    expect(productValue).toBe("");

    const goodsRequestValue = await productInputPage.getRHinIriInputValue();
    expect(goodsRequestValue).toBe("");

    const displayRequestValue = await productInputPage.getTenjiIriInputValue();
    expect(displayRequestValue).toBe("");

    // Verify: Radio button default selects "供給"
    const kkyRadioChecked = await productInputPage.isKkyRadioChecked();
    expect(kkyRadioChecked).toBe(true);

    const hpnRadioChecked = await productInputPage.isHpnRadioChecked();
    expect(hpnRadioChecked).toBe(false);
  });

  test("WTY31001_8", async ({ page, baseUrl, indexedDBHelper }) => {
    const testData = loadTestData("TY310/wty31001", "wty31001", "TC_8");

    // Step 1: Setup - Initialize with data from screen (WTY31001)
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(500);

    // Verify:
    const productValue = await productInputPage.getProductInputValue();
    expect(productValue).toBe("04962458558440");
  });

  test("WTY31001_9", async ({ page, baseUrl, indexedDBHelper }) => {
    const testData = loadTestData("TY310/wty31001", "wty31001", "TC_9");

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

    // Verify:
    const productValue = await productInputPage.getProductInputValue();
    expect(productValue).toBe("04962458558440");
  });
});
