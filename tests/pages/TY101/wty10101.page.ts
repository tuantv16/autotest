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
        releaseDateInput: 'input[name="htbDate"]',
        limitedInput: 'input[id="nykaskGntShnFlg"]',

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
        limitedPointButton: 'label:has-text("期間限定P")',
        dmDisplayToggleButton: 'button:has-text("ＤＭ・展示売価表示")',

        // Stock table
        stockTable: '#TY101StockGrid',

        // Warranty section (below stock table)
        makerWarrantyInput: '#warranty',
        anshinWarrantyInput: '#ansn',
        extendedWarrantyInput: '#enchohshKkn',
        guaranteeRateInput: '#guarantee',
        warrantyLabel: 'label[for="warranty"]',

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

        productMakerAccordionButton: 'div.product-maker-option button:has-text("メーカー純正オプション")',
        relatedProductAccordionButton: 'div.related-product button:has-text("関連商品・工事コード")',
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

        supplierName: 'input[name="shiirerykKnj"]',
        supplierCode: 'input[name="shiireCd"]',
        supplierCodeLabel: 'label[for="shiireCd"]',
        // Related product section
        relatedProductTakeAwayButton: 'div.related-product label:has-text("持帰り")',
        relatedProductDeliveryButton: 'div.related-product label:has-text("配達")',
        relatedProductAllButton: 'div.related-product label:has-text("全て")',

        // Set product table
        setProductTable: '#ty101-set-product-table',

        // Product recommend info section
        productRecommendInfoWrapper: 'div.product-recommend-info',
        productRecommendInfoLabel: 'div.product-recommend-info label:has-text("おすすめ")',

        taxIncludedButton: 'label:has-text("税込")',
        taxExcludedButton: 'label:has-text("税別")',
        guaranteeRateLabel: 'label[for="guarantee"]',

        buttonDeliveryInfo: 'button:has-text("納期情報")',

        recommendDataWrapper: 'div.recommend-data',

        endOfDataLabel: 'p:has-text("End Of Data")',
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
        await this.page.waitForTimeout(1000);
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
        await this.page.waitForTimeout(2500);
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
        return this.page.locator(this.selectors.limitedPointButton).first();
    }

    async clickLimitedPointModeLabel(): Promise<void> {
        const locator = this.page.locator(this.selectors.limitedPointButton).first();
        await this.clickWithRetry(locator);
        await this.page.waitForTimeout(500);
        return;
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
     * Get price table cell value by row and column
     * @param row - Row index (1=一般, 2=正会員/DM, 3=あんしん会員/展示)
     * @param col - Column index (-1=Label, 0=Price, 1=Normal P率, 2=Normal P額, 3=Limited P率, 4=Limited P額, 5=Profit)
     */
    async getPriceTableValue(row: 1 | 2 | 3, col: -1 | 0 | 1 | 2 | 3 | 4 | 5): Promise<string> {
        const rowLocator = this.page.locator(`div[class*="priceRow${row}"]`);
        if (col === -1) {
            // Get label cell (first cell without priceValueCell)
            const labelCell = rowLocator.locator('div[class*="colSpan5"]').first();
            return (await labelCell.textContent() || '').trim();
        } else {
            // Get value cell (with priceValueCell)
            const cell = rowLocator.locator('div[class*="priceValueCell"]').nth(col);
            return (await cell.textContent() || '').trim();
        }
    }

    /**
     * Calculate tax included price: taxExcluded × 1.1 (rounded)
     */
    calculateTaxIncludedPrice(taxExcludedPrice: string): string {
        return Math.round(parseInt(taxExcludedPrice.replace(/,/g, ''), 10) * 1.1).toLocaleString('en-US');
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

    getGuaranteeRateInput(): Locator {
        return this.page.locator(this.selectors.guaranteeRateInput).first();
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
        return this.page.locator(this.selectors.productColorLabels);
    }

    getProductColorJanLink(janCode: string): Locator {
        return this.page.locator(this.selectors.productColorJanLink).filter({ hasText: `JAN: ${janCode}` }).first();
    }

    getProductJanLinkBySection(parentClassName: string, janCode: string): Locator {
        return this.page.locator(
            `.${parentClassName} >> text=JAN: ${janCode}`
        );
    }

    getProductMakerAccordionButton(): Locator {
        return this.page.locator(this.selectors.productMakerAccordionButton).first();
    }

    async clickProductMakerAccordion(): Promise<void> {
        const button = this.page.locator(this.selectors.productMakerAccordionButton).first();
        await this.clickWithRetry(button);
        await this.page.waitForTimeout(500);
    }

    async clickRelatedProductAccordion(): Promise<void> {
        const button = this.getRelatedProductAccordionButton();
        await this.clickWithRetry(button);
        await this.page.waitForTimeout(500);
    }

    getRelatedProductAccordionButton(): Locator {
        return this.page.locator(this.selectors.relatedProductAccordionButton).first();
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

    async getClearMenuItem(): Promise<Locator> {
        const locator = this.page.locator(this.selectors.clearMenuItem).first();
        return locator;
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

    getLabelByFor(forValue: string): Locator {
        return this.page.locator(`label[for="${forValue}"]`).first();
    }
    getLabelSupplierCode(): Locator {
        return this.page.locator(this.selectors.supplierCodeLabel).first();
    }

    async getSupplierNameValue(): Promise<string> {
        return await this.page.inputValue(this.selectors.supplierName);
    }

    async getSupplierCodeValue(): Promise<string> {
        return await this.page.inputValue(this.selectors.supplierCode);
    }

    getRelatedProductTakeAwayButton(): Locator {
        return this.page.locator(this.selectors.relatedProductTakeAwayButton).first();
    }

    getRelatedProductDeliveryButton(): Locator {
        return this.page.locator(this.selectors.relatedProductDeliveryButton).first();
    }
    getRelatedProductAllButton(): Locator {
        return this.page.locator(this.selectors.relatedProductAllButton).first();
    }

    async isRelatedProductTakeAwayButtonVisible(): Promise<boolean> {
        const locator = this.getRelatedProductTakeAwayButton();
        return await locator.isVisible({ timeout: 5000 }).catch(() => false);
    }

    async isRelatedProductDeliveryButtonVisible(): Promise<boolean> {
        const locator = this.getRelatedProductDeliveryButton();
        return await locator.isVisible({ timeout: 5000 }).catch(() => false);
    }

    async isRelatedProductAllButtonVisible(): Promise<boolean> {
        const locator = this.getRelatedProductAllButton();
        return await locator.isVisible({ timeout: 5000 }).catch(() => false);
    }

    async clickRelatedProductTakeAwayButton(): Promise<void> {
        const locator = this.getRelatedProductTakeAwayButton();
        await this.clickWithRetry(locator);
        await this.page.waitForTimeout(500);
    }

    async clickRelatedProductDeliveryButton(): Promise<void> {
        const locator = this.getRelatedProductDeliveryButton();
        await this.clickWithRetry(locator);
        await this.page.waitForTimeout(500);
    }

    async clickRelatedProductAllButton(): Promise<void> {
        const locator = this.getRelatedProductAllButton();
        await this.clickWithRetry(locator);
        await this.page.waitForTimeout(500);
    }

    async isInputWithValueVisible(value: string, timeout: number = 5000): Promise<boolean> {
        const locator = this.page.locator(`input[value="${value}"]`).first();
        return await locator.isVisible({ timeout }).catch(() => false);
    }

    getReleaseDateInput(): Locator {
        return this.page.locator(this.selectors.releaseDateInput).first();
    }

    async getReleaseDateInputValue(): Promise<string> {
        return await this.page.inputValue(this.selectors.releaseDateInput);
    }

    async clickDetailDisclosure(): Promise<void> {
        const locator = this.getDetailDisclosureButton();
        await this.clickWithRetry(locator);
        await this.page.waitForTimeout(500);
    }

    getDetailDisclosureButton(): Locator {
        return this.page.locator(this.selectors.detailDisclosure).first();
    }

    async isSetProductTableVisible(): Promise<boolean> {
        const locator = this.page.locator(this.selectors.setProductTable);
        return await locator.isVisible({ timeout: 5000 }).catch(() => false);
    }

    /**
     * Click a row in set product table by filter text and return the number of API requests made
     * @param filterText - Text to filter the row in the table
     * @returns Number of API requests made after clicking the row
     */
    async clickSetProductTableRowAndCountApiRequests(filterText: string): Promise<number> {
        const setProductTable = this.page.locator(this.selectors.setProductTable);
        await setProductTable.waitFor({ state: 'visible', timeout: 5000 });

        let apiRequestCount = 0;
        let shouldTrack = false;
        const requestListener = (request: any) => {
            if (!shouldTrack) return;
            const url = request.url();
            if (url.includes('/WebAP/') || url.includes('TY')) {
                apiRequestCount++;
            }
        };
        this.page.on('request', requestListener);

        const dataRows = setProductTable.locator('[role="row"][row-index]');
        const rowCount = await dataRows.count();
        if (rowCount === 0) {
            this.page.off('request', requestListener);
            return 0;
        }

        const targetRow = dataRows.filter({ hasText: filterText }).first();
        await targetRow.waitFor({ state: 'visible', timeout: 5000 });

        shouldTrack = true;
        await targetRow.click();
        await this.page.waitForTimeout(1000);
        shouldTrack = false;

        this.page.off('request', requestListener);

        return apiRequestCount;
    }

    getProductRecommendInfoLabel(): Locator {
        return this.page.locator(this.selectors.productRecommendInfoLabel).first();
    }

    getProductRecommendInfo(): Locator {
        return this.page.locator(this.selectors.productRecommendInfoWrapper).first();
    }

    /**
     * Capture API responses matching the URL pattern
     * @param urlPatterns - Array of URL patterns to match (default: ['/WebAP/', '/api/', 'TY101'])
     * @returns Object with responses array and cleanup function
     */
    startCapturingApiResponses(urlPatterns: string[] = ['/WebAP/', '/api/']): {
        responses: Array<{ url: string; status: number; timestamp: string; body: any }>;
        stop: () => void;
    } {
        const capturedResponses: Array<{ url: string; status: number; timestamp: string; body: any }> = [];

        const responseListener = async (response: any) => {
            const url = response.url();
            const matchesPattern = urlPatterns.some(pattern => url.includes(pattern));

            if (matchesPattern) {
                try {
                    const responseBody = await response.json();
                    capturedResponses.push({
                        url: url,
                        status: response.status(),
                        timestamp: new Date().toISOString(),
                        body: responseBody
                    });
                } catch (e) {
                    // Response might not be JSON
                    try {
                        const text = await response.text();
                        capturedResponses.push({
                            url: url,
                            status: response.status(),
                            timestamp: new Date().toISOString(),
                            body: text
                        });
                    } catch (e2) {
                        // Ignore if can't read response
                    }
                }
            }
        };

        this.page.on('response', responseListener);

        return {
            responses: capturedResponses,
            stop: () => {
                this.page.off('response', responseListener);
            }
        };
    }

    async clickTaxIncludedModeLabel(): Promise<void> {
        const locator = this.page.locator(this.selectors.taxIncludedButton).first();
        await this.clickWithRetry(locator);
        await this.page.waitForTimeout(500);
        return;
    }

    async clickTaxExcludedModeLabel(): Promise<void> {
        const locator = this.page.locator(this.selectors.taxExcludedButton).first();
        await this.clickWithRetry(locator);
        await this.page.waitForTimeout(500);
        return;
    }

    getLimitedPointButton(): Locator {
        return this.page.locator(this.selectors.limitedPointButton).first();
    }

    async clickLimitedPointButton(): Promise<void> {
        const locator = this.page.locator(this.selectors.limitedPointButton).first();
        await this.clickWithRetry(locator);
        await this.page.waitForTimeout(500);
        return;
    }

    /**
     * Check if button has plum background color
     */
    async hasPlumBackground(locator: Locator): Promise<boolean> {
        const bgColor = await locator.evaluate((el) => {
            const style = window.getComputedStyle(el);
            return style.backgroundColor;
        });
        // Plum color: rgb(221, 160, 221) or #DDA0DD
        return bgColor.includes('221, 160, 221') || bgColor.includes('221,160,221') || bgColor.toLowerCase() === '#dda0dd';
    }

    getButtonDeliveryInfo(): Locator {
        return this.page.locator(this.selectors.buttonDeliveryInfo).first();
    }

    async clickButtonDeliveryInfo(): Promise<void> {
        const locator = this.page.locator(this.selectors.buttonDeliveryInfo).first();
        await this.clickWithRetry(locator);
        await this.page.waitForTimeout(500);
        return;
    }

    getErrorDialog(): Locator {
        return this.page.locator(this.selectors.errorDialog).first();
    }

    getWarrantyLabel(): Locator {
        return this.page.locator(this.selectors.warrantyLabel).first();
    }

    getGuaranteeRateLabel(): Locator {
        return this.page.locator(this.selectors.guaranteeRateLabel).first();
    }

    getRecommendDataWrapper(): Locator {
        return this.page.locator(this.selectors.recommendDataWrapper).first();
    }

    getLimitedInput(): Locator {
        return this.page.locator(this.selectors.limitedInput).first();
    }

    async getLimitedInputValue(): Promise<string> {
        return await this.page.inputValue(this.selectors.limitedInput);
    }

    /**
     * Scroll element to center of viewport
     */
    async scrollToCenter(locator: Locator): Promise<void> {
        await locator.evaluate((element) => {
            element.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' });
        });
        await this.page.waitForTimeout(300); // Wait for scroll animation
    }

    getSetProductTable(): Locator {
        return this.page.locator(this.selectors.setProductTable).first();
    }
    getEndOfDataLabel(): Locator {
        return this.page.locator(this.selectors.endOfDataLabel).first();
    }
}
