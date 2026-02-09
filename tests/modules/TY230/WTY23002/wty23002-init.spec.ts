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
  test('WTY23002_04', async ({ page, snapExpect }) => {
    await summaryPage.navigate();
    await page.waitForTimeout(1000);

    // Verify title page
    const titlePage = await summaryPage.verifyPageTitle(expect);
    expect(titlePage).toBe(true);
    await summaryPage.verifyFormFields(
      summaryPage.uiConstants.formFields,
      expect,
    );
    await snapExpect(1);
    await summaryPage.scrollToBottom();
    await snapExpect(2);
    await summaryPage.verifySelectBoxOptions(
      'rank',
      summaryPage.options.rank,
      expect,
    );
    await snapExpect(3);
  });
});
