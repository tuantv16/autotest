import { expect } from "../../base/base-test";
import { BasePage } from "../base.page";

export class TY10901Page extends BasePage {
    public selectors = {
        uriNoInput: 'input[name="uriNo"]', // input 番号,
        kokCdInput: 'input[name="kokCd"]', // input 顧客コード
        tanCdInput: 'input[name="tanCd"]', // input 担当者
        kokNmInput: 'input[name="kokNm"]', // input 顧客
        kknDateInput: 'input[name="kknDateFrom"]', // input 期間 From
        kknDate_secondInput: 'input[name="kknDateTo"]', // input 期間 To
        
        uriNoId: '#uriNo',
        kokCdId: '#kokCd',
        tanCdId: '#tanCd',

        searchButton: 'button:has-text("検索")', 
        clearButton: 'button:has-text("クリア")',

        actionMenuButton: 'button.MuiButtonBase-root[aria-haspopup="true"]',

        errorValidateDialog: '#ty109-validation-error-dialog',
        errorDialog: '#ty109-error-dialog',
    };

    async navigate(pilotKey: string = 'prod'): Promise<void>{ 
        const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTY10901SalesInAdvanceCorrection?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
        await this.goto(url);
        await this.page.waitForTimeout(1000);
    }

    async clickMenuButton(): Promise<void> {
      await this.openActionMenu(this.selectors.actionMenuButton);
    }

    async fillkknDateDate(value: string): Promise<void> {
        const locator = this.page.locator(this.selectors.kknDateInput);
        await this.waitForVisible(locator);
        await this.fillInput(locator, value);
    }

    async fillkknDate_secondDate(value: string): Promise<void> {
        const locator = this.page.locator(this.selectors.kknDate_secondInput);
        await this.waitForVisible(locator);
        await this.fillInput(locator, value);
    }

    async clearDateTime(containerId: string): Promise<void> {
        const container = this.page.locator(`#${containerId}`);

        await expect(container.getByTestId('ClearButtonIcon')).toBeVisible();

        await container
            .getByTestId('ClearButtonIcon')
            .click({ force: true });
    }

    async clickBarcodeByLabel(labelText: string)
    {
        const inputId = await this.page
            .locator('label', { hasText: labelText })
            .getAttribute('for');

        expect(inputId).not.toBeNull();

        const input = this.page.locator(`#${inputId}`);

        await expect(input).toBeVisible();

        const barcodeBtn = input
            .locator('xpath=ancestor::div[contains(@class,"_textBoxContainer")]')
            .locator('button[type="button"]');

        await expect(barcodeBtn).toBeVisible();
        await barcodeBtn.click();
    }
}