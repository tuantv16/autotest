/**
 * WTY10401 Store Inventory Inquiry Page Object
 * Page Object for 店別在庫照会 screen
 */

import { Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { VALIDATION_ERROR_MESSAGES } from '../../constants/messages';

export class TY1040Page extends BasePage {
    // Selectors
    protected readonly selectors = {
        headingTitle: '.text-heading-h5:has-text("店別在庫照会"), .text-heading-h6:has-text("店別在庫照会")',
        productInput: '#shnCd',
        productBarcodeButton: 'label[for="shnCd"] ~ div button[type="button"]:has(svg)',
        salesDepartmentCombobox: '#jgyksCd[role="combobox"], label[for="jgyksCd"] ~ div [role="combobox"]',
        salesDepartmentComboboxContainer: 'label[for="jgyksCd"] ~ div',
        salesDepartmentComboboxId: '#jgyksCd',
        areaDropdownCombobox: '#areaCd[role="combobox"], label[for="areaCd"] ~ div [role="combobox"]',
        areaDropdownComboboxContainer: 'label[for="areaCd"] ~ div',
        areaDropdownComboboxId: '#areaCd',
        moveDownButton: 'button:has(svg path.stroke-text-sub)',
        storeLabel: 'label:has-text("店舗")',
        salesDepartmentDropdownMenu: '#_r_1_',
        salesDepartmentDropdownOption: '#_r_1_ li',
        searchButton: 'form button[type="submit"]:has-text("検索")',
        shnCdInput: 'input[name="shnCd"], #shnCd',
        errorClass: '_error_cbu4e_24',
        mkKataInput: '#mkKata',
        errorDialogAddCart: '#wty10401-error-dialog',
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
     * Click on combobox and select option by data-value
     * @param dataValue - data-value attribute of the option to select (e.g., "01", "02")
     * @param comboboxSelector - Optional selector for the combobox (default: salesDepartmentCombobox)
     */
    async selectComboboxOptionByValue(dataValue: string, comboboxSelector?: string): Promise<void> {
        const selector = comboboxSelector ?? this.selectors.salesDepartmentCombobox;
        await super.selectComboboxOptionByValue(dataValue, selector, this.selectors.salesDepartmentDropdownOption);
    }

    /**
     * Click on combobox and select option by text
     * @param optionText - Text of the option to select
     * @param comboboxSelector - Optional selector for the combobox (default: salesDepartmentCombobox)
     */
    async selectComboboxOptionByText(optionText: string, comboboxSelector?: string): Promise<void> {
        const selector = comboboxSelector ?? this.selectors.salesDepartmentCombobox;
        const optionSelectors = [
            `ul.MuiList-root li[role="option"]:has-text("${optionText}")`,
            `${this.selectors.salesDepartmentDropdownOption}:has-text("${optionText}")`,
            `li[role="option"]:has-text("${optionText}")`,
        ];
        await super.clickOptionInCombobox(optionSelectors, `Option with text "${optionText}" not found in combobox dropdown`, selector);
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

    async clickItemMenuProductBasic(): Promise<void> {
        await super.clickItemMenu('商品基本');
    }

    async clickItemMenuProductPrice(): Promise<void> {
        await super.clickItemMenu('商品価格');
    }

    async clickItemMenuOrder(): Promise<void> {
        await super.clickItemMenu('オーダー');
    }

    async clickItemMenuColorVariation(): Promise<void> {
        await super.clickItemMenu('カラバリ');
    }

    async clickItemMenuArrivePlan(): Promise<void> {
        await super.clickItemMenu('入荷予定');
    }

    async clickItemMenuBarcode(): Promise<void> {
        await super.clickItemMenu('バーコード');
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

    async hasErrorBorderShnCd(): Promise<boolean> {
        return await this.hasErrorBorderById('shnCd');
    }

    async fillInputShnCd(value: string): Promise<void> {
        await this.fillInputById('shnCd', value);
        await this.page.waitForTimeout(1000);
    }

    async focusShnCd(): Promise<void> {
        const locator = this.page.locator(this.selectors.shnCdInput);
        await this.waitForVisible(locator, 2000);
        await locator.click({ timeout: 2000 });
    }

    async blurShnCd(): Promise<void> {
        const locator = this.page.locator(this.selectors.shnCdInput);
        await this.waitForVisible(locator, 2000);
        await locator.blur({ timeout: 2000 });
    }

    async inputDataSearchBasic(formData: any): Promise<void> {
        await this.fillInputShnCd(formData.shnCd_33);
        await this.selectedOption('表示在庫', '有効');
        await this.selectedOption('在庫部店', '店舗');
        await this.selectComboboxOptionByValue(formData.jgyksCd_33);
    }

    async clickOptionDCSC(): Promise<void> {
        await this.selectedOption('在庫部店', 'DC＆SC');
    }

    async clickOptionOtherStore(): Promise<void> {
        await this.selectedOption('在庫部店', '店舗');
    }

    async selectComboboxOptionKinki(): Promise<void> {
        await this.selectComboboxOptionByText('近畿', this.selectors.salesDepartmentCombobox);
    }

    async selectCbArea(): Promise<void> {
        await this.selectComboboxOptionByText('エリアコ2', this.selectors.areaDropdownCombobox);
    }

    async selectCbAreaValueEmpty(): Promise<void> {
        await this.selectComboboxOptionByText('', this.selectors.areaDropdownCombobox);
    }

    /**
     * Get rank and logistics cell values from summary table
     * @returns Object containing rankValue and logisticsValue (trimmed, empty string if no value)
     */
    async getRankAndLogisticsValues(): Promise<{ rankValue: string; logisticsValue: string }> {
        const rankCell = this.page.locator('//*[@id="store-inventory-inquiry"]/div[1]/div[4]/div[1]/div[2]/div[3]/div[1]/div[2]/div/div/div[2]').first();
        const logisticsCell = this.page.locator('//*[@id="store-inventory-inquiry"]/div[1]/div[4]/div[1]/div[2]/div[3]/div[1]/div[2]/div/div/div[3]').first();
        
        await rankCell.waitFor({ state: 'visible', timeout: 5000 });
        await logisticsCell.waitFor({ state: 'visible', timeout: 5000 });

        const rankText = await rankCell.textContent();
        const logisticsText = await logisticsCell.textContent();
        
        const rankValue = rankText?.trim() || '';
        const logisticsValue = logisticsText?.trim() || '';

        return { rankValue, logisticsValue };
    }

    async getMkKataValue(): Promise<string> {
        return this.getValueById('mkKata');
    }

    /**
     * Get column header text by col-id
     * @param colId - Column ID (e.g., 'rank', 'logistics', 'newProducts', 'display', 'unpacked', 'secured', 'defective')
     * @returns Column header text content (trimmed)
     */
    async getColumnHeaderText(colId: string): Promise<string> {
        const headerLocator = this.page.locator(`div[col-id="${colId}"][role="columnheader"] span.ag-header-cell-text`).first();
        await headerLocator.waitFor({ state: 'visible', timeout: 5000 });
        const text = await headerLocator.textContent();
        return text?.trim() || '';
    }

    /**
     * Verify all summary table column headers
     * @param expectedHeaders - Object with col-id as key and expected header text as value
     */
    async verifySummaryTableHeaders(expectedHeaders: Record<string, string>): Promise<void> {
        for (const [colId, expectedText] of Object.entries(expectedHeaders)) {
            const actualText = await this.getColumnHeaderText(colId);
            if (actualText !== expectedText) {
                throw new Error(`Column header ${colId}: expected "${expectedText}", but got "${actualText}"`);
            }
        }
    }

    /**
     * Get cell value from table data row by col-id
     * @param colId - Column ID (e.g., 'rank', 'logistics', 'code', 'name', etc.)
     * @param rowIndex - Row index (0-based, default: 0 for first data row)
     * @param tableSelector - Optional selector to scope to specific table (e.g., for detail table)
     * @returns Cell text content (trimmed)
     */
    async getTableCellValue(colId: string, rowIndex: number = 0, tableSelector?: string): Promise<string> {
        const baseSelector = tableSelector 
            ? `${tableSelector} div[role="row"][row-index="${rowIndex}"] div[col-id="${colId}"] span.ag-cell-value`
            : `div[role="row"][row-index="${rowIndex}"] div[col-id="${colId}"] span.ag-cell-value`;
        const cellLocator = this.page.locator(baseSelector).first();
        await cellLocator.waitFor({ state: 'visible', timeout: 5000 });
        const text = await cellLocator.textContent();
        return text?.trim() || '';
    }

    /**
     * Get cell value from detail table (table with code and name columns)
     * @param colId - Column ID (e.g., 'code', 'name', 'newProducts', 'specific', 'display', 'unpacked')
     * @param rowIndex - Row index (0-based, default: 0 for first data row)
     * @returns Cell text content (trimmed)
     */
    async getDetailTableCellValue(colId: string, rowIndex: number = 0): Promise<string> {
        // Find detail table by looking for table that has both 'code' and 'name' columns
        const detailTableSelector = 'div[role="grid"]:has(div[col-id="code"]):has(div[col-id="name"])';
        return this.getTableCellValue(colId, rowIndex, detailTableSelector);
    }

    /**
     * Verify table cell value
     * @param colId - Column ID
     * @param expectedValue - Expected cell value
     * @param rowIndex - Row index (default: 0)
     * @param tableSelector - Optional selector to scope to specific table
     */
    async verifyTableCell(colId: string, expectedValue: string, rowIndex: number = 0, tableSelector?: string): Promise<void> {
        const actualValue = await this.getTableCellValue(colId, rowIndex, tableSelector);
        if (actualValue !== expectedValue) {
            throw new Error(`Cell ${colId} at row ${rowIndex}: expected "${expectedValue}", but got "${actualValue}"`);
        }
    }

    /**
     * Verify detail table cell value (table with code and name columns)
     * @param colId - Column ID
     * @param expectedValue - Expected cell value
     * @param rowIndex - Row index (default: 0)
     */
    async verifyDetailTableCell(colId: string, expectedValue: string, rowIndex: number = 0): Promise<void> {
        const actualValue = await this.getDetailTableCellValue(colId, rowIndex);
        if (actualValue !== expectedValue) {
            throw new Error(`Detail table cell ${colId} at row ${rowIndex}: expected "${expectedValue}", but got "${actualValue}"`);
        }
    }

    /**
     * Get cell value from summary table data row by col-id (backward compatibility)
     * @deprecated Use getTableCellValue instead
     */
    async getSummaryTableCellValue(colId: string, rowIndex: number = 0): Promise<string> {
        return this.getTableCellValue(colId, rowIndex);
    }

    /**
     * Verify summary table cell value (backward compatibility)
     * @deprecated Use verifyTableCell instead
     */
    async verifySummaryTableCell(colId: string, expectedValue: string, rowIndex: number = 0): Promise<void> {
        return this.verifyTableCell(colId, expectedValue, rowIndex);
    }

    async clickOptionActualInventory(): Promise<void> {
        await this.selectedOption('表示在庫', '実在庫');
    }

    async scrollToBottom(): Promise<void> {
        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
        await this.page.waitForTimeout(1000);
    }

    async verifyEndOfData(): Promise<string> {
        return this.scrollToBottomAndVerifyEndOfData('#store-inventory-inquiry-2');
    }

    /**
     * Check if error message exists in add cart dialog
     * Finds the dialog with id wty10401-error-dialog and checks if it contains the expected text
     * @param expectedText - Expected error message text to check
     * @returns true if the dialog contains the expected text, false otherwise
     */
    async getErrorMessageAddCart(expectedText: string): Promise<boolean> {
        const dialogLocator = this.page.locator(this.selectors.errorDialogAddCart);
        await dialogLocator.waitFor({ state: 'visible', timeout: 5000 });
        
        // Get text content from dialog and check if it contains the expected text
        const dialogText = await dialogLocator.textContent();
        return dialogText?.includes(expectedText) || false;
    }

    async clearInputShnCd(): Promise<void> {
        const locator = this.page.locator(this.selectors.shnCdInput);
        await locator.clear({ timeout: 10000 });
    }

    async clickButtonSearchNumber(): Promise<void> {
        this.clickButtonByText('型番検索');
    }

    async fillInputDataCondition(formData: any): Promise<void> {
        await this.fillInputById('shnCd', formData.shnCd_standard);
        await this.selectedOption('表示在庫', '実在庫');
        await this.selectedOption('在庫部店', '店舗');  
        await this.selectCbArea();
    }

    async clearData(): Promise<void> {
        await this.clickButtonByText('クリア');
    }

    async verifyDefaultData(): Promise<boolean> {
        // 商品(shnCd) should be empty
        const shnCdValue = await this.getValueById('shnCd');
        if (shnCdValue.trim() !== '') {
            return false;
        }

        // 表示在庫 radio should default to 有効
        const hjZaiChecked = await this.page
            .locator('input[type="radio"][name="hjZai"]:checked')
            .first()
            .getAttribute('value');
        if ((hjZaiChecked ?? '').trim() !== '有効') {
            return false;
        }

        // 在庫部店 radio should default to DC&SC (UI label shows DC＆SC)
        const zaiBtenChecked = await this.page
            .locator('input[type="radio"][name="zaiBten"]:checked')
            .first()
            .getAttribute('value');
        if ((zaiBtenChecked ?? '').trim() !== 'DC&SC') {
            return false;
        }

        // 営業部 combobox should default to エディオン
        const jgyksText = (await this.page.locator('#jgyksCd[role="combobox"]').first().textContent())?.trim() || '';
        if (jgyksText !== '事業会社コード2') {
            return false;
        }

        return true;
    }

    async verifySummaryTableHasNoDataRow(): Promise<boolean> {
        const grid = this.page.locator('#store-inventory-inquiry2');
        const firstRowVisible = await grid.locator('div[role="row"][row-index="0"]').isVisible().catch(() => false);
        return !firstRowVisible;
    }

    async verifyDefaultShnCd(): Promise<boolean> {
        // 商品(shnCd) should be empty
        const shnCdValue = await this.getValueById('shnCd');
        if (shnCdValue.trim() !== '') {
            return false;
        }

        return true;
    }

    async verifyErrorMessageInvalid(field: string): Promise<boolean> {
        const isErrorMessageVisible = await this.isErrorMessageVisible(VALIDATION_ERROR_MESSAGES.REQUIRED_FIELD, '商品');
        return isErrorMessageVisible;
    }

}

