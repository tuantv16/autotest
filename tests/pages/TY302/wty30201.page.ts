/**
 * WTY30201 Product Price Output Instructions Page Object
 * Page Object for 商品プライス出力指示 screen
 */

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base.page';

export class TY30201Page extends BasePage {
  // Selectors
  private readonly selectors = {
    // Form fields
    outDateInput: 'input[name="outDate"]',
    layoutInput: '#layout',
    shnCdInput: '#shnCd',
    makerDisplayInput: '#makerDisplay',
    bunruiDisplayInput: '#bunruiDisplay',
    kataDisplayInput: '#kataDisplay',
    mockLabelDisplayInput: '#mockLabelDisplay',
    mocInput: '#moc',
    bkInput: '#bk',
    sizeInput: '#size',
    msuInput: '#msu',
    zaiYDisplayInput: '#zaiYDisplay',
    zaiTDisplayInput: '#zaiTDisplay',
    zaiMDisplayInput: '#zaiMDisplay',
    zaiBDisplayInput: '#zaiBDisplay',

    // Buttons
    actionMenuButton: 'button.MuiButtonBase-root[aria-haspopup="true"]',
    confirmButton: 'button:has-text("確定")',
    clearButton: 'button:has-text("クリア")',
    searchButton: 'button:has-text("検索")[type="button"]',
    barCodeButton: 'div.right-2.absolute.top-1\\/2.-translate-y-1\\/2.transform button.cursor-pointer[type="button"]',
    clearOutDate: '#outDate div div span[data-testid="ClearButton"]',
    clearShnCd: '#shnCd+div+div span[data-testid="ClearButton"]',
    outDateCommitButton: 'button:has-text("出力日確定")',

  };
    constructor(page: Page) {
    super(page);
  }

    get selectorsObj() {
      return {
        outDateInput: this.selectors.outDateInput,
        layoutInput: this.selectors.layoutInput,
        shnCdInput: this.selectors.shnCdInput,
        makerDisplayInput: this.selectors.makerDisplayInput,
        bunruiDisplayInput: this.selectors.bunruiDisplayInput,
        kataDisplayInput: this.selectors.kataDisplayInput,
        mockLabelDisplayInput: this.selectors.mockLabelDisplayInput,
        mocInput: this.selectors.mocInput,
        bkInput: this.selectors.bkInput,
        sizeInput: this.selectors.sizeInput,
        msuInput: this.selectors.msuInput,
        zaiYDisplayInput: this.selectors.zaiYDisplayInput,
        zaiTDisplayInput: this.selectors.zaiTDisplayInput,
        zaiMDisplayInput: this.selectors.zaiMDisplayInput,
        zaiBDisplayInput: this.selectors.zaiBDisplayInput,
        actionMenuButton: this.selectors.actionMenuButton,
        confirmButton: this.selectors.confirmButton,
        clearButton: this.selectors.clearButton,
        searchButton: this.selectors.searchButton,
        barCodeButton: this.selectors.barCodeButton,
        clearOutDate: this.selectors.clearOutDate,
        clearShnCd: this.selectors.clearShnCd,
        outDateCommitButton: this.selectors.outDateCommitButton,
      };
    }

    /**
     * Navigate to WTY10301 Summary Input screen
     * */
  async navigate(pilotKey: string = 'prod'): Promise<void> {
    const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTY30201ProductPricePrintInstruction?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
    await this.goto(url);
  } 

    async clickOutDateCommit(): Promise<void> {
        await this.page.locator(this.selectors.outDateCommitButton).click();
    }

    async fillOutDate(date: string): Promise<void> {
        await this.fillInput(this.page.locator(this.selectors.outDateInput), date);
    }

    async fillShnCd(shnCd: string): Promise<void> {
        await this.fillInput(this.page.locator(this.selectors.shnCdInput), shnCd);
    }

    async fillMoc(moc: string): Promise<void> {
        await this.fillInput(this.page.locator(this.selectors.mocInput), moc);
    }

    async fillBk(bk: string): Promise<void> {
        await this.fillInput(this.page.locator(this.selectors.bkInput), bk);
    }

    async fillMsu(msu: string): Promise<void> {
        await this.fillInput(this.page.locator(this.selectors.msuInput), msu);
    }

    async clickSearch(): Promise<void> {
        await this.page.locator(this.selectors.searchButton).click();
    }

    async clickClear(): Promise<void> {
        await this.page.locator(this.selectors.clearButton).click();
    }

    async clickConfirm(): Promise<void> {
        await this.page.locator(this.selectors.confirmButton).click();
    }

    async clickBarCode(): Promise<void> {
        await this.page.locator(this.selectors.barCodeButton).click();
    }

    async clickActionMenu(): Promise<void> {
        await this.page.locator(this.selectors.actionMenuButton).click();
    }

    async clickClearOutDate(): Promise<void> {
        await this.page.locator(this.selectors.clearOutDate).click();
    }

    async clickClearShnCd(): Promise<void> {
        await this.page.locator(this.selectors.clearShnCd).click();
    }

    async waitForFormReady(): Promise<void> {
        await this.waitForVisible(this.page.locator(this.selectors.outDateInput));
        await this.page.waitForTimeout(500);
    }

    async clickSizeInput(): Promise<void> {
        await this.page.locator(this.selectors.sizeInput).click();
    }

    async scrollToBottom(): Promise<void> {
      await this.page.evaluate(() => {
    const scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );

    const maxScrollTop = scrollHeight - window.innerHeight;

    window.scrollTo(0, maxScrollTop / 2);
  });
    }
}