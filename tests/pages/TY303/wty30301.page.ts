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

export type WTY30301FormFieldKey = keyof WTY30301FormData;

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
        exitButton: 'ul.MuiList-root:has-text("終了")',

        // Toggle 
        normalToggle: 'label:has-text("通常")',
        disposalToggle: 'label:has-text("処分品")',

        // Buttons image
        clearMerchandiseCdInput: 'img[aria-label="clear"]'
    };

    private readonly formFieldGetters: Record<
        WTY30301FormFieldKey,
        () => Promise<string>
    > = {
        outputDateInput: async () =>
            this.page.locator(this.selectors.outputDateInput).inputValue(),

        merchandiseCdInput: async () =>
            this.page.locator(this.selectors.merchandiseCdInput).inputValue(),

        multiCmmentInput: async () =>
            this.getTextOrEmpty(this.page.locator(this.selectors.multiCmmentInput)),

        sizeInput: async () =>
            this.getTextOrEmpty(this.page.locator(this.selectors.sizeInput)),

        numberSheetsInput: async () =>
            this.page.locator(this.selectors.numberSheetsInput).inputValue(),

        listedPriceInput: async () =>
            this.page.locator(this.selectors.listedPriceInput).inputValue(),

        finalSellingPriceInput: async () =>
            this.page.locator(this.selectors.finalSellingPriceInput).inputValue(),
    };

    private readonly formFieldFillers: Record<
        WTY30301FormFieldKey,
        (value: string) => Promise<void>
    > = {
        outputDateInput: async (value) =>
            this.fillOutputDate(value),

        merchandiseCdInput: async (value) =>
            this.fillMerchandiseCd(value),

        multiCmmentInput: async (value) =>
            this.fillMultiCmment(value),

        sizeInput: async (value) =>
            this.fillSize(value),

        numberSheetsInput: async (value) =>
            this.fillNumberSheets(value),

        listedPriceInput: async (value) =>
            this.fillListedPrice(value),

        finalSellingPriceInput: async (value) =>
            this.fillFinalSellingPrice(value),
    };

    private async getTextOrEmpty(locator: Locator): Promise<string> {
        return (await locator.textContent())?.trim() ?? '';
    }

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

    async urlScreenList(): Promise<string> {
        return '#/WTY30302MultiPopOutputInstructionList';
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
     * Click List (一覧) from action menu (MUI Menu)
     */
    async clickList(): Promise<void> {
        await this.clickButtonInMenuButton('一覧');
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
     * Fill form dynamically (only provided fields)
     */
    async fillForm(
        formData: Partial<WTY30301FormData>
    ): Promise<void> {
        for (const key of Object.keys(formData) as WTY30301FormFieldKey[]) {
            const value = formData[key];
            if (value == null) continue;

            const filler = this.formFieldFillers[key];

            if (!filler) {
                throw new Error(`No filler defined for field: ${key}`);
            }

            await filler(value);
        }
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
     * Get form values (snapshot)
     * @param fields fields to get (optional)
     */
    async getFormValues(
        fields?: WTY30301FormFieldKey[]
    ): Promise<Partial<WTY30301FormData>> {

        const keys =
            fields ?? (Object.keys(this.formFieldGetters) as WTY30301FormFieldKey[]);

        const result: Partial<WTY30301FormData> = {};

        for (const key of keys) {
            result[key] = await this.formFieldGetters[key]();
        }

        return result;
    }
    
    /**
     * Verify form values equal to expected snapshot
     */
    async verifyFormEquals(
        expected: Partial<WTY30301FormData>
    ): Promise<void> {

        for (const [key, value] of Object.entries(expected)) {
            if (value === undefined) continue;

            const field = key as WTY30301FormFieldKey;
            const locator = this.page.locator(this.selectors[field]);

            // MUI Select
            if (field === 'multiCmmentInput' || field === 'sizeInput') {
                await expect(locator).toHaveText(value);
            } else {
                await expect(locator).toHaveValue(value);
            }
        }
    }

    /**     
     * Click clear merchandise code button (image button)
     */
    async clickMerchandiseCdButton(): Promise<void> {
        const locator = this.page.locator(this.selectors.clearMerchandiseCdInput);
        await this.waitForVisible(locator, 20000);
        await locator.click();
    }
}