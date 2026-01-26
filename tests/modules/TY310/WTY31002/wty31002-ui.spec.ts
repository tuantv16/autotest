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

  test("WTY31002_11", async ({ page, baseUrl, snapInput, snapExpect }) => {
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

  test("WTY31002_12", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Open WTY31001 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    // Verify: Buttons in action menu are displayed
    await productInputPage.openMenu();
    const btnMenuIsVisible = await productInputPage.btnMenuIsVisible();
    expect(btnMenuIsVisible).toBe(true);

    await snapExpect();
  });

  test("WTY31002_13", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Open WTY31001 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    // Verify: Buttons in footer are displayed
    const btnConfirm = await productInputPage.isConfirmButtonVisible();
    expect(btnConfirm).toBe(true);

    await snapExpect();
  });

  test("WTY31002_14", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Open WTY31001 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    // Verify: Input fields are displayed and readonly
    const iriNoInputVisible = await productInputPage.isIriNoInputVisible();
    expect(iriNoInputVisible).toBe(true);

    const iriDateInputVisible = await productInputPage.isIriDateInputVisible();
    expect(iriDateInputVisible).toBe(true);

    const iriNoInputReadonly = await productInputPage.isIriNoInputReadonly();
    expect(iriNoInputReadonly).toBe(true);

    const iriDateInputReadonly = await productInputPage.isIriDateInputReadonly();
    expect(iriDateInputReadonly).toBe(true);

    await snapExpect();
  });
});
