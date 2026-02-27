/**
 * WTY10802 Check purchase history detail information
 * Page Object for 購入履歴明細 screen
 */

import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { VALIDATION_ERROR_MESSAGES } from '../../constants/messages';

export class WTY10802Page extends BasePage {
    // Selectors
    protected readonly selectors = {
        headingTitle: 'div.text-text-main:has-text("購入履歴明細")',
        
        errorClass: '_error_cbu4e_24',
    };

    constructor(page: Page) {
        super(page);
    }

    get selectorsObj() {
      return {
        headingTitle: this.page.locator(this.selectors.headingTitle),
       
        errorClass: this.page.locator(this.selectors.errorClass),
      };
    }
    /**
     * Navigate to WTY10801 Purchase History Inquiry screen
     */
    async navigate(pilotKey: string = 'prod'): Promise<void> {
        const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTY10802PurchaseHistoryDetail`;
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

   
}

