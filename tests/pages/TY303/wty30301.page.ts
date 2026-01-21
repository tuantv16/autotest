import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../base.page";

export interface WTY30301FormData {
    outputDateInput: string;
    merchandiseCdInput: string;
    multiCmmentInput: string;
    sizeInput: string;
    numberSheetsInput: string;
    listedPriceInput: string;
    finalSellingPriceInput: string;
}

export class TY30301Page extends BasePage {

    // Selectors
    private readonly selectors = {
        // Form fields
        outputDateInput: 'input[name="outYmd"]',
        merchandiseCdInput: '#shnCd',
        manufacturerInput: '#mkNm',
        classificationInput: '#mkNm',
        modelNumberInput: '#kata',
        saleKknInput: '#saleKkn',
        saleNmInput: '#saleNm',
        validInput: '#yukoZai',
        overCounterInput: '#tentZai',
        exhibitionInput: '#tenjiZai',
        mockSuMaeInput: '#mockSuMae',
        mockSuInput: '#mockSu',
        multiCmmentInput: '#cmtKbn',
        sizeInput: '#mpopSiz',
        numberSheetsInput: '#prtMsu',
        listedPriceInput: '#keisaiKk',
        finalSellingPriceInput: '#lbk',

        // Buttons text
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
     * Click Clear (クリア) from action menu (MUI Menu)
     */
    async clickClear(): Promise<void> {
        await this.clickButtonInMenuButton('クリア');
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

    /**
     * Fill output date
     */
    async fillOutputDate(value: string): Promise<void> {
        const locator = this.page.locator(this.selectors.outputDateInput);
        await this.waitForVisible(locator, 20000);
        await this.fillInput(locator, value);
    }

    /**
     * Fill merchandise code
     */
    async fillMerchandiseCd(value: string): Promise<void> {
        const locator = this.page.locator(this.selectors.merchandiseCdInput);
        await this.waitForVisible(locator, 20000);
        await this.fillInput(locator, value);
    }

    /**
     * Fill merchandise code
     */
    async fillMultiCmment(value: string): Promise<void> {
        const locator = this.page.locator(this.selectors.multiCmmentInput);
        await this.waitForVisible(locator, 20000);
        await this.selectMuiSelect(locator, value);
    }

    /**
     * Fill size
     */
    async fillSize(value: string): Promise<void> {
        const locator = this.page.locator(this.selectors.sizeInput);
        await this.waitForVisible(locator, 20000);
        await this.selectMuiSelect(locator, value);
    }

    /**
     * Fill number of sheets
     */
    async fillNumberSheets(value: string): Promise<void> {
        const locator = this.page.locator(this.selectors.numberSheetsInput);
        await this.waitForVisible(locator, 20000);
        await this.fillInput(locator, value);
    }

    /**
     * Fill listed price
     */
    async fillListedPrice(value: string): Promise<void> {
        const locator = this.page.locator(this.selectors.listedPriceInput);
        await this.waitForVisible(locator, 20000);
        await this.fillInput(locator, value);
    }

    /**
     * Fill final selling price
     */
    async fillFinalSellingPrice(value: string): Promise<void> {
        const locator = this.page.locator(this.selectors.finalSellingPriceInput);
        await this.waitForVisible(locator, 20000);
        await this.fillInput(locator, value);
    }

    /**
     * Fill entire form
     */
    async fillForm(formData: WTY30301FormData): Promise<void> {
        await this.fillOutputDate(formData.outputDateInput);
        await this.fillMerchandiseCd(formData.merchandiseCdInput);
        await this.fillMultiCmment(formData.multiCmmentInput);
        await this.fillSize(formData.sizeInput);
        await this.fillNumberSheets(formData.numberSheetsInput);
        await this.fillListedPrice(formData.listedPriceInput);
        await this.fillFinalSellingPrice(formData.finalSellingPriceInput);
    }

    
    /**
     * Wait for form to be ready
     */
    async waitForFormReady(): Promise<void> {
        await this.page.waitForSelector(this.selectors.outputDateInput, {
        state: 'visible',
        timeout: 10000,
        });
    }

    /**
     * Get current form values (snapshot)
     */
    async getFormValues(): Promise<WTY30301FormData> {
        return {
            outputDateInput: await this.page.locator(this.selectors.outputDateInput).inputValue(),
            merchandiseCdInput: await this.page.locator(this.selectors.merchandiseCdInput).inputValue(),
            multiCmmentInput: await this.page.locator(this.selectors.multiCmmentInput).textContent() ?? '',
            sizeInput: await this.page.locator(this.selectors.sizeInput).textContent() ?? '',
            numberSheetsInput: await this.page.locator(this.selectors.numberSheetsInput).inputValue(),
            listedPriceInput: await this.page.locator(this.selectors.listedPriceInput).inputValue(),
            finalSellingPriceInput: await this.page.locator(this.selectors.finalSellingPriceInput).inputValue(),
        };
    }
    
    /**
     * Verify form values equal to expected snapshot
     */
    async verifyFormEquals(expected: WTY30301FormData): Promise<void> {
        await expect(this.page.locator(this.selectors.outputDateInput))
            .toHaveValue(expected.outputDateInput);

        await expect(this.page.locator(this.selectors.merchandiseCdInput))
            .toHaveValue(expected.merchandiseCdInput);

        await expect(this.page.locator(this.selectors.numberSheetsInput))
            .toHaveValue(expected.numberSheetsInput);

        await expect(this.page.locator(this.selectors.listedPriceInput))
            .toHaveValue(expected.listedPriceInput);

        await expect(this.page.locator(this.selectors.finalSellingPriceInput))
            .toHaveValue(expected.finalSellingPriceInput);

        // MUI Select → compare text
        await expect(this.page.locator(this.selectors.multiCmmentInput))
            .toHaveText(expected.multiCmmentInput);

        await expect(this.page.locator(this.selectors.sizeInput))
            .toHaveText(expected.sizeInput);
    }
}