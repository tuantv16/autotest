import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../base.page";

export interface WTY30301FormData {
    outputDateInput: string;
    merchandiseCdInput: string;
    multiCmmentInput: string;
    sizeInput: string;
    numberSheetsInput: string;
    listedPriceInput: string;
    finalSellingPriceInput: string;
}

export type WTY30301FormFieldKey = keyof WTY30301FormData;

export class TY30301Page extends BasePage {

    // Selectors
    private readonly selectorsTY30301 = {
        // Form fields
        outputDateInput: 'input[name="outYmd"]',
        merchandiseCdInput: '#shnCd',
        manufacturerInput: '#mkNm',
        classificationInput: '#mkNm',
        modelNumberInput: '#kata',
        saleKknInput: '#saleKkn',
        saleNmInput: '#saleNm',
        validInput: '#yukoZai',
        overCounterInput: '#tentZai',
        exhibitionInput: '#tenjiZai',
        mockSuMaeInput: '#mockSuMae',
        mockSuInput: '#mockSu',
        multiCmmentInput: '#cmtKbn',
        sizeInput: '#mpopSiz',
        numberSheetsInput: '#prtMsu',
        listedPriceInput: '#keisaiKk',
        finalSellingPriceInput: '#lbk',

        // Buttons text
        actionMenuButton: 'button.MuiButtonBase-root[aria-haspopup="true"]',
        clearButton: 'ul.MuiList-root:has-text("クリア")',
        deleteButton: 'ul.MuiList-root:has-text("削除")',
        listButton: 'ul.MuiList-root:has-text("一覧")',
        confirmButton: 'ul.MuiList-root:has-text("確定")',
        exitButton: 'ul.MuiList-root:has-text("終了")',
        searchButton: 'form button:has-text("検索")',

        // Toggle 
        normalToggle: 'label:has-text("通常")',
        disposalToggle: 'label:has-text("処分品")',

        // Buttons image
        clearMerchandiseCdInput: 'img[aria-label="clear"]',
        backButton: 'button.w-full.font-family.relative.flex.cursor-pointer.appearance-none.items-center.justify-center',

        // AG Grid
        agRows: '.ag-center-cols-container .ag-row',
        multiRowCellItem: '.multi-row-cell-item',
    };

    private readonly selectors = {
      // Form fields
      outputDateInput: 'input[name="outYmd"]',
      merchandiseCdInput: "#shnCd",
      manufacturerInput: "#mkNm",
      classificationInput: "#mkNm",
      modelNumberInput: "#kata",
      saleKknInput: "#saleKkn",
      saleNmInput: "#saleNm",
      validInput: "#yukoZai",
      overCounterInput: "#tentZai",
      exhibitionInput: "#tenjiZai",
      mockSuMaeInput: "#mockSuMae",
      mockSuInput: "#mockSu",
      multiCmmentInput: "#cmtKbn",
      sizeInput: "#mpopSiz",
      numberSheetsInput: "#prtMsu",
      listedPriceInput: "#keisaiKk",
      finalSellingPriceInput: "#lbk",
      sbnhFlgInput: 'input[type="radio"][name="sbnhFlg"]:checked',
      dsgnKbnInput: 'input[type="radio"][name="dsgnKbn"]:checked',

      // Buttons text
      actionMenuButton: 'button.MuiButtonBase-root[aria-haspopup="true"]',
      clearButton: 'button:has-text("クリア")',
      deleteButton: 'ul.MuiList-root:has-text("削除")',
      listButton: 'ul.MuiList-root:has-text("一覧")',
      confirmButton: 'button:has-text("確定")',
      exitButton: 'ul.MuiList-root:has-text("終了")',
      searchButton: 'button:has-text("検索")',

      // Toggle
      normalToggle: 'label:has-text("通常")',
      disposalToggle: 'label:has-text("処分品")',
      disposalDisplayToggle: 'label:has-text("展示処分")',
      disposalInventoryToggle: 'label:has-text("在庫処分")',

      // Buttons image
      clearMerchandiseCdInput: 'img[aria-label="clear"]',
      clearOutputDateButton: 'div span[data-testid="ClearButtonIcon"]',

      // pop up
      errorDialog: '#wty30301-error-dialog',
    };

    private readonly formFieldGetters: Record<
        WTY30301FormFieldKey,
        () => Promise<string>
    > = {
            outputDateInput: async () =>
                this.page.locator(this.selectorsTY30301.outputDateInput).inputValue(),

            merchandiseCdInput: async () =>
                this.page.locator(this.selectorsTY30301.merchandiseCdInput).inputValue(),

            multiCmmentInput: async () =>
                this.getTextOrEmpty(this.page.locator(this.selectorsTY30301.multiCmmentInput)),

            sizeInput: async () =>
                this.getTextOrEmpty(this.page.locator(this.selectorsTY30301.sizeInput)),

            numberSheetsInput: async () =>
                this.page.locator(this.selectorsTY30301.numberSheetsInput).inputValue(),

            listedPriceInput: async () =>
                this.page.locator(this.selectorsTY30301.listedPriceInput).inputValue(),

            finalSellingPriceInput: async () =>
                this.page.locator(this.selectorsTY30301.finalSellingPriceInput).inputValue(),
        };

    private readonly formFieldFillers: Record<
        WTY30301FormFieldKey,
        (value: string) => Promise<void>
    > = {
            outputDateInput: async (value) =>
                this.fillOutputDate(value),

            merchandiseCdInput: async (value) =>
                this.fillMerchandiseCd(value),

            multiCmmentInput: async (value) =>
                this.fillMultiCmment(value),

            sizeInput: async (value) =>
                this.fillSize(value),

            numberSheetsInput: async (value) =>
                this.fillNumberSheets(value),

            listedPriceInput: async (value) =>
                this.fillListedPrice(value),

            finalSellingPriceInput: async (value) =>
                this.fillFinalSellingPrice(value),
        };

    private async getTextOrEmpty(locator: Locator): Promise<string> {
        return (await locator.textContent())?.trim() ?? '';
    }

    constructor(page: Page) {
        super(page);
    }

    /**
     * Navigate to WTY30301 Sales In Advance Correction screen
     */
    async navigate(pilotKey: string = 'prod'): Promise<void> {
        const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTY30301SalesInAdvanceCorrection?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
        await this.goto(url);
        await this.page.waitForTimeout(1000);
    }

    /**
     * Navigate to WTY30303 Sales In Advance Correction screen
     */
    async navigateSale(pilotKey: string = 'prod'): Promise<void> {
        const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTY30303SaleSelection?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
        await this.goto(url);
        await this.page.waitForTimeout(1000);
    }

    async urlScreenList(): Promise<string> {
        return '#/WTY30302MultiPopOutputInstructionList';
    }

    /**
     * Click confirm button (確定) - uses parent class implementation
     */
    async clickConfirm(): Promise<void> {
        await super.clickConfirm(this.selectorsTY30301.actionMenuButton, '確定');
    }

    /**
     * Click Clear (クリア) from action menu (MUI Menu)
     */
    async clickClear(): Promise<void> {
        await this.clickButtonInMenuButton('クリア');
    }

    /**
     * Click List (一覧) from action menu (MUI Menu)
     */
    async clickList(): Promise<void> {
        await this.clickButtonInMenuButton('一覧');
    }

    /**
   * Find Clear button locator
   */
  async findClearButton(): Promise<Locator> {
    const clearButton = this.page.locator(this.selectors.clearButton);
    await this.waitForVisible(clearButton, 2000);
    return clearButton;
  }

    /**
     * Find Delete button locator
     */
    async findDeleteButton(): Promise<Locator> {
        const deleteButton = this.page.locator(this.selectors.deleteButton);
        await this.waitForVisible(deleteButton, 5000);
        return deleteButton;
    }

    /**
     * Find List button locator
     */
    async findListButton(): Promise<Locator> {
        const listButton = this.page.locator(this.selectorsTY30301.listButton);
        await this.waitForVisible(listButton, 5000);
        return listButton;
    }

    /**
     * Find Confirm button locator
     */
    async findConfirmButton(): Promise<Locator> {
      const confirmButton = this.page.locator(this.selectors.confirmButton);
      await this.waitForVisible(confirmButton, 2000);
      return confirmButton;
    }

    /**
     * Find Normal toggle locator
     */
    async findNormalToggle(): Promise<Locator> {
        const normalToggle = this.page.locator(this.selectorsTY30301.normalToggle);
        await this.waitForVisible(normalToggle);
        return normalToggle;
    }

    /**
     * Find Disposal toggle locator
     */
    async findDisposalToggle(): Promise<Locator> {
        const disposalToggle = this.page.locator(this.selectorsTY30301.disposalToggle);
        await this.waitForVisible(disposalToggle);
        return disposalToggle;
    }

    /**
     * Fill output date
     */
    async fillOutputDate(value: string): Promise<void> {
        const locator = this.page.locator(this.selectorsTY30301.outputDateInput);
        await this.waitForVisible(locator, 20000);
        await this.fillInput(locator, value);
    }

    /**
     * Fill merchandise code
     */
    async fillMerchandiseCd(value: string): Promise<void> {
        const locator = this.page.locator(this.selectorsTY30301.merchandiseCdInput);
        await this.waitForVisible(locator, 20000);
        await this.fillInput(locator, value);
    }

    /**
     * Fill merchandise code
     */
    async fillMultiCmment(value: string): Promise<void> {
        const locator = this.page.locator(this.selectorsTY30301.multiCmmentInput);
        await this.waitForVisible(locator, 20000);
        await this.selectMuiSelect(locator, value);
    }

    /**
     * Fill size
     */
    async fillSize(value: string): Promise<void> {
        const locator = this.page.locator(this.selectorsTY30301.sizeInput);
        await this.waitForVisible(locator, 20000);
        await this.selectMuiSelect(locator, value);
    }

    /**
     * Fill number of sheets
     */
    async fillNumberSheets(value: string): Promise<void> {
        const locator = this.page.locator(this.selectorsTY30301.numberSheetsInput);
        await this.waitForVisible(locator, 20000);
        await this.fillInput(locator, value);
    }

    /**
     * Fill listed price
     */
    async fillListedPrice(value: string): Promise<void> {
        const locator = this.page.locator(this.selectorsTY30301.listedPriceInput);
        await this.waitForVisible(locator, 20000);
        await this.fillInput(locator, value);
    }

    /**
     * Fill final selling price
     */
    async fillFinalSellingPrice(value: string): Promise<void> {
        const locator = this.page.locator(this.selectorsTY30301.finalSellingPriceInput);
        await this.waitForVisible(locator, 20000);
        await this.fillInput(locator, value);
    }

    /**
     * Fill form dynamically (only provided fields)
     */
    async fillForm(
        formData: Partial<WTY30301FormData>
    ): Promise<void> {
        for (const key of Object.keys(formData) as WTY30301FormFieldKey[]) {
            const value = formData[key];
            if (value == null) continue;

            const filler = this.formFieldFillers[key];

            if (!filler) {
                throw new Error(`No filler defined for field: ${key}`);
            }

            await filler(value);
        }
    }

    /**
     * Wait for form to be ready
     */
    async waitForFormReady(): Promise<void> {
        await this.page.waitForSelector(this.selectorsTY30301.outputDateInput, {
            state: 'visible',
            timeout: 10000,
        });
    }

    /**
     * Get form values (snapshot)
     * @param fields fields to get (optional)
     */
    async getFormValues(
        fields?: WTY30301FormFieldKey[]
    ): Promise<Partial<WTY30301FormData>> {

        const keys =
            fields ?? (Object.keys(this.formFieldGetters) as WTY30301FormFieldKey[]);

        const result: Partial<WTY30301FormData> = {};

        for (const key of keys) {
            result[key] = await this.formFieldGetters[key]();
        }

        return result;
    }

    /**
     * Verify form values equal to expected snapshot
     */
    async verifyFormEquals(
        expected: Partial<WTY30301FormData>
    ): Promise<void> {

        for (const [key, value] of Object.entries(expected)) {
            if (value === undefined) continue;

            const field = key as WTY30301FormFieldKey;
            const locator = this.page.locator(this.selectorsTY30301[field]);

            // MUI Select
            if (field === 'multiCmmentInput' || field === 'sizeInput') {
                await expect(locator).toHaveText(value);
            } else {
                await expect(locator).toHaveValue(value);
            }
        }
    }

    /**     
     * Click clear merchandise code button (image button)
     */
    async clickMerchandiseCdButton(): Promise<void> {
        const locator = this.page.locator(this.selectorsTY30301.clearMerchandiseCdInput);
        await this.waitForVisible(locator, 20000);
        await locator.click();
    }

    /**
     * Get AG-Grid row by index (0-based)
     *
     * @param rowIndex Index of the row (0-based)
     * @returns Locator of the row
     */
    getRowByIndex(rowIndex: number): Locator {
        return this.page
            .locator(this.selectorsTY30301.agRows)
            .nth(rowIndex);
    }

    /**
     * Click footer clear button (e.g., クリア)
     */
    async clickFooterClear(buttonText: string = 'クリア'): Promise<void> {
        const button = this.page.locator(`div.fixed.bottom-0 button:has-text("${buttonText}")`).first();
        await this.waitForVisible(button, 10000);
        await this.clickWithRetry(button);
        await this.page.waitForTimeout(1000);
    }

    /**
     * Click footer confirm button (e.g., 確定)
     */
    async clickFooterConfirm(buttonText: string = '確定'): Promise<void> {
        const button = this.page.locator(`div.fixed.bottom-0 button:has-text("${buttonText}")`).first();
        await this.waitForVisible(button, 10000);
        await this.clickWithRetry(button);
        await this.page.waitForTimeout(1000);
    }

    async clickSearchButton(): Promise<void> {
        const locator = this.page.locator(this.selectorsTY30301.searchButton);
        await this.clickWithRetry(locator);
        await this.page.waitForTimeout(2000);
    }

    /**
     * Expect the input (by name attribute) to be formatted with thousand separators.
     * Usage: await pageObject.expectThousandSeparated('keisaiKk')
     * Rules: optional leading '-' allowed, integer part must be either 1-3 digits or groups like 1,234 or 12,345,678
     * Decimal part is allowed (e.g., 1,234.56)
     */
    async expectThousandSeparated(name: string): Promise<void> {
        if (!name) throw new Error('Input name is required')
        const locator = this.page.locator(`[name="${name}"]`)
        await this.waitForVisible(locator)

        // Ensure the element is scrolled into view (important for mobile viewport)
        try {
            await locator.scrollIntoViewIfNeeded()
            await this.page.waitForTimeout(300)
        } catch {
            // ignore if scrollIntoViewIfNeeded not supported
        }

        const raw = (await locator.inputValue?.()) ?? (await locator.textContent()) ?? ''
        const v = String(raw).trim()

        // Regex: optional leading '-', integer part with comma groups, optional decimal part
        const re = /^-?\d{1,3}(?:,\d{3})*(?:\.\d+)?$/
        const ok = re.test(v)


        // Provide clearer failure message when assertion fails
        if (!ok) {
            throw new Error(`Value for input[name="${name}"] is not thousand-separated: "${v}"`)
        }
    }

    /**
     * Make sure the footer buttons are visible.
     * @param buttonText ボタン表示文言
     */
    async verifyFooterButtonVisible(buttonText: string): Promise<void> {
        const button = this.page.locator(
            `div.fixed.bottom-0 button:has-text("${buttonText}")`
        );

        await expect(button).toBeVisible();
        await expect(button).toBeEnabled();
    }

    /**
     * Check if back button is visible on the header
     */
    async isBackButtonVisible(): Promise<boolean> {
        const backButton = this.page
            .locator(this.selectorsTY30301.backButton)
            .first();

        return await backButton
            .isVisible({ timeout: 10000 })
            .catch(() => false);
    }
  
  
    /**
     * check Clear button enabled and visible
     * @returns
     */
    async checkClearButton(): Promise<boolean> {
      const clearButton = await this.findClearButton();
      const isEnabled = await clearButton.isEnabled();
      const isVisible = await clearButton.isVisible();
      return isEnabled && isVisible;
    }

    /**
     * check Confirm button enabled and visible
     * @returns
     */
    async checkConfirmButton(): Promise<boolean> {
      const confirmButton = await this.findConfirmButton();
      const isEnabled = await confirmButton.isEnabled();
      const isVisible = await confirmButton.isVisible();
      return isEnabled && isVisible;
    }
    
    /**
     * check Delete button enabled and visible
     * @returns
     */
    async checkDeleteButton(): Promise<boolean> {
      const deleteButton = await this.findDeleteButton();
      const isEnabled = await deleteButton.isEnabled();
      const isVisible = await deleteButton.isVisible();
      return isEnabled && isVisible;
    }
    
    /**
     * check List button enabled and visible
     * @returns
     */
    async checkListButton(): Promise<boolean> {
      const listButton = await this.findListButton();
      const isEnabled = await listButton.isEnabled();
      const isVisible = await listButton.isVisible();
      return isEnabled && isVisible;
    }

    /**
     * check value of Output Date field
     * @param value
     * @returns
     */
    async checkValueOutputDate(value: string): Promise<boolean> {
      const locator = this.page.locator(this.selectors.outputDateInput);
      await this.waitForVisible(locator, 1000);
      const currentValue = await locator.inputValue();
      return currentValue === value;
    }
    
    /**
     * check format of Output Date field
     * @param expectedFormat
     * @returns
     */
    async checkFormatOutputDate(expectedFormat: string): Promise<boolean> {
      const locator = this.page.locator(this.selectors.outputDateInput);
      const currentValue = await locator.inputValue();

      // Convert format string to regex
      const formatRegexMap: Record<string, string> = {
        YYYY: "\\d{4}",
        MM: "\\d{2}",
        DD: "\\d{2}",
      };

      let regexPattern = expectedFormat;
      Object.entries(formatRegexMap).forEach(([key, value]) => {
        regexPattern = regexPattern.replace(key, value);
      });

      const regex = new RegExp(`^${regexPattern}$`);

      return regex.test(currentValue);
    }

    async checkAllInputFieldsEmpty(): Promise<boolean> {
        const inputFields: WTY30301FormFieldKey[] = [
          "merchandiseCdInput",
          "numberSheetsInput",
          "listedPriceInput",
          "finalSellingPriceInput",
        ];
    
        const selectFields: WTY30301FormFieldKey[] = [
          "multiCmmentInput",
          "sizeInput",
        ];
    
        // Check regular input fields
        for (const field of inputFields) {
          const locator = this.page.locator(this.selectors[field]);
          await this.waitForVisible(locator, 1000);
          const value = await locator.inputValue();
          if (value !== "") {
            return false; // Found a non-empty field
          }
        }
    
        // Check MUI Select fields (get text instead of input value)
        for (const field of selectFields) {
          const locator = this.page.locator(this.selectors[field]);
          await this.waitForVisible(locator, 1000);
          const value = await this.getTextOrEmpty(locator);
          if (value !== "") {
            return false; // Found a non-empty field
          }
        }
    
        return true; // All fields are empty
    }
    
    /**
     * Check if select boxes have default values initialized
     */
    async checkSizeInputHaveDefaultValue(value: string): Promise<boolean> {
      const locator = this.page.locator(this.selectors.sizeInput);
      locator.scrollIntoViewIfNeeded();
      await this.waitForVisible(locator, 1000);
      const valueDefault = await this.getTextOrEmpty(locator);
      if (value !== valueDefault) {
        return false;
      }

      return true;
    }

    /**
     * Check if サイズ (Size) select box is editable
     */
    async checkSizeSelectEditable(): Promise<boolean> {
      const locator = this.page.locator(this.selectors.sizeInput);
      await this.waitForVisible(locator, 1000);

      // Check if the select is enabled/editable
      const isEnabled = await locator.isEnabled();

      return isEnabled;
    }
    
    /**
     * check sbnhFlg radio button value
     * @param value
     * @returns
     */
    async checkSbnhFlgValue(value: string): Promise<boolean> {
      const checkedRadio = this.page.locator(this.selectors.sbnhFlgInput);
      const currentValue = await checkedRadio.getAttribute("value");

      return currentValue === value;
    }
    
    /**
     * Find Disposal Display toggle locator
     */
    async findDisposalDisplayToggle(): Promise<Locator> {
      const disposalDisplayToggle = this.page.locator(
        this.selectors.disposalDisplayToggle,
      );
      await this.waitForVisible(disposalDisplayToggle, 500);
      return disposalDisplayToggle;
    }
    
    /**
     * check dsgnKbn radio button value
     * @param value
     * @returns
     */
    async checkDsgnKbnValue(value: string): Promise<boolean> {
      const checkedRadio = this.page.locator(this.selectors.dsgnKbnInput);
      const currentValue = await checkedRadio.getAttribute("value");

      return currentValue === value;
    }
    
    /**
     * Find Disposal Inventory toggle locator
     */
    async findDisposalInventoryToggle(): Promise<Locator> {
      const disposalInventoryToggle = this.page.locator(
        this.selectors.disposalInventoryToggle,
      );
      await this.waitForVisible(disposalInventoryToggle, 500);
      return disposalInventoryToggle;
    }
    
    /**
     * Check if マルチコメント (Multi Comment) combo box has expected options
     */
    async checkMultiCommentOptions(
      expectedOptions: Map<string, string>,
    ): Promise<boolean> {
      const locator = this.page.locator(this.selectors.multiCmmentInput);
      locator.scrollIntoViewIfNeeded();

      await this.waitForVisible(locator, 1000);

      // Click to open the dropdown
      await locator.click();
      await this.page.waitForTimeout(500);

      // Get all options from the MUI menu
      const optionLocators = this.page.locator("ul li.MuiButtonBase-root");
      const optionCount = await optionLocators.count();

      // Collect all option texts
      const actualOptions: Map<string, string> = new Map();
      for (let i = 0; i < optionCount; i++) {
        const text = await optionLocators.nth(i).textContent();
        const value = await optionLocators.nth(i).getAttribute("data-value");
        if (value) {
          actualOptions.set(value, text?.trim() || "");
        }
      }

      // Close the dropdown by pressing Escape
      await this.page.keyboard.press("Escape");
      await this.page.waitForTimeout(300);

      for (const [key, value] of expectedOptions.entries()) {
        if (actualOptions.get(key) !== value) {
          return false;
        }
      }

      return true;
    }
    
    async findInputs(input: keyof typeof this.selectors): Promise<Locator> {
      const inputLocator = this.page.locator(this.selectors[input]);
      await this.waitForVisible(inputLocator, 500);
      return inputLocator;
    }

    async checkFormatInputs(
      inputField: keyof typeof this.selectors,
      expectedFormat: "NUMBER" | "NUMBER_WITH_COMMA",
    ): Promise<boolean> {
      const locator = this.page.locator(this.selectors[inputField]);
      const currentValue = await locator.inputValue();

      let regex: RegExp;

      switch (expectedFormat) {
        case "NUMBER_WITH_COMMA":
          regex = /^(0|[1-9]\d{0,2}(,\d{3})*)$/;
          break;

        case "NUMBER":
        default:
          regex = /^(0|[1-9]\d*)$/;
          break;
      }

      return regex.test(currentValue);
    }

    /**
     * Click clear output date button
     */
    async clickClearOutputDateButton(): Promise<void> {
      const locator = this.page.locator(this.selectors.clearOutputDateButton);
      await this.waitForVisible(locator, 5000);
      await locator.click();
    }
    
    async checkValueMerchandiseCdInput(value: string): Promise<boolean> {
      const locator = this.page.locator(this.selectors.merchandiseCdInput);
      await this.waitForVisible(locator, 1000);
      const currentValue = await locator.inputValue();
      return currentValue === value;
    }
    
    /**
     * Click Search button
     */
    async clickButtonSearch(): Promise<void> { 
      const locator = this.page.locator(this.selectors.searchButton);
      await this.waitForVisible(locator, 1000);
      await locator.click();
    }
    
    /**
     * check validate error message
     * @param expectedMessage 
     * @param expectedMessageId 
     * @returns 
     */
    async checkValidateErrorMessage(expectedMessage: string, expectedMessageId?: string): Promise<boolean> {
      const errorDialog = this.page.locator(
        this.selectors.errorDialog,
      );
      await this.waitForVisible(errorDialog, 5000);
      
      // Get text content from <p> tag inside error dialog, excluding button text
      const messageElement = errorDialog.locator('p');
      const actualMessage = await messageElement.textContent();

      const message = expectedMessageId ? `${expectedMessage}\n${expectedMessageId}` : expectedMessage;
      return actualMessage?.trim() === message;
    }
      
    /**
     * Close error dialog by clicking OK button
     */
    async closeErrorDialog(): Promise<void> {
      const errorDialog = this.page.locator(
        this.selectors.errorDialog,
      );
      const closeButton = errorDialog.locator('button:has-text("OK")');
      await closeButton.click();
    }

    /**
     * Check if product images are hidden (no src or empty src)
     * @returns true if all images are hidden/cleared
     */
    async checkImagesCleared(): Promise<boolean> {
      const images = this.page.locator('img[alt*="Sale Logo"]');
      const imageCount = await images.count();
      
      if (imageCount === 0) {
        return true; // No images found, considered as cleared
      }

      return false;
    }

    /**
     * Check if TaxInfoMsg_Label has class "d-none" (hidden)
     * @returns true if TaxInfoMsg_Label has d-none class
     */
    async checkTaxInfoHidden(): Promise<boolean> {
      const taxInfoLabel = this.page.locator('div', { hasText: '税率' });
      const count = await taxInfoLabel.count();
      
      if (count === 0) {
        return true; // Element not found, considered as hidden
      }

      const className = await taxInfoLabel.first().getAttribute('class');
      return className?.includes('d-none') ?? false;
    }

    /**
     * Check if edit mode is disabled and fields are enabled
     * @returns true if wty303.editMode is false and fields are enabled
     */
    async checkEditModeReset(): Promise<boolean> {
      // Check editMode in window object
      const editMode = await this.page.evaluate(() => {
        return (window as any).wty303?.editMode ?? false;
      });

      if (editMode !== false) {
        return false;
      }

      // Check if key input fields are enabled
      const fieldsToCheck = [
        this.selectors.merchandiseCdInput,
        this.selectors.multiCmmentInput,
        this.selectors.sizeInput,
      ];

      for (const selector of fieldsToCheck) {
        const field = this.page.locator(selector).first();
        const isDisabled = await field.isDisabled().catch(() => true);
        if (isDisabled) {
          return false; // Field is still disabled
        }
      }

      return true;
    }

    /**
     * Check if all items with red background/highlight are cleared
     * @returns true if no red highlights exist
     */
    async checkRedHighlightsCleared(): Promise<boolean> {
      // Check for elements with red background colors
      const redBackgroundSelectors = [
        '[style*="background-color: rgb(255, 0, 0)"]',
        '[style*="background-color:#ff0000"]',
        '[style*="background: rgb(255, 0, 0)"]',
        '[style*="background:#ff0000"]',
        '.bg-red-500',
        '.bg-red-600',
        '[class*="error-highlight"]',
      ];

      for (const selector of redBackgroundSelectors) {
        const elements = this.page.locator(selector);
        const count = await elements.count();
        if (count > 0) {
          // Check if any are visible
          for (let i = 0; i < count; i++) {
            const isVisible = await elements.nth(i).isVisible().catch(() => false);
            if (isVisible) {
              return false;
            }
          }
        }
      }

      // Also check computed background color for common item containers
      const itemContainers = this.page.locator('[class*="item"], [class*="row"], .ag-row');
      const containerCount = await itemContainers.count();
      
      for (let i = 0; i < Math.min(containerCount, 20); i++) {
        const bgColor = await itemContainers.nth(i).evaluate((el) => {
          return window.getComputedStyle(el).backgroundColor;
        }).catch(() => '');

        // Check if background color is red (rgb format)
        if (bgColor && (
          bgColor.includes('rgb(255, 0, 0)') || 
          bgColor.includes('rgb(255,0,0)') ||
          bgColor.includes('rgba(255, 0, 0')
        )) {
          return false;
        }
      }

      return true;
    }
  
    async scrollToStartView(): Promise<void> {
      await this.page.evaluate(() => {
        window.scrollTo(0, 0);
      });
      await this.page.waitForTimeout(500);
    }
  
    async scrollToEndView(): Promise<void> {
      await this.page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      await this.page.waitForTimeout(500);
    }
}