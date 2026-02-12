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

    test('WTY30201_06', async ({
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

      const outDateInput = await page.locator(productPriceOutputPage.selectorsObj.outDateInput).inputValue();
      const layoutInput = await page.locator(productPriceOutputPage.selectorsObj.layoutInput).inputValue();

      expect(outDateInput).toBe('2025/08/05');
      expect(layoutInput).toBe('税込ﾚｲｱｳﾄ 税率8%');
      
      await snapExpect();

    });

    test('WTY30201_07', async ({
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

      await page.locator(productPriceOutputPage.selectorsObj.shnCdInput).focus();
      const subMenu = await productPriceOutputPage.waitForTextInBody('型番検索');
      expect(subMenu).toBe(true);
      await snapExpect();

    });

    test('WTY30201_08', async ({
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

      const buttonOutDate = await productPriceOutputPage.waitForTextInBody('出力日確定');
      expect(buttonOutDate).toBe(true);
      await snapExpect();

    });


    test('WTY30201_13', async ({
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

      const checkShnCd = await page.locator(productPriceOutputPage.selectorsObj.shnCdInput).isEnabled();
      expect(checkShnCd).toBe(true);
      await snapExpect();

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


});