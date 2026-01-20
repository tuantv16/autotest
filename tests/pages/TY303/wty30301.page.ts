import { Page, Locator } from "@playwright/test";
import { BasePage } from "../base.page";

export class TY30301Page extends BasePage {

    // Selectors
    private readonly selectors = {
        // Buttons
        actionMenuButton: 'button.MuiButtonBase-root[aria-haspopup="true"]',
        clearButton: 'ul.MuiList-root:has-text("クリア")',
        deleteButton: 'ul.MuiList-root:has-text("削除")',
        listButton: 'ul.MuiList-root:has-text("一覧")',
        confirmButton: 'ul.MuiList-root:has-text("確定")',

        // Toggle 
        normalToggle: 'label:has-text("通常")',
        disposalToggle: 'label:has-text("処分品")',
    };

    constructor(page: Page) {
        super(page);
    }

    /**
     * Navigate to WTY30301 Sales In Advance Correction screen
     */
    async navigate(pilotKey: string = 'prod'): Promise<void> {
        const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTY30301SalesInAdvanceCorrection?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
        await this.goto(url);
        await this.page.waitForTimeout(1000);
    }

    /**
     * Click confirm button (確定) - uses parent class implementation
     */
    async clickConfirm(): Promise<void> {
        await super.clickConfirm(this.selectors.actionMenuButton, '確定');
    }

    /**
     * Click clear button (クリア) - uses parent class implementation
     */
    async clickClear(): Promise<void> {
        await super.clickClear(this.selectors.actionMenuButton, 'クリア');
    }

    /**
     * Click action menu button
     */
    async clickMenuButton(): Promise<void> {
        await this.clickWithRetry(this.page.locator(this.selectors.actionMenuButton));
        await this.page.waitForTimeout(1000);
    }

    /**
     * Find Clear button locator
     */
    async findClearButton(): Promise<Locator> {
        const clearButton = this.page.locator(this.selectors.clearButton);
        await this.waitForVisible(clearButton);
        return clearButton;
    }

    /**
     * Find Delete button locator
     */
    async findDeleteButton(): Promise<Locator> {
        const deleteButton = this.page.locator(this.selectors.deleteButton);
        await this.waitForVisible(deleteButton);
        return deleteButton;
    }

    /**
     * Find List button locator
     */
    async findListButton(): Promise<Locator> {
        const listButton = this.page.locator(this.selectors.listButton);
        await this.waitForVisible(listButton);
        return listButton;
    }

    /**
     * Find Confirm button locator
     */
    async findConfirmButton(): Promise<Locator> {
        const confirmButton = this.page.locator(this.selectors.confirmButton);
        await this.waitForVisible(confirmButton);
        return confirmButton;
    }

    /**
     * Find Normal toggle locator
     */
    async findNormalToggle(): Promise<Locator> {
        const normalToggle = this.page.locator(this.selectors.normalToggle);
        await this.waitForVisible(normalToggle);
        return normalToggle;
    }

    /**
     * Find Disposal toggle locator
     */
    async findDisposalToggle(): Promise<Locator> {
        const disposalToggle = this.page.locator(this.selectors.disposalToggle);
        await this.waitForVisible(disposalToggle);
        return disposalToggle;
    }
}