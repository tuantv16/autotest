/**
 * WTY31001 Stock Supply Request Product Input Page Object
 * Page Object for 供給移動依頼商品入力 screen
 */

import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../base.page";

export interface WTY31001FormData {
  productCode?: string;
  goodsRequest?: string;
  displayRequest?: string;
  unpackingRequest?: string;
  constantRequest?: string;
  basicRequest?: string;
  constantDelete?: boolean;
  mode?: "supply" | "return"; // 1: 供給, 2: 返品
}

export class WTY31001Page extends BasePage {
  // Selectors
  private readonly selectors = {
    // Page title
    pageTitle: 'div:has-text("供給移動依頼商品入力")',
    // Radio buttons for mode
    kkyRadio: 'input[type="radio"][name="mode"][value="1"]',
    hpnRadio: 'input[type="radio"][name="mode"][value="2"]',

    // Form fields
    productInput: 'input[id="shn_TextBox"]',
    searchButton: 'button span:has-text("検索")',
    clearProductButton: 'img[alt="クリア"]',

    // Input fields
    rHinIriInput: 'input[id="rHinIri_TextBox"]',
    tenjiIriInput: 'input[id="tenjiIri_TextBox"]',
    kaikonIriInput: 'input[id="kaikonIri_TextBox"]',
    tSuIriInput: 'input[id="tSuIri_TextBox"]',
    kisoIriInput: 'input[id="kisoIri_TextBox"]',

    // Toggle/Checkbox
    tSuDelToggle: 'button:has-text("定数削除")',

    // Read-only fields
    gyoNoLabel: 'input[id="gyoNo_Label"]',
    kataLabel: 'input[id="kata_Label"]',
    mkLabel: 'input[id="mk_Label"]',
    rnkLabel: 'input[id="rnk_Label"]',
    bKbnLabel: 'input[id="bKbn_Label"]',
    shnNmLabel: 'input[id="shnNm_Label"]',

    // Buttons
    actionMenuButton: 'button.MuiButtonBase-root[aria-haspopup="true"]',
    confirmButton: 'button:has-text("確定")',
    clearButton: 'button:has-text("クリア")',
    requestSearchButton:
      'ul[role="menu"] li[role="menuitem"] span:has-text("依頼検索")',
    arrivalScheduleButton:
      'ul[role="menu"] li[role="menuitem"] span:has-text("入荷予定")',

    // Error messages
    errorMessage: ".error-message, .MuiFormHelperText-root.Mui-error",
    errorDialog: "#wty31001-error-dialog",
  };

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to WTY31001 Product Input screen
   */
  async navigate(pilotKey: string = "prod"): Promise<void> {
    const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTY31001StockSupplyRequestsIndex`;
    await this.goto(url);
    await this.page.waitForTimeout(1000);
  }

  /**
   * Wait for form to be ready
   */
  async waitForFormReady(): Promise<void> {
    await this.page.waitForSelector(
      `${this.selectors.kkyRadio}, ${this.selectors.hpnRadio}`,
      { state: "visible", timeout: 10000 },
    );
  }

  /**
   * Check if page title is displayed correctly
   */
  async getPageTitle(): Promise<boolean> {
    return await this.page.locator(this.selectors.pageTitle).first().isVisible();
  }

  async openMenu(): Promise<void> {
    const menuButton = this.page
      .locator(this.selectors.actionMenuButton)
      .first();
    const isMenuOpen = await this.page
      .locator(this.selectors.requestSearchButton)
      .isVisible()
      .catch(() => false);

    if (!isMenuOpen) {
      await menuButton.click();
      await this.page.waitForTimeout(500);
    }
  }

  /**
   * Check item menu
   */
  async isRequestSearchButtonVisible(): Promise<boolean> {
    return await this.page
      .locator(this.selectors.requestSearchButton)
      .isVisible();
  }
  async isArrivalScheduleButtonVisible(): Promise<boolean> {
    return await this.page
      .locator(this.selectors.arrivalScheduleButton)
      .isVisible();
  }

  async isConfirmButtonVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.confirmButton).isVisible();
  }
  async isClearButtonButtonVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.clearButton).isVisible();
  }
}
