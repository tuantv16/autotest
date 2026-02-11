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

  test("WTY31003_6", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = await loadTestData("TY310/wty31003", "wty31003", "TC_6");
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

    await page.waitForTimeout(1000);
    // Verify:
    const shnCd = await productInputPage.getValueById("shn_TextBox");
    expect(shnCd).toBe(testData.expected.shnCd_6);

    const kata = await productInputPage.getValueById("kata_Label");
    expect(kata).toBe(testData.expected.kata_6);

    await snapExpect();
  });

  test("WTY31003_7", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = await loadTestData("TY310/wty31003", "wty31003", "TC_7");
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

    // Verify:
    const bnrCd = await productInputPage.getValueById("bnrCd_TextBox");
    expect(bnrCd).toBe(testData.expected.bnrCd);

    const bnrNm = await productInputPage.getValueById("bnrNm_Label");
    expect(bnrNm).toBe(testData.expected.bnrNm);
    await snapExpect();
  });

  test("WTY31003_8", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = await loadTestData("TY310/wty31003", "wty31003", "TC_8");
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

    // Verify:
    const bnrCd = await productInputPage.getValueById("bnrCd_TextBox");
    expect(bnrCd).toBe(testData.expected.bnrCd);

    const bnrNm = await productInputPage.getValueById("bnrNm_Label");
    expect(bnrNm).toBe(testData.expected.bnrNm);
    await snapExpect();
  });

  test("WTY31003_10", async ({ page, baseUrl, snapInput, snapExpect }) => {
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // Step 2: Open WTY31001 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();

    // Verify:
    const tanCd = await productInputPage.getValueById("tanCd_TextBox");
    expect(tanCd).toBe("");

    const tanNm = await productInputPage.getValueById("tanNm_Label");
    expect(tanNm).toBe("");

    const shnCd = await productInputPage.getValueById("shn_TextBox");
    expect(shnCd).toBe("");

    const kata = await productInputPage.getValueById("kata_Label");
    expect(kata).toBe("");

    const bnrCd = await productInputPage.getValueById("bnrCd_TextBox");
    expect(bnrCd).toBe("");

    const bnrNm = await productInputPage.getValueById("bnrNm_Label");
    expect(bnrNm).toBe("");

    const isTableEmpty = await productInputPage.isAgGridEmpty();
    expect(isTableEmpty).toBe(true);

    await snapExpect();
  });
});
