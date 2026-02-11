/**
 * WTY31003 Stock Supply Request Product Input Page Object
 * Page Object for 供給移動依頼商品入力 screen
 */

import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../base.page";

export class WTY31003Page extends BasePage {
  private readonly selectors = {
    pageTitle: "text=供給移動依頼検索",

    tanCdLabel: 'label:has-text("担当者")',
    tanCdInput: 'input[id="tanCd_TextBox"]',
    tanNmInput: 'input[id="tanNm_Label"]',
    iraiDateFromInput: 'input[name="iraiDateFrom_TextBox"]',
    iraiDateToInput: 'input[name="iraiDateTo_TextBox"]',
    bnrCdLabel: 'label:has-text("商品範囲")',
    bnrCdInput: 'input[id="bnrCd_TextBox"]',
    bnrNmInput: 'input[id="bnrNm_Label"]',
    shnLabel: 'label:has-text("商品")',
    shnInput: 'input[id="shn_TextBox"]',
    kataLabel: 'label:has-text("型番")',
    kataInput: 'input[id="kata_Label"]',
    clearTanCdInput:
      '#tanCd_TextBox >> xpath=following-sibling::img[@data-testid="ClearButton"]',

    buttonSearch: 'button:has-text("検索")',

    // Items table
    iriNoColumnHeader: 'div.multi-row-header-cell:has-text("依頼番号")',
    iriDateColumnHeader: 'div.multi-row-header-cell:has-text("依頼日")',
    iriTanColumnHeader: 'div.multi-row-header-cell:has-text("依頼担当")',
    kkyHpnColumnHeader: 'div.multi-row-header-cell:has-text("供/返")',
    statusColumnHeader: 'div.multi-row-header-cell:has-text("状況")',
    tkCommentColumnHeader: 'div.multi-row-header-cell:has-text("定型コメント")',
    kanryoDateColumnHeader: 'div.multi-row-header-cell:has-text("完了日")',
    tbodyAgrid: 'div.ag-center-cols-container[role="rowgroup"]',
    rowTable: '.ag-center-cols-container div[role="row"][row-index="0"]',

    // Menu
    actionMenuButton: 'button.MuiButtonBase-root[aria-haspopup="true"]',
    btnEdit: 'ul[role="menu"] li[role="menuitem"] span:has-text("依頼修正")',
    btnRequestInquiry:
      'ul[role="menu"] li[role="menuitem"] span:has-text("依頼照会")',
    clearButton: 'button:has-text("クリア")',

    search2nd: 'button:has-text("中分類")',
    search3nd: 'button:has-text("小分類")',
    searchModelNo: 'button:has-text("型番検索")',

    // Button popup
    buttonViewPro: 'button:has-text("依頼照会")',
    buttonEditPro: 'button:has-text("依頼修正")',
  };

  async navigate(pilotKey: string = "prod"): Promise<void> {
    const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTY31003StockSupplyRequestsSearch?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
    await this.goto(url);
    await this.page.waitForTimeout(1000);
  }

  async openMenu(): Promise<void> {
    const menuButton = this.page
      .locator(this.selectors.actionMenuButton)
      .first();
    const isMenuOpen = await this.page
      .locator(this.selectors.btnEdit)
      .isVisible()
      .catch(() => false);

    if (!isMenuOpen) {
      await menuButton.click();
      await this.page.waitForTimeout(500);
    }
  }

  async btnMenuIsVisible(): Promise<boolean> {
    const btns = [this.selectors.btnEdit, this.selectors.btnRequestInquiry];
    for (const btnSelector of btns) {
      const isVisible = await this.page.locator(btnSelector).isVisible();
      if (!isVisible) {
        return false;
      }
    }
    return true;
  }

  async isClearButtonButtonVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.clearButton).isVisible();
  }

  async clickClearButton(): Promise<void> {
    await this.page.locator(this.selectors.clearButton).click();
  }

  async scrollToBottom(): Promise<void> {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await this.page.waitForTimeout(1000);
  }

  async getPageTitle(): Promise<boolean> {
    return await this.page
      .locator(this.selectors.pageTitle)
      .first()
      .isVisible();
  }

  async areGridColumnsVisible(): Promise<boolean> {
    const columnSelectors = [
      this.selectors.iriNoColumnHeader,
      this.selectors.iriDateColumnHeader,
      this.selectors.iriTanColumnHeader,
      this.selectors.kkyHpnColumnHeader,
      this.selectors.statusColumnHeader,
      this.selectors.tkCommentColumnHeader,
      this.selectors.kanryoDateColumnHeader,
    ];

    for (const selector of columnSelectors) {
      const isVisible = await this.page.locator(selector).isVisible();
      if (!isVisible) {
        return false;
      }
    }
    return true;
  }

  async areFieldsVisible(): Promise<boolean> {
    const columnSelectors = [
      this.selectors.tanCdInput,
      this.selectors.tanNmInput,
      this.selectors.iraiDateFromInput,
      this.selectors.iraiDateToInput,
      this.selectors.bnrCdInput,
      this.selectors.bnrNmInput,
      this.selectors.shnInput,
      this.selectors.kataInput,
    ];

    for (const selector of columnSelectors) {
      const isVisible = await this.page.locator(selector).isVisible();
      if (!isVisible) {
        return false;
      }
    }
    return true;
  }

  async clickButtonEdit(): Promise<void> {
    const button = this.page.locator(this.selectors.btnEdit);
    await button.click();
  }

  async clickButtonRequestInquiry(): Promise<void> {
    const button = this.page.locator(this.selectors.btnRequestInquiry);
    await button.click();
  }

  async getErrorMessageDialog(): Promise<string> {
    const dialog = this.page.locator("#wty31003-error-dialog");
    if ((await dialog.count()) === 0) {
      return "";
    }
    const message = dialog.locator("p").first();
    return await message.innerText();
  }

  async getFieldErrorMessage(fieldLabel: string): Promise<string> {
    const labelLocator = this.page.locator(`label:has-text("${fieldLabel}")`);
    const parentContainer = labelLocator.locator("..");
    const errorMessage = parentContainer.locator("p.text-red-600");
    const text = await errorMessage.textContent().catch(() => null);
    return text || "";
  }

  async getFieldErrorMessageById(fieldId: string): Promise<string> {
    const fieldContainer = this.page.locator(`#${fieldId}`);
    const errorMessage = fieldContainer.locator("..").locator("p.text-red-600");

    const text = await errorMessage.textContent().catch(() => null);
    return text?.trim() || "";
  }

  async clickSearchButton(): Promise<void> {
    await this.page.locator(this.selectors.buttonSearch).first().click();
  }

  async clearTanCdInputClick(): Promise<void> {
    const clearTanCdInput = this.page.locator(this.selectors.clearTanCdInput);
    await clearTanCdInput.click();
  }

  async fillInputTanCd(value: string): Promise<void> {
    const input = this.page.locator(this.selectors.tanCdInput);
    await input.fill(value);
  }

  async blurInputTanCd(): Promise<void> {
    const input = this.page.locator(this.selectors.tanCdInput);
    await input.blur();
  }

  async fillValueIraiDateFrom(value: string): Promise<void> {
    const input = this.page.locator(this.selectors.iraiDateFromInput);
    await input.click();
    await input.fill(value);
    await input.blur();
  }

  async blurInputIraiDateFrom(): Promise<void> {
    const input = this.page.locator(this.selectors.iraiDateFromInput);
    await input.blur();
  }

  async getValueIraiDateFrom(): Promise<string> {
    const input = this.page.locator(this.selectors.iraiDateFromInput);
    return input.inputValue();
  }

  async fillValueIraiDateTo(value: string): Promise<void> {
    const input = this.page.locator(this.selectors.iraiDateToInput);
    await input.click();
    await input.fill(value);
    await input.blur();
  }

  async getValueIraiDateTo(): Promise<string> {
    const input = this.page.locator(this.selectors.iraiDateToInput);
    return input.inputValue();
  }

  async getValueTanNm(): Promise<string> {
    const tanNmInput = this.page.locator(this.selectors.tanNmInput);
    return tanNmInput.inputValue();
  }

  async fillInputShnCd(value: string): Promise<void> {
    const input = this.page.locator(this.selectors.shnInput);
    await input.fill(value);
  }

  async blurInputShnCd(): Promise<void> {
    const input = this.page.locator(this.selectors.shnInput);
    await input.blur();
  }

  async isTanNmDisplayed(): Promise<boolean> {
    const tanNmInput = this.page.locator(this.selectors.tanNmInput);
    return tanNmInput.isDisabled();
  }

  async isBnrNmDisplayed(): Promise<boolean> {
    const bnrNmInput = this.page.locator(this.selectors.bnrNmInput);
    return bnrNmInput.isDisabled();
  }

  async isKataDisplayed(): Promise<boolean> {
    const kataInput = this.page.locator(this.selectors.kataInput);
    return kataInput.isDisabled();
  }

  async isAgGridEmpty(): Promise<boolean> {
    const container = this.page.locator(this.selectors.tbodyAgrid);
    const html = await container.innerHTML();
    return html.trim() === "";
  }

  async focusBnrCdInput(): Promise<void> {
    await this.page.locator(this.selectors.bnrCdInput).focus();
  }

  async fillBnrCdInput(value: string): Promise<void> {
    await this.page.locator(this.selectors.bnrCdInput).fill(value);
  }

  async search2ndButtonVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.search2nd).isVisible();
  }

  async search3ndButtonVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.search3nd).isVisible();
  }

  async focusShnInput(): Promise<void> {
    await this.page.locator(this.selectors.shnInput).focus();
  }

  async searchModelNoButtonVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.searchModelNo).isVisible();
  }

  async isButtonViewProVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.buttonViewPro).isVisible();
  }

  async isButtonEditProVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.buttonEditPro).isVisible();
  }

  async clickFirstRow(): Promise<void> {
    const firstRow = this.page.locator(this.selectors.rowTable);
    await firstRow.click();
  }
}
