/**
 * WTY31003 Stock Supply Request Product Input Page Object
 * Page Object for 供給移動依頼商品入力 screen
 */

import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../base.page";

export class WTY31004Page extends BasePage {
  private readonly selectors = {
    pageTitle: "text=在庫C対応状況",
    // input selectors
    kakaInput: "input#kata_Label",
    tHaiSuInput: "input#tHaiSu_Label",
    kkyRhinInput: "input#kkyRhin_Label",
    tenjiInput: "input#tenji_Label",
    tSuInput: "input#tSu_Label",
    kisoInput: "input#kiso_Label",
    commentInput: "textarea[name='comment_TextArea']",

    // table field selectors
    denSbtColumn: 'div.multi-row-header-cell:has-text("種別")',
    denNoColumn: 'div.multi-row-header-cell:has-text("発注/伝票番号")',
    shijiDateColumn: 'div.multi-row-header-cell:has-text("指示日")',
    suColumn: 'div.multi-row-header-cell:has-text("数量")',
    zokuColumn: 'div.multi-row-header-cell:has-text("属性")',
    noukiColumn: 'div.multi-row-header-cell:has-text("納入予定日")',
    jotaiColumn: 'div.multi-row-header-cell:has-text("状態")',
    shukkoBtenColumn: 'div.multi-row-header-cell:has-text("出庫部店")',
    tbodyAgrid: 'div.ag-center-cols-container[role="rowgroup"]',
    rowTable: '.ag-center-cols-container div[role="row"][row-index="0"]',
  };

  async navigate(pilotKey: string = "prod"): Promise<void> {
    const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTY31004StockSupplyRequestsCheck?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
    await this.goto(url);
    await this.page.waitForTimeout(1000);
  }

  async getPageTitle(): Promise<boolean> {
    return await this.page
      .locator(this.selectors.pageTitle)
      .first()
      .isVisible();
  }

  async isInputsDisplayed(): Promise<boolean> {
    const inputs = [
      this.page.locator(this.selectors.kakaInput),
      this.page.locator(this.selectors.tHaiSuInput),
      this.page.locator(this.selectors.kkyRhinInput),
      this.page.locator(this.selectors.tenjiInput),
      this.page.locator(this.selectors.tSuInput),
      this.page.locator(this.selectors.kisoInput),
      this.page.locator(this.selectors.commentInput),
    ];

    for (const input of inputs) {
      if (!(await input.isVisible())) {
        return false;
      }
    }
    return true;
  }

  async isTableColumnsDisplayed(): Promise<boolean> {
    const columns = [
      this.page.locator(this.selectors.denSbtColumn),
      this.page.locator(this.selectors.denNoColumn),
      this.page.locator(this.selectors.shijiDateColumn),
      this.page.locator(this.selectors.suColumn),
      this.page.locator(this.selectors.zokuColumn),
      this.page.locator(this.selectors.noukiColumn),
      this.page.locator(this.selectors.jotaiColumn),
      this.page.locator(this.selectors.shukkoBtenColumn),
    ];

    for (const column of columns) {
      if (!(await column.isVisible())) {
        return false;
      }
    }
    return true;
  }

  async isAgGridEmpty(): Promise<boolean> {
    const container = this.page.locator(this.selectors.tbodyAgrid);
    const html = await container.innerHTML();
    return html.trim() === "";
  }

  async scrollTextareaToBottom(): Promise<boolean> {
    return await this.page
      .locator(this.selectors.commentInput)
      .evaluate((el: HTMLTextAreaElement) => {
        if (el.scrollHeight > el.clientHeight) {
          el.scrollTop = el.scrollHeight;
          return true;
        }
        return false;
      });
  }

  async getValueRowFirst(columnIndex: number): Promise<string> {
    const firstRow = this.page.locator(this.selectors.rowTable).first();

    return await firstRow
      .locator(".multi-row-cell-sub-row")
      .first()
      .locator(".multi-row-cell-item")
      .nth(columnIndex)
      .locator("span")
      .innerText();
  }

  async getValueRowSecond(columnIndex: number): Promise<string> {
    const secondRow = this.page.locator(this.selectors.rowTable).first();

    return await secondRow
      .locator(".multi-row-cell-sub-row")
      .nth(1)
      .locator(".multi-row-cell-item")
      .nth(columnIndex)
      .locator("span")
      .innerText();
  }
}
