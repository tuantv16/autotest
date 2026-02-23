/**
 * WTY30401 Test Suite
 */

import { test, expect, loadTestData } from "../../../base/base-test";
import { WTY30401Page } from "../../../pages/TY304/wty30401.page";
import { takeScreenshotOnFailure } from "../../../utils/common-helper";

test.describe("WTY30401 - 電子プライスペアリング情報登録 Test Suite", () => {
  let productInputPage: WTY30401Page;

  test.beforeEach(async ({ page, baseUrl }) => {
    productInputPage = new WTY30401Page(page);
  });

  test.afterEach(async ({ page }, testInfo) => {
    await takeScreenshotOnFailure(page, testInfo);
  });

  test("WTY30401_36", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY304/wty30401", "wty30401", "TC_05");

    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY30401 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await productInputPage.fillInputById("tnhdId", testData.formData.tnhdId_05);
    await productInputPage.fillInputById("shnCd", testData.formData.shnCd_05);
    await snapInput();
    await page.waitForTimeout(1000);
    await productInputPage.clickClearButton();
    // Verify:
    const tnhdId = await productInputPage.getValueById("tnhdId");
    const shnCd = await productInputPage.getValueById("shnCd");
    expect(tnhdId).toBe("");
    expect(shnCd).toBe("");
    await snapExpect();
  });

  test("WTY30401_41", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY304/wty30401", "wty30401", "TC_05");

    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY30401 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await productInputPage.fillInputById("tnhdId", testData.formData.tnhdId_05);
    await snapInput();
    await page.waitForTimeout(1000);
    await productInputPage.clickClearTnhdIdInput();
    // Verify:
    const tnhdId = await productInputPage.getValueById("tnhdId");
    expect(tnhdId).toBe("");
    await snapExpect();
  });

  test("WTY30401_42", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY304/wty30401", "wty30401", "TC_05");

    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY30401 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await productInputPage.fillInputById("shnCd", testData.formData.shnCd_05);
    await snapInput();
    await page.waitForTimeout(1000);
    await productInputPage.clickClearShnCdInput();

    // Verify:
    const shnCd = await productInputPage.getValueById("shnCd");
    expect(shnCd).toBe("");
    await snapExpect();
  });
});
