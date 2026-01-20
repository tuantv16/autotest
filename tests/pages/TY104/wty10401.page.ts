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
    salesDepartmentCombobox: '#jgyksCd[role="combobox"], label[for="jgyksCd"] ~ div [role="combobox"]',
    salesDepartmentComboboxContainer: 'label[for="jgyksCd"] ~ div',
    salesDepartmentComboboxId: '#jgyksCd',
    moveDownButton: 'button:has(svg path.stroke-text-sub)',
    storeLabel: 'label:has-text("店舗")',
    salesDepartmentDropdownMenu: '#_r_1_',
    salesDepartmentDropdownOption: '#_r_1_ li',
    searchButton: 'form button[type="submit"]:has-text("検索")',
    shnCdInput: 'input[name="shnCd"], #shnCd',
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
   * Click on move down button (button containing SVG path with class stroke-text-sub)
   */
  async clickMoveDown(): Promise<void> {
    const locator = this.page.locator(this.selectors.moveDownButton);
    await this.waitForVisible(locator, 2000);
    await locator.click({ timeout: 2000 });
  }

  async isSalesDepartmentComboboxClickable(): Promise<boolean> {
    try {
      const locator = this.page.locator(this.selectors.salesDepartmentComboboxId);
      await locator.click({ timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Click on store label (店舗)
   */
  async clickStoreLabel(): Promise<void> {
    const locator = this.page.locator(this.selectors.storeLabel);
    await locator.click({ timeout: 10000 });
  }

  /**
   * Check if combobox dropdown option exists by text
   */
  async isComboboxOptionVisible(optionText: string): Promise<boolean> {
    const locator = this.page.locator(`${this.selectors.salesDepartmentDropdownOption}:has-text("${optionText}")`);
    return await locator.isVisible({ timeout: 5000 }).catch(() => false);
  }

  /**
   * Verify that all provided option texts are present in combobox dropdown
   * @param expectedOptions Array of option texts to check
   * @returns true if all options are found, false otherwise
   */
  async verifyComboboxOptions(expectedOptions: string[]): Promise<boolean> {
    const locator = this.page.locator(this.selectors.salesDepartmentDropdownOption);
    const count = await locator.count();
    const availableTexts: string[] = [];
    
    // Get all available option texts from combobox
    for (let i = 0; i < count; i++) {
      const text = await locator.nth(i).textContent();
      if (text) {
        availableTexts.push(text.trim());
      }
    }
    
    // Check if all expected options are present in available texts
    for (const expectedText of expectedOptions) {
      if (!availableTexts.includes(expectedText)) {
        return false;
      }
    }
    
    return true;
  }

  async clickSearchButton(): Promise<void> {
    const locator = this.page.locator(this.selectors.searchButton);
    await locator.click({ timeout: 10000 });
  }

  async isSearchButtonVisible(): Promise<boolean> {
    const locator = this.page.locator(this.selectors.searchButton);
    return await locator.isVisible({ timeout: 10000 }).catch(() => false);
  }

  async clickItemMenuCart(): Promise<void> {
    await super.clickItemMenu('カート');
  }

  async isShnCdDisabled(): Promise<boolean> {
    const locator = this.page.locator(this.selectors.shnCdInput).first();
    await this.page.waitForTimeout(1000); // Wait for modeFlg to be applied
    return await this.isInputDisabled(locator);
  }

  async isIconDisabled(): Promise<boolean> {
    const locator = this.page.locator(this.selectors.searchButton);
    return await locator.isDisabled({ timeout: 10000 }).catch(() => false);
  }

  async isErrorMessageVisible(errorMessage: string, field: string): Promise<boolean> {
    const locator = this.page.locator(`p.text-red-600:has-text("${errorMessage}")`);
    return await locator.isVisible({ timeout: 10000 }).catch(() => false);
  }
}

