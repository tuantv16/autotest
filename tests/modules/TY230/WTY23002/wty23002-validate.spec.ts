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
  test('WTY23002_26', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    // validate 獲得担当 is empty
    const testData = loadTestData('TY230/wty23002', 'wty23002', 'TC_26');
    await indexedDBHelper.initializeDB({
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(500);
    await summaryPage.fillTantoCd('', snapInput);
    await page.waitForTimeout(500);
    await summaryPage.clickButtonSearch();
    await page.waitForTimeout(1000);

    const isShowDialog = await summaryPage.isErrorDialogVisible();
    expect(isShowDialog).toBeFalsy();
    await snapExpect();
  });
  test('WTY23002_27', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    // validate 獲得担当 is not match length
    const testData = loadTestData('TY230/wty23002', 'wty23002', 'TC_26');
    await indexedDBHelper.initializeDB({
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(500);
    await summaryPage.fillTantoCd(
      testData.formData.tanCd_false,
      snapInput,
      true,
    );
    await page.waitForTimeout(1000);
    const tancd = await summaryPage.getTantoCd();
    const tanmn = await summaryPage.getTantoNm();
    expect(tancd).toEqual('0123');
    expect(tanmn).toBeTruthy();
    await snapExpect();
  });
  test('WTY23002_28', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    // validate 獲得担当 is not match length
    const testData = loadTestData('TY230/wty23002', 'wty23002', 'TC_26');
    await indexedDBHelper.initializeDB({
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(500);
    await summaryPage.fillTantoCd(testData.formData.tanCd, snapInput);
    await page.waitForTimeout(500);
    const tancd = await summaryPage.getTantoCd();
    expect(tancd).toEqual('1234');
    await snapExpect();
  });
  test('WTY23002_29', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    // validate 見込対象  123
    const testData = loadTestData('TY230/wty23002', 'wty23002', 'TC_26');
    await indexedDBHelper.initializeDB({
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(500);
    await summaryPage.fillMkmTsoCd(testData.formData.mkmCd_123, snapInput);
    await page.waitForTimeout(500);
    const messageError = await summaryPage.waitForTextInBody(
      WTY23002_MESSAGES.PROSPECT_TARGET_CODE_REQUIRED_4_DIGITS,
    );
    expect(messageError).toBeTruthy();
    await snapExpect();
  });
  test('WTY23002_29_02', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    // validate 見込対象  123
    const testData = loadTestData('TY230/wty23002', 'wty23002', 'TC_26');
    await indexedDBHelper.initializeDB({
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(500);
    await summaryPage.fillMkmTsoCd('99999', snapInput, true);
    await page.waitForTimeout(500);
    const name = await summaryPage.getMkmTsoNm();
    expect(name).toBeTruthy();
    await snapExpect();
  });
  test('WTY23002_30', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    // validate 見込対象  12345
    const testData = loadTestData('TY230/wty23002', 'wty23002', 'TC_26');
    await indexedDBHelper.initializeDB({
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(500);
    await summaryPage.clickSmallClassificationRadio();
    await page.waitForTimeout(500);
    await summaryPage.fillMkmTsoCd(
      testData.formData.mkmCd_12345,
      snapInput,
      true,
    );
    await page.waitForTimeout(500);
    const messageError = await summaryPage.waitForTextInBody(
      WTY23002_MESSAGES.PROSPECT_TARGET_CODE_REQUIRED_6_DIGITS,
    );
    expect(messageError).toBeTruthy();
    await snapExpect();
  });
  test('WTY23002_30_02', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    // validate 見込対象  12345
    const testData = loadTestData('TY230/wty23002', 'wty23002', 'TC_26');
    await indexedDBHelper.initializeDB({
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(500);
    await summaryPage.clickSmallClassificationRadio();
    await page.waitForTimeout(500);
    await summaryPage.fillMkmTsoCd('3108088', snapInput, true);
    await page.waitForTimeout(500);
    const name = await summaryPage.getMkmTsoNm();
    expect(name).toBeTruthy();
    await snapExpect();
  });
  test('WTY23002_31', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    // validate 抽出期間
    const testData = loadTestData('TY230/wty23002', 'wty23002', 'TC_26');
    await indexedDBHelper.initializeDB({
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(500);
    await summaryPage.scrollToBottom();
    await snapInput();
    await summaryPage.fillFollowDate('2024');
    await snapInput(1);
    await summaryPage.clickButtonSearch();

    const messageError = await summaryPage.waitForTextInBody(
      WTY23002_MESSAGES.INVALID_DATE_FORMAT,
    );
    expect(messageError).toBeTruthy();
    await snapExpect();
  });
  test('WTY23002_32', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    // validate 抽出期間  20241301
    const testData = loadTestData('TY230/wty23002', 'wty23002', 'TC_26');
    await indexedDBHelper.initializeDB({
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(500);
    await summaryPage.fillFollowKsu(testData.formData.fromDate_second_32);
    await snapInput();
    await page.waitForTimeout(5000);
    await summaryPage.clickButtonSearch();
    await page.waitForTimeout(1000);
    const messageError = await summaryPage.waitForTextInBody(
      WTY23002_MESSAGES.NO_DATA_FOUND,
    );
    expect(messageError).toBeTruthy();
    await snapExpect();
  });
  test('WTY23002_33', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    // validate 抽出期間  from > to
    const testData = loadTestData('TY230/wty23002', 'wty23002', 'TC_26');
    await indexedDBHelper.initializeDB({
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(500);
    const fromDate = summaryPage.getTodayDate(2);
    const toDate = summaryPage.getTodayDate();
    await summaryPage.fillFollowDate(fromDate);
    await summaryPage.fillFollowKsu(toDate);
    await page.waitForTimeout(5000);
    await snapInput();
    await summaryPage.clickButtonSearch();
    await page.waitForTimeout(1000);
    const messageError = await summaryPage.waitForTextInBody(
      WTY23002_MESSAGES.INVALID_DATE_RANGE,
    );
    expect(messageError).toBeTruthy();
    await snapExpect();
  });
});
