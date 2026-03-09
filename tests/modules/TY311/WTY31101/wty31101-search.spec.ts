import { expect, loadTestData, test } from '../../../base/base-test';
import { WTY31101_MESSAGES } from '../../../constants/messages';
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
  test('WTY31101_53', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData('TY311/wty31101', 'wty31101', 'INIT_DATA');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    await summaryPage.fillSlipNo(testData.formData.SHK_IG_KBN_1, () =>
      snapInput(1),
    );
    await snapInput(2);
    await summaryPage.clickSearch();
    await page.waitForTimeout(1000);
    const isShowDialog = await summaryPage.isErrorDialogVisible();
    expect(isShowDialog).toBe(true);
    const message = await summaryPage.waitForTextInBody(
      WTY31101_MESSAGES.SHK_IG_KBN_1,
      200,
    );
    expect(message).toBe(true);
    await snapExpect();
  });
  test('WTY31101_54', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData('TY311/wty31101', 'wty31101', 'INIT_DATA');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    await summaryPage.fillSlipNo(testData.formData.slipNo_SET_KBN_S, () =>
      snapInput(1),
    );
    await snapInput(2);
    await summaryPage.clickSearch();
    await page.waitForTimeout(1000);
    const isShowDialog = await summaryPage.isErrorDialogVisible();
    expect(isShowDialog).toBe(true);
    const message = await summaryPage.waitForTextInBody(
      WTY31101_MESSAGES.slipNo_SET_KBN_S,
      200,
    );
    expect(message).toBe(true);
    await snapExpect();
  });
  test('WTY31101_55', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData('TY311/wty31101', 'wty31101', 'INIT_DATA');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    await summaryPage.fillSlipNo(testData.formData.SHN_SBT_KBN_NOT_EQ_1_2, () =>
      snapInput(1),
    );
    await snapInput(2);
    await summaryPage.clickSearch();
    await page.waitForTimeout(1000);
    const isShowDialog = await summaryPage.isErrorDialogVisible();
    expect(isShowDialog).toBe(true);
    await snapExpect();
  });
  test('WTY31101_56', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData('TY311/wty31101', 'wty31101', 'INIT_DATA');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    await summaryPage.fillSlipNo(testData.formData.slipNo_13, () =>
      snapInput(1),
    );
    await summaryPage.clickSearch();
    await page.waitForTimeout(1000);
    const validateInforPr = await summaryPage.verifyInputsNotEmpty(
      summaryPage.inforProducFields,
    );
    const validateInforSupplier = await summaryPage.verifyInputsNotEmpty(
      summaryPage.supplierFields,
    );
    expect(validateInforPr).toBe(true);
    expect(validateInforSupplier).toBe(true);
    await snapInput(2);
    await summaryPage.scrollToBottom();
    await summaryPage.activeRadioButton('1', true);
    await summaryPage.activeRadioButton('2', false, true);
    await snapInput(3);
    await summaryPage.scrollToTop();
    await page.waitForTimeout(500);
    // search again with other slipNo
    await summaryPage.fillSlipNo(testData.formData.slipNo_13_2, () =>
      snapInput(4),
    );
    await snapInput(5);
    await summaryPage.clickSearch();
    await page.waitForTimeout(1000);

    const radiosIsReseted = await summaryPage.verifyRadioLabelsNoBgWhite();
    expect(radiosIsReseted).toBe(true);
    await summaryPage.scrollToBottom();
    await snapExpect(1);
  });

  test('WTY31101_59', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData('TY311/wty31101', 'wty31101', 'INIT_DATA');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });

    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    await summaryPage.activeRadioButton('3', true);
    await summaryPage.activeRadioButton('9', false, true);
    await summaryPage.scrollToBottom();
    await page.waitForTimeout(500);
    await snapInput(1);
    await page.waitForTimeout(1000);
    await summaryPage.fillSupplierCode(testData.formData.supplierTypeH, () =>
      snapInput(2),
    );
    await page.waitForTimeout(1000);
    await summaryPage.closeMenu();
    const supplierName = await summaryPage.getSupplierName();
    expect(supplierName).toBe('');
    await snapExpect(1);
  });
  test('WTY31101_60_65', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData('TY311/wty31101', 'wty31101', 'INIT_DATA');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    await summaryPage.fillSlipNo(testData.formData.slipNo_13, () =>
      snapInput(1),
    );
    await summaryPage.clickSearch();
    await page.waitForTimeout(1000);
    await summaryPage.scrollToBottom();
    await snapExpect(1);

    await summaryPage.activeRadioButton('1', true);
    await summaryPage.activeRadioButton('3', false, true);
    await summaryPage.fillQuantity('5');
    await summaryPage.scrollToBottom();
    await page.waitForTimeout(200);
    await snapInput(2);
    await summaryPage.clickConfirmMenu();
    await snapExpect(2);
    await summaryPage.clickConfirmErrorDialog();
    await page.waitForTimeout(1000);

    const checkInfoPr = await summaryPage.verifyInputsNotEmpty(
      summaryPage.inforProducFields,
    );
    expect(checkInfoPr).toBeFalsy();
    const checkValueSupplier = await summaryPage.verifyInputsNotEmpty(
      summaryPage.supplierFields,
    );
    expect(checkValueSupplier).toBeFalsy();

    await snapExpect(3);
    await summaryPage.clickConfirmErrorDialog();
    await snapExpect(4);
  });
  test('WTY31101_63', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData('TY311/wty31101', 'wty31101', 'INIT_DATA');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    await summaryPage.fillSlipNo(testData.formData.slipNo_13, () =>
      snapInput(1),
    );
    await summaryPage.clickSearch();
    await page.waitForTimeout(1000);
    await summaryPage.scrollToBottom();
    await snapExpect(1);

    await summaryPage.activeRadioButton('1', true);
    await summaryPage.activeRadioButton('3', false, true);
    await summaryPage.fillQuantity('5');
    await summaryPage.clickConfirmMenu();
    await page.waitForTimeout(200);
    await snapInput(2);
    const isShowDialog = await summaryPage.isErrorDialogVisible();
    expect(isShowDialog).toBe(true);
    await snapExpect(2);
  });
  test('WTY31101_64', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData('TY311/wty31101', 'wty31101', 'INIT_DATA');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    await summaryPage.fillSlipNo(testData.formData.slipNo_13, () =>
      snapInput(1),
    );
    await summaryPage.clickSearch();
    await page.waitForTimeout(1000);
    await summaryPage.scrollToBottom();
    await snapExpect(1);

    await summaryPage.activeRadioButton('1', true);
    await summaryPage.activeRadioButton('3', false, true);
    await summaryPage.fillQuantity('5');
    await summaryPage.clickConfirmMenu();
    await page.waitForTimeout(200);
    await snapExpect(2);
    const isShowDialog = await summaryPage.isErrorDialogVisible();
    expect(isShowDialog).toBe(true);
    await snapExpect(3);
    await summaryPage.clickCancelErrorDialog();
    await snapExpect(4);
  });
});
