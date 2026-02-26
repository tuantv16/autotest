import { test, expect, loadTestData } from '../../../base/base-test';
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

  test('WTY32201_12_18', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData('TY322/wty32201', 'wty32201', 'TC_UI');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    await summaryPage.openMenu();
    await page.waitForTimeout(1000);

    const pageTitle = await summaryPage.verifyPageTitle();
    expect(pageTitle).toBe(true);

    const verifyMenu = await summaryPage.verifyItems(summaryPage.menuItems);
    expect(verifyMenu).toBe(true);
    await snapInput(1);
    await summaryPage.closeMenu();

    const verifyFormFields = await summaryPage.verifyFormFields(
      summaryPage.formFields,
    );
    expect(verifyFormFields).toBe(true);
    const verifyButtonRegister = await summaryPage.verifyLabelVisible(
      summaryPage.labels.register,
    );
    expect(verifyButtonRegister).toBe(true);

    const verifyTableHeaders = await summaryPage.verifyTableHeaders();
    expect(verifyTableHeaders).toBe(true);

    const verifyBarcodeIcon = await summaryPage.verifyBarcodeIcon();
    expect(verifyBarcodeIcon).toBe(true);
    await snapExpect();
  });
});
