import { expect, Locator } from "@playwright/test";
import { BasePage } from "../base.page";

export class WTZ10301Page extends BasePage {
    async navigate(pilotKey: string = 'prod'): Promise<void>{
        const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTZ10301MiddleClassificationSearch?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
        await this.goto(url);
        await this.page.waitForTimeout(1000);
    }

    public readonly selectors = {
        backButton: 'button[type="button"]:has(svg path.stroke-gray-400)',
        searchKeyInput: 'input[name="searchValue"]',
        searchKeyName: 'input[name="searchKey"]',

        errorDialog: '#tz103-error-dialog',

        confirmButton: 'button:has-text("確定")',
        searchButton: 'button:has-text("検索")',

        // Radio buttons
        radioKana: 'label:has(input[type="radio"][value="0"])',
        radioCode: 'label:has(input[type="radio"][value="1"])',

        clearButton: 'img[alt="クリア"]',

    };

    public readonly labels = {
        screenTitle: '中分類検索',
        radioCode: 'コード',
        radioKana: 'カナ',
    };

    public readonly messages = {
        noDataFound: '該当データが存在しません。',
        requiredField: '必須入力項目です。',
        numericOnly: '数値で入力してください。',
        halfWidthOnly: '半角で入力してください。',
        selectCategory: '中分類名を選択してください。',
    };

    getRadioLabelLocator(text: string) {
        return this.page.locator(`label:has(span:text("${text}"))`);
    }

    async findConfirmedButton(): Promise<Locator> {
        const confirmButton = this.page.locator(
            this.selectors.confirmButton
        );

        await this.waitForVisible(confirmButton);
        return confirmButton;
    }

    async clickConfirmButton(): Promise<void> {
        const confirmButton = await this.findConfirmedButton();
        await confirmButton.click();
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

    async verifyRadioAndTextboxInitialState(): Promise<void> {
        // Verify 2 radio buttons are visible
        const radioKana = this.page.locator(this.selectors.radioKana);
        const radioCode = this.page.locator(this.selectors.radioCode);

        await expect(radioKana).toBeVisible();
        await expect(radioCode).toBeVisible();

        // Verify 「カナ」 is active (selected), 「コード」 is inactive
        const radioKanaInput = this.page.locator('input[type="radio"][value="0"][name="searchMode"]');
        const radioCodeInput = this.page.locator('input[type="radio"][value="1"][name="searchMode"]');

        await expect(radioKanaInput).toBeChecked();
        await expect(radioCodeInput).not.toBeChecked();

        // Verify textbox: type="text" and maxlength=15
        const searchKeyInput = this.page.locator(this.selectors.searchKeyInput);
        await expect(searchKeyInput).toBeVisible();
        await expect(searchKeyInput).toHaveAttribute('type', 'text');
        await expect(searchKeyInput).toHaveAttribute('maxlength', '15');
    }

    async verifyRadioCodeSelectedState(): Promise<void> {
        // Verify 2 radio buttons are visible
        const radioKana = this.page.locator(this.selectors.radioKana);
        const radioCode = this.page.locator(this.selectors.radioCode);

        await expect(radioKana).toBeVisible();
        await expect(radioCode).toBeVisible();

        // Verify 「コード」 is active (selected), 「カナ」 is inactive
        const radioKanaInput = this.page.locator('input[type="radio"][value="0"][name="searchMode"]');
        const radioCodeInput = this.page.locator('input[type="radio"][value="1"][name="searchMode"]');

        await expect(radioCodeInput).toBeChecked();
        await expect(radioKanaInput).not.toBeChecked();

        // Verify textbox: type="number" and maxlength=4
        const searchKeyInput = this.page.locator(this.selectors.searchKeyInput);
        await expect(searchKeyInput).toBeVisible();
        await expect(searchKeyInput).toHaveAttribute('type', 'text');
        await expect(searchKeyInput).toHaveAttribute('maxlength', '4');
    }

    async verifyClearButtonVisible(): Promise<void> {
        const clearBtn = this.page.locator(this.selectors.clearButton);
        await expect(clearBtn).toBeVisible();
    }

    async verifyClearButtonFunctionality(): Promise<void> {
        // Verify clear button is visible
        const clearBtn = this.page.locator(this.selectors.clearButton);
        await expect(clearBtn).toBeVisible();

        // Click clear button
        await clearBtn.click();

        // Verify input is cleared
        const searchKeyInput = this.page.locator('input[name="searchValue"]');
        await expect(searchKeyInput).toHaveValue('');
    }

    async verifyTableColumnHeaders(): Promise<void> {
        const col1Header = this.page.locator('.ag-header-cell[col-id="code"] .ag-header-cell-text');
        const col2Header = this.page.locator('.ag-header-cell[col-id="name"] .ag-header-cell-text');

        await expect(col1Header).toBeVisible();
        await expect(col1Header).toHaveText('コード');

        await expect(col2Header).toBeVisible();
        await expect(col2Header).toHaveText('中分類名');
    }

    async expectSearchValueError(expectedMsg: string): Promise<void> {
        const errorLocator = this.page
            .locator('div:has(> input[name="searchValue"])')
            .locator('p.text-red-600');

        await expect(errorLocator).toBeVisible();
        await expect(errorLocator).toHaveText(expectedMsg);
    }
}