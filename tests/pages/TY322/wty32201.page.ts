import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';
interface MenuItem {
  key: string;
  text: string;
}
interface FieldLabel {
  key: string | null;
  text: string | null;
}
export class TY32201Page extends BasePage {
  // Selectors
  protected readonly selectors = {
    actionMenuButton: 'button.MuiButtonBase-root[aria-haspopup="true"]',
    buttonBack: 'button:has(svg path[d^="M15 19.9201"])',
    barcodeIcon:
      'button:has(svg path[d^="M2 9V7C2 4 4 2 7 2H17C20 2 22 4 22 7V9"])',
    modal: 'div[class*="_modal_"]',
    errorClass: '_error_cbu4e_24', // From BasePage
    errorDialog: '#wty31101-message-dialog',
    tableId: '#wty32201-inventory-table',
  };

  public readonly ty322path = 'WTY32201InventoryCount';
  public readonly labels = {
    title: '棚卸カウント',
    register: '登録',
    deleteData: '棚番削除',
    deleteStore: '棚卸ﾃﾞｰﾀ削除',
    postProcessing: '後処理',
  };
  public readonly menuItems = [
    { key: '', text: '棚番削除' },
    { key: '', text: '棚卸ﾃﾞｰﾀ削除' },
    { key: '', text: '後処理' },
  ];

  public formFields = [
    { key: 'shelfNumber', text: '棚番' },
    { key: 'shelfTotal', text: '棚番総数' },
    { key: 'janCode', text: '商品' },
    { key: 'quantity', text: '品数' },
  ];
  public tableHeaders = ['JANコード', '型番', '数量', '備考'];
  constructor(page: Page) {
    super(page);
  }

  async navigate(pilotKey: string = 'prod') {
    const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/${this.ty322path}?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
    await this.goto(url);
    await this.page.waitForTimeout(500);
  }
  /**
   * Verify the page title
   */
  async verifyPageTitle(): Promise<boolean> {
    const isVisible = await this.waitForTextInBody(this.labels.title, 200);
    return isVisible;
  }
  /**
   * Scroll to top of the page
   */
  async scrollToTop(): Promise<void> {
    await this.page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    await this.page.waitForTimeout(1000);
  }
  /**
   * Scroll to bottom of the page
   */
  async scrollToBottom(): Promise<void> {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await this.page.waitForTimeout(1000);
  }
  /**
   * Open action menu
   */
  async openMenu(): Promise<void> {
    await super.openActionMenu(this.selectors.actionMenuButton);
  }
  /**
   * Close the action menu
   */
  async closeMenu(): Promise<void> {
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(300);
  }
  async clickPreviousButton(): Promise<void> {
    const locator = this.page.locator(this.selectors.buttonBack);
    await this.waitForVisible(locator);
    await locator.click();
  }
  async verifyBarcodeIcon(): Promise<boolean> {
    const locator = this.page.locator(this.selectors.barcodeIcon);
    const count = await locator.count();
    if (count === 0) return false;
    for (let i = 0; i < count; i++) {
      if (!(await locator.nth(i).isVisible({ timeout: 200 }))) {
        return false;
      }
    }
    return true;
  }
  async clickBarcodeIcon(): Promise<void> {
    const locator = this.page.locator(this.selectors.barcodeIcon);
    await locator.click();
  }
  async verifyItems(items: MenuItem[] | string[]): Promise<boolean> {
    for (const item of items) {
      // Check if item is a string or MenuItem object
      const text = typeof item === 'string' ? item : item.text;
      const isVisible = await this.waitForTextInBody(text);
      if (!isVisible) {
        return false;
      }
    }
    return true;
  }
  async activeRadioButton(
    valueRadio: string,
    first: boolean = true,
    last?: boolean,
  ): Promise<void> {
    const radio = this.page.locator('label').filter({
      has: this.page.locator(`input[type="radio"][value="${valueRadio}"]`),
    });

    if (first) {
      await radio.first().click();
    }
    if (last) {
      await radio.last().click();
    }
  }
  /**
   * Verify that all radio button labels do not have bg-white class
   * @returns true if none have bg-white class, false otherwise
   */
  async verifyRadioLabelsNoBgWhite(): Promise<boolean> {
    const labels = this.page
      .locator('label')
      .filter({ has: this.page.locator('input[type="radio"]') });

    const count = await labels.count();
    if (count === 0) {
      return false;
    }

    for (let i = 0; i < count; i++) {
      const label = labels.nth(i);
      const classAttr = await label.getAttribute('class');

      if (classAttr && classAttr.includes('bg-white')) {
        return false;
      }
    }
    return true;
  }

  async getInputByName(fieldName: string): Promise<Locator> {
    return this.page.locator(`[name="${fieldName}"]`);
  }

  /**
   * Verify form field label visibility by text
   */
  async verifyLabelVisible(labelText: string): Promise<boolean> {
    return await this.waitForTextInBody(labelText);
  }
  async verifyFormFields(
    fields: FieldLabel[],
    isDisabled: boolean = false,
  ): Promise<boolean> {
    for (const field of fields) {
      if (field.text) {
        const isVisible = await this.verifyLabelVisible(field.text);
        if (!isVisible) {
          return false;
        }
      }
      if (field.key) {
        const input = await this.getInputByName(field.key);
        if (!(await input.isVisible())) {
          return false;
        }

        if (isDisabled) {
          const inputIsDisable = await this.isInputDisabled(input);
          if (!inputIsDisable) {
            return false;
          }
        }
      }
    }
    return true;
  }

  async focusInput(id: string, isId: boolean = true): Promise<void> {
    const locator = this.page.locator(isId ? `#${id}` : `[name="${id}"]`);
    await this.waitForVisible(locator, 10000);
    await locator.focus();
  }
  async fillInputByName(fieldName: string, value: string): Promise<void> {
    const input = await this.getInputByName(fieldName);
    await input.fill(value);
  }
  async blurInput(id: string, isName: boolean = true): Promise<void> {
    const locator = this.page.locator(isName ? `[name="${id}"]` : `#${id}`);
    await locator.blur();
  }
  //   fill inputs
  async fillShelfNumber(value: string, snapInput?: any): Promise<void> {
    await this.focusInput('shelfNumber', true);
    await snapInput?.();
    await this.fillInputByName('shelfNumber', value);
    await this.blurInput('shelfNumber', true);
  }
  async getShelfNumber(): Promise<string> {
    return await this.getValueByName('shelfNumber');
  }
  async fillQuantity(value: string, snapInput?: any): Promise<void> {
    await this.focusInput('quantity', true);
    await snapInput?.();
    await this.fillInputByName('quantity', value);
    await this.blurInput('quantity', true);
  }
  async getQuantity(): Promise<string> {
    return await this.getValueByName('quantity');
  }
  async fillJanCode(value: string, snapInput?: any): Promise<void> {
    await this.focusInput('janCode', true);
    await snapInput?.();
    await this.fillInputByName('janCode', value);
    await this.blurInput('janCode', true);
  }
  async getJanCode(): Promise<string> {
    return await this.getValueByName('janCode');
  }
  async getModelNumber(): Promise<string> {
    return await this.getValueByName('modelNumber');
  }
  async getShelfTotal(): Promise<string> {
    return await this.getValueByName('shelfTotal');
  }
  async clickButton(text: string): Promise<void> {
    const locator = this.page.locator(`button:has-text("${text}")`);
    await locator.click();
  }
  async clickItemMenu(text: string): Promise<void> {
    const locator = this.page.locator(`span:has-text("${text}")`);
    await this.waitForVisible(locator);
    await locator.click();
  }

  async clickDeleteData(): Promise<void> {
    await this.clickItemMenu(this.labels.deleteData);
  }
  async clickDeleteStore(): Promise<void> {
    await this.clickItemMenu(this.labels.deleteStore);
  }
  async clickPostProcessing(): Promise<void> {
    await this.clickItemMenu(this.labels.postProcessing);
  }
  async clickRegister(): Promise<void> {
    await this.clickButton(this.labels.register);
  }

  /**
   * Verify multiple input fields are not empty
   */
  async verifyInputsNotEmpty(formFields: { key: string }[]): Promise<boolean> {
    for (const { key } of formFields) {
      const value = await this.getValueByName(key);
      if (!value.toString()) return false;
    }
    return true;
  }
  /**
   * Check if error dialog is visible
   */
  async isErrorDialogVisible(
    selector: string = this.selectors.errorDialog,
  ): Promise<boolean> {
    const dialog = this.page.locator(selector);
    return await dialog.isVisible({ timeout: 1000 }).catch(() => false);
  }
  /**
   * Click the OK button on the error dialog
   */
  async clickConfirmErrorDialog(
    selector: string = this.selectors.errorDialog,
  ): Promise<void> {
    const dialog = this.page.locator(selector);
    const okButton = dialog.locator('button').last();
    await okButton.click().catch(() => {});
    await this.page.waitForTimeout(500);
  }
  /**
   * Click the cancel button on the error dialog
   */
  async clickCancelErrorDialog(
    selector: string = this.selectors.errorDialog,
  ): Promise<void> {
    const dialog = this.page.locator(selector);
    const okButton = dialog.locator('button').first();
    await okButton.click().catch(() => {});
    await this.page.waitForTimeout(500);
  }
  async confirmErrorDialog(
    selector: string = this.selectors.errorDialog,
  ): Promise<boolean> {
    if (await this.isErrorDialogVisible(selector)) {
      await this.clickConfirmErrorDialog(selector);
      return true;
    }
    return false;
  }

  /**
   * Verify table contains all expected headers
   */
  async verifyTableHeaders(): Promise<boolean> {
    const table = this.page.locator(this.selectors.tableId);
    if (!(await table.isVisible())) return false;

    for (const headerText of this.tableHeaders) {
      const header = table.locator(
        `[role="columnheader"]:has-text("${headerText}")`,
      );
      if (!(await header.isVisible())) {
        return false;
      }
    }
    return true;
  }

  /**
   * Verify table contains data rows
   * Checks if at least one row exists in the table using auto-waiting assertion
   */
  async verifyTableData(timeout: number = 10000): Promise<boolean> {
    const firstRow = this.page
      .locator(this.selectors.tableId)
      .locator('.ag-center-cols-container [role="row"][row-index="0"]');
    try {
      // Wait for the first row to be visible (handles data loading)
      await firstRow.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      // Return false if timeout reached without finding a row
      return false;
    }
  }
}
