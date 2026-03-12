/**
 * WTY10801 Check purchase history information
 * Page Object for 購入履歴照会 screen
 */

import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { VALIDATION_ERROR_MESSAGES } from '../../constants/messages';

export class WTY10801Page extends BasePage {
    // Selectors
    protected readonly selectors = {
        headingTitle: 'div.text-text-main:has-text("購入履歴照会")',
        actionMenuButton: 'button.MuiButtonBase-root[aria-haspopup="true"]',
        kokNmInput: '#kokNm',
        startDate: '#_r_1_',
        endDate: '#_r_4_',
        chuCdInput: '#chuCd',
        chuNmInput: '#chuNm',
        denNoInput: '#denNo',
        hjZai1Input: 'label input+span:has-text("全表示")',
        hjZai2Input: 'label input+span:has-text("保証あり")',

        buttonSearch: 'button:has-text("検索")[type="submit"]',
        clearStartDateButton: '#juchuDateFrom div div span[data-testid="ClearButtonIcon"]',
        clearEndDateButton: '#juchuDateTo div div span[data-testid="ClearButtonIcon"]',
        clearChuCdButton: '#chuCd + img',
        clearDenNoButton: '#denNo + div + img',
        menuItemButton: "ul.MuiList-root li.MuiMenuItem-root span:has-text('履歴明細')",
        barcodeButton: '#denNo + div div button',
        errorClass: '_error_cbu4e_24',
    };

    constructor(page: Page) {
        super(page);
    }

    get selectorsObj() {
      return {
        headingTitle: this.page.locator(this.selectors.headingTitle),
        actionMenuButton: this.page.locator(this.selectors.actionMenuButton),
        kokNmInput: this.page.locator(this.selectors.kokNmInput),
        startDate: this.page.locator(this.selectors.startDate),
        endDate: this.page.locator(this.selectors.endDate),
        chuCdInput: this.page.locator(this.selectors.chuCdInput),
        chuNmInput: this.page.locator(this.selectors.chuNmInput),
        denNoInput: this.page.locator(this.selectors.denNoInput),
        hjZai1Input: this.page.locator(this.selectors.hjZai1Input),
        hjZai2Input: this.page.locator(this.selectors.hjZai2Input),
        buttonSearch: this.page.locator(this.selectors.buttonSearch),
        menuItemButton: this.page.locator(this.selectors.menuItemButton),
        errorClass: this.page.locator(this.selectors.errorClass),
      };
    }
    /**
     * Navigate to WTY10801 Purchase History Inquiry screen
     */
    async navigate(pilotKey: string = 'prod'): Promise<void> {
        const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTY10801PurchaseHistory?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
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

    async clearChuCd(): Promise<void> {
      await this.page.locator(this.selectors.clearChuCdButton).click();
    }

    async clearDenNo(): Promise<void> {
      await this.page.locator(this.selectors.clearDenNoButton).click();
    }

    async clickDetail(): Promise<void> {
      await this.page.locator(this.selectors.menuItemButton).click();
    }

    async clickMenuButton(): Promise<void> {
      await this.openActionMenu(this.selectors.actionMenuButton);
    }

    async clickClearStartDateButton(): Promise<void> {
      await this.page.locator(this.selectors.clearStartDateButton).click();
    }

    async clickClearEndDateButton(): Promise<void> {
      await this.page.locator(this.selectors.clearEndDateButton).click();
    }

    async fillStartDate(value: string): Promise<void> {
      await this.fillInput(this.page.locator(this.selectors.startDate), value);
    }

    async fillEndDate(value: string): Promise<void> {
      await this.fillInput(this.page.locator(this.selectors.endDate), value);
    }

    async fillChuCd(value: string): Promise<void> {
      await this.fillInput(this.page.locator(this.selectors.chuCdInput), value);
    }

    async fillDenNo(value: string): Promise<void> {
      await this.fillInput(this.page.locator(this.selectors.denNoInput), value);    
    }

    async clickHjZai(value: number): Promise<void> {
      if (value === 1) {
        await this.page.locator(this.selectors.hjZai1Input).click();
      } else if (value === 2) {
        await this.page.locator(this.selectors.hjZai2Input).click();
      }
    }

    async clickSearchButton(): Promise<void> {
      await this.page.locator(this.selectors.buttonSearch).click();
    }

    async clickBarCodeButton(): Promise<void> {
      await this.page.locator(this.selectors.barcodeButton).click();
    }
    
}

