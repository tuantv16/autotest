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
  test('WTY23002_44', async ({
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
    await snapInput(1);
    await page.waitForTimeout(500);

    await summaryPage.clickButtonSearch();
    await page.waitForTimeout(10000);

    await summaryPage.verifyTableHeaders(expect);
    await summaryPage.verifyTableData(expect);
    await snapExpect(1);

    await summaryPage.scrollToBottom();
    await snapExpect(2);
  });
  test('WTY23002_50', async ({
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
    await snapInput(1);
    await page.waitForTimeout(500);

    await summaryPage.clickButtonSearch();
    await page.waitForTimeout(10000);

    await summaryPage.verifyTableHeaders(expect);
    await summaryPage.verifyTableData(expect);
    await snapExpect(1);
    await page.waitForTimeout(1000);

    await summaryPage.verifyEndOfData();
    await snapExpect(2);
    await summaryPage.scrollToBottom();
    await snapExpect(3);
  });
});
