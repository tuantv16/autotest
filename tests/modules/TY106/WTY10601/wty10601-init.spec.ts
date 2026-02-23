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

  test("WTY10601_7", async ({
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
    const pageTitle = await productInputPage.getPageTitle();
    expect(pageTitle).toBe(true);

    const btenCdInputVisible = await productInputPage.btenCdInputVisible();
    expect(btenCdInputVisible).toBe(true);

    const btenNmInputVisible = await productInputPage.btenNmInputVisible();
    expect(btenNmInputVisible).toBe(true);

    const shnCdInputVisible = await productInputPage.shnCdInputVisible();
    expect(shnCdInputVisible).toBe(true);

    const brCdInputVisible = await productInputPage.brCdInputVisible();
    expect(brCdInputVisible).toBe(true);

    const brNmInputVisible = await productInputPage.brNmInputVisible();
    expect(brNmInputVisible).toBe(true);

    const tableEmpty = await productInputPage.isAgGridEmpty();
    expect(tableEmpty).toBe(true);

    await snapExpect();
  });

  test("WTY10601_9", async ({
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
    const btenCd = await productInputPage.getValueById("btenCd");
    expect(btenCd).toBe(testData.expected.btenCd_09);

    const hjZaiYRadioChecked = await productInputPage.hjZaiYRadioChecked();
    expect(hjZaiYRadioChecked).toBe(true);

    const zaiBtenDRadioChecked = await productInputPage.zaiBtenDRadioChecked();
    expect(zaiBtenDRadioChecked).toBe(true);

    const shnCd = await productInputPage.getValueById("shnCd");
    expect(shnCd).toBe("");

    const brCd = await productInputPage.getValueById("brCd");
    expect(brCd).toBe("");

    await snapExpect();
  });

  test("WTY10601_10", async ({
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
    const hjZaiYRadioVisible = await productInputPage.hjZaiYRadioVisible();
    expect(hjZaiYRadioVisible).toBe(true);

    const hjZaiJRadioVisible = await productInputPage.hjZaiJRadioVisible();
    expect(hjZaiJRadioVisible).toBe(true);

    const zaiBtenDRadioVisible = await productInputPage.zaiBtenDRadioVisible();
    expect(zaiBtenDRadioVisible).toBe(true);

    const zaiBtenJRadioVisible = await productInputPage.zaiBtenJRadioVisible();
    expect(zaiBtenJRadioVisible).toBe(true);

    await snapExpect();
  });
});
