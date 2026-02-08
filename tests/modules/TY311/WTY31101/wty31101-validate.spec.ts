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
  test('WTY31101_28', async ({
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
    await snapInput(2);
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
    await snapExpect(1);
    await summaryPage.scrollToBottom();
    await snapExpect(2);
  });
  test('WTY31101_29', async ({
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
    await summaryPage.fillSlipNo(testData.formData.slipNo_8, () =>
      snapInput(1),
    );
    await snapInput(2);
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
    await snapExpect(1);
    await summaryPage.scrollToBottom();
    await snapExpect(2);
  });
  test('WTY31101_30', async ({
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
    await summaryPage.fillSlipNo(testData.formData.slipNo_11, () =>
      snapInput(1),
    );
    await snapInput(2);
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
    await snapExpect(1);
    await summaryPage.scrollToBottom();
    await snapExpect(2);
  });
  test('WTY31101_31', async ({ page, snapInput, snapExpect }) => {
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    await summaryPage.clickSearch();
    await page.waitForTimeout(1000);
    const message = await summaryPage.waitForTextInBody(
      WTY31101_MESSAGES.TE5050,
      200,
    );
    expect(message).toBe(true);
    await snapExpect(1);
  });
  test('WTY31101_33', async ({
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
    await summaryPage.fillSlipNo(testData.formData.fullWidth, () =>
      snapInput(1),
    );
    await snapInput(2);
    await summaryPage.clickSearch();
    await page.waitForTimeout(1000);
    const message = await summaryPage.waitForTextInBody(
      WTY31101_MESSAGES.TE5097,
      200,
    );
    expect(message).toBe(true);
    await snapExpect(1);
  });
  test('WTY31101_34', async ({
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
    await snapInput(2);
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
    await snapExpect(1);
    await summaryPage.scrollToBottom();
    await summaryPage.fillQuantity(testData.formData.quantity);
    const quantity = await summaryPage.getQuantity();
    expect(quantity).toBe(testData.formData.quantity);
    await snapExpect(2);
  });
  test('WTY31101_35', async ({
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
    await snapInput(2);
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
    await summaryPage.activeRadioButton('9', true);
    await summaryPage.activeRadioButton('3', false, true);
    await summaryPage.scrollToBottom();
    await summaryPage.fillQuantity(testData.formData.quantity_zero);
    await snapInput(3);
    await summaryPage.clickConfirmMenu();
    const message = await summaryPage.waitForTextInBody(
      WTY31101_MESSAGES.TE5130,
      200,
    );
    expect(message).toBe(true);
    await snapExpect(1);
  });
  test('WTY31101_36', async ({
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
    await snapInput(2);
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
    await summaryPage.activeRadioButton('9', true);
    await summaryPage.activeRadioButton('3', false, true);
    await summaryPage.scrollToBottom();
    await summaryPage.fillQuantity(testData.formData.quantity_5);
    await snapInput(3);
    await summaryPage.clickConfirmMenu();
    const message = await summaryPage.waitForTextInBody(
      WTY31101_MESSAGES.TE5134,
      200,
    );
    expect(message).toBe(true);
    await snapExpect(1);
  });
  test('WTY31101_37', async ({
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
    await snapInput(2);
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
    await summaryPage.activeRadioButton('9', true);
    await summaryPage.activeRadioButton('3', false, true);
    await summaryPage.scrollToBottom();
    await summaryPage.fillQuantity(testData.formData.quantity_10000);
    await snapInput(3);
    const quantity = await summaryPage.getQuantity();
    expect(quantity).toBe('1000');
    await snapExpect(1);
  });
  test('WTY31101_38', async ({
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
    await summaryPage.fillSupplierCode(testData.formData.supplierCode, () =>
      snapInput(2),
    );
    await page.waitForTimeout(1000);
    const supplierName = await summaryPage.getSupplierName();
    expect(supplierName).toBeTruthy();
    await snapExpect(1);
  });
  test('WTY31101_39', async ({
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
    await summaryPage.fillSupplierCode(testData.formData.supplierCode_9, () =>
      snapInput(2),
    );
    await page.waitForTimeout(1000);
    await summaryPage.closeMenu();
    const supplierName = await summaryPage.getSupplierName();
    expect(supplierName).toBe('');
    await snapExpect(1);
  });
  test('WTY31101_40', async ({
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
    await summaryPage.fillSupplierCode(
      testData.formData.supplierCodeNotFound,
      () => snapInput(2),
    );
    await page.waitForTimeout(1000);
    await summaryPage.closeMenu();
    const supplierName = await summaryPage.getSupplierName();
    expect(supplierName).toBe('');
    await snapExpect(1);
  });
  test('WTY31101_41', async ({
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
    await summaryPage.activeRadioButton('9', false, true);
    await page.waitForTimeout(1000);
    const isDisabled = await summaryPage.verifyFormFields(
      summaryPage.supplierFields,
      true,
    );
    await summaryPage.fillSupplierCode('');
    expect(isDisabled).toBeFalsy();
    await summaryPage.scrollToBottom();
    await snapExpect(1);
  });
  test('WTY31101_42', async ({
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

    await summaryPage.activeRadioButton('9', false, true);
    await page.waitForTimeout(500);
    await snapExpect(1);
    await summaryPage.activeRadioButton('3', false, true);
    await page.waitForTimeout(500);
    const isDisabled = await summaryPage.verifyFormFields(
      summaryPage.supplierFields,
      true,
    );
    expect(isDisabled).toBeTruthy();
    const supplierCode = await summaryPage.getSupplierCode();
    const supplierName = await summaryPage.getSupplierName();
    expect(supplierCode).toBe('');
    expect(supplierName).toBe('');
    await snapExpect(2);
  });
  test('WTY31101_43', async ({
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
    await summaryPage.activeRadioButton('1', false, true);
    await page.waitForTimeout(500);
    await snapExpect(1);
    await summaryPage.clickConfirmMenu();
    await page.waitForTimeout(500);
    const isShowDialog = await summaryPage.isErrorDialogVisible();
    expect(isShowDialog).toBeTruthy();
    const messageError = await summaryPage.waitForTextInBody(
      WTY31101_MESSAGES.TE5147,
    );
    expect(messageError).toBeTruthy();
    await snapExpect(2);
  });
  test('WTY31101_44', async ({
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
    await summaryPage.activeRadioButton('2', false, true);
    await page.waitForTimeout(500);
    await snapExpect(1);
    await summaryPage.clickConfirmMenu();
    await page.waitForTimeout(500);
    const isShowDialog = await summaryPage.isErrorDialogVisible();
    expect(isShowDialog).toBeTruthy();
    const messageError = await summaryPage.waitForTextInBody(
      WTY31101_MESSAGES.TE5137,
    );
    expect(messageError).toBeTruthy();
    await snapExpect(2);
  });
  test('WTY31101_45', async ({
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
    await page.waitForTimeout(500);
    await snapExpect(1);
    await summaryPage.clickConfirmMenu();
    await page.waitForTimeout(500);
    const isShowDialog = await summaryPage.isErrorDialogVisible();
    expect(isShowDialog).toBeTruthy();
    const messageError = await summaryPage.waitForTextInBody(
      WTY31101_MESSAGES.TE5137_1,
    );
    expect(messageError).toBeTruthy();
    await snapExpect(2);
  });
  test('WTY31101_46', async ({
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
    await page.waitForTimeout(500);
    await summaryPage.activeRadioButton('9', false, true);
    await page.waitForTimeout(500);
    await snapExpect(1);
    await summaryPage.clickConfirmMenu();
    await page.waitForTimeout(500);
    const messageError = await summaryPage.waitForTextInBody(
      WTY31101_MESSAGES.TE5130_1,
    );
    expect(messageError).toBeTruthy();
    await snapExpect(2);
  });
  test('WTY31101_47', async ({ page, snapInput, snapExpect }) => {
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    await summaryPage.clickConfirmMenu();
    await page.waitForTimeout(500);
    const messageError = await summaryPage.waitForTextInBody(
      WTY31101_MESSAGES.TE5096_1,
    );
    expect(messageError).toBeTruthy();
    await snapExpect(1);
  });
  //   có thể  bỏ vì manual đã test
  test('WTY31101_48', async ({
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
    await page.waitForTimeout(500);
    await summaryPage.fillQuantity(testData.formData.quantityGreaterThan);
    await snapInput(3);
    await summaryPage.clickConfirmMenu();
    await page.waitForTimeout(500);
    const isShowDialog = await summaryPage.isErrorDialogVisible();
    expect(isShowDialog).toBeTruthy();
    const messageError = await summaryPage.waitForTextInBody('TN5039');
    expect(messageError).toBeTruthy();
    await snapExpect(2);
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
});
