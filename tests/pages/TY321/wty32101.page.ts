import { expect } from "@playwright/test";
import { BasePage } from "../base.page";

export class TY32101Page extends BasePage {
    // Test data constants
    public readonly INVENTORY_GUIDES = {
        JANUARY_REGULAR: '1月定期棚卸／2',
        DECEMBER_CYCLE: '12月循環棚卸／3',
        NOVEMBER_CYCLE: '12月中旬棚卸／4',
    };

    public readonly INVENTORY_DATES = {
        JANUARY_20_2025: '2025年01月20日',
        DECEMBER_15_2024: '2024年12月15日',
        DECEMBER_20_2024: '2024年12月20日',
    };

    public readonly INVENTORY_CLASSIFICATIONS = {
        SAME_DAY_WITH_TOTAL: '当日差異調査(総数確認有)',
        NEXT_DAY: '翌日差異調査',
    };

    public readonly selectors = {
      tnorsKbn: 'tnorsKbn',
      confirmButtonModal: '#ok_only_button',
      errorDialog: '#wty32101-error-dialog',
      inventoryGuideText: '#tnorsShiji span',
      inventoryDateText: '#tnorsDate span',
      
      InventoryGuideCombobox: '#tnorsShiji[role="combobox"], label[for="tnorsShiji"] ~ div [role="combobox"]',
      inventoryDateCombobox: '#tnorsDate[role="combobox"], label[for="tnorsDate"] ~ div [role="combobox"]',
      inventoryDateDropdownOption: '#_r_3_',
      InventoryGuideDropdownOption: '#_r_4_',
      
      confirmButton: 'button:has-text("確定")',
      clearButton: 'button:has-text("クリア")',
    };

    async navigate(pilotKey: string = 'prod'): Promise<void>{
        const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTY32101InventoryPreprocessing?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
        await this.goto(url);
        await this.page.waitForTimeout(1000);
    }

  /**
   * Click on combobox and select option by text
   * @param optionText - Text of the option to select
   * @param comboboxSelector - Optional selector for the combobox (default: salesDepartmentCombobox)
   */
  async selectComboboxOptionByText(optionText: string, comboboxSelector?: string): Promise<void> {
    const selector = comboboxSelector || '';

    if (optionText === '') {
      await super.clickOptionInCombobox(
        [
          'li[role="option"][data-value=""]',
        ],
        'Empty option not found in combobox dropdown',
        selector
      );
      return;
    }

    const optionSelectors = [
      `ul.MuiList-root li[role="option"]:has-text("${optionText}")`,
      `${this.selectors.InventoryGuideDropdownOption}:has-text("${optionText}")`,
      `li[role="option"]:has-text("${optionText}")`,
    ];
    await super.clickOptionInCombobox(optionSelectors, `Option with text "${optionText}" not found in combobox dropdown`, selector);
  }

    /**
     * Verify that all provided option texts are present in combobox dropdown
     * @param expectedOptions Array of option texts to check
     * @returns true if all options are found, false otherwise
     */
    async verifyOpenedComboboxOptionsText(
      expectedTexts: string[]
    ): Promise<void> {

      const listbox = this.page.locator(
        'div.MuiPopover-paper:visible ul[role="listbox"]'
      );

      await expect(listbox).toBeVisible();

      const actualTexts = (await listbox
        .locator('li[role="option"]')
        .allTextContents()
      )
        .map(t => t.trim())
        .filter(t => t !== '');
      
      expect(actualTexts).toEqual(expectedTexts);
    }
}
