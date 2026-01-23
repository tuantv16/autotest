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

  test("WTY31001_104", async ({ page, baseUrl, indexedDBHelper }) => {
    const testData = loadTestData("TY310/wty31001", "wty31001", "TC_64");
    // Step 1: Setup
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Navigate to WTY31001
    await productInputPage.navigate();
    await page.waitForTimeout(5000);

    // Step 2: Enter non-existent product code
    await productInputPage.fillProductInput("00579159611");
    await page.waitForTimeout(5000);

    // Step 3: Click search button
    await productInputPage.clickSearchButton();
    await page.waitForTimeout(50000);

    // Verify: Error message is displayed
    const errorMessage = await productInputPage.getErrorMessageDialog();
    expect(errorMessage).toContain("TE5136");
    expect(errorMessage).toContain("商品情報が存在しません。");
  });
});
