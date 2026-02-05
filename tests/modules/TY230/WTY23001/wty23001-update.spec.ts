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
  test('WTY23001_52', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    //  update Potential Customers success
    const testData = loadTestData('TY230/wty23001', 'wty23001', 'TC_49');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(500);

    await snapInput(1);
    await summaryPage.fillFollowKsu(testData.formData.followKsu);
    await summaryPage.fillComment(testData.formData.cmt);
    await summaryPage.scrollToBottom();
    await snapInput(2);
    await page.waitForTimeout(1000);

    await summaryPage.clickConfirmMenu();
    await page.waitForTimeout(500);
    await snapExpect(1);
    await summaryPage.clickConfirmErrorDialog();
    await page.waitForTimeout(2000);

    await summaryPage.verifyDefaultInputsValue(expect);
    await summaryPage.scrollToBottom();
    await snapExpect(2);
  });
  test('WTY23001_55', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    //  update Potential Customers error
    const testData = loadTestData('TY230/wty23001', 'wty23001', 'TC_52');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(500);
    await snapInput(1);

    await summaryPage.fillFollowKsu(testData.formData.followKsu);
    await summaryPage.fillComment(testData.formData.cmt);
    await page.waitForTimeout(1000);
    await summaryPage.scrollToBottom();
    await snapInput(2);
    await summaryPage.clickConfirmMenu();
    await page.waitForTimeout(1000);
    await snapExpect(1);
    await summaryPage.clickConfirmErrorDialog();
    await page.waitForTimeout(2000);

    const isShowDialogError = await summaryPage.isErrorDialogVisible();
    expect(isShowDialogError).toBe(true);
    await snapExpect(2);
    await summaryPage.clickConfirmErrorDialog();
    await page.waitForTimeout(500);
    await summaryPage.verifyInputsNotEmpty(expect);
    await snapExpect(3);
  });
});
