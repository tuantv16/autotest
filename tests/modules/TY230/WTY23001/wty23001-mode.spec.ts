import { test, expect, loadTestData } from '../../../base/base-test';
import { TY23001Page } from '../../../pages/TY230/wty23001.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';

import { COMMON_MESSAGES } from '../../../constants/messages';
import { snapInput as snapInputHelper } from '../../../utils/screenshot-helper';

test.describe('WTY23001 - (見込み客登録)', () => {
  let summaryPage: TY23001Page;
  test.beforeEach(async ({ page, baseUrl }) => {
    summaryPage = new TY23001Page(page);
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
  });

  test.afterEach(async ({ page }, testInfo) => {
    await takeScreenshotOnFailure(page, testInfo);
  });
  test('WTY23001_14', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    // Verify "削除" menu text in edit mode
    const testData = loadTestData('TY230/wty23001', 'wty23001', 'TC_52');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(500);
    await summaryPage.openMenu();
    await page.waitForTimeout(500);
    const menuItems = [{ key: '', text: '削除' }];

    await summaryPage.verifyItems(menuItems, expect);
    await snapExpect();
  });
  test('WTY23001_45', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    // Verify "顧客" menu text open new tab WTZ11201
    const testData = loadTestData('TY230/wty23001', 'wty23001', 'TC_34');
    await indexedDBHelper.initializeDB({
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await summaryPage.openMenu();
    await page.waitForTimeout(500);
    await snapInput();
    await summaryPage.transitionToCustomerSearch(expect);
    await snapExpect();
  });
  test('WTY23001_48', async ({ page, indexedDBHelper, snapExpect }) => {
    // Verify "担当者" popup logic
    const testData = loadTestData('TY230/wty23001', 'wty23001', 'TC_34');
    await indexedDBHelper.initializeDB({
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await summaryPage.transitionToTantoSearch(expect);
    await page.waitForTimeout(1000);
    await snapExpect();
  });
  test('WTY23001_49', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    // Verify reset form fields
    const testData = loadTestData('TY230/wty23001', 'wty23001', 'TC_51');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput(1);
    await summaryPage.fillTantoCd(testData.formData.tantoCd);
    await summaryPage.fillMkmTsoCd(testData.formData.mkmTsoCd);
    const followDate = summaryPage.getTodayDate();
    await summaryPage.fillFollowDate(followDate);

    await snapInput(2);

    await summaryPage.clear();
    await page.waitForTimeout(1000);
    await snapInput(3);
    await summaryPage.scrollToBottom();
    await summaryPage.verifyDefaultInputsValue(expect);
    await page.waitForTimeout(1000);
    await snapExpect();
  });
  test('WTY23001_50', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    // Verify previous button
    const testData = loadTestData('TY230/wty23001', 'wty23001', 'TC_47');
    await indexedDBHelper.initializeDB({
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    await summaryPage.clickPreviousButton();
    await expect(page).not.toHaveURL(/.*WTY23001.*/);
    await page.waitForTimeout(1000);
    await snapExpect();
  });
});
