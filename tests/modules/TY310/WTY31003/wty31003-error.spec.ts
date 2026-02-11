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

  test("WTY31003_47", async ({
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

    await productInputPage.fillValueIraiDateFrom(
      testData.formData.iraiDateFrom_31,
    );
    await productInputPage.fillValueIraiDateTo(testData.formData.iraiDateTo_31);
    await snapInput();

    await productInputPage.clickSearchButton();
    await page.waitForTimeout(1000);

      // Verify:
    const message = await productInputPage.getFieldErrorMessageById("iraiDateTo_TextBox");
    expect(message).toContain("期間の指定が誤っています。");
    await snapExpect();
  });
});
