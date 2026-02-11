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
  test('WTY23001_51', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    //  register Potential Customers
    const testData = loadTestData('TY230/wty23001', 'wty23001', 'TC_48');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await summaryPage.navigate();

    await summaryPage.fillTantoCd(testData.formData.tantoCd);
    await summaryPage.fillMkmTsoCd(testData.formData.mkmTsoCd_27, snapInput);
    await snapInput(1);
    const followDate = summaryPage.getTodayDate();

    await summaryPage.fillFollowDate(followDate);
    await summaryPage.fillFollowKsu(testData.formData.followKsu);
    await summaryPage.fillComment(testData.formData.cmt);
    await snapInput(2);

    await summaryPage.clickConfirmMenu();
    await page.waitForTimeout(1000);
    await snapInput(3);
    await summaryPage.clickConfirmErrorDialog();
    await page.waitForTimeout(2000);

    await summaryPage.verifyDefaultInputsValue(expect);
    await snapExpect(1);
    await summaryPage.scrollToBottom();
    await snapExpect(2);
  });
  test('WTY23001_54', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    //  register Potential Customers error
    const testData = loadTestData('TY230/wty23001', 'wty23001', 'TC_51');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await summaryPage.navigate();

    await summaryPage.fillTantoCd(testData.formData.tantoCd);
    await summaryPage.fillMkmTsoCd(testData.formData.mkmTsoCd, snapInput);
    await snapInput(1);
    const followDate = summaryPage.getTodayDate();

    await summaryPage.fillFollowDate(followDate);
    await summaryPage.fillFollowKsu(testData.formData.followKsu);
    await summaryPage.fillComment(testData.formData.cmt);
    await page.waitForTimeout(500);
    await summaryPage.scrollToBottom();
    await snapInput(2);
    await summaryPage.clickConfirmMenu();
    await page.waitForTimeout(1000);
    await snapInput(3);
    await summaryPage.clickConfirmErrorDialog();
    await page.waitForTimeout(2000);

    // show popup error dialog
    const isShowDialogError = await summaryPage.isErrorDialogVisible();
    expect(isShowDialogError).toBe(true);
    await snapExpect(1);

    await summaryPage.clickConfirmErrorDialog();
    await page.waitForTimeout(2000);
    await summaryPage.verifyInputsNotEmpty(expect);
    await snapExpect(2);
  });
});
