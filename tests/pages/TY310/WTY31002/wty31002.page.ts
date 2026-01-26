/**
 * WTY31001 Stock Supply Request Product Input Page Object
 * Page Object for 供給移動依頼商品入力 screen
 */

import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../base.page";

export class WTY31002Page extends BasePage {
  private readonly selectors = {
    pageTitle: "text=供給移動依頼登録",

    // Menu
    actionMenuButton: 'button.MuiButtonBase-root[aria-haspopup="true"]',
    btnEdit: 'ul[role="menu"] li[role="menuitem"] span:has-text("商品修正")',
    btnProductInput:
      'ul[role="menu"] li[role="menuitem"] span:has-text("商品入力")',
    btnModelNumSearch:
      'ul[role="menu"] li[role="menuitem"] span:has-text("型番検索")',
    btnProductCancel:
      'ul[role="menu"] li[role="menuitem"] span:has-text("商品取消")',
    btnRequestCancel:
      'ul[role="menu"] li[role="menuitem"] span:has-text("依頼取消")',
    confirmButton: 'button:has-text("確定")',

    // Input Fields
    iriNoInput: 'input[id="iriNo_Label"]',
    iriDateInput: 'input[id="iriDate_Label"]',
  };

  async navigate(pilotKey: string = "prod"): Promise<void> {
    const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTY31002StockSupplyRequestsRegist?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
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

  async getPageTitle(): Promise<boolean> {
    return await this.page
      .locator(this.selectors.pageTitle)
      .first()
      .isVisible();
  }

  async btnMenuIsVisible(): Promise<boolean> {
    const btns = [
      this.selectors.btnEdit,
      this.selectors.btnProductInput,
      this.selectors.btnModelNumSearch,
      this.selectors.btnProductCancel,
      this.selectors.btnRequestCancel,
    ];
    for (const btnSelector of btns) {
      const isVisible = await this.page.locator(btnSelector).isVisible();
      if (!isVisible) {
        return false;
      }
    }
    return true;
  }

  async isConfirmButtonVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.confirmButton).isVisible();
  }

  async isIriNoInputVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.iriNoInput).isVisible();
  }

  async isIriDateInputVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.iriDateInput).isVisible();
  }

  async isIriNoInputReadonly(): Promise<boolean> {
    return await this.page.locator(this.selectors.iriNoInput).isDisabled();
  }

  async isIriDateInputReadonly(): Promise<boolean> {
    return await this.page.locator(this.selectors.iriDateInput).isDisabled();
  }
}
