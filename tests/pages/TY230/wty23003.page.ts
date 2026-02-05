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

export class TY23003Page extends BasePage {
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
    edit: '修正',
    tanto: '担当者',
    smallClassification: '小分類',
    mediumClassification: '中分類',
    negotiation: '商談',
    title: '見込み客詳細',
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
      // { key: null, text: '見込区分' },
      { key: 'tantoCd', text: '獲得担当' },
      { key: 'tantoNm', text: '獲得担当名' },
      { key: 'mkmTso', text: '見込対象' },
      // { key: 'mkmTsoNm', text: null },
      { key: 'kanNm', text: 'カナ名' },
      { key: 'jusyo', text: '住所' },
      { key: 'telNo', text: '電話番号' },
      { key: 'kokNm', text: '顧客名' },
      { key: 'shushuCd', text: '収集コード' },
      { key: 'mkmNaiyoNm', text: '見込内容' },
      // // { key: 'mkmNaiyo', text: '見込内容' },
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

  private formFields: { key: string; value: any }[] = [];
  public readonly WTY23003Url: string = 'WTY23003ProspectDetail';

  constructor(page: Page) {
    super(page);
    this.formFields = [
      { key: 'tantoCd', value: '' },
      { key: 'mkmTso', value: '' },
      { key: 'tantoNm', value: '' },
      // { key: 'mkmTsoNm', value: '' },
      { key: 'kanNm', value: '' },
      { key: 'jusyo', value: '' },
      { key: 'telNo', value: '' },
      { key: 'kokNm', value: '' },
      { key: 'shushuCd', value: '' },
      { key: 'mkmNaiyoNm', value: '' },
      { key: 'rank', value: '' },
      { key: 'followDate', value: '' },
      { key: 'followKsu', value: '' },
      { key: 'cmt', value: '' },
    ];
  }

  async navigate(pilotKey: string = 'prod') {
    const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/${this.WTY23003Url}?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
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
  async verifyFormFields(
    fields: FieldLabel[],
    expect: any,
    isDisabled: boolean = false,
  ): Promise<void> {
    for (const field of fields) {
      if (field.text) {
        const isVisible = await this.verifyLabelVisible(field.text);
        expect(isVisible, `Label "${field.text}" should be visible`).toBe(true);
      }
      if (field.key) {
        const input = await this.getInputByName(field.key);
        await expect(
          input,
          `Input with name "${field.key}" should be visible`,
        ).toBeVisible();
        expect(input).toBeTruthy();

        if (isDisabled && input) {
          const inputIsDisable = await this.isInputDisabled(input);
          expect(inputIsDisable).toBe(true);
        }
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
   * Click  button
   */
  async clickButton(text: string): Promise<void> {
    const locator = this.page.locator(`button:has-text("${text}")`);
    await locator.click();
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

  /**
   * Click 修正 button from the action menu
   */
  async clickEditMenu(): Promise<void> {
    await this.clickButtonInMenuButton(this.labels.edit);
  }
  /**
   * Verify multiple input field values
   */
  async verifyDefaultInputsValue(
    expect: any,
    snapshot?: any,
    isDisabled: boolean = false,
  ): Promise<void> {
    const keys = this.formFields;
    for (const { key, value } of keys) {
      const value = await this.getValueByName(key);
      const input = await this.getInputByName(key);
      expect(
        value,
        `Field "${key}" value mismatch. Expected: "${value}", Got: "${value}"`,
      ).toBe(value);
      if (isDisabled) {
        const inputIsDisable = await this.isInputDisabled(input);
        expect(inputIsDisable).toBe(true);
      }
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
   * Verify the page title
   */
  async verifyPageTitle(expect: any): Promise<boolean> {
    const isVisible = await this.waitForTextInBody(this.labels.title, 200);
    return isVisible;
  }


  async scrollToBottom(): Promise<void> {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await this.page.waitForTimeout(1000);
  }
}
