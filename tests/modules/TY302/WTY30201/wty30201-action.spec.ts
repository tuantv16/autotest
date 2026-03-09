import { test, expect, loadTestData } from '../../../base/base-test';
import { TY30201Page } from "../../../pages/TY302/wty30201.page";
import { takeScreenshotOnFailure } from "../../../utils/common-helper";

test.describe('WTY30201 - (商品プライス出力指示)', () => {
    let productPriceOutputPage: TY30201Page;

    test.beforeEach(async ({ page, baseUrl }) => {
        productPriceOutputPage = new TY30201Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('WTY30201_54', async ({
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

      await productPriceOutputPage.fillShnCd(testData.formData.shnCd_24);
      await productPriceOutputPage.fillMsu(testData.formData.msu_29);
      await productPriceOutputPage.fillBk(testData.formData.bk_25);

      await snapInput();
      await page.waitForTimeout(500);

      await productPriceOutputPage.clickClear();
      await page.waitForTimeout(500);
      expect(await page.locator(productPriceOutputPage.selectorsObj.shnCdInput).inputValue()).toBe('');
      expect(await page.locator(productPriceOutputPage.selectorsObj.msuInput).inputValue()).toBe('');
      expect(await page.locator(productPriceOutputPage.selectorsObj.bkInput).inputValue()).toBe('');
      await page.waitForTimeout(500);
      await snapExpect();

    });

    test('WTY30201_62', async ({
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

      await productPriceOutputPage.fillShnCd(testData.formData.shnCd_24);
      
      await snapInput();
      await page.waitForTimeout(500);

      await productPriceOutputPage.clickClearShnCd();
      await page.waitForTimeout(500);
      expect(await page.locator(productPriceOutputPage.selectorsObj.shnCdInput).inputValue()).toBe('');
      await page.waitForTimeout(500);
      await snapExpect();

    });

    test('WTY30201_63', async ({
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
      await page.waitForTimeout(500);
      
      await snapInput();
      await page.waitForTimeout(500);

      await productPriceOutputPage.clickClearOutDate();
      await page.waitForTimeout(500);
      expect(await page.locator(productPriceOutputPage.selectorsObj.outDateInput).inputValue()).toBe('');
      await page.waitForTimeout(500);
      await snapExpect();

    });

    test('WTY30201_64', async ({
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
      await page.waitForTimeout(500);
      await productPriceOutputPage.fillMoc(testData.formData.moc_22)
      await page.locator(productPriceOutputPage.selectorsObj.mocInput).blur();
      await snapInput();
      await page.waitForTimeout(500);

      await page.waitForTimeout(500);
      expect(await page.locator(productPriceOutputPage.selectorsObj.mocInput).inputValue()).toBe('1,234');
      await page.waitForTimeout(500);
      await snapExpect();

    });


});