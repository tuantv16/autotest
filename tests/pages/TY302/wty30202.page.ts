/**
 * WTY30201 Product Price Output Instructions Page Object
 * Page Object for 商品プライス出力指示 screen
 */

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base.page';

export class TY30202Page extends BasePage {
  // Selectors
  private readonly selectors = {
    // Form fields
    outDateInput: 'input[name="outDate"]',

    // Buttons
    clearButton: 'button:has-text("クリア")',
    clearOutDate: 'span[data-testid="ClearButton"]',
    outDateCommitButton: 'button:has-text("出力日変更")[type="button"]',

  };
    constructor(page: Page) {
    super(page);
  }

    get selectorsObj() {
      return {
        outDateInput: this.selectors.outDateInput,
        clearButton: this.selectors.clearButton,
        clearOutDate: this.selectors.clearOutDate,
        outDateCommitButton: this.selectors.outDateCommitButton,
      };
    }

    /**
     * Navigate to WTY30202 Product Price Print List screen
     * */
  async navigate(pilotKey: string = 'prod'): Promise<void> {
    const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTY30202ProductPricePrintList`;
    await this.goto(url);
  } 

    async clickOutDateCommit(): Promise<void> {
        await this.page.locator(this.selectors.outDateCommitButton).click();
    }

    async fillOutDate(date: string): Promise<void> {
        await this.fillInput(this.page.locator(this.selectors.outDateInput), date);
    }

    async clickClear(): Promise<void> {
        await this.page.locator(this.selectors.clearButton).click();
    }

    async clickClearOutDate(): Promise<void> {
        await this.page.locator(this.selectors.clearOutDate).click();
    }

    async waitForFormReady(): Promise<void> {
        await this.waitForVisible(this.page.locator(this.selectors.outDateInput));
        await this.page.waitForTimeout(500);
    }

//     async scrollToBottom(): Promise<void> {
//       await this.page.evaluate(() => {
//     const scrollHeight = Math.max(
//       document.body.scrollHeight,
//       document.documentElement.scrollHeight
//     );

//     const maxScrollTop = scrollHeight - window.innerHeight;

//     window.scrollTo(0, maxScrollTop / 2);
//   });
//     }
}