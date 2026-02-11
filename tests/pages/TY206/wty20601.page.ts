import { Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { VALIDATION_ERROR_MESSAGES } from '../../constants/messages';

export class TY20601Page extends BasePage {
    // Constants - 宅配区分 (TH_KBN)
    public readonly TH_KBN = {
        KOMONO: '1',   // 小物
        OMONO: '2',    // 大物
        CHUMONO: '4',  // 中物
        GOKUSHO: '5'   // 極小
    };

    // Constants - 宅配区分名称 (TH_KBN_NM)
    public readonly TH_KBN_NM = {
        KOMONO: '小物',
        OMONO: '大物',
        CHUMONO: '中物',
        GOKUSHO: '極小',
        OTHER: '-'
    };

    // Constants - 直送可否 (CKS_KAHI_FLG)
    public readonly CKS_KAHI_FLG = {
        OK: '1',  // 可
        NG: '0'   // 不可
    };

    // Constants - 直送可否名称 (CKS_KAHI_FLG_NM)
    public readonly CKS_KAHI_FLG_NM = {
        OK: '可',
        NG: '不可',
        OTHER: '-'
    };

    // Constants - 横振り可否 (YB_KAHI_FLG)
    public readonly YB_KAHI_FLG = {
        OK: '1',  // 在庫有れば可
        NG: '0'   // 不可
    };

    // Constants - 横振り可否名称 (YB_KAHI_FLG_NM)
    public readonly YB_KAHI_FLG_NM = {
        OK: '在庫有れば可',
        NG: '不可',
        OTHER: '-'
    };

    // Constants - 在庫状態 (ZAI_JT)
    public readonly ZAI_JT = {
        NEW: '1',      // 新品
        TENJI: '2',    // 展示品
        KAIKON: '3',   // 開梱品
        SHITEI: '6'    // 新品指定
    };

    // Constants - 在庫状態名称 (ZAI_JT_NM)
    public readonly ZAI_JT_NM = {
        NEW: '新品',
        TENJI: '展示品',
        KAIKON: '開梱品',
        SHITEI: '新品指定',
        OTHER: '-'
    };

    // Constants - 手配区分 (THI_KBN)
    public readonly THI_KBN = {
        AUTO: '0',   // 自動
        JITEN: '1',  // 自店
        TATEN: '2',  // 他店
        SUMI: '3'    // 手配済
    };

    // Constants - 手配区分名称 (THI_KBN_NM)
    public readonly THI_KBN_NM = {
        AUTO: '自動',
        JITEN: '自店',
        TATEN: '他店',
        SUMI: '手配済',
        OTHER: '-'
    };

    // Selectors
    public readonly Locators = {
        classHeaderTable: 'ag-header-row.ag-header-row-column',
        classHighlightedRow: 'ag-row-selected',
        classTable: 'ag-center-cols-container',
        idBtnTextBox: "btnTextBox",
        highlight: 'bg-white'
    };

    public readonly Selectors = {
        productNo: 'input[name="productNo"]',
        productKata: 'input[name="productKata"]',
        thKbn: 'input[name="thKbn"]',
        chksKahiFlg: 'input[name="chksKahiFlg"]',
        ykbrKahiFlg: 'input[name="ykbrKahiFlg"]',
        btnTextBox: 'input[name="btnTextBox"]',
        thibtenNm: 'input[name="thibtenNm"]',
    };

    public readonly Texts = {
        headingTitle : 'セット商品属性選択',

        buttonClear: 'クリア',
        buttonConfirm: '確定',
        buttonInventory: '店別在庫',
        buttonProduct: '商品基本',

        textHeaderTable: ['No', '型番', 'JAN', '手配', '長', 'Ａ', '数量', '最終売価', '属性'],
        errorBtnTextBox: '数値で入力してください。',
        errorBtnTextBoxTE5147: '他店手配でＬＥＣは指定できません。',
        errorBtnTextBoxTE5133: '部店コードが誤っています。',
        errorTE5147: '直送時は自動または手配済のみ選択可能できません。',

        zaiJt: '属性',
        thiKbn: '手配',
        departmentStore: '部店',
        deliveryPlaceSection: '引渡場',
    };

    public readonly Input = {
        inputTable : ['hjMkKata', 'suryo', 'bkKeiTtlGaku']
    }

    constructor(page: Page) {
        super(page);
    }

    /**
     * Navigate to WTY20601 Store Inventory Inquiry screen
     */
    async navigate(pilotKey: string = 'prod'): Promise<void> {
        const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTY20601ProductSetAttributeSelect?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
        await this.goto(url);
        await this.page.waitForTimeout(1000);
    }

    /**
     * Check if text exists in a locator
     * @param locatorClass - CSS class name to locate the element
     * @param text - Text to search for in the locator
     * @returns true if text exists, false otherwise
     */
    async isTextInLocator(locatorClass: string, text: string): Promise<boolean> {
        try {
            const element = this.page.locator(`.${locatorClass}`).first();
            const elementText = await element.textContent();

            if (!elementText) {
                return false;
            }

            return elementText.includes(text);
        } catch (error) {
            return false;
        }
    }

    /**
     * Check if all texts in array exist in a locator
     * @param locatorClass - CSS class name to locate the element
     * @param texts - Array of texts to search for in the locator
     * @returns true if all texts exist, false otherwise
     */
    async verifyTextsInLocator(locatorClass: string, texts: string[]): Promise<boolean> {
        try {
            for (let i = 0; i < texts.length; i++) {
                const text = texts[i];
                if (await this.isTextInLocator(locatorClass, text) === false) {
                    return false;
                }
            }
            return true;
        } catch (error) {
            return false;
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

    /**
     * Verify if a row is highlighted/selected
     * @param row - The row locator to check
     * @returns true if the row has classHighlightedRow and aria-selected="true", false otherwise
     */
    async verifyHighlightedRow(row: any): Promise<boolean> {
        try {
            // Check if row has the highlighted class
            const hasHighlightedClass = await row.evaluate((element: Element, className: string) => {
                return element.classList.contains(className);
            }, this.Locators.classHighlightedRow);

            // Check if row has aria-selected="true"
            const ariaSelected = await row.getAttribute('aria-selected');
            const hasAriaSelected = ariaSelected === 'true';

            // Return true only if both conditions are met
            return hasHighlightedClass && hasAriaSelected;
        } catch (error) {
            return false;
        }
    }

    /**
     * Check if a locator has child elements inside it
     * @param locatorClass - CSS class name to locate the element
     * @returns true if the element exists and has child elements inside, false otherwise
     */
    async hasChildElements(locatorClass: string): Promise<boolean> {
        try {
            const element = this.page.locator(`.${locatorClass}`);
            const count = await element.count();

            // Check if element exists
            if (count === 0) {
                return false;
            }

            // Go inside the element and check if it has any child elements
            const childrenCount = await element.first().locator('> *').count();
            return childrenCount > 0;
        } catch (error) {
            return false;
        }
    }

    /**
     * Get the value of an input element
     * @param selector - CSS selector for the input element
     * @returns The value of the input element, or empty string if not found
     */
    async getInputValue(selector: string): Promise<string> {
        try {
            const input = this.page.locator(selector);
            const value = await input.inputValue();
            return value || '';
        } catch (error) {
            return '';
        }
    }

    /**
     * Get the display name for thKbn (宅配区分)
     * @param thKbn - The thKbn code (1: 小物, 2: 大物, 4: 中物, 5: 極小)
     * @returns The display name corresponding to the thKbn code
     */
    getThKbnName(thKbn?: string): string {
        if (!thKbn) return this.TH_KBN_NM.OTHER;

        switch (thKbn) {
            case this.TH_KBN.KOMONO:
                return this.TH_KBN_NM.KOMONO;
            case this.TH_KBN.OMONO:
                return this.TH_KBN_NM.OMONO;
            case this.TH_KBN.CHUMONO:
                return this.TH_KBN_NM.CHUMONO;
            case this.TH_KBN.GOKUSHO:
                return this.TH_KBN_NM.GOKUSHO;
            default:
                return this.TH_KBN_NM.OTHER;
        }
    }

    /**
     * Get the display name for cksKahiFlg (直送可否)
     * @param cksKahiFlg - The cksKahiFlg code (1: 可, 0: 不可)
     * @returns The display name corresponding to the cksKahiFlg code
     */
    getCksKahiName(cksKahiFlg?: string): string {
        if (!cksKahiFlg) return this.CKS_KAHI_FLG_NM.OTHER;

        switch (cksKahiFlg) {
            case this.CKS_KAHI_FLG.OK:
                return this.CKS_KAHI_FLG_NM.OK;
            case this.CKS_KAHI_FLG.NG:
                return this.CKS_KAHI_FLG_NM.NG;
            default:
                return this.CKS_KAHI_FLG_NM.OTHER;
        }
    }

    /**
     * Get the display name for ybKahiFlg (横振り可否)
     * @param ybKahiFlg - The ybKahiFlg code (1: 在庫有れば可, 0: 不可)
     * @returns The display name corresponding to the ybKahiFlg code
     */
    getYbKahiName(ybKahiFlg?: string): string {
        if (!ybKahiFlg) return this.YB_KAHI_FLG_NM.OTHER;

        switch (ybKahiFlg) {
            case this.YB_KAHI_FLG.OK:
                return this.YB_KAHI_FLG_NM.OK;
            case this.YB_KAHI_FLG.NG:
                return this.YB_KAHI_FLG_NM.NG;
            default:
                return this.YB_KAHI_FLG_NM.OTHER;
        }
    }

    /**
     * Convert empty or whitespace-only string to full-width space (　)
     * @param value - The value to check
     * @returns The original value if non-empty, or full-width space if empty
     */
    emptyToSpace(value?: string): string {
        return value && value.trim().length > 0 ? value : '　';
    }

    /**
     * Get the display name for zaiJt (在庫状態)
     * @param zaiJt - The zaiJt code (1: 新品, 2: 展示品, 3: 開梱品, 6: 新品指定)
     * @returns The display name corresponding to the zaiJt code
     */
    getZaiJtName(zaiJt?: string): string {
        if (!zaiJt) return this.ZAI_JT_NM.OTHER;

        switch (zaiJt) {
            case this.ZAI_JT.NEW:
                return this.ZAI_JT_NM.NEW;
            case this.ZAI_JT.TENJI:
                return this.ZAI_JT_NM.TENJI;
            case this.ZAI_JT.KAIKON:
                return this.ZAI_JT_NM.KAIKON;
            case this.ZAI_JT.SHITEI:
                return this.ZAI_JT_NM.SHITEI;
            default:
                return this.ZAI_JT_NM.OTHER;
        }
    }

    /**
     * Get the display name for thiKbn (手配区分)
     * @param thiKbn - The thiKbn code (0: 自動, 1: 自店, 2: 他店, 3: 手配済)
     * @returns The display name corresponding to the thiKbn code
     */
    getThiKbnName(thiKbn?: string): string {
        if (!thiKbn) return this.THI_KBN_NM.OTHER;

        switch (thiKbn) {
            case this.THI_KBN.AUTO:
                return this.THI_KBN_NM.AUTO;
            case this.THI_KBN.JITEN:
                return this.THI_KBN_NM.JITEN;
            case this.THI_KBN.TATEN:
                return this.THI_KBN_NM.TATEN;
            case this.THI_KBN.SUMI:
                return this.THI_KBN_NM.SUMI;
            default:
                return this.THI_KBN_NM.OTHER;
        }
    }

    /**
     * Check if the parent label of a span with specific text has 'bg-white' class
     * @param text - The text content of the span to find
     * @returns true if the parent label has 'bg-white' class, false otherwise
     */
    async hasParentLabelWithBgWhite(text: string): Promise<boolean> {
        try {
            // Find the span with the specific text
            const span = this.page.locator(`span:has-text("${text}")`).first();

            // Get the parent label element
            const parentLabel = span.locator('xpath=ancestor::label[1]');

            // Check if parent label exists
            const parentCount = await parentLabel.count();
            if (parentCount === 0) {
                return false;
            }

            // Check if parent label has 'bg-white' class
            const className = await parentLabel.getAttribute('class');
            return className ? className.includes('bg-white') : false;
        } catch (error) {
            return false;
        }
    }

    /**
     * Count the number of rows in the table
     * Navigates to classTable and counts div elements with role="row"
     * @returns The number of rows found in the table
     */
    async countTableRows(): Promise<number> {
        try {
            // Locate the table container with classTable
            const tableContainer = this.page.locator(`.${this.Locators.classTable}`);

            // Count div elements with role="row"
            const rowCount = await tableContainer.locator('div[role="row"]').count();

            return rowCount;
        } catch (error) {
            return 0;
        }
    }

    /**
     * Get a specific row from the table by index
     * @param index - The index of the row to retrieve (0-based)
     * @returns The row locator at the specified index
     */
    async getRowByIndex(index: number) {
        try {
            // Locate the table container with classTable
            const tableContainer = this.page.locator(`.${this.Locators.classTable}`);

            // Get the row at the specified index
            const row = tableContainer.locator('div[role="row"]').nth(index);

            return row;
        } catch (error) {
            throw new Error(`Failed to get row at index ${index}: ${error}`);
        }
    }

    /**
     * Check if text exists in a specific row
     * @param row - The row locator to check
     * @param text - The text to search for in the row
     * @returns true if the text exists in the row, false otherwise
     */
    async isTextInRow(row: any, text: string | number): Promise<boolean> {
        const expected = this.normalizeRowValue(text);
        if (expected === '') {
            return true;
        }
        try {
            await row.getByText(expected, { exact: false }).waitFor({ state: 'visible', timeout: 500 });
            return true;
        } catch (error) {
            if (await this.isValueInRowInputs(row, expected)) {
                return true;
            }
            return await this.isValueInRowText(row, expected);
        }
    }

    private normalizeRowValue(value: string | number): string {
        const raw = `${value ?? ''}`.trim();
        if (raw === '') {
            return '';
        }
        const normalized = raw
            .replace(/\u3000/g, ' ')
            .replace(/[０-９]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0))
            .replace(/[，]/g, ',');
        return normalized.trim();
    }

    private toNumberIfPossible(value: string): number | null {
        const numeric = value.replace(/,/g, '').trim();
        if (numeric === '') {
            return null;
        }
        const parsed = Number(numeric);
        return Number.isFinite(parsed) ? parsed : null;
    }

    private valuesMatch(actual: string, expected: string): boolean {
        if (actual === expected) {
            return true;
        }
        const actualNumber = this.toNumberIfPossible(actual);
        const expectedNumber = this.toNumberIfPossible(expected);
        return actualNumber !== null && expectedNumber !== null && actualNumber === expectedNumber;
    }

    private async isValueInRowInputs(row: any, expected: string): Promise<boolean> {
        if (expected === '') {
            return false;
        }
        const inputs = row.locator('input, textarea, select');
        const count = await inputs.count();
        for (let i = 0; i < count; i++) {
            const input = inputs.nth(i);
            const tagName = await input.evaluate(el => el.tagName.toLowerCase());
            if (tagName === 'select') {
                const selectedText = await input.evaluate(el => {
                    const select = el as HTMLSelectElement;
                    const option = select.selectedOptions.item(0);
                    return option ? option.textContent ?? '' : '';
                });
                if (this.valuesMatch(this.normalizeRowValue(selectedText), expected)) {
                    return true;
                }
                const selectValue = await input.inputValue();
                if (this.valuesMatch(this.normalizeRowValue(selectValue), expected)) {
                    return true;
                }
            } else {
                const value = await input.inputValue();
                if (this.valuesMatch(this.normalizeRowValue(value), expected)) {
                    return true;
                }
            }
        }
        return false;
    }

    private async isValueInRowText(row: any, expected: string): Promise<boolean> {
        try {
            const rowText = this.normalizeRowValue(await row.innerText());
            if (rowText.includes(expected)) {
                return true;
            }
        } catch (error) {
            // Ignore and continue with cell-level checks
        }

        const cells = row.locator('.ag-cell, [role="gridcell"]');
        const cellCount = await cells.count();
        for (let i = 0; i < cellCount; i++) {
            const cell = cells.nth(i);
            const cellText = this.normalizeRowValue(await cell.innerText().catch(() => ''));
            if (cellText.includes(expected)) {
                return true;
            }
            const ariaLabel = this.normalizeRowValue(await cell.getAttribute('aria-label') ?? '');
            if (ariaLabel.includes(expected)) {
                return true;
            }
            const title = this.normalizeRowValue(await cell.getAttribute('title') ?? '');
            if (title.includes(expected)) {
                return true;
            }
            const dataValue = this.normalizeRowValue(await cell.getAttribute('data-value') ?? '');
            if (dataValue.includes(expected)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Check if multiple texts exist in a specific row
     * @param row - The row locator to check
     * @param texts - Array of texts to search for in the row
     * @returns true if all texts exist in the row, false otherwise
     */
    async verifyTextsInRow(row: any, texts: Array<string | number>): Promise<boolean> {
        try {
            for (const text of texts) {
                const exists = await this.isTextInRow(row, text);
                if (!exists) {
                    console.log(`Text not found in row: "${text}"`);
                    return false;
                }
            }
            // All texts were found
            return true;
        } catch (error) {
            console.error(`Error verifying texts in row: ${error}`);
            return false;
        }
    }

    /**
     * Click on btnTextBox input and enter text
     * @param text - The text to enter into the btnTextBox input field
     */
    async fillBtnTextBox(text: string): Promise<void> {
        try {
            const btnTextBox = this.page.locator(this.Selectors.btnTextBox);

            // Click on the input field
            await btnTextBox.click();

            // Clear existing value if any
            await btnTextBox.clear();

            // Fill with new text
            await btnTextBox.fill(text);

            // Wait a moment for the value to be set
            await this.page.waitForTimeout(300);
        } catch (error) {
            throw new Error(`Failed to fill btnTextBox with text "${text}": ${error}`);
        }
    }

    /**
     * Check if btnTextBox is disabled
     * @returns true if btnTextBox is disabled, false otherwise
     */
    async isBtnTextBoxDisabled(): Promise<boolean> {
        try {
            const btnTextBox = this.page.locator(this.Selectors.btnTextBox);

            // Check if the input has disabled attribute
            const isDisabled = await btnTextBox.isDisabled();

            return isDisabled;
        } catch (error) {
            console.error(`Error checking if btnTextBox is disabled: ${error}`);
            return false;
        }
    }

    /**
     * Check if btnTextBox is disabled
     * @returns true if btnTextBox is disabled, false otherwise
     */
    async isThibtenNmDisabled(): Promise<boolean> {
        try {
            const thibtenNm = this.page.locator(this.Selectors.thibtenNm);

            // Check if the input has disabled attribute
            const isDisabled = await thibtenNm.isDisabled();

            return isDisabled;
        } catch (error) {
            console.error(`Error checking if btnTextBox is disabled: ${error}`);
            return false;
        }
    }

    /**
     * Check if an element is disabled by checking disabled attribute
     * @param selector - CSS selector for the element to check
     * @returns true if the element has disabled attribute, false otherwise
     */
    async isElementDisabled(selector: string): Promise<boolean> {
        try {
            const element = this.page.locator(selector).first();
            await element.waitFor({ state: 'attached', timeout: 5000 });
            return await element.isDisabled();
        } catch (error) {
            console.error(`Error checking if element is disabled for selector "${selector}": ${error}`);
            return false;
        }
    }

    /**
     * Check if a button with specific text is disabled
     * @param text - The text content of the button to find
     * @returns true if the button has disabled attribute, false otherwise
     */
    async isButtonDisabled(text: string): Promise<boolean> {
        try {
            const buttonLocator = this.page.locator(`button:has-text("${text}")`).first();
            await buttonLocator.waitFor({ state: 'attached', timeout: 5000 });
            return await buttonLocator.isDisabled();
        } catch (error) {
            console.error(`Error checking if button is disabled for text "${text}": ${error}`);
            return false;
        }
    }

    /**
     * Get the input selector by finding the parent label that contains a span with specific text
     * @param spanText - The text content of the span to find
     * @returns The input locator inside the parent label, or null if not found
     */
    async getInputBySpanText(spanText: string) {
        try {
            // Find span with the specific text
            const span = this.page.locator(`span:has-text("${spanText}")`).first();

            // Get the parent label element
            const parentLabel = span.locator('xpath=ancestor::label[1]');

            // Find the input inside the parent label
            const input = parentLabel.locator('input').first();

            return input;
        } catch (error) {
            console.error(`Error getting input selector for span text "${spanText}": ${error}`);
            return null;
        }
    }

    /**
     * Check if radio button is disabled by span text
     * @param spanText - The text content of the span to find
     * @returns true if the radio button is disabled, false otherwise
     */
    async isRadioDisabledBySpanText(spanText: string): Promise<boolean> {
        try {
            const input = await this.getInputBySpanText(spanText);
            if (!input) return false;

            await input.waitFor({ state: 'attached', timeout: 5000 });
            return await input.isDisabled();
        } catch (error) {
            console.error(`Error checking if radio is disabled for span text "${spanText}": ${error}`);
            return false;
        }
    }

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

    /**
     * Verify if a button with specific text has bg-primary-main class (highlighted)
     * @param text - The text content of the button to find
     * @param timeout - Optional timeout in milliseconds (default: 5000)
     * @returns true if the button has bg-primary-main class, false otherwise
     */
    async verifyButtonHighlight(text: string, timeout: number = 5000): Promise<boolean> {
        try {
            // Find button with the specific text
            const buttonLocator = this.page.locator(`button:has-text("${text}")`).first();

            // Wait for button to be visible
            await buttonLocator.waitFor({ state: 'visible', timeout });

            // Get class attribute from button
            const buttonClass = await buttonLocator.getAttribute('class');
            if (!buttonClass) {
                return false;
            }

            // Check if the button has bg-primary-main class
            const classList = buttonClass.split(' ').map(c => c.trim());
            return classList.includes('bg-primary-main');
        } catch (error) {
            console.error(`Error verifying button highlight for text "${text}": ${error}`);
            return false;
        }
    }
}
