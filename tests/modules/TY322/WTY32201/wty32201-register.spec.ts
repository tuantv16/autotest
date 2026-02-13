import { expect, loadTestData, test } from '../../../base/base-test';
import { WTY32201_MESSAGES } from '../../../constants/messages';
import { TY32201Page } from '../../../pages/TY322/wty32201.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';

test.describe('WTY32201 - (棚卸カウント」)', () => {
  let summaryPage: TY32201Page;
  test.beforeEach(async ({ page, baseUrl }) => {
    summaryPage = new TY32201Page(page);
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
  });

  test.afterEach(async ({ page }, testInfo) => {
    await takeScreenshotOnFailure(page, testInfo);
  });

  test('WTY32201_37', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    // register
    const testData = loadTestData('TY322/wty32201', 'wty32201', 'TC_UI');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    await summaryPage.fillShelfNumber(testData.formData.shelfNumber);
    await summaryPage.fillJanCode(testData.formData.janCode);
    await summaryPage.fillQuantity('10');
    await page.waitForTimeout(200);
    await snapInput(1);
    await summaryPage.clickRegister();
    await page.waitForTimeout(1000);
    const shelfTotal = await summaryPage.getShelfTotal();
    expect(shelfTotal).toBeTruthy();
    await summaryPage.verifyTableData();
    await snapExpect();
  });
});
