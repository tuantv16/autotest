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

  test("WTY31001_75", async ({ page, baseUrl, indexedDBHelper }) => {
    const testData = loadTestData("TY310/wty31001", "wty31001", "TC_64");
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

    await productInputPage.fillProductInput("00010013557");
    await productInputPage.clickSearchButton();
    await page.waitForTimeout(500);

    // Step 3: Enter "0" into 良品依頼 field
    await productInputPage.fillRHinIriInput("0");
    await productInputPage.fillTenjiIriInput("0");
    await productInputPage.fillTSuIriInput("0");
    await productInputPage.fillKisoIriInput("0");
    await page.waitForTimeout(500);

    // Step 4: Blur the field
    await productInputPage.blurKisoIriInput();
    await page.waitForTimeout(500);

    await productInputPage.clickConfirmButton();

    // Verify: Error message is displayed
    const errorMessage = await productInputPage.getErrorMessageDialog();
    expect(errorMessage).toContain("TE5137");
    expect(errorMessage).toContain("依頼指示を設定してください。");
  });
});
