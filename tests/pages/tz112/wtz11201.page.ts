import { expect } from "@playwright/test";
import { BasePage } from "../base.page";

export class WTZ11201Page extends BasePage {
    async navigate(pilotKey: string = 'prod'): Promise<void>{
        const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTZ11201Customer?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
        await this.goto(url);
        await this.page.waitForTimeout(1000);
    }

    async navigateWTY20101(pilotKey: string = 'prod'): Promise<void>{
        const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTY20101SalesInAdvance?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
        await this.goto(url);
        await this.page.waitForTimeout(1000);
    }

    public readonly selectors = {
        telNoInput: 'input[name="telNo"]',
        kokNameKanaInput: 'input[name="kokNameKana"]',
        kokCdInput: 'input[name="kokCd"]',
        kanNoInput: 'input[name="kanNo"]',

        clearButton: 'button:has-text("クリア")',
        confirmButton: 'button:has-text("確定")',
        searchButton: 'button:has-text("検索")',
        showModalButton: "button:has-text('顧客')",

        potentialCustimerButton: 'button:has-text("見込み客")',
        purchaseHistoryButton: 'button:has-text("購入履歴")', 
        notRegisteredButton: 'button:has-text("未登録")',
        vipButton: 'button:has-text("上様")',
        saleRequestButton: 'button:has-text("依頼売上")',

        errorDialog: '#wtz11201-error-dialog',

        bottomActionBar: 'div.fixed.bottom-0',
        optionButton: 'button[type="button"]:has(svg):not(:has-text("クリア"))',
        
        gridRowsContainer: '.ag-center-cols-container .ag-row',
    };

    async getInputValue(selector: string) {
        return await this.page.locator(selector).inputValue();
    }

    async isPotentialCustimerButtonVisible(): Promise<boolean> {
        return await this.page.locator(this.selectors.potentialCustimerButton).isVisible();
    }

    async isPurchaseHistoryButtonVisible(): Promise<boolean> {
        return await this.page.locator(this.selectors.purchaseHistoryButton).isVisible();
    }

    async isNotRegisteredButtonVisible(): Promise<boolean> {
        return await this.page.locator(this.selectors.notRegisteredButton).isVisible();
    }

    async isVipButtonVisible(): Promise<boolean> {
        return await this.page.locator(this.selectors.vipButton).isVisible();
    }

    async isSaleRequestButtonVisible(): Promise<boolean> {
        return await this.page.locator(this.selectors.saleRequestButton).isVisible();
    }

    async isClearButtonVisible(): Promise<boolean> {
        return await this.page.locator(this.selectors.clearButton).isVisible();
    }

    async isSearchButtonVisible(): Promise<boolean> {
        return await this.page.locator(this.selectors.searchButton).isVisible();
    }

    async isButtonDisabled(selector: string): Promise<boolean> {
        return await this.page.locator(selector).isDisabled();
    }

    async clickBottomLeftButtonByPosition() {
        const viewport = this.page.viewportSize();
        if (!viewport) throw new Error('No viewport');

        await this.page.mouse.click(
            30,                     
            viewport.height - 24    
        );
    }

    async isButtonWithTextExists(text: string): Promise<boolean> {
        const button = this.page.getByRole('button', { name: text });

        return await button.first().isVisible();
    }
}