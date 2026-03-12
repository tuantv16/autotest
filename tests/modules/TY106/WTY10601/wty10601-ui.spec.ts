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

  test("WTY10601_12", async ({
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

    await snapExpect();
  });

  test("WTY10601_13", async ({
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
    await productInputPage.openMenu();
    const btnMenuVisible = await productInputPage.btnMenuIsVisible();
    expect(btnMenuVisible).toBe(true);

    await snapExpect();
  });

  test("WTY10601_14", async ({
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
    const btnClearIsVisible = await productInputPage.btnClearIsVisible();
    expect(btnClearIsVisible).toBe(true);

    await snapExpect();
  });

  test("WTY10601_15", async ({
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
    const btenCdInputVisible = await productInputPage.btenCdInputVisible();
    expect(btenCdInputVisible).toBe(true);
    await productInputPage.fillInputById("btenCd", testData.formData.btenCd_15);

    const shnCdInputVisible = await productInputPage.shnCdInputVisible();
    expect(shnCdInputVisible).toBe(true);
    await productInputPage.fillInputById("shnCd", testData.formData.shnCd_15);

    const brCdInputVisible = await productInputPage.brCdInputVisible();
    expect(brCdInputVisible).toBe(true);
    await productInputPage.fillInputById("brCd", testData.formData.brCd_15);

    await snapExpect();
  });

  test("WTY10601_16", async ({
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
    const btenNmInputVisible = await productInputPage.btenNmInputVisible();
    expect(btenNmInputVisible).toBe(true);

    const btenNmInputDisabled = await productInputPage.btenNmInputDisabled();
    expect(btenNmInputDisabled).toBe(true);

    const brNmInputVisible = await productInputPage.brNmInputVisible();
    expect(brNmInputVisible).toBe(true);

    const brNmInputDisabled = await productInputPage.brNmInputDisabled();
    expect(brNmInputDisabled).toBe(true);

    await snapExpect();
  });

  test("WTY10601_17", async ({
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
    const isRadioOpened = await productInputPage.isRadioOpened();
    expect(isRadioOpened).toBe(true);

    await snapExpect();
  });

  test("WTY10601_18", async ({
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
    await productInputPage.clickBtnToggle();
    await page.waitForTimeout(1000);

    const isRadioClosed = await productInputPage.isRadioClosed();
    expect(isRadioClosed).toBe(true);

    await snapExpect(1);

    await productInputPage.clickBtnToggle();
    await page.waitForTimeout(1000);

    const isRadioOpened = await productInputPage.isRadioOpened();
    expect(isRadioOpened).toBe(true);

    await snapExpect(2);
  });

  test("WTY10601_19", async ({
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
    const isRadioOpened = await productInputPage.isRadioOpened();
    expect(isRadioOpened).toBe(true);

    const hjZaiYRadioChecked = await productInputPage.hjZaiYRadioChecked();
    expect(hjZaiYRadioChecked).toBe(true);

    await snapExpect();
  });

  test("WTY10601_20", async ({
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
    const isRadioOpened = await productInputPage.isRadioOpened();
    expect(isRadioOpened).toBe(true);

    const zaiBtenDRadioChecked = await productInputPage.zaiBtenDRadioChecked();
    expect(zaiBtenDRadioChecked).toBe(true);

    await snapExpect();
  });

  test("WTY10601_21", async ({
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
    const buttonSearchIsVisible =
      await productInputPage.buttonSearchIsVisible();
    expect(buttonSearchIsVisible).toBe(true);

    const buttonSearchIsClickable =
      await productInputPage.buttonSearchIsClickable();
    expect(buttonSearchIsClickable).toBe(true);

    await snapExpect();
  });

  test("WTY10601_23", async ({
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
    await productInputPage.focusBtenCdInput();
    await page.waitForTimeout(1000);
    const searchStoreButtonIsVisible =
      await productInputPage.searchStoreButtonIsVisible();
    expect(searchStoreButtonIsVisible).toBe(true);

    await snapExpect();
  });

  test("WTY10601_24", async ({
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
    await productInputPage.focusBrCdInput();
    await page.waitForTimeout(1000);
    const searchDaiCdButtonIsVisible =
      await productInputPage.searchDaiCdButtonIsVisible();
    expect(searchDaiCdButtonIsVisible).toBe(true);

    const searchChuCdButtonIsVisible =
      await productInputPage.searchChuCdButtonIsVisible();
    expect(searchChuCdButtonIsVisible).toBe(true);

    await snapExpect();
  });
});
