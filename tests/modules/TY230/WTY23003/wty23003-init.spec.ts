import { test, expect, loadTestData } from '../../../base/base-test';
import { TY23003Page } from '../../../pages/TY230/wty23003.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';

test.describe('WTY23003 - 見込み客詳細', () => {
  let summaryPage: TY23003Page;
  test.beforeEach(async ({ page, baseUrl }) => {
    summaryPage = new TY23003Page(page);
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);
  });
  test.afterEach(async ({ page }, testInfo) => {
    await takeScreenshotOnFailure(page, testInfo);
  });

  test('WTY23003_04', async ({ page, indexedDBHelper, snapExpect }) => {
    // verify init screen data from WTY23002

    const testData = loadTestData('TY230/wty23003', 'wty23003', 'TC_04');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await summaryPage.openMenu();
    // Verify title page
    const titlePage = await summaryPage.verifyPageTitle(expect);
    expect(titlePage).toBe(true);

    await summaryPage.verifyInputsNotEmpty(expect);
    await snapExpect(1);
    await summaryPage.scrollToBottom();
    await snapExpect(2);
  });
});
