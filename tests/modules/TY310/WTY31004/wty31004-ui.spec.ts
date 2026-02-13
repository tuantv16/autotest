/**
 * WTY31004 Test Suite
 */

import { test, expect, loadTestData } from "../../../base/base-test";
import { WTY31004Page } from "../../../pages/TY310/WTY31004/wty31004.page";
import { takeScreenshotOnFailure } from "../../../utils/common-helper";

test.describe("WTY31004 - 在庫Ｃ対応状況 Test Suite", () => {
  let productInputPage: WTY31004Page;

  test.beforeEach(async ({ page, baseUrl }) => {
    productInputPage = new WTY31004Page(page);
  });

  test.afterEach(async ({ page }, testInfo) => {
    await takeScreenshotOnFailure(page, testInfo);
  });

  test("WTY31004_8", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Open WTY31001 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();

    const getPageTitle = await productInputPage.getPageTitle();
    expect(getPageTitle).toBe(true);

    await snapExpect();
  });

  test("WTY31004_9", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Open WTY31001 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();

    const isInputsDisplayed = await productInputPage.isInputsDisplayed();
    expect(isInputsDisplayed).toBe(true);

    await snapExpect();
  });

  test("WTY31004_10", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Open WTY31001 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();

    const isTableColumnsDisplayed =
      await productInputPage.isTableColumnsDisplayed();
    expect(isTableColumnsDisplayed).toBe(true);

    await snapExpect();
  });

  test("WTY31004_11", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Open WTY31001 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();

    const isAgGridEmpty = await productInputPage.isAgGridEmpty();
    expect(isAgGridEmpty).toBe(true);

    await snapExpect();
  });

  test("WTY31004_13", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY310/wty31004", "wty31004", "TC_21");

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
    await snapInput();

    const scrollTextareaToBottom =
      await productInputPage.scrollTextareaToBottom();
    expect(scrollTextareaToBottom).toBe(true);

    await snapExpect();
  });

  test("WTY31004_14", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY310/wty31004", "wty31004", "TC_21");

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
    await snapInput();

    const valueDenNo = await productInputPage.getValueRowFirst(1);
    expect(valueDenNo).toMatch(/^[A-Z0-9]{5}-\d{3}-\d{6}$/);

    await snapExpect();
  });

  test("WTY31004_15", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY310/wty31004", "wty31004", "TC_21");

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
    await snapInput();

    const shijiDate = await productInputPage.getValueRowFirst(2);
    expect(shijiDate).toMatch(/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/);

    await snapExpect();
  });

  test("WTY31004_16", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY310/wty31004", "wty31004", "TC_21");

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
    await snapInput();

    const valueNouki = await productInputPage.getValueRowSecond(1);
    expect(valueNouki).toMatch(/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/);

    await snapExpect();
  });
});
