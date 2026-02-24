import { test, expect, loadTestData } from '../../../base/base-test';
import { TY30202Page } from "../../../pages/TY302/wty30202.page";
import { takeScreenshotOnFailure } from "../../../utils/common-helper";

test.describe('WTY30202 - (商品プライス出力指示一覧)', () => {
    let productPriceOutputPage: TY30202Page;

    test.beforeEach(async ({ page, baseUrl }) => {
        productPriceOutputPage = new TY30202Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('WTY30202_13', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData('TY302/wty30202', 'wty30202', 'init');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);

      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData,
      });

      await productPriceOutputPage.navigate();
      await page.waitForTimeout(3000);

      await productPriceOutputPage.waitForFormReady();

      await productPriceOutputPage.fillOutDate(testData.formData.outDate_13);
      const outDateInput = await page.locator(productPriceOutputPage.selectorsObj.outDateInput).inputValue();
      expect(outDateInput).toBe('2025/08/06');
      
      await snapExpect();

    });

    test('WTY30202_15', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData('TY302/wty30202', 'wty30202', 'init');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);

      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData,
      });

      await productPriceOutputPage.navigate();
      await page.waitForTimeout(3000);

      await productPriceOutputPage.waitForFormReady();

      await productPriceOutputPage.clickClearOutDate();
      await snapInput();
      await productPriceOutputPage.clickOutDateCommit();

      const checkOutDateInput = await productPriceOutputPage.waitForTextInBody('出力日は必須入力です。');
      expect(checkOutDateInput).toBe(true);
      
      await snapExpect();

    });

    test('WTY30202_16', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData('TY302/wty30202', 'wty30202', 'init');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);

      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData,
      });

      await productPriceOutputPage.navigate();
      await page.waitForTimeout(3000);

      await productPriceOutputPage.waitForFormReady();

      await productPriceOutputPage.fillOutDate(testData.formData.outDate_16);
      await snapInput();
      await productPriceOutputPage.clickOutDateCommit();

      const checkOutDateInput = await productPriceOutputPage.waitForTextInBody('2025/08/05以降の日付を入力してください');
      expect(checkOutDateInput).toBe(true);
      
      await snapExpect();

    });

    test('WTY30202_17', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData('TY302/wty30202', 'wty30202', 'init');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);

      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData,
      });

      await productPriceOutputPage.navigate();
      await page.waitForTimeout(3000);

      await productPriceOutputPage.waitForFormReady();

      await snapInput();
      await productPriceOutputPage.clickClearOutDate();
      await page.waitForTimeout(500);
      const checkOutDateInput = await page.locator(productPriceOutputPage.selectorsObj.outDateInput).inputValue();
      expect(checkOutDateInput).toBe('');
      
      await snapExpect();

    });

    test('WTY30202_27', async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData('TY302/wty30202', 'wty30202', 'init');
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);

      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData,
      });

      await productPriceOutputPage.navigate();
      await page.waitForTimeout(3000);

      await productPriceOutputPage.waitForFormReady();

      await snapInput();
      await productPriceOutputPage.clickClearOutDate();
      await productPriceOutputPage.fillOutDate(testData.formData.outDate_27);
      await page.waitForTimeout(500);
      await page.locator(productPriceOutputPage.selectorsObj.outDateInput).blur();
      const checkOutDateInput = await page.locator(productPriceOutputPage.selectorsObj.outDateInput).inputValue();
      expect(checkOutDateInput).toBe('2024/12/01');
      
      await snapExpect();

    });

});