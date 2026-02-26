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

  test("WTY30401_16", async ({
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

    await snapInput();

    await productInputPage.fillInputById("shnCd", testData.formData.shnCd_05);
    await productInputPage.clickButtonSearchShnCd();
    await productInputPage.clickConfirmButton();
    await page.waitForTimeout(1000);
    // Verify:
    const msg = await productInputPage.getFieldErrorMessage("棚札ID");
    expect(msg).toBe("棚札IDが入力されていないため確定できません。");
    await snapExpect();
  });

  test("WTY30401_17", async ({
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

    await productInputPage.clickKaijoRadio();

    await snapInput();

    await productInputPage.clickButtonSearchTnhId();
    await page.waitForTimeout(1000);
    // Verify:
    const msg = await productInputPage.getFieldErrorMessage("棚札ID");
    expect(msg).toBe("棚札IDは必須入力です。");
    await snapExpect();
  });

  test("WTY30401_18", async ({
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

    await snapInput();
    await productInputPage.fillInputById("tnhdId", testData.formData.tnhdId_18);
    await productInputPage.tnhdIdInputBlur();
    await page.waitForTimeout(1000);

    // Verify:
    const msg = await productInputPage.getFieldErrorMessage("棚札ID");
    expect(msg).toBe("棚札IDは100桁以内で入力してください。");
    await snapExpect();
  });

  test("WTY30401_19", async ({
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

    await snapInput();
    await productInputPage.fillInputById("tnhdId", testData.formData.tnhdId_19);
    await productInputPage.tnhdIdInputBlur();
    await page.waitForTimeout(1000);

    // Verify:
    const msg = await productInputPage.getFieldErrorMessage("棚札ID");
    expect(msg).toBe("棚札IDは半角英数のみ入力してください。");
    await snapExpect();
  });

  test("WTY30401_20", async ({
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

    await snapInput();
    await productInputPage.fillInputById("tnhdId", testData.formData.tnhdId_20);
    await productInputPage.tnhdIdInputBlur();
    await page.waitForTimeout(1000);

    // Verify:
    const msg = await productInputPage.getFieldErrorMessage("棚札ID");
    expect(msg).toBe("棚札IDは半角英数のみ入力してください。");
    await snapExpect();
  });

  test("WTY30401_21", async ({
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

    await snapInput();
    await productInputPage.fillInputById("tnhdId", testData.formData.tnhdId_21);
    await productInputPage.tnhdIdInputBlur();
    await page.waitForTimeout(1000);

    // Verify:
    const msg = await productInputPage.getFieldErrorMessage("棚札ID");
    expect(msg).toBe("棚札IDは半角英数のみ入力してください。");
    await snapExpect();
  });

  test("WTY30401_22", async ({
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

    await snapInput();

    await productInputPage.clickButtonSearchShnCd();
    await page.waitForTimeout(1000);

    // Verify:
    const msg = await productInputPage.getFieldErrorMessage("商品");
    expect(msg).toBe("必須入力項目です。");
    await snapExpect();
  });

  test("WTY30401_23", async ({
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

    await productInputPage.fillInputById("shnCd", testData.formData.shnCd_23);
    await snapInput();

    await productInputPage.shnCdInputBlur();
    await page.waitForTimeout(1000);

    // Verify:
    const shnCd = await productInputPage.getValueById("shnCd");
    expect(shnCd).toBe(testData.expected.shnCd_23);
    await snapExpect();
  });
});
