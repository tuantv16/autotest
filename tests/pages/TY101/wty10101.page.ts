/**
 * WTY10101 Product Basic Inquiry Page Object
 * Page Object for 商品基本照会 screen
 */

import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export interface WTY10101SearchData {
    productCode: string; // 商品コード or JANコード
}

export class TY10101Page extends BasePage {
    // Selectors
    protected readonly selectors = {
        // Required by BasePage
        errorClass: '_error_cbu4e_24',

        // Page title
        pageTitle: 'div:has-text("商品基本照会")',

        // Search form
        searchInput: 'input[name="shnCd"]',
        kataInput: 'input[name="mkKata"]',
        rykmkrNmKnjInput: 'input[name="rykmkrNmKnj"]',
        searchButton: 'button:has-text("検索")',
        barcodeButton: 'div.scanner-icon button',
        modelSearchButton: 'button:has-text("型番検索")',
        menuButton: 'button[id="basic-button"]',
        clearInputIcon: 'img[role="button"][data-testid="ClearButton"]',
        scannerIcon: 'div.scanner-icon button',
        blankError: 'p.text-red-600:has-text("必須入力項目です。")',

        // Product information display
        productCodeDisplay: 'input[name="shnCd"]',
        modelNumber: 'input[name="mkKata"]',
        productName: 'input[name="rykchuNmKnj"]',
        makerName: 'input[name="rykmkrNmKnj"]',
        classificationCode: 'input[name="chuCd"]',
        rankInput: 'input[name="shnRnk"]',
        objectTypeInput: 'input[name="btrKbn"]',
        setTypeInput: 'input[name="setKbn"]',

        // Product details section
        detailDisclosure: 'button:has-text("詳細")',
        rankDisplay: 'div:has-text("ランク") + div',
        typeDisplay: 'div:has-text("物") + div',
        setDisplay: 'div:has-text("セット") + div',

        // Price section
        generalButton: 'label:has-text("一般")',
        memberButton: 'label:has-text("正会員")',
        anshinButton: 'label:has-text("あんしん会員")',
        normalPointButton: 'button:has-text("通常P")',
        limitedPointButton: 'button:has-text("期間限定P")',
        dmDisplayToggleButton: 'button:has-text("ＤＭ・展示売価表示")',

        // Stock table
        stockTable: '#TY101StockGrid',

        // Warranty section (below stock table)
        makerWarrantyInput: '#warranty',
        anshinWarrantyInput: '#ansn',
        extendedWarrantyInput: '#enchohshKkn',
        guaranteeRateInput: '#guarantee',

        // Electronic price benefit section (電子プライス特典表記)
        electronicPriceConcentratedSaleInput: '#monthConcentrationItem',
        electronicPricePriceSpecifyInput: '#mekaSpecifyItem',
        electronicPriceCouponDiscountInput: '#couponDiscount',
        electronicPriceNoInterestTimesInput: '#noInterestNumberOfPay',

        // Product image slider section (商品画像)
        productImageAccordionButton: 'button:has-text("商品画像")',
        productImageSliderWrapper: 'div[class*="ecSliderWrapper"]',
        productImageMainImage: 'div[class*="ecSliderWrapper"] img[alt*="商品画像"]',
        productImagePrevButton: 'div[class*="ecSliderWrapper"] button:has(svg[data-testid="ChevronLeftIcon"])',
        productImageNextButton: 'div[class*="ecSliderWrapper"] button:has(svg[data-testid="ChevronRightIcon"])',
        productImageThumbnails: 'div[class*="ecSliderWrapper"] img[alt*="Thumbnail"]',

        // Product description section (商品説明)
        productDescriptionAccordionButton: 'div.product-description button:has-text("商品説明")',
        productDescriptionContent: 'div.product-description div[class*="ecContent"]',

        // Product spec section (スペック)
        productSpecAccordionButton: 'div.product-spec button:has-text("スペック")',
        productSpecContent: 'div.product-spec div[class*="ecContent"]',

        // Product color variation section (カラーバリエーション)
        productColorSection: 'div.product-color',
        productColorAccordionButton: 'div.product-color button:has-text("カラーバリエーション")',
        productColorLabels: 'div.product-color div[class*="ecLabel"]',
        productColorJanLink: 'div.product-color div[class*="ecLabel"].underline',

        // Menu buttons
        menuPopup: 'ul[role="menu"]',
        productPriceMenuItem: 'ul[role="menu"] li:has-text("商品価格")',
        storeStockMenuItem: 'ul[role="menu"] li:has-text("店別在庫")',
        orderMenuItem: 'ul[role="menu"] li:has-text("オーダー")',
        arrivalMenuItem: 'ul[role="menu"] li:has-text("入荷予定")',
        cartMenuItem: 'ul[role="menu"] li:has-text("カート")',
        clearMenuItem: 'ul[role="menu"] li:has-text("クリア")',
        iconBack: ".page-header-left button",

        // Error messages
        errorMessage: 'p.text-red-500',
        requiredError: 'p:has-text("必須入力項目です。")',

        // Dialogs
        errorDialog: '#ty101-error-dialog',
        functionPopup: 'div[data-function-popup="true"]',
    };

    constructor(page: Page) {
        super(page);
    }

    /**
     * Navigate to WTY10101 Product Basic Inquiry screen
     */
    async navigate(pilotKey: string = 'prod'): Promise<void> {
        const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTY101ProductBasicInquiry?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
        await this.goto(url);
        await this.page.waitForTimeout(200);
    }

    /**
     * Wait for page to be ready
     */
    async waitForPageReady(): Promise<void> {
        await this.page.waitForSelector(this.selectors.pageTitle, {
            state: 'visible',
            timeout: 10000,
        });
        await this.page.waitForSelector(this.selectors.searchInput, {
            state: 'visible',
            timeout: 10000,
        });
    }

    /**
     * Check if page title is displayed
     */
    async isPageTitleVisible(): Promise<boolean> {
        const locator = this.page.locator(this.selectors.pageTitle).first();
        return await locator.isVisible({ timeout: 5000 }).catch(() => false);
    }

    /**
     * Get page title text
     */
    async getPageTitle(): Promise<string> {
        const locator = this.page.locator(this.selectors.pageTitle).first();
        return (await locator.textContent()) || '';
    }

    /**
     * Check if search input is visible
     */
    async isSearchInputVisible(): Promise<boolean> {
        const locator = this.page.locator(this.selectors.searchInput).first();
        return await locator.isVisible({ timeout: 5000 }).catch(() => false);
    }

    /**
     * Check if search button is visible
     */
    async isSearchButtonVisible(): Promise<boolean> {
        const locator = this.page.locator(this.selectors.searchButton).first();
        return await locator.isVisible({ timeout: 5000 }).catch(() => false);
    }

    /**
     * Fill search input
     */
    async fillSearchInput(value: string): Promise<void> {
        const locator = this.page.locator(this.selectors.searchInput).first();
        await this.waitForVisible(locator);
        await this.fillInput(locator, value);
    }

    /**
     * Click search button
     */
    async clickSearch(): Promise<void> {
        const locator = this.page.locator(this.selectors.searchButton).first();
        await this.clickWithRetry(locator);
        await this.page.waitForTimeout(1000); // Wait for search results
    }

    async clickMenuButton(): Promise<void> {
        const locator = this.page.locator(this.selectors.menuButton).first();
        await this.clickWithRetry(locator);
    }

    /**
     * Search for product
     */
    async searchProduct(productCode: string): Promise<void> {
        await this.fillSearchInput(productCode);
        await this.clickSearch();
    }

    /**
     * Click clear button (× button)
     */
    async clickClearButton(): Promise<void> {
        const locator = this.page.locator(this.selectors.clearInputIcon).first();
        await this.clickWithRetry(locator);
    }

    /**
     * Click barcode button
     */
    async clickBarcodeButton(): Promise<void> {
        const locator = this.page.locator(this.selectors.barcodeButton).first();
        await this.clickWithRetry(locator);
    }

    /**
     * Click model search button (型番検索)
     */
    async clickModelSearchButton(): Promise<void> {
        const locator = this.page.locator(this.selectors.modelSearchButton).first();
        await this.clickWithRetry(locator);
    }

    /**
     * Check if required error is displayed
     */
    async isRequiredErrorVisible(): Promise<boolean> {
        const locator = this.page.locator(this.selectors.requiredError).first();
        return await locator.isVisible({ timeout: 3000 }).catch(() => false);
    }

    /**
     * Get search input value
     */
    async getSearchInputValue(): Promise<string> {
        return await this.page.inputValue(this.selectors.searchInput);
    }

    /**
     * Get kata input value
     */
    async getKataInputValue(): Promise<string> {
        return await this.page.inputValue(this.selectors.kataInput);
    }

    /**
     * Check if product information is displayed
     */
    async isProductInfoDisplayed(): Promise<boolean> {
        const modelNumberLocator = this.page.locator(this.selectors.modelNumber).first();
        return await modelNumberLocator.isVisible({ timeout: 5000 }).catch(() => false);
    }

    /**
     * Get model number
     */
    async getModelNumber(): Promise<string> {
        return this.page.inputValue(this.selectors.modelNumber);
    }

    /**
     * Get product name
     */
    async getProductName(): Promise<string> {
        return this.page.inputValue(this.selectors.productName);
    }

    /**
     * Get maker name
     */
    async getMakerName(): Promise<string> {
        return this.page.inputValue(this.selectors.makerName);
    }

    /**
     * Get classification code (大+中) next to product name
     */
    async getClassificationCode(): Promise<string> {
        return this.page.inputValue(this.selectors.classificationCode);
    }

    async getRankValue(): Promise<string> {
        return this.page.inputValue(this.selectors.rankInput);
    }

    async getObjectType(): Promise<string> {
        return this.page.inputValue(this.selectors.objectTypeInput);
    }

    async getSetType(): Promise<string> {
        const value = await this.page.inputValue(this.selectors.setTypeInput);
        return value;
    }

    /**
     * Price mode label helpers (税込 / 税別 / 一般 / 正会員 / あんしん会員)
     */
    getGeneralPriceModeLabel(): Locator {
        return this.page.locator('label:has-text("一般")').first();
    }

    getMemberPriceModeLabel(): Locator {
        return this.page.locator('label:has-text("正会員")').first();
    }

    getAnshinPriceModeLabel(): Locator {
        return this.page.locator('label:has-text("あんしん会員")').first();
    }

    getTaxIncludedModeLabel(): Locator {
        return this.page.locator('label:has-text("税込")').first();
    }

    getTaxExcludedModeLabel(): Locator {
        return this.page.locator('label:has-text("税別")').first();
    }

    getNormalPointModeLabel(): Locator {
        return this.page.locator('label:has-text("通常P")').first();
    }

    getLimitedPointModeLabel(): Locator {
        return this.page.locator('label:has-text("期間限定P")').first();
    }

    getDmDisplayToggleButton(): Locator {
        return this.page.locator(this.selectors.dmDisplayToggleButton).first();
    }

    /**
     * Price table helpers
     * Get 2nd column (price value) cell for row 1/2/3
     */
    getPriceRowValueCell(rowIndex: 1 | 2 | 3): Locator {
        const selector = `div[class*="priceRow${rowIndex}"] div[class*="priceValueCell"]`;
        return this.page.locator(selector).first();
    }

    getPriceRow(rowIndex: 1 | 2 | 3): Locator {
        return this.page.locator(`div[class*="priceRow${rowIndex}"]`).first();
    }

    /**
     * Point table helpers
     * Normal points (通常P) columns: P率 / P額
     */
    getNormalPointRateCell(rowIndex: 1 | 2 | 3): Locator {
        const row = this.page.locator(`div[class*="priceRow${rowIndex}"]`);
        const cells = row.locator('div[class*="priceValueCell"]');
        // cells: [price, normalRate, normalAmount, limitedRate, limitedAmount, profit]
        return cells.nth(1);
    }

    getNormalPointAmountCell(rowIndex: 1 | 2 | 3): Locator {
        const row = this.page.locator(`div[class*="priceRow${rowIndex}"]`);
        const cells = row.locator('div[class*="priceValueCell"]');
        return cells.nth(2);
    }

    /**
     * Limited points (期間限定P) columns: P率 / P額
     */
    getLimitedPointRateCell(rowIndex: 1 | 2 | 3): Locator {
        const row = this.page.locator(`div[class*="priceRow${rowIndex}"]`);
        const cells = row.locator('div[class*="priceValueCell"]');
        return cells.nth(3);
    }

    getLimitedPointAmountCell(rowIndex: 1 | 2 | 3): Locator {
        const row = this.page.locator(`div[class*="priceRow${rowIndex}"]`);
        const cells = row.locator('div[class*="priceValueCell"]');
        return cells.nth(4);
    }

    /**
     * Stock table helpers
     */
    getStockGrid(): Locator {
        return this.page.locator(this.selectors.stockTable);
    }

    getStockRows(): Locator {
        return this.getStockGrid().locator('[role="row"][row-index]');
    }

    /**
     * Warranty info helpers (below stock table)
     */
    async getMakerWarrantyValue(): Promise<string> {
        return this.page.inputValue(this.selectors.makerWarrantyInput);
    }

    async getAnshinWarrantyValue(): Promise<string> {
        return this.page.inputValue(this.selectors.anshinWarrantyInput);
    }

    async getExtendedWarrantyValue(): Promise<string> {
        return this.page.inputValue(this.selectors.extendedWarrantyInput);
    }

    async getGuaranteeRateValue(): Promise<string> {
        return this.page.inputValue(this.selectors.guaranteeRateInput);
    }

    /**
     * Electronic price benefit helpers (電子プライス特典表記)
     */
    async getElectronicPriceConcentratedSaleValue(): Promise<string> {
        return this.page.inputValue(this.selectors.electronicPriceConcentratedSaleInput);
    }

    async getElectronicPricePriceSpecifyValue(): Promise<string> {
        return this.page.inputValue(this.selectors.electronicPricePriceSpecifyInput);
    }

    async getElectronicPriceCouponDiscountValue(): Promise<string> {
        return this.page.inputValue(this.selectors.electronicPriceCouponDiscountInput);
    }

    async getElectronicPriceNoInterestTimesValue(): Promise<string> {
        return this.page.inputValue(this.selectors.electronicPriceNoInterestTimesInput);
    }

    /**
     * Product image slider helpers (商品画像)
     */
    getProductImageAccordionButton(): Locator {
        return this.page.locator(this.selectors.productImageAccordionButton).first();
    }

    getProductImageSliderWrapper(): Locator {
        return this.page.locator(this.selectors.productImageSliderWrapper).first();
    }

    getProductImageMainImage(): Locator {
        return this.page.locator(this.selectors.productImageMainImage).first();
    }

    getProductImagePrevButton(): Locator {
        return this.page.locator(this.selectors.productImagePrevButton).first();
    }

    getProductImageNextButton(): Locator {
        return this.page.locator(this.selectors.productImageNextButton).first();
    }

    getProductImageThumbnails(): Locator {
        return this.page.locator(this.selectors.productImageThumbnails);
    }

    async clickProductImageAccordion(): Promise<void> {
        const button = this.getProductImageAccordionButton();
        await this.clickWithRetry(button);
        await this.page.waitForTimeout(500);
    }

    async clickProductImageNext(): Promise<void> {
        const button = this.getProductImageNextButton();
        await this.clickWithRetry(button);
        await this.page.waitForTimeout(500);
    }

    async clickProductImagePrev(): Promise<void> {
        const button = this.getProductImagePrevButton();
        await this.clickWithRetry(button);
        await this.page.waitForTimeout(500);
    }

    async getProductImageMainImageSrc(): Promise<string> {
        const img = this.getProductImageMainImage();
        return await img.getAttribute('src') || '';
    }

    async getProductImageThumbnailCount(): Promise<number> {
        return await this.getProductImageThumbnails().count();
    }

    /**
     * Product description helpers (商品説明)
     */
    getProductDescriptionAccordionButton(): Locator {
        return this.page.locator(this.selectors.productDescriptionAccordionButton).first();
    }

    getProductDescriptionContent(): Locator {
        return this.page.locator(this.selectors.productDescriptionContent).first();
    }

    async clickProductDescriptionAccordion(): Promise<void> {
        const button = this.getProductDescriptionAccordionButton();
        await this.clickWithRetry(button);
        await this.page.waitForTimeout(500);
    }

    /**
     * Product spec helpers (スペック)
     */
    getProductSpecAccordionButton(): Locator {
        return this.page.locator(this.selectors.productSpecAccordionButton).first();
    }

    getProductSpecContent(): Locator {
        return this.page.locator(this.selectors.productSpecContent).first();
    }

    async clickProductSpecAccordion(): Promise<void> {
        const button = this.getProductSpecAccordionButton();
        await this.clickWithRetry(button);
        await this.page.waitForTimeout(500);
    }

    getProductColorSection(): Locator {
        return this.page.locator(this.selectors.productColorSection).first();
    }

    getProductColorAccordionButton(): Locator {
        return this.page.locator(this.selectors.productColorAccordionButton).first();
    }

    getProductColorLabels(): Locator {
        return this.page.locator(this.selectors.productColorLabels).first();
    }

    getProductColorJanLink(janCode: string): Locator {
        return this.page.locator(this.selectors.productColorJanLink).filter({ hasText: `JAN: ${janCode}` }).first();
    }

    async clickProductColorAccordion(): Promise<void> {
        const button = this.getProductColorAccordionButton();
        await this.clickWithRetry(button);
        await this.page.waitForTimeout(500);
    }

    async isMenuItemVisible(menuItemSelector: string): Promise<boolean> {
        const locator = this.page.locator(menuItemSelector);
        return await locator.isVisible({ timeout: 3000 }).catch(() => false);
    }

    /**
     * Check if search input is disabled (inquiry mode)
     */
    async isSearchInputDisabled(): Promise<boolean> {
        const locator = this.page.locator(this.selectors.searchInput);
        return await locator.isDisabled();
    }

    /**
     * Check if search button is disabled (inquiry mode)
     */
    async isSearchButtonDisabled(): Promise<boolean> {
        const locator = this.page.locator(this.selectors.searchButton);
        return await locator.isDisabled();
    }

    /**
     * Wait for error dialog
     */
    async waitForErrorDialog(timeout: number = 5000): Promise<boolean> {
        const locator = this.page.locator(this.selectors.errorDialog);
        return await locator.isVisible({ timeout }).catch(() => false);
    }

    /**
     * Get error dialog message
     */
    async getErrorDialogMessage(): Promise<string> {
        const locator = this.page.locator(this.selectors.errorDialog);
        return (await locator.textContent()) || '';
    }

    /**
     * Dismiss error dialog by clicking OK
     */
    async dismissErrorDialog(): Promise<void> {
        const okButton = this.page.locator('button:has-text("OK")');
        if (await okButton.isVisible({ timeout: 2000 }).catch(() => false)) {
            await this.clickWithRetry(okButton);
        }
    }

    async getProductPriceMenuItem(): Promise<boolean> {
        const locator = this.page.locator(this.selectors.productPriceMenuItem).first();
        return await locator.isVisible({ timeout: 5000 }).catch(() => false);
    }

    /**
     * Query element by selector
     */
    async queryElement(selector: string): Promise<Locator> {
        return this.page.locator(selector);
    }

    async getStoreStockMenuItem(): Promise<boolean> {
        const locator = this.page.locator(this.selectors.storeStockMenuItem).first();
        return await locator.isVisible({ timeout: 5000 }).catch(() => false);
    }

    async getOrderMenuItem(): Promise<boolean> {
        const locator = this.page.locator(this.selectors.orderMenuItem).first();
        return await locator.isVisible({ timeout: 5000 }).catch(() => false);
    }

    async getArrivalMenuItem(): Promise<boolean> {
        const locator = this.page.locator(this.selectors.arrivalMenuItem).first();
        return await locator.isVisible({ timeout: 5000 }).catch(() => false);
    }

    async getCartMenuItem(): Promise<boolean> {
        const locator = this.page.locator(this.selectors.cartMenuItem).first();
        return await locator.isVisible({ timeout: 1000 }).catch(() => false);
    }

    async getClearInputIcon(): Promise<boolean> {
        const locator = this.page.locator(this.selectors.clearInputIcon).first();
        return await locator.isVisible({ timeout: 1000 }).catch(() => false);
    }

    async getScannerIcon(): Promise<boolean> {
        const locator = this.page.locator(this.selectors.scannerIcon).first();
        return await locator.isVisible({ timeout: 1000 }).catch(() => false);
    }
    async isScannerIconVisible(): Promise<boolean> {
        const locator = this.page.locator(this.selectors.scannerIcon).first();
        return await locator.isVisible({ timeout: 1000 }).catch(() => false);
    }

    async getClearMenuItem(): Promise<boolean> {
        const locator = this.page.locator(this.selectors.clearMenuItem).first();
        return await locator.isVisible({ timeout: 1000 }).catch(() => false);
    }

    async focusSearchInput(): Promise<void> {
        const locator = this.page.locator(this.selectors.searchInput).first();
        await locator.focus();
    }

    async isFunctionPopupVisible(): Promise<boolean> {
        const locator = this.page.locator(this.selectors.functionPopup).first();
        return await locator.isVisible({ timeout: 2000 }).catch(() => false);
    }

    async isModelSearchPopupItemVisible(): Promise<boolean> {
        const locator = this.page.locator(this.selectors.functionPopup).locator('button:has-text("型番検索")').first();
        return await locator.isVisible({ timeout: 1000 }).catch(() => false);
    }

    async clickOutside(): Promise<void> {
        await this.page.click('body', { position: { x: 0, y: 0 } });
    }

    async isBlankErrorMsgVisible(): Promise<boolean> {
        const locator = this.page.locator(this.selectors.blankError).first();
        return await locator.isVisible({ timeout: 1000 }).catch(() => false);
    }

    async clickIconBack(): Promise<void> {
        const locator = this.page.locator(this.selectors.iconBack).first();
        await this.clickWithRetry(locator);
    }
}


