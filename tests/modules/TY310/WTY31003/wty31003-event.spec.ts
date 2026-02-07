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

  test("WTY31003_52", async ({
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

    await productInputPage.fillInputTanCd(testData.formData.tanCd_52);
    await productInputPage.fillValueIraiDateFrom(
      testData.formData.iraiDateFrom_31,
    );
    await productInputPage.fillValueIraiDateTo(testData.formData.iraiDateTo_31);
    await productInputPage.fillBnrCdInput(testData.formData.bnrCd_52);
    await productInputPage.fillInputShnCd(testData.formData.shnCd_52);
    await productInputPage.blurInputShnCd();
    await page.waitForTimeout(2000);
    await snapInput();

    await productInputPage.clickClearButton();
    await page.waitForTimeout(1000);

    // Verify:
    const tanCd = await productInputPage.getValueById("tanCd_TextBox");
    expect(tanCd).toBe("");

    const tanNm = await productInputPage.getValueById("tanNm_Label");
    expect(tanNm).toBe("");

    const dateFrom = await productInputPage.getValueByName(
      "iraiDateFrom_TextBox",
    );
    expect(dateFrom).toBe("");

    const dateTo = await productInputPage.getValueByName("iraiDateTo_TextBox");
    expect(dateTo).toBe("");

    const shnCd = await productInputPage.getValueById("shn_TextBox");
    expect(shnCd).toBe("");

    const kataNm = await productInputPage.getValueById("kata_Label");
    expect(kataNm).toBe("");

    await snapExpect();
  });
});
