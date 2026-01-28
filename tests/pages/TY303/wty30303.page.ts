import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base.page";

export class TY30303Page extends BasePage {

    // Selectors
    private readonly selectorsTY30303 = {
        backButton: 'button.w-full.font-family.relative.flex.cursor-pointer.appearance-none.items-center.justify-center',
        saleTitleHeading: '.text-heading-h5:has-text("セール選択")',
        
        // Buttons menu Ul text
        confirmUlButton: 'ul.MuiList-root:has-text("確定")',

        // AG Grid
        agRows: '.ag-center-cols-container .ag-row',
        multiRowCellItem: '.multi-row-cell-item',
    }

    constructor(page: Page) {
        super(page);
    }

    /**
     * Navigate to WTY30303 Sale Selection
     */
    async navigate(pilotKey: string = 'prod'): Promise<void> {
        const url =
            `${this.baseUrl}/index.html?pilotkey=${pilotKey}` +
            `#/WTY30303SaleSelection?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;

        await this.goto(url);
        await this.page.waitForTimeout(1000);
    }

    /**
     * Get AG-Grid row by index (0-based)
     *
     * @param rowIndex Index of the row (0-based)
     * @returns Locator of the row
     */
    getRowByIndex(rowIndex: number): Locator {
        return this.page
            .locator(this.selectorsTY30303.agRows)
            .nth(rowIndex);
    }

    /**
     * Check if back button is visible on the header
     */
    async isBackButtonVisible(): Promise<boolean> {
        const backButton = this.page
            .locator(this.selectorsTY30303.backButton)
            .first();

        return await backButton
            .isVisible({ timeout: 10000 })
            .catch(() => false);
    }

    /**
     * Click the back button on the header
     */
    async clickBackButton(): Promise<void> {
        const backButton = this.page
            .locator(this.selectorsTY30303.backButton)
            .first();

        await this.waitForVisible(backButton, 10000);
        await this.clickWithRetry(backButton);
        await this.page.waitForTimeout(500);
    }

    /**
     * Check if the sale selection title (セール選択) is visible
     */
    async isSaleTitleVisible(): Promise<boolean> {
        const titleLocator = this.page.locator(
            this.selectorsTY30303.saleTitleHeading
        );

        return await titleLocator
            .isVisible({ timeout: 10000 })
            .catch(() => false);
    }

    /**
     * Find confirm button locator
     */
    async findConfirmedButton(): Promise<Locator> {
        const confirmButton = this.page.locator(
            this.selectorsTY30303.confirmUlButton
        );

        await this.waitForVisible(confirmButton);
        return confirmButton;
    }

    /**
     * Verify マルチコメント text by row index
     *
     * @param rowIndex Index of row (0-based)
     * @param expectedText Text to be displayed (e.g. ズバリ)
     */
    async verifyMultiCommentText(
        rowIndex: number,
        expectedText: string
    ): Promise<void> {
        const row = this.getRowByIndex(rowIndex);

        const commentItem = row.locator(
            this.selectorsTY30303.multiRowCellItem,
            { hasText: expectedText }
        );

        await this.waitForVisible(commentItem, 10000);
    }

    /**
     * Verify マルチコメント is blank (empty or whitespace)
     * Used when cmtKbn is not "1" and not "3"
     *
     * @param rowIndex Index of row (0-based)
     */
        async verifyMultiCommentIsBlank(rowIndex: number): Promise<void> {
        const row = this.getRowByIndex(rowIndex);
        const items = row.locator(this.selectorsTY30303.multiRowCellItem);
        const count = await items.count();

        // Case 1: マルチコメント element is not rendered
        if (count === 0) {
            return;
        }

        // Case 2: There are multiple multi-row items; find any that represents the "マルチコメント" and is blank.
        // Previously we checked only the first item which may be a different column (e.g. sale title).
        const texts: string[] = [];
        for (let i = 0; i < count; i++) {
            const t = (await items.nth(i).textContent()) ?? '';
            texts.push(t);
        }

        // Consider blank if exactly an IDEOGRAPHIC SPACE (U+3000), empty string, or all-whitespace.
        const isBlank = texts.some((t) => t === '' || t === '\u3000' || t.trim() === '');

        if (isBlank) {
            return;
        }

        // If none are blank, throw with detailed info to help debugging.
        const repr = texts.map((t) => `${JSON.stringify(t)} [${Array.from(t).map(c => c.codePointAt(0)?.toString(16)).join(',')}]`).join(' | ');
        throw new Error(
            `Expected マルチコメント to be blank in one of multi-row-cell-item, but none were blank. Found texts: ${repr}`
        );
    }

    /**
     * Get number of rows in AG Grid
     */
    async getRowCount(): Promise<number> {
        return await this.page.locator(this.selectorsTY30303.agRows).count();
    }

    /**
     * Verify sale text color by shoriMode
     *
     * shoriMode = "1" → Black (no text-blue)
     * shoriMode = "2" → Blue  (has text-blue)
     *
     * @param rowIndex Index of row (0-based)
     * @param isBlue Expected color state
     */
        async verifySaleTextColor(
        rowIndex: number,
        isBlue: boolean
    ): Promise<void> {
        const row = this.getRowByIndex(rowIndex);

        // The project uses the 'row-printed' class on the ag-row to indicate blue text.
        // Detect that class only.
        const classAttr = (await row.getAttribute('class')) ?? '';
        const hasRowPrinted = /\brow-printed\b/.test(classAttr);

        if (isBlue && !hasRowPrinted) {
            throw new Error(
                'Expected sale text to be blue (row has class "row-printed"), but it was not.'
            );
        }

        if (!isBlue && hasRowPrinted) {
            throw new Error(
                'Expected sale text to be black (row does not have class "row-printed"), but it has.'
            );
        }
    }

    /**
     * Check if sale image (pict) is visible for a given row.
     * It looks for an <img> inside the row and verifies computed style + size + src.
     */
            // Check if preview sale image (img[alt="セールヘッダー"]) is visible.
    // The rowIndex parameter is kept for backward compatibility but is ignored because
    // the preview image is outside the row.
    async isSaleImageVisible(_rowIndex?: number): Promise<boolean> {
        const locator = this.page.locator('img[alt="セールヘッダー"]').first();
        const count = await this.page.locator('img[alt="セールヘッダー"]').count();
        if (count === 0) return false;

        const visible = await locator.isVisible().catch(() => false);
        if (!visible) return false;

        const info = await locator.evaluate((el) => {
            const e = el as HTMLElement & { src?: string };
            const style = window.getComputedStyle(e);
            const rect = e.getBoundingClientRect();
            return {
                visibility: style.visibility,
                display: style.display,
                width: rect.width,
                height: rect.height,
                src: (el as HTMLImageElement).src || null
            };
        });

        return (
            info.visibility === 'visible' &&
            info.display !== 'none' &&
            Number(info.width) > 0 &&
            Number(info.height) > 0 &&
            !!info.src
        );
    }

    /**
     * Check whether a given row is highlighted (selected)
     */
        async isRowHighlighted(rowIndex: number): Promise<boolean> {
        const row = this.getRowByIndex(rowIndex);
        const classAttr = (await row.getAttribute('class')) ?? '';
        return /bg|selected|active|row-printed/.test(classAttr);
    }

    /**
     * Return indices of rows that are highlighted/selected
     */
    async getHighlightedRowIndices(): Promise<number[]> {
        const rows = this.page.locator(this.selectorsTY30303.agRows);
        const count = await rows.count();
        const indices: number[] = [];
        for (let i = 0; i < count; i++) {
            const row = rows.nth(i);
            const classAttr = (await row.getAttribute('class')) ?? '';
            if (/bg|selected|active|row-printed/.test(classAttr)) {
                indices.push(i);
            }
        }
        return indices;
    }

    /**
     * Get preview image src (if any) from preview area
     */
    async getPreviewImageSrc(): Promise<string | null> {
        const locator = this.page.locator('img[alt="セールヘッダー"]').first();
        const count = await this.page.locator('img[alt="セールヘッダー"]').count();
        if (count === 0) return null;
        const visible = await locator.isVisible().catch(() => false);
        if (!visible) return null;
        return (await locator.getAttribute('src')) || null;
    }

    /**
     * Returns true if a 'Pict' image (secondary pict) is visible on the page.
     * It searches by alt, class or src patterns that commonly indicate pict images.
     */
        async isPictImageVisible(): Promise<boolean> {
        const locator = this.page.locator('img[alt="ピクト"]').first();
        const count = await this.page.locator('img[alt="ピクト"]').count();
        if (count === 0) return false;
        return await locator.isVisible().catch(() => false);
    }

    /**
     * Returns true if the AG Grid viewport/container does not show a vertical scrollbar
     */
    async hasNoVerticalScroll(): Promise<boolean> {
        return await this.page.evaluate(() => {
            const viewport = document.querySelector('.ag-body-viewport') as HTMLElement | null;
            const container = document.querySelector('.ag-center-cols-container') as HTMLElement | null;
            const el = viewport || container;
            if (!el) return true; // cannot find specific viewport -> assume no scroll
            return el.scrollHeight <= el.clientHeight;
        });
    }

    /**
     * Get text from multi-row cell by item index
     *
     * @param rowIndex Index of row (0-based)
     * @param itemIndex Index of multi-row-cell-item
     */
    async getMultiRowCellItemText(
        rowIndex: number,
        itemIndex: number
    ): Promise<string> {
        const row = this.getRowByIndex(rowIndex);
        const items = row.locator(this.selectorsTY30303.multiRowCellItem);

        const count = await items.count();
        if (count <= itemIndex) {
            throw new Error(
                `multi-row-cell-item index ${itemIndex} not found (total: ${count})`
            );
        }

        return (await items.nth(itemIndex).textContent())?.trim() ?? '';
    }

    /**
     * Verify 期間 format: YYYY/MM/DD ～ YYYY/MM/DD
     *
     * @param rowIndex Index of row (0-based)
     */
    async verifyPeriodDateFormat(rowIndex: number): Promise<void> {
        const periodText = await this.getMultiRowCellItemText(rowIndex, 1);

        const regex =
            /^\d{4}\/\d{2}\/\d{2}\s～\s\d{4}\/\d{2}\/\d{2}$/;

        if (!regex.test(periodText)) {
            throw new Error(
                `期間 format invalid. Expected "YYYY/MM/DD ～ YYYY/MM/DD" but got "${periodText}"`
            );
        }
    }

    /**
     * Verify 掲載価格 format with thousand separators
     * Example: ¥1,001 / ¥12,345 / ¥1,234,567
     */
    async verifyPriceFormat(rowIndex: number): Promise<void> {
        const priceText = await this.getMultiRowCellItemText(rowIndex, 2);

        const priceRegex = /^¥\d{1,3}(,\d{3})+$/;

        if (!priceRegex.test(priceText)) {
            throw new Error(
                `掲載価格 format invalid. Expected thousand separator but got "${priceText}"`
            );
        }
    }

    /**
     * Make sure the sale row is selected (highlighted).
     */
    async verifySaleHighlighted(rowIndex: number): Promise<void> {
        const row = this.getRowByIndex(rowIndex);
        await expect(row).toHaveClass(/bg|selected|active/);
    }

    /**
     * Make sure the footer buttons are visible.
     * @param buttonText ボタン表示文言
     */
        async verifyFooterButtonVisible(buttonText: string): Promise<void> {
        const button = this.page.locator(
            `div.fixed.bottom-0 button:has-text("${buttonText}")`
        );

        await expect(button).toBeVisible();
        await expect(button).toBeEnabled();
    }

    /**
     * Click footer confirm button (e.g., 確定)
     */
    async clickFooterConfirm(buttonText: string = '確定'): Promise<void> {
        const button = this.page.locator(`div.fixed.bottom-0 button:has-text("${buttonText}")`).first();
        await this.waitForVisible(button, 10000);
        await this.clickWithRetry(button);
        await this.page.waitForTimeout(1000);
    }

    /**
     * Check footer button visibility without asserting
     */
    async isFooterButtonVisible(buttonText: string = '確定'): Promise<boolean> {
        const button = this.page.locator(`div.fixed.bottom-0 button:has-text("${buttonText}")`).first();
        return await button.isVisible().catch(() => false);
    }
}