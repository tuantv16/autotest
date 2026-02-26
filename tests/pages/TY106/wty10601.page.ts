/**
 * WTY10601 - 在庫一覧照会 screen
 */

import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../base.page";

export interface WTY10601FormData {
  productCode?: string;
  goodsRequest?: string;
  displayRequest?: string;
  unpackingRequest?: string;
  constantRequest?: string;
  basicRequest?: string;
  constantDelete?: boolean;
  mode?: "supply" | "return"; // 1: 供給, 2: 返品
}

type ExcludeKeys<T> = {
  exclude?: (keyof T)[];
};

export class WTY10601Page extends BasePage {
  private readonly selectors = {
    pageTitle: 'div:has-text("在庫一覧照会")',

    // Inputs fields
    btenCdInput: "input#btenCd",
    btenCdClearBtn: "#btenCd + img[data-testid='ClearButton']",
    btenNmInput: "input#btenNm",
    shnCdInput: "input#shnCd",
    shnCdClearBtn: "#shnCd ~ img[data-testid='ClearButton']",
    brCdInput: "input#brCd",
    brCdClearBtn: "#brCd + img[data-testid='ClearButton']",
    brNmInput: "input#brNm",

    // Radio buttons
    hjZaiYRadio: 'input[name="hjZai"][value="1"]',
    hjZaiJRadio: 'input[name="hjZai"][value="2"]',
    zaiBtenDRadio: 'input[name="setShnFlg"][value="0"]',
    zaiBtenJRadio: 'input[name="setShnFlg"][value="1"]',
    btnToggle: "#btn-toggle button",

    // Search buttons
    buttonSearch: 'button:has-text("検索")',

    // Table
    tbodyAgrid: 'div.ag-center-cols-container[role="rowgroup"]',
    rowTable: '.ag-center-cols-container div[role="row"][row-index="0"]',

    // Menu buttons
    actionMenuButton: 'button.MuiButtonBase-root[aria-haspopup="true"]',
    btnInfoProduct:
      'ul[role="menu"] li[role="menuitem"] span:has-text("商品基本")',
    btnInventoryByStore:
      'ul[role="menu"] li[role="menuitem"] span:has-text("店別在庫")',
    btnCart: 'ul[role="menu"] li[role="menuitem"] span:has-text("カート")',
    btnOrder: 'ul[role="menu"] li[role="menuitem"] span:has-text("オーダー")',
    btnProductPrice:
      'ul[role="menu"] li[role="menuitem"] span:has-text("商品価格")',
    btnClear: 'button:has-text("クリア")',

    // Menu popup
    searchStore: 'button:has-text("部店検索")',
    searchDaiCd: 'button:has-text("中分類")',
    searchChuCd: 'button:has-text("小分類")',

    // Items table
    mkKataColumnHeader:
      'div.ag-header-cell-label span.ag-header-cell-text:has-text("型番")',
    shnZhlvColumnHeader:
      'div.ag-header-cell-label span.ag-header-cell-text:has-text("引")',
    shnRnkColumnHeader:
      'div.ag-header-cell-label span.ag-header-cell-text:has-text("RK")',
    btrKbnColumnHeader:
      'div.ag-header-cell-label span.ag-header-cell-text:has-text("物")',
    rhinzaiMkiknColumnHeader:
      'div.ag-header-cell-label span.ag-header-cell-text:has-text("新品")',
    tenjiZaiColumnHeader:
      'div.ag-header-cell-label span.ag-header-cell-text:has-text("展示")',
    kiknhnColumnHeader:
      'div.ag-header-cell-label span.ag-header-cell-text:has-text("開梱")',
    kkhoZaiColumnHeader:
      'div.ag-header-cell-label span.ag-header-cell-text:has-text("確保")',
    tokutenZaiColumnHeader:
      'div.ag-header-cell-label span.ag-header-cell-text:has-text("特定")',
    fryohnColumnHeader:
      'div.ag-header-cell-label span.ag-header-cell-text:has-text("不良")',
    zaiSaiColumnHeader:
      'div.ag-header-cell-label span.ag-header-cell-text:has-text("差異")',
    jituZaikoColumnHeader:
      'div.ag-header-cell-label span.ag-header-cell-text:has-text("計")',
  };

  async navigate(pilotKey: string = "prod"): Promise<void> {
    const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTY10601StockList?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
    await this.goto(url);
    await this.page.waitForTimeout(1000);
  }

  async openMenu(): Promise<void> {
    const menuButton = this.page
      .locator(this.selectors.actionMenuButton)
      .first();
    const isMenuOpen = await this.page
      .locator(this.selectors.btnInfoProduct)
      .isVisible()
      .catch(() => false);

    if (!isMenuOpen) {
      await menuButton.click();
      await this.page.waitForTimeout(500);
    }
  }

  async btnMenuIsVisible(): Promise<boolean> {
    const btns = [
      this.selectors.btnInfoProduct,
      this.selectors.btnInventoryByStore,
      this.selectors.btnCart,
      this.selectors.btnOrder,
      this.selectors.btnProductPrice,
    ];
    for (const btnSelector of btns) {
      const isVisible = await this.page.locator(btnSelector).isVisible();
      if (!isVisible) {
        return false;
      }
    }
    return true;
  }

  async btnClearIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.btnClear).isVisible();
  }

  async getPageTitle(): Promise<boolean> {
    return await this.page
      .locator(this.selectors.pageTitle)
      .first()
      .isVisible();
  }

  async btenCdInputVisible(): Promise<boolean> {
    return await this.page
      .locator(this.selectors.btenCdInput)
      .first()
      .isVisible();
  }

  async btenNmInputVisible(): Promise<boolean> {
    return await this.page
      .locator(this.selectors.btenNmInput)
      .first()
      .isVisible();
  }

  async btenNmInputDisabled(): Promise<boolean> {
    return await this.page
      .locator(this.selectors.btenNmInput)
      .first()
      .isDisabled();
  }

  async brNmInputDisabled(): Promise<boolean> {
    return await this.page
      .locator(this.selectors.brNmInput)
      .first()
      .isDisabled();
  }

  async shnCdInputVisible(): Promise<boolean> {
    return await this.page
      .locator(this.selectors.shnCdInput)
      .first()
      .isVisible();
  }

  async brCdInputVisible(): Promise<boolean> {
    return await this.page
      .locator(this.selectors.brCdInput)
      .first()
      .isVisible();
  }

  async brNmInputVisible(): Promise<boolean> {
    return await this.page
      .locator(this.selectors.brNmInput)
      .first()
      .isVisible();
  }

  async getErrorMessageDialog(): Promise<string> {
    const dialog = this.page.locator("#wty10601-error-dialog");
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

  async areGridColumnsVisible(): Promise<boolean> {
    const columnSelectors = [
      this.selectors.mkKataColumnHeader,
      this.selectors.shnZhlvColumnHeader,
      this.selectors.shnRnkColumnHeader,
      this.selectors.btrKbnColumnHeader,
      this.selectors.rhinzaiMkiknColumnHeader,
      this.selectors.tenjiZaiColumnHeader,
      this.selectors.kiknhnColumnHeader,
      this.selectors.kkhoZaiColumnHeader,
      this.selectors.tokutenZaiColumnHeader,
      this.selectors.fryohnColumnHeader,
      this.selectors.zaiSaiColumnHeader,
      this.selectors.jituZaikoColumnHeader,
    ];

    for (const selector of columnSelectors) {
      const isVisible = await this.page.locator(selector).isVisible();
      if (!isVisible) {
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

  async hjZaiYRadioVisible(): Promise<boolean> {
    return (await this.page.locator(this.selectors.hjZaiYRadio).count()) > 0;
  }

  async hjZaiJRadioVisible(): Promise<boolean> {
    return (await this.page.locator(this.selectors.hjZaiJRadio).count()) > 0;
  }

  async hjZaiYRadioChecked(): Promise<boolean> {
    return await this.page
      .locator(this.selectors.hjZaiYRadio)
      .first()
      .isChecked();
  }

  async zaiBtenDRadioVisible(): Promise<boolean> {
    return (await this.page.locator(this.selectors.zaiBtenDRadio).count()) > 0;
  }

  async zaiBtenJRadioVisible(): Promise<boolean> {
    return (await this.page.locator(this.selectors.zaiBtenJRadio).count()) > 0;
  }

  async zaiBtenDRadioChecked(): Promise<boolean> {
    return await this.page
      .locator(this.selectors.zaiBtenDRadio)
      .first()
      .isChecked();
  }

  async isRadioClosed(): Promise<boolean> {
    const section = this.page.locator("div.transition-all").first();

    const classAttr = await section.getAttribute("class");
    return classAttr?.includes("opacity-0") ?? false;
  }

  async isRadioOpened(): Promise<boolean> {
    const section = this.page.locator("div.transition-all").first();

    const classAttr = await section.getAttribute("class");
    return classAttr?.includes("opacity-100") ?? false;
  }

  async clickBtnToggle(): Promise<void> {
    await this.page.click(this.selectors.btnToggle);
  }

  async buttonSearchIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.buttonSearch).isVisible();
  }

  async buttonSearchIsClickable(): Promise<boolean> {
    const button = this.page.locator(this.selectors.buttonSearch);
    return await button.isEnabled();
  }

  async focusBtenCdInput(): Promise<void> {
    await this.page.focus(this.selectors.btenCdInput);
  }

  async searchStoreButtonIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.searchStore).isVisible();
  }

  async focusBrCdInput(): Promise<void> {
    await this.page.focus(this.selectors.brCdInput);
  }

  async searchDaiCdButtonIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.searchDaiCd).isVisible();
  }

  async searchChuCdButtonIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.searchChuCd).isVisible();
  }

  async clickButtonSearch(): Promise<void> {
    await this.page.locator(this.selectors.buttonSearch).first().click();
  }

  async blurShnCdInput(): Promise<void> {
    await this.page.locator(this.selectors.shnCdInput).first().blur();
  }

  async blurBrCdInput(): Promise<void> {
    await this.page.locator(this.selectors.brCdInput).first().blur();
  }

  async clickBtenCdClearBtn(): Promise<void> {
    await this.page.locator(this.selectors.btenCdClearBtn).first().click();
  }

  async clickShnCdClearBtn(): Promise<void> {
    await this.page.locator(this.selectors.shnCdClearBtn).first().click();
  }

  async clickBrCdClearBtn(): Promise<void> {
    await this.page.locator(this.selectors.brCdClearBtn).first().click();
  }

  async clickFirstRow(): Promise<void> {
    const firstRow = this.page.locator(this.selectors.rowTable);
    await firstRow.click();
  }
}
