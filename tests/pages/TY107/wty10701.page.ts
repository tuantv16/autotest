/**
 * WTY10401 Store Inventory Inquiry Page Object
 * Page Object for 店別在庫照会 screen
 */

import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { VALIDATION_ERROR_MESSAGES } from '../../constants/messages';

export class WTY10701Page extends BasePage {
    // Selectors
    protected readonly selectors = {
        headingTitle: 'p:has-text("オーダー商品在庫照会")',
        errorClass: '_error_cbu4e_24',
        btenCdInput: '#btenCd',
        searchButton: 'form button:has-text("検索")',
        shnCdInput: '#shnCd',
        basicProductMenuItem: 'ul[role="menu"] li:has-text("商品基本")',
        productPriceMenuItem: 'ul[role="menu"] li:has-text("商品価格")',
        storeInventoryMenuItem: 'ul[role="menu"] li:has-text("店別在庫")',
        popup: 'div[data-function-popup="true"]',
        clearInputIcon: 'img[role="button"][data-testid="ClearButton"]',
        scannerIcon: 'div.scanner-icon button',
        buttonClear: 'button:has-text("クリア")',
        errorDialog: '#ty107-error-dialog',
        storeNameInput: 'input[name="rykbtenNmKnj"]',
        blankErrorLabel: 'p.text-red-600:has-text("必須入力項目です。")',
        errorLabel: 'p.text-red-600',
        modelNumberInput: 'input[name="modelNumber"]',
        manufacturerNameInput: 'input[name="manufacturerName"]',
        setInput: 'input[name="set1"]',
        setInput2: 'input[name="set2"]',
        rankInput: 'input[name="rank"]',
        rank1Input: 'input[name="rank1"]',
        rank2Input: 'input[name="rank2"]',
        availableQuantity: 'span.available-quantity',
        orderProductTable: "#ordered-product-inventory",
        btenCdClearInputIcon: '#btenCd + img[data-testid="ClearButton"]',
        shnCdClearInputIcon: '#shnCd ~ img[data-testid="ClearButton"]',
    };

    constructor(page: Page) {
        super(page);
    }

    /**
     * Navigate to WTY10701 Inquiry Of Ordered Product Inventory screen
     */
    async navigate(pilotKey: string = 'prod'): Promise<void> {
        const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTY10701InquiryOfOrderedProductInventory?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
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
     * Check if heading title "オーダー商品在庫照会" is visible
     */
    async isHeadingTitleVisible(): Promise<boolean> {
        const locator = this.page.locator(this.selectors.headingTitle);
        return await locator.isVisible({ timeout: 10000 }).catch(() => false);
    }

    async fillBtenCdInput(value: string): Promise<void> {
        const locator = this.page.locator(this.selectors.btenCdInput);
        await this.fillInput(locator, value);
    }

    async clickSearchButton(): Promise<void> {
        const locator = this.page.locator(this.selectors.searchButton);
        await this.clickWithRetry(locator);
        await this.page.waitForTimeout(2000);
    }

    async fillShnCdInput(value: string): Promise<void> {
        const locator = this.page.locator(this.selectors.shnCdInput);
        await this.fillInput(locator, value);
    }

    focusBtenCdInput(): Promise<void> {
        const locator = this.page.locator(this.selectors.btenCdInput);
        return locator.focus();
    }

    focusShnCdInput(): Promise<void> {
        const locator = this.page.locator(this.selectors.shnCdInput);
        return locator.focus();
    }

    blurShnCdInput(): Promise<void> {
        const locator = this.page.locator(this.selectors.shnCdInput);
        return locator.blur();
    }
    
    async blurBtenCdInput(): Promise<void> {
        const locator = this.page.locator(this.selectors.btenCdInput);
        await locator.blur();
        await this.page.waitForTimeout(2000);
    }

    getBasicProductMenuItem(): Locator {
        return this.page.locator(this.selectors.basicProductMenuItem);
    }
    
    getProductPriceMenuItem(): Locator {
        return this.page.locator(this.selectors.productPriceMenuItem);
    }

    getStoreInventoryMenuItem(): Locator {
        return this.page.locator(this.selectors.storeInventoryMenuItem);
    }

    getPopup(): Locator {
        return this.page.locator(this.selectors.popup);
    }

    getClearInputIcon(): Locator {
        return this.page.locator(this.selectors.clearInputIcon);
    }

    getScannerIcon(): Locator {
        return this.page.locator(this.selectors.scannerIcon).first();
    }

    getSearchButton(): Locator {
        return this.page.locator(this.selectors.searchButton).first();
    }

    getButtonClear(): Locator {
        return this.page.locator(this.selectors.buttonClear).first();
    }

    getBtenCdInput(): Locator {
        return this.page.locator(this.selectors.btenCdInput);
    }

    getShnCdInput(): Locator {
        return this.page.locator(this.selectors.shnCdInput);
    }

    getErrorDialog(): Locator {
        return this.page.locator(this.selectors.errorDialog).first();
    }

    async clickBody(): Promise<void> {
        await this.page.waitForTimeout(500);
        await this.page.click('body');
    }

    getStoreNameInput(): Locator {
        return this.page.locator(this.selectors.storeNameInput).first();
    }

    getStoreNameInputValue(): Promise<string> {
        return this.page.inputValue(this.selectors.storeNameInput);
    }

    getBlankErrorLabel(): Locator {
        return this.page.locator(this.selectors.blankErrorLabel);
    }

    getErrorLabel(): Locator {
        return this.page.locator(this.selectors.errorLabel);
    }

    getModelNumberInputValue(): Promise<string> {
        return this.page.inputValue(this.selectors.modelNumberInput);
    }

    getManufacturerNameInputValue(): Promise<string> {
        return this.page.inputValue(this.selectors.manufacturerNameInput);
    }

    getSetInputValue(): Promise<string> {
        return this.page.inputValue(this.selectors.setInput);
    }

    getSetInputValue2(): Promise<string> {
        return this.page.inputValue(this.selectors.setInput2);
    }

    getRankInputValue(): Promise<string> {
        return this.page.inputValue(this.selectors.rankInput);
    }

    getRank2InputValue(): Promise<string> {
        return this.page.inputValue(this.selectors.rank2Input);
    }

    getAvailableQuantityValue(): Promise<string | null> {
        return this.page.textContent(this.selectors.availableQuantity);
    }

    // row tính từ 0 - col tính từ 1
    async getDataTableByColAndRow(row: number, col: number): Promise<string> {
        const cellLocator = this.page
            .locator(this.selectors.orderProductTable)
            .locator(`div[role="row"][row-index="${row}"] div[role="gridcell"][aria-colindex="${col}"] span.ag-cell-value`);
        const text = await cellLocator.textContent();
        return text?.trim() ?? '';
    }

    getBtenCdClearInputIcon(): Locator {
        return this.page.locator(this.selectors.btenCdClearInputIcon);
    }

    getShnCdClearInputIcon(): Locator {
        return this.page.locator(this.selectors.shnCdClearInputIcon);
    }

}

