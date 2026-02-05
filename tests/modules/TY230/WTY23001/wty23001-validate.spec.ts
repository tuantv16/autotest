import { test, expect, loadTestData } from '../../../base/base-test';
import { TY23001Page } from '../../../pages/TY230/wty23001.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';
import { COMMON_MESSAGES } from '../../../constants/messages';
import { API_ENDPOINTS } from '../../../constants/api-endpoints';

test.describe('WTY23001 - (見込み客登録)', () => {
  let summaryPage: TY23001Page;
  test.beforeEach(async ({ page, baseUrl }) => {
    summaryPage = new TY23001Page(page);
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
  });

  test.afterEach(async ({ page }, testInfo) => {
    await takeScreenshotOnFailure(page, testInfo);
  });

  test('WTY23001_27', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    //  validate 獲得担当
    const testData = loadTestData('TY230/wty23001', 'wty23001', 'TC_24');
    await indexedDBHelper.initializeDB({
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput(1);
    await summaryPage.fillTantoCdCallApi(testData.formData.tantoCd, snapInput);

    const apiResponsePromise = page.waitForResponse(
      (res) => {
        return (
          res.request().method() === 'POST' &&
          res.url().includes(API_ENDPOINTS.TZ108_WTZ10801TanInfoBC)
        );
      },
      { timeout: 15000 },
    );
    const apiResponse = await apiResponsePromise;
    expect(apiResponse.status()).toBe(200);

    await page.waitForTimeout(1000);
    const tanmn = await summaryPage.getValueById('tantoNm');

    const tanmnResponse =
      testData.TZ108_WTZ10801TanInfoBC_RESPONSE.outDS.tanInfoDT[0].tanTanNmKnj;

    expect(tanmn).toEqual(tanmnResponse);
    await snapExpect();
  });
  test('WTY23001_28', async ({ page, snapInput, snapExpect }) => {
    // require fields input
    await summaryPage.navigate();
    await snapInput();
    await summaryPage.scrollToBottom();
    await snapInput(1);
    await summaryPage.scrollToTop();
    await summaryPage.clickConfirmMenu();
    await page.waitForTimeout(1000);
    await snapExpect(1);
    await summaryPage.scrollToBottom();
    await snapExpect(2);
  });
  test('WTY23001_29', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    //  validate 獲得担当 is not definde
    const testData = loadTestData('TY230/wty23001', 'wty23001', 'TC_29');

    await indexedDBHelper.initializeDB({
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await summaryPage.fillTantoCdCallApi(
      testData.formData_TC26.tantoCd,
      snapInput,
    );

    const apiResponsePromise = page.waitForResponse(
      (res) => {
        return (
          res.request().method() === 'POST' &&
          res.url().includes(API_ENDPOINTS.TZ108_WTZ10801TanInfoBC)
        );
      },
      { timeout: 15000 },
    );
    const apiResponse = await apiResponsePromise;
    expect(apiResponse.status()).toBe(200);

    await page.waitForTimeout(1000);
    const tanmn = await summaryPage.getTantoNm();

    expect(tanmn).toEqual('');
    await snapExpect();
  });
  test('WTY23001_30', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    //  validate 獲得担当 is not number
    const testData = loadTestData('TY230/wty23001', 'wty23001', 'TC_24');

    await indexedDBHelper.initializeDB({
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await summaryPage.fillTantoCd(testData.formData_TC25.tantoCd, snapInput);
    await summaryPage.closeMenu();
    await page.waitForTimeout(1000);
    const tanmn = await summaryPage.getTantoNm();

    expect(tanmn).toEqual('');
    await snapExpect();
  });

  test('WTY23001_35', async ({ page, snapExpect }) => {
    //  validate フォロー日  match format
    await summaryPage.navigate();
    await page.waitForTimeout(1000);

    const followDate = summaryPage.getTodayDate();

    await summaryPage.fillFollowDate(followDate);
    await summaryPage.fillFollowKsu('99');
    await page.waitForTimeout(1000);
    await summaryPage.clickConfirmMenu();
    await page.waitForTimeout(1000);
    const isDialog = await summaryPage.isErrorDialogVisible();

    expect(isDialog).toBe(false);
    await page.waitForTimeout(1000);
    await snapExpect();
  });
  test('WTY23001_36', async ({ page, snapExpect }) => {
    //  validate フォロー日 is empty
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await summaryPage.scrollToBottom();
    await summaryPage.fillFollowDate('');
    await summaryPage.clickConfirmMenu();
    await page.waitForTimeout(1000);
    const tanmn = await summaryPage.getFollowDate();
    expect(tanmn).not.toBeTruthy();
    const message = await summaryPage.waitForTextInBody(
      COMMON_MESSAGES.PLEASE_ENTER_FOLLOW_DATE,
      200,
    );
    expect(message).toBe(true);
    await snapExpect();
  });
  test('WTY23001_37', async ({ page, snapExpect }) => {
    //  validate フォロー日 > 運用日
    await summaryPage.navigate();
    await page.waitForTimeout(1000);

    const followDate = summaryPage.getTodayDate(1);
    await summaryPage.scrollToBottom();
    await summaryPage.focusInput('followDate', false);

    await page.waitForTimeout(1000);
    await summaryPage.fillInputByName('followDate', followDate);
    await summaryPage.blurInput('followDate', false);
    await summaryPage.clickConfirmMenu();
    await page.waitForTimeout(1000);
    await summaryPage.clickConfirmErrorDialog();
    const message = await summaryPage.waitForTextInBody(
      COMMON_MESSAGES.FOLLOW_DATE_MUST_BE_BEFORE_OPERATION_DATE,
      200,
    );
    expect(message).toBe(true);
    await snapExpect();
  });
  test('WTY23001_38', async ({ page, snapExpect }) => {
    //  validate ﾌｫﾛｰ回数 true
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await summaryPage.scrollToBottom();
    await summaryPage.fillFollowKsu('99');

    const followKsu = await summaryPage.getFollowKsu();
    expect(followKsu).toEqual('99');
    await snapExpect();
  });
  test('WTY23001_39', async ({ page, snapExpect }) => {
    //  validate ﾌｫﾛｰ回数 true
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await summaryPage.scrollToBottom();
    await summaryPage.fillFollowKsu('');
    await summaryPage.clickConfirmMenu();
    await page.waitForTimeout(1000);
    await summaryPage.clickConfirmErrorDialog();
    const message = await summaryPage.waitForTextInBody(
      'フォロー日を入力してください',
      200,
    );
    expect(message).toBe(true);
    await snapExpect();
  });

  test('WTY23001_40', async ({ page, snapExpect }) => {
    //  validate ﾌｫﾛｰ回数 -1
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await summaryPage.scrollToBottom();
    await summaryPage.fillFollowKsu('-1');

    await page.waitForTimeout(1000);
    await summaryPage.clickConfirmMenu();
    await page.waitForTimeout(1000);
    const message = await summaryPage.waitForTextInBody(
      COMMON_MESSAGES.FOLLOW_COUNT_MUST_BE_1_OR_MORE,
      200,
    );
    expect(message).toBe(true);
    await snapExpect();
  });
  test('WTY23001_41', async ({ page, snapExpect }) => {
    //  validate ﾌｫﾛｰ回数 999
    await summaryPage.navigate();
    await page.waitForTimeout(1000);

    await summaryPage.scrollToBottom();
    await snapExpect(1);
    await summaryPage.fillFollowKsu('999');
    await page.waitForTimeout(1000);

    const followKsu = await summaryPage.getFollowKsu();
    expect(followKsu).toEqual('99');
    await summaryPage.scrollToBottom();
    await snapExpect(2);
  });
  test('WTY23001_42', async ({ page, snapExpect }) => {
    //  validate コメント text chứa HTML tag, SQL Syntex, Java script
    // { key: "cmt", text: "コメント" },

    const testData = loadTestData('TY230/wty23001', 'wty23001', 'TC_27');
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await summaryPage.focusInput('cmt', false);

    await page.waitForTimeout(1000);
    await summaryPage.fillInputByName('cmt', testData.formData.comment_special);
    await summaryPage.blurInput('cmt', false);

    await summaryPage.clickConfirmMenu();
    await page.waitForTimeout(1000);
    const cmt = await summaryPage.getValueByName('cmt');
    expect(cmt).toBeTruthy();
    await summaryPage.scrollToBottom();
    await snapExpect();
  });
  test('WTY23001_43', async ({ page, snapInput, snapExpect }) => {
    //  validate コメント
    // { key: "cmt", text: "コメント" },

    const testData = loadTestData('TY230/wty23001', 'wty23001', 'TC_27');
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await summaryPage.scrollToBottom();
    await snapInput();
    await summaryPage.focusInput('cmt', false);

    await page.waitForTimeout(1000);
    await summaryPage.fillInputByName('cmt', testData.formData.cmt_100);
    await summaryPage.blurInput('cmt', false);

    await summaryPage.clickConfirmMenu();
    await page.waitForTimeout(1000);
    const cmt = await summaryPage.getValueByName('cmt');
    expect(cmt).toBeTruthy();
    await summaryPage.scrollToBottom();
    await snapExpect();
  });
  test('WTY23001_44', async ({ page, snapInput, snapExpect }) => {
    //  validate コメント > 100 type
    // { key: "cmt", text: "コメント" },

    const testData = loadTestData('TY230/wty23001', 'wty23001', 'TC_27');
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await summaryPage.scrollToBottom();
    await snapInput();
    await summaryPage.focusInput('cmt', false);

    await page.waitForTimeout(1000);
    await summaryPage.fillInputByName('cmt', testData.formData.cmt_122);
    await summaryPage.blurInput('cmt', false);
    await summaryPage.clickConfirmMenu();
    await page.waitForTimeout(1000);
    const message = await summaryPage.waitForTextInBody(
      COMMON_MESSAGES.COMMENT_LENGTH_EXCEEDED,
      200,
    );
    expect(message).toBe(true);
    await summaryPage.scrollToBottom();
    await snapExpect();
  });
});
