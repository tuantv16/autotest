/**
 * WTY10601 Test Suite
 */

import { test, expect, loadTestData } from "../../../base/base-test";
import { WTY10601Page } from "../../../pages/TY106/wty10601.page";
import { takeScreenshotOnFailure } from "../../../utils/common-helper";

test.describe("WTY10601 - 在庫一覧照会 Test Suite", () => {
  let productInputPage: WTY10601Page;

  test.beforeEach(async ({ page, baseUrl }) => {
    productInputPage = new WTY10601Page(page);
  });

  test.afterEach(async ({ page }, testInfo) => {
    await takeScreenshotOnFailure(page, testInfo);
  });

  test("WTY10601_29", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = await loadTestData("TY106/wty10601", "wty10601", "TC_7");
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY10601 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);
    await productInputPage.fillInputById("brCd", testData.formData.brCd_29);
    await productInputPage.fillInputById("btenCd", "");
    await snapInput();

    // Verify:
    await productInputPage.clickButtonSearch();
    const message = await productInputPage.getFieldErrorMessage("店舗");
    expect(message).toBe("必須入力項目です。");

    await snapExpect();
  });

  test("WTY10601_30", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = await loadTestData("TY106/wty10601", "wty10601", "TC_7");
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY10601 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);
    await productInputPage.fillInputById("brCd", testData.formData.brCd_29);
    await productInputPage.fillInputById("btenCd", testData.formData.btenCd_30);
    await snapInput();

    // Verify:
    await productInputPage.clickButtonSearch();
    const message = await productInputPage.getFieldErrorMessage("店舗");
    expect(message).toBe("最小サイズに達していません。");

    await snapExpect();
  });

  test("WTY10601_31", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = await loadTestData("TY106/wty10601", "wty10601", "TC_7");
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY10601 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);
    await productInputPage.fillInputById("brCd", testData.formData.brCd_29);
    await productInputPage.fillInputById("btenCd", testData.formData.btenCd_31);
    await snapInput();

    // Verify:
    await productInputPage.clickButtonSearch();
    const message = await productInputPage.getFieldErrorMessage("店舗");
    expect(message).toBe("最大サイズを超えています。");

    await snapExpect();
  });

  test("WTY10601_32", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = await loadTestData("TY106/wty10601", "wty10601", "TC_7");
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY10601 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);
    await productInputPage.fillInputById("brCd", testData.formData.brCd_29);
    await productInputPage.fillInputById("btenCd", testData.formData.btenCd_32);
    await snapInput();

    // Verify:
    await productInputPage.clickButtonSearch();
    const message = await productInputPage.getFieldErrorMessage("店舗");
    expect(message).toBe("数値で入力してください。");

    await snapExpect();
  });

  test("WTY10601_33", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = await loadTestData("TY106/wty10601", "wty10601", "TC_7");
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY10601 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);
    await productInputPage.fillInputById("btenCd", testData.formData.btenCd_15);
    await productInputPage.fillInputById("shnCd", testData.formData.shnCd_33);
    await snapInput();

    // Verify:
    await productInputPage.blurShnCdInput();
    const shnCd = await productInputPage.getValueById("shnCd");
    expect(shnCd).toBe("ABC123ABC456XYZ789");

    await snapExpect();
  });

  test("WTY10601_34", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = await loadTestData("TY106/wty10601", "wty10601", "TC_7");
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY10601 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);
    await productInputPage.fillInputById("btenCd", testData.formData.btenCd_15);
    await productInputPage.fillInputById("shnCd", testData.formData.shnCd_38);
    await snapInput();

    // Verify:
    await productInputPage.blurShnCdInput();
    await productInputPage.clickButtonSearch();
    const message = await productInputPage.getFieldErrorMessage("商品");
    expect(message).toBe("最大サイズを超えています。");

    await snapExpect();
  });

  test("WTY10601_35", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = await loadTestData("TY106/wty10601", "wty10601", "TC_7");
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY10601 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);
    await productInputPage.fillInputById("btenCd", testData.formData.btenCd_15);
    await productInputPage.fillInputById("brCd", testData.formData.brCd_15);
    await snapInput();

    // Verify:
    await productInputPage.blurBrCdInput();
    await page.waitForTimeout(1000);
    const btNm = await productInputPage.getValueById("brNm");
    expect(btNm).toBe(testData.expected.brNm_39);

    await snapExpect();
  });

  test("WTY10601_36", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = await loadTestData("TY106/wty10601", "wty10601", "TC_7");
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY10601 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);
    await productInputPage.fillInputById("btenCd", testData.formData.btenCd_15);
    await productInputPage.fillInputById("brCd", testData.formData.brCd_40);
    await snapInput();

    // Verify:
    await productInputPage.blurBrCdInput();
    await page.waitForTimeout(1000);
    const btNm = await productInputPage.getValueById("brNm");
    expect(btNm).toBe(testData.expected.brNm_40);

    await snapExpect();
  });

  test("WTY10601_37", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = await loadTestData("TY106/wty10601", "wty10601", "TC_7");
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY10601 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);
    await productInputPage.fillInputById("brCd", testData.formData.brCd_41);
    await snapInput();

    // Verify:
    await productInputPage.clickButtonSearch();
    await page.waitForTimeout(1000);
    const message = await productInputPage.getFieldErrorMessage("分類");
    expect(message).toBe(
      "分類コードは、２桁または４桁または６桁で入力してください。",
    );

    await snapExpect();
  });

  test("WTY10601_38", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = await loadTestData("TY106/wty10601", "wty10601", "TC_7");
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY10601 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);
    await productInputPage.fillInputById("brCd", testData.formData.brCd_42);
    await snapInput();

    // Verify:
    await productInputPage.clickButtonSearch();
    await page.waitForTimeout(1000);
    const message = await productInputPage.getFieldErrorMessage("分類");
    expect(message).toBe("数値で入力してください。");

    await snapExpect();
  });

  test("WTY10601_40", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = await loadTestData("TY106/wty10601", "wty10601", "TC_7");
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY10601 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();

    // Verify:
    await productInputPage.clickButtonSearch();
    await page.waitForTimeout(1000);
    const message = await productInputPage.getFieldErrorMessage("分類");
    expect(message).toBe("商品、分類コードを入力してください。");

    await snapExpect();
  });

  test("WTY10601_47", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = await loadTestData("TY106/wty10601", "wty10601", "TC_7");
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY10601 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);
    await productInputPage.fillInputById("shnCd", testData.formData.shnCd_15);
    await productInputPage.fillInputById("brCd", testData.formData.brCd_15);
    await productInputPage.clickButtonSearch();
    await page.waitForTimeout(1000);
    await snapInput();

    // Verify:
    await page.waitForTimeout(1000);
    await productInputPage.clickFirstRow();
    await snapExpect();
  });

  test("WTY10601_63", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = await loadTestData("TY106/wty10601", "wty10601", "TC_7");
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY10601 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();

    // Verify:
    await productInputPage.clickBtenCdClearBtn();
    await page.waitForTimeout(1000);
    const btenCd = await productInputPage.getValueById("btenCd");
    expect(btenCd).toBe("");

    const btenNm = await productInputPage.getValueById("btenNm");
    expect(btenNm).toBe("");

    await snapExpect();
  });

  test("WTY10601_64", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = await loadTestData("TY106/wty10601", "wty10601", "TC_7");
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY10601 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);
    await productInputPage.fillInputById("shnCd", testData.formData.shnCd_15);
    await page.waitForTimeout(1000);
    await snapInput();

    // Verify:
    await productInputPage.clickShnCdClearBtn();
    await page.waitForTimeout(1000);
    const shnCd = await productInputPage.getValueById("shnCd");
    expect(shnCd).toBe("");

    await snapExpect();
  });

  test("WTY10601_65", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = await loadTestData("TY106/wty10601", "wty10601", "TC_7");
    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY10601 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);
    await productInputPage.fillInputById("brCd", testData.formData.brCd_15);
    await productInputPage.blurBrCdInput();
    await page.waitForTimeout(1000);
    await snapInput();

    // Verify:
    await productInputPage.clickBrCdClearBtn();
    await page.waitForTimeout(1000);
    const brCd = await productInputPage.getValueById("brCd");
    expect(brCd).toBe("");

    const brNm = await productInputPage.getValueById("brNm");
    expect(brNm).toBe("");

    await snapExpect();
  });
});
