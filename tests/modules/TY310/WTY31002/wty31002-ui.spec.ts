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

  test("WTY31002_11", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY310/wty31002", "wty31002", "TC_11");

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

    // Verify: Page title displays
    const pageTitle = await productInputPage.getPageTitle();
    expect(pageTitle).toBe(true);

    await snapExpect();
  });

  test("WTY31002_12", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY310/wty31002", "wty31002", "TC_11");

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

    // Verify: Buttons in action menu are displayed
    await productInputPage.openMenu();
    const btnMenuIsVisible = await productInputPage.btnMenuIsVisible();
    expect(btnMenuIsVisible).toBe(true);

    await snapExpect();
  });

  test("WTY31002_13", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY310/wty31002", "wty31002", "TC_11");

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

    // Verify: Buttons in footer are displayed
    const btnConfirm = await productInputPage.isConfirmButtonVisible();
    expect(btnConfirm).toBe(true);

    await snapExpect();
  });

  test("WTY31002_14", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY310/wty31002", "wty31002", "TC_11");

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

    // Verify: Input fields are displayed and readonly
    const iriNoInputVisible = await productInputPage.isIriNoInputVisible();
    expect(iriNoInputVisible).toBe(true);

    const iriDateInputVisible = await productInputPage.isIriDateInputVisible();
    expect(iriDateInputVisible).toBe(true);

    const iriNoInputReadonly = await productInputPage.isIriNoInputReadonly();
    expect(iriNoInputReadonly).toBe(true);

    const iriDateInputReadonly =
      await productInputPage.isIriDateInputReadonly();
    expect(iriDateInputReadonly).toBe(true);

    await snapExpect();
  });

  test("WTY31002_15", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY310/wty31002", "wty31002", "TC_11");

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

    // Verify: Grid is displayed with correct columns
    const isColumnsVisible = await productInputPage.areGridColumnsVisible();
    expect(isColumnsVisible).toBe(true);
    await snapExpect();
  });

  test("WTY31002_16", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY310/wty31002", "wty31002", "TC_11");

    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY31001 screen
    await productInputPage.navigate();
    await page.waitForTimeout(500);
    await snapInput();

    // Verify: Select Template Comment box is displayed
    await productInputPage.selectTemplateCommentVisible();

    // Verify: Select Template Comment box is clickable
    await productInputPage.selectTemplateCommentClick();
    await page.waitForTimeout(1000);

    await snapExpect();
  });
  test("WTY31002_17", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY310/wty31002", "wty31002", "TC_11");

    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY31001 screen
    await productInputPage.navigate();
    await page.waitForTimeout(500);
    await snapInput();

    // Verify: Select Comment Text Area box is enterable
    await productInputPage.scrollToBottom();
    await productInputPage.fillValueInCommentTextArea(
      testData.formData.comment_TextArea_17,
    );
    await page.waitForTimeout(500);
    const commentTextAreaValue =
      await productInputPage.getValueCommentTextArea();
    expect(commentTextAreaValue).toBe(testData.formData.comment_TextArea_17);

    await snapExpect();
  });
  test("WTY31002_19", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY310/wty31002", "wty31002", "TC_11");

    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY31001 screen
    await productInputPage.navigate();
    await page.waitForTimeout(500);

    await productInputPage.openMenu();
    await page.waitForTimeout(1000);
    await snapInput();

    await productInputPage.clickBtnEdit();
    await page.waitForTimeout(1000);

    const msg = await productInputPage.getErrorMessageDialog();
    expect(msg).toContain("TE5175");
    expect(msg).toContain("明細を選択してください。");

    await snapExpect();
  });

  test("WTY31002_20", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY310/wty31002", "wty31002", "TC_11");

    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY31001 screen
    await productInputPage.navigate();
    await page.waitForTimeout(500);

    await productInputPage.clickFirstRow();
    await page.waitForTimeout(500);

    await productInputPage.openMenu();
    await snapInput();
    await productInputPage.clickBtnEdit();
    await page.waitForTimeout(500);
    await snapExpect();
  });

  test("WTY31002_21", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY310/wty31002", "wty31002", "TC_11");

    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY31001 screen
    await productInputPage.navigate();
    await page.waitForTimeout(500);
    await snapInput();

    await productInputPage.openMenu();
    await productInputPage.clickBtnProductCancel();
    await page.waitForTimeout(1000);

    const msg = await productInputPage.getErrorMessageDialog();
    expect(msg).toContain("TE5175");
    expect(msg).toContain("明細を選択してください。");

    await snapExpect();
  });

  test("WTY31002_22", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY310/wty31002", "wty31002", "TC_11");

    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY31001 screen
    await productInputPage.navigate();
    await page.waitForTimeout(500);
    await snapInput();

    await productInputPage.clickFirstRow();
    await page.waitForTimeout(500);

    await productInputPage.openMenu();
    await productInputPage.clickBtnProductCancel();
    await page.waitForTimeout(500);

    const msg = await productInputPage.getErrorMessageDialog();
    expect(msg).toContain("TN5021");
    expect(msg).toContain("商品取消します。よろしいですか？");

    await snapExpect();
  });

  test("WTY31002_23", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY310/wty31002", "wty31002", "TC_11");

    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY31001 screen
    await productInputPage.navigate();
    await page.waitForTimeout(500);
    await snapInput();

    // Verify: Input 依頼番号 = ''
    const iriNoInputValue = await productInputPage.getIriNoInputValue();
    expect(iriNoInputValue).toBe("");

    await productInputPage.selectTemplateCommentVisible();
    const commentTextAreaVisible =
      await productInputPage.commentTextAreaVisible();
    expect(commentTextAreaVisible).toBe(true);
    await snapExpect();
  });

  test("WTY31002_24", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY310/wty31002", "wty31002", "TC_24");

    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY31001 screen
    await productInputPage.navigate();
    await page.waitForTimeout(500);
    await snapInput();

    // Verify: Input 依頼番号 = ''
    const iriNoInputValue = await productInputPage.getIriNoInputValue();
    expect(iriNoInputValue).not.toBe("");

    await productInputPage.selectTemplateCommentVisible();
    const commentTextAreaVisible =
      await productInputPage.commentTextAreaVisible();
    expect(commentTextAreaVisible).toBe(true);
    await snapExpect();
  });

  test("WTY31002_25", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY310/wty31002", "wty31002", "TC_25");

    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY31001 screen
    await productInputPage.navigate();
    await page.waitForTimeout(500);
    await snapInput();

    // Verify: Input 依頼番号 = ''
    await productInputPage.openMenu();
    await snapExpect(1);
    const iriNoInputValue = await productInputPage.getIriNoInputValue();
    expect(iriNoInputValue).not.toBe("");

    const commentTextAreaDisabled =
      await productInputPage.commentTextAreaDisabled();
    expect(commentTextAreaDisabled).toBe(true);
    await snapExpect(2);
  });
});
