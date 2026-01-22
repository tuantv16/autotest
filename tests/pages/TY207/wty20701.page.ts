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
     * Wrapper to read a field value using BasePage helper
     */
    async getFieldValue(selector: string | Locator): Promise<string> {
        return super.getFieldValue(selector);
    }

    /**
     * Check label and input value
     * @param labelText - Text of the label to check
     * @param expectedValue - Expected value of the input (optional)
     * @returns Input value
     */
    async checkLabelAndInputValue(labelText: string, expectedValue?: string): Promise<string> {
        console.log(`[TEST] Waiting for label ${labelText} to be visible...`);
        const labelVisible = await this.waitForTextInBody(labelText, 5000);
        if (!labelVisible) {
            throw new Error(`Label ${labelText} not found`);
        }

        console.log('[TEST] Getting label for attribute...');
        const labelFor = await this.getLabelForByText(labelText);

        console.log('[TEST] Getting input value...');
        const inputSelector = `#${labelFor}`;
        const inputValue = await this.getFieldValue(inputSelector);
        console.log(`[TEST] Input value for ${labelText} (${inputSelector}) is: ${inputValue}`);

        if (expectedValue !== undefined) {
            if (inputValue !== expectedValue) {
                throw new Error(`Expected value "${expectedValue}" but got "${inputValue}"`);
            }
        }

        console.log('[TEST] ✅ Check passed successfully');
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
                console.log(`[VERIFY] No ${this.classCellOutput} found`);
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

            console.log(`[VERIFY] Valid values from mock data: ${Array.from(validValues).join(', ')}`);

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
                    console.log(`[VERIFY] ❌ Text "${trimmedText}" not found in mock data`);
                    return false;
                }

                console.log(`[VERIFY] ✅ Text "${trimmedText}" found in mock data`);
            }

            console.log('[VERIFY] ✅ All multi-row-cell-item texts are valid');
            return true;
        } catch (error) {
            console.error(`[VERIFY] Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
                console.log(`[VERIFY] No ${this.classCellOutput} found`);
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

            console.log(`[VERIFY] Expected thiKbn texts: ${Array.from(expectedTexts).join(', ')}`);
            console.log(`[VERIFY] Found texts in multi-row-cell-item: ${Array.from(foundTexts).join(', ')}`);

            // Check if all expected texts are found
            let allFound = true;
            for (const expectedText of expectedTexts) {
                if (!foundTexts.has(expectedText)) {
                    console.log(`[VERIFY] ❌ Expected text "${expectedText}" not found in multi-row-cell-item`);
                    allFound = false;
                } else {
                    console.log(`[VERIFY] ✅ Text "${expectedText}" found in multi-row-cell-item`);
                }
            }

            return allFound;
        } catch (error) {
            console.error(`[VERIFY] Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
            console.log(`[VERIFY] Element text color: ${color}, isRed: ${isRed}`);

            return isRed;
        } catch (error) {
            console.error(`[VERIFY] Error checking text color: ${error instanceof Error ? error.message : 'Unknown error'}`);
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

            console.log(`[VERIFY] Found ${rowCount} rows in ag-center-cols-container`);

            const details: Array<{ rowIndex: number; color: string; isRed: boolean }> = [];
            let allRed = true;

            for (const rowIndex of rowIndices) {
                if (rowIndex >= rowCount) {
                    console.log(`[VERIFY] ❌ Row index ${rowIndex} out of bounds (total rows: ${rowCount})`);
                    allRed = false;
                    continue;
                }

                // Get the row at the specified index
                const row = rows.nth(rowIndex);

                // Find multi-row-cell-item divs in this row
                const cellItems = row.locator(`div.${this.classCellOutput}`);
                const cellCount = await cellItems.count();

                if (cellCount === 0) {
                    console.log(`[VERIFY] ⚠ No ${this.classCellOutput} found in row ${rowIndex}`);
                    continue;
                }

                // Check the color of the first cell item
                const firstCell = cellItems.first();
                const isRed = await this.verifyTextRed(firstCell);

                details.push({ rowIndex, color: '', isRed });

                if (isRed) {
                    console.log(`[VERIFY] ✅ Row ${rowIndex} has red text`);
                } else {
                    console.log(`[VERIFY] ❌ Row ${rowIndex} does not have red text`);
                    allRed = false;
                }
            }

            return { allRed, details };
        } catch (error) {
            console.error(`[VERIFY] Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
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

            console.log(`[VERIFY] Found ${count} div.${this.classCellOutput} elements`);
            return count === 0;
        } catch (error) {
            console.error(`[VERIFY] Error checking classCellOutput: ${error instanceof Error ? error.message : 'Unknown error'}`);
            return false;
        }
    }
}

