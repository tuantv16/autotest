/**
 * WTY31001 Test Suite - Performance & Error Handling
 */

import { test, expect, loadTestData } from "../../../base/base-test";
import { WTY31001Page } from "../../../pages/TY310/WTY31001/wty31001.page";
import { takeScreenshotOnFailure } from "../../../utils/common-helper";

test.describe("WTY31001 - 供給移動依頼商品入力 (Performance & Error Handling) Test Suite", () => {
  let productInputPage: WTY31001Page;

  test.beforeEach(async ({ page, baseUrl }) => {
    productInputPage = new WTY31001Page(page);
  });

  test.afterEach(async ({ page }, testInfo) => {
    await takeScreenshotOnFailure(page, testInfo);
  });

  test("WTY31001_112", async ({ page, baseUrl, snapInput, snapExpect }) => {
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);
    await snapInput();

    const startTime = performance.now();

    await productInputPage.navigate();
    await productInputPage.waitForFormReady();

    const loadingTime = performance.now() - startTime;

    expect(loadingTime).toBeLessThan(3000);

    await snapExpect();
  });

  test("WTY31001_113", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY310/wty31001", "wty31001", "TC_84");

    // Step 1: Setup - Save data to indexDB
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    await snapInput();

    const startTime = performance.now();

    await productInputPage.navigate();
    await productInputPage.waitForFormReady();

    const loadingTime = performance.now() - startTime;

    expect(loadingTime).toBeLessThan(3000);

    await snapExpect();
  });

  test("WTY31001_124", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
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

    // Step 3: Enter product code
    await productInputPage.fillProductInput(testData.formData.shnCd);
    await snapInput();

    // Step 4: Click search button
    await productInputPage.clickSearchButton();
    const startTime = performance.now();

    await productInputPage.waitForAPIReady(testData.expected.kata);

    const loadingTime = performance.now() - startTime;

    expect(loadingTime).toBeLessThan(3000);

    await snapExpect();
  });
});
