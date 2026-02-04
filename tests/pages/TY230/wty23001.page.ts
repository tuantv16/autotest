import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

interface FieldLabel {
  key: string | null;
  text: string | null;
}

interface MenuItem {
  key: string;
  text: string;
}

export class TY23001Page extends BasePage {
  // Selectors
  protected readonly selectors = {
    actionMenuButton: 'button.MuiButtonBase-root[aria-haspopup="true"]',
    buttonBack: 'button:has(svg path[d^="M15 19.9201"])',
    modal: 'div[class*="_modal_"]',
    errorClass: '_error_cbu4e_24', // From BasePage
    errorDialog: '#error-dialog',
  };

  private readonly labels = {
    delete: '削除',
    confirm: '確定',
    clear: 'クリア',
    customer: '顧客',
    tanto: '担当者',
    smallClassification: '小分類',
    mediumClassification: '中分類',
    negotiation: '商談',
    title: '見込み客登録',
  };

  public readonly options = {
    shushuCd: [
      '一声',
      'アンケート',
      '修理',
      '配達工事',
      '紹介',
      'コミッティ（訪問）',
    ],
    mkmNaiyo: ['新規', '買増', '買換', '不明'],
    rank: [
      '購入意思決定、購入日決定',
      '購入意思はあるが購入日未定',
      'いずれは購入されるが具体的には分からない',
    ],
    mkmTso: ['ブライダル', 'シングルライフ', '新築・増改築'],
  };

  public readonly uiConstants = {
    formFields: [
      { key: null, text: '見込区分' },
      { key: 'tantoCd', text: '獲得担当' },
      { key: 'tantoNm', text: null },
      { key: 'mkmTsoCd', text: '見込対象' },
      { key: 'mkmTsoNm', text: null },
      { key: 'kanNm', text: 'カナ名' },
      { key: 'jusyo', text: '住所' },
      { key: 'telNo', text: '電話番号' },
      { key: 'kokNm', text: '顧客名' },
      { key: 'shushuCd', text: '収集コード' },
      { key: 'mkmNaiyo', text: '見込内容' },
      { key: 'rank', text: 'ランク' },
      { key: 'followDate', text: 'フォロー日' },
      { key: 'followKsu', text: 'フォロー回数' },
      { key: 'cmt', text: 'コメント' },
    ],
    inputMkmTso: [
      { key: 'mkmTsoCd', text: '見込対象' },
      { key: 'mkmTsoNm', text: null },
    ],
    selectMkmTso: [{ key: 'mkmTsoSelect', text: 'ブライダル' }],
    customerInfoIds: ['kanNm', 'jusyo', 'telNo', 'kokNm'],
  };
  public readonly menuItems = [
    { key: '', text: '顧客' },
    { key: 'clear', text: 'クリア' },
    { key: '', text: '照会' },
    { key: '', text: '確定' },
  ];
  public radioLables = ['中分類', '小分類', '商談'];

  private formFields: { key: string; value: any }[] = [];

  constructor(page: Page) {
    super(page);
    this.formFields = [
      { key: 'tantoCd', value: '' },
      { key: 'mkmTsoCd', value: '' },
      { key: 'tantoNm', value: '' },
      { key: 'mkmTsoNm', value: '' },
      { key: 'kanNm', value: '' },
      { key: 'jusyo', value: '' },
      { key: 'telNo', value: '' },
      { key: 'kokNm', value: '' },
      { key: 'shushuCd', value: '1' },
      { key: 'mkmNaiyo', value: '1' },
      { key: 'rank', value: '1' },
      { key: 'followDate', value: '' },
      { key: 'followKsu', value: '' },
      { key: 'cmt', value: '' },
    ];
  }

  async navigate(pilotKey: string = 'prod') {
    const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTY23001ProspectRegistration?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
    await this.goto(url);
    await this.page.waitForTimeout(500);
  }

  /**
   * Verify form field label visibility by text
   */
  async verifyLabelVisible(labelText: string): Promise<boolean> {
    return await this.waitForTextInBody(labelText);
  }

  /**
   * Get input field locator by name attribute
   */
  getInputByName(fieldName: string): Locator {
    return this.page.locator(`[name="${fieldName}"]`);
  }

  /**
   * Verify all form fields (labels and inputs) with assertions
   */
  async verifyFormFields(fields: FieldLabel[], expect: any): Promise<void> {
    for (const field of fields) {
      if (field.text) {
        const isVisible = await this.verifyLabelVisible(field.text);
        expect(isVisible, `Label "${field.text}" should be visible`).toBe(true);
      }
      if (field.key) {
        const input = this.getInputByName(field.key);
        await expect(
          input,
          `Input with name "${field.key}" should be visible`,
        ).toBeVisible();
      }
    }
  }

  /**
   * Open the action menu
   */
  async openMenu(): Promise<void> {
    await super.openActionMenu(this.selectors.actionMenuButton);
  }

  /**
   * Verify items are visible with assertions
   * Supports both MenuItem[] (objects) and string[] (simple text)
   */
  async verifyItems(items: MenuItem[] | string[], expect: any): Promise<void> {
    for (const item of items) {
      // Check if item is a string or MenuItem object
      const text = typeof item === 'string' ? item : item.text;
      const isVisible = await this.waitForTextInBody(text);
      expect(isVisible, `Item "${text}" should be visible`).toBe(true);
    }
  }

  /**
   * Close the action menu
   */
  async closeMenu(): Promise<void> {
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(300);
  }
  /**
   * focus textbox
   */
  async focusInput(id: string, isId: boolean = true): Promise<void> {
    const locator = this.page.locator(isId ? `#${id}` : `[name="${id}"]`);
    await this.waitForVisible(locator, 10000);
    await locator.focus();
  }
  // blur input
  async blurInput(id: string, isId: boolean = true): Promise<void> {
    const locator = this.page.locator(isId ? `#${id}` : `[name="${id}"]`);
    await this.waitForVisible(locator, 10000);
    await locator.blur();
  }
  /**
   * Click  button
   */
  async clickButton(text: string): Promise<void> {
    const locator = this.page.locator(`button:has-text("${text}")`);
    await locator.click();
  }

  /**
   * Generic method to verify popup transition flow:
   * 1. Focus Input
   * 2. Click Button -> Open Popup
   * 3. Verify Popup URL
   */
  async verifyPopupTransition(
    expect: any,
    inputId: string,
    expectedUrlRegex: RegExp,
    triggerAction: () => Promise<void>,
    snapInput?: any,
  ): Promise<void> {
    await this.focusInput(inputId);
    await snapInput?.();
    await this.page.waitForTimeout(1000);
    await this.openNewTab(expect, expectedUrlRegex, triggerAction);
  }
  /**
   * Open new tab
   */
  async openNewTab(
    expect: any,
    expectedUrlRegex: RegExp,
    triggerAction: () => Promise<void>,
  ): Promise<void> {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      triggerAction(),
    ]);

    await newPage.waitForLoadState();
    await this.page.waitForTimeout(1000);
    await expect(newPage).toHaveURL(expectedUrlRegex);
  }

  /**
   * Click radio button by label text
   */
  async clickRadioButton(radioText: string = '商談'): Promise<void> {
    const label = this.page.locator(`label:has-text("${radioText}")`);
    await label.click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Click 'Small Classification' radio button
   */
  async clickSmallClassificationRadio(): Promise<void> {
    await this.clickRadioButton(this.labels.smallClassification);
  }

  /**
   * Click 'Medium Classification' radio button
   */
  async clickMediumClassificationRadio(): Promise<void> {
    await this.clickRadioButton(this.labels.mediumClassification);
  }

  /**
   * Click 'Negotiation' (商談) radio button
   */
  async clickNegotiationRadio(): Promise<void> {
    await this.clickRadioButton(this.labels.negotiation);
  }
  /**
   * Click combo box by id
   */
  async clickComboBox(id: string = 'mkmTsoSelect'): Promise<void> {
    const label = this.page.locator(`[aria-labelledby="${id}"]`);
    await label.click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Verify items within a specific container (e.g., dropdown menu, listbox)
   * This is more precise than verifyItems as it only searches within the container
   */
  async verifyItemsInContainer(
    items: string[],
    expect: any,
    containerSelector: string = '[role="listbox"]',
  ): Promise<void> {
    const container = this.page.locator(containerSelector);
    await expect(container, 'Container should be visible').toBeVisible();

    for (const itemText of items) {
      const item = container.locator(`[role="option"]:has-text("${itemText}")`);
      await expect(
        item,
        `Option "${itemText}" should be visible in container`,
      ).toBeVisible();
    }
  }

  /**
   * Verify select box options (all-in-one method)
   * Opens combo box, verifies options, and closes menu
   */
  async verifySelectBoxOptions(
    fieldId: string,
    expectedOptions: string[],
    expect: any,
  ): Promise<void> {
    await this.clickComboBox(fieldId);
    await this.page.waitForTimeout(500);
    await this.verifyItemsInContainer(expectedOptions, expect);
    // await this.closeMenu();
  }

  /**
   * Click the left arrow/previous button (icon button)
   * Locator based on specific SVG path (Left Chevron)
   */
  async clickPreviousButton(): Promise<void> {
    const locator = this.page.locator(this.selectors.buttonBack);
    await this.waitForVisible(locator);
    await locator.click();
  }
  async clear(): Promise<void> {
    await this.clickButton(this.labels.clear);
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
   * Click Delete button from the action menu
   */
  async clickDelete(): Promise<void> {
    await this.clickItemMenu(this.labels.delete);
    // await this.clickButtonInMenuButton(this.labels.delete);
  }

  /**
   * Click Confirm button from the action menu
   */
  async clickConfirmMenu(): Promise<void> {
    await this.clickButton(this.labels.confirm);
  }

  /**
   * Fill 獲得担当 (tantoCd)
   */
  async fillTantoCdCallApi(value: string, snapInput?: any): Promise<void> {
    await this.focusInput('tantoCd', true);
    await snapInput?.();
    await this.fillInputById('tantoCd', value);
    await this.blurInput('tantoCd');
  }
  async fillTantoCd(value: string, snapInput?: any): Promise<void> {
    await this.focusInput('tantoCd', true);
    await snapInput?.();
    await this.fillInputById('tantoCd', value);
    await this.blurInput('tantoCd');
    await this.page.waitForTimeout(1000);
  }

  /**
   * Fill 見込対象 (mkmTsoCd)
   */
  async fillMkmTsoCdCallApi(value: string, snapInput?: any): Promise<void> {
    await this.focusInput('mkmTsoCd', true);
    await snapInput?.();
    await this.fillInputById('mkmTsoCd', value);
    await this.blurInput('mkmTsoCd');
  }
  async fillMkmTsoCd(value: string, snapInput?: any): Promise<void> {
    await this.focusInput('mkmTsoCd', true);
    await snapInput?.();
    await this.fillInputById('mkmTsoCd', value);
    await this.blurInput('mkmTsoCd');
    await this.page.waitForTimeout(1000);
  }

  /**
   * Fill フォロー日 (followDate)
   */
  async fillFollowDate(value: string): Promise<void> {
    await this.focusInput('followDate', true);
    await this.fillInputByName('followDate', value);
    await this.blurInput('followDate', true);
  }

  /**
   * Fill ﾌｫﾛｰ回数 (followKsu)
   */
  async fillFollowKsu(value: string): Promise<void> {
    await this.focusInput('followKsu', false);
    await this.fillInputByName('followKsu', value);
    await this.blurInput('followKsu', false);
  }

  /**
   * Fill コメント (cmt)
   */
  async fillComment(value: string): Promise<void> {
    await this.fillInputByName('cmt', value);
  }

  /**
   * Get 獲得担当 (tantoCd) value
   */
  async getTantoCd(): Promise<string> {
    return await this.getValueByName('tantoCd');
  }

  /**
   * Get 見込対象 (mkmTsoCd) value
   */
  async getMkmTsoCd(): Promise<string> {
    return await this.getValueByName('mkmTsoCd');
  }

  /**
   * Get 担当者名 (tantoNm) value
   */
  async getTantoNm(): Promise<string> {
    return await this.getValueByName('tantoNm');
  }

  /**
   * Get 見込対象名 (mkmTsoNm) value
   */
  async getMkmTsoNm(): Promise<string> {
    return await this.getValueByName('mkmTsoNm');
  }

  /**
   * Get カナ名 (kanNm) value
   */
  async getKanNm(): Promise<string> {
    return await this.getValueByName('kanNm');
  }

  /**
   * Get 住所 (jusyo) value
   */
  async getJusyo(): Promise<string> {
    return await this.getValueByName('jusyo');
  }

  /**
   * Get 電話番号 (telNo) value
   */
  async getTelNo(): Promise<string> {
    return await this.getValueByName('telNo');
  }

  /**
   * Get 顧客名 (kokNm) value
   */
  async getKokNm(): Promise<string> {
    return await this.getValueByName('kokNm');
  }

  /**
   * Get 収集コード (shushuCd) value
   */
  async getShushuCd(): Promise<string> {
    return await this.getValueByName('shushuCd');
  }

  /**
   * Get 見込内容 (mkmNaiyo) value
   */
  async getMkmNaiyo(): Promise<string> {
    return await this.getValueByName('mkmNaiyo');
  }

  /**
   * Get ランク (rank) value
   */
  async getRank(): Promise<string> {
    return await this.getValueByName('rank');
  }

  /**
   * Get フォロー日 (followDate) value
   */
  async getFollowDate(): Promise<string> {
    return await this.getValueByName('followDate');
  }

  /**
   * Get ﾌｫﾛｰ回数 (followKsu) value
   */
  async getFollowKsu(): Promise<string> {
    return await this.getValueByName('followKsu');
  }

  /**
   * Get コメント (cmt) value
   */
  async getCmt(): Promise<string> {
    return await this.getValueByName('cmt');
  }

  /**
   * Get today's date in YYYY/MM/DD format
   * @param offsetDays Number of days to offset from today (default: 0)
   */
  getTodayDate(offsetDays: number = 0): string {
    const date = new Date();
    date.setDate(date.getDate() + offsetDays);
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${date.getFullYear()}/${mm}/${dd}`;
  }

  /**
   * Get common form field keys
   */
  getCommonFieldKeys(): any[] {
    return this.formFields;
  }

  /**
   * Verify multiple input field values
   */
  async verifyDefaultInputsValue(expect: any, snapshot?: any): Promise<void> {
    const keys = this.formFields;
    for (const { key, value } of keys) {
      const valueCurrentInput = await this.getValueByName(key);
      expect(
        valueCurrentInput,
        `Field "${key}" value mismatch. Expected: "${value}", Got: "${value}"`,
      ).toBe(value);
      snapshot?.();
    }
  }

  /**
   * Verify multiple input fields are not empty
   */
  async verifyInputsNotEmpty(expect: any, snapshot?: any): Promise<void> {
    const keys = this.formFields;
    for (const { key } of keys) {
      const value = await this.getValueByName(key);
      expect(value, `Field "${key}" should not be empty`).toBeTruthy();
    }
  }

  /**
   * Transition to Customer Search (New Tab)
   */
  async transitionToCustomerSearch(expect: any): Promise<void> {
    await this.openNewTab(expect, /.*WTZ11201.*/, () =>
      // this.clickButtonInMenuButton(this.labels.customer),
      this.clickCustomerButton(),
    );
  }

  /**
   * Transition to Tanto Search (Popup)
   */
  async transitionToTantoSearch(expect: any): Promise<void> {
    await this.verifyPopupTransition(expect, 'tantoCd', /.*WTZ10801.*/, () =>
      this.clickButton(this.labels.tanto),
    );
  }

  /**
   * Transition to Classification Search (Popup)
   */
  async transitionToTsoSearch(
    expect: any,
    classification: '小分類' | '中分類',
    snapInput?: any,
  ): Promise<void> {
    const label =
      classification === '小分類'
        ? this.labels.smallClassification
        : this.labels.mediumClassification;
    await this.verifyPopupTransition(
      expect,
      'mkmTsoCd',
      /.*(WTZ10301|WTZ10401).*/,
      () => this.clickButton(label),
      snapInput,
    );
  }
  // new change
  /**
   * Verify the page title
   */
  async verifyPageTitle(expect: any): Promise<boolean> {
    const isVisible = await this.waitForTextInBody(this.labels.title, 200);
    return isVisible;
  }
  async clickItemMenu(text: string): Promise<void> {
    const locator = this.page.locator(`span:has-text("${text}")`);
    await this.waitForVisible(locator);
    await locator.click();
  }
  async clickCustomerButton() {
    await this.clickItemMenu(this.labels.customer);
  }
  async scrollToTop(): Promise<void> {
    await this.page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    await this.page.waitForTimeout(1000);
  }
  async scrollToBottom(): Promise<void> {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await this.page.waitForTimeout(1000);
  }
}
