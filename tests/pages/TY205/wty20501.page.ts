/**
 * WTY20501 Summary Input Page Object
 * Page Object for 摘要欄入力 screen
 */

import { Page, Locator } from "@playwright/test";
import { BasePage } from "../base.page";

export interface WTY20501FormData {
  customerNameKanji: string;
  customerNameKana: string;
  deliveryDate: string;
  summaryText: string;
}

export class TY2050Page extends BasePage {
  // Form field names (for POM pattern)
  public readonly fieldNames = {
    customerNameKanji: "kokKnj",
    customerNameKana: "kokKn",
    honorific: "keishoKbn",
    paymentMethod: "shHou",
    deliveryDate: "nnyOtdkYoteiDate",
    summary: "tkyRn",
  };

  // Selectors
  public readonly selectors = {
    errorClass: '_error_cbu4e_24',
    // Form fields
    customerNameKanji: "#kokKnj",
    customerNameKana: "#kokKn",
    honorificRadio: (value: string | number) =>
  `input[type="radio"][name="keishoKbn"][value="${value}"]`,
    paymentMethodRadio: (value: string | number) =>
  `input[type="radio"][name="shHou"][value="${value}"]`,
    deliveryDateInput: 'input[name="nnyOtdkYoteiDate"]',
    summaryTextarea: "#tkyRn",

    keishoKbnHidden: 'input[type="radio"][name="keishoKbn"]',
    shHouHidden: 'input[type="radio"][name="shHou"]',
    // Buttons
    actionMenuButton: 'button:has-text("確定")',
    confirmButton: 'button:has-text("確定")',
    clearButton: 'button:has-text("クリア")',

    // Messages
    staffCode: ".text-xs.text-gray-500.text-right",
    errorDialog: "#wty20501-error-dialog",
    headingTitle:
      '.text-heading-h5:has-text("摘要欄入力"), .text-heading-h6:has-text("摘要欄入力")',
  };

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to WTY20501 Summary Input screen
   */
  async navigate(pilotKey: string = "prod"): Promise<void> {
    const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTY20501SummaryInput?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
    await this.goto(url);
    await this.page.waitForTimeout(1000);
  }

  /**
   * Fill entire form
   */
  async fillForm(formData: WTY20501FormData): Promise<void> {
    await this.fillCustomerNameKanji(formData.customerNameKanji);
    await this.fillCustomerNameKana(formData.customerNameKana);
    await this.fillDeliveryDate(formData.deliveryDate);
    await this.fillSummary(formData.summaryText);
  }

  async fillFormEmptyDate(formData: WTY20501FormData): Promise<void> {
    await this.fillCustomerNameKanji(formData.customerNameKanji);
    await this.fillCustomerNameKana(formData.customerNameKana);
    await this.selectHonorific(2);
    await this.selectPaymentMethod(2);
    await this.fillSummary(formData.summaryText);
  }
  /**
   * Fill customer name (Kanji)
   */
  async fillCustomerNameKanji(value: string): Promise<void> {
    const locator = this.page.locator(this.selectors.customerNameKanji);
    await this.waitForVisible(locator, 20000);
    await this.fillInput(locator, value);
  }

  /**
   * Fill customer name (Kana)
   */
  async fillCustomerNameKana(value: string): Promise<void> {
    const locator = this.page.locator(this.selectors.customerNameKana);
    await this.waitForVisible(locator);
    await this.fillInput(locator, value);
  }

  /**
   * Select honorific by text label or value
   * @param option Text label ("様", "御中") or value ("1", "2", 1, 2
   */
  async selectHonorific(option: string | number): Promise<void> {
    const name = this.fieldNames.honorific;
    let labelLocator: Locator;

    // Check if option is a text label (様, 御中)
    if (typeof option === 'string') {
      // Find label containing span with the text
      labelLocator = this.page.locator(`label:has(span:has-text("${option}")):has(input[name="${name}"])`);
    } else {
      // Option is a value (1, 2, "1", "2")
      const value = String(option);
      // Find label containing input with the value
      labelLocator = this.page.locator(`label:has(input[type="radio"][name="${name}"][value="${value}"])`);
    }

    await this.waitForVisible(labelLocator, 10000);
    
    // Check if already selected by checking the radio input inside
    const radioInput = labelLocator.locator(`input[type="radio"][name="${name}"]`);
    const isChecked = await radioInput.isChecked().catch(() => false);
    
    if (!isChecked) {
      await this.clickWithRetry(labelLocator);
    }
  }

  /**
   * Select payment method by text label or value
   * @param option Text label ("現金", "振込") or value ("1", "2", 1, 2)
   */
  async selectPaymentMethod(option: string | number): Promise<void> {
    const name = this.fieldNames.paymentMethod;
    let labelLocator: Locator;

    // Check if option is a text label (現金, 振込)
    if (typeof option === 'string') {
      // Find label containing span with the text
      labelLocator = this.page.locator(`label:has(span:has-text("${option}")):has(input[name="${name}"])`);
    } else {
      // Option is a value (1, 2, "1", "2")
      const value = String(option);
      // Find label containing input with the value
      labelLocator = this.page.locator(`label:has(input[type="radio"][name="${name}"][value="${value}"])`);
    }

    await this.waitForVisible(labelLocator, 10000);
    
    // Check if already selected by checking the radio input inside
    const radioInput = labelLocator.locator(`input[type="radio"][name="${name}"]`);
    const isChecked = await radioInput.isChecked().catch(() => false);
    
    if (!isChecked) {
      await this.clickWithRetry(labelLocator);
    }
  }
  /**
   * Fill delivery date
   */
  async fillDeliveryDate(value: string): Promise<void> {
    const locator = this.page.locator(this.selectors.deliveryDateInput);
    await this.waitForVisible(locator);
    await this.fillInput(locator, value);
  }

  /**
   * Fill summary textarea
   */
  async fillSummary(value: string): Promise<void> {
    const locator = this.page.locator(this.selectors.summaryTextarea);
    await this.waitForVisible(locator);
    await this.fillInput(locator, value, 30); // Slower delay for textarea
  }

  /**
   * Click confirm button (確定) - direct button click
   */
  async clickConfirm(): Promise<void> {
    const locator = this.page.locator(this.selectors.confirmButton);
    await this.waitForVisible(locator);
    await this.clickWithRetry(locator);
    await this.page.waitForTimeout(1000);
  }

  /**
   * Click clear button (クリア) - direct button click
   */
  async clickClear(): Promise<void> {
    const locator = this.page.locator(this.selectors.clearButton);
    await this.waitForVisible(locator);
    await this.clickWithRetry(locator);
    await this.page.waitForTimeout(500);
  }

  /**
   * Get staff code display
   */
  async getStaffCode(): Promise<string> {
    const locator = this.page.locator(this.selectors.staffCode);
    const text = await locator.textContent();
    return text?.replace("担：", "") || "";
  }

  /**
   * Check if error dialog is visible
   */
  async isErrorDialogVisible(): Promise<boolean> {
    return await super.isErrorDialogVisible("wty20501-error-dialog");
  }

  /**
   * Get error dialog message
   */
  async getErrorMessage(): Promise<string> {
    const dialog = this.page.locator(this.selectors.errorDialog);
    if (await dialog.isVisible({ timeout: 2000 }).catch(() => false)) {
      return (await dialog.textContent()) || "";
    }
    return "";
  }

  /**
   * Dismiss error dialog
   */
  async dismissErrorDialog(): Promise<void> {
    await super.dismissErrorDialog("wty20501-error-dialog");
  }

  /**
   * Wait for form to be ready
   */
  async waitForFormReady(): Promise<void> {
    await this.page.waitForSelector(this.selectors.customerNameKanji, {
      state: "visible",
      timeout: 10000,
    });
  }

  async isHeadingTitleVisible(): Promise<boolean> {
    const locator = this.page.locator(this.selectors.headingTitle);
    return await locator.isVisible({ timeout: 10000 }).catch(() => false);
  }

  async isCheckedKeishoKbn(labelText: string): Promise<boolean> {
    const radio = this.page
      .locator("label")
      .filter({ has: this.page.locator(`span:has-text("${labelText}")`) })
      .locator(this.selectors.keishoKbnHidden);

    await radio.first().waitFor({ state: "attached", timeout: 10000 });

    return await radio.first().isChecked();
  }

  async isCheckedShHou(labelText: string): Promise<boolean> {
    const radio = this.page
      .locator("label")
      .filter({ has: this.page.locator(`span:has-text("${labelText}")`) })
      .locator(this.selectors.shHouHidden);

    await radio.first().waitFor({ state: "attached", timeout: 10000 });

    return await radio.first().isChecked();
  }

  async isTextVisible(text: string, exact: boolean = true): Promise<boolean> {
    console.log(`[TEST] Verifying text "${text}" is visible: ${exact}`);
    const locator = this.page.getByText(text, { exact });
    return await locator
      .first()
      .isVisible({ timeout: 10000 })
      .catch(() => false);
  }

  async isInputDisabledByName(name: String): Promise<boolean> {
    const locator = this.page.locator(`input[name="${name}"]`);
    return await locator.isDisabled({ timeout: 10000 }).catch(() => false);
  }

  async isTextareaDisabledByName(name: String): Promise<boolean> {
    const locator = this.page.locator(`textarea[name="${name}"]`);
    return await locator.isDisabled({ timeout: 10000 }).catch(() => false);
  }

  async inputCustomerNameKanji(value: string): Promise<void> {
    await this.fillCustomerNameKanji(value);
  }

  async getCustomerNameKanji(): Promise<string> {
    const locator = this.page.locator(this.selectors.customerNameKanji);
    const actualInput = (await locator.inputValue()) || "";
    return actualInput;
  }

  async inputCustomerNameKana(value: string): Promise<void> {
    await this.fillCustomerNameKana(value);
  }

  async verifyInputValue(
    expectedStandard: string,
    maxlength: number,
    actualInput: string
  ): Promise<boolean> {
    console.log(`[TEST] Verifying input value. Expected: "${expectedStandard}", Actual: "${actualInput}", Maxlength: ${maxlength}`);    
    return expectedStandard === actualInput && actualInput.length === maxlength;
  }

  async blurCustomerNameKanji(): Promise<void> {
    await this.blurInputById(this.fieldNames.customerNameKanji);
  }
     
  async focusCustomerNameKanji(): Promise<void> {
    const locator = this.page.locator(this.selectors.customerNameKanji);
    await this.waitForVisible(locator, 2000);
    await locator.click({ timeout: 2000 });
  }

  async getCustomerNameKana(): Promise<string> {
    return await this.getValueById(this.fieldNames.customerNameKana);
  }

  async inputAbstractColumn(value: string): Promise<void> {
    await this.fillSummary(value);
  }
  
  async blurCustomerNameKana(): Promise<void> {
    await this.blurInputById(this.fieldNames.customerNameKana);
  }

  async focusCustomerNameKana(): Promise<void> {
    const locator = this.page.locator(this.selectors.customerNameKana);
    await this.waitForVisible(locator, 2000);
    await locator.click({ timeout: 2000 });
  }

  async isInputRadioDisabled(name: string): Promise<boolean> {
    const input = this.page.locator(`input[name="${name}"]`).first();
    const blockDiv = input.locator('xpath=ancestor::div[contains(@class,"mb-3")][1]');
  
    const optionsDiv = blockDiv.locator('xpath=./div[1]');
  
    const optionLabel = optionsDiv.locator(
      `label:has(input[name="${name}"]:checked)`
    );
  
    const targetLabel = (await optionLabel.count())
      ? optionLabel.first()
      : optionsDiv.locator(`label:has(input[name="${name}"])`).first();
  
    const hasBgWhite = await targetLabel.evaluate(el => el.classList.contains('bg-white'));
    return !hasBgWhite;
  }

  async getSummaryText(): Promise<string> {
    const locator = this.page.locator(this.selectors.summaryTextarea);
    const actualInput = (await locator.inputValue()) || "";
    return actualInput;
  }

  /**
   * Check if honorific option is selected (visible with bg-white class)
   * @param labelText Text label ("様", "御中") or undefined
   * @returns true if option is selected, false otherwise
   */
  async isOptionHonorificVisible(labelText?: string): Promise<boolean> {
    if (!labelText) {
      console.warn('[TEST] isOptionHonorificVisible: labelText is undefined');
      return false;
    }

    const name = this.fieldNames.honorific;
    // Find label containing span with the text and input with name="keishoKbn"
    const locator = this.page.locator(
      `label:has(span:has-text("${labelText}")):has(input[type="radio"][name="${name}"])`
    );

    // Check if element exists and is visible
    const count = await locator.count();
    if (count === 0) {
      console.warn(`[TEST] isOptionHonorificVisible: Option "${labelText}" not found`);
      return false;
    }

    // Check if the label has bg-white class (selected state)
    const hasBgWhite = await locator.first().evaluate((el) => {
      return el.classList.contains('bg-white');
    }).catch(() => false);

    return hasBgWhite;
  }
  
  async isOptionPaymentMethodVisible(labelText?: string): Promise<boolean> {
    if (!labelText) {
      console.warn('[TEST] isOptionPaymentMethodVisible: labelText is undefined');
      return false;
    }

    const name = this.fieldNames.paymentMethod;
    // Find label containing span with the text and input with name="shHou"
    const locator = this.page.locator(
      `label:has(span:has-text("${labelText}")):has(input[type="radio"][name="${name}"])` 
    );

    // Check if element exists and is visible
    const count = await locator.count();
    if (count === 0) {
      console.warn(`[TEST] isOptionPaymentMethodVisible: Option "${labelText}" not found`);
      return false;
    }

    // Check if the label has bg-white class (selected state)
    const hasBgWhite = await locator.first().evaluate((el) => {   
      return el.classList.contains('bg-white');
    }).catch(() => false);

    return hasBgWhite;
  }

}
