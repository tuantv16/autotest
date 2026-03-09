import { test, expect, loadTestData } from '../../../base/base-test';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';
import { TY23002Page } from '../../../pages/TY230/wty23002.page';
import { WTY23002_MESSAGES } from '../../../constants/messages';

test.describe('WTY23002 - 見込み客照会', () => {
  let summaryPage: TY23002Page;
  test.beforeEach(async ({ page, baseUrl }) => {
    summaryPage = new TY23002Page(page);
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);
  });
  test.afterEach(async ({ page }, testInfo) => {
    await takeScreenshotOnFailure(page, testInfo);
  });
  test('WTY23002_51', async ({ page, snapInput, snapExpect }) => {
    await summaryPage.navigate();
    await page.waitForTimeout(500);
    await summaryPage.openMenu();
    await snapInput();
    await page.waitForTimeout(500);
    await summaryPage.clickItemMenu(summaryPage.labels.viewDetail);
    await page.waitForTimeout(500);

    await summaryPage.verifyStayOnCurrentPage(expect);
    await snapExpect();
  });
  test('WTY23002_45', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = await loadTestData('TY230/wty23002', 'wty23002', 'TC_44');

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(1000);

    await summaryPage.selectOptionInSelectBox(
      'rank',
      summaryPage.options.rank[1],
      snapInput,
    );
    await page.waitForTimeout(500);
    await summaryPage.clickButtonSearch();
    await page.waitForTimeout(1000);

    const isShowDialog = await summaryPage.isErrorDialogVisible();
    expect(isShowDialog).toBeTruthy();
    await snapExpect(1);
    const messageError = await summaryPage.waitForTextInBody(
      WTY23002_MESSAGES.NO_DATA_FOUND,
    );
    expect(messageError).toBeTruthy();
    await snapExpect(2);
  });
  test('WTY23002_46', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = await loadTestData('TY230/wty23002', 'wty23002', 'TC_44');

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await summaryPage.fillTantoCd(testData.formData.tanCd);
    await page.waitForTimeout(500);
    await summaryPage.fillMkmTsoCd(testData.formData.mkmTsoCd, snapInput);
    await page.waitForTimeout(500);
    await summaryPage.fillFollowDate(testData.formData.tyusDateFromFrom);
    await summaryPage.fillFollowKsu(testData.formData.tyusDateFromTo);
    await snapInput(2);
    await page.waitForTimeout(500);

    await summaryPage.clickButtonSearch();
    await page.waitForTimeout(1000);

    await summaryPage.verifyTableHeaders(expect);
    await summaryPage.verifyTableData(expect);
    await page.waitForTimeout(500);
    await snapExpect(1);
    await summaryPage.clickRowTable(0);
    await page.waitForTimeout(1000);
    await summaryPage.verifyItems(summaryPage.popupRecodeItems, expect);
    await snapExpect(2);
  });
  test('WTY23002_54', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = await loadTestData('TY230/wty23002', 'wty23002', 'TC_44');

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await summaryPage.fillTantoCd(testData.formData.tanCd, snapInput);
    await page.waitForTimeout(500);
    await summaryPage.fillMkmTsoCd(testData.formData.mkmTsoCd);
    await page.waitForTimeout(500);
    await summaryPage.fillFollowDate(testData.formData.tyusDateFromFrom);
    await summaryPage.fillFollowKsu(testData.formData.tyusDateFromTo);
    await snapInput(2);
    await page.waitForTimeout(500);

    await summaryPage.clickButtonSearch();
    await page.waitForTimeout(1000);

    await summaryPage.verifyTableHeaders(expect);
    await summaryPage.verifyTableData(expect);
    await snapExpect(1);
    await page.waitForTimeout(500);

    await summaryPage.openMenu();
    await snapExpect(2);
    await page.waitForTimeout(500);
    await summaryPage.clickItemMenu(summaryPage.labels.edit);
    await page.waitForTimeout(500);

    await summaryPage.verifyStayOnCurrentPage(expect);
    await snapExpect(3);
  });
});
