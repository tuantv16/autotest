import { expect, loadTestData, test } from '../../../base/base-test';
import { WTY32201_MESSAGES } from '../../../constants/messages';
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

  test('WTY32201_19', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    // validate shelf number
    const testData = loadTestData('TY322/wty32201', 'wty32201', 'TC_UI');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    await summaryPage.clickRegister();
    const message = await summaryPage.waitForTextInBody(
      WTY32201_MESSAGES.REQUIRED_SHELF_NUMBER,
      200,
    );
    expect(message).toBe(true);
    await snapExpect();
  });
  test('WTY32201_20', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    // validate shelf number
    const testData = loadTestData('TY322/wty32201', 'wty32201', 'TC_UI');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    await summaryPage.fillShelfNumber(testData.formData.shelfNumber_123);
    await page.waitForTimeout(200);
    await summaryPage.clickRegister();
    const message = await summaryPage.waitForTextInBody(
      WTY32201_MESSAGES.SHELF_NUMBER_LENGTH,
      200,
    );
    expect(message).toBe(true);
    await snapExpect();
  });
  test('WTY32201_21', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    // validate shelf number
    const testData = loadTestData('TY322/wty32201', 'wty32201', 'TC_UI');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    await summaryPage.fillShelfNumber('ABCDEFG');
    await page.waitForTimeout(200);
    await summaryPage.clickRegister();
    const message = await summaryPage.waitForTextInBody(
      WTY32201_MESSAGES.REQUIRED_SHELF_NUMBER,
      200,
    );
    expect(message).toBe(true);
    await snapExpect();
  });
  test('WTY32201_22', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    // validate jan code
    const testData = loadTestData('TY322/wty32201', 'wty32201', 'TC_UI');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    await summaryPage.fillShelfNumber(testData.formData.shelfNumber);
    await page.waitForTimeout(200);
    await summaryPage.clickRegister();
    const message = await summaryPage.waitForTextInBody(
      WTY32201_MESSAGES.REQUIRED_JAN_CODE,
      200,
    );
    expect(message).toBe(true);
    await snapExpect();
  });
  test('WTY32201_23', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    // validate jan code
    const testData = loadTestData('TY322/wty32201', 'wty32201', 'TC_UI');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    await summaryPage.fillShelfNumber(testData.formData.shelfNumber);
    await summaryPage.fillJanCode(testData.formData.janCode_length_6);
    await page.waitForTimeout(200);
    await summaryPage.clickRegister();
    const message = await summaryPage.waitForTextInBody(
      WTY32201_MESSAGES.JAN_CODE_LENGTH,
      200,
    );
    expect(message).toBe(true);
    await snapExpect();
  });
  test('WTY32201_24', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    // validate jan code
    const testData = loadTestData('TY322/wty32201', 'wty32201', 'TC_UI');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    await summaryPage.fillShelfNumber(testData.formData.shelfNumber);
    await summaryPage.fillJanCode(testData.formData.janCodeInvalid);
    await page.waitForTimeout(200);
    await summaryPage.clickRegister();
    const message = await summaryPage.waitForTextInBody(
      WTY32201_MESSAGES.JAN_CODE_INVALID,
      200,
    );
    expect(message).toBe(true);
    await snapExpect();
  });
  test('WTY32201_25', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    // validate quantity
    const testData = loadTestData('TY322/wty32201', 'wty32201', 'TC_UI');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    await summaryPage.fillShelfNumber(testData.formData.shelfNumber);
    await summaryPage.fillJanCode(testData.formData.janCode);
    await page.waitForTimeout(200);
    await summaryPage.clickRegister();
    const message = await summaryPage.waitForTextInBody(
      WTY32201_MESSAGES.QUANTITY_REQUIRED,
      200,
    );
    expect(message).toBe(true);
    await snapExpect();
  });
  test('WTY32201_26', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    // validate quantity
    const testData = loadTestData('TY322/wty32201', 'wty32201', 'TC_UI');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    await summaryPage.fillShelfNumber(testData.formData.shelfNumber);
    await summaryPage.fillJanCode(testData.formData.janCode);
    await summaryPage.fillQuantity(testData.formData.quantity_negative);
    await page.waitForTimeout(200);
    await summaryPage.clickRegister();
    const message = await summaryPage.waitForTextInBody(
      WTY32201_MESSAGES.QUANTITY_MIN,
      200,
    );
    expect(message).toBe(true);
    await snapExpect();
  });
  test('WTY32201_27', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    // validate quantity
    const testData = loadTestData('TY322/wty32201', 'wty32201', 'TC_UI');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    await summaryPage.fillShelfNumber(testData.formData.shelfNumber);
    await summaryPage.fillJanCode(testData.formData.janCode);
    await summaryPage.fillQuantity(testData.formData.quantity_max);
    await page.waitForTimeout(200);
    const quantity = await summaryPage.getQuantity();
    expect(quantity).toBe(testData.formData.quantity_1000);
    await snapExpect();
  });
  test('WTY32201_28', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    // validate quantity
    const testData = loadTestData('TY322/wty32201', 'wty32201', 'TC_UI');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    await summaryPage.fillShelfNumber(testData.formData.shelfNumber);
    await summaryPage.fillJanCode(testData.formData.janCode);
    await summaryPage.fillQuantity(testData.formData.quantity);
    await page.waitForTimeout(200);
    const quantity = await summaryPage.getQuantity();
    expect(quantity).toBe(testData.formData.quantity);
    await snapExpect();
  });
  test('WTY32201_29', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    // validate quantity
    const testData = loadTestData('TY322/wty32201', 'wty32201', 'TC_UI');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    await summaryPage.fillShelfNumber(testData.formData.shelfNumber);
    await summaryPage.fillJanCode(testData.formData.janCode);
    await summaryPage.fillQuantity(testData.formData.quantity_not_number);
    await page.waitForTimeout(200);
    await summaryPage.clickRegister();
    const message = await summaryPage.waitForTextInBody(
      WTY32201_MESSAGES.QUANTITY_INTEGER,
      200,
    );
    expect(message).toBe(true);
    await snapExpect();
  });
  test('WTY32201_30', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    // validate quantity
    const testData = loadTestData('TY322/wty32201', 'wty32201', 'TC_UI');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    await summaryPage.fillShelfNumber(testData.formData.shelfNumber);
    await summaryPage.fillJanCode('0');
    await page.waitForTimeout(200);
    await summaryPage.clickRegister();
    const shelfNumber = await summaryPage.getShelfNumber();
    const janCode = await summaryPage.getJanCode();
    expect(shelfNumber).toBe('');
    expect(janCode).toBe('');
    await snapExpect();
  });
  test('WTY32201_31', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    // validate jan code start with 27
    const testData = loadTestData('TY322/wty32201', 'wty32201', 'TC_UI');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    await summaryPage.fillShelfNumber(testData.formData.shelfNumber);
    await summaryPage.fillJanCode(testData.formData.janCode);
    await summaryPage.fillQuantity('2');
    await page.waitForTimeout(200);
    await snapInput(1);
    await summaryPage.clickRegister();
    await page.waitForTimeout(1000);

    await summaryPage.fillShelfNumber(testData.formData.shelfNumber_2);
    await summaryPage.fillJanCode(testData.formData.janCode);
    await summaryPage.fillQuantity('3');
    await page.waitForTimeout(200);
    await snapInput(2);
    await summaryPage.clickRegister();
    await page.waitForTimeout(1000);
    const shelfTotal = await summaryPage.getShelfTotal();
    expect(shelfTotal).toBe('5');
    await snapExpect();
  });
  test('WTY32201_32', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {
    // validate jan code start with 27
    const testData = loadTestData('TY322/wty32201', 'wty32201', 'TC_UI');
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await summaryPage.navigate();
    await page.waitForTimeout(1000);
    await snapInput();
    await summaryPage.fillShelfNumber(testData.formData.shelfNumber);
    await summaryPage.fillJanCode(testData.formData.janCodeStart_271);
    await summaryPage.fillQuantity('2');
    await page.waitForTimeout(200);
    await snapInput(1);
    await summaryPage.clickRegister();
    await page.waitForTimeout(1000);
    const janCode = await summaryPage.getJanCode();
    expect(janCode).toBe('');
    await snapExpect();
  });
});
