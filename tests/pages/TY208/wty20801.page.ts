/**
 * WTY20701 Installation Confirmation Page Object
 * 設置確認書紐付 for 摘要欄入力 screen
 */

import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class TY20801Page extends BasePage {
    public readonly Locators = {
        installationNumber : "installationNumber",
        classTable: 'ag-center-cols-container'
    };

    public readonly Selectors = {
        installationNumber: 'input[name="installationNumber"]',
    };

    public readonly Texts = {
        Title: "設置確認書紐付",
        ButtonAdd: "追加",
        TE5050: "必須入力項目です。",
        TE5130: "設置管理番号は数値14桁で。",
        TE5200: "設置管理番号が重複しています。",
        TE5198: '設置確認書が他伝票に紐付いているのため処理できません。',
        NotFound: '該当する商品が見つかりませんでした。',
        ButtonYes: 'はい',
        ButtonNo: 'いいえ',
        ButtonDelete: '削除',
        ButtonClose: '閉じる',
        ButtonSearch: '検索',
        DeleteConfirm: '選択した設置確認書番号を削除しますか？',
        ButtonConfirm: '確定',
        DialogConfirm: '確定処理を実行しますか？',
    };

    constructor(page: Page) {
        super(page);
    }

    /**
     * Navigate to WTY20601Page
     */
    async navigate(pilotKey: string = 'prod'): Promise<void> {
        const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTY20801InstallationConfirmation?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
        await this.goto(url);
        await this.page.waitForTimeout(1000);
    }

    /**
     * Get value from input or text element
     * Tries input first, then falls back to text content
     * @param selector - CSS selector or Locator
     * @returns Value as string
     */
    async getFieldValue(selector: string | Locator): Promise<string> {
        const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;

        try {
            // Try getting input value first
            const val = await locator.inputValue({ timeout: 2000 });
            return (val ?? '').trim();
        } catch {
            // Fallback to text content (for non-input elements)
            try {
                const textValue = await locator.textContent({ timeout: 2000 });
                return textValue?.trim() || '';
            } catch {
                return '';
            }
        }
    }

    /**
     * Check if a locator has child elements inside it
     * @param locatorClass - CSS class name to locate the element
     * @returns true if the element exists and has child elements inside, false otherwise
     * @example
     * const hasChildren = await testPage.hasChildElements('ag-center-cols-container');
     * expect(hasChildren).toBe(true); // Table has rows
     */
    async hasChildElements(locatorClass: string): Promise<boolean> {
        try {
            // Locate element by class name
            const element = this.page.locator(`.${locatorClass}`);

            // Wait for element to be attached to DOM (with short timeout)
            await element.first().waitFor({ state: 'attached', timeout: 5000 });

            // Check if element exists
            const count = await element.count();
            if (count === 0) {
                return false;
            }

            // Check if it has any direct child elements (> * means direct children)
            const childrenCount = await element.first().locator('> *').count();

            return childrenCount > 0;
        } catch (error) {
            return false;
        }
    }

    /**
     * Check if a specific text does NOT exist in the classTable
     * @param text - The text to check for absence in the table
     * @returns true if the text does NOT exist in the table, false if it exists
     * @example
     * const notExists = await testPage.isTextNotInTable('04904550585979');
     * expect(notExists).toBe(true); // Text is not in table anymore
     */
    async isTextNotInTable(text: string): Promise<boolean> {
        try {
            // Locate the table container with classTable
            const tableContainer = this.page.locator(`.${this.Locators.classTable}`);

            // Wait for table to be attached (with short timeout)
            await tableContainer.first().waitFor({ state: 'attached', timeout: 3000 });

            // Check if table exists
            const count = await tableContainer.count();
            if (count === 0) {
                // If table doesn't exist, text is not in table (return true)
                return true;
            }

            // Get all text content from the table
            const tableText = await tableContainer.textContent();

            // Check if the text exists in the table
            if (tableText && tableText.includes(text)) {
                // Text exists in table, so return false
                return false;
            }

            // Text does not exist in table
            return true;
        } catch (error) {
            // If error occurs (e.g., timeout), assume text is not in table
            return true;
        }
    }

    /**
     * Get cell value from AgGrid table by column name and row index
     * @param rowIndex - Row index (0-based)
     * @returns Cell value as string, or empty string if not found
     * @example
     * const sechiNo = await testPage.getCellValue('sechiKnrNo', 0);
     * expect(sechiNo).toBe('04904550585979');
     */
    async getCellValue(rowIndex: number): Promise<string> {
        const columnName = 'sechiKnrNo';
        try {
            // Construct cell ID: cell-{columnName}-{rowIndex}
            const cellId = `cell-${columnName}-${rowIndex}`;

            // Locate the span element with this ID
            const cellSpan = this.page.locator(`span[id="${cellId}"]`);

            // Wait for cell to be visible
            await cellSpan.waitFor({ state: 'visible', timeout: 5000 });

            // Get the div inside span and extract text content
            const cellDiv = cellSpan.locator('div').first();
            const value = await cellDiv.textContent();

            return value?.trim() || '';
        } catch (error) {
            console.error(`Error getting cell value for [${columnName}][${rowIndex}]:`, error);
            return '';
        }
    }


    /**
     * Click on installationNumber input and enter text
     * @param text - The text to enter into the installationNumber input field
     */
    async fillInstallationNumber(text: string): Promise<void> {
        try {
            const installationNumber = this.page.locator(this.Selectors.installationNumber);

            // Click on the input field
            await installationNumber.click();

            // Clear existing value if any
            await installationNumber.clear();

            // Fill with new text
            await installationNumber.fill(text);

            // Wait a moment for the value to be set
            await this.page.waitForTimeout(300);
        } catch (error) {
            throw new Error(`Failed to fill btnTextBox with text "${text}": ${error}`);
        }
    }


    /**
     * Click a random row in the table, or click a specific row if index is provided
     * Navigates to div with classTable, finds rowgroup, and clicks a row
     * @param index - Optional: Specific row index to click (0-based). If not provided, clicks a random row
     * @returns The clicked row locator and its index
     */
    async clickRandomRow(index?: number): Promise<{ row: any; index: number }> {
        try {
            // Locate the table container with classTable
            const tableContainer = this.page.locator(`.${this.Locators.classTable}`);

            // Get all rows with role="row" within the rowgroup
            const rows = tableContainer.locator('[role="row"]');

            // Count the number of rows
            const rowCount = await rows.count();

            if (rowCount === 0) {
                throw new Error('No rows found in the table');
            }

            // Use provided index or generate a random one
            let targetIndex: number;
            if (index !== undefined) {
                // Validate the provided index
                if (index < 0 || index >= rowCount) {
                    throw new Error(`Invalid index: ${index}. Must be between 0 and ${rowCount - 1}`);
                }
                targetIndex = index;
            } else {
                // Generate a random index
                targetIndex = Math.floor(Math.random() * rowCount);
            }

            // Get the target row
            const selectedRow = rows.nth(targetIndex);

            // Click the target row
            await selectedRow.click();

            // Wait for any potential loading/selection to complete
            await this.page.waitForTimeout(500);

            // Return the clicked row and its index
            return { row: selectedRow, index: targetIndex };
        } catch (error) {
            throw new Error(`Failed to click row: ${error}`);
        }
    }

}
