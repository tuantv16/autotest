import { test, expect, loadTestData } from '../../../base/base-test';
import { TY30201Page } from "../../../pages/TY302/wty30201.page";
import { takeScreenshotOnFailure } from "../../../utils/common-helper";
import { snapInput } from '../../../utils/screenshot-helper';

test.describe('WTY30201 - (商品プライス出力指示)', () => {
    let productPriceOutputPage: TY30201Page;

    test.beforeEach(async ({ page, baseUrl }) => {
        productPriceOutputPage = new TY30201Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('WTY30201_14', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData('TY302/wty30201', 'wty30201', 'init');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);

      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });

      await productPriceOutputPage.navigate();
      await page.waitForTimeout(1000);

      await productPriceOutputPage.waitForFormReady();

      await productPriceOutputPage.fillOutDate(testData.formData.outDate_08);
      await page.waitForTimeout(1000);

      const outDateInput = await page.locator(productPriceOutputPage.selectorsObj.outDateInput).inputValue();
      expect(outDateInput).toBe('2025/08/06');
      await snapExpect();
    });

    test('WTY30201_15', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData('TY302/wty30201', 'wty30201', 'init');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);

      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });

      await productPriceOutputPage.navigate();
      await page.waitForTimeout(1000);

      await productPriceOutputPage.waitForFormReady();

      await productPriceOutputPage.clickClearOutDate();
      await page.waitForTimeout(1000);

      await productPriceOutputPage.clickOutDateCommit();
      await page.waitForTimeout(1000);

      const checkOutDateInput = await productPriceOutputPage.waitForTextInBody('出力日は必須入力です。');
      expect(checkOutDateInput).toBe(true);
      await snapExpect();
    });

    test('WTY30201_16', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData('TY302/wty30201', 'wty30201', 'init');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);

      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });

      await productPriceOutputPage.navigate();
      await page.waitForTimeout(1000);

      await productPriceOutputPage.waitForFormReady();
      await page.waitForTimeout(1000);
      await snapInput();

      await productPriceOutputPage.fillOutDate(testData.formData.outDate_16);
      await page.waitForTimeout(1000);

      await productPriceOutputPage.clickOutDateCommit();
      await page.waitForTimeout(1000);

      const checkOutDateInput = await productPriceOutputPage.waitForTextInBody('2025/08/05以降の日付を入力してください');
      expect(checkOutDateInput).toBe(true);
      await snapExpect();
    });

    test('WTY30201_17', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData('TY302/wty30201', 'wty30201', 'init');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);

      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });

      await productPriceOutputPage.navigate();
      await page.waitForTimeout(1000);

      await productPriceOutputPage.waitForFormReady();
      await page.waitForTimeout(1000);

      await productPriceOutputPage.fillShnCd(testData.formData.shnCd_17);
      await page.waitForTimeout(1000);

      const checkShnCdInput = await page.locator(productPriceOutputPage.selectorsObj.shnCdInput).inputValue();
      expect(checkShnCdInput).toBe('4901234567890');
      await snapExpect();
    });

    test('WTY30201_18', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData('TY302/wty30201', 'wty30201', 'init');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);

      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });

      await productPriceOutputPage.navigate();
      await page.waitForTimeout(1000);

      await productPriceOutputPage.waitForFormReady();
      await page.waitForTimeout(1000);

      await productPriceOutputPage.fillShnCd(testData.formData.shnCd_18);
      await page.waitForTimeout(1000);

      const checkShnCdInput = await page.locator(productPriceOutputPage.selectorsObj.shnCdInput).inputValue();
      expect(checkShnCdInput).toBe('12345678');
      await snapExpect();
    });

    test('WTY30201_19', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData('TY302/wty30201', 'wty30201', 'init');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);

      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });

      await productPriceOutputPage.navigate();
      await page.waitForTimeout(1000);

      await productPriceOutputPage.waitForFormReady();
      await page.waitForTimeout(1000);

      await productPriceOutputPage.fillShnCd(testData.formData.shnCd_19);
      await page.waitForTimeout(1000);

      const checkShnCdInput = await page.locator(productPriceOutputPage.selectorsObj.shnCdInput).inputValue();
      expect(checkShnCdInput).toBe('12345678901');
      await snapExpect();
    });

    test('WTY30201_20', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData('TY302/wty30201', 'wty30201', 'init');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);

      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });

      await productPriceOutputPage.navigate();
      await page.waitForTimeout(1000);

      await productPriceOutputPage.waitForFormReady();
      await page.waitForTimeout(1000);

      await productPriceOutputPage.clickSearch();
      await page.waitForTimeout(1000);

      const checkShnCd = await productPriceOutputPage.waitForTextInBody('必須入力項目です。');
      expect(checkShnCd).toBe(true);
      await snapExpect();
    });

    test('WTY30201_22', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData('TY302/wty30201', 'wty30201', 'init');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);

      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });

      await productPriceOutputPage.navigate();
      await page.waitForTimeout(1000);

      await productPriceOutputPage.waitForFormReady();
      await page.waitForTimeout(1000);

      await productPriceOutputPage.fillMoc(testData.formData.moc_22);
      await page.waitForTimeout(1000);
      await productPriceOutputPage.scrollToBottom();
      const checkMocInput = await page.locator(productPriceOutputPage.selectorsObj.mocInput).inputValue();
      expect(checkMocInput).toBe('1234');
      await snapExpect();
    });

    test('WTY30201_23', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData('TY302/wty30201', 'wty30201', 'init');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);

      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });

      await productPriceOutputPage.navigate();
      await page.waitForTimeout(1000);

      await productPriceOutputPage.waitForFormReady();
      await page.waitForTimeout(1000);

      await productPriceOutputPage.fillMoc(testData.formData.moc_23);
      await page.waitForTimeout(1000);
      await productPriceOutputPage.scrollToBottom();
      const checkMocInput = await page.locator(productPriceOutputPage.selectorsObj.mocInput).inputValue();
      expect(checkMocInput).toBe('1234');
      await snapExpect();
    });

    test('WTY30201_24', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData('TY302/wty30201', 'wty30201', 'init');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);

      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });

      await productPriceOutputPage.navigate();
      await page.waitForTimeout(1000);

      await productPriceOutputPage.waitForFormReady();
      await page.waitForTimeout(1000);
      await productPriceOutputPage.fillShnCd(testData.formData.shnCd_24);
      await page.locator(productPriceOutputPage.selectorsObj.shnCdInput).blur();
      await page.waitForTimeout(3000);
      await productPriceOutputPage.fillMoc(testData.formData.moc_24);
      await page.waitForTimeout(1000);
      await productPriceOutputPage.scrollToBottom();
         await snapInput();
      await productPriceOutputPage.clickSearch();
      await page.waitForTimeout(1000);

      const checkMocInput = await productPriceOutputPage.waitForTextInBody('数値で入力してください。');
      expect(checkMocInput).toBe(true);
      await snapExpect();
    });

    test('WTY30201_25', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData('TY302/wty30201', 'wty30201', 'init');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);

      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });

      await productPriceOutputPage.navigate();
      await page.waitForTimeout(1000);

      await productPriceOutputPage.waitForFormReady();
      await page.waitForTimeout(1000);
      await productPriceOutputPage.fillBk(testData.formData.bk_25);
      await productPriceOutputPage.scrollToBottom();
      const checkBkInput = await page.locator(productPriceOutputPage.selectorsObj.bkInput).inputValue();
      expect(checkBkInput).toBe('1234567');
      await snapExpect();
    });

    test('WTY30201_26', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData('TY302/wty30201', 'wty30201', 'init');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);

      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });

      await productPriceOutputPage.navigate();
      await page.waitForTimeout(1000);
      await productPriceOutputPage.fillShnCd(testData.formData.shnCd_24);
      await productPriceOutputPage.waitForFormReady();
      await page.waitForTimeout(1000);
      await productPriceOutputPage.fillBk(testData.formData.bk_26);
      await page.waitForTimeout(1000);
      await snapInput();
      await productPriceOutputPage.clickSearch();
      await page.waitForTimeout(1000);
      await productPriceOutputPage.scrollToBottom();
      const checkBkInput = await productPriceOutputPage.waitForTextInBody('売価は7桁以内で入力してください。');
      expect(checkBkInput).toBe(true);
      await snapExpect();
    });

    test('WTY30201_27', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData('TY302/wty30201', 'wty30201', 'init');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);

      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });

      await productPriceOutputPage.navigate();
      await page.waitForTimeout(1000);
      await productPriceOutputPage.fillShnCd(testData.formData.shnCd_24);
      await productPriceOutputPage.waitForFormReady();
      await page.waitForTimeout(1000);
      await productPriceOutputPage.fillBk(testData.formData.bk_27);
      await page.waitForTimeout(1000);
      await snapInput();
      await productPriceOutputPage.clickSearch();
      await page.waitForTimeout(1000);
      await productPriceOutputPage.scrollToBottom();
      const checkBkInput = await productPriceOutputPage.waitForTextInBody('数値で入力してください。');
      expect(checkBkInput).toBe(true);
      await snapExpect();
    });

    test('WTY30201_28', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData('TY302/wty30201', 'wty30201', 'init');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);

      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });

      await productPriceOutputPage.navigate();
      await page.waitForTimeout(1000);
      await productPriceOutputPage.clickSizeInput();
      await page.waitForTimeout(1000);
      await snapInput();
      await page.locator('li[data-value="1"]').click();
      await page.waitForTimeout(1000);
     await productPriceOutputPage.scrollToBottom();
      const checkSizeInput = await page.locator('#size span').innerText();
      expect(checkSizeInput).toBe('Ｅ１');
      await snapExpect();
    });

    test('WTY30201_29', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData('TY302/wty30201', 'wty30201', 'init');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);

      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });

      await productPriceOutputPage.navigate();
      await page.waitForTimeout(1000);
      await productPriceOutputPage.fillShnCd(testData.formData.shnCd_24);
      await page.waitForTimeout(1000);
      await productPriceOutputPage.fillMsu(testData.formData.msu_29);
      await page.waitForTimeout(1000);
     await productPriceOutputPage.scrollToBottom();
      const msuInput = await page.locator(productPriceOutputPage.selectorsObj.msuInput).inputValue();
      expect(msuInput).toBe('1234');
      await snapExpect();
    });

    test('WTY30201_30', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData('TY302/wty30201', 'wty30201', 'init');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);

      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });

      await productPriceOutputPage.navigate();
      await page.waitForTimeout(1000);
      await productPriceOutputPage.fillShnCd(testData.formData.shnCd_24);
      await page.waitForTimeout(1000);
      await productPriceOutputPage.fillMsu(testData.formData.msu_30);
      await page.waitForTimeout(1000);

      await productPriceOutputPage.clickSearch();
      await page.waitForTimeout(1000);
     await productPriceOutputPage.scrollToBottom();
      const msuInput = await productPriceOutputPage.waitForTextInBody('枚数は4桁以内で入力してください。');
      expect(msuInput).toBe(true);
      await snapExpect();
    });

    test('WTY30201_31', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData('TY302/wty30201', 'wty30201', 'init');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);

      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });

      await productPriceOutputPage.navigate();
      await page.waitForTimeout(1000);
      await productPriceOutputPage.fillShnCd(testData.formData.shnCd_24);
      await page.waitForTimeout(1000);
      await productPriceOutputPage.fillMsu(testData.formData.msu_31);
      await page.waitForTimeout(1000);

      await productPriceOutputPage.clickSearch();
      await page.waitForTimeout(1000);
     await productPriceOutputPage.scrollToBottom();
      const msuInput = await productPriceOutputPage.waitForTextInBody('数値で入力してください。');
      expect(msuInput).toBe(true);
      await snapExpect();
    });

    test('WTY30201_41', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData('TY302/wty30201', 'wty30201', 'init');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);

      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });

      await productPriceOutputPage.navigate();
      await page.waitForTimeout(1000);
      await productPriceOutputPage.clickBarCode();
      await page.waitForTimeout(1000);
      const msuInput = await productPriceOutputPage.waitForTextInBody('スキャナーはFlutterアプリ内でのみ動作します');
      expect(msuInput).toBe(true);
      await snapExpect();
    });

    test('WTY30201_49', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData('TY302/wty30201', 'wty30201', 'init');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);

      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData
      });

      await productPriceOutputPage.navigate();
      await page.waitForTimeout(1000);
      await productPriceOutputPage.clickConfirm();
      await page.waitForTimeout(1000);
      const msuInput = await productPriceOutputPage.waitForTextInBody('商品が入力されていないため確定できません。');
      expect(msuInput).toBe(true);
      await snapExpect();
    });



});