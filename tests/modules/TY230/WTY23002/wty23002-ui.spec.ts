import { test, expect, loadTestData } from '../../../base/base-test';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';
import { TY23002Page } from '../../../pages/TY230/wty23002.page';

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
  test('WTY23002_15_16_17_18_19_25', async ({ page, snapExpect }) => {
    await summaryPage.navigate();
    await page.waitForTimeout(1000);

    // Verify title page
    const radioId = summaryPage.getInputByName('mikomiKbn');
    expect(radioId).toBeTruthy();
    const titlePage = await summaryPage.verifyPageTitle(expect);
    expect(titlePage).toBe(true);
    for (const radioLable of summaryPage.radioLables) {
      const isLable = await summaryPage.verifyLabelVisible(radioLable);
      expect(isLable).toBe(true);
    }
    await summaryPage.verifyFormFields(
      summaryPage.uiConstants.formFields,
      expect,
    );
    await snapExpect(1);
    await summaryPage.scrollToBottom();
    await snapExpect(2);
  });
  test('WTY23002_20', async ({ page, snapExpect }) => {
    // verify options ランク (rank)
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await summaryPage.scrollToBottom();
    await summaryPage.verifySelectBoxOptions(
      'rank',
      summaryPage.options.rank,
      expect,
    );
    await snapExpect();
  });
  test('WTY23002_21_22_23', async ({ page, snapInput, snapExpect }) => {
    // test case 21 22 23
    await summaryPage.navigate();
    await summaryPage.openMenu();
    await snapInput();
    await page.waitForTimeout(500);
    await summaryPage.verifyItems(summaryPage.menuItems, expect);
    await snapExpect();
  });
  test('WTY23002_24', async ({ page, snapExpect }) => {
    await summaryPage.navigate();
    await page.waitForTimeout(500);
    await summaryPage.verifyTableHeaders(expect);
    await snapExpect();
  });
});
