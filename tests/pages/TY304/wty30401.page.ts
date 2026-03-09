/**
 * WTY30401
 * Page Object for 電子プライスペアリング情報登録 screen
 */

import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../base.page";

export class WTY30401Page extends BasePage {
  // Selectors
  private readonly selectors = {
    // Page title
    pageTitle: 'div:has-text("電子プライスペアリング情報登録")',

    // Radio
    torokuRadio: 'input[type="radio"][name="mode"][value="1"]',
    kaijoRadio: 'input[type="radio"][name="mode"][value="2"]',

    // Form fields
    tnhdIdInput: "input#tnhdId",
    shnCdInput: "input#shnCd",
    kataNmInput: "input#kataNm",
    mkNmInput: "input#mkNm",
    shnNmInput: "input#shnNm",

    // Icons barcode
    tnhdIdBarcodeIcon: 'div:has(#tnhdId) button svg[viewBox="0 0 24 24"]',
    shnCdBarcodeIcon: 'div:has(#shnCd) button svg[viewBox="0 0 24 24"]',

    // Clear input buttons
    clearTnhdIdInput:
      '#tnhdId >> xpath=following-sibling::img[@data-testid="ClearButton"]',
    clearShnCdInput:
      '#shnCd >> xpath=following-sibling::img[@data-testid="ClearButton"]',

    // Buttons search
    buttonSearchTnhId: "button.search-tnhd-button",
    buttonSearchShnCd: "button.search-shncd-button",

    // Menu buttons
    clearButton: 'button:has-text("クリア")',
    confirmButton: 'button:has-text("確定")',
    searchProductButton: 'button:has-text("型番検索")',
  };

  async navigate(pilotKey: string = "prod"): Promise<void> {
    const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTY30401ProductElectronicPricePairings?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
    await this.goto(url);
    await this.page.waitForTimeout(1000);
  }

  async isClearButtonButtonVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.clearButton).isVisible();
  }

  async clickClearButton(): Promise<void> {
    await this.page.locator(this.selectors.clearButton).click();
  }

  async getPageTitle(): Promise<boolean> {
    return await this.page
      .locator(this.selectors.pageTitle)
      .first()
      .isVisible();
  }

  async isTorokuRadioChecked(): Promise<boolean> {
    return await this.page.locator(this.selectors.torokuRadio).isChecked();
  }

  async isKaijoRadioChecked(): Promise<boolean> {
    return await this.page.locator(this.selectors.kaijoRadio).isChecked();
  }

  async clickTorokuRadio(): Promise<void> {
    await this.page
      .locator('label:has(input[type="radio"][value="1"])')
      .click();
  }

  async clickKaijoRadio(): Promise<void> {
    await this.page
      .locator('label:has(input[type="radio"][value="2"])')
      .click();
  }

  async tnhdIdInputIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.tnhdIdInput).isVisible();
  }

  async tnhdIdInputIsEditable(): Promise<boolean> {
    return await this.page.locator(this.selectors.tnhdIdInput).isEditable();
  }

  async tnhdIdInputIsDisabled(): Promise<boolean> {
    return await this.page.locator(this.selectors.tnhdIdInput).isDisabled();
  }

  async tnhdIdInputBlur(): Promise<void> {
    await this.page.locator(this.selectors.tnhdIdInput).blur();
  }

  async shnCdInputIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.shnCdInput).isVisible();
  }

  async shnCdInputIsEditable(): Promise<boolean> {
    return await this.page.locator(this.selectors.shnCdInput).isEditable();
  }

  async shnCdInputIsDisabled(): Promise<boolean> {
    return await this.page.locator(this.selectors.shnCdInput).isDisabled();
  }

  async shnCdInputFocus(): Promise<void> {
    await this.page.locator(this.selectors.shnCdInput).focus();
  }

  async shnCdInputBlur(): Promise<void> {
    await this.page.locator(this.selectors.shnCdInput).blur();
  }

  async kataNmInputIsDisabled(): Promise<boolean> {
    return await this.page.locator(this.selectors.kataNmInput).isDisabled();
  }

  async mkNmInputIsDisabled(): Promise<boolean> {
    return await this.page.locator(this.selectors.mkNmInput).isDisabled();
  }

  async shnNmInputIsDisabled(): Promise<boolean> {
    return await this.page.locator(this.selectors.shnNmInput).isDisabled();
  }

  async tnhdIdBarcodeIconIsVisible(): Promise<boolean> {
    return await this.page
      .locator(this.selectors.tnhdIdBarcodeIcon)
      .first()
      .isVisible();
  }

  async shnCdBarcodeIconIsVisible(): Promise<boolean> {
    return await this.page
      .locator(this.selectors.shnCdBarcodeIcon)
      .first()
      .isVisible();
  }

  async clearTnhdIdInputIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.clearTnhdIdInput).isVisible();
  }

  async clickClearTnhdIdInput(): Promise<void> {
    await this.page.locator(this.selectors.clearTnhdIdInput).click();
  }

  async clearShnCdInputIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.clearShnCdInput).isVisible();
  }

  async clickClearShnCdInput(): Promise<void> {
    await this.page.locator(this.selectors.clearShnCdInput).click();
  }

  async buttonSearchTnhIdIsVisible(): Promise<boolean> {
    return await this.page
      .locator(this.selectors.buttonSearchTnhId)
      .isVisible();
  }

  async clickButtonSearchTnhId(): Promise<void> {
    await this.page.locator(this.selectors.buttonSearchTnhId).first().click();
  }

  async buttonSearchShnCdIsVisible(): Promise<boolean> {
    return await this.page
      .locator(this.selectors.buttonSearchShnCd)
      .isVisible();
  }

  async clickButtonSearchShnCd(): Promise<void> {
    await this.page.locator(this.selectors.buttonSearchShnCd).first().click();
  }

  async clearButtonIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.clearButton).isVisible();
  }

  async confirmButtonIsVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.confirmButton).isVisible();
  }

  async clickConfirmButton(): Promise<void> {
    await this.page.locator(this.selectors.confirmButton).click();
  }

  async searchProductButtonVisible(): Promise<boolean> {
    return await this.page
      .locator(this.selectors.searchProductButton)
      .isVisible();
  }

  async getFieldErrorMessage(fieldLabel: string): Promise<string> {
    const labelLocator = this.page.locator(`label:has-text("${fieldLabel}")`);
    const parentContainer = labelLocator.locator("..");
    const errorMessage = parentContainer.locator("p.text-red-600");
    const text = await errorMessage.textContent().catch(() => null);
    return text || "";
  }
}
