/**
 * WTY20702 Installation Confirmation Page Object
 * 設置確認書紐付 for 摘要欄入力 screen
 */

import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class WTY20702Page extends BasePage {
    public readonly Locators = {
        classCellOutput: 'multi-row-cell-item',
        highlight: 'bg-white'
    };

    public readonly Selectors = {
        idSaiBin : '#SaiBin_Lable'
    };

    public readonly Texts = {
        textTitle: '手配予定照会(自社)',
        textHeaders: ["No", "型番", "手配", "物流", "在庫属性", "数量", "納品日"],
        textOptions : ['当日', '翌日', '以降'],

        Shkoten_Text: '出庫店',
        SaiChiNhnDate_Text: '配送種類',
        SaiChiNhnDateZen_Text: '最遅納品日',
        scInventoryType: 'SC在庫定数',

        textSearch: '検索',
        textSC1: '当日',
        textSC2: '翌日',
        textSC3: '以降',
    };

    constructor(page: Page) {
        super(page);
    }

    /**
     * Navigate to WTY20702Page Arrage Plan Own Delivery screen
     */
    async navigate(pilotKey: string = 'prod'): Promise<void> {
        const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTY20702ArragePlanOwnDerivery?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
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

    async verifyTexts(texts: string[], timeout: number = 5000){
        for (const text of texts) {
            const isVisible = await this.waitForTextInBody(text, timeout);
            if (!isVisible) {
                return false;
            }
        }
        return true
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
     * Convert zaiJt code to display text and collect unique values from data
     * @param rstHkatJsDT - Array of objects from JSON mock data
     * @returns Set of unique zaiJt display texts
     */
    getZaiJtDisplayTexts(rstHkatJsDT: any[]): Set<string> {
        const zaiJtSet = new Set<string>();

        for (const item of rstHkatJsDT) {
            let zaiZoku = '';

            if (item.zaiJt === "1") {
                zaiZoku = "新品";
            } else if (item.zaiJt === "2") {
                zaiZoku = "展示品";
            } else if (item.zaiJt === "3") {
                zaiZoku = "開梱品";
            } else if (item.zaiJt === "4") {
                zaiZoku = "確保品";
            } else if (item.zaiJt === "6") {
                zaiZoku = "指定品";
            } else if (item.zaiJt === "7") {
                zaiZoku = "棚卸差異";
            } else if (item.zaiJt === "8") {
                zaiZoku = "在庫差異";
            } else if (item.zaiJt === "9") {
                zaiZoku = "不良品";
            }

            if (zaiZoku) {
                zaiJtSet.add(zaiZoku);
            }
        }

        return zaiJtSet;
    }

    /**
     * Verify that zaiJt display texts are shown in multi-row-cell-item divs
     * @param expectedTexts - Set of expected zaiJt display texts
     * @param timeout - Timeout in milliseconds (default: 5000)
     * @returns true if all expected texts are found, false otherwise
     */
    async verifyZaiJtTextsInMultiRowCells(expectedTexts: Set<string>, timeout: number = 5000): Promise<boolean> {
        return this.verifyTextsInMultiRowCells(expectedTexts, timeout);
    }

    /**
     * Common method to verify that expected texts are shown in multi-row-cell-item divs
     * @param expectedTexts - Set of expected display texts
     * @param timeout - Timeout in milliseconds (default: 5000)
     * @returns true if all expected texts are found, false otherwise
     */
    async verifyTextsInMultiRowCells(expectedTexts: Set<string>, timeout: number = 5000): Promise<boolean> {
        try {
            // Get all divs with class multi-row-cell-item
            const multiRowCells = this.page.locator(`div.${this.Locators.classCellOutput}`);
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
     * Verify that thiKbn display texts are shown in multi-row-cell-item divs
     * @param expectedTexts - Set of expected thiKbn display texts
     * @param timeout - Timeout in milliseconds (default: 5000)
     * @returns true if all expected texts are found, false otherwise
     */
    async verifyThiKbnTextsInMultiRowCells(expectedTexts: Set<string>, timeout: number = 5000): Promise<boolean> {
        return this.verifyTextsInMultiRowCells(expectedTexts, timeout);
    }


    /**
     * Check if classCellOutput elements do not exist on the page
     * @param timeout - Timeout in milliseconds (default: 2000)
     * @returns true if no classCellOutput elements found, false if any found
     */
    async verifyCellOutputNotExist(timeout: number = 2000): Promise<boolean> {
        try {
            const multiRowCells = this.page.locator(`div.${this.Locators.classCellOutput}`);
            const count = await multiRowCells.count();

            return count === 0;
        } catch (error) {
            return false;
        }
    }

    /**
     * Verify that text exists in any div with class classCellOutput
     * @param text - Text to search for
     * @param timeout - Timeout in milliseconds (default: 5000)
     * @returns true if text is found in any classCellOutput div, false otherwise
     */
    async verifyTextInCellOutput(text: string, timeout: number = 5000): Promise<boolean> {
        try {
            const multiRowCells = this.page.locator(`div.${this.Locators.classCellOutput}`);
            await this.waitForVisible(multiRowCells.first(), timeout);

            const cellCount = await multiRowCells.count();
            if (cellCount === 0) {
                return false;
            }

            // Check each cell for the text
            for (let i = 0; i < cellCount; i++) {
                const cellText = await multiRowCells.nth(i).textContent();
                const trimmedText = cellText?.trim() || '';

                if (trimmedText === text || trimmedText.includes(text)) {
                    return true;
                }
            }

            return false;
        } catch (error) {
            return false;
        }
    }

    /**
     * Verify that text with red color exists in cells
     * Checks both multi-row-cell-item divs and ag-pinned-left-cols-container cells
     * @param expectedText - Text to search for (optional)
     * @param timeout - Timeout in milliseconds (default: 5000)
     * @returns true if red text is found, false otherwise
     */
    async verifyRedTextInCells(expectedText?: string, timeout: number = 5000): Promise<boolean> {
        try {
            // Check multi-row-cell-item with span color style
            const multiRowCellsWithRedSpan = this.page.locator(`div.${this.Locators.classCellOutput} span[style*="color: rgb(255, 0, 0)"], div.${this.Locators.classCellOutput} span[style*="color:#ff0000"]`);

            // Check ag-pinned-left-cols-container with text-red-600 class
            const pinnedLeftCellsWithRedClass = this.page.locator('div.ag-pinned-left-cols-container div.text-red-600');

            // Wait for at least one red element to appear
            try {
                await Promise.race([
                    multiRowCellsWithRedSpan.first().waitFor({ state: 'visible', timeout }),
                    pinnedLeftCellsWithRedClass.first().waitFor({ state: 'visible', timeout })
                ]);
            } catch {
                return false;
            }

            // If expectedText is provided, verify the text matches
            if (expectedText) {
                const spanCount = await multiRowCellsWithRedSpan.count();
                for (let i = 0; i < spanCount; i++) {
                    const cellText = await multiRowCellsWithRedSpan.nth(i).textContent();
                    const trimmedText = cellText?.trim() || '';
                    if (trimmedText === expectedText || trimmedText.includes(expectedText)) {
                        return true;
                    }
                }

                const pinnedCount = await pinnedLeftCellsWithRedClass.count();
                for (let i = 0; i < pinnedCount; i++) {
                    const cellText = await pinnedLeftCellsWithRedClass.nth(i).textContent();
                    const trimmedText = cellText?.trim() || '';
                    if (trimmedText === expectedText || trimmedText.includes(expectedText)) {
                        return true;
                    }
                }

                return false;
            }

            // If no expectedText, just check if any red text exists
            const hasRedSpan = (await multiRowCellsWithRedSpan.count()) > 0;
            const hasRedClass = (await pinnedLeftCellsWithRedClass.count()) > 0;

            return hasRedSpan || hasRedClass;
        } catch (error) {
            return false;
        }
    }

    /**
     * Click span element by its text content
     * @param text - Text content of the span to click
     * @param timeout - Timeout in milliseconds (default: 10000)
     */
    async clickSpanByText(text: string, timeout: number = 10000): Promise<void> {
        const locator = this.page.locator(`span:has-text("${text}")`);
        await locator.click({ timeout });
    }

    /**
     * Verify if a span with given text has a parent label with specified class
     * @param text - Text content of the span to find
     * @param className - Class name to check in the parent label
     * @param timeout - Timeout in milliseconds (default: 5000)
     * @returns true if parent label has the specified class, false otherwise
     */
    async verifyHighlight(text: string, className: string, timeout: number = 5000): Promise<boolean> {
        try {
            // Find span with the given text
            const spanLocator = this.page.locator(`span:has-text("${text}")`).first();
            await this.waitForVisible(spanLocator, timeout);

            // Get parent label element
            const labelLocator = spanLocator.locator('xpath=ancestor::label[1]');

            // Check if label exists
            const labelCount = await labelLocator.count();
            if (labelCount === 0) {
                return false;
            }

            // Get class attribute from label
            const labelClass = await labelLocator.getAttribute('class');
            if (!labelClass) {
                return false;
            }

            // Check if the specified class exists in label's class list
            const classList = labelClass.split(' ').map(c => c.trim());
            return classList.includes(className);
        } catch (error) {
            return false;
        }
    }
}

