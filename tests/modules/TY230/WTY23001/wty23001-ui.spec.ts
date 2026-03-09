import { test, expect, loadTestData } from '../../../base/base-test';
import { TY23001Page } from '../../../pages/TY230/wty23001.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';

test.describe('WTY23001 - (見込み客登録)', () => {
  let summaryPage: TY23001Page;
  test.beforeEach(async ({ page, baseUrl }) => {
    summaryPage = new TY23001Page(page);
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);
  });
  test.afterEach(async ({ page }, testInfo) => {
    await takeScreenshotOnFailure(page, testInfo);
  });
  test('WTY23001_12', async ({ page, snapInput, snapExpect }) => {
    // verify tc 12
    await summaryPage.navigate();
    await page.waitForTimeout(500);
    await snapInput();
    await summaryPage.openMenu();
    await page.waitForTimeout(500);
    await summaryPage.verifyItems(summaryPage.menuItems, expect);
    await snapExpect();
  });
  test('WTY23001_13', async ({ page, snapInput, snapExpect }) => {
    await summaryPage.navigate();
    await page.waitForTimeout(500);
    await snapInput();
    await summaryPage.openMenu();
    await page.waitForTimeout(500);
    await summaryPage.verifyItems([summaryPage.menuItems[0]], expect);
    await snapExpect();
  });
  test('WTY23001_15', async ({ page, snapExpect }) => {
    // verify radio button 見込区分
    await summaryPage.navigate();
    await page.waitForTimeout(500);

    const radioLables = summaryPage.radioLables;
    await page.waitForTimeout(500);

    const radioId = summaryPage.getInputByName('mikomiKbn');
    expect(radioId).toBeTruthy();
    for (const radioLable of radioLables) {
      const isLable = await summaryPage.verifyLabelVisible(radioLable);
      expect(isLable).toBe(true);
    }
    await snapExpect();
  });
  test('WTY23001_16_17_24_25_26', async ({ page, snapExpect }) => {
    // verify test case 16_17_24_25_26
    // Verify  見込対象 type input default
    await summaryPage.navigate();
    await page.waitForTimeout(1000);

    // Verify title page
    const titlePage = await summaryPage.verifyPageTitle(expect);
    expect(titlePage).toBe(true);
    // Define form fields to verify
    await summaryPage.verifyFormFields(
      summaryPage.uiConstants.formFields,
      expect,
    );
    await snapExpect(1);
    await page.waitForTimeout(1000);
    await summaryPage.scrollToBottom();
    await snapExpect(2);
  });

  test('WTY23001_18', async ({ page, snapExpect }) => {
    // Verify  見込対象 type input 見込区分 = 小分類 (2)
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapExpect(1);
    await summaryPage.clickSmallClassificationRadio();
    await page.waitForTimeout(1000);
    await summaryPage.verifyFormFields(
      summaryPage.uiConstants.inputMkmTso,
      expect,
    );
    await snapExpect(2);
  });
  test('WTY23001_19', async ({ page, snapInput, snapExpect }) => {
    // Verify 見込対象 type select box
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    // click radio value=3
    await snapInput();
    await summaryPage.clickNegotiationRadio();
    await page.waitForTimeout(1000);
    await snapExpect(1);

    await summaryPage.verifyFormFields(
      summaryPage.uiConstants.selectMkmTso,
      expect,
    );
    await summaryPage.closeMenu();

    // Verify select box options
    // 見込対象 (mkmTsoSelect)
    await summaryPage.verifySelectBoxOptions(
      'mkmTsoSelect',
      summaryPage.options.mkmTso,
      expect,
    );
    await snapExpect(2);
  });
  test('WTY23001_20', async ({ page, snapExpect }) => {
    // Verify show group 顧客 readOnly
    // - 顧客名
    // - カナ名
    // - 住所
    // - 電話番号
    const customerInfoIds = summaryPage.uiConstants.customerInfoIds;
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    for (const id of customerInfoIds) {
      const radioId = await summaryPage.getInputByName(id);
      const inputIsDisable = await summaryPage.isInputDisabled(radioId);
      expect(inputIsDisable).toBe(true);
    }
    await snapExpect();
  });
  test('WTY23001_21', async ({ page, snapExpect }) => {
    //verify options 収集ｺｰﾄﾞ (shushuCd)
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapExpect(1);
    await summaryPage.scrollToBottom();
    await summaryPage.verifySelectBoxOptions(
      'shushuCd',
      summaryPage.options.shushuCd,
      expect,
    );
    await snapExpect(2);
  });
  test('WTY23001_22', async ({ page, snapExpect }) => {
    //verify options 見込内容 (mkmNaiyo)
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapExpect(1);
    await summaryPage.scrollToBottom();
    await summaryPage.verifySelectBoxOptions(
      'mkmNaiyo',
      summaryPage.options.mkmNaiyo,
      expect,
    );
    await snapExpect(2);
  });
  test('WTY23001_23', async ({ page, snapExpect }) => {
    // click radio value=3
    // verify options ランク (rank)
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapExpect(1);
    await summaryPage.scrollToBottom();
    await summaryPage.verifySelectBoxOptions(
      'rank',
      summaryPage.options.rank,
      expect,
    );
    await snapExpect(2);
  });
});
