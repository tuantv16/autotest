import { Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { VALIDATION_ERROR_MESSAGES } from '../../constants/messages';

export class TY20601Page extends BasePage {
    // Constants - 宅配区分 (TH_KBN)
    public readonly TH_KBN = {
        KOMONO: '1',   // 小物
        OMONO: '2',    // 大物
        CHUMONO: '4',  // 中物
        GOKUSHO: '5'   // 極小
    };

    // Constants - 宅配区分名称 (TH_KBN_NM)
    public readonly TH_KBN_NM = {
        KOMONO: '小物',
        OMONO: '大物',
        CHUMONO: '中物',
        GOKUSHO: '極小',
        OTHER: '-'
    };

    // Constants - 直送可否 (CKS_KAHI_FLG)
    public readonly CKS_KAHI_FLG = {
        OK: '1',  // 可
        NG: '0'   // 不可
    };

    // Constants - 直送可否名称 (CKS_KAHI_FLG_NM)
    public readonly CKS_KAHI_FLG_NM = {
        OK: '可',
        NG: '不可',
        OTHER: '-'
    };

    // Constants - 横振り可否 (YB_KAHI_FLG)
    public readonly YB_KAHI_FLG = {
        OK: '1',  // 在庫有れば可
        NG: '0'   // 不可
    };

    // Constants - 横振り可否名称 (YB_KAHI_FLG_NM)
    public readonly YB_KAHI_FLG_NM = {
        OK: '在庫有れば可',
        NG: '不可',
        OTHER: '-'
    };

    // Constants - 在庫状態 (ZAI_JT)
    public readonly ZAI_JT = {
        NEW: '1',      // 新品
        TENJI: '2',    // 展示品
        KAIKON: '3',   // 開梱品
        SHITEI: '6'    // 新品指定
    };

    // Constants - 在庫状態名称 (ZAI_JT_NM)
    public readonly ZAI_JT_NM = {
        NEW: '新品',
        TENJI: '展示品',
        KAIKON: '開梱品',
        SHITEI: '新品指定',
        OTHER: '-'
    };

    // Selectors
    public readonly Locators = {
        classHeaderTable: 'ag-header-row.ag-header-row-column',
        classHighlightedRow: 'ag-row-selected',
        classTable: 'ag-center-cols-container',
    };

    public readonly Selectors = {
        productNo: 'input[name="productNo"]',
        productKata: 'input[name="productKata"]',
        thKbn: 'input[name="thKbn"]',
        chksKahiFlg: 'input[name="chksKahiFlg"]',
        ykbrKahiFlg: 'input[name="ykbrKahiFlg"]',
        btnTextBox: 'input[name="btnTextBox"]',
        thibtenNm: 'input[name="thibtenNm"]',
    };

    public readonly Texts = {
        headingTitle : 'セット商品属性選択',

        buttonClear: 'クリア',
        buttonConfirm: '確定',
        buttonInventory: '店別在庫',
        buttonProduct: '商品基本',

        textHeaderTable: ['No', '型番', 'JAN', '手配', '長', 'Ａ', '数量', '最終売価', '属性'],
    };

    constructor(page: Page) {
        super(page);
    }

    /**
     * Navigate to WTY20601 Store Inventory Inquiry screen
     */
    async navigate(pilotKey: string = 'prod'): Promise<void> {
        const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTY20601ProductSetAttributeSelect?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
        await this.goto(url);
        await this.page.waitForTimeout(1000);
    }

    /**
     * Check if text exists in a locator
     * @param locatorClass - CSS class name to locate the element
     * @param text - Text to search for in the locator
     * @returns true if text exists, false otherwise
     */
    async isTextInLocator(locatorClass: string, text: string): Promise<boolean> {
        try {
            const element = this.page.locator(`.${locatorClass}`).first();
            const elementText = await element.textContent();

            if (!elementText) {
                return false;
            }

            return elementText.includes(text);
        } catch (error) {
            return false;
        }
    }

    /**
     * Check if all texts in array exist in a locator
     * @param locatorClass - CSS class name to locate the element
     * @param texts - Array of texts to search for in the locator
     * @returns true if all texts exist, false otherwise
     */
    async verifyTextsInLocator(locatorClass: string, texts: string[]): Promise<boolean> {
        try {
            for (let i = 0; i < texts.length; i++) {
                const text = texts[i];
                if (await this.isTextInLocator(locatorClass, text) === false) {
                    return false;
                }
            }
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Click a random row in the table
     * Navigates to div with classTable, finds rowgroup, and clicks a random row
     * @returns The clicked row locator and its index
     */
    async clickRandomRow(): Promise<{ row: any; index: number }> {
        try {
            // Locate the table container with classTable
            const tableContainer = this.page.locator(`.${this.Locators.classTable}`);

            // Get all rows with role="row" within the rowgroup
            const rows = tableContainer.locator('[role="row"]');

            // Count the number of rows
            const rowCount = await rows.count();

            if (rowCount === 0) {
                throw new Error('No rows found in the table');
            }

            // Generate a random index
            const randomIndex = Math.floor(Math.random() * rowCount);

            // Get the random row
            const selectedRow = rows.nth(randomIndex);

            // Click the random row
            await selectedRow.click();

            // Wait for any potential loading/selection to complete
            await this.page.waitForTimeout(500);

            // Return the clicked row and its index
            return { row: selectedRow, index: randomIndex };
        } catch (error) {
            throw new Error(`Failed to click random row: ${error}`);
        }
    }

    /**
     * Verify if a row is highlighted/selected
     * @param row - The row locator to check
     * @returns true if the row has classHighlightedRow and aria-selected="true", false otherwise
     */
    async verifyHighlightedRow(row: any): Promise<boolean> {
        try {
            // Check if row has the highlighted class
            const hasHighlightedClass = await row.evaluate((element: Element, className: string) => {
                return element.classList.contains(className);
            }, this.Locators.classHighlightedRow);

            // Check if row has aria-selected="true"
            const ariaSelected = await row.getAttribute('aria-selected');
            const hasAriaSelected = ariaSelected === 'true';

            // Return true only if both conditions are met
            return hasHighlightedClass && hasAriaSelected;
        } catch (error) {
            return false;
        }
    }

    /**
     * Check if a locator has child elements inside it
     * @param locatorClass - CSS class name to locate the element
     * @returns true if the element exists and has child elements inside, false otherwise
     */
    async hasChildElements(locatorClass: string): Promise<boolean> {
        try {
            const element = this.page.locator(`.${locatorClass}`);
            const count = await element.count();

            // Check if element exists
            if (count === 0) {
                return false;
            }

            // Go inside the element and check if it has any child elements
            const childrenCount = await element.first().locator('> *').count();
            return childrenCount > 0;
        } catch (error) {
            return false;
        }
    }

    /**
     * Get the value of an input element
     * @param selector - CSS selector for the input element
     * @returns The value of the input element, or empty string if not found
     */
    async getInputValue(selector: string): Promise<string> {
        try {
            const input = this.page.locator(selector);
            const value = await input.inputValue();
            return value || '';
        } catch (error) {
            return '';
        }
    }

    /**
     * Get the display name for thKbn (宅配区分)
     * @param thKbn - The thKbn code (1: 小物, 2: 大物, 4: 中物, 5: 極小)
     * @returns The display name corresponding to the thKbn code
     */
    getThKbnName(thKbn?: string): string {
        if (!thKbn) return this.TH_KBN_NM.OTHER;

        switch (thKbn) {
            case this.TH_KBN.KOMONO:
                return this.TH_KBN_NM.KOMONO;
            case this.TH_KBN.OMONO:
                return this.TH_KBN_NM.OMONO;
            case this.TH_KBN.CHUMONO:
                return this.TH_KBN_NM.CHUMONO;
            case this.TH_KBN.GOKUSHO:
                return this.TH_KBN_NM.GOKUSHO;
            default:
                return this.TH_KBN_NM.OTHER;
        }
    }

    /**
     * Get the display name for cksKahiFlg (直送可否)
     * @param cksKahiFlg - The cksKahiFlg code (1: 可, 0: 不可)
     * @returns The display name corresponding to the cksKahiFlg code
     */
    getCksKahiName(cksKahiFlg?: string): string {
        if (!cksKahiFlg) return this.CKS_KAHI_FLG_NM.OTHER;

        switch (cksKahiFlg) {
            case this.CKS_KAHI_FLG.OK:
                return this.CKS_KAHI_FLG_NM.OK;
            case this.CKS_KAHI_FLG.NG:
                return this.CKS_KAHI_FLG_NM.NG;
            default:
                return this.CKS_KAHI_FLG_NM.OTHER;
        }
    }

    /**
     * Get the display name for ybKahiFlg (横振り可否)
     * @param ybKahiFlg - The ybKahiFlg code (1: 在庫有れば可, 0: 不可)
     * @returns The display name corresponding to the ybKahiFlg code
     */
    getYbKahiName(ybKahiFlg?: string): string {
        if (!ybKahiFlg) return this.YB_KAHI_FLG_NM.OTHER;

        switch (ybKahiFlg) {
            case this.YB_KAHI_FLG.OK:
                return this.YB_KAHI_FLG_NM.OK;
            case this.YB_KAHI_FLG.NG:
                return this.YB_KAHI_FLG_NM.NG;
            default:
                return this.YB_KAHI_FLG_NM.OTHER;
        }
    }

    /**
     * Convert empty or whitespace-only string to full-width space (　)
     * @param value - The value to check
     * @returns The original value if non-empty, or full-width space if empty
     */
    emptyToSpace(value?: string): string {
        return value && value.trim().length > 0 ? value : '　';
    }

    /**
     * Get the display name for zaiJt (在庫状態)
     * @param zaiJt - The zaiJt code (1: 新品, 2: 展示品, 3: 開梱品, 6: 新品指定)
     * @returns The display name corresponding to the zaiJt code
     */
    getZaiJtName(zaiJt?: string): string {
        if (!zaiJt) return this.ZAI_JT_NM.OTHER;

        switch (zaiJt) {
            case this.ZAI_JT.NEW:
                return this.ZAI_JT_NM.NEW;
            case this.ZAI_JT.TENJI:
                return this.ZAI_JT_NM.TENJI;
            case this.ZAI_JT.KAIKON:
                return this.ZAI_JT_NM.KAIKON;
            case this.ZAI_JT.SHITEI:
                return this.ZAI_JT_NM.SHITEI;
            default:
                return this.ZAI_JT_NM.OTHER;
        }
    }

    /**
     * Check if the parent label of a span with specific text has 'bg-white' class
     * @param text - The text content of the span to find
     * @returns true if the parent label has 'bg-white' class, false otherwise
     */
    async hasParentLabelWithBgWhite(text: string): Promise<boolean> {
        try {
            // Find the span with the specific text
            const span = this.page.locator(`span:has-text("${text}")`).first();

            // Get the parent label element
            const parentLabel = span.locator('xpath=ancestor::label[1]');

            // Check if parent label exists
            const parentCount = await parentLabel.count();
            if (parentCount === 0) {
                return false;
            }

            // Check if parent label has 'bg-white' class
            const className = await parentLabel.getAttribute('class');
            return className ? className.includes('bg-white') : false;
        } catch (error) {
            return false;
        }
    }

}

