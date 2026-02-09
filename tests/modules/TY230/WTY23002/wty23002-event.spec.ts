import { test, expect, loadTestData } from '../../../base/base-test';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';
import { TY23002Page } from '../../../pages/TY230/wty23002.page';
import { WTY23002_MESSAGES } from '../../../constants/messages';

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
  test('WTY23002_35', async ({ page, snapInput, snapExpect }) => {
    // verify 見込区分 is show
    await summaryPage.navigate();
    await page.waitForTimeout(500);
    await snapInput();
    await summaryPage.clickSmallClassificationRadio();
    await page.waitForTimeout(1000);
    await summaryPage.verifyFormFields(
      summaryPage.uiConstants.inputMkmTso,
      expect,
    );
    await snapExpect();
  });
  test('WTY23002_36', async ({ page, snapInput, snapExpect }) => {
    // Verify 見込対象 type select box
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    // click radio value=3
    await summaryPage.clickNegotiationRadio();
    await page.waitForTimeout(1000);
    await snapInput();

    await summaryPage.verifySelectBoxOptions(
      'mkmTsoSelect',
      summaryPage.options.mkmTso,
      expect,
    );
    await snapExpect();
  });
  test('WTY23002_37', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    // Verify clear 獲得担当
    const testData = loadTestData('TY230/wty23002', 'wty23002', 'TC_26');
    await indexedDBHelper.initializeDB({
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(500);
    await summaryPage.fillTantoCd('123', snapInput);
    await page.waitForTimeout(500);
    await snapInput(1);
    await summaryPage.clickClearTantoCd();
    await page.waitForTimeout(500);
    const tancd = await summaryPage.getTantoCd();
    const tanmn = await summaryPage.getTantoNm();
    expect(tancd).toEqual('');
    expect(tanmn).toEqual('');
    await snapExpect();
  });
  test('WTY23002_38', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    // Verify clear 獲得担当
    const testData = loadTestData('TY230/wty23002', 'wty23002', 'TC_26');
    await indexedDBHelper.initializeDB({
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(500);
    await summaryPage.fillMkmTsoCd('9999', snapInput);

    await snapInput(1);

    await page.waitForTimeout(500);
    await summaryPage.clickClearKmTsoCd();
    await page.waitForTimeout(500);

    const code = await summaryPage.getMkmTsoCd();
    const name = await summaryPage.getMkmTsoNm();
    await page.waitForTimeout(500);
    expect(code).toEqual('');
    expect(name).toEqual('');
    await snapExpect();
  });
  test('WTY23002_39', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    // verify "クリア" button
    const testData = loadTestData('TY230/wty23002', 'wty23002', 'TC_26');
    await indexedDBHelper.initializeDB({
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(500);

    const toDate = summaryPage.getTodayDate();
    const fromDate = summaryPage.getTodayDate(-1);

    await summaryPage.fillTantoCd('123', snapInput);
    await summaryPage.fillMkmTsoCd('9999', () => snapInput(1));

    await summaryPage.fillFollowDate(fromDate);
    await summaryPage.fillFollowKsu(toDate);
    await snapInput(2);
    await summaryPage.selectOptionInSelectBox(
      'rank',
      summaryPage.options.rank[0],
      () => snapInput(3),
    );
    await page.waitForTimeout(500);
    await snapInput(4);
    await summaryPage.clear();
    await page.waitForTimeout(500);
    await summaryPage.verifyDefaultInputsValue(expect);
    await snapExpect();
  });
});
