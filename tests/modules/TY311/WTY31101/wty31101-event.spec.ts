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
  test('WTY31101_23', async ({ page, snapInput, snapExpect }) => {
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    await summaryPage.fillSlipNo('4974019533247 ', () => snapInput(1));

    await summaryPage.activeRadioButton('9', true);
    await summaryPage.activeRadioButton('3', false, true);
    await summaryPage.fillQuantity('100');
    await summaryPage.scrollToBottom();
    await snapInput(2);
    await summaryPage.clear();
    const slipNo = await summaryPage.getSlipNo();
    const quantity = await summaryPage.getQuantity();
    expect(quantity).toEqual('');
    expect(slipNo).toEqual('');
    await page.waitForTimeout(500);
    await snapExpect(1);
    await summaryPage.scrollToTop();
    await snapExpect(2);
  });
  test('WTY31101_24', async ({ page, snapInput, snapExpect }) => {
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    await summaryPage.focusInput(summaryPage.searchProductFields[0].key);
    await page.waitForTimeout(500);
    const isShowSubTex = await summaryPage.verifyLabelVisible(
      summaryPage.labels.slipNoMenu,
    );
    expect(isShowSubTex).toBe(true);
    await snapExpect();
  });
  test('WTY31101_25', async ({ page, snapInput, snapExpect }) => {
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    await summaryPage.activeRadioButton('9', false, true);
    await summaryPage.scrollToBottom();
    await summaryPage.focusInput(summaryPage.supplierFields[0].key);
    await page.waitForTimeout(500);
    const isShowSubTex = await summaryPage.verifyLabelVisible(
      summaryPage.labels.supplierMenu,
    );
    expect(isShowSubTex).toBe(true);
    await snapExpect();
  });
});
