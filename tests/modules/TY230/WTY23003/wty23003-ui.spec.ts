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
  test('WTY23003_06', async ({ page, snapExpect }) => {
    // verify default input value
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await summaryPage.verifyDefaultInputsValue(expect);
    await snapExpect(1);
    await summaryPage.scrollToBottom();
    await snapExpect(2);
  });
  test('WTY23003_12-24', async ({ page, snapExpect }) => {
    // verify tc 12 - 24
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    const formfields = summaryPage.uiConstants.formFields;
    await summaryPage.verifyFormFields(formfields, expect, true);
    await snapExpect(1);
    await summaryPage.scrollToBottom();
    await snapExpect(2);
  });
  test('WTY23003_25', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    // verify button back
    const testData = loadTestData('TY230/wty23001', 'wty23001', 'TC_47');
    await indexedDBHelper.initializeDB({
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await snapInput();
    await summaryPage.clickPreviousButton();
    await expect(page).not.toHaveURL(summaryPage.WTY23003Url);
    await page.waitForTimeout(1000);
    await snapExpect();
  });
  test('WTY23003_26', async ({ page, snapExpect }) => {
    await summaryPage.navigate();
    await summaryPage.openMenu();
    await snapExpect(1);
    await page.waitForTimeout(500);
    const menuItems = [{ key: '', text: '修正' }];

    await summaryPage.verifyItems(menuItems, expect);
    await summaryPage.scrollToBottom();
    await snapExpect(2);
  });
});
