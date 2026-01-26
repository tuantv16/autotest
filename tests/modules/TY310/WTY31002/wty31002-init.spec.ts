/**
 * WTY31002 Test Suite
 */

import { test, expect, loadTestData } from "../../../base/base-test";
import { WTY31002Page } from "../../../pages/TY310/WTY31002/wty31002.page";
import { takeScreenshotOnFailure } from "../../../utils/common-helper";

test.describe("WTY31001 - 供給移動依頼商品入力 Test Suite", () => {
    let productInputPage: WTY31002Page;

    test.beforeEach(async ({ page, baseUrl }) => {
        productInputPage = new WTY31002Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test("WTY31002_5", async ({ page, baseUrl, snapInput, snapExpect }) => {
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
})