import { expect, Locator } from "@playwright/test";
import { BasePage } from "../base.page";

export class WTZ10401Page extends BasePage {
    async navigate(pilotKey: string = 'prod'): Promise<void>{
        const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTZ10401ShoBrInfo?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
        await this.goto(url);
        await this.page.waitForTimeout(1000);
    }

    public readonly selectors = {
        backButton: 'button.w-full.font-family.relative.flex.cursor-pointer.appearance-none.items-center.justify-center',
        searchKeyInput: 'input[name="searchkey"]',
        searchKeyName: 'input[name="searchKey"]',

        errorDialog: '#tz104-error-dialog',

        confirmButton: 'button:has-text("確定")',
        searchButton: 'button:has-text("検索")',
    };

    public readonly labels = {
        screenTitle: '小分類検索',
        radioCode: 'コード',
        radioKana: 'カナ',
    };

    public readonly messages = {
        noDataFound: '該当データが存在しません。',
        requiredField: '必須入力項目です。',
        numericOnly: '数値で入力してください。',
        halfWidthOnly: '半角で入力してください。',
        selectCategory: '小分類名を選択してください。',
    };

    getRadioLabelLocator(text: string) {
        return this.page.locator(`label:has(span:text("${text}"))`);
    }
    /**
     * Check if back button is visible on the header
     */
    async isBackButtonVisible(): Promise<boolean> {
        const backButton = this.page
            .locator(this.selectors.backButton)
            .first();

        return await backButton
            .isVisible({ timeout: 10000 })
            .catch(() => false);
    }

    async findConfirmedButton(): Promise<Locator> {
        const confirmButton = this.page.locator(
            this.selectors.confirmButton
        );

        await this.waitForVisible(confirmButton);
        return confirmButton;
    }

    async isInputMaxLength(selector: string, expected: number): Promise<boolean> {
        const input = this.page.locator(selector);

        const maxLength = await input.getAttribute('maxlength');

        return Number(maxLength) === expected;
    }

    async hasAgGridData(tableRootSelector: string): Promise<boolean> {
        const rows = this.page.locator(
            `${tableRootSelector} [role="row"][row-id]`
        );

        return (await rows.count()) > 0;
    }

    async expectErrorByInputName(inputName: string, expectedMsg: string): Promise<void> {
        const error = this.page
            .locator(`input[name="${inputName}"]`)
            .locator('xpath=ancestor::div[contains(@class,"w-full")]//p');

        await expect(error).toHaveText(expectedMsg);
    }

    async clearInputSearchKey(): Promise<void> {
        const locator = this.page.locator(this.selectors.searchKeyInput);
        await locator.clear({ timeout: 10000 });
    }
}