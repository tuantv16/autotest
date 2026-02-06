import { test, expect, loadTestData } from '../../../base/base-test';
import { TY30301Page } from "../../../pages/TY303/wty30301.page";
import { takeScreenshotOnFailure } from "../../../utils/common-helper";
import { toDate } from "../../../utils/date";

test.describe('WTY30301 - (マルチＰＯＰ出力指示)', () => {
    let summaryPage: TY30301Page;

    test.beforeEach(async ({ page, baseUrl }) => {
        summaryPage = new TY30301Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('WTY30301_07', async ({
        page,
        baseUrl,
        snapInput,
        snapExpect
    }) => {
        const expectedTitle = 'マルチＰＯＰ出力指示';

        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await summaryPage.navigate();
        await snapInput();

        // Step 2 & 3: Observe the title in the header and check the title text
        const titleFound = await summaryPage.waitForTextInBody(expectedTitle, 5000);

        // Step 4: Verify title and log result
        expect(titleFound).toBe(true);
        await snapExpect();
    });

    test('WTY30301_09', async ({
        page,
        baseUrl,
        snapInput,
        snapExpect
    }) => {
        // Step 1: Navigate to WTY30301 screen
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await summaryPage.navigate();
        await snapInput();

        // Step 2: Click menu button to open the dropdown
        await summaryPage.clickMenuButton();

        // Step 3: Verify menu items are displayed in the dropdown
        const menuTexts = ['一覧'];

        for (const text of menuTexts) {
            const isDisplayed = await summaryPage.waitForTextInBody(text);
            expect(isDisplayed).toBeTruthy();
        }
        await summaryPage.verifyFooterButtonVisible('クリア');
        await summaryPage.verifyFooterButtonVisible('確定');
        await snapExpect();
    });
  
    test("WTY30301_10", async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData("TY303/wty30301", "wty30301", "TC_04");

      // Step 1: Navigate to WTY30301 screen
      await page.goto(baseUrl, { waitUntil: "domcontentloaded" });

      // Inject IndexedDB data AFTER page loaded
      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData,
      });

      await summaryPage.navigate();

      const isClearButtonOk = await summaryPage.checkClearButton();
      expect(isClearButtonOk).toBe(true);

      const isConfirmButtonOk = await summaryPage.checkConfirmButton();
      expect(isConfirmButtonOk).toBe(true);

      // open menu button
      await summaryPage.clickMenuButton();

      const isDeleteButtonOk = await summaryPage.checkDeleteButton();
      expect(isDeleteButtonOk).toBe(true);

      const isListButtonOk = await summaryPage.checkListButton();
      expect(isListButtonOk).toBe(true);

      await snapExpect();
    });
  
    test('WTY30301_11', async ({
        page,
        baseUrl,
        snapInput,
        snapExpect
    }) => {
        // Step 1: Navigate to WTY30301 screen
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await summaryPage.navigate();
        await snapInput();

        // Step 2: Verify Back button text is displayed
        const isBackButtonVisible = await summaryPage.isBackButtonVisible();
        expect(isBackButtonVisible).toBe(true);
        await snapExpect();
    });

    test('WTY30301_12', async ({
        page,
        baseUrl,
        snapInput,
        snapExpect
    }) => {
        // Step 1: Navigate to WTY30301 screen
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await summaryPage.navigate();
        await snapInput();

        // Step 2: Verify Clear button text is displayed
        await summaryPage.verifyFooterButtonVisible('クリア');
        await snapExpect();
    });

    test('WTY30301_13', async ({
        page,
        baseUrl,
        snapInput,
        snapExpect
    }) => {
        // Step 1: Navigate to WTY30301 screen
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await summaryPage.navigate();
        await snapInput();

        // Step 2: Locate List button
        await summaryPage.clickMenuButton();
        const listButton = await summaryPage.findListButton();

        // Step 3: Verify List button text is displayed
        const isTextDisplayed = await listButton.isVisible();
        expect(isTextDisplayed).toBeTruthy();

        // Step 4: Verify List button is active (enabled)
        const isEnabled = await listButton.isEnabled();
        expect(isEnabled).toBeTruthy();
        await snapExpect();
    });

    test('WTY30301_14', async ({
        page,
        baseUrl,
        snapInput,
        snapExpect
    }) => {
        // Step 1: Navigate to WTY30301 screen
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await summaryPage.navigate();
        await snapInput();

        // Step 2: Verify Confirm button text is displayed
        await summaryPage.verifyFooterButtonVisible('確定');
        await snapExpect();
    });

    test('WTY30301_15', async ({
        page,
        baseUrl,
        snapInput,
        snapExpect
    }) => {
        // Step 1: Navigate to WTY30301 screen
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await summaryPage.navigate();
        await snapInput();

        // Step 2: Locate Normal toggle
        const normalToggle = await summaryPage.findNormalToggle();
        const disposalToggle = await summaryPage.findDisposalToggle();

        // Step 3: Verify both toggle buttons are displayed
        const isNormalTextDisplayed = await normalToggle.isVisible();
        expect(isNormalTextDisplayed).toBeTruthy();

        const isDisposalTextDisplayed = await disposalToggle.isVisible();
        expect(isDisposalTextDisplayed).toBeTruthy();

        // Step 4: Verify default selected state
        const isNormalChecked = await normalToggle.isChecked();
        const isDisposalChecked = await disposalToggle.isChecked();

        expect(isNormalChecked).toBe(true);
        expect(isDisposalChecked).toBe(false);
        await snapExpect();
    });

    test("WTY30301_16", async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData("TY303/wty30301", "wty30301", "TC_03");

      // Init from WTZ01001
      await page.goto(`${baseUrl}/#/menu`, { waitUntil: "domcontentloaded" });

      // Inject IndexedDB data AFTER page loaded
      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData,
      });

      // Navigate to target URL
      await summaryPage.navigate();

      // Verify Output Date field, does it get from IndexedDB
      const isOutputDateCorrect = await summaryPage.checkValueOutputDate(
        toDate(testData.commonData[0].value.unyoDate),
      );
      expect(isOutputDateCorrect).toBe(true);

      await snapExpect();
    });

    test("WTY30301_21", async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData("TY303/wty30301", "wty30301", "TC_02");

      // Init from WTZ01001
      await page.goto(`${baseUrl}/#/menu`, { waitUntil: "domcontentloaded" });

      // Inject IndexedDB data AFTER page loaded
      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData,
      });

      // Navigate to target URL
      await summaryPage.navigate();

      // Verify format of Output Date field
      const formattedDate = "YYYY/MM/DD";

      const isFormatCorrect =
        await summaryPage.checkFormatOutputDate(formattedDate);
      expect(isFormatCorrect).toBe(true);

      await snapExpect();
    });

    test("WTY30301_22", async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      // Step 1: Access WTY30301 screen
      await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
      await summaryPage.navigate();

      // Step 2 & 3: Check all input fields and verify they are empty
      const areAllFieldsEmpty = await summaryPage.checkAllInputFieldsEmpty();
      expect(areAllFieldsEmpty).toBe(true);

      await snapExpect();
    });

    test("WTY30301_23", async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      // Step 1: Access WTY30301 screen
      await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
      await summaryPage.navigate();

      const sizeInputDefaultValue = ""; // value default is empty
      const hasDefaultValues = await summaryPage.checkSizeInputHaveDefaultValue(
        sizeInputDefaultValue,
      );
      expect(hasDefaultValues).toBe(true);

      // Verify サイズ shows first default value and is editable
      const isSizeEditable = await summaryPage.checkSizeSelectEditable();
      expect(isSizeEditable).toBe(true);

      await snapExpect();
    });

    test("WTY30301_26", async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData("TY303/wty30301", "wty30301", "TC_02");

      // Navigate to WTY30301 screen
      await page.goto(baseUrl, { waitUntil: "domcontentloaded" });

      // Inject IndexedDB data AFTER page loaded
      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData,
      });

      await summaryPage.navigate();

      // Click 通常 button and verify
      const normalToggle = await summaryPage.findNormalToggle();
      await normalToggle.click();

      // expect shhnFlg value is "0" when click "通常
      const isNormalSelected = await summaryPage.checkSbnhFlgValue("0");
      expect(isNormalSelected).toBe(true);

      await snapInput();

      // Click 処分 button and verify
      const disposalToggle = await summaryPage.findDisposalToggle();
      await disposalToggle.click();

      // expect shhnFlg value is "1" when click "処分
      const isDisposalSelected = await summaryPage.checkSbnhFlgValue("1");
      expect(isDisposalSelected).toBe(true);

      await snapExpect();
    });

    test("WTY30301_27", async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      const testData = loadTestData("TY303/wty30301", "wty30301", "TC_03");

      // Navigate to WTY30301 screen
      await page.goto(baseUrl, { waitUntil: "domcontentloaded" });

      // Inject IndexedDB data AFTER page loaded
      await indexedDBHelper.initializeDB({
        sessionData: testData.sessionData,
        commonData: testData.commonData,
      });

      await summaryPage.navigate();

      // Click 処分品 button and verify
      const disposalToggle = await summaryPage.findDisposalToggle();
      await disposalToggle.click();

      // Click 展示処分 button and verify
      const disposalDisplayToggle =
        await summaryPage.findDisposalDisplayToggle();
      await disposalDisplayToggle.click();

      // expect dsgnKbn value is "D" when click 展示処分
      let isDisposalSelected = await summaryPage.checkDsgnKbnValue("D");
      expect(isDisposalSelected).toBe(true);

      // Click 在庫処分 button and verify
      const disposalInventoryToggle =
        await summaryPage.findDisposalInventoryToggle();
      await disposalInventoryToggle.click();

      // expect dsgnKbn value is "C" when click 在庫処分
      isDisposalSelected = await summaryPage.checkDsgnKbnValue("C");
      expect(isDisposalSelected).toBe(true);

      await snapExpect();
    });

    test("WTY30301_33", async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      // Step 1: Access WTY30301 screen
      await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
      await summaryPage.navigate();

      // Step 2 & 3: Check options in マルチコメント(Cmt_CombBox) and verify the list
      const expectedOptions = new Map([
        ["1", "ズバリ"],
        ["3", "インプロ"],
      ]);

      const optionsMatch =
        await summaryPage.checkMultiCommentOptions(expectedOptions);
      expect(optionsMatch).toBe(true);

      await snapExpect();
    });

    test("WTY30301_34~41", async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      // Access WTY30301 screen
      await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
      await summaryPage.navigate();

      const numberInputs = [
        'mockSuInput',
        'numberSheetsInput',
        'listedPriceInput',
        'finalSellingPriceInput',
      ] as const;

      let snapIndex = 1;
      for (const input of numberInputs) { 
        // Click Moc_TextBox (モック) and fill data
        const inputLocator = await summaryPage.findInputs(input);
        await inputLocator.click();

        await inputLocator.fill("12345678");
        await page.waitForTimeout(500);

        // Verify format no commas
        let isFormatCorrect = await summaryPage.checkFormatInputs(
          input,
          "NUMBER",
        );
        expect(isFormatCorrect).toBe(true);
        await snapInput(snapIndex);

        // Click outside (blur)
        await inputLocator.blur();

        // Verify format commas
        isFormatCorrect = await summaryPage.checkFormatInputs(
          input,
          "NUMBER_WITH_COMMA",
        );
        expect(isFormatCorrect).toBe(true);
        await snapExpect(snapIndex++);
        await inputLocator.fill("");
      }
    });

    test("WTY30301_42", async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      // Access WTY30301 screen
      await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
      await summaryPage.navigate();

      // Fill OutDate_TextBox with a value
      await summaryPage.fillOutputDate("20260215");
      await page.waitForTimeout(500);

      // Verify value is entered
      let outDateValue = await summaryPage.checkValueOutputDate("2026/02/15");
      expect(outDateValue).toBe(true);

      // Click the clear button (×)
      await summaryPage.clickClearOutputDateButton();
      await page.waitForTimeout(500);

      // Verify the value is cleared
      outDateValue = await summaryPage.checkValueOutputDate("");
      expect(outDateValue).toBe(true);

      await snapExpect();
    });
  
  test("WTY30301_43", async ({
      page,
      baseUrl,
      indexedDBHelper,
      snapInput,
      snapExpect,
    }) => {
      // Access WTY30301 screen
      await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
      await summaryPage.navigate();

      // Fill OutDate_TextBox with a value
      await summaryPage.fillMerchandiseCd("4957812587815");
      await page.waitForTimeout(500);

      // Verify value is entered
      let outDateValue = await summaryPage.checkValueMerchandiseCdInput("4957812587815");
      expect(outDateValue).toBe(true);

      // Click the clear button (×)
      await summaryPage.clickMerchandiseCdButton();
      await page.waitForTimeout(500);

      // Verify the value is cleared
      outDateValue = await summaryPage.checkValueMerchandiseCdInput("");
      expect(outDateValue).toBe(true);

      await snapExpect();
  });
   
});