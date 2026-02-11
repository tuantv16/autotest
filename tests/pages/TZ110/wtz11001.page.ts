/**
 * WTY10301 Summary Input Page Object
 * Page Object for 商品価格照会 screen
 */

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base.page';

export class WTZ11001Page extends BasePage {
  // Selectors
  private readonly selectors = {

    labelHaiMdKbn: 'label:has-text("日付")',

    // Form fields
    haikojiDateInput: 'input[name="haikojiDate"]',
    chikiCdInput: '#chikiCd',
    chikiNmInput: '#chikiNm_Label',

    haimdKbn1: "label span:has-text('当日')",
    haimdKbn2: "label span:has-text('翌日')",
    haimdKbn3: "label span:has-text('指定')",
    haiKbn1: "label span:has-text('配達')",
    haiKbn2: "label span:has-text('工事')",
    haiKbn3: "label span:has-text('家具')",
    haiKbn4: "label span:has-text('ｻﾎﾟｰﾄ')",

    confirmButton: 'ul.MuiList-root:has-text("確定")',
    clearButton: 'button:has-text("クリア")',
    searchButton: 'button:has-text("検索")',
    clearHaikojiDate: 'span[data-testid="ClearButtonIcon"]',
    clearChikiCd: '#chikiCd+img',

  };
    constructor(page: Page) {
    super(page);
  }

    get selectorsObj() {
      return {
        haikojiDateInput: this.selectors.haikojiDateInput,
        chikiCdInput: this.selectors.chikiCdInput,
        chikiNmInput: this.selectors.chikiNmInput,
        haimdKbn1: this.selectors.haimdKbn1,
        haimdKbn2: this.selectors.haimdKbn2,
        haimdKbn3: this.selectors.haimdKbn3,
        haiKbn1: this.selectors.haiKbn1,
        haiKbn2: this.selectors.haiKbn2,
        haiKbn3: this.selectors.haiKbn3,
        haiKbn4: this.selectors.haiKbn4,
        confirmButton: this.selectors.confirmButton,
        clearButton: this.selectors.clearButton,
        searchButton: this.selectors.searchButton,
        clearHaikojiDate: this.selectors.clearHaikojiDate,
        clearChikiCd: this.selectors.clearChikiCd,
      };
    }

    /**
     * Navigate to WTY10301 Summary Input screen
     * */
  async navigate(pilotKey: string = 'prod'): Promise<void> {
    const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTZ11001DeliveryConstructionPointList?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
    await this.goto(url);
  } 

  async waitForFormReady(): Promise<void> {
        const locator = this.page.locator(this.selectors.labelHaiMdKbn);
        await this.waitForVisible(locator, 10000);
    }

  async clickHaiMdKbn(option: number): Promise<void> {
    switch (option) {
    case 1:
        await this.page.locator(this.selectors.haimdKbn1).click();
        break;
    case 2:
        await this.page.locator(this.selectors.haimdKbn2).click();
        break;
    case 3:
        await this.page.locator(this.selectors.haimdKbn3).click();
        break;
    default:
        throw new Error(`Invalid option for HaiMdKbn: ${option}`);
    }
}

    async clickHaiKbn(option: number): Promise<void> {
        switch (option) {
        case 1:
            await this.page.locator(this.selectors.haiKbn1).click();
            break;
        case 2:
            await this.page.locator(this.selectors.haiKbn2).click();
            break;
        case 3:
            await this.page.locator(this.selectors.haiKbn3).click();
            break;
        case 4:
            await this.page.locator(this.selectors.haiKbn4).click();
            break;
        default:
            throw new Error(`Invalid option for HaiKbn: ${option}`);
        }
    }

    async fillChikiCd(chikiCd: string): Promise<void> {
      const locator = this.page.locator(this.selectors.chikiCdInput);
      await this.fillInput(locator, chikiCd);
    }

    async clickSearchButton(): Promise<void> {
      await this.page.locator(this.selectors.searchButton).first().click();
    }

    async clearButton(): Promise<void> {
      await this.page.locator(this.selectors.clearButton).click();
    }

    async clickConfirmButton(): Promise<void> {
      await this.page.locator(this.selectors.confirmButton).click();
    }

    async clearChikiCd(): Promise<void> {
      await this.page.locator(this.selectors.clearChikiCd).click();
    }

    async clearHaikojiDate(): Promise<void> {
      await this.page.locator(this.selectors.clearHaikojiDate).click();
    }

    async fillHaikojiDate(date: string): Promise<void> {
      const locator = this.page.locator(this.selectors.haikojiDateInput);
      await this.fillInput(locator, date);
    }

}