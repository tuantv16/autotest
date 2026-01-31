/**
 * WTY11001 Check arrival schedule information
 * Page Object for 入荷予定情報照会 screen
 */

import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { VALIDATION_ERROR_MESSAGES } from '../../constants/messages';

export interface WTY11001FormData {
  rootKbn: string;
  arriveReason: string;
  startDate: string;
  endDate: string;
  mkKata: string;
  brNm: string;
  slipNo: string;
  shnCd: string;
  brCd: string;
}

export class WTY11001Page extends BasePage {
    // Selectors
    protected readonly selectors = {
        headingTitle: '.text-heading-h6:has-text("入荷予定情報照会")',
        actionMenuButton: 'button.MuiButtonBase-root[aria-haspopup="true"]',
        rootKbnSelector: '#rootKbn',
        arriveReasonSelector: '#arriveReason',
        startDateInput: 'input[name=startDate]',
        endDateInput: 'input[name=endDate]',
        mkKataInput: '#mkKata',
        brNmInput: '#brNm',
        slipNoInput: '#slipNo',
        shnCdInput: '#shnCd',
        brCdInput: '#brCd',

        searchButton: 'button:has-text("検索")[type="submit"]',
        toggleDetailButton: 'button:has(svg path.stroke-text-sub)',
        clearButton: 'button:has-text("クリア")',
        clearSlipNoButton: '#slipNo+img[role=button]',
        clearShnCdButton: '#shnCd+div+img[role=button]',
        clearBrCdButton: '#brCd+img[role=button]',
        clearStartDateButton: '#startDate div div span[data-testid="ClearButtonIcon"]',
        clearEndDateButton: '#endDate div div span[data-testid="ClearButtonIcon"]',
        barCodeButton: 'div.right-2.absolute.top-1\\/2.-translate-y-1\\/2.transform button.cursor-pointer[type="button"]',

    };

    constructor(page: Page) {
        super(page);
    }

    get selectorsObj() {
      return {
        headingTitle: this.page.locator(this.selectors.headingTitle),
        actionMenuButton: this.page.locator(this.selectors.actionMenuButton),
        rootKbnSelector: this.page.locator(this.selectors.rootKbnSelector),
        arriveReasonSelector: this.page.locator(this.selectors.arriveReasonSelector),
        startDateInput: this.page.locator(this.selectors.startDateInput),
        endDateInput: this.page.locator(this.selectors.endDateInput),
        mkKataInput: this.page.locator(this.selectors.mkKataInput),
        brNmInput: this.page.locator(this.selectors.brNmInput),
        slipNoInput: this.page.locator(this.selectors.slipNoInput),
        shnCdInput: this.page.locator(this.selectors.shnCdInput),
        brCdInput: this.page.locator(this.selectors.brCdInput),
        searchButton: this.page.locator(this.selectors.searchButton),
        toggleDetailButton: this.page.locator(this.selectors.toggleDetailButton),
        clearButton: this.page.locator(this.selectors.clearButton),
        clearSlipNoButton: this.page.locator(this.selectors.clearSlipNoButton),
        clearShnCdButton: this.page.locator(this.selectors.clearShnCdButton),
        clearBrCdButton: this.page.locator(this.selectors.clearBrCdButton),
        barCodeButton: this.page.locator(this.selectors.barCodeButton),
        clearStartDateButton: this.page.locator(this.selectors.clearStartDateButton),
        clearEndDateButton: this.page.locator(this.selectors.clearEndDateButton),
      };
    }
    /**
     * Navigate to WTY11001 Store Inventory Inquiry screen
     */
    async navigate(pilotKey: string = 'prod'): Promise<void> {
        const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTY11001InventoryStatusInquiry?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
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

    async clickMenuButton(): Promise<void> {
      await this.openActionMenu(this.selectors.actionMenuButton);
    }

    async clickClearStartDateButton(): Promise<void> {
      await this.page.locator(this.selectors.clearStartDateButton).click();
    }

    async clickClearEndDateButton(): Promise<void> {
      await this.page.locator(this.selectors.clearEndDateButton).click();
    }

    async clickClearSlipNoButton(): Promise<void> {
      await this.page.locator(this.selectors.clearSlipNoButton).click();
    }

    async clickBarCodeButton(): Promise<void> {
      await this.page.locator(this.selectors.barCodeButton).click();
    }

    async clickClearBrCdButton(): Promise<void> {
      await this.page.locator(this.selectors.clearBrCdButton).click();
    }

    async clickClearShnCdButton(): Promise<void> {
      await this.page.locator(this.selectors.clearShnCdButton).click();
    }

    async clickClearButton(): Promise<void> {
      await this.page.locator(this.selectors.clearButton).click();
    }

    async clickToggleDetailButton(): Promise<void> {
      await this.page.locator(this.selectors.toggleDetailButton).click();
    }

    async clickRootKbnSelector(): Promise<void> {
      await this.page.locator(this.selectors.rootKbnSelector).click();
    }

    async clickArriveReasonSelector(): Promise<void> {
      await this.page.locator(this.selectors.arriveReasonSelector).click();
    }

    async fillStartDate(value: string): Promise<void> {
      await this.fillInput(this.page.locator(this.selectors.startDateInput), value);
    }

    async fillEndDate(value: string): Promise<void> {
      await this.fillInput(this.page.locator(this.selectors.endDateInput), value);
    }

    async fillSlipNo(value: string): Promise<void> {
      await this.fillInput(this.page.locator(this.selectors.slipNoInput), value);
    }

    async fillShnCd(value: string): Promise<void> {
      await this.fillInput(this.page.locator(this.selectors.shnCdInput), value);
    }

    async fillBrCd(value: string): Promise<void> {
      await this.fillInput(this.page.locator(this.selectors.brCdInput), value);
    }

    async selectCombobox(value: string): Promise<void> {
      await this.page.locator(`div.MuiPaper-root ul.MuiList-root[role="listbox"] li:has-text("${value}")`).click();
    }

    async selectArriveReason(value: string): Promise<void> {
      await this.clickOptionInCombobox(
          [this.selectors.arriveReasonSelector + ` >> text=${value}`],
            '',
            this.selectors.arriveReasonSelector
        );
    }

    async fillForm(formData: WTY11001FormData): Promise<void> {
        await this.fillStartDate(formData.startDate);
        await this.fillEndDate(formData.endDate);
        await this.clickOptionInCombobox(
            [this.selectors.rootKbnSelector + ` >> text=${formData.rootKbn}`],
            '',
            this.selectors.rootKbnSelector
        );
        await this.clickOptionInCombobox(
            [this.selectors.arriveReasonSelector + ` >> text=${formData.arriveReason}`],
            '',
            this.selectors.arriveReasonSelector
        );
        await this.fillSlipNo(formData.slipNo);
        await this.fillShnCd(formData.shnCd);
        await this.fillBrCd(formData.brCd);
    }

    async clickSearchButton(): Promise<void> {
      await this.page.locator(this.selectors.searchButton).click();
    }

    async clickItemMenuByText(itemText: string): Promise<void> {
      await this.page.getByRole('menuitem', { name: itemText }).click();
    }
}

