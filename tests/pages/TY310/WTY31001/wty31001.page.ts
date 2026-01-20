/**
 * WTY31001 Stock Supply Request Product Input Page Object
 * Page Object for 供給移動依頼商品入力 screen
 */

import { Page, Locator, expect } from "@playwright/test";
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

type ExcludeKeys<T> = {
  exclude?: (keyof T)[];
};

export class WTY31001Page extends BasePage {
  // Selectors
  private readonly selectors = {
    // Page title
    pageTitle: 'div:has-text("供給移動依頼商品入力")',
    // Radio buttons for mode
    modeLabel: 'label[for="mode"]',
    kkyRadio: 'input[type="radio"][name="mode"][value="1"]',
    hpnRadio: 'input[type="radio"][name="mode"][value="2"]',

    // Form fields
    productInput: 'input[id="shn_TextBox"]',
    productLabel: 'label[for="shn_TextBox"]',
    searchButton: 'button span:has-text("検索")',
    clearProductButton: 'img[alt="クリア"]',

    // Read-only fields
    gyoNoInput: 'input[id="gyoNo_Label"]',
    gyoNoLabel: 'div.content-center:has-text("行No")',
    kataInput: 'input[id="kata_Label"]',
    kataLabel: 'label[for="kata_Label"]',
    mkInput: 'input[id="mk_Label"]',
    mkLabel: 'label[for="mk_Label"]',
    rnkInput: 'input[id="rnk_Label"]',
    rnkLabel: 'label[for="rnk_Label"]',
    bKbnInput: 'input[id="bKbn_Label"]',
    bKbnLabel: 'label[for="bKbn_Label"]',
    shnNmInput: 'input[id="shnNm_Label"]',
    shnNmLabel: 'label[for="shnNm_Label"]',
    hbJsk4Input: 'input[id="hbJsk4"]',
    hbJsk3Input: 'input[id="hbJsk3"]',
    hbJsk2Input: 'input[id="hbJsk2"]',
    hbJsk1Input: 'input[id="hbJsk1"]',
    hbJskLabel: 'label:has-text("販売実績(-4/-3/-2/-1)")',
    gZaiInput: 'input[id="gZai_Label"]',
    gZaiLabel: 'label[for="gZai_Label"]',
    yukoZaiInput: 'input[id="yukoZai_Label"]',
    yukoZaiLabel: 'label[for="yukoZai_Label"]',
    tHaiInput: 'input[id="tHai_Label"]',
    tHaiLabel: 'label[for="tHai_Label"]',
    hchTaniInput: 'input[id="hchTani_Label"]',
    hchTaniLabel: 'label[for="hchTani_Label"]',
    jouiTokuteiInput: 'input[id="jouiTokutei_Label"]',
    jouiTokuteiLabel: 'label[for="jouiTokutei_Label"]',
    tenjiInput: 'input[id="tenji_Label"]',
    tenjiLabel: 'label[for="tenji_Label"]',
    kaikonInput: 'input[id="kaikon_Label"]',
    kaikonLabel: 'label[for="kaikon_Label"]',
    d1tSuInput: 'input[id="d1tSu_Label"]',
    d1tSuLabel: 'label[for="d1tSu_Label"]',
    d2tSuInput: 'input[id="d2tSu_Label"]',
    d2tSuLabel: 'label[for="d2tSu_Label"]',
    tenjiKisoSuInput: 'input[id="tenjiKisoSu_Label"]',
    tenjiKisoSuLabel: 'label[for="tenjiKisoSu_Label"]',
    dcYukoZaiInput: 'input[id="dcYukoZai_Label"]',
    dcYukoZaiLabel: 'label[for="dcYukoZai_Label"]',
    hojuInput: 'input[id="hoju_Label"]',
    hojuLabel: 'label[for="hoju_Label"]',

    // Input fields
    rHinIriInput: 'input[id="rHinIri_TextBox"]',
    rHinIriLabel: 'label[for="rHinIri_TextBox"]',
    tenjiIriInput: 'input[id="tenjiIri_TextBox"]',
    tenjiIriLabel: 'label[for="tenjiIri_TextBox"]',
    kaikonIriInput: 'input[id="kaikonIri_TextBox"]',
    kaikonIriLabel: 'label[for="kaikonIri_TextBox"]',
    tSuIriInput: 'input[id="tSuIri_TextBox"]',
    tSuIriLabel: 'label[for="tSuIri_TextBox"]',
    kisoIriInput: 'input[id="kisoIri_TextBox"]',
    kisoIriLabel: 'label[for="kisoIri_TextBox"]',

    // Toggle/Checkbox
    tSuDelToggle: 'button:has-text("定数削除")',

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

  // labelSelectors
  private readonly labelSelectors = {
    mode: this.selectors.modeLabel,
    product: this.selectors.productLabel,
    gyoNo: "text=行No",
    kata: this.selectors.kataLabel,
    mk: this.selectors.mkLabel,
    rnk: this.selectors.rnkLabel,
    bKbn: this.selectors.bKbnLabel,
    shnNm: this.selectors.shnNmLabel,
    hbJsk: this.selectors.hbJskLabel,
    gZai: this.selectors.gZaiLabel,
    yukoZai: this.selectors.yukoZaiLabel,
    tHai: this.selectors.tHaiLabel,
    dcYukoZai: this.selectors.dcYukoZaiLabel,
    hchTani: this.selectors.hchTaniLabel,
    jouiTokutei: this.selectors.jouiTokuteiLabel,
    hoju: this.selectors.hojuLabel,
    rHinIri: this.selectors.rHinIriLabel,
    tenji: this.selectors.tenjiLabel,
    tenjiIri: this.selectors.tenjiIriLabel,
    kaikon: this.selectors.kaikonLabel,
    kaikonIri: this.selectors.kaikonIriLabel,
    d1tSu: this.selectors.d1tSuLabel,
    tSuIri: this.selectors.tSuIriLabel,
    d2tSu: this.selectors.d2tSuLabel,
    tenjiKisoSu: this.selectors.tenjiKisoSuLabel,
    kisoIri: this.selectors.kisoIriLabel,
  };

  // inputSelectors
  private readonly inputSelectors = {
    gyoNo: this.selectors.gyoNoInput,
    product: this.selectors.productInput,
    kata: this.selectors.kataInput,
    mk: this.selectors.mkInput,
    rnk: this.selectors.rnkInput,
    bKbn: this.selectors.bKbnInput,
    shnNm: this.selectors.shnNmInput,
    hbJsk4: this.selectors.hbJsk4Input,
    hbJsk3: this.selectors.hbJsk3Input,
    hbJsk2: this.selectors.hbJsk2Input,
    hbJsk1: this.selectors.hbJsk1Input,
    gZai: this.selectors.gZaiInput,
    yukoZai: this.selectors.yukoZaiInput,
    tHai: this.selectors.tHaiInput,
    dcYukoZai: this.selectors.dcYukoZaiInput,
    hchTani: this.selectors.hchTaniInput,
    jouiTokutei: this.selectors.jouiTokuteiInput,
    hoju: this.selectors.hojuInput,
    rHinIri: this.selectors.rHinIriInput,
    tenji: this.selectors.tenjiInput,
    tenjiIri: this.selectors.tenjiIriInput,
    kaikon: this.selectors.kaikonInput,
    kaikonIri: this.selectors.kaikonIriInput,
    d1tSu: this.selectors.d1tSuInput,
    tSuIri: this.selectors.tSuIriInput,
    d2tSu: this.selectors.d2tSuInput,
    tenjiKisoSu: this.selectors.tenjiKisoSuInput,
    kisoIri: this.selectors.kisoIriInput,
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
    return await this.page
      .locator(this.selectors.pageTitle)
      .first()
      .isVisible();
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

  /**
   * Check radio button for mode
   */
  async isKkyRadioVisible(): Promise<boolean> {
    return (await this.page.locator(this.selectors.kkyRadio).count()) > 0;
  }

  async isHpnRadioVisible(): Promise<boolean> {
    return (await this.page.locator(this.selectors.hpnRadio).count()) > 0;
  }

  async isKkyRadioChecked(): Promise<boolean> {
    return await this.page.locator(this.selectors.kkyRadio).isChecked();
  }

  async isHpnRadioChecked(): Promise<boolean> {
    return await this.page.locator(this.selectors.hpnRadio).isChecked();
  }

  async isKkyRadioDisabled(): Promise<boolean> {
    const radio = this.page.locator(this.selectors.kkyRadio);
    await expect(radio).toHaveAttribute("disabled", "");
    return true;
  }

  async isHpnRadioDisabled(): Promise<boolean> {
    const radio = this.page.locator(this.selectors.hpnRadio);
    await expect(radio).toHaveAttribute("disabled", "");
    return true;
  }

  /**
   * Click radio button
   */
  async clickKkyRadio(): Promise<void> {
    await this.page
      .locator('label:has(input[type="radio"][value="1"])')
      .click();
  }

  async clickHpnRadio(): Promise<void> {
    await this.page
      .locator('label:has(input[type="radio"][value="2"])')
      .click();
  }

  /**
   * Check if Clear button
   */
  async isBtnClearProductVisible(): Promise<boolean> {
    return await this.page
      .locator(this.selectors.clearProductButton)
      .isVisible();
  }

  /**
   * Check if Search button
   */

  async isBtnSearchProductVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.searchButton).isVisible();
  }

  async isBtnSearchProductEnable(): Promise<boolean> {
    return await this.page.locator(this.selectors.searchButton).isEnabled();
  }

  /**
   * Check if 開梱依頼 field is visible
   */
  async isKaikonIriInputVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.kaikonIriInput).isVisible();
  }

  /**
   * Check input field
   */
  async productInputIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.productInput).isVisible();
  }

  async productInputIsEditable(): Promise<boolean> {
    return await this.page.locator(this.selectors.productInput).isEditable();
  }

  async productInputIsDisabled(): Promise<boolean> {
    return await this.page.locator(this.selectors.productInput).isDisabled();
  }

  async rHinIriInputIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.rHinIriInput).isVisible();
  }

  async rHinIriInputIsEditable(): Promise<boolean> {
    return await this.page.locator(this.selectors.rHinIriInput).isEditable();
  }

  async rHinIriInputIsDisabled(): Promise<boolean> {
    return await this.page.locator(this.selectors.rHinIriInput).isDisabled();
  }

  async tenjiIriInputIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.tenjiIriInput).isVisible();
  }

  async tenjiIriInputIsEditable(): Promise<boolean> {
    return await this.page.locator(this.selectors.tenjiIriInput).isEditable();
  }

  async tenjiIriInputIsDisabled(): Promise<boolean> {
    return await this.page.locator(this.selectors.tenjiIriInput).isDisabled();
  }

  async tSuIriInputIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.tSuIriInput).isVisible();
  }

  async tSuIriInputIsEditable(): Promise<boolean> {
    return await this.page.locator(this.selectors.tSuIriInput).isEditable();
  }

  async tSuIriInputIsDisabled(): Promise<boolean> {
    return await this.page.locator(this.selectors.tSuIriInput).isDisabled();
  }

  async kisoIriInputIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.kisoIriInput).isVisible();
  }

  async kisoIriInputIsEditable(): Promise<boolean> {
    return await this.page.locator(this.selectors.kisoIriInput).isEditable();
  }

  async kisoIriInputIsDisabled(): Promise<boolean> {
    return await this.page.locator(this.selectors.kisoIriInput).isDisabled();
  }
  /**
   * Check read-only fields visibility and editability
   */
  async gyoNoInputIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.gyoNoInput).isVisible();
  }

  async gyoNoInputIsEditable(): Promise<boolean> {
    return await this.page.locator(this.selectors.gyoNoInput).isEditable();
  }

  async kataInputIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.kataInput).isVisible();
  }

  async kataInputIsEditable(): Promise<boolean> {
    return await this.page.locator(this.selectors.kataInput).isEditable();
  }

  async mkInputIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.mkInput).isVisible();
  }

  async mkInputIsEditable(): Promise<boolean> {
    return await this.page.locator(this.selectors.mkInput).isEditable();
  }

  async rnkInputIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.rnkInput).isVisible();
  }

  async rnkInputIsEditable(): Promise<boolean> {
    return await this.page.locator(this.selectors.rnkInput).isEditable();
  }

  async bKbnInputIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.bKbnInput).isVisible();
  }

  async bKbnInputIsEditable(): Promise<boolean> {
    return await this.page.locator(this.selectors.bKbnInput).isEditable();
  }

  async shnNmInputIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.shnNmInput).isVisible();
  }

  async shnNmInputIsEditable(): Promise<boolean> {
    return await this.page.locator(this.selectors.shnNmInput).isEditable();
  }

  async hbJsk4InputIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.hbJsk4Input).isVisible();
  }

  async hbJsk4InputIsEditable(): Promise<boolean> {
    return await this.page.locator(this.selectors.hbJsk4Input).isEditable();
  }

  async hbJsk3InputIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.hbJsk3Input).isVisible();
  }

  async hbJsk3InputIsEditable(): Promise<boolean> {
    return await this.page.locator(this.selectors.hbJsk3Input).isEditable();
  }

  async hbJsk2InputIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.hbJsk2Input).isVisible();
  }

  async hbJsk2InputIsEditable(): Promise<boolean> {
    return await this.page.locator(this.selectors.hbJsk2Input).isEditable();
  }

  async hbJsk1InputIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.hbJsk1Input).isVisible();
  }

  async hbJsk1InputIsEditable(): Promise<boolean> {
    return await this.page.locator(this.selectors.hbJsk1Input).isEditable();
  }

  async gZaiInputIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.gZaiInput).isVisible();
  }

  async gZaiInputIsEditable(): Promise<boolean> {
    return await this.page.locator(this.selectors.gZaiInput).isEditable();
  }

  async yukoZaiInputIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.yukoZaiInput).isVisible();
  }

  async yukoZaiInputIsEditable(): Promise<boolean> {
    return await this.page.locator(this.selectors.yukoZaiInput).isEditable();
  }

  async tHaiInputIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.tHaiInput).isVisible();
  }

  async tHaiInputIsEditable(): Promise<boolean> {
    return await this.page.locator(this.selectors.tHaiInput).isEditable();
  }

  async dcYukoZaiInputIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.dcYukoZaiInput).isVisible();
  }

  async dcYukoZaiInputIsEditable(): Promise<boolean> {
    return await this.page.locator(this.selectors.dcYukoZaiInput).isEditable();
  }

  async hchTaniInputIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.hchTaniInput).isVisible();
  }

  async hchTaniInputIsEditable(): Promise<boolean> {
    return await this.page.locator(this.selectors.hchTaniInput).isEditable();
  }

  async jouiTokuteiInputIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.jouiTokuteiInput).isVisible();
  }

  async jouiTokuteiInputIsEditable(): Promise<boolean> {
    return await this.page
      .locator(this.selectors.jouiTokuteiInput)
      .isEditable();
  }

  async hojuInputIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.hojuInput).isVisible();
  }

  async hojuInputIsEditable(): Promise<boolean> {
    return await this.page.locator(this.selectors.hojuInput).isEditable();
  }

  async tenjiInputIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.tenjiInput).isVisible();
  }

  async tenjiInputIsEditable(): Promise<boolean> {
    return await this.page.locator(this.selectors.tenjiInput).isEditable();
  }

  async kaikonInputIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.kaikonInput).isVisible();
  }

  async kaikonInputIsEditable(): Promise<boolean> {
    return await this.page.locator(this.selectors.kaikonInput).isEditable();
  }

  async d1tSuInputIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.d1tSuInput).isVisible();
  }

  async d1tSuInputIsEditable(): Promise<boolean> {
    return await this.page.locator(this.selectors.d1tSuInput).isEditable();
  }

  async d2tSuInputIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.d2tSuInput).isVisible();
  }

  async d2tSuInputIsEditable(): Promise<boolean> {
    return await this.page.locator(this.selectors.d2tSuInput).isEditable();
  }

  async tenjiKisoSuInputIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.tenjiKisoSuInput).isVisible();
  }

  async tenjiKisoSuInputIsEditable(): Promise<boolean> {
    return await this.page
      .locator(this.selectors.tenjiKisoSuInput)
      .isEditable();
  }

  /**
   * Get label color for input fields
   */
  async getModeLabelColor(): Promise<string> {
    const label = this.page.locator(this.selectors.modeLabel).first();
    return await label.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
  }

  async getGyoNoLabelColor(): Promise<string> {
    const label = this.page.getByText("行No", { exact: true });

    return await label.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
  }

  async getProductLabelColor(): Promise<string> {
    const label = this.page.locator(this.selectors.productLabel).first();
    return await label.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
  }

  async getKataLabelColor(): Promise<string> {
    const label = this.page.locator(this.selectors.kataLabel).first();
    return await label.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
  }

  async getMkLabelColor(): Promise<string> {
    const label = this.page.locator(this.selectors.mkLabel).first();
    return await label.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
  }

  async getRnkLabelColor(): Promise<string> {
    const label = this.page.locator(this.selectors.rnkLabel).first();
    return await label.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
  }

  async getBKbnLabelColor(): Promise<string> {
    const label = this.page.locator(this.selectors.bKbnLabel).first();
    return await label.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
  }

  async getShnNmLabelColor(): Promise<string> {
    const label = this.page.locator(this.selectors.shnNmLabel).first();
    return await label.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
  }

  async getHbJskLabelColor(): Promise<string> {
    const label = this.page.locator(this.selectors.hbJskLabel).first();
    return await label.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
  }

  async getGZaiLabelColor(): Promise<string> {
    const label = this.page.locator(this.selectors.gZaiLabel).first();
    return await label.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
  }

  async getYukoZaiLabelColor(): Promise<string> {
    const label = this.page.locator(this.selectors.yukoZaiLabel).first();
    return await label.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
  }

  async getDcYukoZaiLabelColor(): Promise<string> {
    const label = this.page.locator(this.selectors.dcYukoZaiLabel).first();
    return await label.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
  }

  async getTHaiLabelColor(): Promise<string> {
    const label = this.page.locator(this.selectors.tHaiLabel).first();
    return await label.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
  }

  async getHchTaniLabelColor(): Promise<string> {
    const label = this.page.locator(this.selectors.hchTaniLabel).first();
    return await label.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
  }

  async getJouiTokuteiLabelColor(): Promise<string> {
    const label = this.page.locator(this.selectors.jouiTokuteiLabel).first();
    return await label.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
  }

  async getHojuLabelColor(): Promise<string> {
    const label = this.page.locator(this.selectors.hojuLabel).first();
    return await label.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
  }

  async getRHinIriLabelColor(): Promise<string> {
    const label = this.page.locator(this.selectors.rHinIriLabel).first();
    return await label.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
  }

  async getTenjiLabelColor(): Promise<string> {
    const label = this.page.locator(this.selectors.tenjiLabel).first();
    return await label.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
  }

  async getKaikonLabelColor(): Promise<string> {
    const label = this.page.locator(this.selectors.kaikonLabel).first();
    return await label.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
  }

  async getTenjiIriLabelColor(): Promise<string> {
    const label = this.page.locator(this.selectors.tenjiIriLabel).first();
    return await label.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
  }

  async getD1tSuLabelColor(): Promise<string> {
    const label = this.page.locator(this.selectors.d1tSuLabel).first();
    return await label.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
  }

  async getTSuIriLabelColor(): Promise<string> {
    const label = this.page.locator(this.selectors.tSuIriLabel).first();
    return await label.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
  }

  async getD2tSuLabelColor(): Promise<string> {
    const label = this.page.locator(this.selectors.d2tSuLabel).first();
    return await label.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
  }

  async getTenjiKisoSuLabelColor(): Promise<string> {
    const label = this.page.locator(this.selectors.tenjiKisoSuLabel).first();
    return await label.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
  }

  async getKisoIriLabelColor(): Promise<string> {
    const label = this.page.locator(this.selectors.kisoIriLabel).first();
    return await label.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
  }

  async getKaikonIriLabelColor(): Promise<string> {
    const label = this.page.locator(this.selectors.kaikonIriLabel).first();
    return await label.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
  }

  /**
   * Get input border color
   */
  async getGyoNoInputBorderColor(): Promise<string> {
    const input = this.page.locator(this.selectors.gyoNoInput).first();
    return await input.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
  }
  async getProductInputBorderColor(): Promise<string> {
    const input = this.page.locator(this.selectors.productInput).first();
    return await input.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
  }
  async getKataInputBorderColor(): Promise<string> {
    const input = this.page.locator(this.selectors.kataInput).first();
    return await input.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
  }
  async getMkInputBorderColor(): Promise<string> {
    const input = this.page.locator(this.selectors.mkInput).first();
    return await input.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
  }
  async getRnkInputBorderColor(): Promise<string> {
    const input = this.page.locator(this.selectors.rnkInput).first();
    return await input.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
  }
  async getBKbnInputBorderColor(): Promise<string> {
    const input = this.page.locator(this.selectors.bKbnInput).first();
    return await input.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
  }
  async getShnNmInputBorderColor(): Promise<string> {
    const input = this.page.locator(this.selectors.shnNmInput).first();
    return await input.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
  }
  async getHbJsk4InputBorderColor(): Promise<string> {
    const input = this.page.locator(this.selectors.hbJsk4Input).first();
    return await input.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
  }
  async getHbJsk3InputBorderColor(): Promise<string> {
    const input = this.page.locator(this.selectors.hbJsk3Input).first();
    return await input.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
  }
  async getHbJsk2InputBorderColor(): Promise<string> {
    const input = this.page.locator(this.selectors.hbJsk2Input).first();
    return await input.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
  }
  async getHbJsk1InputBorderColor(): Promise<string> {
    const input = this.page.locator(this.selectors.hbJsk1Input).first();
    return await input.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
  }
  async getGZaiInputBorderColor(): Promise<string> {
    const input = this.page.locator(this.selectors.gZaiInput).first();
    return await input.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
  }
  async getYukoZaiInputBorderColor(): Promise<string> {
    const input = this.page.locator(this.selectors.yukoZaiInput).first();
    return await input.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
  }
  async getTHaiInputBorderColor(): Promise<string> {
    const input = this.page.locator(this.selectors.tHaiInput).first();
    return await input.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
  }
  async getDcYukoZaiInputBorderColor(): Promise<string> {
    const input = this.page.locator(this.selectors.dcYukoZaiInput).first();
    return await input.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
  }
  async getHchTaniInputBorderColor(): Promise<string> {
    const input = this.page.locator(this.selectors.hchTaniInput).first();
    return await input.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
  }
  async getJouiTokuteiInputBorderColor(): Promise<string> {
    const input = this.page.locator(this.selectors.jouiTokuteiInput).first();
    return await input.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
  }
  async getHojuInputBorderColor(): Promise<string> {
    const input = this.page.locator(this.selectors.tHaiInput).first();
    return await input.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
  }
  async getRHinIriInputBorderColor(): Promise<string> {
    const input = this.page.locator(this.selectors.rHinIriInput).first();
    return await input.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
  }

  async getTenjiInputBorderColor(): Promise<string> {
    const input = this.page.locator(this.selectors.tenjiInput).first();
    return await input.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
  }

  async getTenjiIriInputBorderColor(): Promise<string> {
    const input = this.page.locator(this.selectors.tenjiIriInput).first();
    return await input.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
  }

  async getKaikonInputBorderColor(): Promise<string> {
    const input = this.page.locator(this.selectors.kaikonInput).first();
    return await input.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
  }

  async getD1tSuInputBorderColor(): Promise<string> {
    const input = this.page.locator(this.selectors.d1tSuInput).first();
    return await input.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
  }

  async getTSuIriInputBorderColor(): Promise<string> {
    const input = this.page.locator(this.selectors.tSuIriInput).first();
    return await input.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
  }

  async getD2tSuInputBorderColor(): Promise<string> {
    const input = this.page.locator(this.selectors.d2tSuInput).first();
    return await input.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
  }

  async getTenjiKisoSuInputBorderColor(): Promise<string> {
    const input = this.page.locator(this.selectors.tenjiKisoSuInput).first();
    return await input.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
  }

  async getKisoIriInputBorderColor(): Promise<string> {
    const input = this.page.locator(this.selectors.kisoIriInput).first();
    return await input.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
  }

  async getKaikonIriInputBorderColor(): Promise<string> {
    const input = this.page.locator(this.selectors.kaikonIriInput).first();
    return await input.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
  }

  /**
   * Check if toggle button 定数削除 is visible
   */
  async isTsuDelToggleVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.tSuDelToggle).isVisible();
  }

  async getTsuDelToggleState(): Promise<boolean> {
    const toggleButton = this.page.locator(this.selectors.tSuDelToggle).first();

    const className = await toggleButton.getAttribute("class");
    if (!className) return false;

    return !className.includes("not-check");
  }

  async clickTsuDelToggle(): Promise<void> {
    await this.page.locator(this.selectors.tSuDelToggle).click();
  }

  async expectAllLabelsNotRed(
    options?: ExcludeKeys<typeof this.labelSelectors>,
    redColor = "rgb(255, 0, 41)",
  ): Promise<void> {
    const excludeSet = new Set(options?.exclude ?? []);

    for (const [key, selector] of Object.entries(this.labelSelectors)) {
      if (excludeSet.has(key as keyof typeof this.labelSelectors)) continue;

      const label = this.page.locator(selector).first();
      await expect(label, `Label "${key}" should NOT be red`).not.toHaveCSS(
        "color",
        redColor,
      );
    }
  }

  async expectAllLabelsRed(
    options?: ExcludeKeys<typeof this.labelSelectors>,
    redColor = "rgb(255, 0, 41)",
  ): Promise<void> {
    const excludeSet = new Set(options?.exclude ?? []);

    for (const [key, selector] of Object.entries(this.labelSelectors)) {
      if (excludeSet.has(key as keyof typeof this.labelSelectors)) continue;

      const label = this.page.locator(selector).first();
      await expect(label, `Label "${key}" should be red`).toHaveCSS(
        "color",
        redColor,
      );
    }
  }

  async expectAllInputBordersNotRed(
    options?: ExcludeKeys<typeof this.inputSelectors>,
    redColor = "rgb(255, 0, 41)",
  ): Promise<void> {
    const excludeSet = new Set(options?.exclude ?? []);

    for (const [key, selector] of Object.entries(this.inputSelectors)) {
      if (excludeSet.has(key as keyof typeof this.inputSelectors)) continue;

      const input = this.page.locator(selector).first();
      await expect(
        input,
        `Input "${key}" border should NOT be red`,
      ).not.toHaveCSS("border-color", redColor);
    }
  }

  async expectAllInputBordersRed(
    options?: ExcludeKeys<typeof this.inputSelectors>,
    redColor = "rgb(255, 0, 41)",
  ): Promise<void> {
    const excludeSet = new Set(options?.exclude ?? []);

    for (const [key, selector] of Object.entries(this.inputSelectors)) {
      if (excludeSet.has(key as keyof typeof this.inputSelectors)) continue;

      const input = this.page.locator(selector).first();
      await expect(input, `Input "${key}" border should be red`).toHaveCSS(
        "border-color",
        redColor,
      );
    }
  }
}
