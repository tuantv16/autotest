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

  test("WTY31002_26", async ({
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

    // Step 2: Open WTY31002 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    // Step 3: Click on template select box to open menu
    await productInputPage.scrollToBottom();
    await productInputPage.selectTemplateCommentClick();
    await page.waitForTimeout(500);

    await snapExpect();
  });

  test("WTY31002_27", async ({
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

    // Step 2: Open WTY31002 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);
    await productInputPage.scrollToBottom();
    await snapInput();

    // Step 3: Input comment into textarea
    await productInputPage.fillValueInCommentTextArea(
      testData.formData.comment_TextArea_26,
    );
    await page.waitForTimeout(500);

    // Verify: Comment was entered successfully
    const actualComment = await productInputPage.getValueCommentTextArea();
    expect(actualComment).toBe(testData.formData.comment_TextArea_26);

    await snapExpect();
  });

  test("WTY31002_28", async ({
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

    // Step 2: Open WTY31002 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    // Step 3: Verify template select box is empty
    await productInputPage.scrollToBottom();
    await page.waitForTimeout(500);

    await productInputPage.clickConfirmButton();
    await page.waitForTimeout(1000);

    // Verify: Error message is displayed
    const msg = await productInputPage.getFieldErrorMessage("定型コメント");
    expect(msg).toContain("定型コメントは必須項目です。");
    await snapExpect();
  });

  test("WTY31002_29", async ({
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

    // Step 2: Open WTY31002 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);
    await productInputPage.scrollToBottom();

    await snapInput();

    // Step 3: Select a template first
    await productInputPage.selectTemplateCommentClick();
    await page.waitForTimeout(500);

    // Step 4: Input comment > 4000 bytes
    const fullWidthComment = "あ".repeat(2001); // 4002 bytes
    await productInputPage.fillValueInCommentTextArea(fullWidthComment);
    await page.waitForTimeout(500);

    // Step 5: Click confirm button
    await productInputPage.clickConfirmButton();
    await page.waitForTimeout(1000);

    // Verify: Error message is displayed
    const msg = await productInputPage.getFieldErrorMessage("ｺﾒﾝﾄ入力");
    expect(msg).toContain("コメントは4000バイト以下で入力してください。");

    await snapExpect();
  });

  test("WTY31002_30", async ({
    page,
    baseUrl,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData("TY310/wty31002", "wty31002", "TC_30");

    // Step 1: Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    // Step 2: Open WTY31002 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);
    await productInputPage.scrollToBottom();

    await snapInput();

    // Step 3: Select a template first
    await productInputPage.selectTemplateCommentClick();
    await page.waitForTimeout(500);

    // Step 4: Input comment > 4000 bytes
    const fullWidthComment = "あ".repeat(2000); // 4000 bytes
    await productInputPage.fillValueInCommentTextArea(fullWidthComment);
    await page.waitForTimeout(500);

    // Step 5: Click confirm button
    await productInputPage.clickConfirmButton();

    // Verify: Error message is displayed
    const msg = await productInputPage.getErrorMessageDialog();
    expect(msg).not.toContain("コメントは4000バイト以下で入力してください。");
    await snapExpect();
  });

  test("WTY31002_32", async ({
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

    // Step 2: Open WTY31002 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);
    await productInputPage.scrollToBottom();
    await snapInput();

    // Step 3: Click first row to select
    await productInputPage.clickFirstRow();
    await page.waitForTimeout(500);

    // Verify:
    const isButtonCancelProVisible =
      await productInputPage.isButtonCancelProVisible();
    expect(isButtonCancelProVisible).toBe(true);

    const isButtonEditProVisible =
      await productInputPage.isButtonEditProVisible();
    expect(isButtonEditProVisible).toBe(true);

    await snapExpect();
  });

  test("WTY31002_34", async ({
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

    // Step 2: Open WTY31002 screen
    await productInputPage.navigate();
    await page.waitForTimeout(1000);
    await productInputPage.openMenu();
    await snapInput();

    // Step 4: Click Add Product button (商品入力)
    const [newPage] = await Promise.all([
      page.context().waitForEvent("page"),
      await productInputPage.clickButtonProductInput(),
    ]);

    // Verify: New tab is opened with WTY31001
    await newPage.waitForLoadState("domcontentloaded");
    expect(newPage.url()).toContain("WTY31001");
    await newPage.waitForTimeout(1000);
    await snapExpect();
  });

  test("WTY31002_37", async ({
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

    // Step 2: Open WTY31002 screen
    await productInputPage.navigate();
    await page.waitForTimeout(2000);
    // await productInputPage.scrollToBottom();
    await snapInput();

    // Step 3: Select one row and Click 商品取消
    await productInputPage.clickFirstRow();
    await page.waitForTimeout(2000);

    await productInputPage.clickButtonCancelPro();
    await page.waitForTimeout(200);

    const msg = await productInputPage.getErrorMessageDialog();
    expect(msg).toContain("TN5021");
    expect(msg).toContain("商品取消します。よろしいですか？");
    await page.waitForTimeout(200);
    await snapExpect(1);

    // Step 4: Click OK on dialog
    await productInputPage.clickCancelDialogButton();
    await page.waitForTimeout(1000);
    await snapExpect(2);
  });
});
