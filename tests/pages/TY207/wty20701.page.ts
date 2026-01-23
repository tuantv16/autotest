/**
 * WTY20701 Installation Confirmation Page Object
 * 設置確認書紐付 for 摘要欄入力 screen
 */

import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class WTY207010Page extends BasePage {
    public readonly classCellOutput = 'multi-row-cell-item';

    constructor(page: Page) {
        super(page);
    }

    /**
     * Navigate to WTY207010Page Arrage Plan Direct Delivery screen
     */
    async navigate(pilotKey: string = 'prod'): Promise<void> {
        const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTY20701ArragePlanDirectDerivery?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
        await this.goto(url);
        await this.page.waitForTimeout(1000);
    }


    /**
     * Get label's 'for' attribute by its visible text
     * @param labelText - Text of the label
     * @param timeout - Timeout in milliseconds (default: 5000)
     * @returns 'for' attribute value or null if not found
     */
    async getLabelForByText(labelText: string, timeout: number = 5000): Promise<string | null> {
        const label = this.page.locator(`label:has-text("${labelText}")`).first();
        try {
            await this.waitForVisible(label, timeout);
            const forAttr = await label.getAttribute('for');
            if (forAttr && forAttr.trim().length > 0) return forAttr.trim();

            // Fallback: try to infer from id if 'for' not present
            const idAttr = await label.getAttribute('id');
            return idAttr ? idAttr.trim() : null;
        } catch {
            return null;
        }
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
     * Check label and input value
     * @param labelText - Text of the label to check
     * @param expectedValue - Expected value of the input (optional)
     * @returns Input value
     */
    async checkLabelAndInputValue(labelText: string, expectedValue?: string): Promise<string> {
        const labelVisible = await this.waitForTextInBody(labelText, 5000);
        if (!labelVisible) {
            throw new Error(`Label ${labelText} not found`);
        }
        const labelFor = await this.getLabelForByText(labelText);
        const inputSelector = `#${labelFor}`;
        const inputValue = await this.getFieldValue(inputSelector);

        if (expectedValue !== undefined) {
            if (inputValue !== expectedValue) {
                throw new Error(`Expected value "${expectedValue}" but got "${inputValue}"`);
            }
        }
        return inputValue;
    }

    /**
     * Check if rows in ag-pinned-left-cols-container have sequential row numbers
     * @param timeout - Timeout in milliseconds (default: 5000)
     * @returns Object with isSequential flag and array of row numbers found
     */
    async checkPinnedLeftRowsSequential(timeout: number = 5000): Promise<{
        isSequential: boolean;
        rowNumbers: number[];
        error?: string;
    }> {
        try {
            // Locate the container
            const container = this.page.locator('div.ag-pinned-left-cols-container[role="rowgroup"]');
            await this.waitForVisible(container, timeout);

            // Get all rows with role="row"
            const rows = container.locator('div[role="row"]');
            const rowCount = await rows.count();

            if (rowCount === 0) {
                return {
                    isSequential: false,
                    rowNumbers: [],
                    error: 'No rows found in ag-pinned-left-cols-container'
                };
            }

            // Extract row numbers from each row
            const rowNumbers: number[] = [];
            for (let i = 0; i < rowCount; i++) {
                const rowText = await rows.nth(i).textContent();
                // Try to parse the first number found in the row text
                const match = rowText?.match(/\d+/);
                if (match) {
                    rowNumbers.push(parseInt(match[0], 10));
                }
            }

            // Check if numbers are sequential (starting from 1)
            const isSequential = rowNumbers.length > 0 &&
                rowNumbers.every((num, index) => num === index + 1);

            return {
                isSequential,
                rowNumbers
            };
        } catch (error) {
            return {
                isSequential: false,
                rowNumbers: [],
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    async verifyTextHeaders(textHeaders: string[], timeout: number = 5000){
        for (const headerText of textHeaders) {
            const isVisible = await this.waitForTextInBody(headerText, timeout);
            if (!isVisible) {
                return false;
            }
        }
        return true
    }

    /**
     * Verify that all text in multi-row-cell-item divs exists in output data from JSON mock
     * @param outputData - Array of objects from JSON mock data (e.g., rstHkatChDT, rstShnDT, etc.)
     * @param timeout - Timeout in milliseconds (default: 5000)
     * @returns true if all texts are found in mock data, false otherwise
     */
    async verifyMultiRowCellData(outputData: any[], timeout: number = 5000): Promise<boolean> {
        try {
            // Get all divs with class multi-row-cell-item
            const multiRowCells = this.page.locator(`div.${this.classCellOutput}`);
            await this.waitForVisible(multiRowCells.first(), timeout);

            const cellCount = await multiRowCells.count();
            if (cellCount === 0) {
                return true; // No cells to verify
            }

            // Build a Set of all values from outputData for fast lookup
            const validValues = new Set<string>();
            for (const item of outputData) {
                // Add all non-empty string values from the object
                Object.values(item).forEach(value => {
                    if (value !== null && value !== undefined && value !== '') {
                        validValues.add(String(value).trim());
                    }
                });
            }

            const listTextNotInData = ["", "自動", "自店", "他店", "手配済", "伝替"];
            // Check each multi-row-cell-item
            for (let i = 0; i < cellCount; i++) {
                const cellText = await multiRowCells.nth(i).textContent();
                const trimmedText = cellText?.trim() || '';

                if (listTextNotInData.includes(trimmedText)) {
                    continue; // Skip empty cells
                }

                // Check if the text exists in the valid values set
                if (!validValues.has(trimmedText)) {
                    return false;
                }
            }
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Convert thiKbn code to display text and collect unique values from data
     * @param rstHkatChDT - Array of objects from JSON mock data
     * @returns Set of unique thiKbn display texts
     */
    getThiKbnDisplayTexts(rstHkatChDT: any[]): Set<string> {
        const thiKbnSet = new Set<string>();

        for (const item of rstHkatChDT) {
            let thiKbnText = '';

            if (item.thiKbn === "0") {
                thiKbnText = "自動";
            } else if (item.thiKbn === "1") {
                thiKbnText = "自店";
            } else if (item.thiKbn === "2") {
                thiKbnText = "他店";
            } else if (item.thiKbn === "3") {
                thiKbnText = "手配済";
            } else if (item.thiKbn === "4") {
                thiKbnText = "伝替";
            }

            if (thiKbnText) {
                thiKbnSet.add(thiKbnText);
            }
        }

        return thiKbnSet;
    }

    /**
     * Verify that thiKbn display texts are shown in multi-row-cell-item divs
     * @param expectedTexts - Set of expected thiKbn display texts
     * @param timeout - Timeout in milliseconds (default: 5000)
     * @returns true if all expected texts are found, false otherwise
     */
    async verifyThiKbnTextsInMultiRowCells(expectedTexts: Set<string>, timeout: number = 5000): Promise<boolean> {
        try {
            // Get all divs with class multi-row-cell-item
            const multiRowCells = this.page.locator(`div.${this.classCellOutput}`);
            await this.waitForVisible(multiRowCells.first(), timeout);

            const cellCount = await multiRowCells.count();
            if (cellCount === 0) {
                return false;
            }

            // Collect all texts from multi-row-cell-item divs
            const foundTexts = new Set<string>();
            for (let i = 0; i < cellCount; i++) {
                const cellText = await multiRowCells.nth(i).textContent();
                const trimmedText = cellText?.trim() || '';
                if (trimmedText) {
                    foundTexts.add(trimmedText);
                }
            }
            // Check if all expected texts are found
            let allFound = true;
            for (const expectedText of expectedTexts) {
                if (!foundTexts.has(expectedText)) {
                    allFound = false;
                } else {
                }
            }

            return allFound;
        } catch (error) {
            return false;
        }
    }

    /**
     * Find indices of items with hkatFukaFlg == "1" in test data
     * @param rstHkatChDT - Array of objects from JSON mock data
     * @returns Array of indices (0-based) where hkatFukaFlg == "1"
     */
    getHkatFukaIndices(rstHkatChDT: any[]): number[] {
        const indices: number[] = [];

        for (let i = 0; i < rstHkatChDT.length; i++) {
            if (rstHkatChDT[i].hkatFukaFlg === "1") {
                indices.push(i);
            }
        }

        return indices;
    }

    /**
     * Check if an element's text has red color
     * @param element - Locator of the element to check
     * @returns true if text color is red, false otherwise
     */
    async verifyTextRed(element: Locator): Promise<boolean> {
        try {
            const color = await element.evaluate((el) => {
                return window.getComputedStyle(el).color;
            });
            const isRed = this.isRedColor(color);
            return isRed;
        } catch (error) {
            return false;
        }
    }

    /**
     * Check if text in multi-row-cell-item divs at specific row indices has red color
     * @param rowIndices - Array of row indices (0-based) to check
     * @param timeout - Timeout in milliseconds (default: 5000)
     * @returns Object with verification result and details
     */
    async verifyRedTextInRows(rowIndices: number[], timeout: number = 5000): Promise<{
        allRed: boolean;
        details: Array<{ rowIndex: number; color: string; isRed: boolean }>;
    }> {
        try {
            // Wait for ag-center-cols-container to be visible
            const container = this.page.locator('div.ag-center-cols-container[role="rowgroup"]');
            await this.waitForVisible(container, timeout);

            // Get all rows
            const rows = container.locator('div[role="row"]');
            const rowCount = await rows.count();

            const details: Array<{ rowIndex: number; color: string; isRed: boolean }> = [];
            let allRed = true;

            for (const rowIndex of rowIndices) {
                if (rowIndex >= rowCount) {
                    allRed = false;
                    continue;
                }

                // Get the row at the specified index
                const row = rows.nth(rowIndex);

                // Find multi-row-cell-item divs in this row
                const cellItems = row.locator(`div.${this.classCellOutput}`);
                const cellCount = await cellItems.count();

                if (cellCount === 0) {
                    continue;
                }

                // Check the color of the first cell item
                const firstCell = cellItems.first();
                const isRed = await this.verifyTextRed(firstCell);

                details.push({ rowIndex, color: '', isRed });

                if (isRed) {
                } else {
                    allRed = false;
                }
            }

            return { allRed, details };
        } catch (error) {
            return {
                allRed: false,
                details: []
            };
        }
    }

    /**
     * Check if a color string represents red color
     * Handles various formats: rgb(255, 0, 0), rgba(255, 0, 0, 1), #ff0000, red, etc.
     * @param color - Color string to check
     * @returns true if color is red
     */
    private isRedColor(color: string): boolean {
        // Normalize the color string
        const normalized = color.toLowerCase().replace(/\s/g, '');

        // Check for rgb/rgba format: rgb(255, 0, 0) or similar red values
        const rgbMatch = normalized.match(/rgba?\((\d+),(\d+),(\d+)/);
        if (rgbMatch) {
            const r = parseInt(rgbMatch[1]);
            const g = parseInt(rgbMatch[2]);
            const b = parseInt(rgbMatch[3]);

            // Red should have high R value and low G, B values
            // Allow some tolerance for variations of red
            return r > 200 && g < 100 && b < 100;
        }

        // Check for hex format: #ff0000, #f00, etc.
        if (normalized.startsWith('#')) {
            const hex = normalized.substring(1);
            let r, g, b;

            if (hex.length === 3) {
                r = parseInt(hex[0] + hex[0], 16);
                g = parseInt(hex[1] + hex[1], 16);
                b = parseInt(hex[2] + hex[2], 16);
            } else if (hex.length === 6) {
                r = parseInt(hex.substring(0, 2), 16);
                g = parseInt(hex.substring(2, 4), 16);
                b = parseInt(hex.substring(4, 6), 16);
            } else {
                return false;
            }

            return r > 200 && g < 100 && b < 100;
        }

        // Check for named color
        if (normalized === 'red') {
            return true;
        }

        return false;
    }

    /**
     * Check if classCellOutput elements do not exist on the page
     * @param timeout - Timeout in milliseconds (default: 2000)
     * @returns true if no classCellOutput elements found, false if any found
     */
    async verifyCellOutputNotExist(timeout: number = 2000): Promise<boolean> {
        try {
            const multiRowCells = this.page.locator(`div.${this.classCellOutput}`);
            const count = await multiRowCells.count();

            return count === 0;
        } catch (error) {
            return false;
        }
    }
}

