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

  test('WTY31101_07', async ({ page, snapExpect }) => {
    // verify title page
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    const titlePage = await summaryPage.verifyPageTitle();
    expect(titlePage).toBe(true);
    await snapExpect(1);
    await summaryPage.scrollToBottom();
    await snapExpect(2);
  });
  test('WTY31101_08', async ({ page, snapInput, snapExpect }) => {
    // verify buttons menu
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    await summaryPage.openMenu();
    await page.waitForTimeout(500);
    const menuItemsVisible = await summaryPage.verifyItems(
      summaryPage.menuItems,
    );
    expect(menuItemsVisible).toBe(true);
    await snapExpect(1);
    await summaryPage.scrollToBottom();
    await snapExpect(2);
  });
  test('WTY31101_09', async ({ page, snapExpect }) => {
    // verify buttons menu foooter
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    const menuFooterVisible = await summaryPage.verifyItems(
      summaryPage.menuItemsFooter,
    );
    expect(menuFooterVisible).toBe(true);
    await summaryPage.scrollToBottom();
    await snapExpect();
  });
  test('WTY31101_10', async ({ page, indexedDBHelper, snapExpect }) => {
    // verify 差異 is disabled
    const testData = loadTestData('TY311/wty31101', 'wty31101', 'TC_11');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapExpect(1);
    await summaryPage.activeRadioButton('9', true);
    await summaryPage.activeRadioButton('9', false, true);
    await page.waitForTimeout(500);
    const radioDisabled = await summaryPage.verifyRadioDisabled();
    expect(radioDisabled).toBe(true);
    await summaryPage.scrollToBottom();
    await snapExpect(2);
  });
  test('WTY31101_11', async ({ page, snapExpect }) => {
    // verify 商品 fields button search
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    const radioDisabled = await summaryPage.verifyFormFields(
      summaryPage.searchProductFields,
    );
    expect(radioDisabled).toBe(true);
    const barcodeIsVisible = await summaryPage.verifyBarcodeIcon();
    expect(barcodeIsVisible).toBe(true);
    await snapExpect();
  });
  test('WTY31101_12_13', async ({ page, snapExpect }) => {
    // verify fields product info is disabled

    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    const radioDisabled = await summaryPage.verifyFormFields(
      summaryPage.inforProducFields,
      true,
    );
    expect(radioDisabled).toBe(true);
    await snapExpect(1);
    await summaryPage.scrollToBottom();
    await snapExpect(2);
  });
  test('WTY31101_14_15', async ({ page, snapExpect }) => {
    // verify all radios is visible

    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    const radioDisabled = await summaryPage.verifyAllRadioIsVisible();
    expect(radioDisabled).toBe(true);
    await summaryPage.scrollToBottom();
    await snapExpect();
  });
  test('WTY31101_16', async ({ page, snapExpect }) => {
    // verify all 仕入先

    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    const radioDisabled = await summaryPage.verifyFormFields(
      summaryPage.supplierFields,
      true,
    );
    expect(radioDisabled).toBe(true);
    await summaryPage.scrollToBottom();
    await snapExpect();
  });
  test('WTY31101_17', async ({ page, snapExpect }) => {
    // verify all 仕入先
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    const radioDisabled = await summaryPage.verifyFormFields(
      summaryPage.quantityFields,
    );
    expect(radioDisabled).toBe(true);
    const quantity = await summaryPage.getQuantity();
    expect(quantity).toBe('1');
    await summaryPage.scrollToBottom();
    await snapExpect();
  });
});
