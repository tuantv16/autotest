/**
 * Base Page Object
 * Common methods for all page objects
 */

import { Page, Locator, expect } from '@playwright/test';

const DEFAULT_MENU_BUTTON_SELECTOR = 'button[aria-haspopup="true"][id="basic-button"], button[aria-haspopup="true"]';

export class BasePage {
    protected page: Page;
    protected baseUrl: string;

    constructor(page: Page, baseUrl: string = process.env.BASE_URL || 'http://localhost:5173') {
        this.page = page;
        this.baseUrl = baseUrl;
    }

    protected readonly selectors = {
        errorClass: '_error_cbu4e_24',
    };

    /**
     * Navigate to a specific path
     */
    async goto(path: string = ''): Promise<void> {
        const url = path.startsWith('http') ? path : `${this.baseUrl}${path}`;
        await this.page.goto(url, { waitUntil: 'networkidle' });
    }

    /**
     * Wait for element to be visible
     */
    async waitForVisible(locator: Locator, timeout: number = 10000): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout });
    }

    /**
     * Click element with retry
     */
    async clickWithRetry(locator: Locator, retries: number = 3): Promise<void> {
        for (let i = 0; i < retries; i++) {
            try {
                await locator.scrollIntoViewIfNeeded();
                await locator.click({ timeout: 5000 });
                return;
            } catch (error) {
                if (i === retries - 1) throw error;
                await this.page.waitForTimeout(500);
            }
        }
    }

    /**
     * Fill input with typing simulation
     */
    async fillInput(locator: Locator, value: string, delay: number = 50): Promise<void> {
        await locator.scrollIntoViewIfNeeded();
        await locator.click();
        await locator.clear();
        await locator.pressSequentially(value, { delay });
        await this.page.waitForTimeout(200);
    }

    /**
     * Check if error dialog is visible
     */
    async isErrorDialogVisible(dialogId: string = 'error-dialog'): Promise<boolean> {
        const dialog = this.page.locator(`#${dialogId}`);
        return await dialog.isVisible({ timeout: 2000 }).catch(() => false);
    }

    /**
     * Dismiss error dialog
     */
    async dismissErrorDialog(dialogId: string = 'error-dialog'): Promise<void> {
        const dialog = this.page.locator(`#${dialogId}`);
        if (await dialog.isVisible({ timeout: 2000 }).catch(() => false)) {
            // Try clicking OK button
            const okButton = dialog.locator('button').first();
            if (await okButton.isVisible({ timeout: 1000 }).catch(() => false)) {
                await okButton.click().catch(() => { });
                await this.page.waitForTimeout(500);
            }

            // Force hide dialog to prevent pointer interception
            await this.page.evaluate((id) => {
                const el = document.querySelector(`#${id}`);
                if (el) {
                    (el as HTMLElement).style.display = 'none';
                    (el as HTMLElement).style.visibility = 'hidden';
                    (el as HTMLElement).style.pointerEvents = 'none';
                }
            }, dialogId).catch(() => { });

            await this.page.waitForTimeout(300);
        }
    }

    /**
     * Take screenshot
     */
    async screenshot(fileName: string): Promise<void> {
        await this.page.screenshot({ path: fileName, fullPage: true });
    }

    /**
     * Get page content
     */
    async getContent(): Promise<string> {
        return await this.page.content();
    }

    /**
     * Wait for navigation
     */
    async waitForNavigation(urlPattern: RegExp, timeout: number = 10000): Promise<void> {
        await this.page.waitForURL(urlPattern, { timeout });
    }

    /**
     * Get current URL
     */
    getCurrentUrl(): string {
        return this.page.url();
    }

    /**
     * Open action menu (Material-UI)
     */
    async openActionMenu(actionMenuSelector: string): Promise<void> {
        const menuButton = this.page.locator(actionMenuSelector).first();
        await this.waitForVisible(menuButton);
        await this.clickWithRetry(menuButton);
        await this.page.waitForTimeout(500);
    }

    /**
     * Click menu item by text (for Material-UI List)
     */
    async clickMenuItemByText(menuItemText: string): Promise<void> {
        const menuItem = this.page.locator(`ul.MuiList-root:has-text("${menuItemText}")`).first();
        await this.waitForVisible(menuItem);
        await this.clickWithRetry(menuItem);
        await this.page.waitForTimeout(500);
    }

    /**
     * Click confirm button (確定) - opens action menu and clicks confirm
     */
    async clickConfirm(
        actionMenuSelector: string = 'button.MuiButtonBase-root[aria-haspopup="true"]',
        confirmText: string = '確定'
    ): Promise<void> {
        // await this.openActionMenu(actionMenuSelector);
        await this.clickMenuItemByText(confirmText);
        await this.page.waitForTimeout(1000);
    }

    /**
     * Click clear button (クリア) - opens action menu and clicks clear
     */
    async clickClear(
        actionMenuSelector: string = 'button.MuiButtonBase-root[aria-haspopup="true"]',
        clearText: string = 'クリア'
    ): Promise<void> {
        // await this.openActionMenu(actionMenuSelector);
        await this.clickMenuItemByText(clearText);
        await this.page.waitForTimeout(500);
    }

    /**
     * Wait for text to appear in body
     * @param text - Text to search for in body
     * @param timeout - Timeout in milliseconds (default: 5000)
     * @returns true if text is found, false otherwise
     */
    async waitForTextInBody(text: string, timeout: number = 5000): Promise<boolean> {
        try {
            await this.page.waitForFunction(
                (searchText) => {
                    return document.body.innerText.includes(searchText);
                },
                text,
                { timeout }
            );
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Click icon menu - opens menu
     * @param menuButtonSelector - Selector for the menu button (default: DEFAULT_MENU_BUTTON_SELECTOR)
     */
    async clickIconMenu(menuButtonSelector: string = DEFAULT_MENU_BUTTON_SELECTOR): Promise<void> {
        const menuButton = this.page.locator(menuButtonSelector);
        await menuButton.click({ timeout: 10000 });
    }

    /**
     * Click icon menu - opens menu and clicks menu item by text
     * @param menuItemText - Text of the menu item to click
     * @param menuButtonSelector - Selector for the menu button (default: DEFAULT_MENU_BUTTON_SELECTOR)
     */
    async clickItemMenu(menuItemText: string, menuButtonSelector: string = DEFAULT_MENU_BUTTON_SELECTOR): Promise<void> {
        const menuButton = this.page.locator(menuButtonSelector);
        await menuButton.click({ timeout: 10000 });
        await this.page.waitForTimeout(500);
        const menuItem = this.page.locator('ul.MuiList-root li').filter({ hasText: menuItemText });
        await menuItem.click({ timeout: 10000 });
    }

    /**
     * Check if menu item is visible
     * @param menuItemText - Text of the menu item to check
     * @returns true if menu item is visible, false otherwise
     */
    async isMenuIconVisible(menuItemText: string): Promise<boolean> {
        const menuItem = this.page.locator('ul.MuiList-root li').filter({ hasText: menuItemText });
        return await menuItem.isVisible({ timeout: 10000 }).catch(() => false);
    }

    /**
     * Check if input is disabled
     * @param locator - Locator for the input
     * @returns true if input is disabled, false otherwise
     */
    async isInputDisabled(locator: Locator): Promise<boolean> {
        return await locator.isDisabled({ timeout: 10000 }).catch(() => false);
    }

    /**
     * Fill input by ID
     * @param id - ID of the input element
     * @param value - Value to fill
     * @param delay - Delay between keystrokes (default: 50ms)
     */
    async fillInputById(id: string, value: string, delay: number = 50): Promise<void> {
        const locator = this.page.locator(`#${id}`);
        await this.waitForVisible(locator, 10000);
        await this.fillInput(locator, value, delay);
    }

    /**
     * Fill input by name
     * @param name - Name of the input element
     * @param value - Value to fill
     * @param delay - Delay between keystrokes (default: 50ms)
     */
    async fillInputByName(name: string, value: string, delay: number = 50): Promise<void> {
        const locator = this.page.locator(`[name="${name}"]`);
        await this.waitForVisible(locator, 10000);
        await this.fillInput(locator, value, delay);
    }

    /**
     * Get value by ID
     * @param id - ID of the input element
     * @returns Value of the input element
     */
    async getValueById(id: string): Promise<string> {
        const locator = this.page.locator(`#${id}`);
        await this.waitForVisible(locator, 10000);
        return await locator.inputValue();
    }

    /**
     * Get value by name
     * @param name - Name of the input element
     * @returns Value of the input element
     */
    async getValueByName(name: string): Promise<string> {
        const locator = this.page.locator(`[name="${name}"]`);
        await this.waitForVisible(locator, 10000);
        return await locator.inputValue();
    }

    /**
     * Get text by locator
     * @param locator - Locator of the element
     * @returns Inner text of the element
     */
    async getTextByLocator(locator: Locator): Promise<string> {
        await this.waitForVisible(locator, 10000);
        return await locator.innerText();
    }

    async isConfirmButtonVisible(selectorConfirmButton: string): Promise<boolean> {
        return await this.page.locator(selectorConfirmButton).isVisible();
    }

    async isClearButtonVisible(selectorClearButton: string): Promise<boolean> {
        return await this.page.locator(selectorClearButton).isVisible();
    }

    /**
     * Helper method to open combobox and click option
     * @param optionSelectors - Array of selectors to try for finding the option
     * @param errorMessage - Error message to throw if option not found
     * @param comboboxSelector - Selector for the combobox
     */
    protected async clickOptionInCombobox(optionSelectors: string[], errorMessage: string, comboboxSelector: string): Promise<void> {
        const comboboxLocator = this.page.locator(comboboxSelector);

        await this.waitForVisible(comboboxLocator, 10000);
        await comboboxLocator.click({ timeout: 10000 });
        await this.page.waitForTimeout(500);

        for (const selector of optionSelectors) {
            const optionLocator = this.page.locator(selector);
            if (await optionLocator.count() > 0) {
                await this.waitForVisible(optionLocator.first(), 5000);
                await optionLocator.first().click({ timeout: 5000 });
                await this.page.waitForTimeout(500);
                return;
            }
        }
        throw new Error(errorMessage);
    }

    /**
     * Click on combobox and select option by data-value
     * @param dataValue - data-value attribute of the option to select (e.g., "01", "02")
     * @param comboboxSelector - Selector for the combobox
     * @param dropdownOptionSelector - Optional selector for dropdown option container (for more specific search)
     */
    async selectComboboxOptionByValue(dataValue: string, comboboxSelector: string, dropdownOptionSelector?: string): Promise<void> {
        const optionSelectors = [
            `ul.MuiList-root li[role="option"][data-value="${dataValue}"]`,
            `li[role="option"][data-value="${dataValue}"]`,
            ...(dropdownOptionSelector ? [`${dropdownOptionSelector}[data-value="${dataValue}"]`] : []),
        ];
        await this.clickOptionInCombobox(optionSelectors, `Option with data-value "${dataValue}" not found in combobox dropdown`, comboboxSelector);
    }

    async blurInputById(id: string): Promise<void> {
        const locator = this.page.locator(`#${id}`);
        await this.waitForVisible(locator, 10000);
        await locator.blur();
    }

    async hasErrorBorderById(id: string): Promise<boolean> {
        const locator = this.page.locator(`#${id}`);

        // Check if element exists and is visible
        const isVisible = await locator.isVisible({ timeout: 10000 }).catch(() => false);
        if (!isVisible) {
            return false;
        }

        // Get error class - use fallback if not defined in child class
        const errorClass = this.selectors?.errorClass || '_error_cbu4e_24';

        // Wait for error class to appear (class might be added asynchronously after validation)
        // Retry checking for the class with intervals
        const maxRetries = 6; // 6 retries * 500ms = 3 seconds
        for (let i = 0; i < maxRetries; i++) {
            try {
                const classList = await locator
                    .evaluate((el: Element) => Array.from(el.classList) as string[])
                    .catch(() => [] as string[]);

                if (classList.includes(errorClass)) {
                    return true;
                }
            } catch {
                // Continue to next retry
            }

            // Wait 500ms before next check (except on last iteration)
            if (i < maxRetries - 1) {
                await this.page.waitForTimeout(500);
            }
        }

        // Final check if element has error class
        try {
            const classList = await locator
                .evaluate((el: Element) => Array.from(el.classList) as string[])
                .catch(() => [] as string[]);
            return classList.includes(errorClass);
        } catch {
            return false;
        }
    }

    /**
     * Select a radio option by group label and option value
     * @param groupLabel - Label text of the radio group (e.g., "表示在庫")
     * @param optionValue - Value text of the option to select (e.g., "実在庫", "有効")
     */
    async selectedOption(groupLabel: string, optionValue: string): Promise<void> {
        // Since input is hidden, we need to click on the label or span containing the option text
        // Try multiple selectors to find the clickable element
        const selectors = [
            // Click on label containing the option text
            `label:has-text("${groupLabel}") ~ div label:has-text("${optionValue}")`,
            // Click on span containing the option text
            `label:has-text("${groupLabel}") ~ div label:has-text("${optionValue}") span`,
            // Alternative: click on label by value attribute
            `label:has-text("${groupLabel}") ~ div label:has(input[type="radio"][value="${optionValue}"])`,
        ];

        let clicked = false;
        for (const selector of selectors) {
            try {
                const locator = this.page.locator(selector).first();
                const isVisible = await locator.isVisible({ timeout: 2000 }).catch(() => false);
                if (isVisible) {
                    await locator.scrollIntoViewIfNeeded();
                    await locator.click({ timeout: 5000, force: true });
                    clicked = true;
                    break;
                }
            } catch (error) {
                // Continue to next selector
                continue;
            }
        }

        if (!clicked) {
            throw new Error(`Could not find or click radio option "${optionValue}" in group "${groupLabel}"`);
        }

        await this.page.waitForTimeout(300); // Wait for selection to be applied
    }

    /**
     * Select option for Material UI Select (div role="combobox")
     *
     * @param selectLocator Locator of MUI select element
     * @param value value of option (data-value)
     */
    async selectMuiSelect(selectLocator: Locator, value: string): Promise<void> {
        // Wait select visible
        await this.waitForVisible(selectLocator, 20000);

        // Open dropdown
        await selectLocator.click();

        // Locate option by data-value
        const option = this.page.locator(`li[data-value="${value}"]`);
        await this.waitForVisible(option, 10000);

        // Click option
        await option.click();
    }

    /**
     * Click action menu button
     */
    async clickMenuButton(): Promise<void> {
        const locator = this.page.locator('button.MuiButtonBase-root[aria-haspopup="true"]');
        await this.waitForVisible(locator);
        await this.clickWithRetry(locator);
        await this.page.waitForTimeout(1000);
    }

    /**
     * Click button in action menu
     *
     * @param buttonText Text of the button to click
     */
    async clickButtonInMenuButton(buttonText: string): Promise<void> {
        // 1. Open action menu dropdown
        await this.clickMenuButton();

        // 2. Wait for MUI menu to appear
        const menu = this.page.locator('ul[role="menu"]');
        await this.waitForVisible(menu);

        // 3. Click the specified button text
        const button = menu.locator(`li[role="menuitem"]:has-text("${buttonText}")`);
        await this.waitForVisible(button);
        await button.click();

        // 4. Wait UI settle
        await this.page.waitForTimeout(500);

    }

    /**
     * Scroll in detail table until "End of data" text appears
     * @param tableId - Table ID selector (default: '#store-inventory-inquiry-2')
     * @param maxScrollAttempts - Maximum number of scroll attempts (default: 50)
     * @param scrollDelay - Delay between scrolls in ms (default: 500)
     * @throws Error if "End of data" is not found after max attempts
     */
    async scrollTableUntilEndOfData(
        tableId: string = '',
        maxScrollAttempts: number = 50,
        scrollDelay: number = 500
    ): Promise<void> {
        const endOfDataTexts = ['End of data', 'End Of Data', 'End of Data'];

        for (let attempt = 0; attempt < maxScrollAttempts; attempt++) {
            // Check if "End of data" text exists
            // It's displayed in a div with class "mt-2" after the ag-grid component
            let found = false;
            for (const text of endOfDataTexts) {
                // Try multiple selectors to find "End of data"
                const selectors = [
                    `${tableId} div.mt-2:has-text("${text}")`,
                    `${tableId} div:has-text("${text}")`,
                    `div.mt-2:has-text("${text}")`,
                    `text="${text}"`,
                ];

                for (const selector of selectors) {
                    const endOfDataLocator = this.page.locator(selector).first();
                    const isVisible = await endOfDataLocator.isVisible({ timeout: 500 }).catch(() => false);

                    if (isVisible) {
                        found = true;
                        break;
                    }
                }

                if (found) break;
            }

            if (found) {
                return; // Found "End of data", exit successfully
            }

            // Scroll within the table's viewport
            await this.page.evaluate((selector) => {
                const tableElement = document.querySelector(selector);
                if (tableElement) {
                    // Find the ag-grid body viewport
                    const viewport = tableElement.querySelector('.ag-body-viewport') as HTMLElement;
                    if (viewport) {
                        // Scroll down by a reasonable amount (e.g., 80% of viewport height)
                        const scrollAmount = viewport.clientHeight * 0.8;
                        viewport.scrollTop = Math.min(viewport.scrollTop + scrollAmount, viewport.scrollHeight - viewport.clientHeight);
                    } else {
                        // Fallback: scroll the table container itself
                        const table = tableElement as HTMLElement;
                        const scrollAmount = table.clientHeight * 0.8;
                        table.scrollTop = Math.min(table.scrollTop + scrollAmount, table.scrollHeight - table.clientHeight);
                    }
                }
            }, tableId);

            // Wait before next scroll attempt
            await this.page.waitForTimeout(scrollDelay);
        }

        // If we reach here, "End of data" was not found
        throw new Error(
            `"End of data" text not found after ${maxScrollAttempts} scroll attempts in table ${tableId}`
        );
    }

    /**
     * Scroll table to bottom and verify "End of data" text appears
     * @param tableId - Table ID selector (required, e.g., '#store-inventory-inquiry-2')
     * @param timeout - Timeout for waiting "End of data" to appear (default: 10000ms)
     * @returns Text content of "End of data" element
     */
    async scrollToBottomAndVerifyEndOfData(
        tableId: string,
        timeout: number = 10000
    ): Promise<string> {
        // Scroll table to bottom
        await this.page.evaluate((selector) => {
            const tableElement = document.querySelector(selector);
            if (tableElement) {
                // Find the ag-grid body viewport
                const viewport = tableElement.querySelector('.ag-body-viewport') as HTMLElement;
                if (viewport) {
                    // Scroll to bottom
                    viewport.scrollTop = viewport.scrollHeight;
                } else {
                    // Fallback: scroll the table container itself
                    const table = tableElement as HTMLElement;
                    table.scrollTop = table.scrollHeight;
                }
            }
        }, tableId);

        // Wait a bit for the scroll to complete
        await this.page.waitForTimeout(500);

        // Find "End of data" text - it can be in different formats
        const endOfDataTexts = ['End of data', 'End Of Data', 'End of Data'];
        let endOfDataLocator: ReturnType<typeof this.page.locator> | null = null;

        for (const text of endOfDataTexts) {
            // Try multiple selectors to find "End of data"
            const selectors = [
                `${tableId} div.mt-2:has-text("${text}")`,
                `${tableId} div:has-text("${text}")`,
                `div.mt-2:has-text("${text}")`,
            ];

            for (const selector of selectors) {
                const locator = this.page.locator(selector).first();
                const isVisible = await locator.isVisible({ timeout: 1000 }).catch(() => false);
                if (isVisible) {
                    endOfDataLocator = locator;
                    break;
                }
            }
            if (endOfDataLocator) break;
        }

        // If not found with specific selectors, try to find by text content
        if (!endOfDataLocator) {
            endOfDataLocator = this.page.locator('text=End of data').first();
        }

        // Wait for "End of data" to be visible
        await endOfDataLocator.waitFor({ state: 'visible', timeout });

        // Get text content
        const endOfDataText = await endOfDataLocator.textContent();
        return endOfDataText?.trim() || '';
    }

    /**
     * Click on a table row by row index
     * @param rowIndex - Row index (0-based)
     */
    async clickRowTable(rowIndex: number): Promise<void> {
        const rowLocator = this.page.locator(`div[role="row"][row-index="${rowIndex}"]`).first();
        await rowLocator.waitFor({ state: 'visible', timeout: 5000 });
        await rowLocator.click({ timeout: 5000 });
        await this.page.waitForTimeout(500);
    }
    /*
     * Verify validation message by label text
     * @param labelText - Text of the label associated with the input
     * @param expectedMessage - Expected validation message text
     */
    async verifyValidateMessageByLabel(labelText: string, expectedMessage: string): Promise<void> {
        const formBlock = this.page.locator(
            `div:has(label:text-is("${labelText}"))`
        );

        const errorMessage = formBlock.locator(
            'p.text-red-600'
        );

        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText(expectedMessage);
    }

    async clickOutside(): Promise<void> {
        await this.page.mouse.click(1, 1);
    }

    async clickButtonByText(text: string): Promise<void> {
        const locator = this.page.locator(`button:has-text("${text}")`);
        await locator.click({ timeout: 10000 });
    }

}
