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
  test('WTY23001_04', async ({ page, snapExpect }) => {
    // verify init data 23001
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await summaryPage.openMenu();
    await summaryPage.verifyDefaultInputsValue(expect);
    await snapExpect(1);
    await summaryPage.scrollToBottom();
    await snapExpect(2);
    await summaryPage.closeMenu();
    await summaryPage.verifySelectBoxOptions(
      'shushuCd',
      summaryPage.options.shushuCd,
      expect,
    );
    await snapExpect(3);
    await summaryPage.closeMenu();
    await summaryPage.verifySelectBoxOptions(
      'rank',
      summaryPage.options.rank,
      expect,
    );
    await snapExpect(4);
    await summaryPage.closeMenu();
    await summaryPage.scrollToBottom();
    await summaryPage.verifySelectBoxOptions(
      'mkmNaiyo',
      summaryPage.options.mkmNaiyo,
      expect,
    );
    await snapExpect(5);
  });
  test('WTY23001_05', async ({ page, indexedDBHelper, snapExpect }) => {
    // verify init data when back from TY23002
    const testData = loadTestData('TY230/wty23001', 'wty23001', 'TC_05');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await summaryPage.openMenu();
    await summaryPage.verifyInputsNotEmpty(expect);
    await snapExpect(1);
    await summaryPage.scrollToBottom();
    await snapExpect(2);
    await summaryPage.closeMenu();
    await summaryPage.verifySelectBoxOptions(
      'shushuCd',
      summaryPage.options.shushuCd,
      expect,
    );
    await snapExpect(3);
    await summaryPage.closeMenu();
    await summaryPage.verifySelectBoxOptions(
      'rank',
      summaryPage.options.rank,
      expect,
    );
    await snapExpect(4);
    await summaryPage.closeMenu();
    await summaryPage.scrollToBottom();
    await summaryPage.verifySelectBoxOptions(
      'mkmNaiyo',
      summaryPage.options.mkmNaiyo,
      expect,
    );
    await snapExpect(5);
  });
  test('WTY23001_08', async ({ page, indexedDBHelper, snapExpect }) => {
    // verify init data when back from WTZ10801
    const testData = loadTestData('TY230/wty23001', 'wty23001', 'TC_08');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await summaryPage.openMenu();
    const tantoCd = await summaryPage.getTantoCd();
    expect(tantoCd).toBeTruthy();
    const tantoNm = await summaryPage.getTantoNm();
    expect(tantoNm).toBeTruthy();
    await snapExpect(1);
    await summaryPage.scrollToBottom();
    await snapExpect(2);
    await summaryPage.closeMenu();
    await summaryPage.verifySelectBoxOptions(
      'shushuCd',
      summaryPage.options.shushuCd,
      expect,
    );
    await snapExpect(3);
    await summaryPage.closeMenu();
    await summaryPage.verifySelectBoxOptions(
      'rank',
      summaryPage.options.rank,
      expect,
    );
    await snapExpect(4);
    await summaryPage.closeMenu();
    await summaryPage.scrollToBottom();
    await summaryPage.verifySelectBoxOptions(
      'mkmNaiyo',
      summaryPage.options.mkmNaiyo,
      expect,
    );
    await snapExpect(5);
  });
});
