/**
 * WTY31001 Stock Supply Request Product Input Test Suite
 * Comprehensive tests for 供給移動依頼商品入力 screen
 *
 * Test Coverage:
 * - Case 5: Screen Initialization (画面初期化)
 * - Case 7: Data Persistence After Confirm
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

  // ============================================================================
  // CASE 10: UI - Page Title
  // ============================================================================

  test("TC10", async ({ page, baseUrl }) => {
    console.log("[TEST] Running TC10");

    // Step 1: ログイン - Load base page
    console.log("[TEST] Step 1: Đăng nhập hệ thống - Loading base page...");
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    console.log('[TEST] Step 2: Mở menu "供給移動依頼商品入力"...');
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Verify: Page title
    console.log('[TEST] ✓ Checking page title "供給移動依頼商品入力"...');
    const pageTitle = await productInputPage.getPageTitle();
    expect(pageTitle).toBe(true);
    console.log(`[TEST] ✅ Page title: "${pageTitle}"`);
  });

  // ============================================================================
  // CASE 11: UI - Menu buttons
  // ============================================================================

  test("TC11", async ({ page, baseUrl }) => {
    console.log("[TEST] Running TC11 - Menu buttons display");

    // Step 1: Setup
    console.log("[TEST] Step 1: Đăng nhập hệ thống...");
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    console.log("[TEST] Step 2: Mở màn hình WTY31001...");
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Step 3: Open menu
    await productInputPage.openMenu();
    await page.waitForTimeout(500);

    // Verify: Menu buttons visibility
    const requestSearchButton =
      await productInputPage.isRequestSearchButtonVisible();
    const arrivalScheduleButton =
      await productInputPage.isArrivalScheduleButtonVisible();

    expect(requestSearchButton).toBe(true);
    expect(arrivalScheduleButton).toBe(true);

    console.log(
      "[TEST] ✅ All main menu buttons [依頼検索] và [入荷予定] are visible",
    );
  });

  // ============================================================================
  // CASE 12: UI - Menu footer
  // ============================================================================

  test("TC12", async ({ page, baseUrl }) => {
    console.log("[TEST] Running TC12 - Menu buttons display");

    // Step 1: Setup
    console.log("[TEST] Step 1: Đăng nhập hệ thống...");
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Navigate to WTY31001
    console.log("[TEST] Step 2: Mở màn hình WTY31001...");
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    // Verify: Menu buttons visibility
    const clearButton = await productInputPage.isClearButtonButtonVisible();
    const confirmButton = await productInputPage.isConfirmButtonVisible();

    expect(clearButton).toBe(true);
    expect(confirmButton).toBe(true);

    console.log(
      "[TEST] ✅ All main menu buttons [クリア] và [確定] are visible",
    );
  });
});
