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
    buttonBack: 'button:has(svg path[d^="M15 19.9201"])',
    confirmDialogButton: "button#ok_button",
    cancelDialogButton: "button#cancel_button",
    actionMenuButton: 'button.MuiButtonBase-root[aria-haspopup="true"]',
    confirmButton: 'button:has-text("確定")',
    clearButton: 'button:has-text("クリア")',
    requestSearchButton:
      'ul[role="menu"] li[role="menuitem"] span:has-text("依頼検索")',
    arrivalScheduleButton:
      'ul[role="menu"] li[role="menuitem"] span:has-text("入荷予定")',
    searchProductButton: 'button:has-text("型番検索")',
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

  async navigate(pilotKey: string = "prod"): Promise<void> {
    const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTY31001StockSupplyRequestsIndex?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
    await this.goto(url);
    await this.page.waitForTimeout(1000);
  }

  async waitForFormReady(): Promise<void> {
    await this.page.waitForSelector(
      `${this.selectors.kkyRadio}, ${this.selectors.hpnRadio}`,
      { state: "visible", timeout: 10000 },
    );
  }

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

  async clickBackButton(): Promise<void> {
    await this.page.locator(this.selectors.buttonBack).first().click();
  }

  async clickConfirmDialogButton(): Promise<void> {
    await this.page.locator(this.selectors.confirmDialogButton).first().click();
  }

  async clickCancelDialogButton(): Promise<void> {
    await this.page.locator(this.selectors.cancelDialogButton).first().click();
  }

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

  async clickClearButton(): Promise<void> {
    await this.page.locator(this.selectors.clearButton).click();
  }

  async clickRequestSearchButton(): Promise<void> {
    await this.openMenu();
    await this.page.locator(this.selectors.requestSearchButton).click();
    await this.page.waitForTimeout(500);
  }

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

  async isBtnClearProductVisible(): Promise<boolean> {
    return await this.page
      .locator(this.selectors.clearProductButton)
      .isVisible();
  }

  async isBtnSearchProductVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.searchButton).isVisible();
  }

  async isBtnSearchProductEnable(): Promise<boolean> {
    return await this.page.locator(this.selectors.searchButton).isEnabled();
  }

  async isKaikonIriInputVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.kaikonIriInput).isVisible();
  }

  async focusProductInput(): Promise<void> {
    await this.page.locator(this.selectors.productInput).focus();
  }

  async searchProductButtonVisible(): Promise<boolean> {
    return await this.page
      .locator(this.selectors.searchProductButton)
      .isVisible();
  }

  async clickSearchProductButton(): Promise<void> {
    await this.page.locator(this.selectors.searchProductButton).click();
  }

  async clickClearProductButton(): Promise<void> {
    await this.page.locator(this.selectors.clearProductButton).click();
  }

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
    const input = this.page.locator(this.selectors.tSuIriInput);
    const isDisabled = await input.isDisabled().catch(() => false);
    const isReadonly = await input
      .getAttribute("readonly")
      .then((val) => val !== null)
      .catch(() => false);
    const isEditable = await input.isEditable();
    return isDisabled || isReadonly || !isEditable;
  }

  async kisoIriInputIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.kisoIriInput).isVisible();
  }

  async kisoIriInputIsEditable(): Promise<boolean> {
    return await this.page.locator(this.selectors.kisoIriInput).isEditable();
  }

  async kisoIriInputIsDisabled(): Promise<boolean> {
    const input = this.page.locator(this.selectors.kisoIriInput);
    const isDisabled = await input.isDisabled().catch(() => false);
    const isReadonly = await input
      .getAttribute("readonly")
      .then((val) => val !== null)
      .catch(() => false);
    const isEditable = await input.isEditable();
    return isDisabled || isReadonly || !isEditable;
  }

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

  async fillProductInput(value: string): Promise<void> {
    await this.page.locator(this.selectors.productInput).fill(value);
  }

  async getProductInputValue(): Promise<string> {
    return await this.page.locator(this.selectors.productInput).inputValue();
  }

  async blurProductInput(): Promise<void> {
    await this.page.locator(this.selectors.productInput).blur();
  }

  async clickSearchButton(): Promise<void> {
    await this.page.locator(this.selectors.searchButton).click();
  }

  async clickConfirmButton(): Promise<void> {
    await this.page.locator(this.selectors.confirmButton).click();
  }

  async findMessageText(): Promise<boolean> {
    return await this.page
      .getByText("必須入力項目です。", { exact: true })
      .isVisible();
  }

  async fillRHinIriInput(value: string): Promise<void> {
    await this.page.locator(this.selectors.rHinIriInput).fill(value);
  }

  async getRHinIriInputValue(): Promise<string> {
    return await this.page.locator(this.selectors.rHinIriInput).inputValue();
  }

  async blurRHinIriInput(): Promise<void> {
    await this.page.locator(this.selectors.rHinIriInput).blur();
  }

  async fillTenjiIriInput(value: string): Promise<void> {
    await this.page.locator(this.selectors.tenjiIriInput).fill(value);
  }

  async getTenjiIriInputValue(): Promise<string> {
    return await this.page.locator(this.selectors.tenjiIriInput).inputValue();
  }

  async blurTenjiIriInput(): Promise<void> {
    await this.page.locator(this.selectors.tenjiIriInput).blur();
  }

  async fillTSuIriInput(value: string): Promise<void> {
    await this.page.locator(this.selectors.tSuIriInput).fill(value);
  }

  async getTSuIriInputValue(): Promise<string> {
    return await this.page.locator(this.selectors.tSuIriInput).inputValue();
  }

  async blurTSuIriInput(): Promise<void> {
    await this.page.locator(this.selectors.tSuIriInput).blur();
  }

  async fillKisoIriInput(value: string): Promise<void> {
    await this.page.locator(this.selectors.kisoIriInput).fill(value);
  }

  async getKisoIriInputValue(): Promise<string> {
    return await this.page.locator(this.selectors.kisoIriInput).inputValue();
  }

  async blurKisoIriInput(): Promise<void> {
    await this.page.locator(this.selectors.kisoIriInput).blur();
  }

  async fillKaikonIriInput(value: string): Promise<void> {
    await this.page.locator(this.selectors.kaikonIriInput).fill(value);
  }

  async getKaikonIriInputValue(): Promise<string> {
    return await this.page.locator(this.selectors.kaikonIriInput).inputValue();
  }

  async getFieldErrorMessage(fieldLabel: string): Promise<string> {
    const labelLocator = this.page.locator(`label:has-text("${fieldLabel}")`);
    const parentContainer = labelLocator.locator("..");
    const errorMessage = parentContainer.locator("p.text-red-600");
    const text = await errorMessage.textContent().catch(() => null);
    return text || "";
  }

  async isFieldErrorVisible(fieldLabel: string): Promise<boolean> {
    const labelLocator = this.page.locator(`label:has-text("${fieldLabel}")`);
    const parentContainer = labelLocator.locator("..").locator("..");
    const errorMessage = parentContainer.locator("p.text-red-600");
    return await errorMessage.isVisible().catch(() => false);
  }

  async getTitlePage(): Promise<string> {
    return await this.page.locator("h6").first().innerText();
  }

  async getKataInputValue(): Promise<string> {
    return await this.page.locator(this.selectors.kataInput).inputValue();
  }

  async getMkInputValue(): Promise<string> {
    return await this.page.locator(this.selectors.mkInput).inputValue();
  }

  async getRnkInputValue(): Promise<string> {
    return await this.page.locator(this.selectors.rnkInput).inputValue();
  }

  async getBKbnInputValue(): Promise<string> {
    return await this.page.locator(this.selectors.bKbnInput).inputValue();
  }

  async getShnNmInputValue(): Promise<string> {
    return await this.page.locator(this.selectors.shnNmInput).inputValue();
  }

  async getHbJsk4InputValue(): Promise<string> {
    return await this.page.locator(this.selectors.hbJsk4Input).inputValue();
  }

  async getHbJsk3InputValue(): Promise<string> {
    return await this.page.locator(this.selectors.hbJsk3Input).inputValue();
  }

  async getHbJsk2InputValue(): Promise<string> {
    return await this.page.locator(this.selectors.hbJsk2Input).inputValue();
  }

  async getHbJsk1InputValue(): Promise<string> {
    return await this.page.locator(this.selectors.hbJsk1Input).inputValue();
  }

  async getErrorMessageDialog(): Promise<string> {
    const dialog = this.page.locator("#wty31001-error-dialog");
    const message = dialog.locator("p").first();
    return await message.innerText();
  }

  async getGyoNoValue(): Promise<string> {
    return await this.page.locator(this.selectors.gyoNoInput).inputValue();
  }
}
