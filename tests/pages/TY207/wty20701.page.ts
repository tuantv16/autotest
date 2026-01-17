/**
 * WTY20701 Installation Confirmation Page Object
 * 設置確認書紐付 for 摘要欄入力 screen
 */

import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';
import { IndexedDBHelper } from '../../utils/indexeddb-helper';

export class WTY207010Page extends BasePage {
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
     * Initialize page: Load base URL, inject IndexedDB data, and navigate to WTY20701 screen
     * @param indexedDBHelper - Helper for IndexedDB operations
     * @param sessionData - Session data to inject
     * @param commonData - Common data to inject
     */
    async init(
        indexedDBHelper: IndexedDBHelper,
        sessionData: any,
        commonData: any
    ): Promise<void> {
        // Step 1: Navigate to base URL first to establish origin for localStorage
        console.log('[TEST] Loading base page to establish origin...');
        await this.page.goto(this.baseUrl, { waitUntil: 'domcontentloaded' });
        await this.page.waitForTimeout(500);

        // Step 2: Initialize IndexedDB (now localStorage is accessible)
        console.log('[TEST] Injecting IndexedDB data...');
        await indexedDBHelper.initializeDB(sessionData, commonData);
        await this.page.waitForTimeout(1000);

        // Step 3: Navigate to target screen
        console.log('[TEST] Navigating to WTY20701 screen...');
        await this.navigate();
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
}