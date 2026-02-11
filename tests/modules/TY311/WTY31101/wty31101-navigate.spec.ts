import { expect, loadTestData, test } from '../../../base/base-test';
import { TY31101Page } from '../../../pages/TY311/wty31101.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';

test.describe('TY31101 - 在庫属性変更', () => {
  let summaryPage: TY31101Page;
  test.beforeEach(async ({ page, baseUrl }) => {
    summaryPage = new TY31101Page(page);
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);
  });
  test.afterEach(async ({ page }, testInfo) => {
    await takeScreenshotOnFailure(page, testInfo);
  });
  test('WTY31101_18', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData('TY311/wty31101', 'wty31101', 'TC_18');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    await summaryPage.clickPreviousButton();
    await page.waitForTimeout(2000);
    expect(page.url()).not.toContain(summaryPage.ty311path);
    await snapExpect();
  });
});
