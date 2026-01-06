/**
 * WTY20501 Summary Input Page Object
 * Page Object for 摘要欄入力 screen
 */

import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export interface WTY20501FormData {
  customerNameKanji: string;
  customerNameKana: string;
  deliveryDate: string;
  summaryText: string;
}

export class TY2050Page extends BasePage {
  // Selectors
  private readonly selectors = {
    // Form fields
    customerNameKanji: '#kokKnj',
    customerNameKana: '#kokKn',
    honorificRadio: (index: number) => `#keisho_${index}`,
    paymentMethodRadio: (index: number) => `#shirai_${index}`,
    deliveryDateInput: 'input[name="nnyOtdkYoteiDate"]',
    summaryTextarea: '#tkyRn',

    // Buttons
    actionMenuButton: 'button.MuiButtonBase-root[aria-haspopup="true"]',
    confirmButton: 'ul.MuiList-root:has-text("確定")',
    clearButton: 'ul.MuiList-root:has-text("クリア")',

    // Messages
    staffCode: '.text-xs.text-gray-500.text-right',
    errorDialog: '#wty20501-error-dialog',
  };

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to WTY20501 Summary Input screen
   */
  async navigate(pilotKey: string = 'prod'): Promise<void> {
    const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTY20501SummaryInput`;
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
   * Select honorific (0: 様, 1: 御中)
   */
  async selectHonorific(index: number = 0): Promise<void> {
    const locator = this.page.locator(this.selectors.honorificRadio(index));
    const isChecked = await locator.isChecked();
    if (!isChecked) {
      await this.clickWithRetry(locator);
    }
  }

  /**
   * Select payment method (0: 現金, 1: 振込)
   */
  async selectPaymentMethod(index: number = 0): Promise<void> {
    const locator = this.page.locator(this.selectors.paymentMethodRadio(index));
    const isChecked = await locator.isChecked();
    if (!isChecked) {
      await this.clickWithRetry(locator);
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
   * Click confirm button (確定) - uses parent class implementation
   */
  async clickConfirm(): Promise<void> {
    await super.clickConfirm(this.selectors.actionMenuButton, '確定');
  }

  /**
   * Click clear button (クリア) - uses parent class implementation
   */
  async clickClear(): Promise<void> {
    await super.clickClear(this.selectors.actionMenuButton, 'クリア');
  }

  /**
   * Get staff code display
   */
  async getStaffCode(): Promise<string> {
    const locator = this.page.locator(this.selectors.staffCode);
    const text = await locator.textContent();
    return text?.replace('担：', '') || '';
  }

  /**
   * Check if error dialog is visible
   */
  async isErrorDialogVisible(): Promise<boolean> {
    return await super.isErrorDialogVisible('wty20501-error-dialog');
  }

  /**
   * Get error dialog message
   */
  async getErrorMessage(): Promise<string> {
    const dialog = this.page.locator(this.selectors.errorDialog);
    if (await dialog.isVisible({ timeout: 2000 }).catch(() => false)) {
      return (await dialog.textContent()) || '';
    }
    return '';
  }

  /**
   * Dismiss error dialog
   */
  async dismissErrorDialog(): Promise<void> {
    await super.dismissErrorDialog('wty20501-error-dialog');
  }

  /**
   * Wait for form to be ready
   */
  async waitForFormReady(): Promise<void> {
    await this.page.waitForSelector(this.selectors.customerNameKanji, {
      state: 'visible',
      timeout: 10000,
    });
  }
}
