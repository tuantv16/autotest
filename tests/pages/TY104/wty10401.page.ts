/**
 * WTY10401 Store Inventory Inquiry Page Object
 * Page Object for 店別在庫照会 screen
 */

import { Page } from '@playwright/test';
import { BasePage } from '../base.page';

export class TY1040Page extends BasePage {
  // Selectors
  private readonly selectors = {
    headingTitle: '.text-heading-h5:has-text("店別在庫照会")',
    productInput: '#shnCd',
    productBarcodeButton: 'label[for="shnCd"] ~ div button[type="button"]:has(svg)',
    displayStockToggleContainer: 'label:has-text("表示在庫") ~ div',
    displayStockToggleEffective: 'label:has-text("表示在庫") ~ div label:has-text("有効") input[type="radio"]',
    displayStockToggleActual: 'label:has-text("表示在庫") ~ div label:has-text("実在庫") input[type="radio"]',
  };

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to WTY10401 Store Inventory Inquiry screen
   */
  async navigate(pilotKey: string = 'prod'): Promise<void> {
    const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTY10401StoreInventoryInquiry?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
    await this.goto(url);
    await this.page.waitForTimeout(1000);
  }

  /**
   * Wait for page to be ready - check if heading title is visible
   */
  async waitForFormReady(): Promise<void> {
    const locator = this.page.locator(this.selectors.headingTitle);
    await this.waitForVisible(locator, 10000);
  }

  /**
   * Check if heading title "店別在庫照会" is visible
   */
  async isHeadingTitleVisible(): Promise<boolean> {
    const locator = this.page.locator(this.selectors.headingTitle);
    return await locator.isVisible({ timeout: 10000 }).catch(() => false);
  }

  /**
   * Check if product input field is visible
   */
  async isProductInputVisible(): Promise<boolean> {
    const locator = this.page.locator(this.selectors.productInput);
    return await locator.isVisible({ timeout: 10000 }).catch(() => false);
  }

  /**
   * Check if product barcode button is visible
   */
  async isProductBarcodeButtonVisible(): Promise<boolean> {
    const locator = this.page.locator(this.selectors.productBarcodeButton);
    return await locator.isVisible({ timeout: 10000 }).catch(() => false);
  }

  /**
   * Check if display stock toggle section is visible
   */
  async isDisplayStockToggleVisible(): Promise<boolean> {
    const locator = this.page.locator(this.selectors.displayStockToggleContainer);
    return await locator.isVisible({ timeout: 10000 }).catch(() => false);
  }

  /**
   * Check if "有効" toggle button is visible
   */
  async isDisplayStockToggleEffectiveVisible(): Promise<boolean> {
    const locator = this.page.locator(this.selectors.displayStockToggleEffective);
    return await locator.isVisible({ timeout: 10000 }).catch(() => false);
  }

  /**
   * Check if "実在庫" toggle button is visible
   */
  async isDisplayStockToggleActualVisible(): Promise<boolean> {
    const locator = this.page.locator(this.selectors.displayStockToggleActual);
    return await locator.isVisible({ timeout: 10000 }).catch(() => false);
  }

  /**
   * Get default value of display stock toggle (should be 1 = "有効")
   */
  async getDisplayStockToggleDefaultValue(): Promise<string> {
    const effectiveToggle = this.page.locator(this.selectors.displayStockToggleEffective);
    const isChecked = await effectiveToggle.isChecked();
    if (isChecked) {
      return '1';
    }
    const actualToggle = this.page.locator(this.selectors.displayStockToggleActual);
    const isActualChecked = await actualToggle.isChecked();
    return isActualChecked ? '2' : '0';
  }
}

