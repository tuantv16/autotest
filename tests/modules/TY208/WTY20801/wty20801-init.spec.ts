import { test, expect, loadTestData } from '../../../base/base-test';
import { TY20801Page } from '../../../pages/TY208/wty20801.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';
import {API_ENDPOINTS} from "../../../constants/api-endpoints";

test.describe('WTY20801', () => {
  let testPage: TY20801Page;

  test.beforeEach(async ({ page, baseUrl }) => {
    testPage = new TY20801Page(page);
  });

  test.afterEach(async ({ page }, testInfo) => {
    await takeScreenshotOnFailure(page, testInfo);
  });

  test('WTY20801_04', async ({
                               page,
                               baseUrl,
                               indexedDBHelper,
                               snapExpect,
                             }) => {
    const testData = loadTestData('TY208/wty20801', 'wty20801', 'TC_04');
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await testPage.navigate();

    const title = await testPage.waitForTextInBody(testPage.Texts.Title);
    expect(title).toBe(true);

    const buttonAdd = await testPage.waitForTextInBody(testPage.Texts.ButtonAdd);
    expect(buttonAdd).toBe(true);

    const installationNumber = await testPage.getFieldValue(testPage.Locators.installationNumber);
    expect(installationNumber).toEqual('');

    const classTable = await testPage.hasChildElements(testPage.Locators.classTable);
    expect(classTable).toBe(false);
    await snapExpect();
  });

  test('WTY20801_05', async ({
                               page,
                               baseUrl,
                               indexedDBHelper,
                               snapExpect,
                             }) => {
    // Load test data
    const testData = loadTestData('TY208/wty20801', 'wty20801', 'TC_05');

    // Extract sechiKnrNo array from testData
    const sechiInfoDT = testData.sessionData[0].value.ty208sechiInfoDT;
    const expectedSechiNos = sechiInfoDT.map((item: any) => item.sechiKnrNo);

    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await testPage.navigate();

    // Verify each sechiKnrNo value in table matches testData
    for (let i = 0; i < expectedSechiNos.length; i++) {
      const cellValue = await testPage.getCellValue(i);

      // Verify value matches expected
      expect(cellValue).toBe(expectedSechiNos[i]);

      // Verify value has exactly 14 characters
      expect(cellValue.length).toBe(14);
    }
    await snapExpect();
  });

  test('WTY20801_07', async ({
                               page,
                               baseUrl,
                               indexedDBHelper,
                               snapInput,
                               snapExpect,
                             }) => {
    // Load test data
    const testData = loadTestData('TY208/wty20801', 'wty20801', 'TC_05');

    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await testPage.navigate();
    await snapInput();

    await testPage.clickButtonByText(testPage.Texts.ButtonAdd);
    const TE5050 = await testPage.waitForTextInBody(testPage.Texts.TE5050);
    expect(TE5050).toBe(true);
    await snapExpect();
  });

  test('WTY20801_08', async ({
                               page,
                               baseUrl,
                               indexedDBHelper,
                               snapInput,
                               snapExpect,
                             }) => {
    // Load test data
    const testData = loadTestData('TY208/wty20801', 'wty20801', 'TC_05');

    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData,
    });
    await testPage.navigate();
    await snapInput();
    await testPage.fillInstallationNumber("123");
    await testPage.clickButtonByText(testPage.Texts.ButtonAdd);
    const TE5130 = await testPage.waitForTextInBody(testPage.Texts.TE5130);
    await snapExpect();
    // expect(TE5130).toBe(true);
  });

  test('WTY20801_09', async ({
                               page,
                               baseUrl,
                               indexedDBHelper,
                               snapInput,
                               snapExpect,
                           }) => {
    // Load test data
    const testData = loadTestData('TY208/wty20801', 'wty20801', 'TC_05');

    // Extract sechiKnrNo array from testData
    const sechiKnrNo = testData.sessionData[0].value.ty208sechiInfoDT[0].sechiKnrNo;

    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData,
    });
    await testPage.navigate();
    await snapInput();
    await testPage.fillInstallationNumber(sechiKnrNo);
    await testPage.clickButtonByText(testPage.Texts.ButtonAdd);
    const TE5200 = await testPage.waitForTextInBody(testPage.Texts.TE5200);
    expect(TE5200).toBe(true);
    await snapExpect();
  });

  test('WTY20801_11', async ({
                               page,
                               baseUrl,
                               indexedDBHelper,
                               snapInput,
                               snapExpect,
                           }) => {
    // Load test data
    const testData = loadTestData('TY208/wty20801', 'wty20801', 'TC_11');
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData,
    });
    await testPage.navigate();
    await snapInput();
    await testPage.fillInstallationNumber('12345678901234');
    await testPage.clickButtonByText(testPage.Texts.ButtonAdd);
    const TE5198 = await testPage.waitForTextInBody(testPage.Texts.TE5198);
    expect(TE5198).toBe(true);
    await snapExpect();
  });

  test('WTY20801_12', async ({
                               page,
                               baseUrl,
                               indexedDBHelper,
                               snapInput,
                               snapExpect,
                           }) => {
    // Load test data
    const testData = loadTestData('TY208/wty20801', 'wty20801', 'TC_11');
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData,
    });
    await testPage.navigate();
    await snapInput();
    await testPage.fillInstallationNumber('99999990001111');
    await testPage.clickButtonByText(testPage.Texts.ButtonAdd);
    const NotFound = await testPage.waitForTextInBody(testPage.Texts.NotFound);
    expect(NotFound).toBe(true);
    await snapExpect();
  });

    test('WTY20801_24', async ({
                               page,
                               baseUrl,
                               indexedDBHelper,
                               snapInput,
                               snapExpect,
                           }) => {
    // Load test data
        const testData = loadTestData('TY208/wty20801', 'wty20801', 'TC_11');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });
        await testPage.navigate();
        await snapInput();
        const sechiNo = await testPage.getCellValue(0);
        await testPage.clickRandomRow(0);
        await snapExpect();
        await testPage.clickButtonByText(testPage.Texts.ButtonDelete);
        const deleteConfirm = await testPage.waitForTextInBody(testPage.Texts.DeleteConfirm);
        expect(deleteConfirm).toBe(true);
        await snapExpect(1);
        await testPage.clickButtonByText(testPage.Texts.ButtonYes);
        await snapExpect(2);
        expect(await testPage.isTextNotInTable(sechiNo)).toBe(true);
    });

    test('WTY20801_25', async ({
                               page,
                               baseUrl,
                               indexedDBHelper,
                               snapInput,
                               snapExpect,
                           }) => {
    // Load test data
        const testData = loadTestData('TY208/wty20801', 'wty20801', 'TC_11');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });
        await testPage.navigate();
        await snapInput();
        const sechiNo = await testPage.getCellValue(0);
        await testPage.clickRandomRow(0);
        await snapExpect();
        await testPage.clickButtonByText(testPage.Texts.ButtonDelete);
        const deleteConfirm = await testPage.waitForTextInBody(testPage.Texts.DeleteConfirm);
        expect(deleteConfirm).toBe(true);
        await snapExpect(1);
        await testPage.clickButtonByText(testPage.Texts.ButtonNo);
        await snapExpect(2);
        expect(await testPage.isTextNotInTable(sechiNo)).toBe(false);
    });

    test('WTY20801_30', async ({
                               page,
                               baseUrl,
                               indexedDBHelper,
                               snapInput,
                               snapExpect,
                           }) => {
    // Load test data
        const testData = loadTestData('TY208/wty20801', 'wty20801', 'TC_11');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });
        await testPage.navigate();
        await snapInput();
        await testPage.clickButtonByText(testPage.Texts.ButtonConfirm);
        await snapExpect();
        await testPage.clickButtonByText(testPage.Texts.ButtonNo);
        const url = await testPage.getCurrentUrl();
        expect(url).toContain("/WTY20801InstallationConfirmation");
        await snapExpect(1);
    });

    test('WTY20801_33', async ({
                               page,
                               baseUrl,
                               indexedDBHelper,
                               snapInput,
                               snapExpect,
                           }) => {
    // Load test data
        const testData = loadTestData('TY208/wty20801', 'wty20801', 'TC_11');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });
        await testPage.navigate();
        await snapInput();
        await testPage.fillInstallationNumber('');
        const buttonSearch = await testPage.waitForTextInBody(testPage.Texts.ButtonSearch)
        expect(buttonSearch).toBe(true);
        await snapExpect();
    });

    test('WTY20801_34', async ({
                               page,
                               baseUrl,
                               indexedDBHelper,
                               snapInput,
                               snapExpect,
                           }) => {
    // Load test data
        const testData = loadTestData('TY208/wty20801', 'wty20801', 'TC_11');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData,
        });
        await testPage.navigate();
        await snapInput();
        await testPage.clickRandomRow(0);
        let buttonClose = await testPage.waitForTextInBody(testPage.Texts.ButtonClose);
        expect(buttonClose).toBe(true);
        await snapExpect();
        await testPage.clickButtonByText(testPage.Texts.ButtonClose);
        buttonClose = await testPage.waitForTextInBody(testPage.Texts.ButtonClose, 500);
        expect(buttonClose).toBe(false);
        await snapExpect(1);
    });

});