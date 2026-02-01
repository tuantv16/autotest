/**
 * WTY20501 Summary Input Page Object
 * Page Object for 摘要欄入力 screen
 */

import { Page, Locator } from "@playwright/test";
import { BasePage } from "../base.page";

export interface WTY20501FormData {
    customerNameKanji: string;
    customerNameKana: string;
    deliveryDate: string;
    summaryText: string;
}

export class WTZ12201Page extends BasePage {
    // Form field names (for POM pattern)
    public readonly fieldNames = {
        // customerNameKanji: "kokKnj",
        // customerNameKana: "kokKn",
        // honorific: "keishoKbn",
        // paymentMethod: "shHou",
        // deliveryDate: "nnyOtdkYoteiDate",
        // summary: "tkyRn",
    };

    // Selectors
    public readonly selectors = {
        headingTitle:
            '.text-heading-h5:has-text("レコメンド"), .text-heading-h6:has-text("レコメンド")',
        labelAppliedPromotion: '販促適用情報',
        labelRecommendedPromotion: 'おすすめ販促情報',
    };

    constructor(page: Page) {
        super(page);
    }

    /**
     * Navigate to WTY20501 Summary Input screen
     */
    async navigate(pilotKey: string = "prod"): Promise<void> {
        const url = `${this.baseUrl}/index.html?pilotkey=prod#/TZ122Recommendation?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
        await this.goto(url);
        await this.page.waitForTimeout(1000);
    }

    async isHeadingTitleVisible(): Promise<boolean> {
        const locator = this.page.locator(this.selectors.headingTitle);
        return await locator.isVisible({ timeout: 10000 }).catch(() => false);
    }

    async isHeadingTitleVisibleByText(text: string): Promise<boolean> {
        const isVisible1 = await this.isTextVisible(this.selectors.labelAppliedPromotion);
        const isVisible2 = await this.isTextVisible(this.selectors.labelRecommendedPromotion);
        return isVisible1 && isVisible2;
    }

    async isTextVisible(text: string, exact: boolean = true): Promise<boolean> {
        const locator = this.page.getByText(text, { exact });
        return await locator
            .first()
            .isVisible({ timeout: 10000 })
            .catch(() => false);
    }

    async isRowVisible(rowIndex: number): Promise<boolean> {
        const locator1 = this.page.locator(`#wtz12201-applied-grid [role="row"][row-index="${rowIndex}"]`);
        const locator2 = this.page.locator(`#wtz12201-recommend-grid [role="row"][row-index="${rowIndex}"]`);
        return await locator1.isVisible({ timeout: 10000 }).catch(() => false) && await locator2.isVisible({ timeout: 10000 }).catch(() => false);
    }

    async getCellTextByColumnId(columnId: string, rowIndex: number): Promise<string> {
        const locator = this.page.locator(`#wtz12201-applied-grid #cell-${columnId}-${rowIndex}`);
        const text = await locator.textContent();
        return text?.trim() || '';
    }

    /**
     * Check if cell in first row of first table (wtz12201-applied-grid) is empty or has value
     * Empty is considered as pass (returns true)
     * @param columnId - Column ID to check
     * @returns true if cell is empty or exists, false otherwise
     */
    // async isFirstRowCellEmptyOrPass(columnId: string): Promise<boolean> {
    //   const locator = this.page.locator(`#wtz12201-applied-grid #cell-${columnId}-0`);
    //   const text = await locator.textContent().catch(() => null);
    //   // Empty is considered as pass
    //   return text === null || text.trim() === '';
    // }

    async checkValueCellDate() {
        return this.getValueBodyCell('wtz12201-applied-grid', 'period', 0);
    }

    async getValueBodyCell(tableId: string, columnId: string, index: number): Promise<boolean> {
        const locator = this.page.locator(`#${tableId} #cell-${columnId}-${index}`);
        const text = await locator.textContent().catch(() => null);
        // Empty is considered as pass
        return text === null || text.trim() === '';
    }

    async clickRowTable(index: number): Promise<void> {
        const locator = this.page.locator(`#wtz12201-applied-grid [role="row"][row-index="${index}"]`);
        await locator.click();
    }

    async clickRowTableRecommend(index: number): Promise<void> {
        const locator = this.page.locator(`#wtz12201-recommend-grid [role="row"][row-index="${index}"]`);
        await locator.click();
    }

    async isPreviewModalVisible(): Promise<boolean> {
        const locator = this.page.locator(`#wtz12201-preview-modal`);
        return await locator.isVisible({ timeout: 10000 }).catch(() => false);
    }

    async checkTitlePreviewModal(): Promise<string> {
        return this.getContentById('preview-modal-title');
    }

    async checkExistsImagePreviewModal(): Promise<boolean> {
        const locator = this.page.locator(`#wtz12201-preview-modal img[src]`);
        const src = await locator.getAttribute('src');
        return (src?.trim().length || 0) > 0 && src !== 'no-image';
    }

    async checkNotExistsImagePreviewModal(): Promise<boolean> {
        const locator = this.page.locator(`#wtz12201-preview-modal img[src]`);
        const src = await locator.getAttribute('src');
        return (src?.trim().length || 0) === 0 || (src?.includes('no-image') ?? false) || src === null;
    }

    async clickButtonClosePreviewModal(): Promise<void> {
        const locator = this.page.locator(`#wtz12201-preview-modal button[aria-label="Close modal"]`);
        await locator.click();
    }

    async clickButtonZoomIn(): Promise<void> {
        await this.clickButtonByText('＋');
    }

    async clickButtonZoomOut(): Promise<void> {
        await this.clickButtonByText('－');
    }

    async isButtonZoomOutDisabled(): Promise<boolean> {
        const locator = this.page.locator(`button:has-text("－")`);
        return (await locator.getAttribute('disabled')) === null;
    }

    async isButtonZoomOutNotExistsDisabled(): Promise<boolean> {
        const locator = this.page.locator(`button:has-text("－")`);
        return (await locator.getAttribute('disabled')) !== null;
    }

    async clickOverlayBackground(): Promise<void> {
        // Actual DOM has a separate overlay element: <div class="fixed inset-0" style="... z-index: 40"></div>
        // The modal root itself is pointer-events-auto and above it (z-index: 50).
        // So we click the overlay (z-index: 40) instead of a MUI backdrop.
        const overlay = this.page.locator('div.fixed.inset-0').filter({ hasNot: this.page.locator('#wtz12201-preview-modal') }).first();

        if (await overlay.isVisible().catch(() => false)) {
            await overlay.click({ force: true });
            return;
        }

        // Fallback: click just outside the modal box.
        const modal = this.page.locator('#wtz12201-preview-modal');
        await modal.waitFor({ state: 'visible', timeout: 15000 });

        const box = await modal.boundingBox();
        if (!box) {
            await this.page.mouse.click(1, 1);
            return;
        }

        const x = Math.max(1, Math.floor(box.x - 5));
        const y = Math.max(1, Math.floor(box.y - 5));
        await this.page.mouse.click(x, y);
    }
}
