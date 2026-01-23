/**
 * WTY10301 Summary Input Page Object
 * Page Object for 商品価格照会 screen
 */

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base.page';

export interface WTY10301FormData {
  baseDate: string;
  btnCd: string;
  btnNm: string;
  shnCd: string;
  kata: string;
  zeiKbn: string;
  bkSbt: string;
  ptSbt: string;
}

export class TY103Page extends BasePage {
  // Selectors
  private readonly selectors = {
    // Form fields
    baseDateInput: '#baseDate',
    btnCdInput: '#btnCd',
    btnNmInput: '#btnNm',
    shnCdInput: '#shnCd',
    kataInput: '#kata',
    kkNmInput: '#kkNm',
    priceBkInput: '#priceBk',
    couponDiscountInput: '#couponDiscount',

    zeiKbn1: "label span:has-text('税込')",
    zeiKbn2: "label span:has-text('税別')",
    bkSbt1: "label span:has-text('一般')",
    bkSbt2: "label span:has-text('正会員')",
    bkSbt3: "label span:has-text('あんしん会員')",
    ptSbt1: "label span:has-text('通常P')",
    ptSbt2: "label span:has-text('期間限定P')",

    // Radio inputs 
    zeiKbnRadio: (value: string) => `input[name="zeiKbn"][value="${value}"]`,
    bkSbtRadio: (value: string) => `input[name="bkSbt"][value="${value}"]`,
    ptSbtRadio: (value: string) => `input[name="ptSbt"][value="${value}"]`,
    // Buttons
    actionMenuButton: 'button.MuiButtonBase-root[aria-haspopup="true"]',
    confirmButton: 'ul.MuiList-root:has-text("確定")',
    clearButton: 'button:has-text("クリア")',
    searchButton: 'button:has-text("検索")[type="submit"]',
    barCodeButton: 'div.right-2.absolute.top-1\\/2.-translate-y-1\\/2.transform button.cursor-pointer[type="button"]',
    subMenuBtnCd: (text: string) => `div._popup_5j19k_21._horizontal_5j19k_51 button._menuItem_5j19k_63:has-text("${text}")`,
    // Messages
    staffCode: '.text-xs.text-gray-500.text-right',
    errorDialog: '#errorDialog div div div p',
  };
    constructor(page: Page) {
    super(page);
  }

    get selectorsObj() {
      return {
        baseDateInput: this.page.locator(this.selectors.baseDateInput),
        btnCdInput: this.page.locator(this.selectors.btnCdInput),
        btnNmInput: this.page.locator(this.selectors.btnNmInput),
        shnCdInput: this.page.locator(this.selectors.shnCdInput),
        kataInput: this.page.locator(this.selectors.kataInput),
        kkNmInput: this.page.locator(this.selectors.kkNmInput),
        priceBkInput: this.page.locator(this.selectors.priceBkInput),
        couponDiscountInput: this.page.locator(this.selectors.couponDiscountInput),
        zeiKbnRadio: (value: string) => this.page.locator(this.selectors.zeiKbnRadio(value)),
        bkSbtRadio: (value: string) => this.page.locator(this.selectors.bkSbtRadio(value)),
        ptSbtRadio: (value: string) => this.page.locator(this.selectors.ptSbtRadio(value)),
        searchButton: this.page.locator(this.selectors.searchButton),
        actionMenuButton: this.page.locator(this.selectors.actionMenuButton),
        confirmButton: this.page.locator(this.selectors.confirmButton),
        errorDialog: this.page.locator(this.selectors.errorDialog),
      };
    }

    /**
     * Navigate to WTY10301 Summary Input screen
     * */
  async navigate(pilotKey: string = 'prod'): Promise<void> {
    const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTY10301ProductPriceInformation?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
    await this.goto(url);
  } 
    /**
     * Fill entire form
     */
  async fillForm(formData: WTY10301FormData): Promise<void> {
    await this.fillBaseDate(formData.baseDate);
    await this.fillBtnCd(formData.btnCd);
    await this.fillShnCd(formData.shnCd);
    await this.selectZeiKbn(formData.zeiKbn);
    await this.selectBkSbt(formData.bkSbt);
    await this.selectPtSbt(formData.ptSbt);
  }
    /**
     * Fill Base Date field
     */
  async fillBaseDate(value: string): Promise<void> {
    await this.fillInput(this.page.locator(this.selectors.baseDateInput), value);
  }
    /**
     * Fill BTN Code field
     */
    async fillBtnCd(value: string): Promise<void> {
    await this.fillInput(this.page.locator(this.selectors.btnCdInput), value);
  }
    /**
     * Fill BTN Name field
     */
    async fillBtnNm(value: string): Promise<void> {
    await this.fillInput(this.page.locator(this.selectors.btnNmInput), value);
  }
    /**
     * Fill 商品コード field
     */ 
    async fillShnCd(value: string): Promise<void> {
    await this.fillInput(this.page.locator(this.selectors.shnCdInput), value);
  }
    /**
     * Fill 形態 field
     */
    async fillKata(value: string): Promise<void> {
    await this.fillInput(this.page.locator(this.selectors.kataInput), value);
  }
    /**
     * Select 税区分
     */
    async selectZeiKbn(value: string): Promise<void> {
      if(value == '2') {
        const locator = this.page.locator(this.selectors.zeiKbn2);
        await locator.click();
      } else {
        const locator = this.page.locator(this.selectors.zeiKbn1);
        await locator.click();
      }
    }
    /**
     * Select BK種別
     */
    async selectBkSbt(value: string): Promise<void> {
      if(value == '1') {
        const locator = this.page.locator(this.selectors.bkSbt1);
        await locator.click();
      } else if(value == '2') {
        const locator = this.page.locator(this.selectors.bkSbt2);
        await locator.click();
      } else if(value == '3') {
        const locator = this.page.locator(this.selectors.bkSbt3);
        await locator.click();
      }
    }
    /**
     * Select PT種別
     */
    async selectPtSbt(value: string): Promise<void> {
      if(value == '1') {
        const locator = this.page.locator(this.selectors.ptSbt1);
        await locator.click();
      } else if(value == '2') {
        const locator = this.page.locator(this.selectors.ptSbt2);
        await locator.click();
      }
    }

    /**
     * Click Search button
     */
    async clickSearch(): Promise<void> {
    const locator = this.page.locator(this.selectors.searchButton);
    await this.waitForVisible(locator);
    await locator.click();
  }

    async clickBarCode(): Promise<void> {
      const locator = this.page.locator(this.selectors.barCodeButton);
      await this.waitForVisible(locator);
      await locator.click();
    }

    async clickSubMenuBtn(text: string): Promise<void> {
      const locator = this.page.locator(this.selectors.subMenuBtnCd(text));
      await this.waitForVisible(locator);
      await locator.click();
    }

    async clickMenuButton(): Promise<void> {
      await this.openActionMenu(this.selectors.actionMenuButton);
    }

    async clickClearButton(): Promise<void> {
      const locator = this.page.locator(this.selectors.clearButton);
      await this.waitForVisible(locator);
      await locator.click();
    }

    /**
     * Wait for form to be ready
     */
    async waitForFormReady(): Promise<void> {
    await this.waitForVisible(this.page.locator(this.selectors.baseDateInput));
  }

    /**
     * Check redirect success by URL fragment or visible body text
     */
    async verifyRedirectSuccess(
      options: { urlFragment?: string; bodyText?: string },
      timeout: number = 10000
    ): Promise<boolean> {
      if (options.urlFragment) {
        try {
          await this.page.waitForURL(new RegExp(options.urlFragment), { timeout });
          return true;
        } catch {}
      }
      if (options.bodyText) {
        return await this.waitForTextInBody(options.bodyText, timeout);
      }
      return false;
    }

    async checkValueInput(selectorOrLocator: string | Locator, timeout: number = 10000): Promise<string> {
      const locator = typeof selectorOrLocator === 'string'
        ? this.page.locator(selectorOrLocator)
        : selectorOrLocator;
      await this.waitForVisible(locator, timeout);
      return await locator.inputValue();
    }

    async clickItemMenuByText(itemText: string): Promise<void> {
      await this.page.getByRole('menuitem', { name: itemText }).click();
    }

}