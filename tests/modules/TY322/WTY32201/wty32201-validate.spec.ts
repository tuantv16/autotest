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

  test('WTY32201_20', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    // validate shelf number
    const testData = loadTestData('TY322/wty32201', 'wty32201', 'TC_UI');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    await summaryPage.clickRegister();
    const message = await summaryPage.waitForTextInBody(
      WTY32201_MESSAGES.REQUIRED_SHELF_NUMBER,
      200,
    );
    expect(message).toBe(true);
    await snapExpect();
  });
  test('WTY32201_21', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    // validate shelf number
    const testData = loadTestData('TY322/wty32201', 'wty32201', 'TC_UI');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    await summaryPage.fillShelfNumber(testData.formData.shelfNumber_123);
    await page.waitForTimeout(200);
    await summaryPage.clickRegister();
    const message = await summaryPage.waitForTextInBody(
      WTY32201_MESSAGES.SHELF_NUMBER_LENGTH,
      200,
    );
    expect(message).toBe(true);
    await snapExpect();
  });
});
